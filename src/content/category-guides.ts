/**
 * Kategori SEO rehberleri (TR) — kategori sayfasının altına eklenen derin içerik + SSS.
 * Kaynak strateji: docs/research/kartonpiyerdeposu/analiz.md §8 (GSC 16 ay gerçek sorgu verisi).
 * Yalnız TR locale'de gösterilir; SSS bölümü FAQPage schema olarak da işaretlenir.
 */

export interface GuideSection {
  h: string;
  body: string;
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface CategoryGuide {
  /** H2 olarak basılır. */
  title: string;
  intro: string;
  sections: GuideSection[];
  faq: GuideFaq[];
}

export const CATEGORY_GUIDES: Record<string, CategoryGuide> = {
  kartonpiyer: {
    title: "Kartonpiyer Modelleri Rehberi",
    intro:
      "Kartonpiyer, tavan ile duvarın birleşim çizgisini taçlandıran dekoratif profildir. DecorPU olarak kartonpiyeri poliüretandan, proje bazlı ve kod sistemiyle üretiyoruz: her modelin net ölçüsü, teknik çizimi ve ürün kodu vardır. Bu sayfadaki modelleri teklif sepetinize ekleyip tek formla projeye özel fiyat alabilirsiniz.",
    sections: [
      {
        h: "Poliüretan mı, alçı kartonpiyer mi?",
        body:
          "Alçı kartonpiyer geleneksel görünümüyle bilinir; ancak ağırdır, kırılgandır ve montajı ustalık ister. Poliüretan kartonpiyer ise alçının dokusunu birebir verirken çok daha hafiftir: tavana yapıştırıcıyla uygulanır, çatlamaz, nemden etkilenmez ve boyanabilir. Banyo, mutfak ve dış cephe gibi alçının dayanamadığı yerlerde de güvenle kullanılır. Uygulama hızı sayesinde işçilik maliyeti de belirgin şekilde düşer.",
      },
      {
        h: "Köpük (strafor) kartonpiyerden farkı",
        body:
          "Piyasada 'köpük kartonpiyer' olarak satılan strafor profiller ucuzdur ama yüzeyleri pürüzlüdür, darbeyle ezilir ve keskin desen tutmaz. Yüksek yoğunluklu poliüretan, sert ve homojen yüzeyi sayesinde alçı kalitesinde keskin desen verir; silinebilir ve uzun ömürlüdür. Kalıcı bir iş isteyen projelerde poliüretan doğru tercihtir.",
      },
      {
        h: "Salon ve tavan için model seçimi",
        body:
          "Model seçiminde iki ölçü belirleyicidir: tavan yüksekliği ve mekânın sadeliği. 2,6–2,8 m tavanlarda 6–10 cm'lik düz (sade) profiller mekânı yormaz; 3 m üzeri tavanlarda 12 cm ve üzeri desenli modeller dengeli durur. Klasik projelerde desenli kartonpiyer, kat silmesi ve taç profilleriyle bütün oluşturur; modern projelerde düz profiller ve gizli ışık kartonpiyeri öne çıkar. Her ürün sayfasında en-boy-yükseklik ölçüleri mm cinsinden verilir.",
      },
      {
        h: "Gizli ışık (LED) kartonpiyer",
        body:
          "Tavana dolaylı, gölgesiz aydınlatma isteyen projelerde gizli ışık kartonpiyeri kullanılır: profilin arkasındaki kanala LED şerit yerleştirilir, ışık tavana yıkanarak yayılır. DecorPU gizli ışık modelleri LED kanal derinliği düşünülerek üretilir; ölçüler ve montaj yönü teknik çizimlerde belirtilir. Modelleri görmek için Kartonpiyer kategorisindeki Gizli Işık alt kategorisine bakabilirsiniz.",
      },
      {
        h: "Fiyat nasıl belirlenir?",
        body:
          "Kartonpiyerde fiyat; profil kesitine (genişlik-yükseklik), desen yoğunluğuna ve toplam metraja göre değişir. DecorPU'da liste fiyatı yerine proje bazlı teklif modeli uygulanır: beğendiğiniz modellerin kodlarını teklif sepetine ekleyin, metrajınızı not düşün; satış ekibimiz aynı gün içinde projeye özel fiyat ve teslim süresiyle döner. Mimarlar için DWG teknik çizim paketi ve katalog PDF'i sayfanın üst menüsünden indirilebilir.",
      },
    ],
    faq: [
      {
        q: "Poliüretan kartonpiyer boyanabilir mi?",
        a: "Evet. Yüzey astar gerektirmeden su bazlı boyalarla boyanabilir; duvar veya tavan rengiyle bütünleştirilebilir ya da kontrast renkte vurgulanabilir.",
      },
      {
        q: "Kartonpiyer montajı nasıl yapılır?",
        a: "Poliüretan kartonpiyer, poliüretan yapıştırıcıyla tavan-duvar birleşimine yapıştırılır; ek yerleri aynı malzemeyle doldurulup zımparalanır. Hafif olduğu için vida gerektirmez ve tek usta ile hızlı ilerler.",
      },
      {
        q: "Banyo ve mutfakta kullanılır mı?",
        a: "Evet. Poliüretan nemden etkilenmez, şişme ve dökülme yapmaz; alçının kullanılamadığı ıslak hacimlerde ve dış cephede güvenle kullanılır.",
      },
      {
        q: "Kartonpiyer DWG çizimlerini nereden indirebilirim?",
        a: "Tüm modellerin AutoCAD (DWG) teknik çizim paketi sitedeki 'Teknik Çizimler (DWG)' bağlantısından ücretsiz indirilebilir; katalog PDF'i de aynı menüdedir.",
      },
      {
        q: "Fiyat listesi neden yok?",
        a: "Üretim proje bazlı yapıldığı için fiyat; model, metraj ve teslim koşullarına göre hesaplanır. Ürün kodlarını teklif sepetiyle gönderdiğinizde size özel güncel fiyat iletilir.",
      },
    ],
  },

  "panel-kaplama": {
    title: "Duvar Paneli Modelleri Rehberi",
    intro:
      "Dekoratif duvar panelleri, düz bir duvarı derinliği olan mimari bir yüzeye çeviren en hızlı çözümdür. DecorPU 3D duvar panellerini poliüretandan üretir: hafif, boyanabilir ve yapıştırıcıyla uygulanan paneller; salon, yatak odası, ofis ve mağaza projelerinde tek günde dönüşüm sağlar. Her modelin kodu, ölçüsü ve teknik çizimi ürün sayfasında yer alır.",
    sections: [
      {
        h: "Hangi mekâna hangi panel?",
        body:
          "Salonda TV arkası duvar, panel uygulamasının en çok tercih edildiği alandır: doku veren 3D modeller aydınlatmayla birleşince güçlü bir odak duvarı oluşturur. Yatak odasında yatak başı duvarı, girişte hol duvarı ve ofislerde toplantı odası fon duvarı diğer güçlü kullanım alanlarıdır. Sade mekânlarda geometrik desenler, klasik projelerde çıta-lambri kombinasyonları dengeli sonuç verir.",
      },
      {
        h: "Poliüretan panelin avantajları",
        body:
          "MDF ve alçıpan alternatiflerine göre poliüretan panel; neme dayanıklıdır, çok hafiftir ve duvara poliüretan yapıştırıcıyla uygulanır — vida, dübel ve taşıyıcı profil gerektirmez. Yüzeyi boyanabilir olduğundan her projede istenen renge uyarlanır. Isı ve ses açısından da katkı sağlar; dış cepheye uygun modeller ayrıca belirtilir.",
      },
      {
        h: "TV arkası panel uygulaması",
        body:
          "TV ünitesi duvarında panelin ekran genişliğinden en az 40-50 cm taşması görsel dengeyi kurar. Kablo kanalı ve LED şerit detayı uygulamadan önce planlanmalıdır; panellerin arkasında kablo geçişi için boşluk bırakılabilir. Desenli panellerde ek yerlerinin desen akışına göre hizalanması için ürün sayfasındaki ölçülerle duvar krokisi çıkarmanızı öneririz — teklif aşamasında yerleşim için destek veriyoruz.",
      },
      {
        h: "Fiyat ve teklif süreci",
        body:
          "Panel fiyatı; modelin desen derinliğine, panel ölçüsüne ve toplam metrekareye göre belirlenir. Kod(lar)ı teklif sepetine ekleyip duvar ölçünüzü not olarak yazın; ekibimiz adet hesabını yapıp projeye özel fiyatla döner. Mimarlar için DWG çizim paketi ve katalog PDF üst menüden indirilebilir.",
      },
    ],
    faq: [
      {
        q: "Duvar paneli m² fiyatı ne kadar?",
        a: "Fiyat modele ve metraja göre değişir; liste fiyatı yerine proje bazlı teklif veriyoruz. Teklif sepetine model kodunu ve duvar ölçünüzü eklediğinizde aynı gün fiyat iletilir.",
      },
      {
        q: "Paneller duvara nasıl monte edilir?",
        a: "Temiz ve düz yüzeye poliüretan yapıştırıcıyla uygulanır; ek yerleri macunlanıp zımparalanarak boyaya hazır hale getirilir. Vida veya taşıyıcı sistem gerekmez.",
      },
      {
        q: "Panel boyanabilir mi, hangi renkte gelir?",
        a: "Paneller boyanmaya hazır beyaz yüzeyle teslim edilir; su bazlı boyalarla istediğiniz renge boyanabilir.",
      },
      {
        q: "Islak hacimlerde (banyo/mutfak) kullanılabilir mi?",
        a: "Evet. Poliüretan neme dayanıklıdır; banyo ve mutfak duvarlarında form kaybı yaşamadan kullanılır.",
      },
      {
        q: "TV arkası panel için ölçüyü nasıl vermeliyim?",
        a: "Duvarın en-boy ölçüsünü ve varsa niş/priz konumlarını teklif notuna yazmanız yeterli; adet hesabını ve desen yerleşimini ekibimiz sizinle birlikte netleştirir.",
      },
    ],
  },

  "gizli-isik": {
    title: "Gizli Işık (LED) Kartonpiyer Rehberi",
    intro:
      "Ledli kartonpiyer (gizli ışık kartonpiyeri), tavana gölgesiz ve dolaylı aydınlatma vermenin en şık yoludur: profilin arka kanalına LED şerit yerleştirilir, ışık tavana yıkanarak yayılır. DecorPU gizli ışık modelleri LED kanalı düşünülerek üretilir; her modelin kanal derinliği ve montaj yönü teknik çiziminde belirtilir.",
    sections: [
      {
        h: "Ledli stropiyer nasıl çalışır?",
        body:
          "Profil, tavandan birkaç santim boşluk kalacak şekilde duvara monte edilir; LED şerit üst kanala döşenir ve ışık doğrudan görünmeden tavana vurur. Böylece göz almayan, otel konforunda bir ambiyans elde edilir. Sıcak beyaz (2700-3000K) şeritler yaşama alanlarında, nötr beyaz çalışma alanlarında tercih edilir.",
      },
      {
        h: "Model ve ölçü seçimi",
        body:
          "Tavan yüksekliği 2,7 m civarındaysa 8-10 cm'lik profiller yeterli boşluk verir; yüksek tavanlarda daha derin kanallı büyük modeller kullanılabilir. Düz hatlı modeller modern projelerde, desenli gövdeler klasik projelerde tercih edilir. Trafo ve şerit ek yerlerinin erişilebilir bir noktada planlanması montajı kolaylaştırır.",
      },
      {
        h: "Montaj ve elektrik detayı",
        body:
          "Poliüretan profil, poliüretan yapıştırıcıyla duvara uygulanır; hafif olduğu için vida gerekmez. LED beslemesi için uygulama öncesi elektrik hattının profil hizasına getirilmesi yeterlidir. Ek yerleri macunlanıp zımparalandıktan sonra profil tavan rengine boyanabilir.",
      },
    ],
    faq: [
      { q: "LED şerit dahil mi?", a: "Profiller LED şerit olmadan teslim edilir; kanal ölçüsü standart 10-12 mm şeritlere uygundur. Talep ederseniz teklife LED ve trafo da eklenebilir." },
      { q: "Işık noktaları (benekler) görünür mü?", a: "Kanal derinliği doğru modelde şerit tavandan görünmez; ışık yalnızca yansıyarak yayıldığı için benek oluşmaz." },
      { q: "Mevcut kartonpiyerin üstüne uygulanır mı?", a: "Hayır, gizli ışık profili doğrudan duvara uygulanır. Mevcut kartonpiyerin sökülmesi ya da altına ayrı hat planlanması gerekir; teklif aşamasında yönlendiriyoruz." },
      { q: "Hangi mekânlarda kullanılır?", a: "Salon, yatak odası, koridor, otel ve mağaza tavanlarında; neme dayanıklı olduğu için banyo tavanlarında da güvenle kullanılır." },
    ],
  },

  kiris: {
    title: "Ahşap Görünümlü Kiriş, Mertek ve Kütük Rehberi",
    intro:
      "Rustik ahşap kiriş görünümünü gerçek ahşabın ağırlığı, maliyeti ve bakım derdi olmadan veren poliüretan kirişler; villa tavanları, restoranlar, dağ evleri ve kafe projelerinin vazgeçilmezidir. DecorPU kütük, mertek ve kiriş modelleri gerçek ahşap dokusundan kalıplanır — çatlak ve damar deseni birebirdir.",
    sections: [
      {
        h: "Poliüretan kiriş vs gerçek ahşap",
        body:
          "Gerçek ahşap kiriş ağırdır, taşıyıcı gerektirir, zamanla çalışır ve böceklenir. Poliüretan kiriş içi boş ve çok hafiftir: tavana yapıştırıcı ve az sayıda vida ile uygulanır, statik yük getirmez. Eskitme ve koyu ahşap tonlarında boyanabilir; yakından bakıldığında dahi gerçeğinden ayırt edilmesi zordur.",
      },
      {
        h: "Kütük, mertek, kiriş — hangisi?",
        body:
          "Kiriş geniş kesitli ana taşıyıcı görünümünü, mertek daha ince ve sık aralıklı tavan dokusunu, kütük ise yuvarlak-doğal odun görünümünü verir. Villa tavanında ana kirişler + aralarda mertek kombinasyonu klasik uygulamadır; köy evi ve dağ evi konseptinde eskitme kütük öne çıkar.",
      },
      {
        h: "Fiyatlandırma ve teklif",
        body:
          "Poliüretan kiriş fiyatları kesit ölçüsüne (genişlik × yükseklik) ve boya göre belirlenir; gerçek ahşaba göre toplam maliyet işçilik dahil belirgin şekilde düşüktür. Modellerin kodlarını teklif sepetine ekleyip tavan ölçünüzü not düşün; yerleşim planı ve adet hesabıyla birlikte projeye özel fiyat iletilir.",
      },
    ],
    faq: [
      { q: "Ahşap görünümlü kiriş fiyatları neye göre değişir?", a: "Kesit ölçüsü, uzunluk ve doku tipi fiyatı belirler. Metraj ve model kodunu teklif sepetinden ilettiğinizde aynı gün projeye özel fiyat verilir." },
      { q: "Kirişler nasıl monte edilir?", a: "İçi boş profil, tavana poliüretan yapıştırıcı ve gerekli noktalarda vida ile sabitlenir. Hafifliği sayesinde tavana yük bindirmez; ek yerleri doku macunuyla gizlenir." },
      { q: "İstenilen renkte gelir mi?", a: "Modeller ahşap dokulu yüzeyle üretilir; doğal meşe, ceviz, eskitme gibi tonlarda boyanmış veya boyaya hazır ham teslim edilebilir." },
      { q: "Dış mekânda (pergola/saçak) kullanılır mı?", a: "Evet. Poliüretan neme ve güneşe dayanıklıdır; dış cephe ve saçak altı uygulamalarında form kaybı yaşamaz." },
    ],
  },

  "sutun-baslik": {
    title: "Poliüretan Sütun Modelleri Rehberi",
    intro:
      "Poliüretan sütun; giriş kapıları, salonlar, düğün salonları ve cephe projelerinde klasik mimarinin en güçlü öğesini pratik bir üretimle sunar. DecorPU sütunları gövde, kaide ve başlık olarak modüler üretilir: Dor, İyon ve Korint başlık seçenekleri, yivli veya düz gövdelerle kombinlenir.",
    sections: [
      {
        h: "Sütun mü, pilaster mi, yarım sütun mu?",
        body:
          "Serbest duran tam sütunlar giriş ve geçişlerde; duvara gömülü görünen pilaster ve yarım sütunlar ise cephe ve iç duvar ritmi oluşturmada kullanılır. Mevcut kolonların kaplanması için iki parçalı gövdeler üretilir — beton kolon, klasik bir sütuna dönüşür.",
      },
      {
        h: "Ölçü ve stil seçimi",
        body:
          "Sütun çapı, taşıdığı görsel yüke göre seçilir: 2,8 m tavanda 20-25 cm çap dengelidir; cephe ve yüksek mekânlarda 30 cm ve üzeri tercih edilir. Sade projelerde Dor (düz) başlık, zengin klasik projelerde Korint (yapraklı) başlık kullanılır. Tüm modellerin çap-yükseklik ölçüleri ürün sayfalarında ve DWG paketindedir.",
      },
      {
        h: "Montaj ve dayanım",
        body:
          "Poliüretan sütunlar dekoratiftir, taşıyıcı değildir; mevcut strüktürün önüne/çevresine uygulanır. Hafif oldukları için iki kişiyle monte edilir, dış cephede neme ve donmaya dayanıklıdır, boyanabilir.",
      },
    ],
    faq: [
      { q: "Sütunlar taşıyıcı mıdır?", a: "Hayır, dekoratiftir. Mevcut kolon/strüktürü kaplamak veya görsel amaçla kullanılmak üzere üretilir." },
      { q: "Mevcut beton kolonu kaplayabilir miyim?", a: "Evet. İki parçalı gövde kolonun çevresine kapatılır, ek yeri macunlanır; kaide ve başlıkla tamamlanır." },
      { q: "Dış cephede solar mı?", a: "Poliüretan UV'ye dayanıklıdır; dış cephe boyasıyla boyandığında yıllarca form ve renk korur." },
      { q: "Özel ölçü sütun üretiyor musunuz?", a: "Evet, proje bazlı özel çap ve yükseklik üretimi yapıyoruz; teklif notuna ölçülerinizi yazmanız yeterli." },
    ],
  },

  gobek: {
    title: "Tavan Göbeği Modelleri Rehberi",
    intro:
      "Tavan göbeği, avize ile tavan arasındaki geçişi taçlandıran dekoratif rozettir. Dekoratif tavan göbekleri; salon, yemek odası ve otel lobilerinde tavana odak noktası kazandırır. DecorPU göbekleri poliüretandan üretilir: hafiftir, sarkma yapmaz ve avize montajına engel olmaz.",
    sections: [
      {
        h: "Doğru çap nasıl seçilir?",
        body:
          "Pratik kural: göbek çapı, avizenin çapına yakın ya da bir miktar büyük olmalıdır. 2,8 m tavanlı standart salonda 40-60 cm göbekler dengelidir; büyük salon ve yüksek tavanlarda 80 cm ve üzeri modeller kullanılır. Modern projelerde düz (sade) lamba göbekleri, klasik projelerde yapraklı desenler tercih edilir.",
      },
      {
        h: "Montaj",
        body:
          "Göbek, tavana poliüretan yapıştırıcıyla uygulanır; merkezinden avize kablosu için delik açmak kolaydır. Alçı göbeklerin aksine düşme riski taşımaz, çatlamaz. Tavanla aynı renge boyanabilir ya da altın/gümüş vurgu ile klasik efekt verilebilir.",
      },
    ],
    faq: [
      { q: "Avize göbeği avizeyi taşır mı?", a: "Göbek dekoratiftir; avize her zaman tavandaki askı elemanına bağlanır, göbek kablonun çevresini kapatır." },
      { q: "Göbek boyanabilir mi?", a: "Evet, su bazlı boyalarla boyanabilir; desenli modellerde rölyef araları farklı tonla vurgulanabilir." },
      { q: "Kare veya oval göbek var mı?", a: "Yuvarlak modeller ağırlıkta olmak üzere kare ve oval formlar da üretilmektedir; katalogdan kodlarıyla seçebilirsiniz." },
    ],
  },

  "cita-lambri": {
    title: "Duvar Çıtası Modelleri ve Uygulama Rehberi",
    intro:
      "Duvar çıtası (çıtalama), düz duvarları çerçeveli klasik panolara bölen en ekonomik dekorasyon yöntemidir. Poliüretan duvar çıtası; yatak odası yatak başlarında, salon ve koridor duvarlarında, TV ünitesi fonlarında kullanılır. DecorPU çıtaları düz ve desenli profillerde, hazır köşe elemanlarıyla birlikte üretilir.",
    sections: [
      {
        h: "Duvar çıtası nasıl uygulanır?",
        body:
          "Duvarda pano yerleşimi lazerle çizilir, çıtalar gönyeli kesilir ve poliüretan yapıştırıcıyla yapıştırılır; ek ve köşe noktaları macunlanıp zımparalanır, son kat boya ile duvarla bütünleşir. Desenli köşe elemanları kullanıldığında gönye kesim gerekmeden klasik çerçeve tamamlanır. Ortalama bir oda tek günde biter.",
      },
      {
        h: "Pano oranları ve model seçimi",
        body:
          "Klasik yerleşimde süpürgelik üstünde alt pano (lambri kuşağı), üstte büyük panolar kullanılır; pano genişlikleri duvar boyunca eşit ritimde bölünür. Modern projelerde ince düz çıtayla tek büyük çerçeve, klasik projelerde desenli profil ve köşeler tercih edilir. 4-10 cm arası profil genişlikleri en çok kullanılan aralıktır.",
      },
      {
        h: "Çıtalama fiyatı neye göre belirlenir?",
        body:
          "Fiyat; profil kesitine, desenine ve toplam metraja göre hesaplanır. Duvar ölçülerinizi ve seçtiğiniz model kodunu teklif sepetinden iletin; pano yerleşim önerisi ve metraj hesabıyla birlikte projeye özel fiyat gönderilir.",
      },
    ],
    faq: [
      { q: "Duvar çıtası hangi yapıştırıcıyla yapıştırılır?", a: "Poliüretan montaj yapıştırıcısı kullanılır; kataloğumuzun Yapıştırıcı & Aksesuar bölümünde uyumlu ürünler yer alır." },
      { q: "Boyalı duvara uygulanır mı?", a: "Evet; yüzey temiz ve sağlam olmalıdır. Uygulama sonrası çıta ve duvar birlikte boyandığında bütünleşik görünüm elde edilir." },
      { q: "Alçı çıtadan farkı ne?", a: "Poliüretan çıta kırılmaz, esnektir ve hafiftir; alçı gibi tozuma ve çatlama yapmaz, ıslak hacimlerde de kullanılır." },
      { q: "Yatak odası duvar çıtası için hangi modeller uygun?", a: "Yatak başı duvarında 4-6 cm düz profiller ve yumuşak desenli modeller en çok tercih edilenlerdir; kodlarıyla teklif isteyebilirsiniz." },
    ],
  },

  somine: {
    title: "Dekoratif Şömine Modelleri Rehberi",
    intro:
      "Dekoratif şömine çerçeveleri, bacasız elektrikli ısıtıcılarla ya da tamamen dekor amaçlı kullanılarak salona klasik bir odak kazandırır. DecorPU poliüretan şömine modelleri; mermer ve taş oymacılığı görünümünü hafif, montajı kolay tek parça hâlinde sunar.",
    sections: [
      {
        h: "Elektrikli ve bacasız kullanım",
        body:
          "Poliüretan çerçeve, elektrikli şömine üniteleriyle ve bio-etanol haznelerle kullanılabilir; üretici ısı sınırlarına uyulması yeterlidir. Gerçek odun ateşiyle doğrudan temas eden iç yüzeylerde kullanılmaz — bu durumda çerçeve, yanma haznesinden uygun mesafede konumlandırılır.",
      },
      {
        h: "Model ve ölçü",
        body:
          "Duvar genişliği ve TV konumu, şömine ölçüsünü belirler: standart salonlarda 110-130 cm genişlikli modeller dengelidir. Sade pervazlı modeller modern projelerde, oymalı klasik modeller konak ve villa projelerinde tercih edilir; tüm ölçüler ürün sayfalarındadır.",
      },
    ],
    faq: [
      { q: "Şömine çerçevesi ısıya dayanır mı?", a: "Elektrikli ve bio-etanol ünitelerin çevresel ısısına dayanır; açık aleve doğrudan temas ettirilmez. Ünite üreticisinin mesafe kurallarına uyulmalıdır." },
      { q: "Montajı nasıl yapılır?", a: "Tek parça çerçeve duvara poliüretan yapıştırıcıyla sabitlenir; dakikalar içinde biter, ustalık gerektirmez." },
      { q: "Mermer görünümü verilebilir mi?", a: "Evet; çerçeve boyanabilir yüzeye sahiptir, mermer efekt boya teknikleriyle gerçek taş görünümü elde edilir." },
    ],
  },

  sove: {
    title: "Poliüretan Söve Modelleri Rehberi",
    intro:
      "Söve, pencere ve kapı çevrelerini çerçeveleyen dış cephe profilidir; cepheye derinlik ve karakter kazandırır. DecorPU poliüretan söveleri yoğun dokulu, neme ve UV'ye dayanıklı üretilir — çimento sövelerin ağırlığı ve çatlama riski olmadan.",
    sections: [
      {
        h: "Poliüretan söve vs çimento (prekast) söve",
        body:
          "Çimento söve ağırdır, mekanik dübelleme ister ve zamanla kılcal çatlaklar verebilir. Poliüretan söve hafiftir; yapıştırıcı ile hızla uygulanır, iskelede geçen süreyi kısaltır, bina yüküne etki etmez. Dış cephe boyasıyla boyanır ve yıllarca formunu korur. Büyük prekast ihtiyaçları için ayrıca Prekast Dış Cephe kategorimiz mevcuttur.",
      },
      {
        h: "Pencere söve ve denizlik seçimi",
        body:
          "Söve genişliği cephe oranına göre 8-15 cm aralığında seçilir; kat silmeleri ve denizliklerle birlikte kullanıldığında cephe bütünlüğü tamamlanır. Ürün sayfalarındaki kesit ölçüleri ve DWG çizimleriyle cephe paftanıza doğrudan işleyebilirsiniz.",
      },
    ],
    faq: [
      { q: "Söve montajı nasıl yapılır?", a: "Yüzey temizlenir, poliüretan söve yapıştırıcısıyla cepheye uygulanır; ek yerleri dış cephe macunuyla kapatılır ve boyanır." },
      { q: "Söveler güneşten sararır mı?", a: "Poliüretan UV dayanımlıdır; dış cephe boyasıyla boyandığında solma ve sararma yaşanmaz." },
      { q: "Özel ölçü söve üretimi var mı?", a: "Evet, proje bazlı özel kesit ve uzunluk üretiyoruz; DWG paftanızı teklifle birlikte iletebilirsiniz." },
    ],
  },

  supurgelik: {
    title: "Poliüretan Süpürgelik Modelleri Rehberi",
    intro:
      "Süpürgelik, duvar ile zemin birleşimini koruyan ve bitiren profildir. Poliüretan süpürgelik; ahşap ve MDF'nin aksine neme dayanıklıdır, darbeyle soyulmaz ve boyanabilir — yoğun kullanılan konut, otel ve ofis projelerinde uzun ömürlü çözümdür.",
    sections: [
      {
        h: "Yükseklik ve model seçimi",
        body:
          "Standart konutlarda 7-10 cm, yüksek tavanlı ve klasik projelerde 12-15 cm süpürgelik dengeli durur. Düz modeller modern mekânlarda, profilli modeller klasik duvar çıtası uygulamalarıyla birlikte kullanılır — çıta ve kartonpiyerle aynı stil ailesinden seçim öneririz.",
      },
      {
        h: "Montaj ve dayanıklılık",
        body:
          "Poliüretan süpürgelik yapıştırıcıyla uygulanır; köşe kesimleri kolaydır, çivilenme gerektirmez. Islak paspasa, darbeye ve neme dayanıklıdır; duvar rengiyle ya da kontrast beyazla boyanarak tamamlanır.",
      },
    ],
    faq: [
      { q: "Süpürgelik ıslak zemin temizliğinden etkilenir mi?", a: "Hayır; poliüretan su emmez, MDF gibi kabarma yapmaz. Islak hacimlerde de güvenle kullanılır." },
      { q: "Kablo kanallı model var mı?", a: "Bazı modellerde arka yüz kablo geçişine uygundur; ihtiyacınızı teklif notuna yazarsanız uygun kodları öneririz." },
      { q: "Duvar çıtasıyla uyumlu mu?", a: "Evet; süpürgelik + duvar çıtası + kartonpiyer aynı profil ailesinden seçildiğinde bütünlüklü klasik duvar kompozisyonu elde edilir." },
    ],
  },

  kubbe: {
    title: "Tavan Kubbe Modelleri Rehberi",
    intro:
      "Tavan kubbesi, mekâna yükseklik ve ihtişam katan en etkili klasik tavan öğesidir. Poliüretan tavan kubbeleri; alçı ve betonun aksine hafiftir, hazır form olarak gelir ve asma tavan boşluğuna hızla monte edilir. Yuvarlak, oval ve kare formlarda üretilir.",
    sections: [
      {
        h: "Kubbe için tavan boşluğu",
        body:
          "Kubbe derinliği kadar asma tavan boşluğu gerekir; 20-40 cm derinlikler en yaygın aralıktır. Kubbe çevresi kartonpiyer veya gizli ışık profiliyle çerçevelendiğinde, içine gizlenen LED aydınlatma ile etkileyici bir gök tavan efekti oluşur.",
      },
      {
        h: "Nerelerde kullanılır?",
        body:
          "Villa salonları, yemek odaları, otel lobileri, düğün salonları ve cami/mescit projelerinde kullanılır. Avize ile kombinlendiğinde mekânın merkezini tanımlar; iç yüzeyi boyanabilir, altın varak ve desen uygulamalarına uygundur.",
      },
    ],
    faq: [
      { q: "Kubbe montajı için özel taşıyıcı gerekir mi?", a: "Poliüretan kubbe hafiftir; asma tavan konstrüksiyonuna vida ve yapıştırıcıyla monte edilir, ek taşıyıcı sistem gerektirmez." },
      { q: "Kubbenin içine aydınlatma yapılır mı?", a: "Evet; çevre kanalına LED şerit uygulanarak dolaylı aydınlatma, merkezine avize montajı yapılabilir." },
      { q: "Özel çap kubbe üretiyor musunuz?", a: "Standart çapların dışında proje bazlı özel ölçü üretimimiz vardır; tavan planınızı teklifle iletmeniz yeterli." },
    ],
  },
};
