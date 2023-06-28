create table passenger_mca(
name varchar2(100),
acc_num varchar2(10),
email varchar(50),
phone NUMBER(12),
address varchar(100),
CONSTRAINT pk_pass PRIMARY key (acc_num)
);

create table booking_mca(
acc_num varchar2(10),
booking_id varchar2(10),
train_number varchar2(10),
journey_date date,
fare float,
booking_status varchar2(10),
constraint pk_booking primary key(booking_id),
constraint fk_booking foreign key(acc_num) REFERENCES passenger_mca(acc_num)
);

insert into passenger_mca values('tuhin',1,'tuhin301201@gmail.com',8927774706,'canning');
insert into passenger_mca values('shrijon',2,'shirjon0133@gmail.com',9984672436,'behala');
insert into passenger_mca values('sumon',3,'011sumon@gmail.com',7709231254,'bokkhali');


create table payment_MCA (
booking_id varchar2(10),
payment_mode varchar(10),
payment_id varchar2(10),
amount float,
payment_status varchar2(20),
constraint pk_payment primary key(payment_id),
constraint fk_payment foreign key(booking_id) references BOOKING_MCA(booking_id)
);

create table seat_inventory_mca
(
train_number varchar2(10),
fare float,
seat_number varchar2(20),
seat_type varchar(20),
booking_status varchar(20),
constraint pk_seat_inventory primary key(seat_number)
);

create table cancellation_mca(
cancellation_charge number,
cancellation_date number,
booking_id varchar2(10),
cancellation_id varchar2(10),
constraint pk_cancellation primary key(cancellation_id),
constraint fk_cancellation FOREIGN KEY(booking_id) references booking_mca(booking_id));


create table train_mca(
destination varchar2(30),
origin varchar2(30),
train_name varchar2(30),
train_number varchar2(10),
constraint pk_train primary key(train_number)
);

alter table seat_inventory_mca
add constraint fk_seat_inventory FOREIGN KEY(train_number) references train_mca(train_number);


/*station table*/
create table station_mca
(
station_code varchar(20),
station_name varchar2(30),
location varchar(40),
constraint pk_station primary key(station_code)
);

create table routes_mca(
train_number varchar2(10),
route_id varchar2(30),
destination varchar2(30),
distance number,
constraint pk_routes primary key(route_id)
);

alter table station_mca
add constraint fk_station FOREIGN KEY(route_id) references routes_mca(route_id);

alter table routes_mca
add constraint fk_routes foreign key(train_number) references train_mca(train_number);

alter table booking_mca
add constraint fk_booking_train foreign key(train_number) references train_mca(train_number);


alter table train_mca
add constraint fk_origin FOREIGN KEY(origin) references station_mca(station_code);

alter table train_mca
add constraint fk_dest FOREIGN KEY(destination) references station_mca(station_code);

/*THE END*/
