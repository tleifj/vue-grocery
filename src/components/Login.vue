<template>
	<div class="col-xs-12">
		<h1>Login</h1>
		<button @click="socialLogin">Log in with Google</button>
	</div>
</template>

<script>
    import firebase from "firebase";
    export default {
        methods: {
            socialLogin() {
                const provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth()
                .signInWithPopup(provider)
                .then((result) => {
                    const credential = result.credential;

                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    console.log(user);
                    // ...
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            }
        }
    }
</script>

<style lang="scss">
.login {
    h1 {
        color: black;
    }
}
</style>