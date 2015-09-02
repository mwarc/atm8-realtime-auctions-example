package com.github.mwarc.realtimeauctions.model;

import java.math.BigDecimal;

public class Auction {

    private final String id;
    private final BigDecimal price;
    private final String buyer;

    public Auction(String id, BigDecimal price, String buyer) {
        this.id = id;
        this.price = price;
        this.buyer = buyer;
    }

    public static Auction defaultAuction(String auctionId) {
        return new Auction(
            auctionId,
            BigDecimal.ZERO,
            null
        );
    }

    public String getId() {
        return id;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public String getBuyer() {
        return buyer;
    }

    @Override
    public String toString() {
        return "Auction{" +
            "id='" + id + '\'' +
            ", price=" + price +
            ", buyer='" + buyer + '\'' +
            '}';
    }
}
