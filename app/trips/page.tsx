import { auth } from "@/auth";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TripsPage() {
    const session = await auth();

    const trips = await prisma.trip.findMany({
        where: { userId: session?.user?.id }
    })

    const sortedTrips = [...trips].sort((a, b) => (new Date(b.startDate).getTime() - new Date(a.startDate).getTime()))

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcomingTrips = sortedTrips.filter(
        (trip) => new Date(trip.startDate) >= today
    )

    if (!session) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
                <h1 className="text-3xl font-bold mb-4">Inicia sesión para ver tus viajes.</h1>
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

                <CardContent>
                    {
                        trips.length === 0
                            ? 'Aun no tienes viajes agendados! Da clic en el botón  "Nuevo Viaje"'
                            : `Tienes ${upcomingTrips.length} viaje(s) próximo(s). Revisa tus notas 😊`
                    }
                </CardContent>
            </Card>
            <div>
                <h2 className="text-xl font-semibold mb-4">Viajes recientes</h2>
                {trips.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <h2 className="text-2xl font-bold mb-2">No trips yet.</h2>
                            <p className="text-center mb-4 max-w-md">
                                Empieza a crear experiencias inolvidables agendando tu primer viaje.
                            </p>
                            <Link href="/trips/new">
                                <Button>Agendar Viaje</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedTrips.slice(0, 6).map((trip, key) => (
                            <Link key={key} href={`/trips/${trip.id}`}>
                                <Card className="h-full hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="line-clamp-1">
                                            {trip.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm line-clamp-2 mb-2">
                                            {trip.description}
                                        </p>
                                        <div className="text-sm">
                                            {new Date(trip.startDate).toLocaleDateString()} -
                                            {new Date(trip.endDate).toLocaleDateString()}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}