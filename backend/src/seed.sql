-- categories
INSERT INTO categories (name, slug, image_url) VALUES
('Mực khô', 'muc-kho', 'https://images.unsplash.com/photo-1604908554025-9b8d1c9e2a1f'),
('Cá khô', 'ca-kho', 'https://images.unsplash.com/photo-1544025162-d76694265947'),
('Tôm khô', 'tom-kho', 'https://images.unsplash.com/photo-1548940740-204726a19be3'),
('Khô bò', 'kho-bo', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1'),
('Khô gà', 'kho-ga', 'https://images.unsplash.com/photo-1604909052743-94d55bdac559'),
('Khô mực rim', 'kho-muc-rim', 'https://images.unsplash.com/photo-1604909053020-7cdbaff342a2'),
('Cá chỉ vàng', 'ca-chi-vang', 'https://images.unsplash.com/photo-1604909052510-3b7e9e9a1e90'),
('Khô cá lóc', 'kho-ca-loc', 'https://images.unsplash.com/photo-1551218808-94e220e084d2'),
('Khô cá sặc', 'kho-ca-sac', 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe'),
('Combo đặc sản', 'combo-dac-san', 'https://images.unsplash.com/photo-1546554137-f86b9593a222');

-- products
INSERT INTO products
(name, slug, price, sale_price, stock, category_id, image_url, description, origin, weight)
VALUES
('Mực khô Phan Thiết loại 1', 'muc-kho-phan-thiet-loai-1', 320000, 299000, 50, 1,
 'https://images.unsplash.com/photo-1604909052743-94d55bdac559',
 'Mực khô thơm, ngọt tự nhiên, phù hợp nướng, xé ăn liền hoặc làm gỏi.',
 'Phan Thiết', '500g'),

('Mực khô Cà Mau size vừa', 'muc-kho-ca-mau-size-vua', 280000, NULL, 40, 1,
 'https://images.unsplash.com/photo-1604909053020-7cdbaff342a2',
 'Mực khô phơi 1 nắng, thịt dày, ít mặn.',
 'Cà Mau', '500g'),

('Cá khô chỉ vàng 1 nắng', 'ca-kho-chi-vang-1-nang', 160000, 139000, 80, 7,
 'https://images.unsplash.com/photo-1544025162-d76694265947',
 'Cá chỉ vàng thơm, chiên giòn hoặc nướng đều ngon.',
 'Nha Trang', '500g'),

('Cá khô chỉ vàng loại đặc biệt', 'ca-chi-vang-dac-biet', 190000, NULL, 70, 7,
 'https://images.unsplash.com/photo-1544025162-d76694265947',
 'Size cá lớn, thịt chắc, phù hợp làm quà.',
 'Nha Trang', '500g'),

('Tôm khô Cà Mau loại 1', 'tom-kho-ca-mau-loai-1', 450000, 419000, 35, 3,
 'https://images.unsplash.com/photo-1548940740-204726a19be3',
 'Tôm khô đỏ tự nhiên, thơm, ngọt, dùng làm gỏi, xôi, nấu canh.',
 'Cà Mau', '500g'),

('Tôm khô loại vừa', 'tom-kho-loai-vua', 320000, NULL, 60, 3,
 'https://images.unsplash.com/photo-1548940740-204726a19be3',
 'Tôm khô size vừa, giá tốt, phù hợp gia đình.',
 'Bạc Liêu', '500g'),

('Khô bò sợi cay nhẹ', 'kho-bo-soi-cay-nhe', 220000, 199000, 100, 4,
 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
 'Khô bò sợi mềm, vị cay nhẹ, ăn vặt hoặc nhậu.',
 'Sài Gòn', '250g'),

('Khô bò miếng tẩm mật ong', 'kho-bo-mieng-mat-ong', 260000, NULL, 80, 4,
 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
 'Khô bò miếng, ngọt nhẹ, thơm mùi mật ong.',
 'Sài Gòn', '250g'),

('Khô gà lá chanh', 'kho-ga-la-chanh', 160000, 145000, 120, 5,
 'https://images.unsplash.com/photo-1604908554025-9b8d1c9e2a1f',
 'Khô gà xé sợi, thơm lá chanh, ăn vặt dễ nghiện.',
 'Sài Gòn', '250g'),

('Khô gà cay', 'kho-ga-cay', 160000, NULL, 110, 5,
 'https://images.unsplash.com/photo-1604908554025-9b8d1c9e2a1f',
 'Khô gà vị cay, phù hợp người thích ăn đậm.',
 'Sài Gòn', '250g'),

('Khô cá lóc An Giang', 'kho-ca-loc-an-giang', 240000, 219000, 45, 8,
 'https://images.unsplash.com/photo-1551218808-94e220e084d2',
 'Khô cá lóc thịt dày, chiên hoặc nướng đều ngon.',
 'An Giang', '500g'),

('Khô cá lóc 1 nắng', 'kho-ca-loc-1-nang', 200000, NULL, 55, 8,
 'https://images.unsplash.com/photo-1551218808-94e220e084d2',
 'Khô cá lóc phơi 1 nắng, ít mặn.',
 'An Giang', '500g'),

('Khô cá sặc loại 1', 'kho-ca-sac-loai-1', 170000, 155000, 65, 9,
 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
 'Khô cá sặc thơm, nướng chấm mắm me.',
 'Đồng Tháp', '500g'),

('Khô cá sặc rim mặn ngọt', 'kho-ca-sac-rim-man-ngot', 180000, NULL, 60, 9,
 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
 'Khô cá sặc rim sẵn, tiện ăn liền.',
 'Đồng Tháp', '500g'),

('Khô mực rim me', 'kho-muc-rim-me', 180000, 169000, 75, 6,
 'https://images.unsplash.com/photo-1604909053020-7cdbaff342a2',
 'Mực rim me chua ngọt, dai vừa.',
 'Phan Thiết', '250g'),

('Khô mực rim cay', 'kho-muc-rim-cay', 180000, NULL, 70, 6,
 'https://images.unsplash.com/photo-1604909053020-7cdbaff342a2',
 'Mực rim cay, phù hợp ăn vặt.',
 'Phan Thiết', '250g'),

('Cá khô loại tổng hợp', 'ca-kho-tong-hop', 150000, NULL, 90, 2,
 'https://images.unsplash.com/photo-1544025162-d76694265947',
 'Combo cá khô nhiều loại, tiện chế biến.',
 'Nha Trang', '500g'),

('Cá khô đù 1 nắng', 'ca-kho-du-1-nang', 170000, 159000, 60, 2,
 'https://images.unsplash.com/photo-1544025162-d76694265947',
 'Cá đù 1 nắng, chiên giòn thơm.',
 'Nha Trang', '500g'),

('Combo mực + cá chỉ vàng', 'combo-muc-ca-chi-vang', 420000, 389000, 30, 10,
 'https://images.unsplash.com/photo-1546554137-f86b9593a222',
 'Combo quà tặng gồm mực khô và cá chỉ vàng.',
 'Phan Thiết', '1kg'),

('Combo tôm khô + khô bò', 'combo-tom-kho-kho-bo', 620000, 589000, 25, 10,
 'https://images.unsplash.com/photo-1546554137-f86b9593a222',
 'Combo đặc sản: tôm khô + khô bò.',
 'Cà Mau', '750g');

-- Bạn có thể copy thêm 10-15 dòng nữa nếu muốn đủ 30 sản phẩm.
