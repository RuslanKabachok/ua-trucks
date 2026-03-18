import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { X, FileText, AlertTriangle, Circle, Trash2, Plus } from 'lucide-react'
import { addDocument, removeDocument } from '../../features/vehicles/vehiclesSlice'
import type { Document, Vehicle } from '../../features/vehicles/mockData'

interface Props {
    vehicle: Vehicle
    onClose: () => void
}

type Mode = 'list' | 'add'

function generateId() {
    return Math.random().toString(36).slice(2, 9)
}

export default function DocumentModal({ vehicle, onClose }: Props) {
    const dispatch = useDispatch()
    const [mode, setMode] = useState<Mode>('list')

    // form state
    const [name, setName] = useState('')
    const [type, setType] = useState<Document['type']>('L-Paket')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')

    const handleAdd = () => {
        if (!name || !dateFrom || !dateTo) return

        const doc: Document = {
            id: generateId(),
            name,
            type,
            dateFrom,
            dateTo,
            isExpired: new Date(dateTo) < new Date(),
        }

        dispatch(addDocument({ vehicleId: vehicle.id, document: doc }))
        setMode('list')
        setName('')
        setDateFrom('')
        setDateTo('')
    }

    const handleRemove = (docId: string) => {
        dispatch(removeDocument({ vehicleId: vehicle.id, documentId: docId }))
    }

    return (
        // Backdrop
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Modal */}
            <div
                className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                    <div>
                        <h2 className="font-bold text-lg">Документи</h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {vehicle.plate} · {vehicle.brand} {vehicle.model}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
                    {mode === 'list' && (
                        <>
                            {vehicle.documents.length === 0 ? (
                                <p className="text-sm text-slate-400 text-center py-8">
                                    Документи відсутні
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {vehicle.documents.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-4 py-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                                    <FileText
                                                        size={15}
                                                        className="text-blue-600 dark:text-blue-400"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm">
                                                        {doc.name}
                                                    </p>
                                                    <p className="text-xs text-slate-400">
                                                        {doc.dateFrom} — {doc.dateTo}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {doc.isExpired ? (
                                                    <span className="flex items-center gap-1 text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-950 px-2 py-1 rounded-full">
                                                        <AlertTriangle size={10} /> Прострочено
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-1 rounded-full">
                                                        <Circle size={5} fill="currentColor" />{' '}
                                                        Активний
                                                    </span>
                                                )}
                                                <button
                                                    onClick={() => handleRemove(doc.id)}
                                                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-500 transition"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {mode === 'add' && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
                                    Назва документу
                                </label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Напр. Polisa Ubezpieczeniowa"
                                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
                                    Тип
                                </label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value as Document['type'])}
                                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="L-Paket">L-Paket</option>
                                    <option value="Insurance">Insurance</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
                                        Дата початку
                                    </label>
                                    <input
                                        type="date"
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
                                        Дата закінчення
                                    </label>
                                    <input
                                        type="date"
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                    {mode === 'list' ? (
                        <>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition"
                            >
                                Закрити
                            </button>
                            <button
                                onClick={() => setMode('add')}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition"
                            >
                                <Plus size={15} /> Додати документ
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setMode('list')}
                                className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition"
                            >
                                ← Назад
                            </button>
                            <button
                                onClick={handleAdd}
                                disabled={!name || !dateFrom || !dateTo}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition"
                            >
                                Зберегти
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
