
// signup (works)
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const fullName = document.getElementById('fullName').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:8888/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, fullName, password })
  });
  
  const data = await response.json();
  console.log(data);
  alert('Sign up Success')
});

// Login (works)
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:8888/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to log in');
        }

        const data = await response.json();
        console.log(data);
        alert('Logged In Successfully')
    } catch (error) {
        console.error('Error:', error.message);
    }
});

// update profile
// async function updateProfile() {
//     const fileInput = document.getElementById('profilePicInput');
//     const formData = new FormData();
//     formData.append('profilePic', fileInput.files[0]);

//     const response = await fetch('http://localhost:8888/auth/updateProfile', {
//         method: 'POST',
//         body: formData
//     });

//     const data = await response.json();
//     document.getElementById('profilePic').src = data.profilePic;
// }

async function addToCart(productId, quantity) {
  const response = await fetch('/api/addToCart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
  });

  const data = await response.json();
  console.log(data);
}

// Remove item from cart
async function removeFromCart(productId) {
  const response = await fetch('/api/removeFromCart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
  });

  const data = await response.json();
  console.log(data);
}

// Clear entire cart
async function clearCart() {
  const response = await fetch('http://localhost:8888/cart/clearCart', {method:'DELETE'});
  const data = await response.json();
  console.log(data);
}

// Get cart items
async function getCart() {
  const response = await fetch('/api/getCart');
  const data = await response.json();
  
  const cartItemsList = document.getElementById('cartItemsList');
  data.cartItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.product.name} - Quantity: ${item.quantity}`;
      cartItemsList.appendChild(listItem);
  });
}


// Get user orders
async function getOrders() {
  const response = await fetch('http://localhost:8888/order/getUserOrders');
  const data = await response.json();
  console.log(data)
  const orderList = document.getElementById('orderList');
  data.forEach(order => {
      const listItem = document.createElement('li');
      listItem.textContent = `Order ID: ${order._id}, Total Price: ${price}}`;
      orderList.appendChild(listItem);
  });
}

// get all products
async function getProducts() {
  const response = await fetch('http://localhost:8888/product/getAllProducts');
  const data = await response.json();
  console.log(data)

  const productsList = document.getElementById('productsList');
  data.forEach(product => {
      const listItem = document.createElement('li');
      listItem.textContent = `${product.name} - Price: ${product.price}`;
      productsList.appendChild(listItem);
  });
}

