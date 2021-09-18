function getCartItems() {

    db.collection("cart-items").onSnapshot(snapshot => {
        let cartItems = [];
        snapshot.docs.forEach(doc => {
            cartItems.push({
                "id": doc.id,
                ...doc.data()
            })

        })
        generateCartItems(cartItems)
        getTotalCost(cartItems)

    })
}

const decreaseQuantity = (itemId) => {
    let cartItem = db.collection('cart-items').doc(itemId);
    cartItem.get()
        .then(doc => {
            if (doc.exists) {
                if (doc.data().quantity > 1) {
                    cartItem.update({
                        quantity: doc.data().quantity - 1
                    })
                }
            }
        })
}

const increaseQuantity = (itemId) => {
    let cartItem = db.collection('cart-items').doc(itemId);
    cartItem.get()
        .then(doc => {
            if (doc.exists) {

                cartItem.update({
                    quantity: doc.data().quantity + 1
                })

            }
        })
}

const deleteItem = (itemId) => {
    db.collection('cart-items').doc(itemId).delete();

}

const getTotalCost = (items) => {
    let totalCost = 0;
    items.forEach(item => {
        totalCost += (item.quantity * item.price)
    })
    document.querySelector('.total-cost-number').innerText = numeral(totalCost).format('$0,0.00')
}

const generateCartItems = (items) => {
    let cartItemsHtml = "";

    items.forEach(item => {
        cartItemsHtml += `
        <div class="cart-item flex items-center pb-4  border-b border-gray-100">

                        <!-- the image of the item------------------ -->
                        <div class="cart-item-image w-40 h-24 p-4 bg-white rounded-lg">
                            <img class="w-full h-full object-contain"
                                src="${item.image}" alt="">
                        </div>

                        <!-- the details of the item (name and brand) ------------ -->
                        <div class="cart-item-details   flex-grow">
                            <div class="cart-item-title  font-bold text-sm text-gray-600 max-w-md h-5 overflow-hidden">
                                ${item.name}
                            </div>
                            <div class="cart-item-brand text-sm text-gray-400">
                                ${item.make}
                            </div>
                        </div>

                        <!-- the counter to select the number of the same item------------ -->
                        <div class="cart-item-counter w-48 flex items-center">

                            <!-- the left chevron------- -->
                            <div data-id="${item.id}" class="arrow-left hover:bg-gray-200 bg-gray-100 rounded cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 19l-7-7 7-7" />
                                </svg>
                            </div>

                            <!-- the number that show the number of items--- -->
                            <h4 class="text-gray-400 mx-2">x${item.quantity}</h4>

                            <!-- the right chevron------ -->
                            <div data-id="${item.id}" class="arrow-right hover:bg-gray-200 bg-gray-100 rounded cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 " fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7" />
                                </svg>
                            </div>

                        </div>

                        <!-- this is the cost of the product------ -->
                        <div class="cart-item-total-cost w-48  text-gray-400 font-bold">
                            <h1>${numeral(item.price * item.quantity).format('$0,0.00')}</h1>
                        </div>

                        <!-- this is the delete button to remove item from cart----------- -->
                        <div data-id="${item.id}" class="cart-item-delete w-10 font-bold text-gray-300 cursor-pointer hover:text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>


                    </div>
        `
    })

    //getting cart items container---
    document.querySelector('.cart-items').innerHTML = cartItemsHtml;

    listenChevrons()
}


const listenChevrons = () => {
    let decreases = document.querySelectorAll('.arrow-left')
    let increases = document.querySelectorAll('.arrow-right')
    let deletes = document.querySelectorAll('.cart-item-delete')

    decreases.forEach(btn => {
        btn.addEventListener('click', () => {
            decreaseQuantity(btn.dataset.id)
        })
    })

    increases.forEach(btn => {
        btn.addEventListener('click', () => {
            increaseQuantity(btn.dataset.id)
        })
    })

    deletes.forEach(btn => {
        btn.addEventListener('click', () => {
            deleteItem(btn.dataset.id)
        })
    })


}


getCartItems()



