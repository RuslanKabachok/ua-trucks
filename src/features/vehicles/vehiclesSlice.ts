import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { mockVehicles, type Document, type Vehicle } from './mockData'

interface AddDocumentPayload {
    vehicleId: number
    document: Document
}

interface RemoveDocumentPayload {
    vehicleId: number
    documentId: string
}

interface UpdateGalleryPayload {
    vehicleId: number
    gallery: string[]
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
        updateGallery(state, action: PayloadAction<UpdateGalleryPayload>) {
            const vehicle = state.vehicles.find((v) => v.id === action.payload.vehicleId)
            if (vehicle) vehicle.gallery = action.payload.gallery
        },
        addVehicle(state, action: PayloadAction<Vehicle>) {
            state.vehicles.push(action.payload)
        },
        removeVehicle(state, action: PayloadAction<number>) {
            state.vehicles = state.vehicles.filter((v) => v.id !== action.payload)
        },
        updateNotes(state, action: PayloadAction<{ vehicleId: number; notes: string }>) {
            const vehicle = state.vehicles.find((v) => v.id === action.payload.vehicleId)
            if (vehicle) vehicle.notes = action.payload.notes
        },
    },
})

export const {
    addDocument,
    removeDocument,
    updateGallery,
    addVehicle,
    removeVehicle,
    updateNotes,
} = vehiclesSlice.actions
export default vehiclesSlice.reducer
