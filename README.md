https://batuhandemir-frontend.vercel.app

# Kampüs Etkinlikleri

Canlı adres yukarıdaki satırda (Vercel). Repoda iki uygulama var: `frontend/` (Vite + React + TypeScript, Vercel'de yayında) ve `backend/` (Node + Express REST API, Sprint 7'den itibaren, şimdilik sadece yerelde). `sprint1/`, `sprint2/`, `sprint3/` önceki sprintlerin olduğu gibi bırakılmış hâlleridir.

## Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev      # http://localhost:3000
```

Uçlar: `GET /health`, `GET /events`, `GET /events/:id`, `POST /events`. REST sözleşmesi ve ayrıntılar [backend/README.md](backend/README.md) içinde; Postman collection `backend/requests/kampus-api.json`.

## Kurulum ve çalıştırma

```bash
cd frontend
npm install
npm run dev      # geliştirme sunucusu, http://localhost:5173
npm run build    # üretim derlemesi (dist/)
npm run preview  # derlenmiş hâli aç
npm run lint     # oxlint
npm run format   # prettier
```

## Route listesi

| Adres | Sayfa | Açıklama |
| --- | --- | --- |
| `/` | HomePage | Tarihi en yakın 2 etkinlik |
| `/events` | EventsPage | Tüm etkinlikler, arama ve kategori filtresi |
| `/events/:id` | EventDetailPage | Tek etkinliğin detayı; id yoksa "Sayfa bulunamadı" |
| `/login` | LoginPage | Giriş formu (sadece doğrulama, giriş yapılmaz) |
| `/register` | RegisterPage | Kayıt formu (sadece doğrulama) |
| `/forgot-password` | ForgotPasswordPage | Şifre yenileme bağlantısı (demo) |
| `/admin` | AdminPage | Etkinlik tablosu: yeni, düzenle, sil |
| `/admin/new` | AddEventPage | Yeni etkinlik formu |
| `/admin/:id/edit` | EditEventPage | Var olan etkinliği düzenleme formu |
| `*` | NotFoundPage | Eşleşmeyen adresler |

Ekle, güncelle ve sil işlemleri `EventsContext` üzerinden yapılır; sayfa yenilenirse veri `data/events.ts` içindeki başlangıç listesine döner (kalıcı kayıt backend sprintlerinde).

## frontend/src klasörü

| Yol | Görevi |
| --- | --- |
| `main.tsx` | React'i başlatır; `BrowserRouter` ve `EventsProvider` ile `App`'i sarar. |
| `App.tsx` | Header, Navigation, `Routes` ve Footer. State yok. |
| `App.css` | Uygulamanın stilleri (renk ve font öğrenci numarasından türetilir). |
| `components/layout/` | `Header`, `Navigation` (NavLink menü), `Footer`. |
| `components/events/` | `EventCard`, `EventList`, `EventFilter`, `EventDetail`. |
| `components/forms/EventForm.tsx` | Controlled etkinlik formu; `initialData`, `submitText`, `onSubmit`. |
| `context/EventsContext.tsx` | Etkinlik listesi ve `addEvent`, `updateEvent`, `deleteEvent`; `useEvents` hook'u. |
| `pages/` | 10 route'un sayfa bileşenleri. |
| `data/events.ts` | Başlangıç verisi, `CampusEvent[]`. |
| `types/` | `campus-event.ts` (CampusEvent, Category), `event-form.ts` (EventFormData, EventFormErrors). |
| `utils/` | `filter-events.ts`, `format-date.ts`, `validate-event.ts` (saf fonksiyonlar). |

## Diğer dosyalar

| Dosya | Görevi |
| --- | --- |
| `package.json`, `package-lock.json` | Komutlar ve paket sürümleri. |
| `vite.config.ts` | Vite ayarları; CSS küçültme kapalı (numaradan türeyen renk bozulmasın diye). |
| `vercel.json` | Tüm adresleri `index.html`'e yönlendirir; `/events/event-2` gibi adresler yenilenince de açılır. |
| `tsconfig*.json` | TypeScript ayarları. |
| `index.html` | Tek HTML, içinde `div#root`. |
| `public/` | Olduğu gibi kopyalanan dosyalar (`afis.svg`). |
