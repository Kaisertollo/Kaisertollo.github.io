import firebase from "firebase/app";
import "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://DATABASE_NAME.firebaseio.com",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = firebase.database();

const dbRef = firebase.database().ref();
dbRef.child("users").child(userId).get().then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

class Paiement {
    constructor(date, montant, heure) {
      this.date = date;
      this.montant = montant;
      this.heure = heure;
    }
  }
  
  const paiements = [];
  
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
    
    // Clear the form
    form.reset();
    
    // Update the table
    updateTable();
    });
    
    function updateTable() {
    // Clear the table body
    paiementsTable.innerHTML = '';
    
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