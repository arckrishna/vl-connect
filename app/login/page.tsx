"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1E2024]">
      {/* Top bar */}
      <div className="bg-[#6E121E] text-white text-xs py-2 px-4 text-center font-medium">
        VIVEKANAND EDUCATION SOCIETY&apos;S INSTITUTE OF TECHNOLOGY (AUTONOMOUS)
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#8B1E2D]" />

          {/* VESIT Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative h-14 w-48">
              <Image
                src="/vesit-logo.png"
                alt="VESIT"
                fill
                priority
                sizes="192px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              VL-CONNECT Portal
            </h1>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#8B1E2D]">
              Student &amp; Faculty Access
            </p>

            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Sign in using your authorized VES institutional Google account (
              <span className="font-semibold text-gray-800">@ves.ac.in</span>) to access the
              engineering project archives and submissions.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-[#8B1E2D] hover:bg-[#73121F] px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#8B1E2D]/20 transition cursor-pointer"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.053 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                />
              </svg>
              <span>Sign in with VES Google ID</span>
            </button>

            <Link
              href="/"
              className="w-full block text-center py-2 text-xs font-semibold text-gray-500 hover:text-[#8B1E2D] transition"
            >
              ← Back to Project Directory
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-[11px] text-gray-400">
            Vivekanand Education Society&apos;s Institute of Technology • Chembur, Mumbai
          </div>
        </div>
      </div>
    </main>
  );
}