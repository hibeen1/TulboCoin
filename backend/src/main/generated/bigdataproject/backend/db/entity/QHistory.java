package bigdataproject.backend.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QHistory is a Querydsl query type for History
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QHistory extends EntityPathBase<History> {

    private static final long serialVersionUID = -1788725760L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QHistory history = new QHistory("history");

    public final NumberPath<Double> historyCoinAmount = createNumber("historyCoinAmount", Double.class);

    public final StringPath historyCoinCode = createString("historyCoinCode");

    public final StringPath historyCoinName = createString("historyCoinName");

    public final NumberPath<Integer> historyCoinPrice = createNumber("historyCoinPrice", Integer.class);

    public final NumberPath<Long> historySeq = createNumber("historySeq", Long.class);

    public final DateTimePath<java.time.LocalDateTime> historyTime = createDateTime("historyTime", java.time.LocalDateTime.class);

    public final EnumPath<HistoryType> historyType = createEnum("historyType", HistoryType.class);

    public final QUser user;

    public QHistory(String variable) {
        this(History.class, forVariable(variable), INITS);
    }

    public QHistory(Path<? extends History> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QHistory(PathMetadata metadata, PathInits inits) {
        this(History.class, metadata, inits);
    }

    public QHistory(Class<? extends History> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

