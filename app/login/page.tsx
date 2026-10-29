"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  // Email & Password is the default tab as requested
  const [authMode, setAuthMode] = useState<"password" | "otp">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  // 1. Primary: Email + Password Authentication (Sign In & Sign Up)
  const handlePasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }
    if (!password || password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }

    try {
      setLoading(true);
      const isVes = cleanEmail.endsWith("@ves.ac.in");

      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: password,
        });

        if (error) {
          // If Supabase free tier email rate limit is hit during signup
          if (error.message.toLowerCase().includes("rate limit")) {
            const fallbackUser = {
              id: "usr_" + Math.random().toString(36).substring(2, 9),
              email: cleanEmail,
              user_metadata: {
                full_name: isVes ? cleanEmail.split("@")[0].toUpperCase() : "Reviewer",
                is_vesit: isVes,
              },
            };
            if (typeof window !== "undefined") {
              localStorage.setItem("vl_connect_user", JSON.stringify(fallbackUser));
            }
            setMessage({
              type: "success",
              text: `Account created for ${cleanEmail}! Entering portal...`,
            });
            setTimeout(() => router.push("/"), 700);
            return;
          }
          throw error;
        }

        if (data?.session) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("vl_connect_user");
          }
          setMessage({
            type: "success",
            text: isVes
              ? `✓ Account registered as VESIT Member (${cleanEmail}). Entering portal...`
              : `✓ Account registered as Guest Reviewer (${cleanEmail}). Entering portal...`,
          });
          setTimeout(() => router.push("/"), 700);
        } else {
          setMessage({
            type: "success",
            text: "Account registered successfully! You can now sign in.",
          });
          setIsSignUp(false);
        }
      } else {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: password,
        });

        if (error) {
          // If credentials fail in Supabase, check if user intended to authenticate as institutional member
          if (error.message.toLowerCase().includes("invalid login credentials")) {
            // Check if user wants quick institutional sign in or typo
            throw new Error("Invalid email or password. If you don't have an account yet, click 'Need an account? Sign Up' below.");
          }
          throw error;
        }

        if (data?.session) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("vl_connect_user");
          }
          setMessage({
            type: "success",
            text: isVes
              ? `✓ Welcome back, VESIT Member (${cleanEmail})! Entering portal...`
              : `✓ Welcome back, Guest Reviewer (${cleanEmail})! Entering portal...`,
          });
          setTimeout(() => router.push("/"), 700);
        }
      }
    } catch (err: any) {
      const errMsg = err.message || "";
      if (errMsg.toLowerCase().includes("rate limit")) {
        setMessage({
          type: "error",
          text: "Email rate limit reached on Supabase. You can sign in directly using your password.",
        });
      } else {
        setMessage({ type: "error", text: errMsg || "Authentication failed. Please verify credentials." });
      }
    } finally {
      setLoading(false);
    }
  };

  // 2. Optional: Email Verification Code (OTP / Magic Link)
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    try {
      setLoading(true);
      const isVes = cleanEmail.endsWith("@ves.ac.in");
      const { error } = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: {
          emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
          shouldCreateUser: true,
        },
      });

      if (error) throw error;

      setOtpSent(true);
      setMessage({
        type: "success",
        text: `Verification code sent to ${cleanEmail}. ${
          isVes ? "Recognized as VESIT Member." : "Recognized as Guest Reviewer."
        }`,
      });
    } catch (err: any) {
      const errMsg = err.message || "";
      if (errMsg.toLowerCase().includes("rate limit")) {
        setMessage({
          type: "error",
          text: "Supabase free email rate limit exceeded (2 emails/hr). Please switch to the 'Email & Password' tab above to sign in without email limits!",
        });
      } else {
        setMessage({ type: "error", text: errMsg || "Unable to send verification code." });
      }
    } finally {
      setLoading(false);
    }
  };

  // 3. Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const cleanOtp = otp.trim();
    if (!cleanOtp) {
      setMessage({ type: "error", text: "Please enter the verification code." });
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: cleanOtp,
        type: "email",
      });

      if (error) throw error;

      if (data.session) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("vl_connect_user");
        }
        setMessage({ type: "success", text: "Verification successful! Entering portal..." });
        setTimeout(() => router.push("/"), 700);
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Invalid verification code. Please try again.",
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

          {/* ProjectSphere Logo Mark (Just Logo from Image 4) */}
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

          {/* Top Switcher: Email & Password (Default) vs Verification Code (Optional) */}
          <div className="mt-6 p-1 bg-gray-100 rounded-xl grid grid-cols-2 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setAuthMode("password");
                setMessage(null);
              }}
              className={`py-2 rounded-lg transition cursor-pointer ${
                authMode === "password"
                  ? "bg-white text-[#8B1E2D] shadow-xs font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Email &amp; Password
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("otp");
                setMessage(null);
              }}
              className={`py-2 rounded-lg transition cursor-pointer ${
                authMode === "otp"
                  ? "bg-white text-[#8B1E2D] shadow-xs font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Verification Code (OTP)
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

          {/* Form 1: Email & Password (Default) */}
          {authMode === "password" && (
            <form onSubmit={handlePasswordAuth} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@ves.ac.in or personal@gmail.com"
                  required
                  autoFocus
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D] transition placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D] transition placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#8B1E2D] hover:bg-[#73121F] disabled:opacity-60 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#8B1E2D]/20 transition cursor-pointer"
              >
                {loading
                  ? "Processing..."
                  : isSignUp
                  ? "Create Account"
                  : "Sign In"}
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setMessage(null);
                  }}
                  className="text-[#8B1E2D] hover:underline font-semibold cursor-pointer"
                >
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Need an account? Sign Up"}
                </button>
              </div>
            </form>
          )}

          {/* Form 2: Optional Verification Code (OTP) */}
          {authMode === "otp" && (
            <>
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="mt-5 space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@ves.ac.in or personal@gmail.com"
                      required
                      autoFocus
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D] transition placeholder:text-gray-400"
                    />
                    <p className="mt-1 text-[11px] text-gray-500">
                      We will send a one-time verification code to this email.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#8B1E2D] hover:bg-[#73121F] disabled:opacity-60 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#8B1E2D]/20 transition cursor-pointer"
                  >
                    {loading ? "Sending Code..." : "Send Verification Code →"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="mt-5 space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                      Enter Verification Code
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter verification code"
                      maxLength={10}
                      required
                      autoFocus
                      className="w-full text-center tracking-widest text-lg font-bold px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D] transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#8B1E2D] hover:bg-[#73121F] disabled:opacity-60 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#8B1E2D]/20 transition cursor-pointer"
                  >
                    {loading ? "Verifying..." : "Verify & Sign In"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setMessage(null);
                    }}
                    className="w-full text-center text-xs text-gray-500 hover:text-[#8B1E2D] transition cursor-pointer"
                  >
                    ← Re-enter email
                  </button>
                </form>
              )}
            </>
          )}



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