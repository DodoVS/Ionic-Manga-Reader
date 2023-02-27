// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function  loginUser(email: string, password: string) {
    try{
        const res = await signInWithEmailAndPassword(auth, email, password);
        return true;
    }catch(error){
        return false;
    }
}

export async function registerUser(email: string, password: string) {
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        return true;
    }catch(error){
        return false;
    }
}

export function getCurrentUser() {
    return new Promise((resolve, reject)=>{
        const unsubscribe = auth.onAuthStateChanged(function(user){
            if(user){
                resolve(user);
            }else{
                resolve(null);
            }
            unsubscribe()
        })
    });
}

export function logOut(){
    return auth.signOut();
}
