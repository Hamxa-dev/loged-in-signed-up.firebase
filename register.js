import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {collection,addDoc,} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js"; 
import { auth, db } from "./config.js";


const email = document.querySelector("#signupUserEmail");
const password = document.querySelector("#signupPassword");
const form = document.querySelector(".form");
const name = document.querySelector(".name");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;

      console.log(user);

      // Add the user data to Firestoref
      return addDoc(collection(db, "user"), {
        name: name.value,
        email: email.value,
        uid: user.uid,
      });
    })
    .then(() => {
      // Display success message
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "You're successfully signed up",
        showConfirmButton: false,
        timer: 1500,
      });

      // Clear input fields
      password.value = "";
      email.value = "";
      name.value = "";

      // Delay the redirection to the login page for 1 second
      setTimeout(() => {
        window.location = "index(login).html";
      }, 1000);
    })
    .catch((error) => {
     
      const errorMessage = error.message;

      // Display error message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email already in use",
        footer: '<a href="">Why do I have this issue?</a>',
      });

      console.error(errorMessage);
    });
});
