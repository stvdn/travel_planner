"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { createTrip } from "@/lib/actions/create-trip";
import { UploadButton } from "@/lib/upload-thing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";

export default function NewTrip() {
    const [isPending, startTransition] = useTransition();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    return (
        <div className="max-w-lg mx-auto mt-10">
            <Card>
                <CardHeader>New Trip</CardHeader>
                <CardContent>
                    <form className="space-y-6"
                        action={(formData: FormData) => {
                            if (imageUrl) {
                                formData.append("imageUrl", imageUrl)
                            }
                            startTransition(() => {
                                createTrip(formData)
                            })
                        }}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Titulo
                            </label>
                            <input
                                type="text"
                                name="title"
                                className={cn(
                                    "w-full border border-gray-300 px-3 py-2",
                                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                )}
                                placeholder="Viaje a Japón..."
                                required
                            />

                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Descripción
                            </label>
                            <textarea
                                name="description"
                                className={cn(
                                    "w-full border border-gray-300 px-3 py-2",
                                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                )}
                                placeholder="Descripción del viaje..."
                                required
                            />

                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fecha Inicio
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    className={cn(
                                        "w-full border border-gray-300 px-3 py-2",
                                        "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    )}
                                    required
                                />

                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fecha Fin
                                </label>
                                <input
                                    type="date"
                                    name="endDate"
                                    className={cn(
                                        "w-full border border-gray-300 px-3 py-2",
                                        "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    )}
                                    required
                                />

                            </div>
                        </div>
                        <div>
                            <label>Trip Image</label>

                            {imageUrl && (
                                <Image
                                    src={imageUrl}
                                    alt="Visualización de viaje"
                                    className="w-full mb-4 rounded-md max-h-48 object-cover"
                                    width={300}
                                    height={100}
                                />
                            )}

                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    if (res && res[0].ufsUrl) {
                                        setImageUrl(res[0].ufsUrl)
                                    }
                                }}
                                onUploadError={(error: Error) => {
                                    console.error("Upload Error", error)
                                }}
                            />

                        </div>
                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? "Creando..." : "Crear Viaje"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}