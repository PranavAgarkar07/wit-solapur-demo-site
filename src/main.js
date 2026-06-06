import './input.css'
import headerHtml from './components/header.html?raw'
import footerHtml from './components/footer.html?raw'

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen()
  injectComponents()
  initNavbar()
  initSearch()
  initCounters()
  initMarquee()
  initHeroSlideshow()
  initAnnouncements()
  initGallery()
  initProgressiveImages()
  initBranchCards()
  initRecruiterLogos()
})

function injectComponents() {
  const headerElem = document.querySelector('header-component')
  if (headerElem) {
    headerElem.insertAdjacentHTML('afterend', headerHtml)
    headerElem.remove()
  }

  const footerElem = document.querySelector('footer-component')
  if (footerElem) {
    footerElem.insertAdjacentHTML('afterend', footerHtml)
    footerElem.remove()
  }

  // Highlight active link based on URL path
  const currentPath = window.location.pathname
  const isHome = currentPath === '/' || currentPath.endsWith('/index.html') || currentPath === ''

  const navLinks = document.querySelectorAll('.navigation__menu > li > a, .mobile-sheet__nav a')
  navLinks.forEach(link => {
    const href = link.getAttribute('href')
    const isActive = (isHome && (href === '/' || href === 'index.html' || href === 'index.html#')) ||
      (!isHome && href !== '/' && href !== 'index.html' && (currentPath.endsWith(href) || href.endsWith(currentPath)))
    if (isActive) {
      link.classList.add('active')
      link.setAttribute('aria-current', 'page')
    } else {
      link.classList.remove('active')
      link.removeAttribute('aria-current')
    }
  })
}

function initNavbar() {
  let ticking = false
  const THRESHOLD = 150

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY >= THRESHOLD) {
          document.body.classList.add('navbar-scrolled')
        } else {
          document.body.classList.remove('navbar-scrolled')
        }
        ticking = false
      })
      ticking = true
    }
  })

  // Hamburger toggle → opens mobile full-screen sheet
  const hamburger = document.getElementById('hamburger')
  const sheet = document.getElementById('mobile-sheet')
  const sheetBackdrop = document.getElementById('mobile-sheet-backdrop')
  const sheetClose = document.getElementById('mobile-sheet-close')

  const openSheet = () => {
    if (!sheet) return
    document.body.classList.add('sheet-open')
    sheet.setAttribute('aria-hidden', 'false')
    sheetBackdrop?.removeAttribute('hidden')
    hamburger?.classList.add('is-open')
    hamburger?.setAttribute('aria-expanded', 'true')
    // Focus the close button for keyboard users
    setTimeout(() => sheetClose?.focus(), 100)
    document.addEventListener('keydown', trapSheetKeys)
  }

  const closeSheet = () => {
    if (!sheet) return
    document.body.classList.remove('sheet-open')
    sheet.setAttribute('aria-hidden', 'true')
    setTimeout(() => sheetBackdrop?.setAttribute('hidden', ''), 300)
    hamburger?.classList.remove('is-open')
    hamburger?.setAttribute('aria-expanded', 'false')
    document.removeEventListener('keydown', trapSheetKeys)
    hamburger?.focus()
  }

  const trapSheetKeys = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      closeSheet()
      return
    }
    if (e.key !== 'Tab' || !sheet) return
    const focusables = sheet.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    if (!focusables.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  hamburger?.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (document.body.classList.contains('sheet-open')) {
      closeSheet()
    } else {
      openSheet()
    }
  })

  sheetClose?.addEventListener('click', closeSheet)

  sheetBackdrop?.addEventListener('click', closeSheet)

  // Close sheet after tapping any link inside it
  sheet?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      // Delay close so the navigation can happen smoothly
      setTimeout(closeSheet, 50)
    })
  })

  // Accordion toggles inside sheet
  sheet?.querySelectorAll('.nav-accordion').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true'
      btn.setAttribute('aria-expanded', !expanded)
    })
  })

  // Close sheet if viewport resizes to desktop while open
  const mq = window.matchMedia('(min-width: 768px)')
  const onMqChange = (e) => { if (e.matches && document.body.classList.contains('sheet-open')) closeSheet() }
  mq.addEventListener('change', onMqChange)

  // Desktop dropdown toggles (replace javascript:; hrefs)
  document.querySelectorAll('.nav-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true'
      btn.setAttribute('aria-expanded', !expanded)
    })
    btn.addEventListener('blur', () => {
      // Close on blur when focus leaves entirely
      setTimeout(() => {
        if (!btn.parentElement?.contains(document.activeElement)) {
          btn.setAttribute('aria-expanded', 'false')
        }
      }, 100)
    })
  })
}

function initSearch() {
  const searchToggle = document.getElementById('searchToggle')
  const searchOverlay = document.getElementById('searchOverlay')
  const searchClose = document.getElementById('searchClose')
  const searchInput = document.getElementById('searchInput')
  const searchResults = document.getElementById('searchResults')

  const pages = [
    { title: 'Home', url: '/' },
    { title: 'About Us', url: '/about.html' },
    { title: 'Departments', url: '/departments.html' },
    { title: 'CSE Department', url: '/cse.html' },
    { title: 'Civil Engineering', url: '/departments.html' },
    { title: 'Computer Science & Engineering', url: '/cse.html' },
    { title: 'Electronics & Computer Engineering', url: '/departments.html' },
    { title: 'Electronics & Telecommunication', url: '/departments.html' },
    { title: 'Information Technology', url: '/departments.html' },
    { title: 'Mechanical & Automation Engineering', url: '/departments.html' },
    { title: 'Placements', url: '/placements.html' },
    { title: 'Gallery', url: '/gallery.html' },
    { title: 'Contact', url: '/contact.html' },
    { title: 'Admissions 2026-27', url: '/contact.html' },
  ]

  searchToggle?.addEventListener('click', () => {
    searchOverlay?.classList.remove('hidden')
    setTimeout(() => searchInput?.focus(), 100)
    document.body.style.overflow = 'hidden'
  })

  searchClose?.addEventListener('click', closeSearch)

  searchOverlay?.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch()
    if (e.key === '/' && e.target.tagName !== 'INPUT') {
      e.preventDefault()
      searchToggle?.click()
    }
  })

  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim()
    if (!query) { searchResults.innerHTML = ''; return }
    const matches = pages.filter(p =>
      p.title.toLowerCase().includes(query)
    ).slice(0, 6)
    searchResults.innerHTML = matches.map(m =>
      `<a href="${m.url}" class="block bg-wit-bg hover:bg-primary hover:text-white px-4 py-3 text-slate-700 transition-colors focus:outline-2 focus:outline-primary focus:ring-2 focus:ring-primary/50" tabindex="0">${m.title}</a>`
    ).join('') || '<p class="text-slate-400 text-sm">No results found</p>'
  })

  function closeSearch() {
    searchOverlay?.classList.add('hidden')
    document.body.style.overflow = ''
    if (searchInput) searchInput.value = ''
    if (searchResults) searchResults.innerHTML = ''
  }
}

function initCounters() {
  const counters = document.querySelectorAll('.hero-stat-number')
  if (!counters.length) return
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target
        const target = parseInt(el.getAttribute('data-target'))
        if (isNaN(target)) return
        if (prefersReduced) {
          el.textContent = target.toLocaleString() + '+'
          observer.unobserve(el)
          return
        }
        const suffix = el.getAttribute('data-target') === '5000' ? '+' : '+'
        animateCounter(el, target, 2000, suffix)
        observer.unobserve(el)
      }
    })
  }, { threshold: 0.3 })

  counters.forEach(c => observer.observe(c))
}

function animateCounter(el, target, duration, suffix) {
  const start = performance.now()
  function update(currentTime) {
    const elapsed = currentTime - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.floor(eased * target)
    el.textContent = current.toLocaleString() + suffix
    if (progress < 1) requestAnimationFrame(update)
    else {
      el.textContent = target.toLocaleString() + suffix
      el.style.transform = 'scale(1.08)'
      setTimeout(function() { el.style.transform = '' }, 200)
    }
  }
  requestAnimationFrame(update)
}

function initMarquee() {
  const track = document.querySelector('.marquee-track')
  if (!track) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const group = track.querySelector('.marquee-group')
  if (!group) return

  const groupWidth = group.offsetWidth
  let pos = 0
  const speed = 0.6
  let isPaused = false

  function animateMarquee() {
    if (!isPaused) {
      pos -= speed
      if (pos <= -groupWidth) pos = 0
      track.style.transform = 'translateX(' + pos + 'px)'
    }
    requestAnimationFrame(animateMarquee)
  }
  animateMarquee()

  const parent = track.parentElement
  if (parent) {
    parent.addEventListener('mouseenter', () => { isPaused = true })
    parent.addEventListener('mouseleave', () => { isPaused = false })
  }
}

function initSplashScreen() {
  const splash = document.getElementById('splash-screen')
  if (!splash) return
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const minDisplayTime = prefersReduced ? 200 : 1700
  const maxWaitTime = 5000
  const startTime = performance.now()
  let hidden = false

  document.documentElement.classList.add('splash-active')

  const hide = () => {
    if (hidden) return
    hidden = true
    splash.classList.add('hidden')
    setTimeout(() => {
      splash.remove()
      document.documentElement.classList.remove('splash-active')
    }, 450)
  }

  const onReady = () => {
    const elapsed = performance.now() - startTime
    const delay = Math.max(minDisplayTime - elapsed, 0)
    requestAnimationFrame(() => setTimeout(hide, delay))
  }

  if (document.readyState === 'complete') {
    onReady()
  } else {
    window.addEventListener('load', onReady, { once: true })
  }

  setTimeout(hide, maxWaitTime)
}

function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide')
  if (slides.length < 2) return
  const section = document.getElementById('heroSection')
  const dots = document.querySelectorAll('.hero-dot')
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return
  let current = 0
  let interval
  let isPaused = false

  const controls = document.getElementById('heroSlideControls')
  const playPauseBtn = document.getElementById('heroPlayPauseBtn')
  const playIcon = document.getElementById('heroPlayIcon')
  const pauseIcon = document.getElementById('heroPauseIcon')

  function goTo(index) {
    slides.forEach(s => s.classList.remove('active'))
    dots.forEach(d => {
      d.classList.remove('active')
      // Reset animation
      const progress = d.querySelector('.hero-dot-progress')
      if (progress) {
        progress.style.animation = 'none'
        void progress.offsetWidth // trigger reflow
        progress.style.animation = ''
      }
    })
    current = (index + slides.length) % slides.length
    slides[current].classList.add('active')
    if (dots[current]) dots[current].classList.add('active')
  }

  function startAuto() {
    stopAuto()
    if (!isPaused) {
      interval = setInterval(() => goTo(current + 1), 5000)
    }
  }

  function stopAuto() { clearInterval(interval); interval = null }

  startAuto()

  playPauseBtn?.addEventListener('click', () => {
    isPaused = !isPaused
    if (isPaused) {
      stopAuto()
      controls?.classList.add('is-paused')
      playIcon?.classList.remove('hidden')
      pauseIcon?.classList.add('hidden')
    } else {
      startAuto()
      controls?.classList.remove('is-paused')
      playIcon?.classList.add('hidden')
      pauseIcon?.classList.remove('hidden')
    }
  })

  const prevBtn = section?.querySelector('.hero-slide-prev')
  const nextBtn = section?.querySelector('.hero-slide-next')
  prevBtn?.addEventListener('click', () => { goTo(current - 1); startAuto() })
  nextBtn?.addEventListener('click', () => { goTo(current + 1); startAuto() })

  // Dot click navigation
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'))
      if (!isNaN(slideIndex)) {
        goTo(slideIndex)
        startAuto()
      }
    })
  })
}

function initAnnouncements() {
  const panel = document.getElementById('announcementsPanel')
  const toggle = document.getElementById('announcementsToggle')
  if (!panel || !toggle) return

  // Restore saved state
  const savedState = localStorage.getItem('wit_announcements_collapsed')
  if (savedState === 'true') {
    panel.classList.add('is-collapsed')
    toggle.setAttribute('aria-expanded', 'false')
  }

  toggle.addEventListener('click', () => {
    const isCollapsed = panel.classList.toggle('is-collapsed')
    toggle.setAttribute('aria-expanded', !isCollapsed)
    localStorage.setItem('wit_announcements_collapsed', isCollapsed)
  })
}

function initGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter button')
  const items = document.querySelectorAll('.album-card')
  const lightbox = document.getElementById('lightbox')
  const lightboxImg = document.getElementById('lightboxImg')
  const lightboxPrev = document.getElementById('lightboxPrev')
  const lightboxNext = document.getElementById('lightboxNext')
  const lightboxCounter = document.getElementById('lightboxCounter')
  const lightboxTitle = document.getElementById('lightboxTitle')

  if (!items.length) return

  let currentAlbumImages = []
  let currentIndex = 0
  let activeLoadToken = null

  // Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      const filter = btn.dataset.filter
      items.forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.category === filter) ? 'block' : 'none'
      })
    })
  })

  // Open Lightbox
  items.forEach(item => {
    const openAlbum = () => {
      try {
        const rawImages = item.getAttribute('data-images')
        currentAlbumImages = JSON.parse(rawImages) || []
      } catch (e) {
        console.error('Failed to parse album images:', e)
        currentAlbumImages = []
      }

      if (currentAlbumImages.length > 0) {
        currentIndex = 0
        lightbox?.classList.add('active')
        document.body.style.overflow = 'hidden'
        showSlide(currentIndex)
      }
    }
    item.addEventListener('click', openAlbum)
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        openAlbum()
      }
    })
    item.setAttribute('tabindex', '0')
    item.setAttribute('role', 'button')
  })

  // Close Lightbox
  window.closeLightbox = function () {
    lightbox?.classList.remove('active')
    document.body.style.overflow = ''
    if (lightboxImg) {
      lightboxImg.src = ''
      lightboxImg.className = ''
    }
    activeLoadToken = null
  }

  // Handle closing by clicking outside the image or container
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      window.closeLightbox()
    }
  })

  // Close button (replaces inline onclick)
  const lightboxClose = document.getElementById('lightboxClose')
  lightboxClose?.addEventListener('click', () => window.closeLightbox())

  // Show Slide
  function showSlide(index) {
    if (!currentAlbumImages.length || !lightboxImg) return

    // Ensure index is within range
    if (index < 0) {
      currentIndex = currentAlbumImages.length - 1
    } else if (index >= currentAlbumImages.length) {
      currentIndex = 0
    } else {
      currentIndex = index
    }

    const item = currentAlbumImages[currentIndex]
    const token = Symbol('load-token')
    activeLoadToken = token

    // 1. Initial State: Display the blurred/low-res thumbnail
    lightboxImg.src = item.thumb
    lightboxImg.alt = item.caption || ''
    lightboxImg.className = 'progressive-img'

    // 2. Load High-res asynchronously
    const highResUrl = item.high
    const tempImg = new Image()
    tempImg.src = highResUrl
    tempImg.onload = () => {
      if (activeLoadToken === token) {
        lightboxImg.src = highResUrl
        lightboxImg.classList.add('loaded')
      }
    }

    // 3. Update counter and caption
    if (lightboxCounter) {
      lightboxCounter.textContent = `Photo ${currentIndex + 1} of ${currentAlbumImages.length}`
    }
    if (lightboxTitle) {
      lightboxTitle.textContent = item.caption || ''
    }
  }

  // Navigation Event Listeners
  lightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation()
    showSlide(currentIndex - 1)
  })

  lightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation()
    showSlide(currentIndex + 1)
  })

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return

    if (e.key === 'Escape') {
      window.closeLightbox()
    } else if (e.key === 'ArrowLeft') {
      showSlide(currentIndex - 1)
    } else if (e.key === 'ArrowRight') {
      showSlide(currentIndex + 1)
    }
  })
}

function initProgressiveImages() {
  const images = document.querySelectorAll('.progressive-img')
  if (!images.length) return

  images.forEach(img => {
    const highResUrl = img.getAttribute('data-highres')
    if (!highResUrl) return

    const loadHighRes = () => {
      const tempImg = new Image()
      tempImg.src = highResUrl
      tempImg.onload = () => {
        img.src = highResUrl
        img.classList.add('loaded')
      }
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadHighRes()
            obs.unobserve(entry.target)
          }
        })
      })
      observer.observe(img)
    } else {
      window.addEventListener('load', loadHighRes)
    }
  })
}

function initRecruiterLogos() {
}

function initBranchCards() {
  const cards = document.querySelectorAll('.branch-card')
  if (!cards.length) return

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    cards.forEach(c => c.classList.add('branch-card-visible'))
    return
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('branch-card-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })

  cards.forEach(card => observer.observe(card))
}
