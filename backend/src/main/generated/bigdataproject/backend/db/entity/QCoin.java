package bigdataproject.backend.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCoin is a Querydsl query type for Coin
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCoin extends EntityPathBase<Coin> {

    private static final long serialVersionUID = 2033169573L;

    public static final QCoin coin = new QCoin("coin");

    public final StringPath coinCode = createString("coinCode");

    public final StringPath coinName = createString("coinName");

    public final NumberPath<Long> coinSeq = createNumber("coinSeq", Long.class);

    public final ListPath<LikeCoin, QLikeCoin> likeUserList = this.<LikeCoin, QLikeCoin>createList("likeUserList", LikeCoin.class, QLikeCoin.class, PathInits.DIRECT2);

    public QCoin(String variable) {
        super(Coin.class, forVariable(variable));
    }

    public QCoin(Path<? extends Coin> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCoin(PathMetadata metadata) {
        super(Coin.class, metadata);
    }

}

