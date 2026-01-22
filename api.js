let shoppingCart = [];

function renderMainContent() {
  renderHeaderAndSidebar();
  renderMenuNavigation();
  renderMenuCategoriesAndDishes(menuObjects.menu);
  initShoppingCartRendering();
}

function initShoppingCartRendering(targetId = "sidebar_shoppingcart_items") {
  renderShoppingCart(targetId);
  updateCartButtonTotal();
}

function renderHeaderAndSidebar() {
  const contentContainer = document.getElementById("content_menu_and_sidebar");
  contentContainer.innerHTML += getHeaderTemplate() + getMenuSidebarTemplate();
}

function renderMenuNavigation() {
  const menuContainer = document.getElementById("content_menu");
  const linksHTML = generateCategoryLinksHTML(menuObjects.categories);
  menuContainer.innerHTML += getMenuNavigationTemplate(linksHTML);
}

function formatPrice(value) {
  return value.toFixed(2).replace(".", ",") + " €";
}

function renderMenuCategoriesAndDishes(menu) {
  const menuContainer = document.getElementById("content_menu");
  let lastCategory = null;

  for (let i = 0; i < menu.length; i++) {
    const dish = menu[i];
    const currentCategory = dish.category;

    if (currentCategory !== lastCategory) {
      lastCategory = currentCategory;
      const categoryImage = menuObjects.categoryImages[currentCategory];
      menuContainer.innerHTML += getMenuCategoryTemplate(currentCategory, categoryImage, "");
    }

    menuContainer.innerHTML += getMenuDishTemplate(dish);
  }
}


/*
function renderMenuCategoriesAndDishes(menu) {
  const menuContainer = document.getElementById("content_menu");
  let lastCategory = null;
  renderMenuLoop(menu, menuContainer, lastCategory);
}

function renderMenuLoop(menu, menuContainer, lastCategory) {
  for (let i = 0; i < menu.length; i++) {
    const dish = menu[i];
    const currentCategory = dish.category;
    lastCategory = handleCategoryChange(currentCategory, lastCategory, menuContainer);
    menuContainer.innerHTML += getMenuDishTemplate(dish);
  }
}

function handleCategoryChange(currentCategory, lastCategory, menuContainer) {
  if (currentCategory !== lastCategory) {
    const categoryImage = menuObjects.categoryImages[currentCategory];
    menuContainer.innerHTML += getMenuCategoryTemplate(currentCategory, categoryImage, "");
    return currentCategory;
  }
  return lastCategory;
}


renderMenuCategoriesAndDishes: Einstiegspunkt, ruft die ausgelagerte Schleife auf.

renderMenuLoop: Steuert die Iteration.

handleCategoryChange: Führt die if-Bedingung und zugehörige Aktionen aus, und gibt ggf. die neue lastCategory zurück.

*/

function increaseQuantity(name, price) {
  addProductToCart(name, price);
}

function addProductToCart(name, price) {
  for (let i = 0; i < shoppingCart.length; i++) {
    if (shoppingCart[i].name === name) {
      shoppingCart[i].quantity++;
      resetCartView();
      toggleCartEmptyMessage(true);
      return;
    }
  }

  shoppingCart.push({ name, price, quantity: 1 });
  resetCartView();
  toggleCartEmptyMessage(true);
}

function renderShoppingCart(targetId = "sidebar_shoppingcart_items") {
  const cartContainer = document.getElementById(targetId);
  if (!cartContainer) return;

  cartContainer.innerHTML = "";
  let subtotal = 0;
  const shipping = 5;

  for (let i = 0; i < shoppingCart.length; i++) {
    const item = shoppingCart[i];
    subtotal += item.price * item.quantity;
    cartContainer.innerHTML += getShoppingCartTemplate(item);
  }

  if (shoppingCart.length) {
    const total = subtotal + shipping;
    cartContainer.innerHTML += getShoppingCartSummaryTemplate(subtotal, shipping, total);
  }

  toggleCartEmptyMessage(shoppingCart.length > 0);
}


/*



function renderShoppingCart(targetId = "sidebar_shoppingcart_items") {
  const cartContainer = document.getElementById(targetId);
  if (!cartContainer) return;

  cartContainer.innerHTML = "";
  let subtotal = 0;
  const shipping = 5;

  subtotal = renderCartItems(cartContainer);
  handleCartSummary(cartContainer, subtotal, shipping);

  toggleCartEmptyMessage(shoppingCart.length > 0);
}

function renderCartItems(cartContainer) {
  let subtotal = 0;
  for (let i = 0; i < shoppingCart.length; i++) {
    const item = shoppingCart[i];
    subtotal += item.price * item.quantity;
    cartContainer.innerHTML += getShoppingCartTemplate(item);
  }
  return subtotal;
}

function handleCartSummary(cartContainer, subtotal, shipping) {
  if (shoppingCart.length) {
    const total = subtotal + shipping;
    cartContainer.innerHTML += getShoppingCartSummaryTemplate(subtotal, shipping, total);
  }
}

renderCartItems(cartContainer)
→ Durchläuft den Warenkorb, rendert Items und berechnet den subtotal.

handleCartSummary(cartContainer, subtotal, shipping)
→ Führt die if (shoppingCart.length)-Bedingung aus und rendert die Zusammenfassung, wenn nötig.

toggleCartEmptyMessage(...)
→ Bleibt unverändert, da sie keine Schleife oder if enthält.



ODER



function renderShoppingCart(targetId = "sidebar_shoppingcart_items") {
  const cartContainer = document.getElementById(targetId);
  if (!cartContainer) return;

  cartContainer.innerHTML = "";
  const subtotal = renderCartItems(cartContainer);
  handleCartSummary(cartContainer, subtotal, 5);
  toggleCartEmptyMessage(shoppingCart.length > 0);
}

function renderCartItems(container) {
  return shoppingCart.reduce((sum, item) => {
    container.innerHTML += getShoppingCartTemplate(item);
    return sum + item.price * item.quantity;
  }, 0);
}

function handleCartSummary(container, subtotal, shipping) {
  if (!shoppingCart.length) return;
  const total = subtotal + shipping;
  container.innerHTML += getShoppingCartSummaryTemplate(subtotal, shipping, total);
}
🔍 Änderungen im Detail:
subtotal wird direkt bei der Deklaration durch renderCartItems() berechnet.

Die shipping-Konstante (5) wird direkt als Argument übergeben.

Die for-Schleife in renderCartItems wurde durch reduce() ersetzt – gleich kurz & funktional.

Die if-Bedingung in handleCartSummary ist umgedreht (early return), um die Lesbarkeit zu erhöhen.

*/

function updateCartButtonTotal() {
  let total = 0;
  for (let i = 0; i < shoppingCart.length; i++) {
    total += shoppingCart[i].price * shoppingCart[i].quantity;
  }
  const cartButton = document.getElementById("cart_button_total");
  if (cartButton) cartButton.innerText = `🛒 Warenkorb ${formatPrice(total)}`;
}

function placeOrder() {
  shoppingCart = [];
  const confirmationMessage = getOrderConfirmationTemplate();
  const sidebarCart = document.getElementById("sidebar_shoppingcart_items");
  const overlayCart = document.getElementById("sidebar_overlay_content");
  if (sidebarCart) sidebarCart.innerHTML = confirmationMessage;
  if (overlayCart) overlayCart.innerHTML = confirmationMessage;
  updateCartButtonTotal();
}

function toggleCartEmptyMessage(hasItems) {
  const sidebarCaptions = document.getElementsByClassName("sidebar_shoppingcart_caption");
  const overlayCaptions = document.getElementsByClassName("sidebar_overlay_caption");

  for (let i = 0; i < sidebarCaptions.length; i++) {
    sidebarCaptions[i].style.display = hasItems ? "none" : "flex";
  }

  for (let i = 0; i < overlayCaptions.length; i++) {
    overlayCaptions[i].style.display = hasItems ? "none" : "flex";
  }
}

function resetCartView() {
  initShoppingCartRendering();
  renderShoppingCart("sidebar_overlay_content");
  renderShoppingCart(); 
}

function toggleSidebarOverlay() {
  let overlayElement = document.getElementById("sidebar_overlay");

  if (window.innerWidth >= 850) {
    if (overlayElement) overlayElement.style.display = "none";
    document.body.classList.remove("overlay_no_scroll");
    return;
  }

  if (!overlayElement) {
    document.body.innerHTML += getSidebarOverlayTemplate();
    overlayElement = document.getElementById("sidebar_overlay");
  }

  const shouldShow = overlayElement.style.display === "none" || overlayElement.style.display === "";
  overlayElement.style.display = shouldShow ? "flex" : "none";
  document.body.classList.toggle("overlay_no_scroll", shouldShow);

  if (shouldShow) {
    renderShoppingCart("sidebar_overlay_content");
  }
}


/*

function toggleSidebarOverlay() {
  if (window.innerWidth >= 850) {
    hideOverlay();
    return;
  }

  let overlay = getOrCreateOverlay();
  toggleOverlayVisibility(overlay);
}

Wenn das Fenster mindestens 850px breit ist → wird das Overlay einfach ausgeblendet (hideOverlay()).

Ansonsten:

Holt oder erstellt das Overlay-Element (getOrCreateOverlay()).

Schaltet die Anzeige an/aus + blockiert ggf. Scrollen (toggleOverlayVisibility()).

function hideOverlay() {
  const overlay = document.getElementById("sidebar_overlay");
  if (overlay) overlay.style.display = "none";
  document.body.classList.remove("overlay_no_scroll");
}

Was macht sie?

Holt das Overlay-Element (falls vorhanden).

Blendet es aus.

Hebt die no-scroll-Klasse auf, damit der Hintergrund wieder scrollbar ist.


function getOrCreateOverlay() {
  let overlay = document.getElementById("sidebar_overlay");
  if (!overlay) {
    document.body.innerHTML += getSidebarOverlayTemplate();
    overlay = document.getElementById("sidebar_overlay");
  }
  return overlay;
}

Prüft, ob das Overlay schon existiert.

Falls nicht:

Fügt das Overlay-HTML in den Body ein.

Holt es danach nochmal per getElementById.

Gibt das Overlay-Element zurück, damit es weiterverwendet werden kann.



function toggleOverlayVisibility(overlay) {
  const shouldShow = !overlay.style.display || overlay.style.display === "none";
  overlay.style.display = shouldShow ? "flex" : "none";
  document.body.classList.toggle("overlay_no_scroll", shouldShow);
  if (shouldShow) renderShoppingCart("sidebar_overlay_content");
}

Was macht sie?

Entscheidet, ob das Overlay gerade gezeigt oder versteckt werden soll.

Zeigt es an (flex) oder versteckt es (none).

Fügt die no-scroll-Klasse nur hinzu, wenn das Overlay sichtbar ist.

Wenn es sichtbar wird, wird der Warenkorb im Overlay gerendert.

*/

function decreaseQuantity(name) {
  for (let i = 0; i < shoppingCart.length; i++) {
    if (shoppingCart[i].name === name) {
      shoppingCart[i].quantity--;
      if (shoppingCart[i].quantity <= 0) shoppingCart.splice(i, 1);
      break;
    }
  }

  resetCartView();
  toggleCartEmptyMessage(shoppingCart.length > 0);
}

function removeItem(name) {
  const updatedCart = [];
  for (let i = 0; i < shoppingCart.length; i++) {
    if (shoppingCart[i].name !== name) {
      updatedCart.push(shoppingCart[i]);
    }
  }
  shoppingCart = updatedCart;
  resetCartView();
  toggleCartEmptyMessage(shoppingCart.length > 0);
}