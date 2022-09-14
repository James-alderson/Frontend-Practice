const LOCATION = document.querySelector("#location")
const LOCATIONS = document.querySelectorAll("#location option")
const CLIENT_IP = "http://ip-api.com/json/"

fetch(CLIENT_IP)
  .then(res => res.json())
  .then(data => {
    let countryCode = data.countryCode.toLowerCase()

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
