import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAJKTIP7OAO8X_cj5Da9dp7qVNY61J-Y8M",
    authDomain: "oster-memory.firebaseapp.com",
    projectId: "oster-memory",
    storageBucket: "oster-memory.firebasestorage.app",
    messagingSenderId: "354124726585",
    appId: "1:354124726585:web:06b0956faecd9bfe5728e8"
};

export const app = initializeApp(firebaseConfig);