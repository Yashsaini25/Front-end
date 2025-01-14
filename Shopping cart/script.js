document.addEventListener('DOMContentLoaded', function() {
  const products_list=document.getElementById("products_list");
  const cart_items=document.getElementById("cart_items");
  const empty_cart=document.getElementById("empty_cart");
  const cart_total=document.getElementById("cart_total");
  const total=document.getElementById("total");
  const checkout_btn=document.getElementById("checkout_btn");

  const products=[
    {id:1, name:"Product 1", price:100},
    {id:2, name:"Product 2", price:200},
    {id:3, name:"Product 3", price:300},
  ];

  let cart=JSON.parse(localStorage.getItem("cart")) || [];

  products.forEach((product) => {
    const product_item=document.createElement("div");
    product_item.classList.add("product");
    product_item.classList="bg-black/50 text-white p-4 rounded-lg mb-2 flex items-center justify-between";
    
    product_item.textContent=`${product.name}- $${product.price.toFixed(2)}`;

    const add_to_cart_btn=document.createElement("button");
    add_to_cart_btn.textContent="Add to cart";
    add_to_cart_btn.className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-md hover:bg-gradient-to-l hover:from-green-500 hover:to-blue-500";
    add_to_cart_btn.setAttribute("data-id", product.id);

    product_item.appendChild(add_to_cart_btn);
    products_list.appendChild(product_item);
  });

  cart.forEach((product) => {
    renderCart(product);
  });

  products_list.addEventListener("click", function(event) {
    if(event.target.tagName==="BUTTON"){
      const id=parseInt(event.target.getAttribute("data-id"));
      const product=products.find((p) => p.id===id);

      cart.push(product);
      saveCart();
      renderCart(product);
    }
  });

  function renderCart(product){
    const quantity=cart.filter((p) => p.id===product.id).length;

    let cart_item=document.querySelector(`.cart_item[data-id="${product.id}"]`);
    if(!cart_item){
      cart_item=document.createElement("div");
      cart_item.className="cart_item bg-black/50 text-white p-4 rounded-lg mb-2 flex items-center justify-between";
    
      const product_description=document.createElement("div");
      product_description.className="flex flex-col items-start";

      const product_name=document.createElement("span");
      product_name.textContent=`${product.name}- $${product.price.toFixed(2)}`;

      let product_qty=document.createElement("span");
      product_qty.className="product_qty";
      product_qty.textContent=`Quantity: ${quantity}`;

      product_description.appendChild(product_name);
      product_description.appendChild(product_qty);

      const delete_btn=document.createElement("button");
      delete_btn.className="bg-gradient-to-r from-red-500 to-yellow-500 p-2 rounded-md hover:bg-gradient-to-l hover:from-red-500 hover:to-yellow-500";
      delete_btn.textContent="Delete item";
      delete_btn.addEventListener("click", function() {
        cart=cart.filter((p) => p.id!==product.id);
        saveCart();
        cart_item.remove();

        if(cart.length===0){
          empty_cart.classList.remove("hidden");
          cart_total.classList.add("hidden");
        }

        const total_price=cart.reduce((total, product) => total+product.price, 0);
        total.textContent=`${total_price.toFixed(2)}`;
      });

      cart_item.appendChild(product_description);
      cart_item.appendChild(delete_btn);

      cart_item.setAttribute("data-id", product.id);
      cart_items.appendChild(cart_item);
    }

    else {
      const productQty = cart_item.querySelector(".product_qty");
      productQty.textContent = `Quantity: ${quantity}`;
    }

    empty_cart.classList.add("hidden");
    cart_total.classList.remove("hidden");

    const total_price=cart.reduce((total, product) => total+product.price, 0);
    total.textContent=`${total_price.toFixed(2)}`;
  }

  checkout_btn.addEventListener("click", function() {
    cart=[];
    saveCart();

    const cart_items_container = document.getElementById('cart_items');
    const cart_item_elements = cart_items_container.querySelectorAll('.cart_item');
    cart_item_elements.forEach(item => item.remove());
   
    alert("Checkout successfully");
    empty_cart.classList.remove("hidden");
    cart_total.classList.add("hidden");
  });

  function saveCart(){
    localStorage.setItem("cart",JSON.stringify(cart));
  }
});