"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl"

interface TransformedLocation {
    lat: number;
    lng: number;
    name: string;
    country: string;
}

export default function GlobePage() {
    const globeRef = useRef<GlobeMethods | undefined>(undefined);
    const [visitedCountries, setVisitedCountries] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [locations, setLocations] = useState<TransformedLocation>();

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch("/api/trips");
                const data = await response.json();
                setLocations(data)
                const countries = new Set<string>(
                    data.map((loc: TransformedLocation) => loc.country)
                )

                setVisitedCountries(countries);
            } catch (err) {
                console.log("error", err)
            } finally {
                setIsLoading(false);
            }
        }

        fetchLocations()
    }, [])

    useEffect(() => {
        if (globeRef.current) {
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 0.5;
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-center text-4xl font-bold mb-12">
                        Tu travesía
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-5">
                                <h2 className="text-2xl font-semibold mb-4">País(es) en tus destinos...</h2>
                                <div className="h-[600px] w-full relative flex justify-center">
                                    {
                                        isLoading ? (
                                            <div className="flex items-center justify-center h-full">
                                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                                            </div>
                                        ) : <Globe
                                            ref={globeRef}
                                            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg" // Part of the URL is cut off but this is a common default
                                            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png" // Part of the URL is cut off
                                            backgroundColor="rgba(0,0,0,0)"
                                            pointColor={() => "#FF5733"}
                                            pointLabel="name"
                                            pointsData={locations}
                                            pointRadius={0.5}
                                            pointAltitude={0.1}
                                            pointsMerge={true}
                                            width={800}
                                            height={600}

                                        />
                                    }
                                </div>
                            </div>

                        </div>
                        <Card>
                            <CardHeader>
                            </CardHeader>
                            <CardContent>
                                {
                                    isLoading ? (
                                        <div className="flex items-center justify-center h-full">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <p className="text-sm text-blue-800">
                                                    Tiene un total de
                                                    <span className="font-bold"> {visitedCountries.size} </span>
                                                    país(es)
                                                </p>
                                            </div>
                                            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                                                {Array.from(visitedCountries).sort().map((country, key) => (
                                                    <div
                                                        key={key}
                                                        className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-color border border-gray-100"
                                                    >
                                                        <MapPin className="h-4 w-4 text-red-500" />
                                                        <span>{country}</span>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    )
                                }
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}