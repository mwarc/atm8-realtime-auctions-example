package com.github.mwarc.realtimeauctions.repository;

import com.github.mwarc.realtimeauctions.model.Auction;
import io.vertx.core.shareddata.LocalMap;
import io.vertx.core.shareddata.SharedData;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Optional;

import static com.github.mwarc.realtimeauctions.model.Auction.defaultAuction;

public class AuctionRepository {

    private SharedData sharedData;

    public AuctionRepository(SharedData sharedData) {
        this.sharedData = sharedData;
    }

    public Optional<Auction> getById(String auctionId) {
        LocalMap<String, String> auctionSharedData = this.sharedData.getLocalMap(auctionId);
        if(auctionSharedData.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(auctionSharedData).map(this::convertToAuction);
    }

    public Auction getByIdOrDefault(String auctionId) {
        return this.getById(auctionId).orElse(defaultAuction(auctionId));
    }

    public void save(Auction auction) {
        LocalMap<String, String> auctionSharedData = this.sharedData.getLocalMap(auction.getId());

        auctionSharedData.put("id", auction.getId());
        auctionSharedData.put("price", auction.getPrice().toString());
        auctionSharedData.put("buyer", auction.getBuyer());
        auctionSharedData.put("endingTime", auction.getEndingTime().toString());
    }

    private Auction convertToAuction(LocalMap<String, String> auction) {
        return new Auction(
            auction.get("id"),
            new BigDecimal(auction.get("price")),
            auction.get("buyer"),
            ZonedDateTime.parse(auction.get("endingTime"))
        );
    }
}
