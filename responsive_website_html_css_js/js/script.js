document.addEventListener("DOMContentLoaded", function() {
    // Responsive Navigation (Hamburger Menu)
    const nav = document.querySelector("header nav ul");
    const header = document.querySelector("header");
    const navToggle = document.createElement("button");
    navToggle.innerHTML = "&#9776;"; // Hamburger icon
    navToggle.setAttribute("aria-label", "Toggle navigation");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.classList.add("nav-toggle");

    if (header && nav) {
        const navContainer = document.querySelector("header nav");
        if (navContainer) {
            navContainer.insertBefore(navToggle, nav);
        }

        navToggle.addEventListener("click", () => {
            const isExpanded = nav.getAttribute("data-visible") === "true" || false;
            nav.setAttribute("data-visible", !isExpanded);
            navToggle.setAttribute("aria-expanded", !isExpanded);
            navToggle.innerHTML = isExpanded ? "&#9776;" : "&times;"; // Toggle icon
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");
            let isValid = true;
            let errors = [];

            // Clear previous errors
            document.querySelectorAll(".error-message").forEach(el => el.remove());

            if (name.value.trim() === "") {
                isValid = false;
                errors.push({ field: name, message: "Full Name is required." });
            }

            if (email.value.trim() === "") {
                isValid = false;
                errors.push({ field: email, message: "Email Address is required." });
            } else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
                isValid = false;
                errors.push({ field: email, message: "Please enter a valid Email Address." });
            }

            if (message.value.trim() === "") {
                isValid = false;
                errors.push({ field: message, message: "Message is required." });
            }

            if (!isValid) {
                event.preventDefault(); // Prevent form submission
                errors.forEach(error => {
                    const errorElement = document.createElement("p");
                    errorElement.className = "error-message";
                    errorElement.style.color = "red";
                    errorElement.textContent = error.message;
                    error.field.parentNode.insertBefore(errorElement, error.field.nextSibling);
                });
                if (errors.length > 0) {
                    errors[0].field.focus();
                }
            } else {
                alert("Message sent successfully! (This is a demo)");
            }
        });
    }

    // Dynamic Featured Products Section
    const featuredProductsSection = document.getElementById("featured-products");
    if (featuredProductsSection) {
        const products = [
            { name: "Wireless Headphones", description: "Crystal-clear sound with top-rated headphones.", link: "product-details.html" },
            { name: "Smartwatch", description: "Track your fitness and stay connected.", link: "product-details.html" },
            { name: "Gaming Laptop", description: "High-performance laptops for gaming enthusiasts.", link: "product-details.html" }
        ];

        products.forEach(product => {
            const productBox = document.createElement("div");
            productBox.className = "product-box";

            const productName = document.createElement("h4");
            productName.textContent = product.name;

            const productDescription = document.createElement("p");
            productDescription.textContent = product.description;

            const productLink = document.createElement("a");
            productLink.href = product.link;
            productLink.className = "button_2";
            productLink.textContent = "View Product";

            productBox.appendChild(productName);
            productBox.appendChild(productDescription);
            productBox.appendChild(productLink);

            featuredProductsSection.appendChild(productBox);
        });
    }

    // Scroll to Top Button
    const scrollToTopButton = document.createElement("button");
    scrollToTopButton.textContent = "↑";
    scrollToTopButton.className = "scroll-to-top";
    scrollToTopButton.style.display = "none";
    document.body.appendChild(scrollToTopButton);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    });

    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Cart Page: Remove Product Functionality
    const cartTable = document.querySelector("#cart table tbody");
    if (cartTable) {
        cartTable.addEventListener("click", function (event) {
            if (event.target.classList.contains("remove-button")) {
                const row = event.target.closest("tr");
                if (row) {
                    row.remove(); // Remove the product row
                    updateCartSummary(); // Update the cart summary
                }
            }
        });
    }

    // Update Cart Summary
    function updateCartSummary() {
        const cartRows = document.querySelectorAll("#cart table tbody tr");
        let subtotal = 0;

        cartRows.forEach((row) => {
            const price = parseFloat(row.querySelector(".price").textContent.replace("$", ""));
            const quantity = parseInt(row.querySelector(".quantity-input").value);
            const total = price * quantity;
            row.querySelector(".total").textContent = `$${total.toFixed(2)}`;
            subtotal += total;
        });

        const shipping = cartRows.length > 0 ? 10 : 0; // Flat shipping rate
        const total = subtotal + shipping;

        document.querySelector("#cart-summary .subtotal").textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector("#cart-summary .shipping").textContent = `$${shipping.toFixed(2)}`;
        document.querySelector("#cart-summary .total").textContent = `$${total.toFixed(2)}`;
    }

    // Update Cart Summary on Quantity Change
    if (cartTable) {
        cartTable.addEventListener("input", function (event) {
            if (event.target.classList.contains("quantity-input")) {
                updateCartSummary();
            }
        });
    }

    // Update Cart Display
    function updateCartDisplay() {
        const cartTable = document.getElementById("cart-table");
        const cartItems = document.getElementById("cart-items");
        const cartSummary = document.getElementById("cart-summary");
        const cartMessage = document.getElementById("cart-message");

        // Clear the current cart display
        cartItems.innerHTML = "";

        if (cart.length === 0) {
            // If the cart is empty, show the empty message
            cartMessage.style.display = "block";
            cartTable.style.display = "none";
            cartSummary.style.display = "none";
        } else {
            // If the cart has items, display them
            cartMessage.style.display = "none";
            cartTable.style.display = "table";
            cartSummary.style.display = "block";

            let subtotal = 0;

            cart.forEach((item, index) => {
                const row = document.createElement("tr");

                const productCell = document.createElement("td");
                productCell.textContent = item.name;

                const priceCell = document.createElement("td");
                priceCell.className = "price";
                priceCell.textContent = `ZAR${item.price.toFixed(2)}`;

                const quantityCell = document.createElement("td");
                const quantityInput = document.createElement("input");
                quantityInput.type = "number";
                quantityInput.className = "quantity-input";
                quantityInput.value = item.quantity;
                quantityInput.min = 1;
                quantityInput.addEventListener("input", function () {
                    item.quantity = parseInt(this.value);
                    updateCartDisplay();
                });
                quantityCell.appendChild(quantityInput);

                const totalCell = document.createElement("td");
                totalCell.className = "total";
                const total = item.price * item.quantity;
                totalCell.textContent = `ZAR${total.toFixed(2)}`;
                subtotal += total;

                const actionCell = document.createElement("td");
                const removeButton = document.createElement("button");
                removeButton.className = "remove-button button_2";
                removeButton.textContent = "Remove";
                removeButton.addEventListener("click", function () {
                    cart.splice(index, 1); // Remove the item from the cart
                    updateCartDisplay();
                });
                actionCell.appendChild(removeButton);

                row.appendChild(productCell);
                row.appendChild(priceCell);
                row.appendChild(quantityCell);
                row.appendChild(totalCell);
                row.appendChild(actionCell);

                cartItems.appendChild(row);
            });

            // Update the cart summary
            const shipping = subtotal > 0 ? 10 : 0; // Flat shipping rate
            const total = subtotal + shipping;

            document.querySelector(".subtotal").textContent = `ZAR${subtotal.toFixed(2)}`;
            document.querySelector(".shipping").textContent = `ZAR${shipping.toFixed(2)}`;
            document.querySelector(".total").textContent = `ZAR${total.toFixed(2)}`;
        }
    }

    // Example: Add items to the cart (this would normally come from other pages)
    cart.push({ name: "Wireless Headphones", price: 99.99, quantity: 1 });
    cart.push({ name: "Smartwatch", price: 149.99, quantity: 1 });

    // Update the cart display on page load
    updateCartDisplay();

    // Function to add a product to the cart
    function addToCart(productName, productPrice) {
        // Retrieve the cart from localStorage or initialize it
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if the product is already in the cart
        const existingProduct = cart.find((item) => item.name === productName);

        if (existingProduct) {
            // If the product exists, increase its quantity
            existingProduct.quantity += 1;
        } else {
            // If the product doesn't exist, add it to the cart
            cart.push({ name: productName, price: parseFloat(productPrice), quantity: 1 });
        }

        // Save the updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Notify the user
        alert(`${productName} has been added to your cart!`);
    }

    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const productName = this.getAttribute("data-product");
            const productPrice = this.getAttribute("data-price");
            addToCart(productName, productPrice);
        });
    });
});

