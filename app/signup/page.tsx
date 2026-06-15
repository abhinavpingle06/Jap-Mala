"use client";

import { useState , useEffect} from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { AuthCard } from "@/components/AuthCard";
import { GlowBackground } from "@/components/GlowBackground";
import { InputField } from "@/components/InputField";
import { PrimaryButton } from "@/components/PrimaryButton";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup, Auth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/config/firebase";
import { useRouter } from "next/router";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth , setAuth] = useState<Auth | undefined>(undefined)
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [delay, setDelay] = useState(true)

  useEffect(()=> {
    const auth = getAuth(app);
    setAuth(auth)
  },[])
  
  const handleGoogleLogin = async () => {
    try {
      setError("");

      const provider = 
        new GoogleAuthProvider();

      await signInWithPopup(
        auth!,
        provider
      );

      const unsub = onAuthStateChanged(auth!, (user) => {
        document.cookie = `uid=${user!.uid}; path=/; max-age=20000`;
        const userData = {
          uid: user!.uid,
          name: user!.displayName,
          email: user!.email,
          loggedIn: true,
        };
        localStorage.setItem("NaamJaapID", JSON.stringify(userData));
        if (user) {
          console.log(user.uid);
          console.log(user.displayName);
        }
      });
      
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
      if (!email.trim()) {
        throw { code: "auth/invalid-email" };
      }

      if (!password.trim()) {
        throw { code: "auth/missing-password" };
      }

      if (password.length < 6) {
        throw { code: "auth/weak-password" };
      }

      if (
        confirmPassword &&
        password !== confirmPassword
      ) {
        setError("Passwords do not match.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth!,
        email.trim(),
        password
      );

      await sendEmailVerification(userCredential.user);

      setSuccess("Account created successfully 🎉");

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
    } catch (err: any) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/email-already-in-use":
          setError(
            "An account with this email already exists."
          );
          break;

        case "auth/weak-password":
          setError(
            "Password must be at least 6 characters long."
          );
          break;

        case "auth/missing-password":
          setError("Please enter a password.");
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
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-orange-200 transition hover:text-orange-100"
                >
                  Login
                </Link>
              </p>
            }
          >
            <form
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              {/* Uncomment if needed
              <InputField
                label="Full Name"
                id="name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Your full name"
                autoComplete="name"
              />
              */}

              <InputField
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="hello@japmala.com"
                autoComplete="email"
              />

              <InputField
                label="Password"
                id="password"
                type={
                  showPassword ? "text" : "password"
                }
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Choose a secure password"
                autoComplete="new-password"
                trailing={
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-300 transition hover:text-orange-200"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                }
              />

              {/* Uncomment if needed
              <InputField
                label="Confirm Password"
                id="confirm-password"
                type={
                  showConfirm ? "text" : "password"
                }
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
                placeholder="Re-enter your password"
                autoComplete="new-password"
                trailing={
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirm(
                        (current) => !current
                      )
                    }
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-300 transition hover:text-orange-200"
                  >
                    {showConfirm ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                }
              />
              */}

              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  <div className="font-medium">
                    Signup Failed
                  </div>
                  <div>{error}</div>
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  <div className="font-medium">
                    Success
                  </div>
                  <div>{success}</div>
                </div>
              )}

              <PrimaryButton
                type="submit"
                loading={loading}
                className="w-full mt-4"
              >
                Create Account
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
          </AuthCard>
        </div>
      </main>
    </div>
  );
}