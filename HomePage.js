import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { auth } from "./config.js";



onAuthStateChanged(auth, (user) => {
  if (user) {
    
    const uid = user.uid;
    console.log(uid);
   
  } else {
   window.location= "index.html"
  }
});


const button = document.querySelector(".LogOutBtn");
button.addEventListener('click' , ()=>{
  signOut(auth).then(() => {
      console.log('logout');
      window.location = 'index.html'
    }).catch((error) => {
      console.log(error);
    });
    
})