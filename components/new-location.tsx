"use client"

import { useTransition } from "react";
import { Button } from "./ui/Button"
import { addLocation } from "@/lib/actions/add-location";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewLocationClient({ tripId }: { tripId: string }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleGoBack = () => {
        router.back(); // Navigates back one step in the browser history
    };
    return (
        <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gray-50">
            <button onClick={handleGoBack} className="absolute top-10 left-10 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-full cursor-pointer">
                <ArrowLeft className="w-5" />
            </button>
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white p-8 shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-center mb-6">Agregar destino</h1>
                    <form className="space-y-6"
                        action={(formData: FormData) => {
                            startTransition(() => {
                                addLocation(formData, tripId)
                            })
                        }}
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Dirección
                            </label>
                            <input
                                name="address"
                                type="text"
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            {isPending ? "Agregando..." : "Agregar"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}