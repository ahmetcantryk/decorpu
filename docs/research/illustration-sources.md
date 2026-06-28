# DECORPU — İllüstrasyon Kaynakları & Nasıl Bulunur

Banner ve sayfalardaki klasik mimari çizimler **kamu malı (public-domain) gravürlerdir** — telifsiz, ücretsiz, ticari kullanıma açık, "yapay zeka" değil. Bu dosya: ne kullandık, nereden/nasıl bulursun, nasıl işlersin.

## 1. Şu an kullandığımız görsel
- **Eser:** "Les Cinq Ordres de Colonnes des Grecs et des Romains" (Yunan ve Romalıların Beş Sütun Düzeni) — Diderot & d'Alembert *Encyclopédie* (18. yy).
- **Kaynak:** Wikimedia Commons → dosya `Encyclopedie volume 1-195.png`.
- **Kategori:** [Drawings of architectural orders](https://commons.wikimedia.org/wiki/Category:Drawings_of_architectural_orders).
- **Lisans:** Public domain (1900 öncesi). Serbest.
- Dosyalar: `public/brand/orders.png` (5 sütun), `orders-left.png` (Toskan+Dor), `orders-right.png` (Korint+Kompozit) — siyah→antrasit, beyaz→şeffaf işlenmiş hali.

## 1.b Banner çerçevesi (façade yapısı)
Kullanıcı isteği: solda sütun · sağda sütun · üstte çatı (alınlık) · ortada duvar dekoru (referans: klasik villa cephesi + panel/wainscot görselleri).
- **Sütunlar (yanlar):** Encyclopédie "Beş Düzen" levhası → `orders-left.png` / `orders-right.png`.
- **Alınlık tacı (üst):** MET "Design for a Doorway" (kırık/swan-neck pediment + vazo + akantus friz) — public domain → `public/brand/pediment.png`. Kaynak araması: Wikimedia "Design for a Doorway / Door Case / Chimneypiece" (MET, Yale).
- **Duvar paneli (orta):** temiz iç içe dikdörtgen molding (SVG, `.line-art-sketch`) — referans panel/wainscot ([2]/[4]) sadeleştirilmiş hali.
- Hepsi antrasit + şeffaf, soluk (opacity ~%50), masaüstünde; mobilde gizli (Lemonade-temiz).

## 2. Bu şekiller NE? (Beş Klasik Düzen)
Soldan sağa, gittikçe süslü: **Toskan → Dor → İyon → Korint → Kompozit**. Her sütunun parçaları (= DecorPU'nun ürettiği şeyler):
- **Kaide / Pedestal** (base) — alttaki ayak.
- **Gövde / Shaft** — kanallı (fluted) uzun kısım.
- **Başlık / Capital** — üstteki süs: Dor sade, İyon **volüt** (kıvrım), Korint **akantus yaprağı**, Kompozit ikisinin birleşimi.
- **Saçaklık / Entablature** — en üstteki yatay blok (architrave + friz + korniş/silme).
Yani: söve, sütun, başlık, kartonpiyer/korniş, kaide — hepsi bu çizimlerde var.

## 3. NEREDEN bulunur (ücretsiz, telifsiz)
| Kaynak | Link | Not |
|---|---|---|
| **Wikimedia Commons** | commons.wikimedia.org | En kolayı. Kategori + arama. |
| **Internet Archive** | archive.org | Eski mimari kitaplarının taramaları (Vignola, Palladio, Chambers). |
| **BnF Gallica** | gallica.bnf.fr | Encyclopédie & Fransız levhalar, yüksek çözünürlük. |
| **NYPL Digital Collections** | digitalcollections.nypl.org | Public-domain, yüksek çöz. |
| **Old Book Illustrations** | oldbookillustrations.com | Seçilmiş gravürler. |
| **Rawpixel** | rawpixel.com | Public-domain derlemesi (bir kısmı ücretsiz). |
| **Met / Smithsonian Open Access** | metmuseum.org, si.edu | Müze açık erişim. |

## 4. NASIL aranır (en iyi sonuç İngilizce terimlerle)
Arama kelimeleri: `architectural orders`, `five orders of architecture`, `Vignola orders`, `column order engraving`, `classical column`, `entablature`, `cornice engraving`, `pilaster`, `pediment`, `ceiling rose / rosette engraving`, `fireplace mantel engraving`, `acanthus ornament`.
1. commons.wikimedia.org'a gir, terimi yaz.
2. Eski **gravür** (engraving) olanları seç — 1900 öncesi = public domain.
3. İlgili kategoriler: `Category:Drawings of architectural orders`, `Category:Classical orders`, `Category:Architectural elements in art`, `Category:Cornices`, `Category:Ceiling roses`.
4. Görsele tıkla → **en yüksek çözünürlüğü** indir (orijinal dosya).
5. Lisansın "Public domain" yazdığını teyit et.

## 5. NASIL işlenir (siyah çizim → markaya uygun şeffaf)
Bizim yaptığımız (script: `tools/scraper/process-eng.mjs`, `sharp` ile): kırp → gri-tonla → kontrast → **koyu = opak, beyaz = şeffaf** + antrasit renk → PNG.
Elle yapmak istersen (Photopea/Photoshop/GIMP — Photopea ücretsiz, tarayıcıda):
1. Görseli aç, gerekli kısmı **kırp** (kırk yazıları/çerçeveyi at).
2. **Desaturate** (gri).
3. **Levels/Curves** ile arka planı beyaza, çizgileri koyuya çek.
4. Beyazı sil: katmanı **Multiply** yap ya da "Select → Color Range → white → delete".
5. Üstüne **antrasit renk** (Color Overlay) ver.
6. **PNG (şeffaf)** dışa aktar.

## 6. Ürüne ÖZEL çizimler için en iyi kaynak: KENDİ DWG'niz
Gravürler "marka dili / dekor" için. Gerçek **ürün** çizimleri için `docs/DWG(Autocad).dwg` → SVG/DXF export (LibreCAD ücretsiz, ya da online DWG→SVG). Bunlar birebir DecorPU ürünleri → ürün detay sayfalarında ölçülü teknik çizim olarak kullanılır.

## 7. Sıradaki bölümler için aday görseller (aynı yöntemle)
- Kategori başlıkları: korniş/kartonpiyer profili, kemer, kubbe rozeti, şömine kuşağı gravürleri.
- "Atölye" bölümü: akantus/ornament gravürü.
- Hepsi Wikimedia + §4 terimleriyle bulunur; istersen ben çekip işlerim.
