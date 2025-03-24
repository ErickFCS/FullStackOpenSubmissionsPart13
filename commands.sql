psql -U postgres
select current_database();
create database tests;
\c tests
\d
create table blogs(
    id serial primary key,
    author varchar(50),
    url varchar(50) not null,
    title varchar(50) not null,
    likes integer default 0
);
\d
insert into blogs(author, url, title, likes) values 
    ('Erick', 'me.com', 'The one', 0),
    ('Fernando', 'other.com', 'The real', 10);
select * from blogs;