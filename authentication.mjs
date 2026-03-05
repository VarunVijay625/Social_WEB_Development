import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase-admin/firestore";
import admin from "firebase-admin";
import serviceAccount from "./service_account.json" with { type: 'json' };

export function authenticate() {
    // Initialize Firebase


    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    const db = getFirestore();
    return db;
}