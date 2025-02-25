//Loading Firebase SDK into the app
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase,
    ref,
    push,
    onValue,
    remove
 } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el")

onValue(referenceInDB, function(snapshot){
    const snapshotValues = snapshot.val()
    const leads = Object.values(snapshotValues)
    console.log(leads)
    render(leads)
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}
 
deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    //pushing user input into referenced firebase database
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})
