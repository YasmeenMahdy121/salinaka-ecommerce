import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyA-kCjC4CspfA9whFfa9E5_XI_X9LXemdc",
    authDomain: "salinaka-e-commerce.firebaseapp.com",
    databaseURL: "https://salinaka-e-commerce-default-rtdb.firebaseio.com",
    projectId: "salinaka-e-commerce",
    storageBucket: "salinaka-e-commerce.appspot.com",
    messagingSenderId: "311595019446",
    appId: "1:311595019446:web:ebcfbcd5de5cc397fe4a17",
    measurementId: "G-58FH5V4ZMB"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

