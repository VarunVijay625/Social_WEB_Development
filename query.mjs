import {collection, getFirestore, query, where, getDocs} from "firebase/firestore";
import { config } from "./config.mjs";
import {initializeApp} from "firebase/app";
import admin from "firebase-admin";
import serviceAccount from "./service_account.json" with { type: 'json' };
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// configuration is in a config.mjs with the secret API key.
// DO NOT PUSH config.mjs TO THE REPO!!!!!
const firebaseConfig = config();

const app = initializeApp(firebaseConfig);
admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

const db = getFirestore(app);
async function do_query() {
    try {
        const webRef = collection(db, "Local Web")
        // For Varun and Ellie: pass the user input for id into where 2 is
        const q = query(webRef, where('Unique ID', '==', 2));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        snapshot.forEach(doc => {
            const data = doc.data();
            // for Varun and Ellie: write logic to pass the user input for column where it says .Friend
            console.log(doc.id, '=>', data.Friend);
        });
    } catch(err) {
        console.error("Query error: ", err);
    }
}
let print_query = do_query();