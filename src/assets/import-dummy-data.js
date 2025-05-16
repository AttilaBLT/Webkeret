const admin = require('firebase-admin');
const fs = require('fs');

// Service account kulcs beolvasása
const serviceAccount = require('./webkeret-idopontfoglalas-firebase-adminsdk-fbsvc-b39c0cd8ff.json');

// Firebase inicializálása
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Dummy adat beolvasása
const data = JSON.parse(fs.readFileSync('./dummy-data.json', 'utf8'));

// Kollekciók feltöltése
async function importCollection(collectionName, items) {
  for (const item of items) {
    // Ha van id, azt használjuk dokumentum ID-nak, különben automatikus
    const docRef = item.id ? db.collection(collectionName).doc(item.id.toString()) : db.collection(collectionName).doc();
    await docRef.set(item);
    console.log(`Feltöltve: ${collectionName}/${item.id || docRef.id}`);
  }
}

async function run() {
  await importCollection('users', data.users);
  await importCollection('appointments', data.appointments);
  await importCollection('devices', data.devices);
  await importCollection('serviceTypes', data.serviceTypes);
  console.log('Minden adat feltöltve!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});