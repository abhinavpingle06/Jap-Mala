"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, UserCircle2 } from "lucide-react";
import { AuthCard } from "@/components/AuthCard";
import { GlowBackground } from "@/components/GlowBackground";
import { InputField } from "@/components/InputField";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => setLoading(false), 900);
  };

  const handleGuest = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 900);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05040f] text-slate-100">
      <GlowBackground />

      <main className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          <AuthCard
            title="Sign in to your sacred space"
            subtitle="Enter your details and continue your mindful chanting journey with calm focus."
            footer={
              <p className="text-slate-400">
                Don&apos;t have an account? <Link href="/signup" className="font-semibold text-orange-200 transition hover:text-orange-100">Sign up</Link>
              </p>
            }
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <InputField
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="hello@japmala.com"
                autoComplete="email"
              />
              <InputField
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-300 transition hover:text-orange-200"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
              <PrimaryButton type="submit" loading={loading} className="w-full">
                Login
              </PrimaryButton>
            </form>

            <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
              <button
                type="button"
                onClick={handleGuest}
                className="inline-flex items-center gap-2 text-sm font-semibold text-orange-100 transition hover:text-orange-50"
              >
                <UserCircle2 size={18} />
                Continue as Guest
              </button>
            </div>
          </AuthCard>
        </div>
      </main>
    </div>
  );
}
