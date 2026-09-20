const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

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