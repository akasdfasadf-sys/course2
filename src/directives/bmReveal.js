function prefersReducedMotion() {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
}

function parseDelay(binding) {
  const v = binding.value
  if (typeof v === 'number' && !Number.isNaN(v)) return v
  if (v && typeof v.delay === 'number') return v.delay
  return 0
}

function parseVariant(binding) {
  if (binding.modifiers.scale) return 'scale'
  if (binding.modifiers.left) return 'left'
  if (binding.modifiers.right) return 'right'
  if (binding.modifiers.down) return 'down'
  if (binding.arg) return binding.arg
  return 'up'
}

export const bmReveal = {
  mounted(el, binding) {
    const variant = parseVariant(binding)
    const delay = parseDelay(binding)
    el.classList.add('bm-reveal', `bm-reveal--${variant}`)

    if (prefersReducedMotion()) {
      el.classList.add('bm-reveal--visible')
      return
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const go = () => el.classList.add('bm-reveal--visible')
          delay > 0 ? setTimeout(go, delay) : go()
          io.unobserve(el)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    el._bmRevealIo = io
  },
  unmounted(el) {
    el._bmRevealIo?.disconnect()
    el._bmRevealIo = null
  },
}
