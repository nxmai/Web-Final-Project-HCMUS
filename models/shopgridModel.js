const listProduct = [{
    id: 1,
    thumbnail: 'images/iphone-xr-64gb.png',
    category: 'Smartphone',
    title: 'Iphone XR 64 GB',
    price: 14990000,
    describe: 'Là chiếc điện thoại iPhone có mức giá dễ chịu, phù hợp với nhiều khách hàng hơn, iPhone Xr vẫn được ưu ái trang bị chip Apple A12 mạnh mẽ, màn hình tai thỏ cùng khả năng chống nước chống bụi.',
    specification1: 'IPS LCD, 6.1", Liquid Retina',
    specification2: '3 GB RAM',
    specification3: '2942 mAh PIN'
},
{
    id: 2,
    thumbnail: 'images/oppo-a93.png',
    category: 'Smartphone',
    title: 'OPPO A93',
    price: 7490000,
    describe: 'Tháng 9/2020, OPPO tiếp tục cho ra mắt dòng sản phẩm thuộc phân khúc điện thoại tầm trung được xem là tiếp nối từ OPPO A92 với nhiều điểm được nâng cấp như hiệu năng, hệ thống camera cùng khả năng sạc nhanh 18W với tên gọi OPPO A93.',
    specification1: 'AMOLED, 6.43", Full HD+',
    specification2: '8 GB RAM',
    specification3: '4000 mAh PIN'
},
{
    id: 3,
    thumbnail: 'images/dell-inspiron-5593-i5.jpg',
    category: 'Laptop',
    title: 'Laptop Dell Inspiron 5593 i5',
    price: 17490000,
    describe: 'Laptop Dell Inspiron 5593 nằm ở phân khúc laptop cao cấp, là trợ thủ công nghệ đắc lực dành cho những doanh nhân khi sở hữu chiếc laptop có màn hình lớn, thiết kế tinh tế, thời trang và hiệu năng cực đỉnh.',
    specification1: 'Intel Core i5 Ice Lake, 1035G1, 1.00 GHz',
    specification2: '8 GB, DDR4 (2 khe), 2666 MHz',
    specification3: 'SSD 256GB NVMe PCIe, Hỗ trợ khe cắm HDD SATA'
},
{
    id: 4,
    thumbnail: 'images/apple-macbook-air-2017.jpg',
    category: 'Laptop',
    title: 'Laptop Apple MacBook Air 2017 i5',
    price: 20490000,
    describe: 'MacBook Air 2017 i5 128GB là mẫu laptop văn phòng, có thiết kế siêu mỏng và nhẹ, vỏ nhôm nguyên khối sang trọng. Máy có hiệu năng ổn định, thời lượng pin cực lâu 12 giờ, phù hợp cho hầu hết các nhu cầu làm việc và giải trí.',
    specification1: 'Intel Core i5 Broadwell, 1.80 GHz',
    specification2: '8 GB, DDR3L(On board), 1600 MHz',
    specification3: 'SSD: 128 GB'
},
{
    id: 5,
    thumbnail: 'images/oppo-watch.jpg',
    category: 'Smartwatch',
    title: 'Oppo Watch 46mm',
    price: 7490000,
    describe: 'Đồng hồ thông minh Oppo Watch màu đen phiên bản 46mm sử dụng mặt đồng hồ vuông, bo cong nhẹ ở 4 cạnh, cùng với mặt kính bo cong 2D sang hai bên có chiều sâu tạo cảm giác như mặt kính cong 3D.',
    specification1: '1.91 inch',
    specification2: '46 mm',
    specification3: 'Wifi, Bluetooth v4.2, GPS'
},
{
    id: 6,
    thumbnail: 'images/samsung-galaxy-note-10-plus.png',
    category: 'Smartphone',
    title: 'Samsung Galaxy Note 10+',
    price: 16490000,
    describe: 'Trông ngoại hình khá giống nhau, tuy nhiên Samsung Galaxy Note 10+ sở hữu khá nhiều điểm khác biệt so với Galaxy Note 10 và đây được xem là một trong những chiếc máy đáng mua nhất trong năm 2019, đặc biệt dành cho những người thích một chiếc máy màn hình lớn, camera chất lượng hàng đầu.',
    specification1: 'Dynamic AMOLED, 6.8", Quad HD+ (2K+)',
    specification2: 'Chính 12 MP & Phụ 12 MP, 16 MP, TOF 3D',
    specification3: '12 GB'
}
];

exports.list = () => {
    return listProduct;
}
exports.list_logo_image = () => {
    return [{
            thumbnail: "images/apple-logo.png"
        },
        {
            thumbnail: "images/samsung-logo.png"
        },
        {
            thumbnail: "images/xiaomi-logo.png"
        },
        {
            thumbnail: "images/oppo-logo.png"
        }
    ]
}

exports.get = (id) => {
    console.log(listProduct[id]);
    return listProduct[id];
}