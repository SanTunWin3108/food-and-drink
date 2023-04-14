const addToCartButtons = document.querySelectorAll('.card-body button');
const itemArr = JSON.parse(localStorage.getItem('itemArr')) || [];
let tableBody = document.querySelector('tbody');
const tableHeading = document.querySelector('thead');
const no_item = document.querySelector('.no-item');
const modalBox = document.querySelector('.modalBox');
const closeBtn = document.querySelector('.close-btn');
const grandTotal = document.querySelector('.grand-total');
const grandTotalPrice = document.querySelector('.grand-total-price');
const grandTotalSpan = document.querySelector('.grand-total-span');
let item_arr_two = [];


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





//calculate grand total
const calculateGrandTotal = () => {
    const total_costs = document.querySelectorAll('.total');
            let grand_total_cost = 0;
            for(let cost of total_costs) {
                if(cost.innerText !== '0') {
                    grand_total_cost += Number(cost.innerText.split('$ ')[1]);
                }
            }

            grandTotalSpan.innerText = grand_total_cost;
            
}

//create object for storing item name, quantity and total cost in local storage
const creatItemObject = (item_name, item_quantity, item_cost) => {
    return {
        item_name,
        item_quantity,
        item_cost
    }
}

//store input values and total cost to local storage
const storeInputAndTotalInLocalStorage = () => {
    const inputValues = document.querySelectorAll('.qty');
    
    for(let input_value of inputValues) {
        input_value.addEventListener('input', (e) => {
            const item_name = e.target.parentElement.parentElement.querySelector('.item-name').innerText;
            const item_quantity = e.target.value;
            const item_cost = e.target.parentElement.parentElement.querySelector('.total').innerText;

            const item_object = creatItemObject(item_name, item_quantity, item_cost);
            
            //check if object exists in array
            let index = item_arr_two.findIndex(obj => obj.item_name === item_object.item_name);
            if(index !== -1) {
                item_arr_two = item_arr_two.map(obj => {
                    if(obj.item_name === item_object.item_name) {
                        return {...obj, item_quantity: item_quantity, item_cost: item_cost};
                    } else {
                        return obj;
                    }
                });

                localStorage.setItem('item_arr_two', JSON.stringify(item_arr_two));
                return;
            }

            item_arr_two.push(item_object);
            //store item arr two in local storage
            localStorage.setItem('item_arr_two', JSON.stringify(item_arr_two));
        });
    }
    
}


//calculate total
const calculateTotal = (tableBody) => {
    const qtyInputs = tableBody.querySelectorAll('.qty');
    
    
    for(let qtyInput of qtyInputs) {
        qtyInput.addEventListener('input', (e) => {
            const cartItemPrice = e.target.parentElement.parentElement.querySelector('.item-price').innerText.split('$')[1];
            let quantityInput = Number(e.target.value);
            let totalCost = e.target.parentElement.parentElement.querySelector('.total');

            if(quantityInput < 0) {
                quantityInput = '0';
                e.target.value = '0'; 
            }

            let total = eval(cartItemPrice * quantityInput);
            totalCost.innerText = '$ ' + total;

            calculateGrandTotal();

            //store input values and total cost to local storage
            storeInputAndTotalInLocalStorage();
        });
    }
}

//create cart item
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

    calculateTotal(tableBody);
}

//remove items
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
                grandTotal.classList.add('hide');
                no_item.innerText = 'There is no item';
            }

            calculateGrandTotal();
        });

    }

}

//if item array has one or more elements, create cart item
if(tableHeading !== null) {
    if(itemArr.length > 0) {

        //show grand total
        grandTotal.classList.remove('hide');

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
if(closeBtn !== null) {
    closeBtn.addEventListener('click', () => {
        modalBox.classList.add('hide');
    });
}



