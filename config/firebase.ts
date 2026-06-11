import { initializeApp } from "firebase/app";

let firebaseConfig;

try {
    firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || "{}");
} catch (error) {
    console.warn("Firebase config parsing failed, using empty config", error);
    firebaseConfig = {};
}

export const app = firebaseConfig.projectId ? initializeApp(firebaseConfig) : undefined;