import { useCallback, useState, useRef, useEffect } from 'react'

/* ── SIP Calculator ── */
export function useSIPCalculator(monthly, rate, totalMonths) {
  return useCallback(() => {
    const P = monthly || 0
    const r = (rate || 0) / 100 / 12
    const n = totalMonths || 0
    if (P <= 0 || r <= 0 || n <= 0) return { invested: 0, returns: 0, total: 0 }
    const invested = P * n
    const fv = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
    const returns = fv - invested
    return { invested, returns, total: fv }
  }, [monthly, rate, totalMonths])()
}

/* ── Animated Number ── */
export function useAnimatedNumber(target, duration = 350) {
  const [display, setDisplay] = useState(target)
  const prev = useRef(target)
  const raf = useRef(null)

  useEffect(() => {
    const from = prev.current
    if (from === target) return
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3) // ease-out cubic
      setDisplay(from + (target - from) * ease)
      if (t < 1) raf.current = requestAnimationFrame(tick)
      else { setDisplay(target); prev.current = target }
    }

    raf.current = requestAnimationFrame(tick)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [target, duration])

  // sync on first mount / exact match
  useEffect(() => { prev.current = target; setDisplay(target) }, [])

  return display
}

/* ── Intersection Observer ── */
export function useIntersectionObserver(ref, options = {}) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, { threshold: 0, ...options })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])

  return isVisible
}

/* ── Currency Formatter ── */
const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })
const inr2 = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 })

export function formatINR(v) {
  return '₹' + inr.format(Math.round(v))
}

export function smartFormat(v) {
  const abs = Math.abs(v)
  if (abs < 100000) return '₹' + inr.format(Math.round(v))
  if (abs < 10000000) {
    const lakhs = v / 100000
    return '₹' + inr2.format(lakhs) + 'L'
  }
  const crores = v / 10000000
  return '₹' + inr2.format(crores) + 'Cr'
}

export function formatInputValue(numStr) {
  // remove non-digit
  const digits = numStr.replace(/[^0-9]/g, '')
  if (!digits) return ''
  return inr.format(parseInt(digits, 10))
}
