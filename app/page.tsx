import { auth } from "@/auth";
import AuthButton from "@/components/auth-button";
import { ClockIcon, MapIcon, RefreshCwIcon } from "lucide-react";

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  console.log(isLoggedIn)

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-white to-blue-100 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Planifica tu viaje perfecto
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Crea itinerarios y organiza destinos de viaje
                todo en un solo lugar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AuthButton
                  isLoggedIn={isLoggedIn}
                  className="flex items-center bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded-sm cursor-pointer"
                >
                  {isLoggedIn ? ("Ingresar") : (
                    <>
                      Ingresar
                      <svg className="w-6 h-6 ml-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                        <path fill="#ffffff" d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.6,5,2.5,9.3,6.9,10.7v-2.3c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9 
                                 c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1
                                 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6
                                 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4
                                 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v3.3c4.1-1.3,7-5.1,7-9.5C22,6.1,16.9,1.4,10.9,2.1z"/>
                      </svg>
                    </>
                  )}
                </AuthButton>
              </div>
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-24 bg-white"
            style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }}
          />
        </section>
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Plan with confidence
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border border-gray-100 shadow-sm bg-white">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <MapIcon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Mapa interactivo</h2>
                <p className="mt-2">Visualiza tus aventuras pasadas y futuras. Explora cada país visitado en un mapa interactivo 3D.</p>
              </div>
              <div className="p-6 rounded-lg border border-gray-100 shadow-sm bg-white">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <ClockIcon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Itinerario detallado al día</h2>
                <p className="mt-2">Organiza cada paso de tu viaje sin esfuerzo. Ten siempre a mano tus destinos, actividades y horarios, perfectamente sincronizados.</p>
              </div>
              <div className="p-6 rounded-lg border border-gray-100 shadow-sm bg-white">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <RefreshCwIcon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Diseñada para ti</h2>
                <p className="mt-2">Cambia el orden de tus destinos y personaliza tu viaje con solo un clic. ¡La planificación nunca fue tan sencilla!</p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-slate-900 text-center py-20 space-y-4">
          <h1 className="text-3xl font-bold text-white">¿Listo para trazar tu próxima gran aventura?</h1>
          <p className="text-base text-white ">Únete a nuestra creciente comunidad de viajeros y convierte cada plan en una experiencia inolvidable. ¡El mundo te espera!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AuthButton
              isLoggedIn
              className="flex items-center bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded-sm cursor-pointer"
            >
              {isLoggedIn ? ("Ingresar") : (
                <>
                  Ingresar
                  <svg className="w-6 h-6 ml-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                    <path fill="#ffffff" d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.6,5,2.5,9.3,6.9,10.7v-2.3c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9 
                                 c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1
                                 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6
                                 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4
                                 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v3.3c4.1-1.3,7-5.1,7-9.5C22,6.1,16.9,1.4,10.9,2.1z"/>
                  </svg>
                </>
              )}
            </AuthButton>
          </div>
        </section>
      </main>
    </div>
  );
}
