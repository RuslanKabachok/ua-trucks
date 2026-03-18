import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { mockVehicles, type Document } from './mockData'

interface AddDocumentPayload {
    vehicleId: number
    document: Document
}

interface RemoveDocumentPayload {
    vehicleId: number
    documentId: string
}

const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState: {
        vehicles: mockVehicles,
    },
    reducers: {
        addDocument(state, action: PayloadAction<AddDocumentPayload>) {
            const vehicle = state.vehicles.find((v) => v.id === action.payload.vehicleId)
            if (vehicle) vehicle.documents.push(action.payload.document)
        },
        removeDocument(state, action: PayloadAction<RemoveDocumentPayload>) {
            const vehicle = state.vehicles.find((v) => v.id === action.payload.vehicleId)
            if (vehicle) {
                vehicle.documents = vehicle.documents.filter(
                    (d) => d.id !== action.payload.documentId
                )
            }
        },
    },
})

export const { addDocument, removeDocument } = vehiclesSlice.actions
export default vehiclesSlice.reducer
