import { auth, db, getDoc, setDoc, doc, collection } from "../../auth/utils/utils.js";

const productsDiv = document.getElementById('productsDiv');
const orderShow = document.getElementById('orderShow');
let cartCount = 0;
const allCart = {};

productsDiv.addEventListener('click', async (event) => {
    const user = auth.currentUser;
    if(user) {
        if (event.target && event.target.matches('button.add-to-cart')) {
            const button = event.target;
            const productId = button.getAttribute('data-id');
            cartCount += 1;
            orderShow.textContent = cartCount;
            const currentCart = {
                userId: user.uid,
                productID: productId
            };

            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    currentCart.userName = data.displayName;
                    currentCart.contactNumber = data.phoneNumber;
                    currentCart.address = data.userAddress;
                    currentCart.city = data.userCity;
                    currentCart.email = data.email;
                    if (!allCart[productId]) {
                        allCart[productId] = [];
                    }
                    allCart[productId].push(currentCart);
                    const cartRef = doc(db, 'carts', user.uid);
                    await setDoc(cartRef, { cart: allCart });

                    console.log('Cart updated:', allCart);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        }
    } else {

    }
});
