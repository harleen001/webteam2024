// const debugLog = (message) => {
//   console.log(`[Debug] ${message}`);
// };

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

const products = {
  chairs: [
    { url: `imagess/chair1.png`, title: "Modern Lounge Chair", price: "$199" },
    { url: `imagess/chair2.png`, title: "Classic Wooden Chair", price: "$149" },
    {
      url: `imagess/chair3.png`,
      title: "Ergonomic Office Chair",
      price: "$249",
    },
    { url: `imagess/chair4.png`, title: "Outdoor Patio Chair", price: "$89" },
    {
      url: `imagess/chair5.png`,
      title: "Recliner Leather Chair",
      price: "$299",
    },
  ],
  accessories: [
    { url: `imagess/vase.png`, title: "Decorative Vase", price: "$25" },
    { url: `imagess/vase2.jpg`, title: "Wall Art", price: "$75" },
    { url: `imagess/vase3.png`, title: "Table Vase", price: "$45" },
    { url: `imagess/study_lamp.png`, title: "Table Lamp", price: "$35" },
  ],
  sofas: [
    { url: `imagess/sofa.png`, title: "Leather Sectional Sofa", price: "$899" },
    {
      url: `imagess/chair1.png`,
      title: "Leather Sectional Sofa",
      price: "$699",
    },
  ],
  lamps: [
    { url: `imagess/lamp1.png`, title: "Floor Standing Lamp", price: "$150" },
    { url: `imagess/lamp2.png`, title: "Modern Table Lamp", price: "$75" },
    { url: `imagess/lamp3.png`, title: "Rustic Table Lamp", price: "$90" },
    { url: `imagess/lamp4.png`, title: "Modern Lamp", price: "$90" },
    { url: `imagess/lamp5.png`, title: "Night Lamp", price: "$170" },
  ],
};

const addCards = () => {
  const categorisedProducts = {
    [activeState]: products[activeState].filter((item) => item.price !== ""),
  };
  const cardTray = document.createElement("div");
  cardTray.classList.add("cardTray");

  categorisedProducts[activeState].map((product) => {
    const card = document.createElement("div");
    card.classList.add("card-product");
    card.innerHTML = `
      <div class="card">
        <img class="card-img" src=${product.url} alt="">
        <h2 class="card-title">${product.title}</h2>
        <span class="price">${product.price}</span>
        <div class="button-plate">
            <button class="addtocart">ADD TO CART</button>
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

  observer.observe(cardTray, { childList: true });
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

const mutationCallback = (mutationsList) => {
  mutationsList.forEach((mutation) => {
    if (mutation.type === "childList") {
      console.log("Card tray has been updated.");
    }
  });
};

const observer = new MutationObserver(mutationCallback);

addCards();

observer.observe(car1, { childList: true });

document.addEventListener("DOMContentLoaded", () => {
  setupBlogCarouselControls();
});
