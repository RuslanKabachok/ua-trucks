# 🚛 UA Trucks — Fleet Management Platform

A modern web application for managing a fleet of trucks. Built as a frontend technical assessment with full redesign from scratch.

![Preview](https://img.shields.io/badge/status-in%20progress-blue?style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=flat-square&logo=tailwindcss)

---

## ✨ Features

- 📋 **Vehicle Table** — sortable by all fields (plate, brand, model, year, color)
- 🔍 **Detail Page** — unified vehicle profile with 6 tabs
- 🌙 **Dark Mode** — full light/dark theme toggle
- 📄 **Document Management** — add & remove documents with expiry status via modal
- 🖼️ **Gallery** — drag & drop image reordering + file upload
- 🗑️ **Confirm Modal** — safe deletion with confirmation dialog
- ⚡ **Status Indicators** — active / repair / inactive with live stats

---

## 🗂️ Tabs on Vehicle Detail Page

| Tab        | Description                             |
| ---------- | --------------------------------------- |
| Інформація | VIN, euro norm, basic specs             |
| Документи  | L-Paket, Insurance with expiry tracking |
| Галерея    | Drag & drop photo management            |
| Історія    | Timeline of vehicle events              |
| Контакти   | Responsible persons                     |
| Нотатки    | Free-form notes                         |

---

## 🛠️ Tech Stack

| Technology            | Purpose          |
| --------------------- | ---------------- |
| React 19 + TypeScript | UI framework     |
| Vite 8                | Build tool       |
| Tailwind CSS v4       | Styling          |
| shadcn/ui (Radix)     | UI components    |
| Redux Toolkit         | State management |
| dnd-kit               | Drag & drop      |
| React Router v7       | Routing          |
| Lucide React          | Icons            |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/RuslanKabachok/ua-trucks.git
cd ua-trucks

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── app/              # Redux store
├── components/
│   ├── modals/       # ConfirmModal, DocumentModal
│   └── vehicles/     # GalleryTab
├── features/
│   └── vehicles/     # Redux slice, mock data, types
├── hooks/            # useDarkMode
├── pages/            # VehiclesPage, VehicleDetails
└── lib/              # utils
```

---

## 📸 Screenshots

> Vehicle list with sorting and status indicators

> Vehicle detail page with tabs and dark mode

---

## 🎯 Design Decisions

- **Full redesign** — not an improvement of the original UI, but a complete rethink with modern aesthetics
- **Component-based architecture** — each tab is an isolated component
- **Redux for global state** — all vehicle data (including gallery, documents) lives in the store so changes persist across navigation
- **dnd-kit over react-beautiful-dnd** — better React 18+ support and accessibility
- **Tailwind v4** — new CSS-first config, faster builds
