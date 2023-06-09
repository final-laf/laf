drop table if exists `banner_img`;

create table `banner_img` (
	`banner_no`	int	not null primary key auto_increment	comment '순서대로 화면에 출력',
	`product_no`	bigint	not null	comment '상품 아이디(seq_product_no)',
	`img_path`	varchar(300)	not null	comment '이미지 주소'
);

alter table `banner_img` add constraint `fk_product_to_banner_img_1` foreign key (
	`product_no`
)
references `product` (
	`product_no`
);

