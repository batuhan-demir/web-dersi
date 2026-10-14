https://web.bdemir.net

# Kampüs Etkinlikleri

Canlı adres yukarıdaki satırda (Vercel). Sprint 4'ten itibaren uygulama `frontend/` klasöründeki Vite + React + TypeScript projesidir; `sprint1/`, `sprint2/`, `sprint3/` önceki sprintlerin olduğu gibi bırakılmış hâlleridir.

## frontend/ klasöründeki dosyalar

| Dosya | Görevi |
| --- | --- |
| `package.json` | Proje adı, komutlar (`dev`, `build`, `preview`) ve kullanılan paketlerin listesi. |
| `package-lock.json` | Yüklenen paketlerin tam sürümlerini kilitler, herkes aynı sürümleri kurar. |
| `node_modules/` | npm'in indirdiği paketler; `.gitignore` sayesinde GitHub'a gitmez. |
| `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` | TypeScript ayarları (uygulama ve Vite yapılandırması için ayrı ayrı). |
| `vite.config.ts` | Vite ayarları ve React eklentisi. |
| `index.html` | Tek HTML dosyası; içinde React'in çizim yaptığı boş `div#root` var. |
| `src/main.tsx` | React'i başlatır ve `App` bileşenini `#root` içine çizer. |
| `src/App.tsx` | Uygulamanın ana bileşeni; 5 sayfanın hepsi burada, sayfa geçişi ve arama state ile çalışır. |
| `src/App.css` | Uygulamanın stilleri; Sprint 3'teki `2311012023.css` dosyasının taşınmış hâli. |
| `src/index.css` | Tüm sayfaya genel stil; bu sprintte boş. |
| `src/types/campus-event.ts` | `Category` union tipi ve `CampusEvent` arayüzü: bir etkinlik neye benzer. |
| `src/data/events.ts` | `CampusEvent[]` tipinde 6 etkinlik kaydı. |
| `src/utils/filter-events.ts` | Saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`. |
| `public/` | Olduğu gibi kopyalanan dosyalar (`afis.svg`). |

## Çalıştırma

```bash
cd frontend
npm install
npm run dev      # geliştirme sunucusu, http://localhost:5173
npm run build    # üretim derlemesi (dist/)
npm run preview  # derlenmiş hâli aç
```
