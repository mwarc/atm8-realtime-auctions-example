package com.github.mwarc.realtimeauctions.handler;

import com.github.mwarc.realtimeauctions.utils.AuctionValidator;
import com.github.mwarc.realtimeauctions.model.Auction;
import com.github.mwarc.realtimeauctions.repository.AuctionRepository;
import io.vertx.ext.web.RoutingContext;

import java.math.BigDecimal;
import java.util.Optional;

import static com.github.mwarc.realtimeauctions.model.Auction.defaultAuction;
import static com.github.mwarc.realtimeauctions.utils.AuctionConverter.toJson;

public class AuctionHandler {

    private final AuctionRepository auctionRepository;

    public AuctionHandler(AuctionRepository auctionRepository) {
        this.auctionRepository = auctionRepository;
    }

    public void handleGetAuction(RoutingContext context) {
        String auctionId = context.request().getParam("id");
        Optional<Auction> auction = this.auctionRepository.getById(auctionId);

        if (auction.isPresent()) {
            context.response()
                .putHeader("content-type", "application/json")
                .setStatusCode(200)
                .end(toJson(auction.get()));
        } else {
            context.response()
                .putHeader("content-type", "application/json")
                .setStatusCode(404)
                .end();
        }
    }

    public void handleChangeAuctionPrice(RoutingContext context) {
        String auctionId = context.request().getParam("id");
        Auction auctionRequest = new Auction(
            auctionId,
            new BigDecimal(context.getBodyAsJson().getString("price")),
            context.user().principal().getString("sub")
        );
        Auction auctionDatabase = this.auctionRepository.getById(auctionId).orElse(defaultAuction(auctionId));

        if (AuctionValidator.isBidPossible(auctionDatabase, auctionRequest)) {
            this.auctionRepository.save(auctionRequest);
            context.vertx().eventBus().publish("auction." + auctionId, toJson(auctionRequest));

            context.response()
                .setStatusCode(200)
                .end();
        } else {
            context.response()
                .setStatusCode(400)
                .end();
        }
    }
}
