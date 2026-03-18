import { useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'
import { ArrowUpDown, ArrowUp, ArrowDown, Truck, Moon, Sun, Circle } from 'lucide-react'
import type { VehicleStatus } from '../features/vehicles/mockData'

type SortField = 'plate' | 'brand' | 'model' | 'year' | 'color'
type SortOrder = 'asc' | 'desc'

const statusConfig: Record<VehicleStatus, { label: string; color: string; bg: string }> = {
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

const columns: { field: SortField; label: string }[] = [
    { field: 'plate', label: 'Номер' },
    { field: 'brand', label: 'Марка' },
    { field: 'model', label: 'Модель' },
    { field: 'year', label: 'Рік' },
    { field: 'color', label: 'Колір' },
]

export default function VehiclesPage() {
    const vehicles = useSelector((state: RootState) => state.vehicles.vehicles)
    const navigate = useNavigate()
    const { isDark, toggleTheme } = useDarkMode()

    const [sortField, setSortField] = useState<SortField>('plate')
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

    const handleSort = (field: SortField) => {
        if (field === sortField) {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
        } else {
            setSortField(field)
            setSortOrder('asc')
        }
    }

    const sorted = [...vehicles].sort((a, b) => {
        const va = a[sortField]
        const vb = b[sortField]
        if (va < vb) return sortOrder === 'asc' ? -1 : 1
        if (va > vb) return sortOrder === 'asc' ? 1 : -1
        return 0
    })

    const SortIcon = ({ field }: { field: SortField }) => {
        if (field !== sortField) return <ArrowUpDown size={14} className="opacity-30" />
        return sortOrder === 'asc' ? (
            <ArrowUp size={14} className="text-blue-500" />
        ) : (
            <ArrowDown size={14} className="text-blue-500" />
        )
    }

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

            <main className="max-w-6xl mx-auto px-8 py-10">
                {/* Page header */}
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <p className="text-sm text-slate-400 mb-1">Fleet management</p>
                        <h1 className="text-3xl font-bold tracking-tight">Транспортні засоби</h1>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {vehicles.length}
                        </span>{' '}
                        одиниць
                    </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {(['active', 'repair', 'inactive'] as VehicleStatus[]).map((s) => {
                        const count = vehicles.filter((v) => v.status === s).length
                        const cfg = statusConfig[s]
                        return (
                            <div
                                key={s}
                                className={`rounded-2xl p-5 ${cfg.bg} border border-transparent`}
                            >
                                <p
                                    className={`text-xs font-semibold uppercase tracking-widest ${cfg.color} mb-1`}
                                >
                                    {cfg.label}
                                </p>
                                <p className="text-3xl font-bold">{count}</p>
                            </div>
                        )
                    })}
                </div>

                {/* Table */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800">
                                {columns.map(({ field, label }) => (
                                    <th
                                        key={field}
                                        onClick={() => handleSort(field)}
                                        className="px-6 py-4 text-left font-medium text-slate-400 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200 transition select-none"
                                    >
                                        <div className="flex items-center gap-2">
                                            {label}
                                            <SortIcon field={field} />
                                        </div>
                                    </th>
                                ))}
                                <th className="px-6 py-4 text-left font-medium text-slate-400">
                                    Статус
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sorted.map((v, i) => {
                                const cfg = statusConfig[v.status]
                                return (
                                    <tr
                                        key={v.id}
                                        onClick={() => navigate(`/vehicle/${v.id}`)}
                                        className={`
                      cursor-pointer transition-colors
                      hover:bg-slate-50 dark:hover:bg-slate-800/60
                      ${i !== sorted.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}
                    `}
                                    >
                                        <td className="px-6 py-4 font-mono font-semibold tracking-wider">
                                            {v.plate}
                                        </td>
                                        <td className="px-6 py-4 font-medium">{v.brand}</td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                            {v.model}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                            {v.year}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                            {v.color}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${cfg.bg} ${cfg.color}`}
                                            >
                                                <Circle size={6} fill="currentColor" />
                                                {cfg.label}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
