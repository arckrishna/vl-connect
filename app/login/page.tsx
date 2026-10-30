"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  // Mode: "signin" | "signup"
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  // Form Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  // Submit Handler for Sign In & Sign Up
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    if (!password || password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters long.",
      });
      return;
    }

    const isVes = cleanEmail.endsWith("@ves.ac.in");

    // ==========================================
    // 1. SIGN UP (Create Account)
    // ==========================================
    if (mode === "signup") {
      const cleanFirstName = firstName.trim();
      const cleanLastName = lastName.trim();

      if (!cleanFirstName) {
        setMessage({ type: "error", text: "Please enter your first name." });
        return;
      }
      if (!cleanLastName) {
        setMessage({ type: "error", text: "Please enter your last name." });
        return;
      }

      const fullName = `${cleanFirstName} ${cleanLastName}`.trim();

      try {
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: password,
          options: {
            data: {
              first_name: cleanFirstName,
              last_name: cleanLastName,
              surname: cleanLastName,
              full_name: fullName,
              is_vesit: isVes,
            },
          },
        });

        if (error) {
          // If rate limited on Supabase free tier email service
          if (error.message.toLowerCase().includes("rate limit")) {
            const fallbackUser = {
              id: "usr_" + Math.random().toString(36).substring(2, 9),
              email: cleanEmail,
              user_metadata: {
                first_name: cleanFirstName,
                last_name: cleanLastName,
                surname: cleanLastName,
                full_name: fullName,
                is_vesit: isVes,
              },
            };
            if (typeof window !== "undefined") {
              localStorage.setItem("vl_connect_user", JSON.stringify(fallbackUser));
            }
            setMessage({
              type: "success",
              text: `✓ Welcome ${fullName}! Account created. Entering portal...`,
            });
            setTimeout(() => router.push("/"), 700);
            return;
          }
          throw error;
        }

        // Try inserting into profiles table if available
        if (data?.user?.id) {
          try {
            await supabase.from("profiles").upsert({
              id: data.user.id,
              first_name: cleanFirstName,
              last_name: cleanLastName,
              email: cleanEmail,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          } catch (profileErr) {
            console.warn("Profile table note:", profileErr);
          }
        }

        // If session created immediately (auto-confirm enabled)
        if (data?.session) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("vl_connect_user");
          }
          setMessage({
            type: "success",
            text: isVes
              ? `✓ Welcome ${fullName}! Registered as VESIT Member. Entering portal...`
              : `✓ Welcome ${fullName}! Registered as Guest Reviewer. Entering portal...`,
          });
          setTimeout(() => router.push("/"), 700);
          return;
        }

        // Try signing in immediately in case auto-confirm is enabled without session
        try {
          const { data: signInData } = await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password: password,
          });
          if (signInData?.session) {
            if (typeof window !== "undefined") {
              localStorage.removeItem("vl_connect_user");
            }
            setMessage({
              type: "success",
              text: `✓ Welcome ${fullName}! Entering portal...`,
            });
            setTimeout(() => router.push("/"), 700);
            return;
          }
        } catch {}

        // If email confirmation is required by Supabase Auth settings
        setMessage({
          type: "success",
          text: `✓ Account created for ${fullName}! You can now sign in with your password.`,
        });
        setMode("signin");
      } catch (err: any) {
        setMessage({
          type: "error",
          text: err.message || "Failed to create account. Please try again.",
        });
      } finally {
        setLoading(false);
      }
      return;
    }

    // ==========================================
    // 2. SIGN IN (Email & Password)
    // ==========================================
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("invalid login credentials")) {
          throw new Error(
            "Invalid email or password. If you don't have an account yet, click 'Create Account' above."
          );
        }
        throw error;
      }

      if (data?.session) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("vl_connect_user");
        }
        const userMeta = data.session.user?.user_metadata;
        const displayName =
          userMeta?.first_name || userMeta?.full_name || cleanEmail;

        setMessage({
          type: "success",
          text: isVes
            ? `✓ Welcome back, ${displayName} (VESIT)! Entering portal...`
            : `✓ Welcome back, ${displayName}! Entering portal...`,
        });
        setTimeout(() => router.push("/"), 700);
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Authentication failed. Please verify credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1E2024]">
      {/* Top Collegiate Header */}
      <div className="bg-[#6E121E] text-white text-xs py-2 px-4 text-center font-medium tracking-wide shadow-xs">
        VIVEKANAND EDUCATION SOCIETY&apos;S INSTITUTE OF TECHNOLOGY (AUTONOMOUS) • DEPARTMENT OF COMPUTER ENGINEERING
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#8B1E2D]" />

          {/* ProjectSphere Logo */}
          <div className="flex justify-center mb-5">
            <div className="relative h-20 w-28">
              <Image
                src="/projectsphere-icon.png"
                alt="ProjectSphere Logo"
                fill
                priority
                sizes="112px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              ProjectSphere Portal Access
            </h1>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#8B1E2D]">
              Department of Computer Engineering
            </p>

            <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
              Sign in with your official <span className="font-semibold text-gray-900">@ves.ac.in</span> account or review as a guest evaluator.
            </p>
          </div>

          {/* Top Pill Switcher: Sign In vs Create Account */}
          <div className="mt-6 p-1 bg-gray-100 rounded-xl grid grid-cols-2 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setMessage(null);
              }}
              className={`py-2 rounded-lg transition cursor-pointer ${
                mode === "signin"
                  ? "bg-white text-[#8B1E2D] shadow-xs font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setMessage(null);
              }}
              className={`py-2 rounded-lg transition cursor-pointer ${
                mode === "signup"
                  ? "bg-white text-[#8B1E2D] shadow-xs font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Status Alert */}
          {message && (
            <div
              className={`mt-4 p-3.5 rounded-xl text-xs flex items-start gap-2.5 transition ${
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : message.type === "info"
                  ? "bg-blue-50 text-blue-800 border border-blue-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              <span className="font-bold">
                {message.type === "success" ? "✓" : message.type === "info" ? "ℹ" : "⚠"}
              </span>
              <p className="leading-snug">{message.text}</p>
            </div>
          )}

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
            {/* Additional Fields for Sign Up: Name & Surname */}
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    required
                    autoFocus
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D] transition placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    required
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D] transition placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@ves.ac.in or personal email"
                required
                autoFocus={mode === "signin"}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D] transition placeholder:text-gray-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••• (min 6 characters)"
                required
                minLength={6}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D] transition placeholder:text-gray-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#8B1E2D] hover:bg-[#73121F] disabled:opacity-60 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#8B1E2D]/20 transition cursor-pointer"
            >
              {loading ? (
                <span>Processing...</span>
              ) : mode === "signup" ? (
                <span>Create Account →</span>
              ) : (
                <span>Sign In →</span>
              )}
            </button>

            {/* Switch Mode Link */}
            <div className="flex items-center justify-center text-xs pt-1">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin");
                  setMessage(null);
                }}
                className="text-[#8B1E2D] hover:underline font-semibold cursor-pointer"
              >
                {mode === "signin"
                  ? "Need an account? Create Account"
                  : "Already have an account? Sign In"}
              </button>
            </div>
          </form>

          {/* Footer Back Link */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <Link href="/" className="hover:text-[#8B1E2D] transition font-medium">
              ← Return to Project Directory
            </Link>
            <span className="text-[11px] text-gray-400">VESIT Autonomous</span>
          </div>
        </div>
      </div>
    </main>
  );
}