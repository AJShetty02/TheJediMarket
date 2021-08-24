let cartsContent = document.querySelectorAll('.add-cart');

//Items details that can be added in the cart
let products = [
    {
        name: 'Anakin Skywalker Lightsaber',
        tag: 'anakin',
        price:26169,
        inCart:0
    },
    {
        name: 'Luke Skywalker Lightsaber',
        tag: 'luke',
        price:23366,
        inCart:0
    },
    {
        name: 'Princess Leia Lightsaber',
        tag: 'leia',
        price:12698,
        inCart:0
    },
    {
        name: 'Obi-Wan Kenobi Lightsaber',
        tag: 'obi-wan',
        price:26412,
        inCart:0
    },
    {
        name: 'Emperor Palpatine Lightsaber',
        tag: 'palpatine',
        price:2910,
        inCart:0
    },
    
    {
        name: 'Master Yoda Lightsaber',
        tag: 'yoda',
        price:4247,
        inCart:0
    },
    {
        name: 'Count Dooku Lightsaber',
        tag: 'dooku',
        price:7681,
        inCart:0
    },
    {
        name: 'Mace Windu Lightsaber',
        tag: 'mace',
        price:61240,
        inCart:0
    },
    {
        name: 'Kylo Ren Lightsaber',
        tag: 'kylo',
        price:5398,
        inCart:0
    },
    {
        name: 'Darth Maul Lightsaber',
        tag: 'darthmaul',
        price:2267,
        inCart:0
    },
    
]

//adds the items that are added to cart from the available items to the cart
for (let i = 0; i < cartsContent.length; i++) {
    cartsContent [i].addEventListener('click' , () => {
    numberofItems(products[i]);
    totalCost(products[i]);
    })
}

//Loads the number of items that are in the cart stored in the local storage
function onLoadNumberofItems () {
    let productNumbers = localStorage.getItem('numberofItems');

     if(productNumbers) {
        document.querySelector('.cart span').textContent =productNumbers;
     }
}

//gets the number of items in the cart stored in the local storage
function numberofItems(product) {

    let productNumbers = localStorage.getItem('numberofItems');

    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('numberofItems',productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('numberofItems', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
 
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart +=1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag] : product
        }
    }
        
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//gets the cost of the product that is added to cart that is stored in the local storage
function totalCost (product) {
    // console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cartCost is", cartCost);

    //gets the summation of the prices that are in the cart 
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

//displays alls the product that are added to cart
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    //displays the values of the objects stored or added to cart such as the item name, item tag, items price, quantity and total cost of the products in cart per type/name of item
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class = "products">
                <img src="./images/${item.tag}.jpg" class="product-items">
                <span class="productName">${item.name}</span>
            </div>
            <div class="price">₱${item.price}.00</div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                ₱${item.inCart * item.price}.00
            </div>
            `;
        });

        //displays the over all total of the products in the cart regardless of the type/name of item       
        productContainer.innerHTML += `
            <div class = "basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class = "basketTotal">
                    ₱${cartCost}.00
                </h4>
        `;
    };
};

//MODAL

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  displayCart();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//These functions are executed upon loading
//No. of items in cart
onLoadNumberofItems();
//Items that are in Cart
displayCart();