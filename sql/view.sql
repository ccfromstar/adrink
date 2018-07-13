DROP VIEW IF EXISTS `v_product`;
CREATE VIEW v_product
AS
SELECT a.*,b.name as imgname
FROM product a
LEFT JOIN input_files b
ON a.bianhao = b.bianhao;
