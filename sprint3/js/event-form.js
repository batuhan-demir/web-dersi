import { events, escapeHtml } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");
const guncelleModu = form.dataset.mode === "guncelle";

// Güncelleme sayfası: adresteki id ile etkinliği bul ve formu doldur
let etkinlik = null;

if (guncelleModu) {
  const id = new URLSearchParams(location.search).get("id");
  etkinlik = events.find((e) => e.id === id);

  if (!etkinlik) {
    form.outerHTML = `
      <div class="mesaj mesaj--hata" role="alert">
        Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin,
        detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.
      </div>
      <p><a class="buton" href="etkinlikler.html">Etkinliklere git</a></p>`;
  } else {
    form.elements.ad.value = etkinlik.title;
    form.elements.kategori.value = etkinlik.category;
    form.elements.tarih.value = etkinlik.date;
    form.elements.saat.value = etkinlik.time;
    form.elements.yer.value = etkinlik.location;
    form.elements.kontenjan.value = etkinlik.capacity;
    form.elements.aciklama.value = etkinlik.description;
  }
}

// Form hâlâ sayfadaysa (güncellemede etkinlik bulunamayınca kaldırılıyor)
if (document.contains(form)) {
  const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

  function hataGoster(alanAdi, metin) {
    const alan = form.elements[alanAdi];
    const hataYeri = document.querySelector(`#${alanAdi}-hata`);
    hataYeri.textContent = metin;
    alan.setAttribute("aria-invalid", "true");
  }

  function hataTemizle(alanAdi) {
    const alan = form.elements[alanAdi];
    const hataYeri = document.querySelector(`#${alanAdi}-hata`);
    hataYeri.textContent = "";
    alan.removeAttribute("aria-invalid");
  }

  // Düzeltilen alanın eski hatası silinsin
  for (const alanAdi of alanlar) {
    form.elements[alanAdi].addEventListener("input", () => hataTemizle(alanAdi));
    form.elements[alanAdi].addEventListener("change", () => hataTemizle(alanAdi));
  }

  function dogrula(data) {
    const errors = {};
    if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    if (!data.category) errors.kategori = "Bir kategori seçin.";
    if (!data.date) errors.tarih = "Tarih seçin.";
    if (!data.time) errors.saat = "Saat seçin.";
    if (!data.location) errors.yer = "Yer bilgisini yazın.";
    if (
      data.capacity !== null &&
      (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)
    ) {
      errors.kontenjan = "Kontenjan 1 ile 1000 arasında tam sayı olmalı.";
    }
    return errors;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const kontenjanMetni = fd.get("kontenjan").trim();

    const data = {
      id: guncelleModu ? etkinlik.id : `event-${events.length + 1}`,
      title: fd.get("ad").trim(),
      category: fd.get("kategori"),
      date: fd.get("tarih"),
      time: fd.get("saat"),
      location: fd.get("yer").trim(),
      capacity: kontenjanMetni === "" ? null : Number(kontenjanMetni),
      description: fd.get("aciklama").trim(),
    };

    const errors = dogrula(data);

    for (const alanAdi of alanlar) {
      if (errors[alanAdi]) hataGoster(alanAdi, errors[alanAdi]);
      else hataTemizle(alanAdi);
    }

    if (Object.keys(errors).length > 0) {
      mesaj.className = "mesaj mesaj--hata";
      mesaj.textContent = "Formda hatalı alanlar var. Kırmızı işaretli alanları düzeltin.";
      return;
    }

    console.log(data);
    mesaj.className = "mesaj mesaj--basari";
    mesaj.innerHTML = `
      <p>${guncelleModu ? "Etkinlik güncellendi" : "Etkinlik oluşturuldu"} (bu sprintte kaydedilmez):</p>
      <pre>${escapeHtml(JSON.stringify(data, null, 2))}</pre>`;
  });
}
