"use client";

import { login, logout } from "@/lib/auth-actions";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ session }: { session: Session | null }) {
    return (
        <nav className="bg-white shadow-md py-4 border-b border-gray-200">
            {""}
            <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
                <Link href={"/"} className="flex items-center">
                    <Image src={"/logo.png"} className="mr-4" alt="Logo" width={50} height={50} />
                    <span className="text-2xl font-bold text-gray-800">
                        {""}
                        Agenda de Viajes
                    </span>
                </Link>
                <div className="flex items-center space-x-4">
                    {session ? (
                        <>
                            <Link href={"/trips"} className="text-slate-600 hover:text-sky-500">
                                Viajes
                            </Link>
                            <Link href={"/globe"} className="text-slate-600 hover:text-sky-500">
                                Mundo
                            </Link>
                            <button
                                className="flex items-center bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-sm cursor-pointer"
                                onClick={logout}
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <button
                            className="flex items-center bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-sm cursor-pointer"
                            onClick={login}
                        >
                            Ingresar
                            <svg className="w-6 h-6 ml-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                                <path fill="#ffffff" d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.6,5,2.5,9.3,6.9,10.7v-2.3c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9 
                                c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1
                                c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6
                                c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4
                                c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v3.3c4.1-1.3,7-5.1,7-9.5C22,6.1,16.9,1.4,10.9,2.1z"/>
                            </svg>
                        </button>
                    )}

                </div>
            </div>
        </nav>
    );

}