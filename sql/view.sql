DROP VIEW IF EXISTS `v_product`;
CREATE VIEW v_product
AS
SELECT a.*,b.name as imgname
FROM product a
LEFT JOIN input_files b
ON a.bianhao = b.bianhao;

DROP VIEW IF EXISTS `v_cart`;
CREATE VIEW v_cart
AS
SELECT a.*,b.userid,b.num,c.name as imgname,b.bookingno
FROM product a
LEFT JOIN cart b
ON a.id = b.proID
LEFT JOIN input_files c
ON a.bianhao = c.bianhao;

DROP VIEW IF EXISTS `v_booking`;
CREATE VIEW v_booking
AS
SELECT a.*,b.userid,b.num,c.name as imgname,d.bookingno,d.date,d.state,d.address
FROM product a
LEFT JOIN cart b
ON a.id = b.proID
LEFT JOIN input_files c
ON a.bianhao = c.bianhao
LEFT JOIN booking d
ON b.bookingno = d.bookingno;

