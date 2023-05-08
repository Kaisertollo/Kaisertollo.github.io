    class Paiement {
    constructor(date, montant, heure) {
      this.date = date;
      this.montant = montant;
      this.heure = heure;
    }
  }
  let fff = "4"
    // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
  import { getDatabase, ref, push,child, get ,set} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBNdNdVWfBGJ5haN5hjLPjtz8jMwI4P9lo",
    authDomain: "mekka-project.firebaseapp.com",
    databaseURL: "https://mekka-project-default-rtdb.firebaseio.com",
    projectId: "mekka-project",
    storageBucket: "mekka-project.appspot.com",
    messagingSenderId: "895649364100",
    appId: "1:895649364100:web:7374f65515be66d538ead1",
    measurementId: "G-EQZYWNDHK9"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(app);
  const dbRef = ref(getDatabase());
  const paiements = [];
  get(child(dbRef, `posts/`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    let list = snapshot.val()
    for (const key in list) {
  if (list.hasOwnProperty(key)) {
    console.log(key);
    let p = list[key]
    console.log(p);
    paiements.push(new Paiement(p["date"], p["montant"], p["heure"]))
    updateTable()

  }
}
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


  
  
  
  const form = document.querySelector('form');
  const paiementsTable = document.querySelector('#paiementsTable tbody');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const date = document.querySelector('#date').value;
    const montant = document.querySelector('#montant').value;
    const heure = document.querySelector('#heure').value;

    // Create a new Paiement object
    const paiement = new Paiement(date, montant, heure);
    
    // Add the paiement to the array
    paiements.push(paiement);
  // Create a new post reference with an auto-generated id
  const db = getDatabase();
  const paiementRef = ref(db, 'posts');
  const newPaiementRef = push(paiementRef);
  set(newPaiementRef, paiement);
    // Clear the form
    form.reset();
    
    // Update the table
    updateTable();
    });
    
    function updateTable() {
    // Clear the table body
    paiementsTable.innerHTML = '';
    console.log(paiements)
    // Loop through the paiements array and add each one to the table
    paiements.forEach((paiement) => {
    const tr = document.createElement('tr');
    
    const dateTd = document.createElement('td');
    dateTd.textContent = paiement.date;
    tr.appendChild(dateTd);
    
    const montantTd = document.createElement('td');
    montantTd.textContent = paiement.montant;
    tr.appendChild(montantTd);
    
    const heureTd = document.createElement('td');
    heureTd.textContent = paiement.heure;
    tr.appendChild(heureTd);
    
    paiementsTable.appendChild(tr);
    });
    }
    
    // Call the updateTable function to initialize the table
    updateTable();      
  