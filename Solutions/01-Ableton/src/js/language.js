const LANGUAGE = document.querySelector("#language")

LANGUAGE.addEventListener("change", changeLanguage)

function changeLanguage(event) {
  let lang = event.target.value
  let documentLang = document.documentElement.lang

  if (lang !== "en") {
    window.location.assign(`languages/index.${lang}.html`)

    if (documentLang !== "en") {
      window.location.assign(`index.${lang}.html`)
    }
  } else {
    window.location.assign("../index.html")
  }
}
