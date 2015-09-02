package com.github.mwarc.realtimeauctions.utils;

import com.github.mwarc.realtimeauctions.model.Auction;
import io.vertx.core.json.JsonObject;

public class AuctionConverter {

    private AuctionConverter() {
    }

    public static String toJson(Auction auction) {
        JsonObject json = new JsonObject()
                .put("id", auction.getId())
                .put("price", auction.getPrice().toString())
                .put("buyer", auction.getBuyer());
        return json.toString();
    }
}
