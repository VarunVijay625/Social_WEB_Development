const firebaseConfig = {
    apiKey: "AIzaSyDP7snJVxhiQSQs7Z8CzGA9uvk5qdLkJhQ",
    authDomain: "social-web-dev.firebaseapp.com",
    projectId: "social-web-dev",
    storageBucket: "social-web-dev.firebasestorage.app",
    messagingSenderId: "621332128804",
    appId: "1:621332128804:web:94424f8ba5b97549fbe4b1",
    measurementId: "G-S0J91M5KEQ"
};
// test
// Initialize Cloud Firestore

//FIXED: NO MORE HARDCODING
const people = [];
const accts =[]
async function loadDropIndex(people){
    const snapshot = await db.collection("Local Web").get();
    snapshot.forEach(doc => {
        const data = doc.data();
        people.push({ id: data["Unique ID"], name: data.Name });
    });
    var optionHTML = "";
    for (var i = 0; i < people.length; i++) {
    optionHTML += `<option value="${people[i].name}">${people[i].name}</option>`;
    }
    document.getElementById("names").innerHTML = optionHTML;
}
async function loadDropAcct(people){
    console.log(people)
        const snapshot = await db.collection("Local Web").get();
    snapshot.forEach(doc => {
        const data = doc.data();
        people.push({ id: data["Unique ID"], name: data.Name });
    });
    console.log(people)
    var optionHTML = "";
    for (var i = 0; i < people.length; i++) {
    optionHTML += `<option value="${people[i].name}">${people[i].name}</option>`;
    }
    optionHTML += `<option value ="Not Listed">My name is not listed</option>`
    document.getElementById("choice-nam-select").innerHTML = optionHTML;
}

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// A function that queries the database for people who have a specific relationship with a specific person
// example: if the user selects "Jes B" and "Friend" do_query will return the friends of Jes B
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

// A function that "creates an account" for the user when the user's name is not already in the database
// This function creates a new document in the firestore with the username, password, and name provided by the user and empty relationship arrays
async function create_account_wo_name(user, pass, name) {
    try {
        const webRef = db.collection("Local Web");
        const snapshot = await webRef.get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }
        const user_ids = [];
        const unique_ids = [];
        snapshot.forEach(doc =>{
            user_ids.push(Number(doc.id));
            unique_ids.push(Number(doc.data()["Unique ID"]));
            console.log(doc.id, '=>', doc.data()["Unique ID"]);
        });
        const max_user_id = Math.max(...user_ids);
        console.log(max_user_id)
        const max_unique_id = Math.max(...unique_ids);
        console.log(max_unique_id)
        const new_id = max_unique_id + 1;
        const new_user_id = "00" + String(max_user_id + 1);
        const new_acct_info = {
            Coworker: [],
            Dating: [],
            Friend: [],
            ["Have Met"]: [],
            Name: name,
            Password: pass,
            Roommate: [],
            ["Secret 3rd"]: [],
            Supervisor: [],
            Teammate: [],
            ["Unique ID"]: new_id,
            Username: user
        };
        const res = await db.collection('Local Web').doc(new_user_id).set(new_acct_info)

        return new_acct_info;
    } catch(err) {
        console.error("Query error: ", err);
        return [];
    }
}

// A function that "creates an account" for the user when the user's name does not exist in the database
// this edits the Password and Username field for an existing document
async function create_account_w_name(user, pass, name) {
    try {
        const webRef = db.collection("Local Web");
        const snapshot = await webRef.get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }
        let id_for_name = null;
        snapshot.forEach(doc =>{
            if (doc.data().Name == name) {
                id_for_name = doc.id;
            }
        });
        const update_user = await webRef.doc(id_for_name).update({Username: user});
        const update_pass = await webRef.doc(id_for_name).update({Password: pass});
        return name;
    } catch(err) {
        console.error("Query error: ", err);
        return [];
    }
}

let people = [
    'Ellie G',
    'Jes B',
    'Frederique N',
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

// Display do_query results on index.html
const submit_btn = document.getElementById("submit-btn")
if (submit_btn) {
    submit_btn.addEventListener("click", async () => {
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
}

// Create an account using either of the create account functions
const create_account_form = document.getElementById("account-info")
if (create_account_form) {
    create_account_form.addEventListener("submit", async (page) => {
        page.preventDefault();
        const user = document.getElementById("account-info").elements[1].value;
        const name = document.getElementById("account-info").elements[0].value;
        const pass = document.getElementById("account-info").elements[2].value;
        const dropdown_name = document.getElementById("choice-name-select").value;
        const infoDiv = document.getElementById("login-info");
        infoDiv.innerHTML = "loading...";
        if (dropdown_name == "My name is not listed") {
            const infos = await create_account_wo_name(user, pass, name);
        }
        else {
            const infos = await create_account_w_name(user, pass, dropdown_name);
        }
        infoDiv.innerHTML = '<h1>Does this look correct?</h1>' +
            `<p>name: ${name}</p>` +
            `<p>username: ${user}</p>` +
            `<p>password: ${pass}</p>` +
            `<a href="index.html" class="button-link">Yes</a>`
    });
}
loadDropIndex(people)
loadDropAcct(accts)