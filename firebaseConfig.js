{
  /*import * as firebase from "firebase/app";
import "firebase/analytics";
 */
}
const firebaseConfig = {
  // Replace with your own Firebase config object
  apiKey: "AIzaSyDOnkaYvB1OJnC1NUPT5KQqSdVq8fvxTQg",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "fpn-food",
  appId: "1:882862973689:android:12d2fe19d91a42d880b828",
  measurementId: "YOUR_MEASUREMENT_ID",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
