create news collate utf8_general_ci;

use news;

create table news
(
    id      int auto_increment
        primary key,
    title   varchar(255) not null,
    content text         not null,
    image   varchar(31)  null,
    date    date         not null
);

create table comments
(
    id      int auto_increment
        primary key,
    news_id int          null,
    author  varchar(255) null,
    comment text         not null,
    constraint comments_news_id_fk
        foreign key (news_id) references news (id)
            on update cascade on delete cascade
);

insert into comments (id, news_id, author, comment)
values  (3, 6, 'Bakytai', 'ughh!'),
        (5, 5, null, 'someting'),
        (6, 7, 'Sergei', 'congratulations!');

insert into news (id, title, content, image, date)
values  (3, 'sdfh', 'sdfg', '4xvq3MauPK6wJGwtwVp0L.jpg', '2022-02-12'),
        (5, 'Title', 'content', null, '2022-02-12'),
        (6, 'weather', 'very cold', null, '2022-02-03'),
        (7, 'Построили новую Дорогу ОШ-ЖАЛАЛ АБАД', 'описание', null, '2022-02-12');

