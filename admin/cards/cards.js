import { db, collection, getDocs } from "../../auth/utils/utils.js";

const productsDiv = document.getElementById("productsDiv");
const collectionRef = collection(db, "products");

async function getProducts() {
  try {
    const querySnapshot = await getDocs(collectionRef);
    productsDiv.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // <div class="card flex-column justify-content-between col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6" id="card">
      //       ${data.discountPercentage? `<span class="discounttag">${Math.round(data.discountPercentage)}% OFF</span>` : ""}
      //       ${data.newPrice <= 30000 ? `<span class="newarrivalstag"><img src="./images/newarrivals/newarrivals.svg" alt="NewArrivals Tag"></span>` : ''}
      //       <div class="image">${data.mainImageUrl? `<img src="${data.mainImageUrl}"/>` : `<img src="${data.imageUrls[0]}"/>`}
      //       </div>
      //     <div class="card-info row-cols-1">
      //       <h4 class="cardTitle">${data.productName}</h4>
      //       <div class="price d-flex flex-row align-items-center gap-2">
      //       <h5 class="newprice">Rs.${data.newPrice}</h5>
      //       ${data.oldPrice? `<h6 class="oldprice"><s class="text-danger">Rs.${data.oldPrice}</s></h6>`: ""}
      //       </div>
      //       <p class="description" style="length : 50">${data.description}</p>
      //         <div class="card-actions d-flex justify-content-between align-content-center">
      //             <button class="add-to-cart" data-id="${doc.id}">Add to Cart</button>
      //             <span><i class="fa-regular fa-heart" id="likeBtn"></i></span>
      //         </div>
      //     </div>
      // </div>
      const card = `
                <div class="card flex-column justify-content-between col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4" id="card">
    ${data.discountPercentage ? `<span class="discounttag position-absolute top-0 start-0 bg-danger text-white p-2">${Math.round(data.discountPercentage)}% OFF</span>` : ""}
    ${data.newPrice <= 30000 ? `<span class="newarrivalstag position-absolute top-0 end-0 bg-success text-white p-2"><img src="./images/newarrivals/newarrivals.svg" alt="NewArrivals Tag" class="img-fluid"/></span>` : ''}
    <div class="image position-relative">
        ${data.mainImageUrl ? `<img src="${data.mainImageUrl}" class="img-fluid"/>` : `<img src="${data.imageUrls[0]}" class="img-fluid"/>`}
    </div>
    <div class="card-body p-2">
        <h4 class="cardTitle mb-2 fs-5">${data.productName}</h4>
        <div class="price d-flex flex-row align-items-center gap-2 mb-2">
            <h5 class="newprice mb-0 fs-6">Rs.${data.newPrice}</h5>
            ${data.oldPrice ? `<h6 class="oldprice mb-0 fs-6"><s class="text-danger">Rs.${data.oldPrice}</s></h6>` : ""}
        </div>
        <p class="description mb-2 fs-6" style="max-height: 60px; overflow: hidden; text-overflow: ellipsis;">${data.description}</p>
        <div class="card-actions d-flex justify-content-between align-items-center">
            <button class="btn btn-primary btn-sm" data-id="${doc.id}">Add to Cart</button>
            <span><i class="fa-regular fa-heart fs-5" id="likeBtn"></i></span>
        </div>
    </div>
</div>



              `;
      productsDiv.innerHTML += card;
    });
  } catch (error) {
    console.error("Error fetching products: ", error);
    productsDiv.innerHTML =
      "<p>Failed to load products. Please try again later.</p>";
  }
}

getProducts();
