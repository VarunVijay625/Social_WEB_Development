const people =[]
//Function loadDropIndex takes the empty "people" array and reads the database's names and populates it bases on that
async function loadDropIndex(){
    const snapshot = await db.collection("Local Web").get();
    //read all documents and extract name to push onto 'people' array
    snapshot.forEach(doc => {
        const data = doc.data();
        people.push({ id: data["Unique ID"], name: data.Name });
    });
    //create amalgam of option blocks to set innerhtml to equal based on people
    var optionHTML = "";
    for (var i = 0; i < people.length; i++) {
    optionHTML += `<option value="${people[i].name}">${people[i].name}</option>`;
    }

    const name_dropdown = document.getElementById("names");
    if (name_dropdown) {
        name_dropdown.innerHTML = optionHTML;
    }
    // option for second dropdown of names
    const name_dropdown_2 = document.getElementById("names_2");
    console.log(name_dropdown_2);
    if (name_dropdown_2) {
        name_dropdown_2.innerHTML = optionHTML;
    }
    // option for third dropdown of names
    const name_dropdown_3 = document.getElementById("names_3");
    if (name_dropdown_3) {
        name_dropdown_3.innerHTML = optionHTML;
    }
    const name_dropdown_4 = document.getElementById("names_4");
    if (name_dropdown_4) {
        name_dropdown_4.innerHTML = optionHTML;
    }
}

// function returnOptions() {
//     var optionHTML = "";
//     for (var i = 0; i < people.length; i++) {
//     optionHTML += `<option value="${people[i].name}">${people[i].name}</option>`;
//     }
//     optionHTML += `<option value="My name is not listed">My name is not listed</option>`;
//     return optionHTML;
// }

//const app = firebase.initializeApp(firebaseConfig);
//const db = firebase.firestore();

// A function that queries the database for people who have a specific relationship with a specific person
// example: if the user selects "Jes B" and "Friend" do_query will return the friends of Jes B

// A function that queries the database for people who have a specific relationship with a specific person
// example: if the user selects "Jes B" and "Friend" do_query will return the friends of Jes B


// function that takes the name of the user and gets the unique document id for that user (different than id field)
async function get_id_wname(name) {
    try {
        const webRef = db.collection("Local Web");
        const snapshot = await webRef.get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }
        let id_for_name = null;
        snapshot.forEach(doc => {
            if (doc.data().Name === name) {
                id_for_name = doc.id;
            }
        });
        return id_for_name;
    } catch (err) {
        console.error("Query error: ", err);
        return [];
    }
}
// This funcion checks if the name of the person already exist in the web
async function name_exists(name) {
    try {
        const webRef = db.collection("Local Web");
        const snapshot = await webRef.get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }
        let name_found = false;
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.Name === name) {
                name_found = true;
            }
            if (name_found) {
                console.log("Already in the web");
            } else {
                return name;
            }

        });
    }
    catch (err){
        console.error("Query error", err);
    }
}

// function that adds or removes relationship
async function add_remove_relationship(name1, name2, relation, action) {
    try {
        let name1_id = await get_id_wname(name1);
        let name2_id = await get_id_wname(name2);
        const name1Ref = db.collection("Local Web").doc(name1_id);
        const name2Ref = db.collection("Local Web").doc(name2_id);
        const name1Snap = await name1Ref.get();
        const name2Snap = await name2Ref.get();
        const name1Unique = name1Snap.data()["Unique ID"];
        const name2Unique = name2Snap.data()["Unique ID"];
        console.log(name1_id);
        if(action === "add") {
            console.log("added?")
            await name1Ref.update({
                [relation]: firebase.firestore.FieldValue.arrayUnion(name2Unique)
            });
            await name2Ref.update({
                [relation]: firebase.firestore.FieldValue.arrayUnion(name1Unique)
            });
        }
        else {
            await name1Ref.update({
                [relation]: firebase.firestore.FieldValue.arrayRemove(name2Unique)
            });
            await name2Ref.update({
                [relation]: firebase.firestore.FieldValue.arrayRemove(name1Unique)
            });
        }
        return name1;

    } catch (err) {
        console.error("Query error: ", err);
        return [];
    }
}

// A function that "handles login" by checking if the username and password entered matches the ones in the dataset
// If the username and password are in the database, the user will log in successfully
// If not in the database, the user will be redirected to the create_account page

async function login_page(user, pass) {
    try {
        const webRef = db.collection("Local Web");
        const snapshot = await webRef.get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }
        let user_found = false;
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.Username === user && data.Password === pass) {
                user_found = true;
            }
            if (user_found) {
                window.location.replace("index.html");
            } else {
               document.getElementById("error").innerHTML = "Invalid credentials,you are now being redirected to create an account.";

               setTimeout(() =>
                {
                    window.location.replace("create_acct.html");
                }, 5000)
            }

        });
    }
    catch (err){
        console.error("Query error", err);
    }
}

const login_form = document.getElementById("login_page")
if (login_form) {
    login_form.addEventListener("submit", async (page) => {
        page.preventDefault();
        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;
        login_page(user,pass);
    });
}

// function that gets the ids of a new person to be added to the database
// index 0 is the document id and index 1 is the unique id used as one of the fields
async function new_person_id() {
    try {
        const ids = [];
        const webRef = db.collection("Local Web");
        const snapshot = await webRef.get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }
        const user_ids = [];
        const unique_ids = [];
        snapshot.forEach(doc => {
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
        ids.push(new_user_id, new_id);
        return ids;
    } catch (err) {
        console.error("Query error: ", err);
        return [];
    }
}

// A function that "creates an account" for the user when the user's name is not already in the database
// This function creates a new document in the firestore with the username, password, and name provided by the user and empty relationship arrays
async function create_account_wo_name(user, pass, name) {
    try {
        const ids = await new_person_id();
        console.log(ids);
        const new_user_id = ids[0];
        console.log(new_user_id);
        const new_id = ids[1];
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
        await db.collection('Local Web').doc(new_user_id).set(new_acct_info)

        return new_acct_info;
    } catch (err) {
        console.error("Query error: ", err);
        return [];
    }
}
// this function adds a person to the database with a name and a unique id leaving the others fields empty
async function add_person(name){
    try {
        const name_found = await name_exists(name)
        if (name_found){
            console.log("This name is already in the web")
        }
        const highest_id = await new_person_id();
        console.log(highest_id);
        const new_user_id = highest_id[0];
        console.log(new_person_id);
        const new_id = highest_id[1];
        const person_added = {
            Coworker: [],
            Dating: [],
            Friend: [],
            ["Have Met"]: [],
            Name: name || null,
            Password: "",
            Roommate: [],
            ["Secret 3rd"]: [],
            Supervisor: [],
            Teammate: [],
            ["Unique ID"]: new_id,
            Username: ""
        };
        await db.collection('Local Web').doc(new_user_id).set(person_added);

        console.log( name, "was added successfully");

        return person_added;
    } catch (err) {
        console.error("Query error: ", err);
        return [];
    }
}
async function ChangeEnabled(){
    const selectedValue = document.querySelector('input[name="choice"]:checked').value;
    if(selectedValue == "remove"){
        document.getElementById("myInput").disabled = true;
        document.getElementById("names").disabled = false;
    }
    else{
       document.getElementById("myInput").disabled = false;
       document.getElementById("names").disabled = true; 
    }
}
function returnOptions() {
    var optionHTML = "";
    for (var i = 0; i < people.length; i++) {
    optionHTML += `<option value="${people[i].name}">${people[i].name}</option>`;
    }
    optionHTML += `<option value="My name is not listed">My name is not listed</option>`;
    return optionHTML;
}
// function that removes people from the database
async function remove_person(name){
    try {
        const removing_name = await get_id_wname(name)
        await db.collection('Local Web').doc(removing_name).delete();

    } catch (err) {
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
        let id_for_name = await get_id_wname(name);
        const docRef = await webRef.doc(id_for_name);
        const docSnap = await docRef.get();
        const existing_user = await docSnap.data().Username;
        const existing_pass = await docSnap.data().Password;
        if (existing_user === "" && existing_pass === "") {
            await docRef.update({Username: user});
            await docRef.update({Password: pass});
            return name;
        } else {
            return "Account already exists";
        }
    } catch (err) {
        console.error("Query error: ", err);
        return [];
    }
}

function myFunction() {
    document.getElementById("create-login").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.drop-btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Display do_query results on index.html
// const submit_btn = document.getElementById("submit-btn")
// if (submit_btn) {
//     submit_btn.addEventListener("click", async () => {
//         const name = document.getElementById("names").value
//         let id = null;
//         let index = 0;
//         for (const p of people) {
//             if (p.name === name) {
//                 id = people[index].id;
//             }
//             index += 1;
//         }
//         const relation = document.getElementById("relation-select").value;
//         const resultsDiv = document.getElementById("results");
//         resultsDiv.innerHTML = "loading...";
//         console.log(people);
//         const names = await do_query(id, relation);
//         console.log(names);
//         resultsDiv.innerHTML = names.length
//             ? names.map(name => `<p>${name}</p>`).join("")
//             : "<p>No results.</p>";
//     });
// }

// add/remove relationships
const relation_submit = document.getElementById("relation-submit-btn");
if (relation_submit) {
    relation_submit.addEventListener("click", async () => {
        const name1 = document.getElementById("names_2").value;
        const name2 = document.getElementById("names_3").value;
        const relation = document.getElementById("relationship").value;
        const action = document.getElementById("add-or-remove").value;
        await add_remove_relationship(name1, name2, relation, action);
        const doneDiv = document.getElementById("done-remove");
        doneDiv.innerHTML = "Done! Add or remove more relationships if you want";
    });
}
// add/ remove people button
const submit_btn_add_remove = document.getElementById("submit-btn-people");
const add = document.getElementById("add");
const remove = document.getElementById("remove");
console.log(add);
console.log(remove);
if (submit_btn_add_remove) {
    submit_btn_add_remove.addEventListener("click", async () => {
        if (add.checked) {
            const name = document.getElementById("myInput").value
            console.log(name)
            await add_person(name);
            name.innerHTML = (name, "was added successfully")

            alert(name +" was added successfully");
        }
        if (remove.checked) {
            const name = document.getElementById("names_2").value
            console.log(name)
            console.log("removed")
            await remove_person(name);
            name.innerHTML = (name, "was removed successfully")
            alert(name +" was removed successfully");

        }
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
                const dropdown_name = document.getElementById("names").value;
                const infoDiv = document.getElementById("login-info");
                infoDiv.innerHTML = "loading...";
                // eslint-disable-next-line no-useless-assignment
                let infos = null;
                if (dropdown_name === "My name is not listed") {
                    infos = await create_account_wo_name(user, pass, name);
                } else {
                    infos = await create_account_w_name(user, pass, dropdown_name);
                }
                console.log(infos);
                if (infos !== "Account already exists") {
                    infoDiv.innerHTML = '<h1>Your Account Info:</h1>' +
                        `<p>name: ${name}</p>` +
                        `<p>username: ${user}</p>` +
                        `<p>password: ${pass}</p>` +
                        `<a href="index.html" class="button-link">Go To Da Web</a>`;
                } else {
                    infoDiv.innerHTML = '<p1 id="error">Account already exists. Try again or' +
                    `<br>` +
                    `<a href="login.html" class="button-link">Login</a>`;
                }
            });
        }