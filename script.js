const allProducts = document.querySelector('.main-section-products');

const getItems = () => {
    db.collection("Items").get().then((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
            items.push({
                "image": doc.data().image,
                "make": doc.data().make,
                "name": doc.data().name,
                "price": doc.data().price,
                "rating": doc.data().rating,
            })

            // console.log(items)

        });
        generateItems(items)
    });
}

getItems();


//to add the item in the cart------------------------------
function addToCart(item) {
    console.log(item)
    let cartItem = db.collection('cart-items').doc(item.id)

    cartItem.get()
        .then((doc) => {
            if (doc.empty) {
                cartItem.update({
                    quantity: doc.data().quantity + 1
                })
            }
            else {
                cartItem.set({
                    image: item.image,
                    make: item.make,
                    name: item.name,
                    rating: item.rating,
                    price: item.price,
                    quantity: 1
                })
            }
        })

}

//the items are generated and renderd on the screen----------------

const generateItems = (items) => {
    var itemsHtml = ""
    items.forEach((item, index) => {
        let doc = document.createElement('div');
        doc.classList.add('product', 'w-60', 'p-6', 'bg-white');
        doc.innerHTML = `
                <div class="product-image w-48 h-52 ">
                        <img class="w-full h-full object-contain"
                            src="${item.image}" alt="IMage">
                </div>
                 <div class="product-name text-gray-700   font-bold mt-2  h-100">
                     ${item.name}
                 </div>
    
                 <div class="product-make text-green-700 font-bold">
                     ${item.make}
                 </div>
    
                <div class="product-rating text-yellow-300 my-1">
                     ⭐ ⭐ ⭐ ⭐ ⭐ ${item.rating}
                 </div>
    
                 <div class="product-price font-bold text-gray-700 text-lg">
                     $${item.price}
                 </div>

            `

        let addToCartEl = document.createElement('div');
        addToCartEl.classList.add("add-to-cart-btn", "border", "text-center", "bg-yellow-500", "mt-4", "p-2", "text-white", "rounded", "cursor-pointer", "hover:bg-yellow-600");
        addToCartEl.innerText = "Add to Cart"

        addToCartEl.addEventListener('click', () => {
            addToCart(item)
        })
        doc.appendChild(addToCartEl);

        allProducts.appendChild(doc)
    });


}