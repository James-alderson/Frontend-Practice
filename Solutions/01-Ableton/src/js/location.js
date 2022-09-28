const LOCATION = document.querySelector("#location")
const LOCATIONS = LOCATION.querySelectorAll("option")
const LOCATION_API = "https://api.ipgeolocation.io/ipgeo"
const API_KEY = "68c424493d544079b9621d10f36ccd73"
const API_URL = `${LOCATION_API}?apiKey=${API_KEY}`

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    let countryCode = data.country_code2.toLowerCase()

    checkCountryCode(countryCode)
  })

function checkCountryCode(code) {
  LOCATIONS.forEach(location => {
    let locationCode = location.getAttribute("value")

    location.removeAttribute("selected")

    if (code === locationCode) {
      LOCATION.querySelector(`[value=${code}]`).setAttribute("Selected", "")
    }
  })
}
