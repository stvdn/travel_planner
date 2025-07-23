"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

async function getGeocodeAddress(address: string) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY!;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );

  const data = await response.json();
  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng };
}

export async function addLocation(formData: FormData, tripId: string) {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("No autorizado");
  }

  const address = formData.get("address")?.toString();

  if (!address) {
    throw new Error('El campo "Dirección es obligatorio"');
  }

  const { lat, lng } = await getGeocodeAddress(address);
  const totalOrder = await prisma.location.count({
    where: { tripId },
  });

  await prisma.location.create({
    data: {
      locationTitle: address,
      lat,
      lng,
      tripId,
      order: totalOrder,
    },
  });

  redirect(`/trips/${tripId}`);
}
