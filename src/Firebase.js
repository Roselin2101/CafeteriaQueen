import firebase from "firebase/app"
import "firebase/firestore"

 const firebaseConfig = {
    apiKey: "AIzaSyBodNMQGyKHvsOPKJU0SZJqhTmLafZlQz8",
    authDomain: "proyecto-bq.firebaseapp.com",
    databaseURL: "https://proyecto-bq.firebaseio.com",
    projectId: "proyecto-bq",
    storageBucket: "proyecto-bq.appspot.com",
    messagingSenderId: "683557347317",
    appId: "1:683557347317:web:29baf6f99814461f7d4abc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default  {firebase}
