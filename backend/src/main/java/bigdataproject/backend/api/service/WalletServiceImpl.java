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
        User user = userRepository.findById(userSeq).get();
        if (user == null){
            return null;
        }
        return walletRepository.findAllByUser(user);
    }
}
