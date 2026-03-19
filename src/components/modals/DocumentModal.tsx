import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { X, FileText, AlertTriangle, Circle, Trash2, Plus } from 'lucide-react'
import { addDocument, removeDocument } from '../../features/vehicles/vehiclesSlice'
import type { Document, Vehicle } from '../../features/vehicles/mockData'
import ConfirmModal from './ConfirmModal'

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
    const [confirmId, setConfirmId] = useState<string | null>(null)

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
                className="w-full max-w-lg overflow-hidden bg-white border shadow-2xl dark:bg-slate-900 rounded-2xl border-slate-200 dark:border-slate-800"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                    <div>
                        <h2 className="text-lg font-bold">Документи</h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {vehicle.plate} · {vehicle.brand} {vehicle.model}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center w-8 h-8 transition rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
                    {mode === 'list' && (
                        <>
                            {vehicle.documents.length === 0 ? (
                                <p className="py-8 text-sm text-center text-slate-400">
                                    Документи відсутні
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {vehicle.documents.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="flex items-center justify-between px-4 py-3 border rounded-xl border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center justify-center bg-blue-100 rounded-lg w-9 h-9 dark:bg-blue-900">
                                                    <FileText
                                                        size={15}
                                                        className="text-blue-600 dark:text-blue-400"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold">
                                                        {doc.name}
                                                    </p>
                                                    <p className="text-xs text-slate-400">
                                                        {doc.dateFrom} — {doc.dateTo}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {doc.isExpired ? (
                                                    <span className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-red-500 rounded-full bg-red-50 dark:bg-red-950">
                                                        <AlertTriangle size={10} /> Прострочено
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full text-emerald-600 bg-emerald-50 dark:bg-emerald-950">
                                                        <Circle size={5} fill="currentColor" />{' '}
                                                        Активний
                                                    </span>
                                                )}
                                                <button
                                                    onClick={() => setConfirmId(doc.id)}
                                                    className="flex items-center justify-center transition rounded-lg w-7 h-7 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-500"
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
                <div className="flex justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800">
                    {mode === 'list' ? (
                        <>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm transition text-slate-500 hover:text-slate-700"
                            >
                                Закрити
                            </button>
                            <button
                                onClick={() => setMode('add')}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition bg-blue-600 hover:bg-blue-700 rounded-xl"
                            >
                                <Plus size={15} /> Додати документ
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setMode('list')}
                                className="px-4 py-2 text-sm transition text-slate-500 hover:text-slate-700"
                            >
                                ← Назад
                            </button>
                            <button
                                onClick={handleAdd}
                                disabled={!name || !dateFrom || !dateTo}
                                className="px-4 py-2 text-sm font-semibold text-white transition bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl"
                            >
                                Зберегти
                            </button>
                        </>
                    )}
                </div>
            </div>
            {confirmId && (
                <ConfirmModal
                    title="Видалити документ?"
                    description="Цю дію неможливо скасувати. Документ буде видалено назавжди."
                    onConfirm={() => handleRemove(confirmId)}
                    onClose={() => setConfirmId(null)}
                />
            )}
        </div>
    )
}
