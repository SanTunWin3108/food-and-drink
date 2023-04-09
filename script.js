const addToCartButtons = document.querySelectorAll('.card-body button');
const itemArr = JSON.parse(localStorage.getItem('itemArr')) || [];
let tableBody = document.querySelector('tbody');
const tableHeading = document.querySelector('thead');
const no_item = document.querySelector('.no-item');
const modalBox = document.querySelector('.modalBox');
const closeBtn = document.querySelector('.close-btn');

for(let addBtn of addToCartButtons) {
    addBtn.addEventListener('click', (e) => {
        const addBtnParent = e.target.parentElement.parentElement;
        const itemImage = addBtnParent.querySelector('img').src;
        const itemName = addBtnParent.querySelector('h5').innerText;
        const itemPrice = addBtnParent.querySelector('p').innerText;

        //create item object
        const itemObj = createObject(itemImage, itemName, itemPrice);

        //check if added item exists in array
        let itemIndex = itemArr.findIndex(obj => obj.itemName === itemObj.itemName);
        if(itemIndex >= 0) {
            modalBox.classList.remove('hide');
            return;
        }
        
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


const createCartItem = (cartItem) => {
    const tableRow = `<tr class="py-5">
    <td class="align-middle"><img src="${cartItem.itemImage}" class="item-image" alt=""></td>
    <td class="align-middle item-name">${cartItem.itemName}</td>
    <td class="align-middle item-price">${cartItem.itemPrice}</td>
    <td class="align-middle"><input class="qty" type="number" value="0" min="0"></td>
    <td class="align-middle total">0</td>
    <td class="align-middle"><i class="fa-regular removeBtn fa-circle-xmark"></i></td>
  </tr>`;
    tableBody.innerHTML += tableRow;

    const removeButtons = document.querySelectorAll('.removeBtn');
    
    removeItems(removeButtons);
}

const removeItems = (removeButtons) => {
    for(let removeBtn of removeButtons) {
        removeBtn.addEventListener('click', (e) => {
            const remove_item = e.target.parentElement.parentElement;
            const remove_item_name = remove_item.querySelector('.item-name').innerText;
            remove_item.remove();
            let index = itemArr.findIndex(obj => obj.itemName === remove_item_name);
            itemArr.splice(index, 1);
            setToLocalstorage(itemArr);

            if(itemArr.length <= 0) {
                tableHeading.classList.add('hide');
                no_item.innerText = 'There is no item';
            }
        });

    }

}

//if item array has one or more elements, create cart item
if(tableHeading !== null) {
    if(itemArr.length > 0) {
        no_item.innerText = '';
        tableHeading.classList.remove('hide');
        for(let cartItem of itemArr) {
            createCartItem(cartItem);
        }
    } else {
        tableHeading.classList.add('hide');
        no_item.innerText = 'There is no item';
    }
}

//close modal box
closeBtn.addEventListener('click', () => {
    modalBox.classList.add('hide');
});

