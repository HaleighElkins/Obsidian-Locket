document.addEventListener('DOMContentLoaded', () => {

    // Smooth scroll
    function scrollToMain(){ 
        document.getElementById('main').scrollIntoView({behavior:'smooth'}); 
    }
    window.scrollToMain = scrollToMain; // make global for onclick

    // Products
    const products = [
        {name:"Smartphone", price:"$499", img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"},
        {name:"Headphones", price:"$99", img:"https://images.unsplash.com/photo-1580894894513-1a7b38d70a9d"},
        {name:"Smartwatch", price:"$199", img:"https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b"},
        {name:"Laptop", price:"$899", img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8"}
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart();

    const container = document.getElementById('products-container');
    products.forEach(product=>{
        const card = document.createElement('div');
        card.className='product-card';
        card.innerHTML=`<img src="${product.img}" alt="${product.name}"><h3>${product.name}</h3><p>${product.price}</p><button>Add to Cart</button>`;
        card.querySelector('button').addEventListener('click', ()=>{ addToCart(product); });
        container.appendChild(card);
    });

    // Cart functions
    function addToCart(product){
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart('add');
    }

    function removeFromCart(index){
        cart.splice(index,1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart('remove');
    }

    function updateCart(action){
        const counter=document.getElementById('cart-counter');
        const dropdown=document.getElementById('cart-dropdown');
        counter.innerText=cart.length;
        dropdown.innerHTML='';
        if(cart.length===0){
            dropdown.innerHTML='<p class="cart-empty">Cart is empty</p>';
            return;
        }
        let total=0;
        cart.forEach((item,i)=>{
            const priceNum=parseFloat(item.price.replace('$',''));
            total+=priceNum;
            const div=document.createElement('div');
            div.className='cart-item';
            div.innerHTML=`<span>${item.name} - ${item.price}</span><button onclick="removeFromCart(${i})">X</button>`;
            if(action==='add'){ div.style.opacity=0; setTimeout(()=>{div.style.opacity=1; div.style.transition='opacity 0.5s';},10);}
            dropdown.appendChild(div);
        });
        const totalDiv=document.createElement('div');
        totalDiv.style.fontWeight='bold';
        totalDiv.style.marginTop='10px';
        totalDiv.textContent=`Total: $${total.toFixed(2)}`;
        dropdown.appendChild(totalDiv);
    }

    // Toggle cart dropdown
    document.getElementById('cart-counter').addEventListener('click', ()=>{
        const dropdown=document.getElementById('cart-dropdown');
        dropdown.style.display = dropdown.style.display==='block'?'none':'block';
    });

    // Show cart only after scrolling to products & hide landing bg
    const landingSection = document.querySelector('.landing');
    window.addEventListener('scroll', ()=>{
        const mainTop=document.getElementById('main').offsetTop;
        const cartWrapper=document.getElementById('cart-wrapper');

        if(window.scrollY+50 >= mainTop){
            cartWrapper.style.display='block';
            landingSection.classList.add('background-hidden');
        } else {
            cartWrapper.style.display='none';
            landingSection.classList.remove('background-hidden');
        }
    });

    // Product card staggered animation
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => card.classList.add('hidden')); // hide initially

    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if(entry.isIntersecting){
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.classList.remove('hidden');
                }, index * 150); // stagger: 150ms per card
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    productCards.forEach(card => observer.observe(card));

});
