import {
  auth,
  db,
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../../auth/utils/utils.js";

const categories = {
  "Exclusive-flash-deals": {
    "furniture": ["living-room-furniture", "bedroom-furniture", "outdoor-furniture"],
    "decor": ["wall-decor", "lighting", "rugs"]
  },
  "bedroom": {
    "bed sets": ["comforter-sets", "sheet-sets", "bed-in-a-bag"],
    "storage": ["closet-storage", "garage-storage", "kitchen-storage"],
    "decor": ["wall-decor", "lighting", "rugs"],
    "furniture": ["living-room-furniture", "bedroom-furniture", "outdoor-furniture"],
    "accessories": ["pillows-&-throws", "curtains-&-drapes", "vases-&-planters"]
  },
  "living": {
    "sofas": ["sectional-sofas", "loveseats", "futons"],
    "recliners": ["manual-recliners", "power-recliners", "zero-gravity-recliners"],
    "storage": ["TV stand", "bookshelf", "cabinet"],
    "decor": ["rug", "lamp", "wall art"],
    "chairs": ["dining-chairs", "accent-chairs", "office-chairs"],
    "tables": ["dining-tables", "coffee-tables", "side-tables"],
    "flooring": ["hardwood", "carpeting", "tiles"]
  },
  "study": {
    "home-office-desk": ["writing-desks", "computer-desks", "standing-desks"],
    "furniture": ["desk", "chair", "bookshelf"],
    "storage": ["file cabinet", "storage bin", "organizer"],
    "decor": ["lamp", "wall art", "plant"]
  },
  "kids": {
    "kids-bed": ["bunk-beds", "toddler-beds", "cribs"],
    "storage": ["toy storage", "bookshelf", "closet"],
    "tables-&-desks": ["study-tables", "gaming-tables", "craft-tables"],
    "kids-sitting-&-chairs": ["rocking-chairs", "bean-bag-chairs", "high-chairs"],
    "furniture": ["bunk bed", "kids desk", "chair"],
    "decor": ["wall decals", "lamp", "rug"]
  },
  "dining": {
    "kitchen-&-diningroom-furniture": ["dining-tables", "dining-chairs", "kitchen-islands"],
    "tableware": ["plates", "cutlery", "glasses"],
    "decor": ["centerpiece", "placemats", "candles"]
  },
  "decor": {
    "wall-decor": ["paintings", "mirrors", "clocks"],
    "lighting": ["table lamps", "floor lamps", "ceiling lights"],
    "rugs": ["area rugs", "door mats", "runner rugs"],
    "accessories": ["pillows-&-throws", "curtains-&-drapes", "vases-&-planters"],
    "accent-furniture": ["accent-tables", "accent-chairs", "accent-cabinets"],
    "soft-furnishing": ["curtains", "cushions", "throws"]
  },
  "office": {
    "office-table": ["executive-desks", "conference-tables", "reception-desks"],
    "office-chairs": ["ergonomic-chairs", "executive-chairs", "visitor-chairs"],
    "workstation": ["cubicles", "benching-systems", "height-adjustable"],
    "seating": ["sofas", "chairs", "benches"],
    "co-working-space": ["shared-desks", "private-offices", "meeting-rooms"],
    "office-executive-furniture-set": ["desk-sets", "conference-sets", "storage-sets"],
    "storage": ["bookcase", "shelf", "storage box"],
    "accessories": ["lamp", "organizer", "mouse pad"]
  },
  "kitchen": {
    "kitchen-designs": ["modern", "traditional", "transitional"],
    "kitchen-accessories": ["utensils", "gadgets", "storage"],
    "kitchen-appliances": ["major-appliances", "small-appliances", "cooking-appliances"],
    "appliances": ["fridge", "oven", "microwave"],
    "cabinets": ["upper cabinets", "lower cabinets", "pantry"],
    "furniture": ["kitchen island", "bar stools", "kitchen table"]
  },
  "doors": {
    "entry": ["front door", "back door", "screen door"],
    "interior": ["bedroom door", "bathroom door", "closet door"],
    "specialty": ["sliding door", "barn door", "french door"]
  },
  "wardrobes": {
    "types": ["sliding wardrobe", "walk-in wardrobe", "mirror wardrobe"],
    "accessories": ["hangers", "storage bins", "shoe rack"],
    "organizers": ["drawer dividers", "shelf dividers", "hanging organizers"]
  },
  "part sale": {
    "clearance": ["item on sale 1", "item on sale 2", "item on sale 3"],
    "seasonal": ["holiday sale", "summer sale", "winter sale"],
    "promotions": ["buy one get one", "discounted bundles", "flash sale"]
  }
};


document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("productForm");
  const productTypeSelect = document.getElementById("productType");
  const uidContainer = document.getElementById("uidContainer");
  const productUidInput = document.getElementById("productUid");
  const loadProductButton = document.getElementById("loadProduct");
  const discountAmountInput = document.getElementById("discountAmount");
  const discountPercentageInput = document.getElementById("discountPercentage");
  const newPriceInput = document.getElementById("newPrice");
  const oldPriceInput = document.getElementById("oldPrice");
  const images = document.getElementById("images");
  const mainImageSelect = document.getElementById("mainImage");
  const saveFormBtn = document.getElementById("saveForm");

  populateCategories();

  function disabledButton(element){
    element.innerText = 'Saving...'
    element.disabled = true;
  }

  function enableButton(element){
    element.innerText = 'Save Product'
    element.disabled = false;
  }

  

  productTypeSelect.addEventListener("change", (e) => {

    if (e.target.value === "new") {
      uidContainer.style.display = "none";
      oldPriceInput.disabled = true;
      discountAmountInput.disabled = true;
      discountPercentageInput.disabled = true;
      resetForm();
    } else if (e.target.value === "existing") {
      uidContainer.style.display = "block";
      oldPriceInput.disabled = false;
      discountAmountInput.disabled = false;
      discountPercentageInput.disabled = false;
    }
  });

  loadProductButton.addEventListener("click", async () => {
    const uid = productUidInput.value;
    if (uid) {
      const docRef = doc(db, "products", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        populateForm(docSnap.data());
      } else {
        alert("product not found!");
      }
    } else {
      alert("Please enter a valid UID.");
    }
  });

  images.addEventListener("change", () => {
    const imageFiles = Array.from(images.files);
  
    mainImageSelect.innerHTML = '<option value="">Select Main Image</option>';
    imageFiles.forEach((file) => {
      const option = document.createElement("option");
      option.value = file.name;
      option.textContent = `${file.name}`;
      mainImageSelect.appendChild(option);
    });
  });
  
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    disabledButton(saveFormBtn)
  
    const category = e.target.category.value;
    const subcategory = e.target.subcategory.value;
    const item = e.target.item.value;
    const productName = e.target.productName.value;
    const newPrice = parseFloat(e.target.newPrice.value);
    const oldPrice = parseFloat(e.target.oldPrice.value);
    const discount = e.target.discount.value;
    const discountAmount = parseFloat(e.target.discountAmount.value);
    const discountPercentage = parseFloat(e.target.discountPercentage.value);
    const description = e.target.description.value;
    const aboutThisItem = e.target.aboutThisItem.value;
    const specification = e.target.specification.value;
    const imageFiles = Array.from(e.target.images.files);
  
    // Find the file object for the selected main image
    const mainImageName = e.target.mainImage.value;
    const mainImageFile = imageFiles.find(file => file.name === mainImageName);
  
    const imageUrls = [];
    const uploadPromises = imageFiles.map((file) => {
      const fileRef = ref(storage, `products/${category}/${subcategory}/${item}/${file.name}`);
      return uploadBytes(fileRef, file)
        .then(() => getDownloadURL(fileRef))
        .then((url) => {
          imageUrls.push(url);
          // If this is the main image, store its URL separately
          if (file === mainImageFile) {
            mainImageUrl = url;
          }
        })
        .catch((error) => {
          console.error(`Error uploading file ${file.name}:`, error.message);
        });
    });
  
    let mainImageUrl = '';
  
    Promise.all(uploadPromises).then(async () => {
      console.log("All images uploaded successfully.");
  
      const productInfo = {
        category,
        subcategory,
        item,
        productName,
        newPrice,
        oldPrice: oldPrice || null,
        discount,
        discountAmount: discountAmount || null,
        discountPercentage: discountPercentage || null,
        description,
        aboutThisItem,
        specification,
        imageUrls,
        mainImageUrl: mainImageUrl || '', 
      };
  
      if (productTypeSelect.value === "new") {
        await addDoc(collection(db, "products"), productInfo);
      } else if (productTypeSelect.value === "existing") {
        const uid = productUidInput.value;
        await setDoc(doc(db, "products", uid), productInfo, { merge: true });
      }
  
      alert("Product saved successfully!");
      resetForm();
      enableButton(saveFormBtn)
    });
  });
  
  newPriceInput.addEventListener("input", updateDiscountPercentage);
  oldPriceInput.addEventListener("input", updateDiscountPercentage);
  discountAmountInput.addEventListener("input", updateDiscountPercentage);

  function updateDiscountPercentage() {
    const newPrice = parseFloat(newPriceInput.value);
    const oldPrice = parseFloat(oldPriceInput.value);
    const discountAmount = parseFloat(discountAmountInput.value);

    if (!isNaN(newPrice) && !isNaN(oldPrice) && oldPrice > 0) {
      const discountPercentage = ((oldPrice - newPrice) / oldPrice) * 100;
      const discountAmount = (oldPrice - newPrice);

      discountPercentageInput.value = discountPercentage.toFixed(2) + "%";
    } else {
      discountPercentageInput.value = "";
    }
  }

  function resetForm() {
    productForm.reset();
    document.getElementById("mainImage").innerHTML =
      '<option value="">Select Main Image</option>';
  }

  function populateForm(data) {
    productForm.category.value = data.category;
    productForm.subcategory.value = data.subcategory;
    productForm.item.value = data.item;
    productForm.productName.value = data.productName;
    productForm.newPrice.value = data.newPrice;
    productForm.oldPrice.value = data.oldPrice;
    productForm.discount.value = data.discount;
    productForm.discountAmount.value = data.discountAmount;
    productForm.discountPercentage.value = data.discountPercentage;
    productForm.description.value = data.description;
    productForm.aboutThisItem.value = data.aboutThisItem;
    productForm.specification.value = data.specification;
  }

  function populateCategories() {
    const categorySelect = document.getElementById("category");
    const subcategorySelect = document.getElementById("subcategory");
    const itemSelect = document.getElementById("item");

    categorySelect.innerHTML = '<option value="">Select Category</option>';
    Object.keys(categories).forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });

    categorySelect.addEventListener("change", (e) => {
      const subcategories = categories[e.target.value];
      subcategorySelect.innerHTML = '<option value="">Select Subcategory</option>';
      itemSelect.innerHTML = '<option value="">Select Item</option>';
      Object.keys(subcategories).forEach((subcategory) => {
        const option = document.createElement("option");
        option.value = subcategory;
        option.textContent = subcategory;
        subcategorySelect.appendChild(option);
      });
    });

    subcategorySelect.addEventListener("change", (e) => {
      const items = categories[categorySelect.value][e.target.value];
      itemSelect.innerHTML = '<option value="">Select Item</option>';
      items.forEach((item) => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        itemSelect.appendChild(option);
      });
    });
  }
});
