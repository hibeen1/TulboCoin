package bigdataproject.backend.api.service;

import bigdataproject.backend.db.entity.User;
import bigdataproject.backend.db.entity.Wallet;
import bigdataproject.backend.db.repository.UserRepository;
import bigdataproject.backend.db.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;

    private final UserRepository userRepository;

    @Override
    public List<Wallet> getAllWallets(Long userSeq) {
        if (!userRepository.findById(userSeq).isPresent()){
            return null;
        } else {
            User user = userRepository.findById(userSeq).get();
            return walletRepository.findAllByUser(user);
        }
    }
}
