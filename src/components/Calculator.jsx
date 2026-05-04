import { useState, useRef } from 'react'
import InputField from './InputField'
import ResultsPanel from './ResultsPanel'
import { useSIPCalculator, useIntersectionObserver, smartFormat } from '../hooks'

export default function Calculator() {
  const [monthly, setMonthly] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [months, setMonths] = useState('')

  const totalMonths = ((Number(years) || 0) * 12) + (Number(months) || 0)
  const { invested, returns, total } = useSIPCalculator(
    Number(monthly) || 0,
    Number(rate) || 0,
    totalMonths
  )

  // Sticky bar visibility
  const calcRef = useRef(null)
  const isCalcVisible = useIntersectionObserver(calcRef)

  return (
    <>
      <section
        ref={calcRef}
        className="px-6 lg:px-10"
        style={{ paddingTop: 48, paddingBottom: 64 }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="grid items-start"
            style={{
              gridTemplateColumns: 'minmax(0,1fr)',
              gap: 40,
            }}
          >
            {/* ── Desktop: two-column layout ── */}
            <div
              className="hidden lg:grid"
              style={{
                gridTemplateColumns: '5fr 7fr',
                gap: 80,
                alignItems: 'start',
              }}
            >
              {/* Inputs */}
              <div className="anim-inputs">
                <InputField
                  label="Monthly Investment"
                  value={monthly}
                  onChange={setMonthly}
                  prefix="₹"
                  min={500}
                  max={10000000}
                />
                <InputField
                  label="Expected Annual Return"
                  value={rate}
                  onChange={setRate}
                  suffix="%"
                  min={1}
                  max={30}
                />
                <TimePeriodInputs
                  years={years}
                  months={months}
                  onYearsChange={setYears}
                  onMonthsChange={setMonths}
                />
              </div>

              {/* Results */}
              <ResultsPanel invested={invested} returns={returns} total={total} />
            </div>

            {/* ── Mobile / Tablet layout ── */}
            <div className="lg:hidden">
              <div className="anim-inputs mb-8">
                <InputField
                  label="Monthly Investment"
                  value={monthly}
                  onChange={setMonthly}
                  prefix="₹"
                  min={500}
                  max={10000000}
                />
                <InputField
                  label="Expected Annual Return"
                  value={rate}
                  onChange={setRate}
                  suffix="%"
                  min={1}
                  max={30}
                />
                <TimePeriodInputs
                  years={years}
                  months={months}
                  onYearsChange={setYears}
                  onMonthsChange={setMonths}
                />
              </div>

              {/* Mobile results — no box-shadow, border-top instead */}
              <div
                className="anim-results"
                style={{
                  background: 'var(--surface)',
                  borderRadius: 20,
                  borderTop: '2px solid var(--accent)',
                  padding: 24,
                }}
              >
                <ResultsPanelMobile invested={invested} returns={returns} total={total} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky bottom bar (mobile) ── */}
      <div
        className={`sticky-total-bar lg:hidden ${!isCalcVisible ? 'visible' : ''}`}
      >
        <div
          className="flex items-center justify-between"
          style={{
            background: 'var(--accent)',
            padding: '14px 20px',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
            Total Value
          </span>
          <span
            className="tabular-nums"
            style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}
          >
            {smartFormat(total)}
          </span>
        </div>
      </div>
    </>
  )
}

/* ── Time Period Inputs (Years + Months) ── */
function TimePeriodInputs({ years, months, onYearsChange, onMonthsChange }) {
  return (
    <div className="mb-6 last:mb-0">
      <label
        style={{
          display: 'block',
          fontSize: 11,
          fontWeight: 500,
          color: 'var(--text-tertiary)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        Time Period
      </label>
      <div className="flex gap-3">
        <TimePeriodField
          value={years}
          onChange={onYearsChange}
          suffix="Years"
          max={40}
          placeholder="0"
        />
        <TimePeriodField
          value={months}
          onChange={onMonthsChange}
          suffix="Months"
          max={11}
          placeholder="0"
        />
      </div>
    </div>
  )
}

/* ── Single time period input field ── */
function TimePeriodField({ value, onChange, suffix, max, placeholder }) {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)

  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    if (raw === '') { onChange(''); return }
    const num = parseInt(raw, 10)
    if (!isNaN(num) && num <= max) onChange(num)
    else if (!isNaN(num) && num > max) onChange(max)
  }

  const handleBlur = () => {
    setFocused(false)
  }

  return (
    <div
      className="relative cursor-text"
      onClick={() => inputRef.current?.focus()}
      style={{
        flex: 1,
        background: focused ? 'var(--surface)' : 'var(--input-bg)',
        borderRadius: 12,
        border: `2px solid ${focused ? 'var(--accent)' : 'transparent'}`,
        transition: 'border-color 200ms, background 200ms, box-shadow 200ms',
        boxShadow: focused ? '0 0 0 3px rgba(5,150,105,0.1)' : 'none',
      }}
    >
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        placeholder={placeholder}
        style={{
          width: '100%',
          height: 52,
          paddingTop: 4,
          paddingBottom: 4,
          paddingLeft: 16,
          paddingRight: suffix ? 64 : 16,
          fontSize: 18,
          fontWeight: 600,
          fontFamily: 'var(--font-sans)',
          color: 'var(--text-primary)',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          fontVariantNumeric: 'tabular-nums',
        }}
      />
      {suffix && (
        <span
          style={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 14,
            fontWeight: 600,
            color: focused ? 'var(--accent)' : 'var(--text-tertiary)',
            transition: 'color 200ms',
            lineHeight: 1,
            pointerEvents: 'none',
          }}
        >
          {suffix}
        </span>
      )}
    </div>
  )
}

/* ── Mobile Results (no donut, simpler) ── */
function ResultsPanelMobile({ invested, returns, total }) {
  const invPct = total > 0 ? (invested / total) * 100 : 50

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <span style={{ display: 'block', fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>
          Total Value
        </span>
        <span className="tabular-nums" style={{ display: 'block', fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {smartFormat(total)}
        </span>
      </div>

      <div className="flex" style={{ gap: 0, paddingBottom: 20, borderBottom: '1px solid var(--border-light)', marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <span style={{ display: 'block', fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Invested</span>
          <span className="tabular-nums" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{smartFormat(invested)}</span>
        </div>
        <div style={{ width: 1, background: 'var(--border)', margin: '0 16px', alignSelf: 'stretch' }} />
        <div style={{ flex: 1 }}>
          <span style={{ display: 'block', fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Est. Returns</span>
          <span className="tabular-nums" style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)' }}>{smartFormat(returns)}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div style={{ height: 8, borderRadius: 4, background: 'var(--accent-light)', overflow: 'hidden', display: 'flex' }}>
          <div className="progress-bar-segment" style={{ width: `${invPct}%`, background: 'var(--accent)', borderRadius: 4 }} />
        </div>
        <div className="flex justify-between" style={{ marginTop: 6 }}>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Invested</span>
          <span style={{ fontSize: 11, color: 'var(--accent)' }}>Returns</span>
        </div>
      </div>
    </>
  )
}
