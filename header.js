const getCartItemsCoumt = () => {

    db.collection("cart-items").onSnapshot(snapshot => {
        let count = 0;
        snapshot.forEach(doc => {
            count += doc.data().quantity;
        })
        setCartCounter(count)
    })

}

function setCartCounter(totalCount) {
    document.querySelector('.cart-item-number').innerText = totalCount
}
getCartItemsCoumt()