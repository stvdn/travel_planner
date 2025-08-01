"use server";

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GeocodeAPIResult {
  results: {
    formatted_address: string;
    address_components: AddressComponent[];
  }[];
}

interface GeocodeResult {
  country: string;
  formattedAddress: string;
}

export async function getCountryFromCoordinates(
  lat: number,
  lng: number
): Promise<GeocodeResult> {
  const apiKey = process.env.GOOGLE_GEOCODING_API_KEY;
  const reponse = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
  );

  const data: GeocodeAPIResult = await reponse.json();
  const result = data.results[0];
  const countryComponent = result.address_components.find((component) =>
    component.types.includes("country")
  );

  return {
    country: countryComponent?.long_name ?? "Desconocido",
    formattedAddress: result.formatted_address,
  };
}
