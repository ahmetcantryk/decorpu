insert into products (code, slug, category_id, name_tr, price, width_mm, length_mm, height_mm, is_active, material, currency)
select v.code, v.slug, c.id, v.name_tr, v.price, v.w, v.l, v.h, true, 'Poliüretan', 'TRY'
from (values
('P82010F','p82010f','cita-kose','Poliüretan Çıta Köşesi Modelleri ve Fiyatları',145,190,190,24),
('P82012A','p82012a','cita-kose','Dekoratif Poliüretan Çıta Köşesi P82012A',263,280,280,30),
('P82015A','p82015a','cita-kose','Dekoratif Poliüretan Desenli Çıta Köşe Modeli',182,240,240,30),
('P82015C','p82015c','cita-kose','Poliüretan Desenli Duvar Çıtası Köşe Modeli',236,245,245,30),
('P82017A','p82017a','cita-kose','Poliüretan Klasik Çıta Köşesi P82017A',291,348,257,27),
('P82019A','p82019a','cita-kose','Poliüretan Desenli Klasik Duvar Çıtası Köşe Modeli',300,280,280,24),
('P82024A','p82024a','cita-kose','Klasik Desenli Poliüretan Çıta Köşe Modeli',999,710,710,37),
('P82052B','p82052b','cita-kose','Poliüretan Klasik Desenli Duvar Çıtası Köşe Modeli',727,410,410,38),
('P85002A','p85002a','cita-kose','Poliüretan Düz Duvar Çıtası Köşe Birleşim Elemanı',164,111,111,15),
('P85002B','p85002b','cita-kose','Poliüretan Klasik Çıta Köşe Modeli',173,195,195,22),
('P85002C','p85002c','cita-kose','Dekoratif Poliüretan Çıta Köşesi Modelleri',154,160,160,27),
('P85002D','p85002d','cita-kose','Poliüretan Desenli Duvar Çıtası Köşe Modeli',164,200,200,22),
('P83000','p83000','kisa-roma-sutun','Poliüretan Kısa Roma Sütunu ve Dekoratif Kaide Modeli',9653,356,356,1070),
('P83000C','p83000c','kisa-roma-sutun','Poliüretan Kısa Roma Sütun Tasarımı',9945,350,350,1070),
('P83000D','p83000d','kisa-roma-sutun','Dekoratif Poliüretan Kısa Roma Sütun ve Sehpa Altlığı Modeli',8011,350,350,1070),
('P83000I','p83000i','kisa-roma-sutun','Dekoratif Poliüretan Kısa Roma Sütunu ve Kaide Tasarımları',9682,350,350,1070),
('P83001','p83001','kisa-roma-sutun','Dekoratif Poliüretan Kısa Roma Sütun Modeli',12748,356,356,1076),
('P83001C','p83001c','kisa-roma-sutun','Klasik Tasarımlı Dekoratif Poliüretan Kısa Roma Sütun Modeli',13041,350,350,1105),
('P83001D','p83001d','kisa-roma-sutun','Dekoratif Poliüretan Kısa Roma Sütun ve Kaide Modeli',11107,350,350,949),
('P83001I','p83001i','kisa-roma-sutun','Poliüretan Kısa Roma Sütun Modeli',12777,350,350,926),
('P83005','p83005','kisa-roma-sutun','Poliüretan Kısa Roma Sütun Modelleri',9539,356,356,1070),
('P83005C','p83005c','kisa-roma-sutun','Dekoratif Poliüretan Kısa Roma Sütunu Modelleri',9831,350,350,1070),
('P83005D','p83005d','kisa-roma-sutun','Dekoratif Poliüretan Kısa Roma Sütun ve Kaide Modeli',7898,350,350,1070),
('P83005I','p83005i','kisa-roma-sutun','Poliüretan Kısa Roma Sütun Modeli',9568,350,350,1070),
('P83006','p83006','kisa-roma-sutun','Poliüretan Kısa Sütun Modelleri ve Dekoratif Tasarımları',10554,356,356,1070),
('P83006C','p83006c','kisa-roma-sutun','Dekoratif Poliüretan Kısa Roma Sütun Modelleri',10847,350,350,1070),
('P8401','p8401','somine','Poliüretan Şömine Çerçevesi ve Dekoratif Panel Modeli',22213,307,1446,1050),
('P8402','p8402','somine','Poliüretan Şömine Çerçevesi Modeli',15796,195,1205,1050),
('P8403','p8403','somine','Poliüretan Şömine Çerçevesi Modelleri',24878,307,1446,1050),
('P8403W','p8403w','somine','Klasik Tasarımlı Poliüretan Şömine Çerçevesi Modelleri',36499,480,1446,1050),
('PH10GSI','ph10gsi','somine','Poliüretan Elektrikli Şömine Haznesi ve Dekoratif Kasa Modeli',15275,145,810,870),
('PH20GSI','ph20gsi','somine','Poliüretan Şömine Haznesi Elektrikli Yapay Ateş Ünitesi',15275,220,750,627),
('KSOM8401H','ksom8401h','somine','Klasik Tasarımlı Poliüretan Şömine Çerçevesi Modeli',43131.8,307,1446,1050),
('KSOM8402H','ksom8402h','somine','Poliüretan Şömine Çerçevesi ve Dekoratif Şömine Modeli',36714.8,195,1205,1050),
('KSOM8403H','ksom8403h','somine','Poliüretan Şömine Çerçevesi Modelleri',45796.8,307,1446,1050),
('KSOM8403WH','ksom8403wh','somine','Poliüretan Klasik Dekoratif Şömine Çerçevesi Modeli',51774,480,1446,1050),
('KPEN11','kpen11','pencere-sove','Poliüretan Klasik Pencere Söve Seti ve Kenarlık Tasarımları',21051,217,2000,2280),
('KPEN29','kpen29','pencere-sove','Poliüretan Pencere Sövesi ve Dekoratif Süsleme Modeli',18981,257,2080,2330),
('KPEN30','kpen30','pencere-sove','Poliüretan Klasik Pencere Söve ve Alınlık Modeli',22716,220,2160,2660)
) as v(code, slug, cat_slug, name_tr, price, w, l, h)
join categories c on c.slug = v.cat_slug
on conflict (code) do nothing;

insert into product_images (product_id, url, is_primary)
select p.id, 'https://polure.com/a/media/' || p.slug || '/' || p.slug || '-800w.jpg', true
from products p
where p.slug in ('p82010f','p82012a','p82015a','p82015c','p82017a','p82019a','p82024a','p82052b','p85002a','p85002b','p85002c','p85002d','p83000','p83000c','p83000d','p83000i','p83001','p83001c','p83001d','p83001i','p83005','p83005c','p83005d','p83005i','p83006','p83006c','p8401','p8402','p8403','p8403w','ph10gsi','ph20gsi','ksom8401h','ksom8402h','ksom8403h','ksom8403wh','kpen11','kpen29','kpen30')
  and not exists (select 1 from product_images pi where pi.product_id = p.id);