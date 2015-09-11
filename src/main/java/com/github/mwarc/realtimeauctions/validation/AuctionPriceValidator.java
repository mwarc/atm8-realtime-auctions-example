package com.github.mwarc.realtimeauctions.validation;

import com.github.mwarc.realtimeauctions.model.Auction;
import com.github.mwarc.realtimeauctions.repository.AuctionRepository;

public class AuctionPriceValidator implements Validator {

    private final AuctionRepository repository;

    public AuctionPriceValidator(AuctionRepository repository) {
        this.repository = repository;
    }

    @Override
    public boolean validate(Auction auction) {
        Auction auctionDatabase = repository.getByIdOrDefault(auction.getId());
        return auctionDatabase.getPrice().compareTo(auction.getPrice()) == -1;
    }
}
