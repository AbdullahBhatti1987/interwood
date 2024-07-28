import {
  auth,
  createUserWithEmailAndPassword,
  collection,
  db,
  doc,
  setDoc,

} from "../utils/utils.js";

const signupForm = document.getElementById("signupForm");
var signupUserButton = document.getElementById("signupUserBtn");
var cancelForm = document.getElementById("cancleForm");




signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  signupUserButton.innerText = 'Waiting...';
  signupUserButton.style.opacity = '0.8';
  cancelForm.style.opacity = '0.8';
  signupUserButton.disabled = true;
  cancelForm.disabled = true;

  if (e.target[1].value !== e.target[2].value) {
    console.log("Passwords do not match.");
    e.target[1].value = "";
    e.target[2].value = "";
    return;
  } else {
    const email = e.target[0].value;
    const password = e.target[1].value;
    const displayName = e.target[3].value+ ' ' + e.target[4].value;
    const userAddress = e.target[5].value;
    const userCity = e.target[6].value;
    const phoneNumber = e.target[7].value;
    const postalCode = e.target[8].value;

    let userInfo = {
      email,
      password,
      displayName,
      userAddress,
      userCity,
      phoneNumber,
      postalCode,
    };

    createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then((userCredential) => {
        console.log("User signed up successfully.");
        const user = userCredential.user;
        const usersDbRef = doc(db, "users", user.uid);
        
        setDoc(usersDbRef, userInfo)
          .then(() => {
            console.log("User data successfully saved to the database.");
            window.location.href = "/interwood/index.html";
          })
          .catch((error) => {
            console.error("Error saving user data to the database:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing up user:", errorCode, errorMessage);
      });
  }
  signupUserButton.disabled = false;
  signupUserButton.innerText = 'Submit';
  cancelForm.disabled = false;

});

let homePage = document.getElementById("homePage");

homePage.addEventListener("click", () => {
  window.location.href = "/interwood/index.html";
});



cancelForm.addEventListener("click", () => {
  window.location.href = "/interwood/index.html";
});
