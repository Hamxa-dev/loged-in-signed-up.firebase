import {
<<<<<<< HEAD
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  where,
=======
  onAuthStateChanged,signOut,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {collection,addDoc,getDocs,Timestamp,query,orderBy,deleteDoc,doc,updateDoc,where,
>>>>>>> 804d206d270f762d573319765258189da6610f27
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { auth, db } from "./config.js";

// Selecting elements from the DOM
const form = document.querySelector(".form");
const title = document.querySelector(".title");
const description = document.querySelector(".discription");
const container = document.querySelector(".container");
<<<<<<< HEAD
const logoutButton = document.querySelector(".LogOutBtn"); // Renamed to camelCase
=======
const LogOutBtn = document.querySelector(".LogOutBtn");
>>>>>>> 804d206d270f762d573319765258189da6610f27

// Array to store post data
let arry = [];

// Firebase authentication state change listener
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log("userUid ===>", uid);

    // Fetch user data from Firestore based on UID
<<<<<<< HEAD
    const userQuery = query(collection(db, "users"), where("uid", "==", uid));
    const userQuerySnapshot = await getDocs(userQuery);
    userQuerySnapshot.forEach((userDoc) => {
      console.log(userDoc.data());
      container.innerHTML = userDoc.data().name;
    });
  } else {
    // Redirect to the login page if the user is not authenticated
=======
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      container.innerHTML = doc.data().name;
    });
  } else {
    // Redirect to login page if user is not authenticated
>>>>>>> 804d206d270f762d573319765258189da6610f27
    window.location = "login.html";
  }
});

// Form submission event listener
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    // Create a post object
    const postObj = {
      title: title.value,
      description: description.value,
      uid: auth.currentUser.uid,
      postDate: Timestamp.fromDate(new Date()),
    };
    // Add the post to Firestore
    const docRef = await addDoc(collection(db, "posts"), postObj);
    console.log("Document written with ID: ", docRef.id);
    postObj.docId = docRef.id;
    // Add the post to the array and render posts
    arry = [postObj, ...arry];
    console.log(arry);
    renderPost();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});
<<<<<<< HEAD
=======

// Function to render posts in the UI
function renderPost() {
  container.innerHTML = "";
  arry.forEach((items) => {
    container.innerHTML += `
      <div class="main-container">
        <div class="container-body">
          <p><span class="h4">Title:</span>${items.title}</p>
          <p><span class="h4">Description:</span>${items.description}</p>
          <button type="button" onclick="deletePost('${items.docId}')" class="delete btn">Delete</button>
          <button type="button" onclick="updatePost('${items.docId}')" class="update btn">Edit</button>
        </div>
      </div>`;
  });

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      console.log("delete called", arry[index]);
      await deleteDoc(doc(db, "posts", arry[index].docId)).then(() => {
        console.log("post deleted");
        arry.splice(index, 1);
        renderPost();
      });
    });
  });

  // Add event listeners to update buttons
  const updateButtons = document.querySelectorAll(".update");
  updateButtons.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      console.log("update called", arry[index]);
      const updatedTitle = prompt("Enter new Title", arry[index].title);
      if (updatedTitle !== null && updatedTitle.trim() !== "") {
        await updateDoc(doc(db, "posts", arry[index].docId), {
          title: updatedTitle,
        });
        arry[index].title = updatedTitle;
        renderPost();
      }
    });
  });
}

// Initial rendering of posts
renderPost();

// Fetch data from Firestore and render posts
async function getDataFromFirestore() {
  arry.length = 0;
  const q = query(collection(db, "posts"), orderBy("postDate", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    arry.push({ ...doc.data(), docId: doc.id });
  });
  console.log(arry);
  renderPost();
}

// Fetch data on page load
getDataFromFirestore();

// Function to update a post
function updatePost(docId) {
  console.log(
    "update called",
    arry.find((item) => item.docId === docId)
  );
  const updatedTitle = prompt("Enter new Title");
  if (updatedTitle !== null) {
    updateDoc(doc(db, "posts", docId), { title: updatedTitle })
      .then(() => {
        console.log("post updated");
        const index = arry.findIndex((item) => item.docId === docId);
        arry[index].title = updatedTitle;
        renderPost();
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  }
}

// Logout button click 
>>>>>>> 804d206d270f762d573319765258189da6610f27

// Function to render posts in the UI
function renderPost() {
  container.innerHTML = ""; // Clear the container before rendering

  arry.forEach((items) => {
    container.innerHTML += `
      <div class="main-container">
        <div class="container-body">
          <p><span class="h4">Title:</span>${items.title}</p>
          <p><span class="h4">Description:</span>${items.description}</p>
          <button type="button" onclick="deletePost('${items.docId}')" class="delete btn">Delete</button>
          <button type="button" onclick="updatePost('${items.docId}')" class="update btn">Edit</button>
        </div>
      </div>`;
  });

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      console.log("delete called", arry[index]);
      await deleteDoc(doc(db, "posts", arry[index].docId));
      console.log("post deleted");
      arry.splice(index, 1);
      renderPost();
    });
  });

  // Add event listeners to update buttons
  const updateButtons = document.querySelectorAll(".update");
  updateButtons.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      console.log("update called", arry[index]);
      const updatedTitle = prompt("Enter new Title", arry[index].title);
      if (updatedTitle !== null && updatedTitle.trim() !== "") {
        await updateDoc(doc(db, "posts", arry[index].docId), {
          title: updatedTitle,
        });
        arry[index].title = updatedTitle;
        renderPost();
      }
    });
  });
}

// Initial rendering of posts
renderPost();

// Fetch data from Firestore and render posts
async function getDataFromFirestore() {
  arry.length = 0;
  const postQuery = query(collection(db, "posts"), orderBy("postDate", "desc"));
  const postQuerySnapshot = await getDocs(postQuery);
  postQuerySnapshot.forEach((postDoc) => {
    console.log(postDoc.data());
    arry.push({ ...postDoc.data(), docId: postDoc.id });
  });
  console.log(arry);
  renderPost();
}

// Fetch data on page load
getDataFromFirestore();

// Function to update a post
function updatePost(docId) {
  console.log(
    "update called",
    arry.find((item) => item.docId === docId)
  );
  const updatedTitle = prompt("Enter new Title");
  if (updatedTitle !== null) {
    updateDoc(doc(db, "posts", docId), { title: updatedTitle })
      .then(() => {
        console.log("post updated");
        const index = arry.findIndex((item) => item.docId === docId);
        arry[index].title = updatedTitle;
        renderPost();
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  }
}

// Logout button click
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("logout");
      window.location = "index(login).html";
    })
    .catch((error) => {
      console.error(error);
    });
});
