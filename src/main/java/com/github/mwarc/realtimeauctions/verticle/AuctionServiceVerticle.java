package com.github.mwarc.realtimeauctions.verticle;


import com.github.mwarc.realtimeauctions.handler.AuctionHandler;
import com.github.mwarc.realtimeauctions.repository.AuctionRepository;
import com.github.mwarc.realtimeauctions.validation.AuctionValidator;
import io.vertx.core.AbstractVerticle;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;

public class AuctionServiceVerticle extends AbstractVerticle {

    @Override
    public void start() {
        Router router = Router.router(vertx);

        router.mountSubRouter("/api", auctionApiRouter());

        vertx.createHttpServer().requestHandler(router::accept).listen(8081);
    }

    private Router auctionApiRouter() {
        AuctionRepository repository = new AuctionRepository(vertx.sharedData());
        AuctionValidator validator = new AuctionValidator(repository);
        AuctionHandler auctionHandler = new AuctionHandler(repository, validator);

        Router router = Router.router(vertx);
        router.route().handler(BodyHandler.create());

        router.route().consumes("application/json");
        router.route().produces("application/json");

        router.route("/auctions/:id").handler(auctionHandler::initAuctionInSharedData);
        router.get("/auctions/:id").handler(auctionHandler::handleGetAuction);
        router.patch("/auctions/:id").handler(auctionHandler::handleChangeAuction);

        return router;
    }
}
