function getHeaderTemplate() {
  return `

<section class="content_menu_and_sidebar_background_color">

  <div class="restaurant_header_section">
    <img class="restaurant_header_section_image" src="${menuObjects.restaurant_cover_img}" alt="Restaurant Cover" />
    <img class="restaurant_header_section_logo" src="${menuObjects.logo}" alt="Restaurant Logo" />
  </div>

  <div class="content_above_header_section_image">
    <h1 class="restaurant_header_name">${menuObjects.name}</h1>
    <div class="restaurant_header_rating">${menuObjects.rating}</div>

    <div id="content_menu" class="content_menu"></div>

    <div class="menu_category_bottom_imprint">
      <img class="menu_category_bottom_imprint_icon" src="${menuObjects.imprint_icon}" alt="Imprint Icon" />
      <p class="menu_category_bottom_imprint_name">${menuObjects.imprint}</p>
      <p class="menu_category_bottom_imprint_address">${menuObjects.address}</p>
    </div>
  </div>

  <div id="sidebar_shoppingcart_overlay" class="sidebar_shoppingcart_overlay">
   <div id="sidebar_overlay" class="sidebar_overlay">
   <h1>Warenkorb</h1>
   <div class="sidebar_overlay_caption" >
  
   <img class="sidebar_shoppingcart_image" src="img/shopping_cart.png" alt="Warenkorb" />
  <h2>Fülle deinen Warenkorb</h2>
  <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
  </div>
  <div id="sidebar_overlay_content" class="sidebar_overlay_content">
</div>
  </div>


</section>

`;
} 

function getMenuSidebarTemplate() {
  return `
<aside class="sidebar_shoppingcart">
 <div id="content_sidebar" class="content_sidebar">
 <h1 class="content_sidebar_header">Warenkorb</h1>
  <div class="sidebar_shoppingcart_caption"  id="shoppingcart_overlay">
  
   <img class="sidebar_shoppingcart_image" src="img/shopping_cart.png" alt="Warenkorb" />
  <h2>Fülle deinen Warenkorb</h2>
  <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
  </div>
   <div id="sidebar_shoppingcart_items" class="sidebar_shoppingcart_items">

   </div>
   </div>
   
</aside>
`;
}

function getMenuNavigationTemplate(linksHTML) {
  return `
    <section class="menu_navigation_section">
  
      <div class="menu_navigation_category_slide">
        ${linksHTML}
      </div>
    </section>
  `;
}

function generateCategoryLinksHTML(categories) {
  let linksHTML = "";
  for (const key in categories) {
    linksHTML += `<a href="#${key}"><h4>${categories[key]}</h4></a>`;
  }
  return linksHTML;
}


function getMenuDishTemplate(dish) {
  return `
  <div class="menu_category_dish_item">
    <div class="menu_category_dish_caption">
      <h4>${dish.name}</h4>
      <p class="menu_category_dish_item_price">${formatPrice(dish.price)}</p>
      <p>${dish.description}</p>
    </div>
    <div class="menu_category_dish_item_image_and_button">
      <img class="menu_category_dish_item_image" src="${dish.dish_img}" />
      <button class="menu_category_dish_item_button" onclick="addProductToCart('${
        dish.name
      }', ${dish.price})">+</button>
    </div>
  </div>
  `;
}

function getMenuCategoryTemplate(categoryName, categoryImg, categoryDishes) {
  return `
  <section class="menu_category_item_section"  id="${categoryName}"> 
    <img class="menu_category_image" src="${categoryImg}" />
    <div class="menu_category_caption">
      <h2 >${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2>
    </div>
    <div class="menu_category_dish_container">
      ${categoryDishes}
    </div>
  </section>
  `;
}

function getShoppingCartTemplate(item) {
  return `
    <div class="cart-item">
      <div class="cart-item-info">
        <span>${item.quantity}x ${item.name}</span>
        <span>${formatPrice(item.price * item.quantity)}</span>
      </div>
      <div class="cart-item-actions">
      <button onclick="increaseQuantity('${item.name}', ${item.price})">+</button>
<button onclick="decreaseQuantity('${item.name}')">–</button>
<button onclick="removeItem('${item.name}')">🗑</button>
      </div>
    </div>
  `;
}


function getShoppingCartSummaryTemplate(subtotal, shipping, total) {
  return `
    <div class="sidebar_cart_subtotal">
      <div>Zwischensumme:</div> ${formatPrice(subtotal)}
    </div>
    <div class="sidebar_cart_shipping">
      <div>Versandkosten:</div> ${formatPrice(shipping)}
    </div>
    <div class="sidebar_cart_total">
      <span>Gesamt:</span> ${formatPrice(total)}
    </div>
    <div class="order-button-wrapper">
      <button class="sidebar_cart_order_button" onclick="placeOrder()">Bestellen</button>
    </div>
  `;
}

function getOrderConfirmationTemplate() {
  return `
    <div class="order-message">
      <h3>Deine Bestellung ist unterwegs!</h3>
      <button class="order-message-fill-cart-button" button onclick="resetCartView()">Fülle deinen Warenkorb</button>
    </div>
  `;
}

function getSidebarOverlayTemplate() {
  return `
    <div class="sidebar_overlay">
      <div class="sidebar_overlay_caption" id="overlay_shoppingcart_caption">
        <img class="sidebar_shoppingcart_image" src="img/shopping_cart.png" alt="Warenkorb" />
        <h2>Fülle deinen Warenkorb</h2>
        <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
      </div>
      <div class="sidebar_overlay_content" id="sidebar_overlay_content"></div>
    </div>

  `;
}
