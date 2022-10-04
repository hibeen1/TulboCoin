package bigdataproject.backend.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLikeCoin is a Querydsl query type for LikeCoin
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QLikeCoin extends EntityPathBase<LikeCoin> {

    private static final long serialVersionUID = -1478817060L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLikeCoin likeCoin = new QLikeCoin("likeCoin");

    public final QCoin coin;

    public final NumberPath<Long> likeCoinSeq = createNumber("likeCoinSeq", Long.class);

    public final QUser user;

    public QLikeCoin(String variable) {
        this(LikeCoin.class, forVariable(variable), INITS);
    }

    public QLikeCoin(Path<? extends LikeCoin> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLikeCoin(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLikeCoin(PathMetadata metadata, PathInits inits) {
        this(LikeCoin.class, metadata, inits);
    }

    public QLikeCoin(Class<? extends LikeCoin> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.coin = inits.isInitialized("coin") ? new QCoin(forProperty("coin")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

