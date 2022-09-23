package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.service.WalletService;
import bigdataproject.backend.db.entity.Wallet;
import bigdataproject.backend.response.WalletRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("wallet")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class WalletController {

    private final WalletService walletService;

    @GetMapping("/{userSeq}")
    public ResponseEntity<List<WalletRes>> getWallet(@PathVariable Long userSeq){
        HttpStatus status;
        List<Wallet> walletList = walletService.getAllWallets(userSeq);
        List<WalletRes> res = new ArrayList<>();
        for(Wallet wallet : walletList){
            WalletRes walletRes = WalletRes.of(wallet);
            res.add(walletRes);
        }
//        try {
//            if (walletList != null) {
//                status = HttpStatus.OK;
//                return new ResponseEntity<List<Wallet>>(walletList, status);
//            }
//            else {
//                status = HttpStatus.NOT_FOUND;
//                return new ResponseEntity<>(null, status);
//            }
//        } catch (Exception e){
//            status = HttpStatus.INTERNAL_SERVER_ERROR;
//            return new ResponseEntity<>(null, status);
//        }
        status = HttpStatus.OK;
        return new ResponseEntity<List<WalletRes>>(res, status);
    }
}
