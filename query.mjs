import { authenticate } from './authentication.mjs';
let db = authenticate();
import { collection, query, where } from "firebase/firestore";
const webRef = collection(db, "Local Web")
// varun_id is the id provided by the user
// varun_column is the column provided by the user
const q = query(webRef, where("ID", "==", 2)).select("Friend");
console.log(q);