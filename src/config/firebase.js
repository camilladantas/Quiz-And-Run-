const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

// Lê a variável de ambiente do servidor, ou o arquivo local caso esteja testando no Pop!_OS
let serviceAccount;
if (process.env.FIREBASE_CREDENTIALS) {
    serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
} else {
    serviceAccount = require('../../firebase-credentials.json');
}

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
module.exports = db;