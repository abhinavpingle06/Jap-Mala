"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { AuthCard } from "@/components/AuthCard";
import { GlowBackground } from "@/components/GlowBackground";
import { InputField } from "@/components/InputField";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => setLoading(false), 900);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05040f] text-slate-100">
      <GlowBackground />

      <main className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          <AuthCard
            title="Create your calming account"
            subtitle="Join Virtual Jap Mala and unlock a serene daily practice space with gentle clarity."
            footer={
              <p className="text-slate-400">
                Already have an account? <Link href="/login" className="font-semibold text-orange-200 transition hover:text-orange-100">Login</Link>
              </p>
            }
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <InputField
                label="Full Name"
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                autoComplete="name"
              />
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
                placeholder="Choose a secure password"
                autoComplete="new-password"
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
              <InputField
                label="Confirm Password"
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowConfirm((current) => !current)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-300 transition hover:text-orange-200"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
              <PrimaryButton type="submit" loading={loading} className="w-full">
                Create Account
              </PrimaryButton>
            </form>

            <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4 text-center text-slate-300">
              <ShieldCheck size={18} className="inline-block align-middle text-orange-200" />
              <span className="ml-2 text-sm">Peaceful sign-up with a calm welcome flow.</span>
            </div>
          </AuthCard>
        </div>
      </main>
    </div>
  );
}
