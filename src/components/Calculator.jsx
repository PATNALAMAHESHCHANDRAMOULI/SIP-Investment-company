import { useState, useRef } from 'react'
import InputField from './InputField'
import ResultsPanel from './ResultsPanel'
import { useSIPCalculator, useIntersectionObserver, smartFormat } from '../hooks'

const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

export default function Calculator() {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const { invested, returns, total } = useSIPCalculator(monthly, rate, years)

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
                  chips={[1000, 5000, 10000, 25000]}
                  chipFormatter={(v) => '₹' + inr.format(v)}
                />
                <InputField
                  label="Expected Annual Return"
                  value={rate}
                  onChange={setRate}
                  suffix="%"
                  min={1}
                  max={30}
                  chips={[8, 10, 12, 15]}
                  chipFormatter={(v) => v + '%'}
                />
                <InputField
                  label="Time Period (Years)"
                  value={years}
                  onChange={setYears}
                  suffix="Yrs"
                  min={1}
                  max={40}
                  chips={[5, 10, 15, 20]}
                  chipFormatter={(v) => v + 'Y'}
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
                  chips={[1000, 5000, 10000, 25000]}
                  chipFormatter={(v) => '₹' + inr.format(v)}
                />
                <InputField
                  label="Expected Annual Return"
                  value={rate}
                  onChange={setRate}
                  suffix="%"
                  min={1}
                  max={30}
                  chips={[8, 10, 12, 15]}
                  chipFormatter={(v) => v + '%'}
                />
                <InputField
                  label="Time Period (Years)"
                  value={years}
                  onChange={setYears}
                  suffix="Yrs"
                  min={1}
                  max={40}
                  chips={[5, 10, 15, 20]}
                  chipFormatter={(v) => v + 'Y'}
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
