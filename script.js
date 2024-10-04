// const debugLog = (message) => {
//   console.log(`[Debug] ${message}`);
// };
const badge = document.querySelector(".badge");
const menu = document.querySelector(".menu");
const carLink = document.querySelectorAll(".car-link");
const ulMiddle = document.querySelector(".middle");
const bottom = document.querySelector(".bottom");
const div = document.createElement("div");
const hamburger = document.querySelector(".fa-bars");
const car1 = document.querySelector(".car1");

let activeState = "chairs";
div.classList.add("mobmenu", "hide");
bottom.appendChild(div);
Array.from(ulMiddle.children).forEach((element) => {
  const clonedElement = element.cloneNode(true);
  div.appendChild(clonedElement);
});

menu.onclick = () => {
  div.classList.toggle("hide");

  if (hamburger.classList.contains("fa-bars")) {
    hamburger.classList.remove("fa-bars");
    hamburger.classList.add("fa-xmark");
  } else {
    hamburger.classList.remove("fa-xmark");
    hamburger.classList.add("fa-bars");
  }
};

Array.from(carLink).forEach(
  (link) =>
    (link.onclick = (e) => {
      Array.from(e.target.parentElement.children).forEach((li) => {
        li.classList.remove("car-active");
      });
      e.target.classList.add("car-active");
      activeState = e.target.innerText.toLowerCase() || "chairs";
      if (activeState == "lights") {
        activeState = "lamps";
      }
      addCards();
    })
);

const products = [
  {
    id: 1,
    category: "chairs",
    url: "imagess/chair1.png",
    title: "Modern Lounge Chair",
    price: "$199",
  },
  {
    id: 2,
    category: "chairs",
    url: "imagess/chair2.png",
    title: "Classic Wooden Chair",
    price: "$149",
  },
  {
    id: 3,
    category: "chairs",
    url: "imagess/chair3.png",
    title: "Ergonomic Office Chair",
    price: "$249",
  },
  {
    id: 4,
    category: "chairs",
    url: "imagess/chair4.png",
    title: "Outdoor Patio Chair",
    price: "$89",
  },
  {
    id: 5,
    category: "chairs",
    url: "imagess/chair5.png",
    title: "Recliner Leather Chair",
    price: "$299",
  },
  {
    id: 6,
    category: "accessories",
    url: "imagess/vase.png",
    title: "Decorative Vase",
    price: "$25",
  },
  {
    id: 7,
    category: "accessories",
    url: "imagess/vase2.jpg",
    title: "Wall Art",
    price: "$75",
  },
  {
    id: 8,
    category: "accessories",
    url: "imagess/vase3.png",
    title: "Table Vase",
    price: "$45",
  },
  {
    id: 9,
    category: "accessories",
    url: "imagess/study_lamp.png",
    title: "Table Lamp",
    price: "$35",
  },
  {
    id: 10,
    category: "sofas",
    url: "imagess/sofa.png",
    title: "Leather Sectional Sofa",
    price: "$899",
  },
  {
    id: 11,
    category: "sofas",
    url: "imagess/chair1.png",
    title: "Leather Sectional Sofa",
    price: "$699",
  },
  {
    id: 12,
    category: "lamps",
    url: "imagess/lamp1.png",
    title: "Floor Standing Lamp",
    price: "$150",
  },
  {
    id: 13,
    category: "lamps",
    url: "imagess/lamp2.png",
    title: "Modern Table Lamp",
    price: "$75",
  },
  {
    id: 14,
    category: "lamps",
    url: "imagess/lamp3.png",
    title: "Rustic Table Lamp",
    price: "$90",
  },
  {
    id: 15,
    category: "lamps",
    url: "imagess/lamp4.png",
    title: "Modern Lamp",
    price: "$90",
  },
  {
    id: 16,
    category: "lamps",
    url: "imagess/lamp5.png",
    title: "Night Lamp",
    price: "$170",
  },
];

const addCards = () => {
  const categorisedProducts = products.filter(
    (product) => product.category === activeState && product.price !== ""
  );

  const cardTray = document.createElement("div");
  cardTray.classList.add("cardTray");

  categorisedProducts.map((product) => {
    const card = document.createElement("div");
    card.classList.add("card-product");

    card.innerHTML = `
    <div class="card">
      <img class="card-img" src=${product.url} alt="${product.title}">
      <h2 class="card-title">${product.title}</h2>
      <span class="price">${product.price}</span>
      <div class="button-plate">
          <button class="addtocart" data-id=${product.id}>ADD TO CART</button>
          <button class="like"><i class="fa fa-heart"></i></button>
          <button class="expand"><i class="fa fa-compress"></i></button>
      </div>
    </div>`;

    card.onmouseover = () => {
      card.classList.add("cardhover");
    };
    card.onmouseleave = () => {
      card.classList.remove("cardhover");
    };

    cardTray.appendChild(card);
  });

  const oldcardTray = document.querySelector(".cardTray");
  if (oldcardTray) {
    car1.removeChild(oldcardTray);
  }
  car1.appendChild(cardTray);
  const prevB = document.querySelector(".prev1");
  const nextB = document.querySelector(".next1");

  if (prevB && nextB) {
    car1.removeChild(prevB);
    car1.removeChild(nextB);
  }
  const prevBtn = document.createElement("span");
  prevBtn.classList.add("prev1");
  const nextBtn = document.createElement("span");
  nextBtn.classList.add("next1");

  const prevIcon = document.createElement("i");
  prevIcon.classList.add("fa", "fa-angle-left");
  prevBtn.appendChild(prevIcon);

  const nextIcon = document.createElement("i");
  nextIcon.classList.add("fa", "fa-angle-right");
  nextBtn.appendChild(nextIcon);

  car1.appendChild(prevBtn);
  car1.appendChild(nextBtn);

  prevBtn.onclick = () => moveLastToFirst(cardTray);
  nextBtn.onclick = () => moveFirstToLast(cardTray);

  addToCartListeners();
};

const setupBlogCarouselControls = () => {
  const blogCarousel = document.querySelector(".blogs.car2");
  if (!blogCarousel) {
    return;
  }

  const prev2 = blogCarousel.querySelector(".secondprev");
  const next2 = blogCarousel.querySelector(".secondnext");
  const cardTrayBlog = blogCarousel.querySelector(".cardTray-blog");

  if (!prev2 || !next2 || !cardTrayBlog) {
    return;
  }

  prev2.addEventListener("click", () => {
    moveLastToFirst(cardTrayBlog);
  });

  next2.addEventListener("click", () => {
    moveFirstToLast(cardTrayBlog);
  });
};

const moveLastToFirst = (tray) => {
  if (tray.lastElementChild) {
    const lastChild = tray.lastElementChild;
    tray.removeChild(lastChild);
    tray.prepend(lastChild);
  }
};

const moveFirstToLast = (tray) => {
  if (tray.firstElementChild) {
    const firstChild = tray.firstElementChild;
    tray.removeChild(firstChild);
    tray.appendChild(firstChild);
  } else {
  }
};
let productsInCart = [];
let productItemsInCart = [];
const cart = document.createElement("div");
cart.innerHTML = `<span class="title padding">No items here yet!</span>`;
cart.classList.add("cart");

let fadeOutSearch;
const searchIcon = document.querySelector(".searchIcon");
const searchbar = searchIcon.querySelector(".searchbar");

searchIcon.onmouseover = () => {
  clearTimeout(fadeOutSearch);
  searchbar.classList.add("show");
  if (searchbar.classList.contains("fade-out")) {
    searchbar.classList.remove("fade-out");
  }
  searchbar.classList.add("fade-in");
};

searchIcon.onmouseleave = () => {
  if (searchbar.classList.contains("fade-in")) {
    searchbar.classList.remove("fade-in");
  }
  searchbar.classList.add("fade-out");
  fadeOutSearch = setTimeout(() => {
    if (!searchIcon.matches(":hover")) {
      searchbar.classList.remove("show");
    }
  }, 1000);
};

searchbar.onmouseenter = () => {
  clearTimeout(fadeOutSearch);
  if (searchbar.classList.contains("fade-out")) {
    searchbar.classList.remove("fade-out");
  }
  searchbar.classList.add("show", "fade-in");
};

searchbar.onmouseleave = () => {
  if (searchbar.classList.contains("fade-in")) {
    searchbar.classList.remove("fade-in");
  }
  searchbar.classList.add("fade-out");
  fadeOutSearch = setTimeout(() => {
    if (!searchIcon.matches(":hover")) {
      searchbar.classList.remove("show");
    }
  }, 2000);
};

let fadeOut;

const cartIcon = document.querySelector("#cart-shopping");
cartIcon.appendChild(cart);

cartIcon.onmouseover = () => {
  clearTimeout(fadeOut);
  cart.classList.add("show");
  if (cart.classList.contains("fade-out")) {
    cart.classList.remove("fade-out");
  }
  cart.classList.add("fade-in");
};

cartIcon.onmouseleave = () => {
  if (cart.classList.contains("fade-in")) {
    cart.classList.remove("fade-in");
  }
  cart.classList.add("fade-out");
  fadeOut = setTimeout(() => {
    if (!cart.matches(":hover")) {
      cart.classList.remove("show");
    }
  }, 2000);
};

cart.onmouseenter = () => {
  clearTimeout(fadeOut);
  if (cart.classList.contains("fade-out")) {
    cart.classList.remove("fade-out");
  }
  cart.classList.add("show", "fade-in");
};

cart.onmouseleave = () => {
  if (cart.classList.contains("fade-in")) {
    cart.classList.remove("fade-in");
  }
  cart.classList.add("fade-out");
  fadeOut = setTimeout(() => {
    if (!cartIcon.matches(":hover")) {
      cart.classList.remove("show");
    }
  }, 2000);
};
function addToCartListeners() {
  const atcs = document.querySelectorAll(".addtocart");
  atcs.forEach((btn) => {
    btn.onclick = () => {
      productsInCart = [...productsInCart, btn.dataset.id];
      productItemsInCart = products.filter((product) =>
        productsInCart.includes(product.id.toString())
      );

      updateCart();
    };
  });
}
let price = 0;

function updateCart() {
  cart.innerHTML = "";
  price = 0;
  if (productItemsInCart.length) {
    badge.innerText = productItemsInCart.length;
    badge.classList.add("show");

    productItemsInCart.forEach((product) => {
      const item = document.createElement("div");
      price += Number.parseFloat(product.price.replace(/[^0-9.-]+/g, ""));

      item.innerHTML = `
        <div class="cart-product">
          <div class="img"><img src="${product.url}" alt="err"></div>
          <div class="details">
              <div class="title">${product.title}</div>
              <div class="price">${product.price}</div>
          </div>
        </div>
      `;
      cart.appendChild(item);
    });

    cart.innerHTML += `
      <div class='cart-end'>
        <span class="price-cart">Total: $${price.toFixed(2)}</span>
        <hr>
        <div class="cart-buttons-container">
  <button class="cart-button readmore">Checkout</button>
  <button class="cart-button empty">
    <i class="fa fa-trash"></i>
  </button>
</div>

      </div>`;

    const emptyCartButton = cart.querySelector(".empty");
    emptyCartButton.addEventListener("click", emptyCart);
  } else {
    badge.classList.remove("show");
    cart.innerHTML = `<span class="title padding">No items here yet!</span>`;
  }
}

function emptyCart() {
  productsInCart = [];
  productItemsInCart = [];
  updateCart();
  const badge = document.querySelector(".badge");
  badge.innerHTML = 0;
  badge.classList.remove("show");
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      addToCartListeners();
    }
  });
});

observer.observe(car1, { childList: true, subtree: true });

addCards();

document.addEventListener("DOMContentLoaded", () => {
  setupBlogCarouselControls();
});

const cartObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      console.log("Cart updated:");
    }
  });
});

cartObserver.observe(cart, { childList: true });
