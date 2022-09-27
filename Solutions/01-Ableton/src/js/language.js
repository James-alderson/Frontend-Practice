const LANGUAGE = document.querySelector("#language")

LANGUAGE.addEventListener("change", changeLanguage)

function changeLanguage(event) {
  let lang = event.target.value

  if (lang === "en") window.location.assign("../index.html")
  else window.location.assign(`../languages/index.${lang}.html`)
}
