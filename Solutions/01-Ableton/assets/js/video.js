const VIDEO = document.querySelector(".video")
const VIDEO_CONTAINER = document.querySelector(".video__container")

VIDEO.addEventListener("click", playVideo)
VIDEO_CONTAINER.addEventListener("keyup", event => {
  if (event.key === "Enter" || event.keyCode === 13) playVideo()
})

function playVideo() {
  let hasVideoPlayer = document.querySelector(".video__player")

  if (!hasVideoPlayer) {
    let videoPlayer = document.createElement("iframe")

    setAttributes(videoPlayer, {
      "allowfullscreen": "",
      "class": "video__player",
      "title": "Why Ableton - Juanpe",
      "src": "https://www.youtube-nocookie.com/embed/9SbnhgjeyXA?rel=0&autoplay=1",
      "allow": "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    })

    VIDEO_CONTAINER.appendChild(videoPlayer)
    VIDEO.classList.add("active")
  }
}

function setAttributes(element, attribute) {
  for (let key in attribute) {
    element.setAttribute(key, attribute[key])
  }
}
