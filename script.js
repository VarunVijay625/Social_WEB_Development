const firebaseConfig = {
        apiKey: "AIzaSyDP7snJVxhiQSQs7Z8CzGA9uvk5qdLkJhQ",
        authDomain: "social-web-dev.firebaseapp.com",
        projectId: "social-web-dev",
        storageBucket: "social-web-dev.firebasestorage.app",
        messagingSenderId: "621332128804",
        appId: "1:621332128804:web:94424f8ba5b97549fbe4b1",
        measurementId: "G-S0J91M5KEQ"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function do_query(id, column) {
    try {
        const webRef = db.collection("Local Web");
        const snapshot = await webRef.where('Unique ID', '==', id).get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }

        const names = [];

        if(column === "friend"){
            for(const doc of snapshot.docs){
                const data = doc.data();
                console.log(doc.id, '=>', data.Friend);
                if(data.Friend){
                    for(const relatedId of data.Friend){
                        const relatedSnapshot = await webRef.where('Unique ID', '==', relatedId).get();
                        relatedSnapshot.forEach(relatedDoc => {
                            console.log(relatedDoc.data().Name);
                            names.push(relatedDoc.data().Name);
                        });
                    }
                }
            }
        }
        if(column === "coworker"){
            for(const doc of snapshot.docs){
                const data = doc.data();
                console.log(doc.id, '=>', data.Coworker);
                if(data.Coworker){
                    for(const relatedId of data.Coworker){
                        const relatedSnapshot = await webRef.where('Unique ID', '==', relatedId).get();
                        relatedSnapshot.forEach(relatedDoc => {
                            console.log(relatedDoc.data().Name);
                            names.push(relatedDoc.data().Name);
                        });
                    }
                }
            }
        }
        if(column === "dating"){
            for(const doc of snapshot.docs){
                const data = doc.data();
                console.log(doc.id, '=>', data.Dating);
                if(data.Dating){
                    for(const relatedId of data.Dating){
                        const relatedSnapshot = await webRef.where('Unique ID', '==', relatedId).get();
                        relatedSnapshot.forEach(relatedDoc => {
                            console.log(relatedDoc.data().Name);
                            names.push(relatedDoc.data().Name);
                        });
                    }
                }
            }
        }
        if(column === "have met"){
            for(const doc of snapshot.docs){
                const data = doc.data();
                console.log(doc.id, '=>', data["Have Met"]);
                if(data["Have Met"]){
                    for(const relatedId of data["Have Met"]){
                        const relatedSnapshot = await webRef.where('Unique ID', '==', relatedId).get();
                        relatedSnapshot.forEach(relatedDoc => {
                            console.log(relatedDoc.data().Name);
                            names.push(relatedDoc.data().Name);
                        });
                    }
                }
            }
        }
        if(column === "secret 3rd"){
            for(const doc of snapshot.docs){
                const data = doc.data();
                console.log(doc.id, '=>', data["Secret 3rd"]);
                if(data["Secret 3rd"]){
                    for(const relatedId of data["Secret 3rd"]){
                        const relatedSnapshot = await webRef.where('Unique ID', '==', relatedId).get();
                        relatedSnapshot.forEach(relatedDoc => {
                            console.log(relatedDoc.data().Name);
                            names.push(relatedDoc.data().Name);
                        });
                    }
                }
            }
        }
        if(column === "roommate"){
            for(const doc of snapshot.docs){
                const data = doc.data();
                console.log(doc.id, '=>', data.Roommate);
                if(data.Roommate){
                    for(const relatedId of data.Roommate){
                        const relatedSnapshot = await webRef.where('Unique ID', '==', relatedId).get();
                        relatedSnapshot.forEach(relatedDoc => {
                            console.log(relatedDoc.data().Name);
                            names.push(relatedDoc.data().Name);
                        });
                    }
                }
            }
        }
        if(column === "supervisor"){
            for(const doc of snapshot.docs){
                const data = doc.data();
                console.log(doc.id, '=>', data.Supervisor);
                if(data.Supervisor){
                    for(const relatedId of data.Supervisor){
                        const relatedSnapshot = await webRef.where('Unique ID', '==', relatedId).get();
                        relatedSnapshot.forEach(relatedDoc => {
                            console.log(relatedDoc.data().Name);
                            names.push(relatedDoc.data().Name);
                        });
                    }
                }
            }
        }
        if(column === "teammate"){
            for(const doc of snapshot.docs){
                const data = doc.data();
                console.log(doc.id, '=>', data.Teammate);
                if(data.Teammate){
                    for(const relatedId of data.Teammate){
                        const relatedSnapshot = await webRef.where('Unique ID', '==', relatedId).get();
                        relatedSnapshot.forEach(relatedDoc => {
                            console.log(relatedDoc.data().Name);
                            names.push(relatedDoc.data().Name);
                        });
                    }
                }
            }
        }

        return names;

    } catch(err) {
        console.error("Query error: ", err);
        return [];
    }
}

let people = [
    'Ellie G',
    'Jes B',
    'Frederique',
    'James D',
    'Paige S',
    'Varun V.',
    'Grace T',
    'Atticus T',
    'Ruth S',
    'Amelia C',
    'Nessa K',
    'Lauren K',
    'Callie L',
    'Lindsay H',
    'Hannah D',
    'Mindy Y',
    'Andie B',
    'Jo H',
    'Elisabeth K',
    'Brandon A',
    'Ellie A'
]

document.getElementById("submit-btn").addEventListener("click", async () => {
    const name = document.getElementById("name-select").value
    const id = people.indexOf(name) + 1;
    const relation = document.getElementById("relation-select").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "loading...";
    const names = await do_query(id, relation);
    resultsDiv.innerHTML = names.length
        ? names.map(name => `<p>${name}</p>`).join("")
        : "<p>No results.</p>";
});