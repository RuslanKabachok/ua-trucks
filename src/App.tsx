import { Routes, Route } from 'react-router-dom'
import VehiclesPage from './pages/VehiclesPage'
import VehicleDetails from './pages/VehicleDetails'

export default function App() {
    return (
        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
            <Routes>
                <Route path="/" element={<VehiclesPage />} />
                <Route path="/vehicle/:id" element={<VehicleDetails />} />
            </Routes>
        </div>
    )
}
