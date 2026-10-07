import { events, formatDate, escapeHtml } from "./data.js";

const container = document.querySelector("#detay");
const baslik = document.querySelector("header h1");

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  document.title = "Etkinlik bulunamadı · Kampüs Etkinlikleri";
  baslik.textContent = "Etkinlik bulunamadı";
  container.classList.remove("detay");
  container.innerHTML = `
    <div class="mesaj mesaj--hata" role="alert">
      ${id
        ? `"${escapeHtml(id)}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
        : "Adreste etkinlik numarası (?id=) yok. Listeden bir etkinlik seçin."}
    </div>
    <p><a class="buton" href="etkinlikler.html">← Listeye dön</a></p>`;
} else {
  document.title = `${event.title} · Kampüs Etkinlikleri`;
  baslik.textContent = event.title;
  container.innerHTML = `
    <figure>
      <img src="afis.jpg" alt="${event.title} afişi" width="500" height="800">
      <figcaption>Şekil 1: ${event.title} afişi</figcaption>
    </figure>
    <div class="bilgi">
      <h2>Etkinlik Künyesi</h2>
      <dl class="kunye">
        <dt>Tarih</dt>
        <dd><time datetime="${event.date}T${event.time}">${formatDate(event.date)}, ${event.time}</time></dd>
        <dt>Yer</dt>
        <dd>${event.location}</dd>
        <dt>Kategori</dt>
        <dd>${event.category}</dd>
        <dt>Kontenjan</dt>
        <dd>${event.capacity} kişi</dd>
      </dl>
      <h2>Açıklama</h2>
      <p>${event.description}</p>
      <p class="butonlar">
        <a class="buton buton--ikincil" href="etkinlikler.html">← Listeye dön</a>
        <a class="buton" href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
      </p>
    </div>`;
}
