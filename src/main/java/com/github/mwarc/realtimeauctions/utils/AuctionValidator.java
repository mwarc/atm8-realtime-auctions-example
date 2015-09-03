package com.github.mwarc.realtimeauctions.utils;

import com.github.mwarc.realtimeauctions.model.Auction;

import java.math.BigDecimal;

public class AuctionValidator {

    public static boolean isBidPossible(
        Auction auctionDatabase,
        Auction auctionRequest
    ) {
        BigDecimal currentPrice = auctionDatabase.getPrice();
        BigDecimal newPrice = auctionRequest.getPrice();
        return currentPrice.compareTo(newPrice) == -1;
    }
}
