export type VehicleStatus = 'active' | 'repair' | 'inactive'

export interface Document {
    id: string
    name: string
    type: 'L-Paket' | 'Insurance' | 'Other'
    dateFrom: string
    dateTo: string
    isExpired: boolean
}

export interface HistoryEntry {
    id: string
    date: string
    action: string
    details: string
    user: string
}

export interface Contact {
    id: string
    name: string
    role: string
    phone?: string
    email?: string
}

export interface Vehicle {
    id: number
    plate: string
    brand: string
    model: string
    year: number
    color: string
    vin: string
    euro: string
    status: VehicleStatus
    imageUrl?: string
    documents: Document[]
    gallery: string[]
    history: HistoryEntry[]
    contacts: Contact[]
    notes: string
}

export const mockVehicles: Vehicle[] = [
    {
        id: 1,
        plate: 'AA 34 BB',
        brand: 'Volvo',
        model: 'FH 16',
        year: 2020,
        color: 'White',
        vin: 'YV2A2245XCB123456',
        euro: 'Euro 6',
        status: 'active',
        documents: [
            {
                id: 'd1',
                name: 'L-Paket',
                type: 'L-Paket',
                dateFrom: '01.01.2025',
                dateTo: '01.01.2026',
                isExpired: false,
            },
            {
                id: 'd2',
                name: 'Polisa Ubezpieczeniowa',
                type: 'Insurance',
                dateFrom: '09.03.2025',
                dateTo: '10.02.2026',
                isExpired: true,
            },
        ],
        gallery: [],
        history: [
            {
                id: 'h1',
                date: '19.01.2026',
                action: 'Тягач додано',
                details: 'AA 34 BB · 97 AA',
                user: 'Іванов І.',
            },
            {
                id: 'h2',
                date: '18.02.2026',
                action: 'Тягач видалено',
                details: 'AA 34 BB · 97 AA',
                user: 'Петренко М.',
            },
        ],
        contacts: [
            {
                id: 'c1',
                name: 'Mario Rossi',
                role: 'Відповідальний',
                phone: '+48 123 456 789',
                email: 'mario@example.com',
            },
        ],
        notes: '',
    },
    {
        id: 2,
        plate: 'KA 55 CC',
        brand: 'Mercedes',
        model: 'Actros',
        year: 2022,
        color: 'Gray',
        vin: 'WDB9634031L234567',
        euro: 'Euro 6',
        status: 'active',
        documents: [],
        gallery: [],
        history: [],
        contacts: [],
        notes: '',
    },
    {
        id: 3,
        plate: 'BC 12 AA',
        brand: 'MAN',
        model: 'TGX',
        year: 2019,
        color: 'Blue',
        vin: 'WMAH06ZZ9KM123456',
        euro: 'Euro 5',
        status: 'repair',
        documents: [],
        gallery: [],
        history: [],
        contacts: [],
        notes: '',
    },
    {
        id: 4,
        plate: 'OA 77 XK',
        brand: 'DAF',
        model: 'XF',
        year: 2021,
        color: 'Red',
        vin: 'XLRTE47MS0E123456',
        euro: 'Euro 6',
        status: 'inactive',
        documents: [],
        gallery: [],
        history: [],
        contacts: [],
        notes: '',
    },
    {
        id: 5,
        plate: 'HA 99 PP',
        brand: 'Scania',
        model: 'R500',
        year: 2023,
        color: 'Black',
        vin: 'YS2R4X20005123456',
        euro: 'Euro 6',
        status: 'active',
        documents: [],
        gallery: [],
        history: [],
        contacts: [],
        notes: '',
    },
]
