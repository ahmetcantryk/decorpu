import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";
import type { LegalContent } from "@/components/site/LegalDocument";

/**
 * Yasal/KVKK metinleri — DecorPU (poliüretan mimari dekorasyon, B2B).
 * 6698 sayılı KVKK, Aydınlatma Yükümlülüğünün Yerine Getirilmesi Tebliği,
 * Veri Sorumlusuna Başvuru Usul ve Esasları Tebliği ve KVKK Çerez Uygulamaları
 * Rehberi (2022) doğrultusunda hazırlanmıştır.
 * Bilgilendirme amaçlıdır; yayına almadan önce hukuk danışmanınıza son okuma yaptırın.
 */

const UPDATED: Record<Locale, string> = {
  tr: "Son güncelleme: 28 Haziran 2026",
  en: "Last updated: 28 June 2026",
};

const CONTACT_LINE = `${SITE.phoneDisplay} · ${SITE.email} · ${SITE.address}`;

function pick<T>(locale: Locale, tr: T, en: T): T {
  return locale === "en" ? en : tr;
}

/** KVKK Aydınlatma Metni (KVKK m.10). */
export function kvkkContent(locale: Locale): LegalContent {
  return {
    home: pick(locale, "Ana Sayfa", "Home"),
    crumb: pick(locale, "KVKK Aydınlatma Metni", "Data Protection Notice"),
    title: pick(locale, "KVKK Aydınlatma Metni", "Personal Data Protection Notice"),
    updated: UPDATED[locale],
    intro: pick(
      locale,
      "Bu aydınlatma metni; 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun (\"KVKK\") 10. maddesi ile Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ uyarınca, veri sorumlusu sıfatıyla DecorPU tarafından, web sitemizi ziyaret eden ve teklif/iletişim formlarımızı kullanan kişilerin kişisel verilerinin işlenmesine ilişkin olarak hazırlanmıştır. Amacımız, hangi verilerinizi, hangi amaçlarla, hangi hukuki sebeplere dayanarak işlediğimiz ve haklarınız konusunda sizi şeffaf biçimde bilgilendirmektir.",
      "This notice has been prepared by DecorPU as data controller, pursuant to Article 10 of Turkish Law No. 6698 on the Protection of Personal Data (\"KVKK\"), regarding the processing of personal data of visitors to our website and users of our quote/contact forms. Our aim is to inform you transparently about which data we process, for which purposes, on which legal grounds, and about your rights.",
    ),
    sections: [
      {
        heading: pick(locale, "1. Veri Sorumlusunun Kimliği", "1. Identity of the Data Controller"),
        paragraphs: [
          pick(
            locale,
            `Kişisel verileriniz, veri sorumlusu sıfatıyla DecorPU tarafından, aşağıda açıklanan kapsam ve şartlarda işlenmektedir. Veri sorumlusunun güncel iletişim bilgileri:\n${CONTACT_LINE}`,
            `Your personal data is processed by DecorPU as data controller, within the scope and conditions described below. Current contact details of the controller:\n${CONTACT_LINE}`,
          ),
          pick(
            locale,
            "Bu metinde geçen \"kişisel veri\", \"işleme\", \"ilgili kişi\", \"açık rıza\" ve \"veri sorumlusu\" kavramları KVKK m.3'teki tanımlara karşılık gelir.",
            "The terms \"personal data\", \"processing\", \"data subject\", \"explicit consent\" and \"data controller\" used here correspond to the definitions in Article 3 of KVKK.",
          ),
        ],
      },
      {
        heading: pick(locale, "2. İşlenen Kişisel Veri Kategorileri", "2. Categories of Personal Data Processed"),
        paragraphs: [
          pick(
            locale,
            "Sizinle olan ilişkimizin niteliğine göre aşağıdaki veri kategorileri işlenebilir:\n• Kimlik Bilgisi: ad, soyad.\n• İletişim Bilgisi: telefon numarası ve isteğe bağlı olarak paylaşmanız hâlinde e-posta adresi, firma/şirket adı.\n• Müşteri İşlem Bilgisi: teklif veya iletişim formunda ilettiğiniz talep/mesaj içeriği, ilgilendiğiniz veya teklif sepetine eklediğiniz ürün kodları.\n• İşlem Güvenliği Bilgisi: IP adresi, tarayıcı ve cihaz bilgileri, çerez kayıtları ve sunucu/log kayıtları (site güvenliği ve onay vermeniz hâlinde analitik amacıyla).",
            "Depending on the nature of our relationship, the following categories may be processed:\n• Identity: first name, last name.\n• Contact: phone number and, if you choose to share, email address and company name.\n• Customer transaction: the request/message you submit via the quote or contact form, and the product codes you are interested in or add to your quote basket.\n• Technical security: IP address, browser and device information, cookie records and server/log records (for site security and, with your consent, analytics).",
          ),
          pick(
            locale,
            "Sitemiz üzerinden özel nitelikli kişisel veri (sağlık, din, biyometrik veri vb.) talep edilmez; lütfen formlara bu tür bilgiler girmeyiniz.",
            "We do not request special categories of personal data (health, religion, biometric data, etc.) through our site; please do not enter such information into the forms.",
          ),
        ],
      },
      {
        heading: pick(locale, "3. Kişisel Verilerin İşlenme Amaçları", "3. Purposes of Processing"),
        paragraphs: [
          pick(
            locale,
            "Kişisel verileriniz aşağıdaki amaçlarla işlenir:\n• Teklif taleplerinizin alınması, değerlendirilmesi ve projeye özel fiyatlandırmanın hazırlanması,\n• Talebinize yanıt verilmesi ve sizinle iletişim kurulması,\n• Talep, öneri ve şikâyetlerinizin yönetilmesi ve sonuçlandırılması,\n• Ürün ve hizmetlerimizin sunulması, geliştirilmesi ve iş süreçlerimizin yürütülmesi,\n• Web sitesinin güvenliğinin ve sürekliliğinin sağlanması, hata ve kötüye kullanımın tespiti,\n• Açık rıza vermeniz hâlinde ziyaretçi davranışı ve trafik istatistiklerinin analiz edilerek hizmet kalitesinin artırılması,\n• İlgili mevzuattan doğan yükümlülüklerin yerine getirilmesi ve yetkili kurumlara karşı ispat yükümlülüğünün sağlanması.",
            "Your data is processed for the following purposes:\n• Receiving and evaluating your quote requests and preparing project-specific pricing,\n• Responding to your request and communicating with you,\n• Managing and resolving your requests, suggestions and complaints,\n• Providing and improving our products/services and running our business processes,\n• Ensuring the security and continuity of the website and detecting errors and misuse,\n• Where you give explicit consent, analysing visitor behaviour and traffic statistics to improve service quality,\n• Fulfilling obligations arising from applicable law and meeting our burden of proof before competent authorities.",
          ),
          pick(
            locale,
            "Verileriniz, açık rızanız olmadan pazarlama amacıyla üçüncü kişilere satılmaz veya kiralanmaz.",
            "Your data is not sold or rented to third parties for marketing without your explicit consent.",
          ),
        ],
      },
      {
        heading: pick(locale, "4. İşlemenin Hukuki Sebepleri", "4. Legal Grounds for Processing"),
        paragraphs: [
          pick(
            locale,
            "Kişisel verileriniz KVKK m.5 kapsamında şu hukuki sebeplere dayanılarak işlenir:\n• Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (m.5/2-c): teklif ve talep süreçlerinin yürütülmesi.\n• Veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi (m.5/2-ç): mevzuattan doğan saklama ve bilgilendirme yükümlülükleri.\n• Bir hakkın tesisi, kullanılması veya korunması için zorunlu olması (m.5/2-e): uyuşmazlık hâlinde ispat.\n• İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaati (m.5/2-f): site güvenliği, temel işlevler ve süreçlerin iyileştirilmesi.\nAnalitik çerezler ise yalnızca KVKK m.5/1 uyarınca açık rızanıza dayanılarak işlenir; rıza vermemeniz hâlinde bu çerezler çalıştırılmaz.",
            "Your data is processed under Article 5 of KVKK on the following grounds:\n• Direct connection to the conclusion/performance of a contract (Art. 5/2-c): running the quote and request processes.\n• Compliance with a legal obligation of the controller (Art. 5/2-ç): statutory retention and information duties.\n• Necessity for the establishment, exercise or protection of a right (Art. 5/2-e): proof in case of dispute.\n• Legitimate interests of the controller, provided your fundamental rights are not harmed (Art. 5/2-f): site security, core functions and process improvement.\nAnalytics cookies are processed solely on your explicit consent under Art. 5/1; if you do not consent, they are not run.",
          ),
        ],
      },
      {
        heading: pick(locale, "5. Kişisel Verilerin Toplanma Yöntemi", "5. Method of Collection"),
        paragraphs: [
          pick(
            locale,
            "Kişisel verileriniz; web sitemizdeki teklif ve iletişim formlarını doldurmanız, bizimle telefon/e-posta yoluyla iletişime geçmeniz ve siteyi ziyaretiniz sırasında çerezler ile benzeri teknolojiler aracılığıyla, tamamen veya kısmen otomatik yollarla elektronik ortamda toplanır.",
            "Your data is collected electronically, by fully or partly automated means, when you fill in the quote and contact forms on our website, contact us by phone/email, and through cookies and similar technologies during your visit.",
          ),
        ],
      },
      {
        heading: pick(locale, "6. Kişisel Verilerin Aktarılması", "6. Transfer of Personal Data"),
        paragraphs: [
          pick(
            locale,
            "Kişisel verileriniz, işleme amaçlarının gerektirdiği ölçüde ve KVKK m.8 ile m.9'daki şartlara uygun olarak aşağıdaki alıcı gruplarıyla paylaşılabilir:\n• Bulut barındırma ve veritabanı hizmeti sağlayıcımız (Supabase),\n• E-posta bildirim hizmeti sağlayıcımız (Resend),\n• Açık rıza vermeniz hâlinde analitik hizmet sağlayıcımız (Google Analytics),\n• Hukuki yükümlülük hâlinde yetkili kamu kurum ve kuruluşları ile adli/idari merciler.",
            "Your data may be shared, to the extent required by the purposes and in accordance with Articles 8 and 9 of KVKK, with the following recipient groups:\n• Our cloud hosting and database provider (Supabase),\n• Our email notification provider (Resend),\n• Where you consent, our analytics provider (Google Analytics),\n• Competent public authorities and judicial/administrative bodies where legally required.",
          ),
          pick(
            locale,
            "Bu hizmet sağlayıcılarının bir kısmı sunucularını yurt dışında barındırabilir. Bu hâlde aktarım, KVKK m.9'da öngörülen şartlara (açık rıza veya Kanun'da belirtilen güvence mekanizmaları) uygun olarak gerçekleştirilir.",
            "Some of these providers may host their servers abroad. In such cases, transfers are carried out in accordance with the conditions set out in Article 9 of KVKK (explicit consent or the safeguard mechanisms specified in the Law).",
          ),
        ],
      },
      {
        heading: pick(locale, "7. Saklama Süresi", "7. Retention Period"),
        paragraphs: [
          pick(
            locale,
            "Kişisel verileriniz, işlendikleri amaç için gerekli olan süre boyunca ve her hâlükârda ilgili mevzuatta öngörülen yasal zamanaşımı/saklama süreleri kadar saklanır. Bu sürelerin sona ermesi hâlinde verileriniz, KVKK m.7 ve Kişisel Verilerin Silinmesi, Yok Edilmesi veya Anonim Hâle Getirilmesi Hakkında Yönetmelik uyarınca silinir, yok edilir veya anonim hâle getirilir.",
            "Your data is retained for as long as necessary for the purpose of processing and, in any case, for the statutory limitation/retention periods set by applicable law. Upon expiry, your data is deleted, destroyed or anonymised in accordance with Article 7 of KVKK and the related regulation.",
          ),
        ],
      },
      {
        heading: pick(locale, "8. Veri Güvenliğine İlişkin Tedbirler", "8. Data Security Measures"),
        paragraphs: [
          pick(
            locale,
            "Kişisel verilerinizin hukuka aykırı işlenmesini, verilere hukuka aykırı erişilmesini önlemek ve verilerin güvenli biçimde saklanmasını sağlamak amacıyla; erişim yetkilerinin sınırlandırılması, şifreli (HTTPS) bağlantı, satır düzeyinde erişim denetimi, güçlü kimlik doğrulama ve gerekli idari/teknik tedbirler uygulanır.",
            "To prevent unlawful processing of and access to your data and to ensure secure storage, we apply measures including restricting access privileges, encrypted (HTTPS) connections, row-level access control, strong authentication and the necessary administrative/technical safeguards.",
          ),
        ],
      },
      {
        heading: pick(locale, "9. İlgili Kişinin Hakları (KVKK m.11)", "9. Rights of the Data Subject (KVKK Art. 11)"),
        paragraphs: [
          pick(
            locale,
            "KVKK m.11 uyarınca veri sorumlusuna başvurarak şu haklara sahipsiniz:\n• Kişisel verilerinizin işlenip işlenmediğini öğrenme,\n• İşlenmişse buna ilişkin bilgi talep etme,\n• İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,\n• Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,\n• Eksik veya yanlış işlenmişse düzeltilmesini isteme,\n• KVKK m.7'deki şartlarla silinmesini veya yok edilmesini isteme,\n• Düzeltme, silme ve yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,\n• İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,\n• Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.",
            "Under Article 11 of KVKK you have the right to:\n• Learn whether your personal data is processed,\n• Request information if it has been processed,\n• Learn the purpose of processing and whether it is used accordingly,\n• Know the third parties to whom it is transferred at home or abroad,\n• Request rectification of incomplete or inaccurate data,\n• Request erasure or destruction under Article 7,\n• Request that rectification/erasure be notified to third parties to whom the data was transferred,\n• Object to a result against you arising solely from automated analysis,\n• Claim compensation for damages suffered due to unlawful processing.",
          ),
        ],
      },
      {
        heading: pick(locale, "10. Başvuru Yöntemi", "10. How to Apply"),
        paragraphs: [
          pick(
            locale,
            `Yukarıdaki haklarınıza ilişkin taleplerinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ'de öngörülen asgari bilgileri (ad-soyad, başvuru yazılı ise imza, talep konusu vb.) ve kimliğinizi tevsik edici belgeleri içerecek şekilde aşağıdaki kanallardan iletebilirsiniz:\nTelefon: ${SITE.phoneDisplay}\nE-posta: ${SITE.email}\nAdres: ${SITE.address}\nBaşvurunuz, talebin niteliğine göre en kısa sürede ve en geç 30 gün içinde ücretsiz olarak sonuçlandırılır; ancak işlemin ayrıca bir maliyet gerektirmesi hâlinde Kurul'ca belirlenen tarifedeki ücret alınabilir.`,
            `You may submit requests concerning your rights, including the minimum information required by the relevant regulation (name, signature if written, subject of the request, etc.) and documents verifying your identity, through the channels below:\nPhone: ${SITE.phoneDisplay}\nEmail: ${SITE.email}\nAddress: ${SITE.address}\nYour request will be concluded free of charge as soon as possible and within 30 days at the latest; however, if the process incurs additional cost, a fee in the tariff set by the Authority may be charged.`,
          ),
        ],
      },
      {
        heading: pick(locale, "11. Metindeki Değişiklikler", "11. Changes to This Notice"),
        paragraphs: [
          pick(
            locale,
            "DecorPU, bu aydınlatma metnini mevzuattaki değişiklikler ve iş süreçlerindeki güncellemeler doğrultusunda revize edebilir. Güncel metin her zaman bu sayfada yayımlanır; en son güncelleme tarihi başlıkta belirtilir.",
            "DecorPU may revise this notice in line with legislative changes and updates to its business processes. The current version is always published on this page, and the last update date is shown in the header.",
          ),
        ],
      },
    ],
  };
}

/** Gizlilik Politikası. */
export function privacyContent(locale: Locale): LegalContent {
  return {
    home: pick(locale, "Ana Sayfa", "Home"),
    crumb: pick(locale, "Gizlilik Politikası", "Privacy Policy"),
    title: pick(locale, "Gizlilik Politikası", "Privacy Policy"),
    updated: UPDATED[locale],
    intro: pick(
      locale,
      "DecorPU olarak gizliliğinize önem veriyoruz. Bu Gizlilik Politikası; web sitemizi ziyaret ettiğinizde veya teklif/iletişim formlarımızı kullandığınızda hangi kişisel verileri topladığımızı, bu verileri hangi amaçlarla kullandığımızı, kimlerle paylaştığımızı, ne kadar süre sakladığımızı ve haklarınızı açıklar. KVKK kapsamındaki ayrıntılı bilgilendirme için KVKK Aydınlatma Metni'ni, çerezlere ilişkin detaylar için Çerez Politikası'nı inceleyebilirsiniz.",
      "At DecorPU we value your privacy. This Privacy Policy explains which personal data we collect when you visit our website or use our quote/contact forms, the purposes for which we use it, with whom we share it, how long we keep it, and your rights. For detailed information under Turkish data protection law see the Data Protection Notice, and for cookies see the Cookie Policy.",
    ),
    sections: [
      {
        heading: pick(locale, "1. Kapsam", "1. Scope"),
        paragraphs: [
          pick(
            locale,
            "Bu politika, decorpu.com alan adlı web sitesi ve buradaki formlar aracılığıyla toplanan kişisel verileri kapsar. Sitemiz, kontrolümüzde olmayan üçüncü taraf web sitelerine bağlantılar içerebilir; bu sitelerin gizlilik uygulamalarından DecorPU sorumlu değildir.",
            "This policy covers personal data collected through the decorpu.com website and its forms. Our site may contain links to third-party websites outside our control; DecorPU is not responsible for the privacy practices of those sites.",
          ),
        ],
      },
      {
        heading: pick(locale, "2. Topladığımız Veriler", "2. Data We Collect"),
        paragraphs: [
          pick(
            locale,
            "Sizden doğrudan aldığımız veriler: teklif ve iletişim formları aracılığıyla ad soyad, telefon numarası ve ilettiğiniz not; isteğe bağlı olarak e-posta adresi ve firma adı. E-posta paylaşımı zorunlu değildir.\nOtomatik olarak toplanan veriler: siteyi ziyaretiniz sırasında IP adresi, tarayıcı/cihaz bilgileri, çerez kayıtları ve sunucu logları gibi teknik veriler (site güvenliği ve onay vermeniz hâlinde analitik amacıyla).",
            "Data we receive directly from you: full name, phone number and the note you send via the quote and contact forms; optionally email address and company name. Sharing your email is not mandatory.\nData collected automatically: technical data such as IP address, browser/device information, cookie records and server logs during your visit (for site security and, with your consent, analytics).",
          ),
        ],
      },
      {
        heading: pick(locale, "3. Verileri Kullanım Amaçlarımız", "3. How We Use Your Data"),
        paragraphs: [
          pick(
            locale,
            "Verilerinizi; teklif taleplerinizi değerlendirmek ve projeye özel fiyatlandırma yapmak, sizinle iletişim kurmak, talep ve şikâyetlerinizi yönetmek, hizmetlerimizi sunmak ve iyileştirmek, sitenin güvenliğini sağlamak, onayınızla ziyaret istatistiklerini analiz etmek ve yasal yükümlülüklerimizi yerine getirmek için kullanırız.",
            "We use your data to evaluate your quote requests and prepare project-specific pricing, communicate with you, manage your requests and complaints, provide and improve our services, ensure the security of the site, analyse visit statistics with your consent, and fulfil our legal obligations.",
          ),
        ],
      },
      {
        heading: pick(locale, "4. Üçüncü Taraflarla Paylaşım", "4. Sharing with Third Parties"),
        paragraphs: [
          pick(
            locale,
            "Verileriniz, yalnızca hizmeti sunabilmek için kullandığımız tedarikçilerle sınırlı olarak paylaşılır: bulut barındırma ve veritabanı (Supabase), e-posta bildirim sağlayıcısı (Resend) ve onay vermeniz hâlinde analitik sağlayıcısı (Google Analytics). Ayrıca yasal yükümlülük hâlinde yetkili kamu kurumlarıyla paylaşım yapılabilir. Verileriniz pazarlama amacıyla üçüncü kişilere satılmaz veya kiralanmaz. Ayrıntı için KVKK Aydınlatma Metni'ne bakınız.",
            "Your data is shared only, and to the extent necessary, with the providers we use to deliver the service: cloud hosting and database (Supabase), email notification provider (Resend) and, where you consent, an analytics provider (Google Analytics). It may also be shared with competent public authorities where legally required. Your data is never sold or rented to third parties for marketing. See the Data Protection Notice for details.",
          ),
        ],
      },
      {
        heading: pick(locale, "5. Saklama Süresi", "5. Retention"),
        paragraphs: [
          pick(
            locale,
            "Kişisel verilerinizi, işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen yasal saklama süreleri boyunca saklarız. Bu sürelerin sonunda verileriniz silinir, yok edilir veya anonim hâle getirilir.",
            "We retain your personal data for as long as the purpose requires and for the statutory periods set by applicable law. Afterwards, your data is deleted, destroyed or anonymised.",
          ),
        ],
      },
      {
        heading: pick(locale, "6. Veri Güvenliği", "6. Data Security"),
        paragraphs: [
          pick(
            locale,
            "Verilerinizi yetkisiz erişime, kayba ve kötüye kullanıma karşı korumak için şifreli bağlantı (HTTPS), erişim yetkisi sınırlandırması, satır düzeyinde erişim denetimi ve güçlü kimlik doğrulama gibi uygun teknik ve idari tedbirleri uygularız.",
            "We apply appropriate technical and organisational measures such as encrypted connections (HTTPS), restricted access privileges, row-level access control and strong authentication to protect your data against unauthorised access, loss and misuse.",
          ),
        ],
      },
      {
        heading: pick(locale, "7. Çerezler", "7. Cookies"),
        paragraphs: [
          pick(
            locale,
            "Sitemizde zorunlu ve (onayınıza bağlı) analitik çerezler kullanılır. Çerez türleri, süreleri ve tercihlerinizi yönetme yöntemleri için Çerez Politikası sayfamızı inceleyebilirsiniz.",
            "Our site uses essential and (consent-based) analytics cookies. See our Cookie Policy page for cookie types, durations and how to manage your preferences.",
          ),
        ],
      },
      {
        heading: pick(locale, "8. Haklarınız ve İletişim", "8. Your Rights and Contact"),
        paragraphs: [
          pick(
            locale,
            `KVKK m.11 kapsamındaki haklarınızı kullanmak veya gizlilik uygulamalarımıza ilişkin sorularınız için bizimle iletişime geçebilirsiniz:\nTelefon: ${SITE.phoneDisplay}\nE-posta: ${SITE.email}`,
            `To exercise your rights under Article 11 of KVKK or for questions about our privacy practices, you can contact us:\nPhone: ${SITE.phoneDisplay}\nEmail: ${SITE.email}`,
          ),
        ],
      },
    ],
  };
}

/** Çerez Politikası (KVKK Çerez Uygulamaları Rehberi 2022). */
export function cookieContent(locale: Locale): LegalContent {
  return {
    home: pick(locale, "Ana Sayfa", "Home"),
    crumb: pick(locale, "Çerez Politikası", "Cookie Policy"),
    title: pick(locale, "Çerez Politikası", "Cookie Policy"),
    updated: UPDATED[locale],
    intro: pick(
      locale,
      "Bu Çerez Politikası, decorpu.com web sitesinde kullanılan çerezleri, bunların amaçlarını ve çerez tercihlerinizi nasıl yönetebileceğinizi açıklar. Metin, 6698 sayılı KVKK ve Kişisel Verileri Koruma Kurulu'nun Çerez Uygulamaları Hakkında Rehber'i doğrultusunda hazırlanmıştır.",
      "This Cookie Policy explains the cookies used on the decorpu.com website, their purposes, and how you can manage your cookie preferences. It has been prepared in line with Turkish data protection law and the Authority's Guidelines on Cookie Practices.",
    ),
    sections: [
      {
        heading: pick(locale, "1. Çerez Nedir?", "1. What Is a Cookie?"),
        paragraphs: [
          pick(
            locale,
            "Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler ve benzeri teknolojiler (ör. tarayıcı yerel depolaması / localStorage), sitenin düzgün çalışmasını sağlamak, tercihlerinizi hatırlamak ve onay vermeniz hâlinde site kullanımını ölçmek için kullanılır.",
            "Cookies are small text files stored on your device through your browser by the websites you visit. Cookies and similar technologies (e.g. browser local storage) are used to make the site work properly, remember your preferences and, with your consent, measure site usage.",
          ),
        ],
      },
      {
        heading: pick(locale, "2. Kullandığımız Çerez Türleri", "2. Types of Cookies We Use"),
        paragraphs: [
          pick(
            locale,
            "a) Zorunlu (Kesinlikle Gerekli) Çerezler — Birinci taraf:\nSitenin temel işlevleri için gereklidir ve açık rıza gerektirmez; devre dışı bırakılamaz.\n• \"decorpu-consent\": çerez tercihinizi saklar. Süre: kalıcı (siz silene kadar).\n• Görünüm/tema tercihi (yerel depolama): seçtiğiniz açık/koyu tema. Süre: kalıcı.\n\nb) Analitik Çerezler — Üçüncü taraf (Google Analytics, Microsoft Clarity):\nZiyaretçi sayısı, oturum süresi ve sayfa etkileşimleri gibi istatistikleri anlamamıza yardımcı olur. Yalnızca açık rızanızla yüklenir.\n• \"_ga\": ziyaretçileri ayırt eder. Süre: ~2 yıl.\n• \"_ga_<ölçüm-kimliği>\": oturum durumunu korur. Süre: ~2 yıl.\n• \"_gid\": ziyaretçileri ayırt eder. Süre: ~24 saat.\n• \"_clck\" (Clarity): ziyaretçi kimliğini saklar. Süre: ~1 yıl.\n• \"_clsk\" (Clarity): oturum kaydını birleştirir. Süre: ~1 gün.\n\nAyrıca çerez KULLANMAYAN, kişisel veri toplamayan toplu ölçüm (Ahrefs Analytics) kullanılabilir; çerez yerleştirmediği için onay gerektirmez.",
            "a) Strictly Necessary Cookies — First party:\nRequired for core site functions; do not require consent and cannot be disabled.\n• \"decorpu-consent\": stores your cookie preference. Duration: persistent (until you delete it).\n• Theme preference (local storage): your chosen light/dark theme. Duration: persistent.\n\nb) Analytics Cookies — Third party (Google Analytics, Microsoft Clarity):\nHelp us understand statistics such as visitor count, session duration and page interactions. Loaded only with your explicit consent.\n• \"_ga\": distinguishes visitors. Duration: ~2 years.\n• \"_ga_<measurement-id>\": persists session state. Duration: ~2 years.\n• \"_gid\": distinguishes visitors. Duration: ~24 hours.\n• \"_clck\" (Clarity): stores the visitor ID. Duration: ~1 year.\n• \"_clsk\" (Clarity): links session recordings. Duration: ~1 day.\n\nWe may also use cookie-FREE aggregate measurement (Ahrefs Analytics) that collects no personal data; as it sets no cookies, it does not require consent.",
          ),
        ],
      },
      {
        heading: pick(locale, "3. Çerezlerle İşlenen Veriler ve Amaç", "3. Data Processed via Cookies and Purpose"),
        paragraphs: [
          pick(
            locale,
            "Çerezler aracılığıyla IP adresi, tarayıcı/cihaz bilgileri ve site içi gezinme verileri işlenebilir. Zorunlu çerezlerin amacı sitenin güvenli ve işlevsel çalışması; analitik çerezlerin amacı ise toplu (kümülatif) istatistiklerle hizmet kalitesini geliştirmektir.",
            "Through cookies, data such as IP address, browser/device information and on-site navigation may be processed. The purpose of essential cookies is the secure and functional operation of the site; the purpose of analytics cookies is to improve service quality through aggregate statistics.",
          ),
        ],
      },
      {
        heading: pick(locale, "4. Üçüncü Taraf Çerezleri", "4. Third-Party Cookies"),
        paragraphs: [
          pick(
            locale,
            "Analitik amacıyla Google Analytics (Google Ireland Limited) ve Microsoft Clarity (Microsoft Corporation) hizmetlerinden yararlanılabilir. Bu hizmetler kendi çerezlerini yerleştirir ve verileri kendi gizlilik politikaları kapsamında işler; yalnızca açık rızanızla çalıştırılır. Ahrefs Analytics ise çerez kullanmadan toplu istatistik üretir.",
            "For analytics we may use Google Analytics (Google Ireland Limited) and Microsoft Clarity (Microsoft Corporation). These services set their own cookies and process data under their own privacy policies; they run only with your explicit consent. Ahrefs Analytics produces aggregate statistics without using cookies.",
          ),
        ],
      },
      {
        heading: pick(locale, "5. Hukuki Dayanak", "5. Legal Basis"),
        paragraphs: [
          pick(
            locale,
            "Zorunlu çerezler, KVKK m.5/2-f kapsamında veri sorumlusunun meşru menfaatine dayanılarak açık rıza aranmaksızın kullanılır. Analitik çerezler ise yalnızca KVKK m.5/1 uyarınca açık rızanıza dayanılarak çalıştırılır.",
            "Essential cookies are used without consent on the basis of the controller's legitimate interest under Art. 5/2-f of KVKK. Analytics cookies run solely on your explicit consent under Art. 5/1 of KVKK.",
          ),
        ],
      },
      {
        heading: pick(locale, "6. Çerez Tercihlerinizi Yönetme", "6. Managing Your Preferences"),
        paragraphs: [
          pick(
            locale,
            "Siteyi ilk ziyaretinizde gösterilen çerez bildiriminden tercihinizi (Kabul Et / Reddet) belirleyebilir, \"Çerez Ayarları\" panelinden analitik çerezleri ayrı ayrı açıp kapatabilirsiniz. Tercihinizi dilediğiniz zaman, sayfaların altındaki \"Çerez Ayarları\" bağlantısıyla güncelleyebilirsiniz. Ayrıca tarayıcınızın ayarlarından çerezleri silebilir veya engelleyebilirsiniz; ancak bu durumda sitenin bazı bölümleri beklendiği gibi çalışmayabilir.",
            "From the cookie notice shown on your first visit you can set your preference (Accept / Reject) and toggle analytics cookies separately in the \"Cookie Settings\" panel. You can update your preference anytime via the \"Cookie Settings\" link at the bottom of the pages. You can also delete or block cookies from your browser settings, though some parts of the site may then not work as expected.",
          ),
        ],
      },
      {
        heading: pick(locale, "7. İletişim", "7. Contact"),
        paragraphs: [
          pick(
            locale,
            `Çerez uygulamalarımıza ilişkin sorularınız için:\nTelefon: ${SITE.phoneDisplay}\nE-posta: ${SITE.email}`,
            `For questions about our cookie practices:\nPhone: ${SITE.phoneDisplay}\nEmail: ${SITE.email}`,
          ),
        ],
      },
    ],
  };
}
