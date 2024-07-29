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
      userSignin_text.classList.add("d-none");
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
            window.location.href = "/interwood/index.html";
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

          window.location.href = "/interwood/index.html";
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


const signupBtn = document.getElementById('userSignup');

signupBtn.addEventListener('click', ()=>{
  console.log('button working')
  window.location.href = './auth/signup/signup.html'
})



const productsDiv = document.getElementById('productsDiv')

function skeleton(){
  for(var i = 0; i < 20; i++){
  const obj = `
              <div role="status" class="my-3 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 col-lg-3 col-md-4 col-sm-6 col-6 m-auto m-2border border-gray-200 rounded shadow animate-pulse dark:border-gray-700">
                <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                    <svg class="w-full h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                    </svg>
                </div>
                <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-50 mb-2.5"></div>
                <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-50 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div class="flex items-center">
                    <div>
                        <div class="h-8 bg-gray-200 rounded-2 dark:bg-gray-700 w-32 mb-2"></div>
                    </div>
                    <svg class="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiTtpTqjjp8K1QiIUZU_Xpq5sKAxBdBwKBsQ&s" fill="currentColor" viewBox="0 0 20 20">
                    </svg>
                </div>
                <span class="sr-only">Loading...</span>
            </div>
            `
            productsDiv.innerHTML += obj;
          }
          }

          skeleton()


          const slider = document.getElementById('slider');
          const minValue = document.getElementById('minValue');
          const maxValue = document.getElementById('maxValue');
          
          // Initialize noUiSlider
          noUiSlider.create(slider, {
              start: [40000, 200000 ],
              connect: true,
              range: {
                  'min': 0,
                  'max': 250000
              },
              step: 100,
              format: {
                  to: function (value) {
                      return Math.round(value * 100) / 100;
                  },
                  from: function (value) {
                      return value;
                  }
              }
          });
          
          // Update the input values on slider update
          slider.noUiSlider.on('update', function (values, handle) {
              if (handle === 0) {
                  minValue.value = values[0];
              } else {
                  maxValue.value = values[1];
              }
          });
          
          