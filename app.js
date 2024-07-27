import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  getDoc,
  getDocs,
  collection,
  doc,
  db,
} from "./auth/utils/utils.js";

const userSignin_text = document.getElementById("userSignin_text");
const userSignin_icon = document.getElementById("userSignin_icon");
const emailId = document.getElementById("emailId");
const userName = document.getElementById("userName");
const addProduct = document.getElementById("addProduct");

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (user !== null) {
      console.log("User Loged in");
      const uid = user.uid;
      userSignin_text.classList.remove("block");
      userSignin_text.classList.add("hidden");
      userSignin_icon.classList.remove("hidden");
      userSignin_icon.classList.add("flex");
      emailId.innerText = user.email;

      const docRef = doc(db, "users", uid);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            // console.log(data)
            userName.innerText = data.displayName;
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });

      let signOutBtn = document.getElementById("signOutBtn");
      signOutBtn.addEventListener("click", () => {
        signOut(auth)
          .then(() => {
            console.log("Sign-out successful");
            window.location.href = "/";
          })
          .catch((error) => {
            // An error happened.
          });
      });
    }
  } else {
    console.log("user not Available");
    userSignin_text.classList.remove("hidden");
    userSignin_text.classList.add("block");
    userSignin_icon.classList.remove("flex");
    userSignin_icon.classList.add("hidden");

    const signInForm = document.getElementById("signinForm");

    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("button working");
      const userInfo = {
        email: e.target[0].value,
        password: e.target[1].value,
      };

      signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user Signed in");

          window.location.href = "/";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    });
  }
});

addProduct.addEventListener("click", () => {
  window.location.href = "./admin/addproduct/addproduct.html";
});

const categories = [
  "new-arrivals",
  "bedroom",
  "living",
  "study",
  "kids",
  "dining",
  "decor",
  "office",
  "kitchen",
  "doors",
  "wardrobes",
  "part-sale"
];

const subcategories = {
  "new-arrivals": ["furniture", "decor"],
  "bedroom": ["bed sets", "storage", "furniture", "accessories"],
  "living": ["sofas", "tables", "storage", "decor"],
  "study": ["storage", "study", "decor"],
  "kids": ["kids", "decor", "storage"],
  "dining": ["furniture", "tableware", "decor"],
  "decor": ["wall art", "lighting", "accents"],
  "office": ["furniture", "storage", "accessories"],
  "kitchen": ["appliances", "furniture"],
  "doors": ["entry", "interior", "specialty"],
  "wardrobes": ["types", "accessories"],
  "part-sale": ["clearance", "seasonal", "promotions"]
};

const items = {
  "furniture": ["armoire", "vanity", "mirror", "desk", "chair", "bookshelf"],
  "decor": ["rug", "lamp", "wall art", "plant", "wall decals", "clock"],
  "bed sets": ["bed", "headboard", "bed frame"],
  "storage": ["wardrobe", "nightstand", "dresser", "file cabinet", "bookshelf", "closet"],
  "accessories": ["side table", "dressing table", "cloth stand", "organizer", "mouse pad", "lamp"],
  "sofas": ["sofa", "recliner", "loveseat"],
  "tables": ["coffee table", "side table", "console table", "dining table", "office desk", "kitchen table"],
  "tableware": ["plates", "cutlery", "glasses", "cups", "bowls", "serving dishes"],
  "wall art": ["painting", "poster", "mirror"],
  "lighting": ["lamp", "chandelier", "sconce", "table lamp", "floor lamp", "pendant light"],
  "accents": ["vase", "sculpture", "clock", "figurine", "tray", "bookend"],
  "appliances": ["fridge", "oven", "microwave", "dishwasher", "toaster", "blender"],
  "cabinets": ["upper cabinets", "lower cabinets", "pantry"],
  "entry": ["front door", "back door", "screen door"],
  "interior": ["bedroom door", "bathroom door", "closet door"],
  "specialty": ["sliding door", "barn door", "french door"],
  "types": ["sliding wardrobe", "walk-in wardrobe", "mirror wardrobe"],
  "clearance": ["item on sale 1", "item on sale 2", "item on sale 3"],
  "seasonal": ["holiday sale", "summer sale", "winter sale"],
  "promotions": ["buy one get one", "discounted bundles", "flash sale"],
  "kids": ["bunk bed", "kids desk", "toy storage", "bookshelf", "wall decals", "rug"],
  "study": ["desk", "chair", "bookshelf", "file cabinet", "storage bin", "organizer"]
};



let navDisplay = document.getElementById("navitems");
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("mouseover", function (event) {
    let targetedItem = event.target.id;
    if (categories.includes(targetedItem)) {
      navDisplay.style.display = "flex";
      // console.log(subcategories[targetedItem]);
      // console.log(targetedItem);

      navDisplay.innerHTML = "";
      let obj = `       
      <div class="list d-flex flex-row flex-wrap">
        ${subcategories[targetedItem]
          .map(
            (subItem) => `
            <div class="navList d-flex flex-column gap-2">
              <h6>${subItem}</h6>
              <ul class="m-0 p-0 d-flex flex-column gap-2">
                ${items[subItem]
                  .map((allItems) => `<li><a href="#">${allItems}</a></li>`)
                  .join("")}
              </ul>
            </div>`
          )
          .join("")}
      </div>
      <div class="navbarImg">
        <img src="./images/navbar/${targetedItem}.avif" alt="">
      </div>`;

      navDisplay.innerHTML += obj;
    }
  });
});

if (navDisplay) {
  navDisplay.addEventListener("mouseout", function () {
    this.style.display = "none";
  });

  navDisplay.addEventListener("mouseover", function () {
    this.style.display = "flex";
  });
}

const likeBtn = document.getElementById("likeBtn");

document.addEventListener("click", (event) => {
  if (event.target.id == "likeBtn") {
    const likeButton = event.target;
    if (likeButton.className === "fa-regular fa-heart") {
      likeButton.className = "fa-solid fa-heart";
      likeButton.style.color = '#EDD920';
    } else {
      likeButton.className = "fa-regular fa-heart";
      likeButton.style.color = '#7E7067';
    }
  }
});










export {}