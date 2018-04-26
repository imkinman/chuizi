SET NAMES UTF8;
DROP DATABASE IF EXISTS chuizi;
CREATE DATABASE chuizi CHARSET=UTF8;
USE chuizi;

#商品类别表
CREATE TABLE product_class(
    p_cid INT PRIMARY KEY AUTO_INCREMENT,
    p_cname VARCHAR(16)
);
INSERT INTO product_class VALUES
(1,"手机"),
(null,"'足迹'手感膜"),
(null,"官方配件"),
(null,"空气净化类"),
(null,"品牌周边"),
(null,"第三方商品");

#商品表
CREATE TABLE product(
    pid INT PRIMARY KEY AUTO_INCREMENT,
    p_class INT,                #外键：商品分类
    p_title VARCHAR(16),        #标题
    p_description VARCHAR(20),  #描述
    new_price VARCHAR(16),      #最新价格
    old_price VARCHAR(16),      #以前价格
    sale_count INT,             #已售数量
    total_count INT,            #剩余数量
    favourable VARCHAR(16),     #优惠
    f_description VARCHAR(512), #优惠信息
    spec    VARCHAR(2048),      #所有规格 规格名:[,,,];
    service_note VARCHAR(512),  #服务说明
    href VARCHAR(512),          #链接地址

    FOREIGN KEY(p_class) REFERENCES product_class(p_cid)
);
#商品图片表
CREATE TABLE product_pic(
    p_pid INT PRIMARY KEY AUTO_INCREMENT,
    product_pid INT,            #外键
    img_nomarl VARCHAR(256),
    img_big VARCHAR(256),
    img_huge VARCHAR(256),
    img_sub1 VARCHAR(256),
    img_sub2 VARCHAR(256),
    img_sub3 VARCHAR(256),
    img_sub4 VARCHAR(256),
    img_sub5 VARCHAR(256),
    img_info1 VARCHAR(1024),
    img_info2 VARCHAR(1024),
    img_info3 VARCHAR(1024),
    img_info4 VARCHAR(1024),
    img_info5 VARCHAR(1024),
    img_info6 VARCHAR(1024),
    img_info7 VARCHAR(1024),
    img_info8 VARCHAR(1024),
    img_info9 VARCHAR(1024),
    img_info10 VARCHAR(1024),

    FOREIGN KEY(product_pid) REFERENCES product(pid)
);

#轮播图
CREATE TABLE carrousel(
    cid INT PRIMARY KEY AUTO_INCREMENT,
    cname VARCHAR(32),
    src VARCHAR(512),
    href VARCHAR(512)
);
INSERT INTO carrousel VALUES
(null,"畅呼吸智能空气净化器提货兑换卡","./images/01-index/2_lunbo/lunbo-1-1.webp","./page/02-product-details.html"),
(null,"坚果2","./images/01-index/2_lunbo/lunbo-2-1.webp","./page/02-product-details.html"),
(null,"坚果3","./images/01-index/2_lunbo/lunbo-3-1.webp","./page/02-product-details.html"),
(null,"空气净化器","./images/01-index/2_lunbo/lunbo-4-1.webp","./page/02-product-details.html"),
(null,"空气净化器","./images/01-index/2_lunbo/lunbo-5-1.webp","./page/02-product-details.html");

#图片导航
CREATE TABLE imgNav(
    iid INT PRIMARY KEY AUTO_INCREMENT,
    iname VARCHAR(32),
    src VARCHAR(512),
    href VARCHAR(512)
);
INSERT INTO imgNav VALUES
(null,"空气净化器","./images/01-index/3_imgNav/1.png","./page/jianguo-accessories.html"),
(null,"坚果配件","./images/01-index/3_imgNav/2.png","./page/jianguo-accessories.html"),
(null,"秋款卫衣","./images/01-index/3_imgNav/3.png","./page/jianguo-accessories.html"),
(null,"防霾口罩","./images/01-index/3_imgNav/4.png","./page/02-product-details.html");

