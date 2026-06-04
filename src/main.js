import './input.css'
import headerHtml from './components/header.html?raw'
import footerHtml from './components/footer.html?raw'

document.addEventListener('DOMContentLoaded', () => {
  injectComponents()
  initNavbar()
  initSearch()
  initCounters()
  initMarquee()
  initPreloader()
  initHeroSlideshow()
  initGallery()
  initCharts()
  initProgressiveImages()
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

  const navLinks = document.querySelectorAll('.navigation__menu > li > a, .mobile-drawer a')
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

  // Hamburger toggle actions
  const hamburger = document.getElementById('hamburger')
  const mainNav = document.getElementById('main-nav')

  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation()
    const isOpen = mainNav?.classList.toggle('drawer-open')
    hamburger.classList.toggle('is-open')
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
  })

  // Close mobile drawer on outside click
  document.addEventListener('click', (e) => {
    if (mainNav && !mainNav.contains(e.target) && hamburger && !hamburger.contains(e.target)) {
      if (mainNav.classList.contains('drawer-open')) {
        mainNav.classList.remove('drawer-open')
        hamburger.classList.remove('is-open')
        hamburger.setAttribute('aria-expanded', 'false')
      }
    }
  })

  // Close mobile drawer on nav link click
  document.querySelectorAll('.mobile-drawer a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav?.classList.remove('drawer-open')
      hamburger?.classList.remove('is-open')
      hamburger?.setAttribute('aria-expanded', 'false')
    })
  })

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

function initPreloader() {
  const preloader = document.getElementById('preloader')
  if (!preloader) return

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden')
    }, 600)
  })

  setTimeout(() => {
    preloader.classList.add('hidden')
  }, 5000)
}

function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide')
  if (slides.length < 2) return
  const section = document.getElementById('heroSection')
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return
  let current = 0
  let interval = setInterval(() => {
    slides[current].classList.remove('active')
    current = (current + 1) % slides.length
    slides[current].classList.add('active')
  }, 5000)
  section?.addEventListener('mouseenter', () => clearInterval(interval))
  section?.addEventListener('focusin', () => clearInterval(interval))
  section?.addEventListener('mouseleave', () => {
    interval = setInterval(() => {
      slides[current].classList.remove('active')
      current = (current + 1) % slides.length
      slides[current].classList.add('active')
    }, 5000)
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

function initCharts() {
  const canvas = document.getElementById('placementChart')
  if (!canvas || typeof Chart === 'undefined') return

  const ctx = canvas.getContext('2d')
  const isPlacementsPage = window.location.pathname.includes('placements')

  if (isPlacementsPage) {
    initPlacementsChart(ctx)
  } else {
    initHomeChart(ctx)
  }
}

function initHomeChart(ctx) {
  const data = [65, 68, 60, 61, 60]
  const labels = ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25']
  const lastIdx = data.length - 1

  const fillGradient = ctx.createLinearGradient(0, 0, 0, 140)
  fillGradient.addColorStop(0, 'rgba(29,92,171,0.28)')
  fillGradient.addColorStop(0.6, 'rgba(29,92,171,0.06)')
  fillGradient.addColorStop(1, 'rgba(29,92,171,0)')

  const pointBg = data.map((_, i) => i === lastIdx ? '#1d5cab' : '#FFFFFF')
  const pointBorder = data.map((_, i) => i === lastIdx ? '#FFFFFF' : '#1d5cab')
  const pointRadius = data.map((_, i) => i === lastIdx ? 6 : 4)

  const referenceLine = {
    id: 'referenceLine',
    afterDatasetsDraw(chart) {
      const { ctx, chartArea, scales } = chart
      const y = scales.y.getPixelForValue(75)
      ctx.save()
      ctx.strokeStyle = '#F59E0B'
      ctx.setLineDash([4, 4])
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(chartArea.left, y)
      ctx.lineTo(chartArea.right, y)
      ctx.stroke()
      ctx.fillStyle = '#F59E0B'
      ctx.font = '600 10px Lato'
      ctx.textAlign = 'right'
      ctx.textBaseline = 'bottom'
      ctx.fillText('Industry Avg 75%', chartArea.right, y - 2)
      ctx.restore()
    }
  }

  const valueLabels = {
    id: 'valueLabels',
    afterDatasetsDraw(chart) {
      const { ctx } = chart
      const meta = chart.getDatasetMeta(0)
      ctx.save()
      ctx.font = '700 10px Lato'
      ctx.textAlign = 'center'
      meta.data.forEach((pt, i) => {
        ctx.fillStyle = i === lastIdx ? '#1d5cab' : '#475569'
        ctx.fillText(data[i] + '%', pt.x, pt.y - 10)
      })
      ctx.restore()
    }
  }

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Placements',
        data,
        backgroundColor: fillGradient,
        borderColor: '#1d5cab',
        borderWidth: 2.5,
        pointBackgroundColor: pointBg,
        pointBorderColor: pointBorder,
        pointBorderWidth: 2,
        pointRadius: pointRadius,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#1d5cab',
        pointHoverBorderColor: '#FFFFFF',
        pointHoverBorderWidth: 3,
        tension: 0.4,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 18, right: 8, bottom: 4, left: 4 } },
      animation: {
        duration: 1400,
        easing: 'easeOutQuart',
      },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0a192f',
          titleFont: { family: 'Lato', weight: '700', size: 12 },
          bodyFont: { family: 'Lato', size: 12 },
          padding: 10,
          cornerRadius: 0,
          displayColors: false,
          callbacks: {
            title: items => items[0].label,
            label: item => item.parsed.y + '% students placed',
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: v => v + '%',
            font: { family: 'Lato', size: 10 },
            color: '#94A3B8',
            stepSize: 25,
            padding: 4,
          },
          grid: {
            color: 'rgba(0,0,0,0.05)',
            drawTicks: false,
          },
          border: { display: false }
        },
        x: {
          ticks: {
            font: { family: 'Lato', size: 10, weight: '600' },
            color: '#64748B',
            padding: 4,
          },
          grid: { display: false },
          border: { display: false }
        }
      }
    },
    plugins: [referenceLine, valueLabels]
  })
}

function initPlacementsChart(ctx) {
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2021-22', '2022-23', '2023-24', '2024-25'],
      datasets: [{
        label: 'Average Package (₹ LPA)',
        data: [4.38, 4.81, 4.12, 4.53],
        borderColor: '#1d5cab',
        backgroundColor: function (context) {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return 'rgba(29, 92, 171, 0.1)'
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, 'rgba(29, 92, 171, 0.2)')
          gradient.addColorStop(1, 'rgba(29, 92, 171, 0.02)')
          return gradient
        },
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#1d5cab',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#1d5cab',
        pointHoverBorderWidth: 3,
      }, {
        label: 'Placement Rate (%)',
        data: [78, 60.4, 65.8, 60],
        borderColor: '#0a192f',
        backgroundColor: function (context) {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return 'rgba(10, 25, 47, 0.05)'
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, 'rgba(10, 25, 47, 0.15)')
          gradient.addColorStop(1, 'rgba(10, 25, 47, 0.01)')
          return gradient
        },
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#0a192f',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#0a192f',
        pointHoverBorderWidth: 3,
        yAxisID: 'y1',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { family: 'Lato' } } },
        tooltip: {
          backgroundColor: '#0a192f',
          titleFont: { family: 'Lato', weight: '700' },
          bodyFont: { family: 'Lato' },
          padding: 12,
          cornerRadius: 0,
          callbacks: {
            label: function (context) {
              const label = context.dataset.label || ''
              const val = context.parsed.y
              if (label.includes('Package')) return label + ': ₹' + val + ' LPA'
              return label + ': ' + val + '%'
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { font: { family: 'Lato' } },
          grid: { color: 'rgba(0,0,0,0.05)' }
        },
        y1: {
          beginAtZero: true,
          position: 'right',
          grid: { display: false },
          max: 100,
          ticks: { callback: function (v) { return v + '%' }, font: { family: 'Lato' } }
        },
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Lato', size: 12 } }
        }
      },
      animation: {
        duration: 1200,
        easing: 'easeOutQuart'
      }
    }
  })
}

function initRecruiterLogos() {
}
