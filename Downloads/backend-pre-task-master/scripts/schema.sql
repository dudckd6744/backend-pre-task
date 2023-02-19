CREATE DATABASE jober_pre_task CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE jober_pre_task;

CREATE TABLE profile_column (
    id int auto_increment primary key,
    label varchar(100) not null,
    type varchar(100) not null,
    data_key varchar(100) not null,
    parent_data_key varchar(100),
    created_at timestamp default CURRENT_TIMESTAMP not null,
    updated_at timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_at timestamp null
);

CREATE TABLE profile_column (
    id int auto_increment primary key,
    label varchar(100) not null,
    type varchar(100) not null,
    data_key varchar(100) not null,
    parent_data_key varchar(100),
    created_at timestamp default CURRENT_TIMESTAMP not null,
    updated_at timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_at timestamp null
);

CREATE TABLE user (
    id int auto_increment primary key,
    name varchar(100) not null,
    nick_name varchar(100),
    phone varchar(100),
    email varchar(100),
    birthday timestamp,
    gender enum("MAN","WOMAM"),
    address varchar(100),
    created_at timestamp default CURRENT_TIMESTAMP not null,
    updated_at timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_at timestamp null
);

CREATE TABLE career (
    id int auto_increment primary key,
    user_id varchar(100) not null,
    name varchar(100),
    duty varchar(100),
    join_date timestamp,
    resignation_date timestamp,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    updated_at timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_at timestamp null
    FOREIGN KEY(user_id)
    REFERENCES user(id) ON DELETE NO ACTION ON UPDATE CASCADE
);