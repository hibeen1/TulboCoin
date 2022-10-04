package bigdataproject.backend.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSell is a Querydsl query type for Sell
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QSell extends EntityPathBase<Sell> {

    private static final long serialVersionUID = 2033636710L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSell sell = new QSell("sell");

    public final NumberPath<Double> sellCoinAmount = createNumber("sellCoinAmount", Double.class);

    public final StringPath sellCoinCode = createString("sellCoinCode");

    public final StringPath sellCoinName = createString("sellCoinName");

    public final NumberPath<Integer> sellCoinPrice = createNumber("sellCoinPrice", Integer.class);

    public final NumberPath<Long> sellSeq = createNumber("sellSeq", Long.class);

    public final DateTimePath<java.time.LocalDateTime> sellTime = createDateTime("sellTime", java.time.LocalDateTime.class);

    public final QUser user;

    public QSell(String variable) {
        this(Sell.class, forVariable(variable), INITS);
    }

    public QSell(Path<? extends Sell> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSell(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSell(PathMetadata metadata, PathInits inits) {
        this(Sell.class, metadata, inits);
    }

    public QSell(Class<? extends Sell> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

