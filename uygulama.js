(function () {
  const V = window.TINKO;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tr = (s) => String(s ?? "").toLocaleUpperCase("tr-TR");

  // Tabler (MIT) yol verileri
  const IKON = {
    youtube: '<path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8"/><path d="M10 9l5 3l-5 3l0 -6"/>',
    instagram: '<path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10"/><path d="M8.5 12a3.5 3.5 0 1 0 7 0a3.5 3.5 0 0 0 -7 0"/><path d="M17 7v.01"/>',
    tiktok: '<path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917"/>',
    indir: '<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"/><path d="M7 11l5 5l5 -5"/><path d="M12 4l0 12"/>',
    oynat: '<path d="M7 4v16l13 -8l-13 -8"/>',
    magaza: '<path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304"/><path d="M9 11v-5a3 3 0 0 1 6 0v5"/>',
    site: '<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/><path d="M3.6 9h16.8"/><path d="M3.6 15h16.8"/><path d="M11.5 3a17 17 0 0 0 0 18"/><path d="M12.5 3a17 17 0 0 1 0 18"/>',
  };
  const ikon = (ad) => `<svg viewBox="0 0 24 24" aria-hidden="true">${IKON[ad] || ""}</svg>`;

  // ---------- Kapaklar: her video konseptinin kendi görsel dili ----------
  // Kart verisinde kapak: { tur: "sohbet" | "dilekce" | "haber" | "kural" | "sablon" | "gorsel", ... }
  // Kapak verilmezse kanca kesikleri (ust + alt).
  const KAPAK = {
    serit: (k) => `<div class="kp-serit"><span class="serit acik">${esc(tr(k.ust))}</span><span class="serit kirmizi">${esc(tr(k.alt))}</span></div>`,

    gorsel: (k, c) => `<img class="kp-gorsel" src="${esc(c.src)}" alt="">`,

    // Grup sohbeti: kavramın sesli mesajı + "gruptan ayrıldı" (videodaki telefon uygulamasıyla aynı renkler)
    sohbet: (k, c) => {
      const yuk = [3, 5, 8, 6, 9, 4, 7, 10, 6, 3, 5, 9, 7, 4, 8, 5, 3, 6, 9, 5, 4, 7, 3, 5];
      const dalga = yuk.map((h, i) => `<i style="--h:${h};${i < 9 ? "--r:1" : ""}"></i>`).join("");
      return `<div class="kp-sohbet"><div class="tel">
        <div class="bas"><span class="av">${esc(tr((c.grup || "G")[0]))}</span><span><b>${esc(c.grup)}</b><i>${esc(c.uyeler || "")}</i></span></div>
        <div class="ses"><b>${esc(c.kimden || k.ust)}</b><span class="satir"><span class="oy"></span><span class="dalga">${dalga}</span><em>${esc(c.sure || "0:04")}</em></span></div>
        <div class="cip">${esc(c.sistem || `${k.ust} gruptan ayrıldı`)}</div>
      </div></div>`;
    },

    // İstifa / izin: masaya düşmüş dilekçe + damga
    dilekce: (k, c) => `<div class="kp-dilekce"><div class="kagit">
        <b class="ust">${esc(tr(c.baslik || "İstifa dilekçesi"))}</b>
        <span class="sat"></span><span class="sat"></span><span class="sat kisa"></span>
        <span class="imza">${esc(c.imza || k.ust)}</span>
        <span class="damga">${esc(tr(c.damga || "Reddedildi"))}</span>
      </div></div>`,

    // Son dakika: haber bandı
    haber: (k, c) => `<div class="kp-haber">
        <svg class="bardak" viewBox="0 0 40 66" aria-hidden="true"><path class="cay" d="M9.5 20 C 9.5 30, 15.5 34, 15.5 41 C 15.5 49, 10 52, 10.5 57 L 29.5 57 C 30 52, 24.5 49, 24.5 41 C 24.5 34, 30.5 30, 30.5 20 Z"/><path class="cam" d="M7.5 8 C 7.5 28, 14 34, 14 41 C 14 49, 8 52, 8.5 59 L 31.5 59 C 32 52, 26 49, 26 41 C 26 34, 32.5 28, 32.5 8 Z"/><ellipse class="tabak" cx="20" cy="61.5" rx="19" ry="3"/></svg>
        <span class="etk"><i></i>${esc(tr(c.etiket || "Son dakika"))}</span>
        <div class="manset">${esc(c.manset || "")}</div>
        <div class="kayan">${esc(tr(c.serit || ""))}</div>
      </div>`,

    // Kural değişti: ders kitabı sayfası, kural kırmızı kalemle çizilmiş
    kural: (k, c) => `<div class="kp-kural"><div class="sayfa">
        <span class="unite">${esc(tr(c.unite || ""))}</span>
        <span class="kurall"><span class="metin">${esc(c.kural || "")}</span><svg class="cizik" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path d="M1 6 C 20 3, 35 8, 55 5 S 85 4, 99 6"/></svg></span>
        <span class="yeni">${esc(c.yeni || "")}</span>
        <span class="sat"></span><span class="sat kisa"></span>
      </div></div>`,

    // Tinko Taktik şablonu: masada defter sayfası
    sablon: (k, c) => `<div class="kp-sablon"><div class="kagit">
        <span class="bant"></span>
        <b class="bas">${esc(c.baslik || k.ust)}</b>
        <span class="duzen"><span class="sol">${esc(c.sol || "Sorular")}</span><span class="sag">${esc(c.sag || "Notlar")}</span><span class="alt">${esc(c.altEt || "Özet")}</span></span>
      </div></div>`,
  };
  const kapakHTML = (k) => {
    const c = k.kapak || {};
    const f = KAPAK[c.tur] || KAPAK.serit;
    return `<div class="kapak tur-${esc(c.tur || "serit")}">${f(k, c)}</div>`;
  };

  // ---------- Profil ----------
  $("profil").innerHTML = `
    <div class="pp">
      <svg class="halka" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="56"/></svg>
      <img src="${esc(V.profil.foto)}" alt="Tinko maskotu" width="200" height="200">
    </div>
    <h1>${esc(V.profil.ad)}</h1>
    <p>${esc(V.profil.aciklama)}</p>`;

  $("sosyal").innerHTML = V.baglantilar.filter((b) => b.url).map((b) => `
    <a class="karo pah" href="${esc(b.url)}" target="_blank" rel="noopener">
      <span class="ic pah">${ikon(b.tur)}<b>${esc(b.etiket)}</b></span>
    </a>`).join("");

  const ekstra = (V.ekstra || []).filter((e) => e.url);
  if (ekstra.length) {
    $("ekstra").hidden = false;
    $("ekstra").innerHTML = ekstra.map((e) => `
      <a class="satir pah" href="${esc(e.url)}" target="_blank" rel="noopener">
        <span class="ic pah">${ikon(e.tur)}<span><b>${esc(e.etiket)}</b>${e.alt ? `<i>${esc(e.alt)}</i>` : ""}</span></span>
      </a>`).join("");
  }

  // ---------- Kartlar ----------
  // Hiç kart yoksa bölüm tamamen gizli kalır (boş başlık görünmez).
  if (!V.kartlar.length) $("kartlar-bolum").hidden = true;
  const n = V.onde || 5;
  const onde = V.kartlar.slice(0, n);
  const arsiv = V.kartlar.slice(n);

  $("kartlar").innerHTML = onde.map((k) => {
    const hazir = k.durum === "hazir" && k.pdf;
    return `
    <article class="kart${hazir ? "" : " yakinda"}">
      <div class="kapak-kap">${kapakHTML(k)}${hazir ? "" : '<span class="rozet">YAKINDA</span>'}</div>
      <div class="govde">
        <p class="etiket">${esc(k.ders)} · ${esc(k.sinif)}</p>
        <h3>${esc(k.baslik || `${k.ust} ${k.alt}`)}</h3>
        <p class="ozet">${esc(k.ozet)}</p>
        <div class="dugmeler">
          ${hazir
            ? `<a class="dugme ana pah" href="${esc(k.pdf)}" download>${ikon("indir")}PDF'i indir</a>`
            : `<span class="dugme ana pah kapali" aria-disabled="true">${ikon("indir")}Yakında</span>`}
          ${k.video ? `<a class="dugme ikinci pah" href="${esc(k.video)}" target="_blank" rel="noopener">${ikon("oynat")}Videoyu izle</a>` : ""}
        </div>
      </div>
    </article>`;
  }).join("");

  if (arsiv.length) {
    $("arsiv").hidden = false;
    $("arsiv-baslik").textContent = `Arşiv (${arsiv.length})`;
    $("arsiv-liste").innerHTML = arsiv.map((k) => `
      <li>
        <span><b>${esc(k.baslik || `${k.ust} ${k.alt}`)}</b><i>${esc(k.ders)} · ${esc(k.sinif)}</i></span>
        ${k.pdf ? `<a href="${esc(k.pdf)}" download aria-label="${esc(k.ust)} PDF">${ikon("indir")}</a>` : ""}
      </li>`).join("");
  }

  // Bulanıktan nete giriş, sırayla
  const ogeler = document.querySelectorAll(".profil > *, .sosyal > *, .ekstra > *, .bolum-bas, .kart, .arsiv:not([hidden])");
  ogeler.forEach((el, i) => { el.classList.add("gir"); el.style.animationDelay = `${80 + i * 70}ms`; });
})();
