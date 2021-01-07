create table DHT22(
    Date varchar(15) not null,
    Time varchar(15) not null,
    Temperature float not null,
    Humidity float not null,
    primary key (Date, Time)
);