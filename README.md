# To-Do Uygulaması

Bu proje, kullanıcıların kendi görevlerini oluşturup yönetebileceği, modern ve sade bir yapılacaklar listesi (To-Do) uygulamasıdır. Backend NestJS, frontend React ile yazılmıştır. Veritabanı olarak PostgreSQL kullanılır. Her kullanıcı sadece kendi görevlerini görebilir ve yönetebilir.

## Özellikler
- Kullanıcı kaydı ve girişi (JWT ile kimlik doğrulama)
- Görev ekleme, silme, güncelleme, tamamlama
- Görevler için başlık, açıklama, öncelik, bitiş tarihi, etiketler
- Görevleri filtreleme ve arama
- Responsive ve sade arayüz
- Her kullanıcı sadece kendi görevlerini görebilir

## Kurulum

### Gereksinimler
- Node.js (18+ önerilir)
- PostgreSQL

### 1. Veritabanı Oluştur
PostgreSQL'de bir veritabanı oluştur:

```
CREATE DATABASE todo_db;
```

### 2. Backend Kurulumu
```bash
cd server
npm install
```

#### Ortam Değişkenleri
`server/.env` dosyası oluştur ve aşağıdaki örneği doldur:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=todo_db
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=7d
PORT=3000
```

#### Backend'i Başlat
```bash
npm run start:dev
```

### 3. Frontend Kurulumu
```bash
cd ../client
npm install
```

#### Frontend'i Başlat
```bash
npm run dev
```

### 4. Kullanım
- Uygulama açıldığında kayıt olabilir veya giriş yapabilirsin.
- Giriş yaptıktan sonra görevlerini ekleyebilir, düzenleyebilir, silebilir ve tamamlayabilirsin.
- Görevlerini başlık, açıklama, öncelik, tarih ve etiketlere göre filtreleyebilir ve arayabilirsin.