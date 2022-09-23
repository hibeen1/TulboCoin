package bigdataproject.backend.api.service;

import bigdataproject.backend.db.entity.Wallet;

import java.util.List;

public interface WalletService {

    List<Wallet> getAllWallets(Long userId);

}
