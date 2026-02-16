# 📓 Notes App

A modern full-stack web application for managing personal notes efficiently.  
Built with React (frontend) and Node.js + Express (backend), powered by MongoDB.

---

## 🎯 Tujuan Project

Notes App dibuat untuk:

- Membantu pengguna mencatat dan mengelola catatan secara digital
- Mengimplementasikan sistem autentikasi berbasis JWT
- Menerapkan arsitektur full-stack (frontend & backend terpisah)
- Melatih implementasi CRUD dengan MongoDB

---

## 📖 Deskripsi Project

Notes App adalah aplikasi pencatat berbasis web dengan fitur:

- 🔐 Authentication (Register & Login)
- 📝 Create, Read, Update, Delete Notes (CRUD)
- 🔒 Proteksi data per user
- 🌐 RESTful API Backend
- 🎨 Responsive UI dengan Tailwind CSS

Project ini dipisahkan menjadi dua bagian utama:

```
Notes-App/
│
├── client/        # Frontend (React + Vite + Tailwind)
├── server/        # Backend (Express + MongoDB)
├── LICENSE
└── README.md
```

---

## ⚙️ Cara Instalasi

### 📌 Prasyarat

Pastikan sudah menginstall:

- Node.js v18+
- npm / yarn
- MongoDB (local atau MongoDB Atlas)

---

## 🔧 Setup Backend

1️⃣ Masuk ke folder server

```bash
cd server
```

2️⃣ Install dependencies

```bash
npm install
```

3️⃣ Buat file `.env`

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4️⃣ Jalankan server

```bash
npm run dev
```

Server berjalan di:

```
http://localhost:5000
```

---

## 🎨 Setup Frontend

1️⃣ Masuk ke folder client

```bash
cd client
```

2️⃣ Install dependencies

```bash
npm install
```

3️⃣ Jalankan aplikasi

```bash
npm run dev
```

Frontend biasanya berjalan di:

```
http://localhost:5173
```

---

## 🧪 Contoh Penggunaan

1. Buka aplikasi di browser
2. Register akun baru
3. Login
4. Tambahkan catatan baru
5. Edit atau hapus catatan
6. Data tersimpan di MongoDB melalui API backend

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Lucide Icons

### 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS

---

## 🔐 Fitur Keamanan

- Password di-hash menggunakan bcrypt
- Autentikasi menggunakan JWT
- Protected routes
- User-specific notes isolation

---

## 📄 License

This project is licensed under the MIT License.

---

