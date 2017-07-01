import Firebase from 'firebase'
const config = {
	    apiKey: "AIzaSyAfpUvcqrYh8Pm6IIfBiTSBxC1mueNNk8E",
	    authDomain: "meal-plan-780da.firebaseapp.com",
	    databaseURL: "https://meal-plan-780da.firebaseio.com",
	    projectId: "meal-plan-780da",
	    storageBucket: "meal-plan-780da.appspot.com",
	    messagingSenderId: "273005513313"
	  };
const firebaseApp = Firebase.initializeApp(config);

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database();