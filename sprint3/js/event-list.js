import { events, formatDate } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

function createCard(event) {
  return `<article class="kart">
    <h3>${event.title}</h3>
    <p class="kategori">${event.category}</p>
    <p>Tarih: <time datetime="${event.date}T${event.time}">${formatDate(event.date)}, ${event.time}</time></p>
    <p>Yer: ${event.location}</p>
    <p>Kontenjan: ${event.capacity} kişi</p>
    <p class="aciklama">${event.description}</p>
    <a href="etkinlik-detay.html?id=${event.id}">Detayları gör →</a>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

if (list.dataset.limit) {
  // Ana sayfa: tarihe göre en yakın N etkinlik (kopya üzerinde sıralama)
  const yaklasan = [...events]
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  render(events);
}

// ---- Arama + kategori filtresi (sadece etkinlikler.html'de var) ----
const filtreFormu = document.querySelector("#filtre-formu");

if (filtreFormu) {
  const arama = filtreFormu.querySelector("#arama");
  const kategoriSecimi = filtreFormu.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  // Kategori seçeneklerini veriden üret, her biri bir kez
  const kategoriler = [...new Set(events.map((e) => e.category))];
  for (const kategori of kategoriler) {
    const option = document.createElement("option");
    option.value = kategori;
    option.textContent = kategori;
    kategoriSecimi.append(option);
  }

  function filtrele() {
    const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
    const secilen = kategoriSecimi.value;

    const sonuc = events.filter((e) => {
      const metin = `${e.title} ${e.description} ${e.location}`.toLocaleLowerCase("tr-TR");
      const metinUyuyor = aranan === "" || metin.includes(aranan);
      const kategoriUyuyor = secilen === "" || e.category === secilen;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);
    sonucSatiri.textContent =
      sonuc.length === 0
        ? "Aramanıza uygun etkinlik bulunamadı."
        : `${sonuc.length} etkinlik listeleniyor.`;
  }

  arama.addEventListener("input", filtrele);
  kategoriSecimi.addEventListener("change", filtrele);
  filtreFormu.addEventListener("submit", (e) => e.preventDefault());

  filtrele();
}
