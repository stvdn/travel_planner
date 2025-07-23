"use client";

import { Location, Trip } from "@/app/generated/prisma";
import Image from "next/image";
import { Calendar, MapPin, Plus } from 'lucide-react';
import { Button } from "./ui/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/Tabs";
import Link from "next/link";
import Map from "./Map";
import SortableItinerary from "./SortableItinerary";

type TripLocation = Trip & {
    locations: Location[];
}

interface TripDetailClientProps {
    trip: TripLocation;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8">

            {trip.imageUrl && (
                <div className="w-full -72 md:h-96 overflow-hidden rounded-xl shadow-lg relative">
                    <Image
                        src={trip.imageUrl}
                        alt={trip.title}
                        className="object-cover"
                        fill
                        priority
                    />
                </div>
            )}
            <div className="bg-white p-6 shadow rounded-lg flex flex-co md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        {trip.title}
                    </h1>
                    <div className="flex items-center text-gray-500 mt-2">
                        <Calendar className="h5 w-5 mr-2" />
                        <span className="text-lg`">
                            {trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}
                        </span>
                    </div>
                </div>
                <div className="mt-4 md:mt-0">
                    <Link href={`/trips/${trip.id}/itinerary/new`}>
                        <Button>
                            <Plus className="mr-2 h-5 w-5" /> Agregar destino
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="bg-white p-6 shadow rounded-lg">
                <Tabs defaultValue="overview">
                    <TabsList className="mb-6">
                        <TabsTrigger value="overview" className="text-lg">
                            General
                        </TabsTrigger>
                        <TabsTrigger value="itinerary" className="text-lg">
                            Itinerario
                        </TabsTrigger>
                        <TabsTrigger value="map" className="text-lg">
                            Mapa
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">
                                    Resumen Viaje
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-gray-600 leading-relaxed">
                                            {trip.description}
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <Calendar className="h-6 w-6 mr-4 text-gray-500" />
                                        <div>
                                            <p className="font-medium text-gray-700">Fechas</p>
                                            <p className="text-sm text-gray-500">
                                                {trip.startDate.toLocaleDateString() + " - " + trip.endDate.toLocaleDateString()}
                                                <br />
                                                {`${Math.round(
                                                    (trip.endDate.getTime() - trip.startDate.getTime()) /
                                                    (1000 * 60 * 60 * 24)
                                                )} día(s)`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="h-6 w-6 mr-3 text-gray-500" />
                                        <div>
                                            <p>Destions</p>
                                            <p>{trip.locations.length} destino(s) agregado(s)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-72 rounded-lg overflow-hidden shadow">
                                <Map itineraries={trip.locations} />
                            </div>
                            {trip.locations.length === 0 && (
                                <div className="text-center p-4 col-span-2 ">
                                    <p>Agrega un destino para verlo en el mapa.</p>
                                    <Link href={`/trips/${trip.id}/itinerary/new`}>
                                        <Button className="mt-4">
                                            <Plus className="mr-2 h-5 w-5" /> Agregar destino
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="itinerary" className="space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">Detalles Itinerario</h2>
                        </div>
                        {trip.locations.length === 0 ? (
                            <div className="text-center p-4 col-span-2 ">
                                <p>Agrega un destino para verlo en el itinerario.</p>
                                <Link href={`/trips/${trip.id}/itinerary/new`}>
                                    <Button className="mt-4">
                                        <Plus className="mr-2 h-5 w-5" /> Agregar destino
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <SortableItinerary locations={trip.locations} tripId={trip.id} />
                        )}
                    </TabsContent>

                    <TabsContent value="map" className="space-y-6">
                        <div className="h-72 rounded-lg overflow-hidden shadow">
                            <Map itineraries={trip.locations} />
                        </div>
                        {trip.locations.length === 0 && (
                            <div className="text-center p-4 col-span-2 ">
                                <p>Agrega un destino para verlo en el mapa.</p>
                                <Link href={`/trips/${trip.id}/itinerary/new`}>
                                    <Button className="mt-4">
                                        <Plus className="mr-2 h-5 w-5" /> Agregar destino
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
            <div className="text-center">
                <Link href={`/trips`}>
                    <Button className="mt-4">
                        Ver Viajes
                    </Button>
                </Link>
            </div>
        </div>
    )
} 