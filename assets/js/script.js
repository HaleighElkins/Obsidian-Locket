document.addEventListener('DOMContentLoaded', () => {
    const products = [
      { name:"Gold Earring", price:"$50", category:"Vintage", sub:"Earrings", img:"../../assets/images/goldearing.jpg" },
      { name:"Vintage Gold Earrings", price:"$70", category:"Vintage", sub:"Earrings", img:"../../assets/images/vintagegoldearings.jpg" },
      { name:"Obsidian Earrings", price:"$60", category:"Custom", sub:"Earrings", img:"../../assets/images/obsidianearings.jpg" },
      { name:"Gold Hisherring", price:"$80", category:"Custom", sub:"Rings", img:"../../assets/images/goldhisherring.jpg" },
      { name:"Purple Ring", price:"$120", category:"Custom", sub:"Rings", img:"../../assets/images/Purplering.jpg" },
      { name:"Red Gold Necklace", price:"$150", category:"Vintage", sub:"Necklaces", img:"../../assets/images/redgoldnecklace.jpg" }
    ];
  
    let cart = [];
    const cartWrapper = document.getElementById('cart-wrapper');
    const cartCounter = document.getElementById('cart-counter');
    const cartDropdown = document.getElementById('cart-dropdown');
    const productsContainer = document.getElementById('products-container');
    const landingSection = document.querySelector('.landing');
    const mainSection = document.getElementById('main');
  
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const categoryButtons = sidebar.querySelectorAll('[data-category]');
    const subcategoryButtons = sidebar.querySelectorAll('[data-subcategory]');
  
    let selectedCategory = 'All';
    let selectedSubcategory = 'All';
  
    sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('active'));
  
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', ()=>{
        categoryButtons.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        selectedCategory = btn.dataset.category;
        renderProducts();
      });
    });
  
    subcategoryButtons.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        subcategoryButtons.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        selectedSubcategory = btn.dataset.subcategory;
        renderProducts();
      });
    });
  
    function renderProducts(){
      productsContainer.innerHTML='';
      const filtered = products.filter(p=>{
        return (selectedCategory==='All'||p.category===selectedCategory) &&
               (selectedSubcategory==='All'||p.sub===selectedSubcategory);
      });
      if(filtered.length===0){
        productsContainer.innerHTML='<p style="color:#fff8d4; margin-top:20px;">No items in this category</p>';
        return;
      }
      filtered.forEach((product,i)=>{
        const card = document.createElement('div');
        card.className='product-card';
        card.innerHTML=`
          <img src="${product.img}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.price}</p>
          <button class="add-to-cart-btn">Add to Cart</button>
        `;
        productsContainer.appendChild(card);
  
        card.querySelector('.add-to-cart-btn').addEventListener('click',()=>{
          cart.push(product);
          updateCart();
        });
      });
    }
  
    function updateCart(){
      cartCounter.textContent = cart.length;
      cartDropdown.innerHTML='';
      if(cart.length===0){
        cartDropdown.innerHTML='<p class="cart-empty">Cart is empty</p>';
        return;
      }
      cart.forEach((item,i)=>{
        const div = document.createElement('div');
        div.className='cart-item';
        div.innerHTML=`
          <img src="${item.img}" alt="${item.name}">
          <span>${item.name} - ${item.price}</span>
          <button data-index="${i}">X</button>
        `;
        cartDropdown.appendChild(div);
      });
      // Total & Checkout
      const total = cart.reduce((acc,item)=>acc+parseFloat(item.price.replace('$','')||0),0);
      const totalDiv = document.createElement('div');
      totalDiv.id='cart-total';
      totalDiv.textContent = `Total: $${total.toFixed(2)}`;
      cartDropdown.appendChild(totalDiv);
  
      const checkoutBtn = document.createElement('button');
      checkoutBtn.id='checkout-btn';
      checkoutBtn.textContent='Checkout';
      cartDropdown.appendChild(checkoutBtn);
    }
  
    cartDropdown.addEventListener('click',e=>{
      if(e.target.tagName==='BUTTON' && e.target.dataset.index!==undefined){
        cart.splice(e.target.dataset.index,1);
        updateCart();
      }
    });
  
    cartCounter.addEventListener('click',()=>cartDropdown.style.display=cartDropdown.style.display==='block'?'none':'block');
  
    function handleScroll(){
      const scrollPos = window.scrollY + window.innerHeight/10;
      if(scrollPos>=mainSection.offsetTop){
        cartWrapper.style.visibility='visible';
        cartWrapper.style.opacity='1';
        landingSection.classList.add('background-hidden');
      }else{
        cartWrapper.style.opacity='0';
        cartWrapper.style.visibility='hidden';
        landingSection.classList.remove('background-hidden');
        cartDropdown.style.display='none';
      }
    }
    window.addEventListener('scroll',handleScroll);
    handleScroll();
  
    document.getElementById('shop-btn').addEventListener('click',()=>mainSection.scrollIntoView({behavior:'smooth'}));
  
    renderProducts();
  });
  