let firebaseConfig = {
    // Enter your firebase credentials
    apiKey: "AIzaSyB-BWVKZPRgxjdaAYsb-7J1eqQPiWft50s",
    authDomain: "task-swio.firebaseapp.com",
    projectId: "task-swio",
    storageBucket: "task-swio.appspot.com",
    messagingSenderId: "730438407791",
    appId: "1:730438407791:web:8f4b798370d03b11409f9a"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();