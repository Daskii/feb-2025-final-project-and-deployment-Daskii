## **Project Overview**
The **Garments by Daskii** website is a responsive e-commerce platform designed to showcase and sell South African fashion products. It features a modern design, dynamic functionality, and a user-friendly interface. The website includes pages for products, deals, cart, checkout, and contact, with seamless navigation and interactive features.

---

## **Features**
### **1. Homepage**
- **Hero Section**: Welcomes users with a brief introduction to the store and a call-to-action button to start shopping.
- **Why Choose Us Section**: Highlights the store's unique selling points, such as exclusive brands, local pride, and fast shipping.
- **Featured Products Section**: Displays a selection of popular products with links to view more details.

### **2. Products Page**
- Displays a catalog of products from the **Spirit** and **Tasiki** brands.
- Each product includes:
  - Name
  - Description
  - A "View Product" button for detailed information.
  - An "Add to Cart" button to add the product to the shopping cart.

### **3. Deals Page**
- Highlights discounted products with their original and discounted prices.
- Includes "Shop Now" buttons for quick access to product details.

### **4. Cart Page**
- Dynamically displays products added to the cart.
- Features:
  - Product name, price, quantity, and total.
  - Ability to update quantities or remove items.
  - Cart summary with subtotal, shipping, and total cost.
  - A "Proceed to Checkout" button.

### **5. Checkout Page**
- Collects user details for billing and shipping.
- Includes fields for payment information (e.g., card details).
- A "Place Order" button to finalize the purchase.

### **6. Contact Page**
- A contact form for users to send inquiries or feedback.
- Displays additional contact methods (email, phone, and address).
- Includes social media links for Instagram, WhatsApp, and Facebook.

---

## **Technology Stack**
### **Frontend**
- **HTML5**: Structure and content of the website.
- **CSS3**: Styling and responsive design.
- **JavaScript**: Dynamic functionality, such as adding products to the cart and updating the cart page.

### **Backend**
- Not implemented in this version. Future versions can integrate a backend for user authentication, order management, and database storage.

### **lIVE dEMO**
- 

---

## **File Structure**
```
responsive_website/
│
├── css/
│   └── style.css          # Stylesheet for the website
│
├── images/
│   └── instagram-icon.png # Social media icons
│   └── whatsapp-icon.png
│   └── facebook-icon.png
│
├── js/
│   └── script.js          # JavaScript for dynamic functionality
│
├── index.html             # Homepage
├── products.html          # Products page
├── deals.html             # Deals page
├── cart.html              # Shopping cart page
├── checkout.html          # Checkout page
├── contact.html           # Contact page
└── privacy.html           # Privacy policy page
```

---

## **Dynamic Functionality**
### **1. Add to Cart**
- **Implementation**:
  - Each product has an "Add to Cart" button with `data-product` and `data-price` attributes.
  - Clicking the button stores the product in `localStorage`.
- **Code Snippet**:
```javascript
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: parseFloat(productPrice), quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${productName} has been added to your cart!`);
}
```

### **2. Cart Page**
- **Functionality**:
  - Dynamically displays cart items stored in `localStorage`.
  - Allows users to update quantities or remove items.
  - Updates the cart summary (subtotal, shipping, and total).
- **Code Snippet**:
```javascript
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let subtotal = 0;
    cart.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>ZAR${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1"></td>
            <td>ZAR${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove-button">Remove</button></td>
        `;
        subtotal += item.price * item.quantity;
        cartItems.appendChild(row);
    });
    document.querySelector(".subtotal").textContent = `ZAR${subtotal.toFixed(2)}`;
    document.querySelector(".total").textContent = `ZAR${(subtotal + 50).toFixed(2)}`; // Flat shipping rate
}
```

---

## **Responsive Design**
- **Media Queries**:
  - Ensures the website is mobile-friendly and adapts to different screen sizes.
- **Social Media Icons**:
  - Styled to be responsive and visually appealing.

---

## **Testing**
### **1. Functional Testing**
- Tested all buttons (e.g., "Add to Cart," "Remove," "Proceed to Checkout").
- Verified cart updates dynamically and persists across pages.

### **2. Responsive Testing**
- Tested on various devices (desktop, tablet, mobile) to ensure proper layout and functionality.

### **3. Browser Compatibility**
- Tested on Chrome, Firefox, Edge, and Safari.

---

## **Future Enhancements**
1. **Backend Integration**:
   - Add user authentication and order management.
   - Store cart and order data in a database.
2. **Payment Gateway**:
   - Integrate a secure payment gateway for processing transactions.
3. **Search and Filter**:
   - Add search and filter functionality to the products page.
4. **Wishlist**:
   - Allow users to save products to a wishlist.

---

## **Conclusion**
The **Garments by Daskii** website is a fully functional, responsive e-commerce platform that provides a seamless shopping experience. It is designed to showcase South African fashion and cater to a wide audience. Future enhancements can further improve its functionality and scalability.
