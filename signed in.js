
  import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
  import { auth } from "./config.js";
  
  const email = document.querySelector("#loginUserEmail");
  const password = document.querySelector("#loginPassword");
  const form = document.querySelector(".form");
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your successfully login",
        showConfirmButton: false,
        timer: 1500,
      });
        window.location = 'HomePage.html'
  })
  .catch((error) => {
  
    const errorMessage = error.message;
    console.log(errorMessage);
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email alredy in use",
        footer: '<a href="">Why do I have this issue?</a>',
      });
  });
   
  });
  