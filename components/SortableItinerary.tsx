"use client";

import { Location } from "@/app/generated/prisma";
import { reorderItinerary } from "@/lib/actions/reorder-itinerary";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useId, useState } from "react";

interface SortableItineraryProps {
    tripId: string,
    locations: Location[]
}

function SortableItem({ item }: { item: Location }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className="p-4 border rounded-md flex justify-between items-center hover:shadow transition-shadow"
        >
            <div>
                <h4 className="font-medium text-gray-800">{item.locationTitle}</h4>
                <p className="text-sm text-gray-500 truncate max-w-xs">
                    {`Latitud: ${item.lat}, Longitud: ${item.lng}`}
                </p>
            </div>
            <div className="text-sm-text-gray-600">Día {item.order}</div>
        </div>
    );
}

export default function SortableItinerary({ locations, tripId }: SortableItineraryProps) {
    const dndId = useId();
    const [localLocations, setLocalLocations] = useState(locations);

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = localLocations.findIndex((item) => item.id === active.id);
            const newIndex = localLocations.findIndex((item) => item.id === over!.id);

            const newLocationsOrder = arrayMove(
                localLocations,
                oldIndex,
                newIndex
            ).map((item, index) => ({ ...item, order: index }))

            setLocalLocations(newLocationsOrder);

            await reorderItinerary(tripId, newLocationsOrder.map((item) => item.id))
        }
    };

    return (
        <DndContext
            id={dndId}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={localLocations.map((loc) => loc.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-4">
                    {localLocations.map((item, key) => (
                        <SortableItem key={key} item={item} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    )
}