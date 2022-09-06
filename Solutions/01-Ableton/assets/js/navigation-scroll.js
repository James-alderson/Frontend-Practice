const NAV_SCROLL = document.querySelector("#navScroll")
let PREV_POSITION_Y = window.scrollY

window.addEventListener("scroll", windowScroll)

function windowScroll() {
  let currentPositionY = window.scrollY
  
  if (window.innerWidth > 1023) {
    if (PREV_POSITION_Y > currentPositionY) NAV_SCROLL.classList.add("active")
    else NAV_SCROLL.classList.remove("active")

    PREV_POSITION_Y = currentPositionY
  }
}
