import { AlertTriangle, X } from 'lucide-react'

interface Props {
    title: string
    description: string
    confirmLabel?: string
    onConfirm: () => void
    onClose: () => void
}

export default function ConfirmModal({
    title,
    description,
    confirmLabel = 'Видалити',
    onConfirm,
    onClose,
}: Props) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm overflow-hidden bg-white border shadow-2xl dark:bg-slate-900 rounded-2xl border-slate-200 dark:border-slate-800"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950">
                            <AlertTriangle size={16} className="text-red-500" />
                        </div>
                        <h2 className="text-base font-bold">{title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center w-8 h-8 transition rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                    <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm transition text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    >
                        Скасувати
                    </button>
                    <button
                        onClick={() => {
                            onConfirm()
                            onClose()
                        }}
                        className="px-4 py-2 text-sm font-semibold text-white transition bg-red-500 hover:bg-red-600 rounded-xl"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}
