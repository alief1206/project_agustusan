# Backend Web Polling

Folder ini berisi backend Express untuk project web polling.

## Letak Folder Penting

- `server/src/server.js`: entry point untuk menjalankan server.
- `server/src/app.js`: konfigurasi Express, middleware, dan route utama.
- `server/src/routes`: kumpulan endpoint API.
- `server/src/controllers`: logika request dan response.
- `server/src/middleware`: middleware auth, error handler, dan 404.
- `server/src/config`: konfigurasi environment dan koneksi Prisma.
- `server/src/scripts/seed.js`: isi data awal kategori, kandidat, dan admin `paklurah`.
- `server/src/scripts/pushMysqlSchema.js`: membuat tabel MySQL/XAMPP saat Prisma CLI `db push` bermasalah.
- `prisma/schema.prisma`: struktur tabel database.

## Perintah Yang Dipakai

```bash
npm run dev:server
npm run dev:client
npm run dev:all
npm run db:create
npm run db:setup
npm run db:verify
npm run prisma:generate
npm run prisma:push
npm run prisma:migrate
npm run seed
```

Backend berjalan di `http://localhost:5000` secara default.

## Alur Setup Database

Pastikan MySQL di XAMPP sudah menyala, lalu `.env` root punya `DATABASE_URL` MySQL:

```env
DATABASE_URL="mysql://root:@127.0.0.1:3306/web_polling"
DATABASE_ADMIN_URL="mysql://root:@127.0.0.1:3306/mysql"
DATABASE_NAME="web_polling"
```

Setelah itu jalankan:

```bash
npm.cmd run db:setup
npm.cmd run db:verify
npm.cmd run dev:server
```

Default admin seed memakai:

```env
ADMIN_EMAIL=paklurah
ADMIN_PASSWORD=penganjuran
JWT_SECRET=ubah-secret-ini
```

Catatan: field `email` di tabel `AdminUser` dipakai sebagai username admin.
