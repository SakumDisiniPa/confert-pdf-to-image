# 📸 PDF to Image Converter

A powerful, privacy-focused tool to convert your PDF files into high-quality images (PNG, JPG, TIFF, BMP) — locally, quickly, and for free.

---

## 🚀 Key Features

- 🔍 **High-Quality Conversion**  
  Atur DPI hingga 600 untuk hasil maksimal tanpa kehilangan detail.

- 📁 **Batch Processing**  
  Konversi banyak PDF sekaligus. File hasil dikompresi dalam ZIP otomatis.

- ⚡ **Fast Processing**  
  Mesin konversi cepat berbasis Python & Vite — tanpa kompromi kualitas.

- 💸 **100% Gratis**  
  Tidak ada biaya tersembunyi atau limit. Bebas pakai selamanya.

- 📦 **Ukuran File Optimal**  
  Hasil gambar tajam dengan ukuran file yang efisien.

- 🧠 **Multi Format Output**  
  Dukungan ke PNG, JPG, WEBP, BMP, dan TIFF.

- 🔐 **Privasi Terjaga**  
  File tidak dikirim ke server. Semua proses terjadi di lokal.

- 🖱️ **Drag & Drop Simplicity**  
  Unggah PDF cukup dengan drag & drop atau klik tombol pilih file.

---

## 🖥️ Tech Stack

- ⚙️ **Frontend**: React + Vite + TailwindCSS 
- 🐍 **Backend**: Python + FlaskAPI + pdf2image + Pillow
- 🗜️ **Converter Engine**: Poppler (backend dependency)

---

## 🗂️ Project Structure

```

confert-pdf-to-image/
├── frontend/          # React + Vite + Tailwind
│   └── src/           # Komponen UI (Converter UI, Input, Slider, dsb)
├── backend/           # FastAPI backend untuk konversi
│   ├── app.py         # FlaskAPI entry point
│   └── uploads/       # Temp folder untuk file user

````

---

## ⚙️ Installation Guide

### ✅ Prasyarat
- [Node.js](https://nodejs.org/) v18+
- [Python](https://www.python.org/) v3.8+
- Linux/macOS/WSL disarankan
- Poppler (untuk backend converter)

---

### 🔧 Setup Backend (FlaskAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate      # atau venv\\Scripts\\activate di Windows
pip install -r requirements.txt
# (jika belum buat, install secara manual:)

# Install Poppler (Ubuntu/Debian):
sudo apt install poppler-utils

# Jalankan server
python3 app.py
````

---

### 💻 Setup Frontend (Vite + React)

```bash
cd frontend
npm install
npm run dev
```

---

## 📷 Preview

![Preview UI](https://i.ibb.co/S7sYs8QH/Screenshot-from-2025-07-05-21-29-09.png)


## 🤝 Kontribusi

Pull Request sangat terbuka!
Jika kamu ingin membantu memperluas fitur (misal: compress JPG, tambahkan OCR, atau drag preview), silakan fork dan kirim PR.

---

## 📄 Lisensi

MIT License — bebas digunakan dan dimodifikasi, mohon tetap mencantumkan atribusi.

---

## 👤 Developer

**Sakum Tala**
🛠️ Full-Stack Developer
🔗 [GitHub](https://github.com/SakumDisiniPa) | [LinkedIn](https://www.linkedin.com/in/sakum-tala-6b304a348/)

---

> ⭐ *Made with Vite, Python & ❤️ — by @SakumDisiniPa*
