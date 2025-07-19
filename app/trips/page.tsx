import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";

export default async function TripsPage() {
    const session = await auth();

    if (!session) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
                <h1 className="text-3xl font-bold mb-4">Por favor, inicia sesión para ver tus viajes.</h1>
            </div>
        );
    }

    return (
        <div className="space-y-6 container mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <Link href="/trips/new">
                    <button className="bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-sm cursor-pointer">
                        Nuevo Viaje
                    </button>
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Bienvenido de regreso {session.user?.name}!</CardTitle>
                </CardHeader>

                <CardContent></CardContent>
            </Card>
        </div>
    );
}