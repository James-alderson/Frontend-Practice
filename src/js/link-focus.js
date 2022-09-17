const LINKS = document.querySelectorAll(".solution__link")
const SOLUTIONS = document.querySelectorAll(".solution__item")

LINKS.forEach(link => {
  link.addEventListener("keyup", addFocus)
})

window.addEventListener("click", removeFocus)

function addFocus(event) {
  let solutionElement = event.target.closest(".solution__item")

  if (event.key === "Tab" || event.keyCode === 9) {
    SOLUTIONS.forEach(solution => solution.classList.remove("active"))
    solutionElement.classList.add("active")
  }
}

function removeFocus() {
  SOLUTIONS.forEach(solution => solution.classList.remove("active"))
}
