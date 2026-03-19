import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2, ImagePlus } from 'lucide-react'
import { updateGallery } from '../../features/vehicles/vehiclesSlice'
import type { Vehicle } from '../../features/vehicles/mockData'

// ─── Sortable Item ────────────────────────────────────────────────

interface SortableImageProps {
    id: string
    url: string
    onRemove: (id: string) => void
}

function SortableImage({ id, url, onRemove }: SortableImageProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="relative overflow-hidden border group rounded-xl border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
        >
            <img src={url} alt="" className="object-cover w-full h-40" />

            {/* Drag handle */}
            <button
                {...attributes}
                {...listeners}
                className="absolute flex items-center justify-center text-white transition rounded-lg opacity-0 top-2 left-2 w-7 h-7 bg-black/40 group-hover:opacity-100 cursor-grab active:cursor-grabbing"
            >
                <GripVertical size={14} />
            </button>

            {/* Remove button */}
            <button
                onClick={() => onRemove(id)}
                className="absolute flex items-center justify-center text-white transition rounded-lg opacity-0 top-2 right-2 w-7 h-7 bg-black/40 group-hover:opacity-100 hover:bg-red-500"
            >
                <Trash2 size={14} />
            </button>
        </div>
    )
}

// ─── Upload Zone ──────────────────────────────────────────────────

interface UploadZoneProps {
    onUpload: (urls: string[]) => void
}

function UploadZone({ onUpload }: UploadZoneProps) {
    const [isDragOver, setIsDragOver] = useState(false)

    const readFiles = (files: FileList) => {
        Array.from(files).forEach((file) => {
            if (!file.type.startsWith('image/')) return
            const reader = new FileReader()
            reader.onload = (e) => {
                if (e.target?.result) onUpload([e.target.result as string])
            }
            reader.readAsDataURL(file)
        })
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
        readFiles(e.dataTransfer.files)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) readFiles(e.target.files)
    }

    return (
        <label
            onDragOver={(e) => {
                e.preventDefault()
                setIsDragOver(true)
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={`
        flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed h-40 cursor-pointer transition
        ${
            isDragOver
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
        }
      `}
        >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800">
                <ImagePlus size={20} className="text-slate-400" />
            </div>
            <p className="text-xs text-center text-slate-400">
                Перетягніть фото або{' '}
                <span className="font-semibold text-blue-500">оберіть файл</span>
            </p>
            <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleChange}
            />
        </label>
    )
}

// ─── Main Gallery Tab ─────────────────────────────────────────────

interface Props {
    vehicle: Vehicle
}

export default function GalleryTab({ vehicle }: Props) {
    const dispatch = useDispatch()

    // Use URLs as IDs for dnd-kit (base64 or url string)
    const items = vehicle.gallery

    const sensors = useSensors(useSensor(PointerSensor))

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over.id as string)
        const newGallery = arrayMove(items, oldIndex, newIndex)

        dispatch(updateGallery({ vehicleId: vehicle.id, gallery: newGallery }))
    }

    const handleUpload = (newUrls: string[]) => {
        dispatch(updateGallery({ vehicleId: vehicle.id, gallery: [...items, ...newUrls] }))
    }

    const handleRemove = (url: string) => {
        dispatch(
            updateGallery({
                vehicleId: vehicle.id,
                gallery: items.filter((u) => u !== url),
            })
        )
    }

    return (
        <div className="space-y-4">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={items} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-3 gap-3">
                        {items.map((url) => (
                            <SortableImage key={url} id={url} url={url} onRemove={handleRemove} />
                        ))}
                        <UploadZone onUpload={handleUpload} />
                    </div>
                </SortableContext>
            </DndContext>

            {items.length > 0 && (
                <p className="text-xs text-center text-slate-400">
                    Перетягуйте фото щоб змінити порядок
                </p>
            )}
        </div>
    )
}
