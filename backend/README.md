# Kampüs Etkinlikleri · Backend

Etkinlikleri JSON olarak veren Node + Express sunucusu. Veri bu sprintte bellekte tutulur; sunucu yeniden başlayınca POST ile eklenenler kaybolur.

## Çalıştırma

```bash
cd backend
cp .env.example .env   # PORT değişkeni
npm install
npm run dev            # node --watch, http://localhost:3000
npm start              # izleme olmadan
```

## Ortam değişkenleri

| Değişken | Açıklama                 | Varsayılan |
| -------- | ------------------------ | ---------- |
| `PORT`   | Sunucunun dinlediği port | `3000`     |

`.env` GitHub'a gönderilmez; `.env.example` hangi değişkenlerin gerektiğini gösterir.

## REST sözleşmesi

| Method | Endpoint      | Amaç                                                | Başarılı | Hata     | Durum     |
| ------ | ------------- | --------------------------------------------------- | -------- | -------- | --------- |
| GET    | `/health`     | Sunucu ayakta mı (`status`, `time`, `student`)      | 200      | —        | Bu sprint |
| GET    | `/events`     | Listeyi getir (`?category=` isteğe bağlı)           | 200      | —        | Bu sprint |
| GET    | `/events/:id` | Tek etkinlik                                        | 200      | 404      | Bu sprint |
| POST   | `/events`     | Yeni etkinlik (`title`, `category`, `date` zorunlu) | 201      | 400      | Bu sprint |
| PATCH  | `/events/:id` | Güncelle                                            | 200      | 400, 404 | Sprint 9  |
| DELETE | `/events/:id` | Sil                                                 | 204      | 404      | Sprint 9  |

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

## Klasör yapısı

| Dosya                                 | İşi                                                   |
| ------------------------------------- | ----------------------------------------------------- |
| `src/app.js`                          | Express uygulaması, middleware'ler, route'ları bağlar |
| `src/server.js`                       | `.env`'i okur, portu dinler                           |
| `src/routes/event-routes.js`          | Hangi adres hangi fonksiyona gider                    |
| `src/controllers/event-controller.js` | İsteği işler, yanıtı döndürür                         |
| `src/data/events.js`                  | Bellek içi etkinlik dizisi                            |
| `requests/kampus-api.json`            | Postman collection (6 istek)                          |

## Postman

`requests/kampus-api.json` dosyasını Postman'e import et ya da komut satırından çalıştır:

```bash
npx newman run requests/kampus-api.json
```
