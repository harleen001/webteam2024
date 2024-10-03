const menu = document.querySelector(".menu");
const ulMiddle = document.querySelector(".middle");
const bottom = document.querySelector(".bottom");
const div = document.createElement("div");
div.classList.add("mobmenu");
bottom.appendChild(div);
const list = Array.from(ulMiddle.children).map((element) => {
  div.appendChild(element);
});
menu.onclick = () => {
    div.classList.toggle("hide");
};
