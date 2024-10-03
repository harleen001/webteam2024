const menu = document.querySelector(".menu");

const ulMiddle = document.querySelector(".middle");
const bottom = document.querySelector(".bottom");
const div = document.createElement("div");
const hamburger = document.querySelector(".fa-bars"); 
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
