create table migrations
(
    id        int auto_increment
        primary key,
    timestamp bigint       not null,
    name      varchar(255) not null
);

create table todo
(
    id        int auto_increment
        primary key,
    createdAt timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updatedAt timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    name      varchar(255)                              not null,
    userId    int                                       not null,
    deletedAt datetime(6)                               null
);

create index IDX_1e982e43f63a98ad9918a86035
    on todo (userId);

create table user
(
    id         int auto_increment
        primary key,
    createdAt  timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updatedAt  timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    email      varchar(255)                              not null,
    password   varchar(255)                              not null,
    deletedAt  datetime(6)                               null,
    isVerified tinyint      default 0                    not null,
    constraint IDX_e12875dfb3b1d92d7d7c5377e2
        unique (email)
);

create table verification
(
    id        int auto_increment
        primary key,
    createdAt timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updatedAt timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    userId    int                                       not null,
    token     varchar(255)                              not null,
    expiredAt timestamp                                 not null,
    deletedAt datetime(6)                               null,
    type      varchar(32)                               not null
);

create index IDX_8300048608d8721aea27747b07
    on verification (userId);

