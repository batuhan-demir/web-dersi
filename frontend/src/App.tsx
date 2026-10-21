import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

// Kategori seçenekleri veriden, her biri bir kez
const categories = [...new Set(events.map((e) => e.category))];

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
  const headerText =
    page === "home"
      ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
      : page === "events"
        ? "Ekim ve Kasım aylarında kampüste düzenlenen etkinlikler."
        : undefined;

  // Side-effect: başlık değişince sekme adı da değişsin
  useEffect(() => {
    document.title = page === "home" ? title : `Kampüs Etkinlikleri — ${title}`;
  }, [title, page]);

  return (
    <>
      <Header title={title} text={headerText}>
        <Navigation current={page} onNavigate={go} />
      </Header>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <p>
              <a className="buton" href="#events" onClick={(e) => { e.preventDefault(); go("events"); }}>
                Tüm etkinlikleri gör →
              </a>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filtered.length > 0 && <p className="sonuc">{filtered.length} etkinlik listeleniyor.</p>}
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
          </>
        )}

        {page === "detail" && !selected && (
          <>
            <div className="mesaj mesaj--hata" role="alert">Seçili bir etkinlik yok. Listeden bir etkinlik seçin.</div>
            <p>
              <a className="buton" href="#events" onClick={(e) => { e.preventDefault(); go("events"); }}>
                ← Listeye dön
              </a>
            </p>
          </>
        )}

        {page === "detail" && selected && (
          <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
        )}

        {(page === "add" || page === "update") && (
          <EventForm key={page} onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
