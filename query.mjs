import {collection, getFirestore, query, where, getDocs} from "firebase/firestore";
import { config } from "./config.mjs";
import {initializeApp} from "firebase/app";
import admin from "firebase-admin";
import serviceAccount from "./service_account.json" with { type: 'json' };
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = config();

const app = initializeApp(firebaseConfig);
admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

const db = getFirestore(app);
async function do_query() {
    try {
        //const analytics= getAnalytics(app);
        const webRef = collection(db, "Local Web")
        // varun_id is the id provided by the user
        // varun_column is the column provided by the user
        const q = query(webRef, where('Unique ID', '==', 2));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
        });
    } catch(err) {
        console.error("Query error: ", err);
    }
}
let print_query = do_query();