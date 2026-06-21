"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, UserCircle2 } from "lucide-react";
import { AuthCard } from "@/components/AuthCard";
import { GlowBackground } from "@/components/GlowBackground";
import { InputField } from "@/components/InputField";
import { PrimaryButton } from "@/components/PrimaryButton";
import { app } from "@/config/firebase";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup, Auth, onAuthStateChanged } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [auth , setAuth] = useState<Auth | undefined>(undefined)
  
  useEffect(() => {
    const auth = getAuth(app);
    setAuth(auth)
  }, [])

  const handleGoogleLogin = async () => {
    try {
      setError("");

      const provider =
        new GoogleAuthProvider();

      // Use the result from signInWithPopup so we have the signed-in user immediately
      const result = await signInWithPopup(auth!, provider);
      const user = result.user;

      console.log('Google sign-in result:', user?.uid, user?.displayName);

      if (user) {
        document.cookie = `uid=${user.uid}; path=/; max-age=20000`;
        const userData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          loggedIn: true,
        };
        localStorage.setItem("NaamJaapID", JSON.stringify(userData));

        try {
          const resp = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: user.uid, name: user.displayName, email: user.email }),
          });

          const body = await resp.json().catch(() => null);
          console.log('/api/users response', resp.status, body);

          if (!resp.ok) {
            setError(`Server error: ${resp.status}`);
          }
        } catch (fetchErr: any) {
          console.error('Fetch to /api/users failed', fetchErr);
          setError('Failed to register user on server.');
        }
      }

      window.location.href = "/jap";
    } catch (err: any) {
      setError(
        err.message ||
        "Google sign in failed."
      );
    }
  };
  
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth!,
          email.trim(),
          password
        );

      await userCredential.user.reload();

      if (!userCredential.user.emailVerified) {
        await auth!.signOut();
        await sendEmailVerification(userCredential.user);

        setError(
          "Please verify your email before logging in. Check your inbox for the verification link. Check spam if inbox haven't received the mail, sometimes it might get flagged as spam."
        );

        return;
      }

      setSuccess("Login successful 🎉");

      const unsub = onAuthStateChanged(auth!, (user) => {
        document.cookie = `uid=${user!.uid}; path=/; max-age=20000`;
        const userData = {
          uid: user!.uid,
          name: user!.displayName,
          email: user!.email,
          loggedIn: true,
        };
        if (user) {
          console.log(user.uid);
          console.log(user.displayName);
        }
      });
      
      window.location.href = "/jap";
    } catch (err: any) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/user-not-found":
          setError("No account exists with this email.");
          break;

        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Incorrect email or password.");
          break;

        case "auth/too-many-requests":
          setError(
            "Too many failed attempts. Please try again later."
          );
          break;

        default:
          setError(
            err.message ||
            "Something went wrong. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    return window.location.href = "/jap"
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
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  <div className="font-medium">Login Failed</div>
                  <div>{error}</div>
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  <div className="font-medium">Success</div>
                  <div>{success}</div>
                </div>
              )}

              <PrimaryButton type="submit" loading={loading} className="mt-4 w-full">
                Login
              </PrimaryButton>
            </form>
            
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-[#0b0918] px-4 text-xs uppercase tracking-widest text-slate-500">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-orange-300/30 hover:bg-white/10 hover:text-orange-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-5 w-5"
              >
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.195 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306 14.691l6.571 4.819C14.655 16.108 19.001 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.143 35.091 26.715 36 24 36c-5.174 0-9.625-3.326-11.287-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303a12.05 12.05 0 0 1-4.084 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                />
              </svg>

              <span>
                Continue with Google
              </span>
            </button>

            <div onClick={handleGuest}  className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
              <button
                type="button"
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
