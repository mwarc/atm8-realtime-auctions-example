package com.github.mwarc.realtimeauctions.verticle;

import com.github.mwarc.realtimeauctions.handler.ProxyHandler;
import io.vertx.core.AbstractVerticle;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.ErrorHandler;
import io.vertx.ext.web.handler.StaticHandler;

public class AuctionFrontendVerticle extends AbstractVerticle {

    @Override
    public void start() {
        Router router = Router.router(vertx);

        router.mountSubRouter("/api", auctionApiRouter());

        router.route().failureHandler(ErrorHandler.create(true));
        router.route("/private/*").handler(staticHandler("private"));
        router.route().handler(staticHandler("public"));

        vertx.createHttpServer().requestHandler(router::accept).listen(8080);
    }

    private Router auctionApiRouter() {
        Router router = Router.router(vertx);

        router.route().consumes("application/json");
        router.route().produces("application/json");

        router.get("/auctions/:id").handler(ProxyHandler.create("localhost", 8081));
        router.patch("/auctions/:id").handler(ProxyHandler.create("localhost", 8081));

        return router;
    }

    private StaticHandler staticHandler(String webRoot) {
        return StaticHandler.create()
            .setCachingEnabled(false)
            .setWebRoot(webRoot);
    }
}
