# E-Commerce Website - Angular SPA

## Overview

This is a simple e-commerce website built using **Angular**. The application allows users to browse products, view product details, add products to the shopping cart, and complete the checkout process. The app implements modern front-end techniques such as **dependency injection**, **HTTP interceptors**, **reactive forms** with form arrays, **pagination**, and **state management**.

### Key Features
1. **Product Listing Page:**
   - Displays a list of products with images, names, and prices.
   - Sorting functionality by price.
   - Filtering by category, title, and price range.
   - Pagination to manage the product list.
   
2. **Product Detail Page:**
   - Displays detailed product information including images, descriptions, and price.
   - "Add to Cart" functionality.
   
3. **Shopping Cart:**
   - Display products added to the cart, with quantities and total price.
   - Update quantity and remove items from the cart.
   - Cart state persists across page reloads using **localStorage**.
   
4. **User Authentication:**
   - Login functionality using **JWT authentication**.
   - Protected checkout process that requires users to be authenticated.
   - HTTP interceptor to attach authentication token to outgoing requests.
   - User creation and check for existing users via the API.

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/rahulsinghgith/stupa_ecom.git
```

## Hosting
Hosted at Versal : https://stupa-ecom.vercel.app/products




