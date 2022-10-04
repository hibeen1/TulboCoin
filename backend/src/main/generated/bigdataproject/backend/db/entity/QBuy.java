package bigdataproject.backend.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBuy is a Querydsl query type for Buy
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBuy extends EntityPathBase<Buy> {

    private static final long serialVersionUID = 1451058674L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBuy buy = new QBuy("buy");

    public final NumberPath<Double> buyCoinAmount = createNumber("buyCoinAmount", Double.class);

    public final StringPath buyCoinCode = createString("buyCoinCode");

    public final StringPath buyCoinName = createString("buyCoinName");

    public final NumberPath<Integer> buyCoinPrice = createNumber("buyCoinPrice", Integer.class);

    public final NumberPath<Long> buySeq = createNumber("buySeq", Long.class);

    public final DateTimePath<java.time.LocalDateTime> buyTime = createDateTime("buyTime", java.time.LocalDateTime.class);

    public final QUser user;

    public QBuy(String variable) {
        this(Buy.class, forVariable(variable), INITS);
    }

    public QBuy(Path<? extends Buy> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBuy(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBuy(PathMetadata metadata, PathInits inits) {
        this(Buy.class, metadata, inits);
    }

    public QBuy(Class<? extends Buy> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

