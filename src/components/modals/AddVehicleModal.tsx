import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { X, Truck } from 'lucide-react'
import { addVehicle } from '../../features/vehicles/vehiclesSlice'
import type { Vehicle, VehicleStatus } from '../../features/vehicles/mockData'

interface Props {
    onClose: () => void
}

function generateId() {
    return Math.floor(Math.random() * 100000)
}

const statusOptions: { value: VehicleStatus; label: string }[] = [
    { value: 'active', label: 'Активний' },
    { value: 'repair', label: 'Ремонт' },
    { value: 'inactive', label: 'Неактивний' },
]

export default function AddVehicleModal({ onClose }: Props) {
    const dispatch = useDispatch()

    const [plate, setPlate] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [color, setColor] = useState('')
    const [vin, setVin] = useState('')
    const [euro, setEuro] = useState('Euro 6')
    const [status, setStatus] = useState<VehicleStatus>('active')

    const isValid = plate && brand && model && year && color

    const handleSubmit = () => {
        if (!isValid) return

        const vehicle: Vehicle = {
            id: generateId(),
            plate,
            brand,
            model,
            year: Number(year),
            color,
            vin,
            euro,
            status,
            documents: [],
            gallery: [],
            history: [
                {
                    id: Math.random().toString(36).slice(2),
                    date: new Date().toLocaleDateString('uk-UA'),
                    action: 'Транспортний засіб додано',
                    details: plate,
                    user: 'Користувач',
                },
            ],
            contacts: [],
            notes: '',
        }

        dispatch(addVehicle(vehicle))
        onClose()
    }

    const fields = [
        { label: 'Номер *', value: plate, set: setPlate, placeholder: 'AA 34 BB' },
        { label: 'Марка *', value: brand, set: setBrand, placeholder: 'Volvo' },
        { label: 'Модель *', value: model, set: setModel, placeholder: 'FH 16' },
        { label: 'Рік *', value: year, set: setYear, placeholder: '2023', type: 'number' },
        { label: 'Колір *', value: color, set: setColor, placeholder: 'White' },
        { label: 'VIN', value: vin, set: setVin, placeholder: 'YV2A2245XCB...' },
    ]

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg overflow-hidden bg-white border shadow-2xl dark:bg-slate-900 rounded-2xl border-slate-200 dark:border-slate-800"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center bg-blue-600 w-9 h-9 rounded-xl">
                            <Truck size={16} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold">Новий транспортний засіб</h2>
                            <p className="text-xs text-slate-400">Заповніть основні дані</p>
                        </div>
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
                    <div className="grid grid-cols-2 gap-4">
                        {fields.map(({ label, value, set, placeholder, type }) => (
                            <div key={label}>
                                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
                                    {label}
                                </label>
                                <input
                                    type={type ?? 'text'}
                                    value={value}
                                    onChange={(e) => set(e.target.value)}
                                    placeholder={placeholder}
                                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>
                        ))}

                        {/* Euro */}
                        <div>
                            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
                                Євро норма
                            </label>
                            <select
                                value={euro}
                                onChange={(e) => setEuro(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
                            >
                                {['Euro 3', 'Euro 4', 'Euro 5', 'Euro 6'].map((e) => (
                                    <option key={e} value={e}>
                                        {e}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
                                Статус
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as VehicleStatus)}
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
                            >
                                {statusOptions.map((s) => (
                                    <option key={s.value} value={s.value}>
                                        {s.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-400">* — обов'язкові поля</p>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm transition text-slate-500 hover:text-slate-700"
                        >
                            Скасувати
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!isValid}
                            className="px-5 py-2 text-sm font-semibold text-white transition bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl"
                        >
                            Додати
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
