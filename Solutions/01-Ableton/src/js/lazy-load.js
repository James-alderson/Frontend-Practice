const LAZY_IMAGES = document.querySelectorAll("[data-src]")

const options = {
  root: null,
  threshold: 0,
  rootMargin: "0px 0px 100px 0px"
}

const imgObserver = new IntersectionObserver(imageObserver, options)

function imageObserver(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return

    let lazyImage = entry.target
    lazyImage.src = lazyImage.dataset.src

    observer.unobserve(lazyImage)
  })
}

LAZY_IMAGES.forEach(lazyImage => {
  imgObserver.observe(lazyImage)
})
