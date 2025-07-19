"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createTrip(data: FormData) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("No autorizado");
  }

  const title = data.get("title")?.toString();
  const description = data.get("description")?.toString();
  const imageUrl = data.get("imageUrl")?.toString();
  const startDateStr = data.get("startDate")?.toString();
  const endDateStr = data.get("endDate")?.toString();

  if (!title || !description || !startDateStr || !endDateStr) {
    throw new Error("Todos los campos son obligatorios");
  }

  await prisma.trip.create({
    data: {
      title,
      description,
      imageUrl,
      startDate: new Date(startDateStr),
      endDate: new Date(endDateStr),
      userId: session.user.id,
    },
  });

  redirect("/trips");
}
