import {collection, getFirestore, query, where, getDocs} from "firebase/firestore";
import { config } from "./config.mjs";
import {initializeApp} from "firebase/app";
import admin from "firebase-admin";
import serviceAccount from "./service_account.json" with { type: 'json' };

const firebaseConfig = config();

const app = initializeApp(firebaseConfig);
admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

const db = getFirestore(app);

async function do_query(id, column) {
    try {
        const webRef = collection(db, "Local Web")
        const q = query(webRef, where('Unique ID', '==', id));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }

        const names = [];

        if(column === "friend"){
            snapshot.forEach(async doc => {
                const data = doc.data();
                console.log(doc.id, '=>', data.Friend);
                if(data.Friend){
                    for(const relatedId of data.Friend){
                        const relatedQ = query(webRef, where('Unique ID', '==', relatedId));
                        const relatedSnapshot = await getDocs(relatedQ);
                        relatedSnapshot.forEach(relatedDoc => {
                            console.log(relatedDoc.data().Name);
                            names.push(relatedDoc.data().Name);
                        });
                    }
                }
            });
        }
        if(column === "coworker"){
            snapshot.forEach(async doc => {
                const data = doc.data();
                console.log(doc.id, '=>', data.Coworker);
                if(data.Coworker){
                    for(const relatedId of data.Coworker){
                        const relatedQ = query(webRef, where('Unique ID', '==', relatedId));
                        const relatedSnapshot = await getDocs(relatedQ);
                        relatedSnapshot.forEach(relatedDoc => {
                            console.log(relatedDoc.data().Name);
                            names.push(relatedDoc.data().Name);
                        });
                    }
                }
            });
        }
        if(column === "dating"){
            for(const doc of snapshot.docs){
                const data = doc.data();
                console.log(doc.id, '=>', data.Dating);
                if(data.Dating){
                    for(const relatedId of data.Dating){
                        const relatedQ = query(webRef, where('Unique ID', '==', relatedId));
                        const relatedSnapshot = await getDocs(relatedQ);
                        relatedSnapshot.forEach(relatedDoc => {
                            console.log(relatedDoc.data().Name);
                            names.push(relatedDoc.data().Name);
                        });
                    }
                }
            }
        }
        if(column === "have met"){
            snapshot.forEach(async doc => {
                const data = doc.data();
                console.log(doc.id, '=>', data["Have Met"]);
                if(data["Have Met"]){
                    for(const relatedId of data["Have Met"]){
                        const relatedQ = query(webRef, where('Unique ID', '==', relatedId));
                        const relatedSnapshot = await getDocs(relatedQ);
                        relatedSnapshot.forEach(relatedDoc => {
                            console.log(relatedDoc.data().Name);
                            names.push(relatedDoc.data().Name);
                        });
                    }
                }
            });
        }
        if(column === "secret 3rd"){
            snapshot.forEach(async doc => {
                const data = doc.data();
                console.log(doc.id, '=>', data["Secret 3rd"]);
                if(data["Secret 3rd"]){
                    for(const relatedId of data["Secret 3rd"]){
                        const relatedQ = query(webRef, where('Unique ID', '==', relatedId));
                        const relatedSnapshot = await getDocs(relatedQ);
                        relatedSnapshot.forEach(relatedDoc => {
                            console.log(relatedDoc.data().Name);
                            names.push(relatedDoc.data().Name);
                        });
                    }
                }
            });
        }
        if(column === "roommate"){
            snapshot.forEach(async doc => {
                const data = doc.data();
                console.log(doc.id, '=>', data.Roommate);
                if(data.Roommate){
                    for(const relatedId of data.Roommate){
                        const relatedQ = query(webRef, where('Unique ID', '==', relatedId));
                        const relatedSnapshot = await getDocs(relatedQ);
                        relatedSnapshot.forEach(relatedDoc => {
                            console.log(relatedDoc.data().Name);
                            names.push(relatedDoc.data().Name);
                        });
                    }
                }
            });
        }
        if(column === "supervisor"){
            snapshot.forEach(async doc => {
                const data = doc.data();
                console.log(doc.id, '=>', data.Supervisor);
                if(data.Supervisor){
                    for(const relatedId of data.Supervisor){
                        const relatedQ = query(webRef, where('Unique ID', '==', relatedId));
                        const relatedSnapshot = await getDocs(relatedQ);
                        relatedSnapshot.forEach(relatedDoc => {
                            console.log(relatedDoc.data().Name);
                            names.push(relatedDoc.data().Name);
                        });
                    }
                }
            });
        }
        if(column === "teammate"){
            snapshot.forEach(async doc => {
                const data = doc.data();
                console.log(doc.id, '=>', data.Teammate);
                if(data.Teammate){
                    for(const relatedId of data.Teammate){
                        const relatedQ = query(webRef, where('Unique ID', '==', relatedId));
                        const relatedSnapshot = await getDocs(relatedQ);
                        relatedSnapshot.forEach(relatedDoc => {
                            console.log(relatedDoc.data().Name);
                            names.push(relatedDoc.data().Name);
                        });
                    }
                }
            });
        }

        return names;

    } catch(err) {
        console.error("Query error: ", err);
        return [];
    }

    
}

export { do_query };
// let print_query = await do_query(6, "dating");
// console.log(print_query);
// process.exit(0);
