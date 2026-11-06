// Tinko kart sayfasının bütün içeriği burada. Sayfayı güncellemek = bu dosyayı düzenlemek.
// Kart ekle: kartlar listesinin EN ÜSTÜNE yeni nesne. Öndeki ilk `onde` kart büyük görünür, gerisi Arşiv'e iner.
// Videoda söz verilen kart silinmez; tarihli içerik (sınav takvimi vb.) kaldırılabilir.
// durum: "hazir" (PDF indirilebilir) · "yakinda" (butonlar kapalı)
window.TINKO = {
  profil: {
    ad: "TİNKO",
    aciklama: "Sınav taktikleri, çalışma yöntemleri, ara sıra biraz motivasyon.",
    foto: "gorsel/pp.jpg",
  },

  // Boş url = gösterilmez.
  baglantilar: [
    { tur: "youtube", etiket: "YouTube", url: "https://www.youtube.com/@tinkobey" },
    { tur: "instagram", etiket: "Instagram", url: "https://www.instagram.com/tinkoflix/" },
    { tur: "tiktok", etiket: "TikTok", url: "https://www.tiktok.com/@tinkobey" },
  ],

  // İleride: mağaza, kendi site. Boş url = gösterilmez.
  ekstra: [
    { tur: "magaza", etiket: "Mağaza", alt: "Program ve ajandalar", url: "" },
    { tur: "site", etiket: "tinko sitesi", alt: "", url: "" },
  ],

  onde: 5,

  // kapak.tur = videonun konsepti: sohbet (grup sohbeti) · dilekce (istifa / izin) · haber (son dakika)
  //             kural (kural değişti) · sablon (Tinko Taktik) · gorsel (src) · yoksa kanca kesikleri
  // Şimdilik boş: kartlar hazır oldukça buraya eklenir (biçim örnekleri taslak_kartlar.js içinde).
  // Liste boşken "Ücretsiz kartlar" bölümü sayfada hiç görünmez.
  kartlar: [],
};
