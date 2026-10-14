import "./App.css";
import { useEffect, useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

// Kategori seçenekleri veriden, her biri bir kez
const categories = [...new Set(events.map((e) => e.category))];

// "2026-10-12" → "12 Ekim 2026"
const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Her çizimde hesaplanır; state değil
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const titles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri",
    events: "Tüm Etkinlikler",
    detail: selected ? selected.title : "Etkinlik bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle",
  };
  const title = titles[page];

  // Side-effect: başlık değişince sekme adı da değişsin
  useEffect(() => {
    document.title = page === "home" ? title : `Kampüs Etkinlikleri — ${title}`;
  }, [title, page]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p className="kategori">{event.category}</p>
        <p>
          Tarih:{" "}
          <time dateTime={`${event.date}T${event.time}`}>
            {formatDate(event.date)}, {event.time}
          </time>
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p className="aciklama">{event.description}</p>
        <a
          href={`#${event.id}`}
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör →
        </a>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>{title}</h1>
        {page === "home" && (
          <p className="giris">Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
        )}
        {page === "events" && (
          <p className="giris">Ekim ve Kasım aylarında kampüste düzenlenen etkinlikler.</p>
        )}
        <nav>
          {menu.map((item) => (
            <a
              key={item.page}
              href={`#${item.page}`}
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.page);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="kartlar">{upcoming.map(renderCard)}</section>
            <p>
              <a
                className="buton"
                href="#events"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör →
              </a>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <p>
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn. atölye, kariyer"
                  autoComplete="off"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </p>
            </form>
            <p className="sonuc" aria-live="polite">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <section className="kartlar">{filtered.map(renderCard)}</section>
          </>
        )}

        {page === "detail" && !selected && (
          <>
            <div className="mesaj mesaj--hata" role="alert">
              Seçili bir etkinlik yok. Listeden bir etkinlik seçin.
            </div>
            <p>
              <a
                className="buton"
                href="#events"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                ← Listeye dön
              </a>
            </p>
          </>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            {selected.image && (
              <figure>
                <img src={selected.image} alt={`${selected.title} afişi`} width={500} height={800} />
                <figcaption>Şekil 1: {selected.title} afişi</figcaption>
              </figure>
            )}
            <div className="bilgi">
              <h2>Etkinlik Künyesi</h2>
              <dl className="kunye">
                <dt>Tarih</dt>
                <dd>
                  <time dateTime={`${selected.date}T${selected.time}`}>
                    {formatDate(selected.date)}, {selected.time}
                  </time>
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity} kişi</dd>
              </dl>
              <h2>Açıklama</h2>
              <p>{selected.description}</p>
              <p className="butonlar">
                <a
                  className="buton buton--ikincil"
                  href="#events"
                  onClick={(e) => {
                    e.preventDefault();
                    go("events");
                  }}
                >
                  ← Listeye dön
                </a>
                <a
                  className="buton"
                  href="#update"
                  onClick={(e) => {
                    e.preventDefault();
                    go("update", selected.id);
                  }}
                >
                  Bu etkinliği güncelle
                </a>
              </p>
            </div>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <>
            <p className="giris">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <form key={page} className="form" onSubmit={(e) => e.preventDefault()}>
              <p>
                <label htmlFor="title">Etkinlik Adı</label>
                <input type="text" id="title" name="title" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />
              </p>
              <p>
                <label htmlFor="category">Kategori</label>
                <select id="category" name="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </p>
              <p>
                <label htmlFor="date">Tarih</label>
                <input type="date" id="date" name="date" />
              </p>
              <p>
                <label htmlFor="time">Saat</label>
                <input type="time" id="time" name="time" />
              </p>
              <p>
                <label htmlFor="location">Yer</label>
                <input type="text" id="location" name="location" maxLength={80} placeholder="Örn. A Blok Konferans Salonu" />
              </p>
              <p>
                <label htmlFor="capacity">Kontenjan</label>
                <input type="number" id="capacity" name="capacity" min={1} max={1000} step={1} />
              </p>
              <p>
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" name="description" rows={5} />
              </p>
              <p>
                <button type="submit">{page === "add" ? "Kaydet" : "Güncelle"}</button>
              </p>
            </form>
          </>
        )}
      </main>

      <footer>
        <p>Batuhan Demir &middot; 2311012023 &middot; 2026</p>
      </footer>
    </>
  );
}

export default App;
