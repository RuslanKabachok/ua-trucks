import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { useState } from 'react'
import {
    ArrowLeft,
    Truck,
    Moon,
    Sun,
    FileText,
    Images,
    Info,
    History,
    Users,
    StickyNote,
    Circle,
    AlertTriangle,
    Plus,
} from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'
import type { Vehicle } from '../features/vehicles/mockData'
import DocumentModal from '../components/modals/DocumentModal'

type Tab = 'info' | 'documents' | 'gallery' | 'history' | 'contacts' | 'notes'

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'info', label: 'Інформація', icon: <Info size={15} /> },
    { id: 'documents', label: 'Документи', icon: <FileText size={15} /> },
    { id: 'gallery', label: 'Галерея', icon: <Images size={15} /> },
    { id: 'history', label: 'Історія', icon: <History size={15} /> },
    { id: 'contacts', label: 'Контакти', icon: <Users size={15} /> },
    { id: 'notes', label: 'Нотатки', icon: <StickyNote size={15} /> },
]

const statusConfig = {
    active: {
        label: 'Активний',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50 dark:bg-emerald-950',
    },
    repair: { label: 'Ремонт', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950' },
    inactive: {
        label: 'Неактивний',
        color: 'text-slate-400',
        bg: 'bg-slate-100 dark:bg-slate-800',
    },
}

// ─── TAB COMPONENTS ───────────────────────────────────────────────

function InfoTab({ v }: { v: Vehicle }) {
    const fields = [
        { label: 'Номер', value: v.plate },
        { label: 'Марка', value: v.brand },
        { label: 'Модель', value: v.model },
        { label: 'Рік', value: v.year },
        { label: 'Колір', value: v.color },
        { label: 'VIN', value: v.vin },
        { label: 'Євро норма', value: v.euro },
    ]
    return (
        <div className="grid grid-cols-2 gap-3">
            {fields.map(({ label, value }) => (
                <div
                    key={label}
                    className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-5 py-4"
                >
                    <p className="text-xs text-slate-400 mb-1">{label}</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{value}</p>
                </div>
            ))}
        </div>
    )
}

function DocumentsTab({ v }: { v: Vehicle }) {
    if (v.documents.length === 0) return <Empty text="Документи відсутні" />

    return (
        <div className="space-y-3">
            {v.documents.map((doc) => (
                <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-5 py-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <FileText size={16} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">{doc.name}</p>
                            <p className="text-xs text-slate-400">
                                {doc.dateFrom} — {doc.dateTo}
                            </p>
                        </div>
                    </div>
                    {doc.isExpired ? (
                        <span className="flex items-center gap-1 text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-950 px-3 py-1 rounded-full">
                            <AlertTriangle size={11} /> Прострочено
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">
                            <Circle size={6} fill="currentColor" /> Активний
                        </span>
                    )}
                </div>
            ))}
        </div>
    )
}

function GalleryTab({ v }: { v: Vehicle }) {
    if (v.gallery.length === 0) return <Empty text="Фото відсутні" />

    return (
        <div className="grid grid-cols-3 gap-3">
            {v.gallery.map((url, i) => (
                <img key={i} src={url} alt="" className="rounded-xl object-cover w-full h-40" />
            ))}
        </div>
    )
}

function HistoryTab({ v }: { v: Vehicle }) {
    if (v.history.length === 0) return <Empty text="Історія відсутня" />

    return (
        <div className="space-y-1">
            {v.history.map((entry, i) => (
                <div key={entry.id} className="flex gap-4 py-4">
                    <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5" />
                        {i < v.history.length - 1 && (
                            <div className="w-px flex-1 bg-slate-200 dark:bg-slate-700 mt-1" />
                        )}
                    </div>
                    <div className="pb-2">
                        <p className="text-xs text-slate-400 mb-0.5">{entry.date}</p>
                        <p className="font-semibold text-sm">{entry.action}</p>
                        <p className="text-xs text-slate-500">
                            {entry.details} · {entry.user}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

function ContactsTab({ v }: { v: Vehicle }) {
    if (v.contacts.length === 0) return <Empty text="Контакти відсутні" />

    return (
        <div className="space-y-3">
            {v.contacts.map((c) => (
                <div
                    key={c.id}
                    className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-5 py-4"
                >
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {c.name[0]}
                    </div>
                    <div>
                        <p className="font-semibold text-sm">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.role}</p>
                        {c.phone && <p className="text-xs text-slate-500">{c.phone}</p>}
                    </div>
                </div>
            ))}
        </div>
    )
}

function NotesTab({ v }: { v: Vehicle }) {
    return (
        <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-5">
            {v.notes ? (
                <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                    {v.notes}
                </p>
            ) : (
                <p className="text-sm text-slate-400">Нотатки відсутні</p>
            )}
        </div>
    )
}

function Empty({ text }: { text: string }) {
    return (
        <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-700 py-16 flex items-center justify-center">
            <p className="text-sm text-slate-400">{text}</p>
        </div>
    )
}

// ─── MAIN ─────────────────────────────────────────────────────────

export default function VehicleDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { isDark, toggleTheme } = useDarkMode()
    const vehicles = useSelector((state: RootState) => state.vehicles.vehicles)
    const [activeTab, setActiveTab] = useState<Tab>('info')
    const [showDocModal, setShowDocModal] = useState(false)

    const vehicle = vehicles.find((v) => v.id === Number(id))
    if (!vehicle) return <div className="p-10 text-slate-400">Транспортний засіб не знайдено</div>

    const cfg = statusConfig[vehicle.status]

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Top bar */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                        <Truck size={18} className="text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">UA Trucks</span>
                </div>
                <button
                    onClick={toggleTheme}
                    className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
            </header>

            <main className="max-w-4xl mx-auto px-8 py-10">
                {/* Back */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 mb-8 transition"
                >
                    <ArrowLeft size={16} /> Назад до списку
                </button>

                {/* Vehicle card header */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 mb-6 flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                        <Truck size={36} className="text-slate-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold">
                                {vehicle.brand} {vehicle.model}
                            </h1>
                            <span
                                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${cfg.bg} ${cfg.color}`}
                            >
                                <Circle size={6} fill="currentColor" />
                                {cfg.label}
                            </span>
                        </div>
                        <p className="font-mono text-slate-400 text-sm">{vehicle.plate}</p>
                    </div>
                    <div className="text-right text-sm text-slate-400">
                        <p>{vehicle.year}</p>
                        <p>{vehicle.euro}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-lg transition
                ${
                    activeTab === tab.id
                        ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }
              `}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                <div>
                    {activeTab === 'info' && <InfoTab v={vehicle} />}
                    {activeTab === 'documents' && (
                        <div className="space-y-4">
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setShowDocModal(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition"
                                >
                                    <Plus size={15} /> Керувати документами
                                </button>
                            </div>
                            <DocumentsTab v={vehicle} />
                        </div>
                    )}

                    {/* модал — поза табами, перед закриттям </div> main */}
                    {showDocModal && (
                        <DocumentModal vehicle={vehicle} onClose={() => setShowDocModal(false)} />
                    )}
                    {activeTab === 'gallery' && <GalleryTab v={vehicle} />}
                    {activeTab === 'history' && <HistoryTab v={vehicle} />}
                    {activeTab === 'contacts' && <ContactsTab v={vehicle} />}
                    {activeTab === 'notes' && <NotesTab v={vehicle} />}
                </div>
            </main>
        </div>
    )
}
