# To-Do Uygulaması Backend

Bu proje, NestJS ile yazılmış bir To-Do uygulamasının backend kısmıdır. Kullanıcılar kayıt olabilir, giriş yapabilir ve sadece kendi görevlerini yönetebilir.

## Kurulum

1. Bağımlılıkları yükleyin:

```
npm install
```

2. Ortam değişkenlerini ayarlayın:

`.env` dosyasını oluşturun ve aşağıdaki örneği kullanın:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=todo_db
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
PORT=3000
```

3. PostgreSQL veritabanınızı oluşturun.

4. Uygulamayı başlatın:

```
npm run start:dev
```

## Temel Özellikler

- Kullanıcı kaydı ve girişi (JWT ile kimlik doğrulama)
- Her kullanıcı sadece kendi görevlerini görebilir ve yönetebilir
- Görev ekleme, silme, tamamlama
- Modüler ve sade kod yapısı

## Proje Yapısı

- `src/user` : Kullanıcı işlemleri
- `src/auth` : Kimlik doğrulama
- `src/task` : Görev işlemleri
- `src/config` : Yapılandırma dosyaları

## Notlar

- Kodda tüm açıklamalar Türkçedir.
- Her endpoint JWT ile korunur.
- Kodda gereksiz tekrar ve karmaşa yoktur.

## Test

Testler için:

```
npm run test
```
