//Loaidng environment variable
require('dotenv').config()
//Loading Firebase SDK into the app
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase,
    ref,
    push
 } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";


const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-7acd6-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el")

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
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    //pushing user input into referenced firebase database
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})
