import firebase from 'firebase';
import firebaseConfig from './config/firebaseConfig';


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const providerFacebook = new firebase.auth.FacebookAuthProvider();
//providerFacebook.addScope('public_profile, email, gender, user_birthday');

export { auth, provider, providerFacebook };
export default db;

