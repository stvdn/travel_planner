import { auth } from "@/auth";
import TripDetailClient from "@/components/trip-detail";
import { prisma } from "@/lib/prisma";

export default async function TripDetail({
    params
}: {
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = await params
    const session = await auth();

    if (!session || !session.user) {
        return (<div>No autenticado, dar clic en el botón "Ingresar"</div>)
    }

    const trip = await prisma.trip.findFirst({
        where: { id: tripId, userId: session.user.id },
        include: { locations: true }
    })

    if (!trip) {
        return <div>Viaje no encontrado 😕</div>
    }

    return <TripDetailClient trip={trip} />
}