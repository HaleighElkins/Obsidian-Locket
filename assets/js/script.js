document.addEventListener('DOMContentLoaded', () => {
    const products = [
      { name:"Gold Earrings", price:"$120", img:"../../assets/images/goldearing.jpg" },
      { name:"Vintage Gold Earrings", price:"$150", img:"../../assets/images/vintagegoldearings.jpg" },
      { name:"Obsidian Earrings", price:"$200", img:"../../assets/images/obsidianearings.jpg" },
      { name:"Gold His & Her Ring", price:"$250", img:"../../assets/images/goldhisherring.jpg" },
      { name:"Purple Ring", price:"$180", img:"../../assets/images/Purplering.jpg" },
      { name:"Red Gold Necklace", price:"$300", img:"../../assets/images/redgoldnecklace.jpg" }
    ];
  
    let cart = [];
  
    const cartWrapper = document.getElementById('cart-wrapper');
    const cartCounter = document.getElementById('cart-counter');
    const cartDropdown = document.getElementById('cart-dropdown');
    const productsContainer = document.getElementById('products-container');
    const mainSection = document.getElementById('main');
  
    // Render products
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <button class="add-to-cart-btn">Add to Cart</button>
      `;
      productsContainer.appendChild(card);
  
      card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
        cart.push(product);
        updateCart();
      });
    });
  
    function updateCart() {
      cartCounter.textContent = cart.length;
      cartDropdown.innerHTML = '';
  
      if (cart.length === 0) {
        cartDropdown.innerHTML = '<p class="cart-empty">Cart is empty</p>';
        return;
      }
  
      cart.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <img src="${item.img}" alt="${item.name}">
          <span>${item.name} - ${item.price}</span>
          <button data-index="${i}">X</button>
        `;
        cartDropdown.appendChild(div);
      });
      
    }
  
    // Remove item
    cartDropdown.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        const idx = e.target.dataset.index;
        cart.splice(idx, 1);
        updateCart();
      }
    });
  
    // Toggle cart dropdown
    cartCounter.addEventListener('click', () => {
      cartDropdown.classList.toggle('open');
    });
  
    // Show cart after scrolling
    function handleScroll() {
      if (window.scrollY >= mainSection.offsetTop - 100) {
        cartWrapper.style.visibility = 'visible';
        cartWrapper.style.opacity = '1';
      } else {
        cartWrapper.style.opacity = '0';
        cartWrapper.style.visibility = 'hidden';
        cartDropdown.classList.remove('open');
      }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  
    // Shop button scroll
    document.getElementById('shop-btn').addEventListener('click', () => {
      mainSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
  