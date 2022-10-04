package bigdataproject.backend.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 2033709535L;

    public static final QUser user = new QUser("user");

    public final NumberPath<Double> balance = createNumber("balance", Double.class);

    public final ListPath<Buy, QBuy> buyList = this.<Buy, QBuy>createList("buyList", Buy.class, QBuy.class, PathInits.DIRECT2);

    public final StringPath email = createString("email");

    public final ListPath<History, QHistory> historyList = this.<History, QHistory>createList("historyList", History.class, QHistory.class, PathInits.DIRECT2);

    public final StringPath imagePath = createString("imagePath");

    public final DateTimePath<java.time.LocalDateTime> investStartTime = createDateTime("investStartTime", java.time.LocalDateTime.class);

    public final ListPath<LikeCoin, QLikeCoin> likeCoinList = this.<LikeCoin, QLikeCoin>createList("likeCoinList", LikeCoin.class, QLikeCoin.class, PathInits.DIRECT2);

    public final StringPath password = createString("password");

    public final ListPath<Sell, QSell> sellList = this.<Sell, QSell>createList("sellList", Sell.class, QSell.class, PathInits.DIRECT2);

    public final StringPath userId = createString("userId");

    public final NumberPath<Long> userSeq = createNumber("userSeq", Long.class);

    public final ListPath<Wallet, QWallet> walletList = this.<Wallet, QWallet>createList("walletList", Wallet.class, QWallet.class, PathInits.DIRECT2);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

