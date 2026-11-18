# Hướng dẫn Wordy: từ cài đặt đến đưa lên web

Tài liệu này đi theo đúng thứ tự công việc: cài đặt máy lần đầu → làm việc hằng ngày → thêm từ vựng → đổi database → đưa lên web → xử lý sự cố. Cuối file có bảng lệnh tra nhanh.

Các lệnh viết cho **Git Bash** (hoặc terminal trong VS Code chọn Git Bash). Chỗ nào PowerShell khác, tài liệu sẽ ghi rõ.

---

## 1. Toàn cảnh

```
                  máy của bạn                                   trên mạng
  ┌──────────────────────────────────────┐      ┌───────────────────────────────────────┐
  │  code (VS Code)                      │ push │  GitHub: thang9797/wordy-english       │
  │  npm run dev → localhost:3000        │ ───► │        │ tự động                       │
  │  Postgres trong Docker (english-db)  │      │        ▼                               │
  └──────────────────────────────────────┘      │  Vercel: build + deploy                │
                                                │  https://wordy-english.vercel.app      │
                                                │        │                               │
                                                │        ▼                               │
                                                │  Neon Postgres (neon-violet-field)     │
                                                └───────────────────────────────────────┘
```

| Thành phần | Dùng gì |
|---|---|
| Web | Next.js 16 (App Router, TypeScript), React 19 |
| Database | PostgreSQL, truy cập qua Prisma 7 |
| Đăng nhập | Better Auth (email + mật khẩu) |
| Test | Vitest (unit), Playwright (end-to-end) |
| Hosting | Vercel (project `win-7aa4/wordy-english`) |
| Database online | Neon, gắn qua Vercel Marketplace |

Có **hai database tách biệt**: database Docker trên máy để thử, và database Neon cho web thật. Sửa dữ liệu ở cái này không ảnh hưởng cái kia.

---

## 2. Cài đặt lần đầu trên máy

### 2.1. Cần có

- **Node.js** 20.19+, 22.12+ hoặc 24+ (Prisma 7 không chạy trên Node 23). Kiểm tra: `node --version`.
- **Docker Desktop** để chạy Postgres.
- **Git**.
- **Vercel CLI** (chỉ cần khi thao tác với bản online): `npm i -g vercel`, rồi `vercel login`.

### 2.2. Các bước

```bash
git clone https://github.com/thang9797/wordy-english.git
cd wordy-english

npm install                 # cài thư viện, tự chạy `prisma generate`
cp .env.example .env        # tạo file cấu hình
```

Mở `.env` và thay `BETTER_AUTH_SECRET` bằng một chuỗi ngẫu nhiên:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Bật database, tạo bảng, nạp dữ liệu, chạy web:

```bash
npm run db:up               # bật Postgres trong Docker (cổng 5432)
npm run db:migrate          # tạo các bảng
npm run db:seed             # nạp deck, quiz, câu luyện nghe/nói
npm run dev                 # mở http://localhost:3000
```

Vào http://localhost:3000, đăng ký một tài khoản, mở **Decks** là thấy các bộ từ.

> Nếu thư mục đã liên kết với Vercel (có thư mục `.vercel/`), lệnh `vercel link` có thể đã tạo file `.env.local`. File này chỉ chứa token Vercel, không thay thế `.env`.

---

## 3. Làm việc hằng ngày

### Bật

1. Mở **Docker Desktop**, đợi nó báo đang chạy.
2. `npm run db:up` (container `english-db` có `restart: unless-stopped` nên thường tự bật cùng Docker).
3. `npm run dev` → http://localhost:3000.

### Tắt

- Server web: bấm `Ctrl + C` trong terminal đang chạy `npm run dev`.
- Database: `docker compose stop` (dữ liệu vẫn giữ trong volume `pgdata`).

### Xem dữ liệu

`npm run db:studio` mở Prisma Studio trên trình duyệt để xem và sửa bảng.

---

## 4. Thêm hoặc sửa từ vựng

### 4.1. File nào chứa gì

Toàn bộ nội dung nằm trong `prisma/data/`:

| File | Nội dung |
|---|---|
| `b2-decks.ts`, `b2-decks-more.ts` | Từ vựng B2 theo chủ đề |
| `c1-decks.ts`, `c1-decks-more.ts` | Từ vựng C1 theo chủ đề |
| `c2-decks.ts` | Từ vựng C2 theo chủ đề |
| `extras-b2.ts`, `extras-c1.ts`, `extras-c2.ts` | Ví dụ phụ và mẹo nhớ cho các file `*-more.ts` và `c2-decks.ts` |
| `toeic-*.ts`, `ielts-decks.ts`, `general-decks.ts` | TOEIC theo band điểm, IELTS, tiếng Anh hằng ngày |
| `quizzes.ts`, `sentences.ts` | Câu hỏi quiz, câu luyện nghe/nói |
| `types.ts` | Kiểu dữ liệu và các hàm `w()`, `wx()`, `applyExtras()` |

`prisma/seed.ts` gom tất cả lại và ghi vào database.

### 4.2. Thêm một từ vào deck có sẵn

Thêm một dòng `wx(...)` vào mảng `words` của deck:

```ts
wx(
  "resilient",                       // từ
  "/rɪˈzɪliənt/",                    // phiên âm IPA
  "adjective",                       // từ loại
  "able to recover quickly",         // định nghĩa tiếng Anh
  "kiên cường, mau phục hồi",        // nghĩa tiếng Việt
  "Children are often very resilient.",      // ví dụ chính
  "Trẻ em thường rất kiên cường.",           // dịch ví dụ
  {
    syn: ["tough", "adaptable"],     // đồng nghĩa
    ant: ["fragile"],                // trái nghĩa
    col: ["resilient economy"],      // collocation
    fam: ["resilience (n)"],         // họ từ
    ex: ["The town proved resilient after the flood.", "Thị trấn tỏ ra kiên cường sau trận lũ."], // ví dụ phụ
    mnemonic: "re- (lại) + silire (nhảy) = bật lại",  // mẹo nhớ
  },
),
```

Tất cả trường trong `{ ... }` đều không bắt buộc. Nếu không có gì thêm, dùng `w(...)` với 7 tham số đầu.

### 4.3. Ví dụ phụ và mẹo nhớ để ở file riêng

Với các deck trong `b2-decks-more.ts`, `c1-decks-more.ts`, `c2-decks.ts`, ví dụ phụ và mẹo nhớ nằm ở file `extras-*.ts`, khoá theo đúng chữ của từ:

```ts
resilient: {
  ex: ["The town proved resilient after the flood.", "Thị trấn tỏ ra kiên cường sau trận lũ."],
  mnemonic: "re- (lại) + silire (nhảy) = bật lại",   // không bắt buộc
},
```

`applyExtras()` ghép chúng vào deck khi seed. Nếu khoá bị gõ sai (không khớp từ nào), seed sẽ **dừng và báo lỗi** `Extras for unknown terms: ...`, nên không có dữ liệu nào lặng lẽ bị bỏ sót.

### 4.4. Thêm một chủ đề (deck) mới

Thêm một object vào mảng của file theo cấp độ, ví dụ trong `c2-decks.ts`:

```ts
{
  slug: "c2-arts-culture",           // duy nhất, viết thường, dùng dấu gạch
  title: "Arts & Culture",
  description: "Words for criticism, aesthetics and cultural life.",
  category: "GENERAL",
  level,                             // "C2", lấy từ hằng số đầu file
  topic: "Arts",
  words: [ /* các dòng wx(...) */ ],
},
```

Trang **Decks** tự xếp deck vào mục theo `level` (B2, C1, C2), nên không cần sửa giao diện.

### 4.5. Thêm một file dữ liệu mới

Nếu tạo file mới (ví dụ `c2-decks-more.ts`), phải khai báo trong `prisma/seed.ts`: thêm `import`, rồi thêm vào mảng `decks` trong hàm `seedDecks()`.

### 4.6. Quy tắc trùng từ

- Trong **cùng một cấp độ** B2, C1 hoặc C2, một từ chỉ được xuất hiện ở một deck. Nếu trùng, seed dừng với lỗi `Duplicate term "..."`.
- Trùng giữa các cấp độ khác nhau (ví dụ B2 và TOEIC) chỉ in cảnh báo `note: ...`, không chặn.

### 4.7. Nạp vào database trên máy

```bash
npm run db:seed
```

Seed chạy lại bao nhiêu lần cũng được: nó cập nhật theo `slug` và theo từ, **không xoá tiến độ học** của người dùng.

> Seed không xoá từ. Nếu bạn xoá một từ khỏi file, từ đó vẫn còn trong database cho đến khi xoá tay (ví dụ bằng `npm run db:studio`).

Để đưa từ mới lên web, xem [mục 7.3](#73-đưa-từ-vựng-mới-lên-web).

---

## 5. Đổi cấu trúc database (schema)

Chỉ cần khi sửa `prisma/schema.prisma` (thêm bảng, thêm cột...).

```bash
npm run db:migrate          # Prisma hỏi tên migration, ví dụ: add_word_level
```

Lệnh này tạo thư mục mới trong `prisma/migrations/` và áp dụng vào database trên máy. **Phải commit thư mục migration đó** cùng với thay đổi schema.

Trên web, migration được áp dụng tự động khi deploy production (xem [mục 7.2](#72-chuyện-gì-xảy-ra-khi-vercel-build)).

Không bao giờ sửa một migration đã push lên `main`; muốn đổi tiếp thì tạo migration mới.

---

## 6. Kiểm tra trước khi push

```bash
npm run typecheck           # lỗi kiểu TypeScript
npm run lint                # ESLint
npm test                    # unit test (Vitest)
```

Test end-to-end (đăng ký, các chế độ ôn tập) chạy trên bản build ở cổng 3100:

```bash
npm run build
npx playwright test
```

---

## 7. Đưa lên web

### 7.1. Deploy: chỉ cần push

```bash
git add <các file đã sửa>
git commit -m "Mô tả ngắn thay đổi"
git push
```

| Push lên | Kết quả |
|---|---|
| nhánh `main` | Vercel tự build và deploy **production** → https://wordy-english.vercel.app |
| nhánh khác / Pull Request | Vercel tạo bản **Preview** với URL riêng, không ảnh hưởng production |

Theo dõi tiến độ: `vercel ls wordy-english` hoặc trang https://vercel.com/win-7aa4/wordy-english. Một lần build mất khoảng 30 giây.

### 7.2. Chuyện gì xảy ra khi Vercel build

Lệnh build (`package.json`) là:

```
prisma generate && node scripts/migrate-on-deploy.mjs && next build
```

1. `prisma generate`: tạo Prisma Client.
2. `scripts/migrate-on-deploy.mjs`:
   - Nếu là **production**: chạy `prisma migrate deploy` lên Neon qua kết nối trực tiếp `DATABASE_URL_UNPOOLED`. Không có migration mới thì in `No pending migrations to apply.`
   - Nếu là **Preview** hoặc build trên máy: bỏ qua và in `Skipping migrations`. Lý do: Preview dùng **chung database** với production, không được phép đổi cấu trúc database thật.
3. `next build`: build web.

Nếu migration lỗi, build dừng và **bản web đang chạy vẫn giữ nguyên**, không bị hỏng.

### 7.3. Đưa từ vựng mới lên web

Deploy **không** tự chạy seed. Sau khi push, nạp dữ liệu lên Neon từ máy bạn:

```bash
vercel env pull .env.neon --environment=production --yes   # lấy chuỗi kết nối Neon
npx tsx --env-file=.env.neon prisma/seed.ts                 # seed lên Neon
rm .env.neon                                                # xoá file chứa mật khẩu
```

- `.env.neon` bị `.gitignore` chặn (`.env*`), nên không bị commit nhầm. Vẫn nên xoá sau khi dùng.
- `--env-file` được ưu tiên hơn file `.env`, nên lệnh này ghi vào Neon chứ không phải database trên máy.
- Seed lên Neon mất vài phút vì database ở Mỹ.
- Cần đã chạy `vercel login` và thư mục đã liên kết project (`vercel link`).

### 7.4. Biến môi trường

| Biến | Trên máy (`.env`) | Trên Vercel |
|---|---|---|
| `DATABASE_URL` | Postgres trong Docker | Neon (kết nối qua pooler), do Neon tự tạo |
| `DATABASE_URL_UNPOOLED` | không cần | Neon (kết nối trực tiếp), dùng cho migration |
| `BETTER_AUTH_SECRET` | chuỗi ngẫu nhiên của bạn | chuỗi ngẫu nhiên riêng (loại Secret) |
| `BETTER_AUTH_URL` | `http://localhost:3000` | `https://wordy-english.vercel.app` |
| `APP_TIME_ZONE` | không bắt buộc | không bắt buộc, mặc định `Asia/Ho_Chi_Minh` |

Xem tên các biến trên Vercel: `vercel env ls`. Biến loại Secret không đọc lại được giá trị, chỉ ghi đè được. Đổi biến xong phải deploy lại thì mới có hiệu lực.

Nếu đổi domain, nhớ đổi `BETTER_AUTH_URL` theo, nếu không đăng nhập sẽ báo lỗi origin.

### 7.5. Quay lại bản trước

Nếu bản mới có lỗi: vào trang project trên Vercel → **Deployments** → chọn bản cũ đang chạy tốt → **Promote to Production** (hoặc `vercel rollback`). Lưu ý rollback chỉ đổi code; migration đã chạy trên Neon thì không tự đảo ngược.

---

## 8. Xử lý sự cố

| Triệu chứng | Nguyên nhân và cách xử lý |
|---|---|
| `ECONNREFUSED` khi seed hoặc chạy web trên máy | Postgres chưa chạy. Mở Docker Desktop rồi `npm run db:up`. |
| `open //./pipe/dockerDesktopLinuxEngine` | Docker Desktop chưa bật. Mở nó, đợi khởi động xong. |
| Đã tắt `npm run dev` nhưng cổng 3000 vẫn bận | Trên Windows, tiến trình Node đôi khi còn sống. PowerShell: `Get-NetTCPConnection -LocalPort 3000 -State Listen \| Select OwningProcess`, rồi `Stop-Process -Id <số> -Force`. |
| Seed báo `Duplicate term "..."` | Từ đó đã có trong deck khác cùng cấp độ. Xoá một trong hai (mục 4.6). |
| Seed báo `Extras for unknown terms: ...` | Khoá trong `extras-*.ts` không khớp từ nào. Sửa cho đúng chính tả. |
| Build trên Vercel lỗi ở bước `[migrate]` | Migration không áp dụng được lên Neon. Xem log: `vercel inspect <url-deploy> --logs`. Web cũ vẫn chạy bình thường. |
| Đăng nhập trên web báo lỗi origin | `BETTER_AUTH_URL` trên Vercel không khớp domain. Sửa biến rồi deploy lại. |
| Trang web hơi chậm | Function chạy ở Singapore (`sin1` trong `vercel.json`) còn Neon ở Mỹ (`us-east-1`), mỗi truy vấn thêm khoảng 200ms. Cách sửa: tạo lại Neon ở Singapore, hoặc đổi region trong `vercel.json` sang `iad1`. |
| Từ mới không hiện trên web | Chưa seed lên Neon. Làm theo mục 7.3. |

---

## 9. Tra nhanh

| Việc | Lệnh |
|---|---|
| Bật database trên máy | `npm run db:up` |
| Chạy web trên máy | `npm run dev` |
| Nạp/cập nhật dữ liệu trên máy | `npm run db:seed` |
| Tạo migration sau khi sửa schema | `npm run db:migrate` |
| Xem database | `npm run db:studio` |
| Kiểm tra code | `npm run typecheck && npm run lint && npm test` |
| Deploy production | `git push` lên `main` |
| Xem các lần deploy | `vercel ls wordy-english` |
| Xem log một lần deploy | `vercel inspect <url-deploy> --logs` |
| Seed lên Neon | mục 7.3 |
| Tắt database trên máy | `docker compose stop` |

**Địa chỉ cần nhớ**

- Web: https://wordy-english.vercel.app
- Code: https://github.com/thang9797/wordy-english
- Vercel: https://vercel.com/win-7aa4/wordy-english
