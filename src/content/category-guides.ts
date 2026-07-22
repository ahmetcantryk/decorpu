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
};
