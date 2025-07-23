import { Location } from "@/app/generated/prisma";
import { auth } from "@/auth";
import { getCountryFromCoordinates } from "@/lib/actions/geocode";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const locations = await prisma.location.findMany({
      where: {
        trip: {
          userId: session.user.id,
        },
      },
      select: {
        locationTitle: true,
        lng: true,
        lat: true,
        trip: {
          select: {
            title: true,
          },
        },
      },
    });

    const transformedLocations = await Promise.all(
      locations.map(async (loc: any) => {
        const geocodeResult = await getCountryFromCoordinates(loc.lat, loc.lng);
        return {
          name: `${loc.trip.title} - ${geocodeResult.formattedAddress}`,
          lat: loc.lat,
          lng: loc.lng,
          country: geocodeResult.country,
        };
      })
    );

    return NextResponse.json(transformedLocations);
  } catch (err) {
    console.log("aaaaaaaaaaa", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
