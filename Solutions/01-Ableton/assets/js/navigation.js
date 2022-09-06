const HEADER = document.querySelector("header")
const NAV_MENU_BTN = document.querySelector("#navMenuBtn")
const NAV_MORE_BTN = document.querySelector("#navMoreBtn")
const NAV_MORE = document.querySelector("#navMore")

NAV_MENU_BTN.addEventListener("click", openNavMenu)
NAV_MORE_BTN.addEventListener("click", openNavMore)
window.addEventListener("resize", resize)
window.addEventListener("click", closeNavMenu)

function openNavMenu() {
  HEADER.classList.toggle("active")
}

function openNavMore() {
  NAV_MORE_BTN.classList.toggle("active")
  NAV_MORE.classList.toggle("active")
}

function resize() {
  if (window.innerWidth > 1023) HEADER.classList.remove("active")
}

function closeNavMenu(event) {
  let targetElement = event.target
  if (!targetElement.closest("header")) HEADER.classList.remove("active")
}
