// import {
//   db,
//   doc,
//   getDoc,
//   getDocs,
//   collection,
// } from "../../auth/utils/utils.js";

// const productsDiv = document.getElementById("productsDiv");
// const collectionRef = collection(db, "products");

// async function getProducts() {
//   const querySnapshot = await getDocs(collection(db, "products"));
//   productsDiv.innerHTML = "";
//   querySnapshot.forEach((doc) => {
//     // Get the data object
//     const data = doc.data();

//     // Access specific fields
//     // console.log(`ID: ${doc.id}`);

//     // <div class="image"><img src="${data.mainImageUrl}" /></div>
//     // ${data.newPrice <= 25000? `<span class="newarrivalstag"><img src="./images/newarrivals/newarrivals.svg" alt="NewArrivals Tag"></span>` : ""}
//     const card = `            
//             <div class="card flex-column justify-content-between" id="card">
//                 ${data.discountPercentage? `<span class="discounttag">${Math.round(data.discountPercentage)}% OFF</span>` : ""}
//                 ${data.newPrice <= 30000 ? `<span class="newarrivalstag"><img src="./images/newarrivals/newarrivals.svg" alt="NewArrivals Tag"></span>` : ''}
//                 <div class="image">${data.mainImageUrl? `<img src="${data.mainImageUrl}"/>` : `<img src="${data.imageUrls[0]}"/>`}
//             </div>
//             <div class="card-info">
//                 <h4 >${data.productName}</h4>
//                 <h5 class="newprice">Rs.${data.newPrice}</h5>
//                 ${data.oldPrice? `<h6 class="oldprice"><s class="text-danger">Rs.${data.oldPrice}</s></h6>`: ""}                    
//                 <p class="description" style="length : 50">${data.description}</p>
//                 <div class="card-actions d-flex justify-content-around align-content-center">
//                     <button class="add-to-cart" data-id="${doc.id}">Add to Cart</button>
//                     <span class="likeBtn"><i class="fa-regular fa-heart" id="likeBtn"></i></span>
//                 </div>
//             </div>                 
//         `;
//     productsDiv.innerHTML += card;
//   });
  
// }

// getProducts();



import { db, collection, getDocs } from "../../auth/utils/utils.js";

const productsDiv = document.getElementById("productsDiv");
const collectionRef = collection(db, "products");

async function getProducts() {
  try {
    const querySnapshot = await getDocs(collectionRef);
    productsDiv.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const card = `            
                <div class="card flex-column justify-content-between col-xl-3 col-lg-3 cold-md-4 col-sm-6 col-6" id="card">
                      ${data.discountPercentage? `<span class="discounttag">${Math.round(data.discountPercentage)}% OFF</span>` : ""}
                      ${data.newPrice <= 30000 ? `<span class="newarrivalstag"><img src="./images/newarrivals/newarrivals.svg" alt="NewArrivals Tag"></span>` : ''}
                      <div class="image">${data.mainImageUrl? `<img src="${data.mainImageUrl}"/>` : `<img src="${data.imageUrls[0]}"/>`}
                      </div>
                    <div class="card-info">
                      <h4 >${data.productName}</h4>
                      <h5 class="newprice">Rs.${data.newPrice}</h5>
                      ${data.oldPrice? `<h6 class="oldprice"><s class="text-danger">Rs.${data.oldPrice}</s></h6>`: ""}                    
                      <p class="description" style="length : 50">${data.description}</p>
                        <div class="card-actions d-flex justify-content-between align-content-center">
                            <button class="add-to-cart" data-id="${doc.id}">Add to Cart</button>
                            <span class="likeBtn"><i class="fa-regular fa-heart" id="likeBtn"></i></span>
                        </div>
                    </div>                 
                </div>                 
              `;
              productsDiv.innerHTML += card;

    });
  } catch (error) {
    console.error("Error fetching products: ", error);
    productsDiv.innerHTML = "<p>Failed to load products. Please try again later.</p>";
  }
}

getProducts();
