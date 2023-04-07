const addToCartButtons = document.querySelectorAll('.card-body button');
const itemArr = JSON.parse(localStorage.getItem('itemArr')) || [];

for(let addBtn of addToCartButtons) {
    addBtn.addEventListener('click', (e) => {
        const addBtnParent = e.target.parentElement.parentElement;
        const itemImage = addBtnParent.querySelector('img').src;
        const itemName = addBtnParent.querySelector('h5').innerText;
        const itemPrice = addBtnParent.querySelector('p').innerText;

        //create item object
        const itemObj = createObject(itemImage, itemName, itemPrice);
        
        //add item object to array
        itemArr.push(itemObj);

        //add array to localstorage
        setToLocalstorage(itemArr);
    });
}

const createObject = (itemImage, itemName, itemPrice) => {
    return {
        itemImage,
        itemName,
        itemPrice
    };
}

const setToLocalstorage = (itemArr) => {
    localStorage.setItem('itemArr', JSON.stringify(itemArr));
}