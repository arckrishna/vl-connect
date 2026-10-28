"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          VL-CONNECT
        </h1>

        <p className="mt-3 text-sm text-gray-600">
          Sign in using your VES college Google account to access the project
          directory.
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="mt-8 w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Sign in with Google
        </button>

        <p className="mt-5 text-center text-xs text-gray-500">
          Use your @ves.ac.in account.
        </p>
      </div>
    </main>
  );
}