import { useAnimatedNumber, smartFormat, formatINR } from '../hooks'
import DonutChart from './DonutChart'

export default function ResultsPanel({ invested, returns, total }) {
  const aTot = useAnimatedNumber(total)
  const aInv = useAnimatedNumber(invested)
  const aRet = useAnimatedNumber(returns)

  const invPct = total > 0 ? (invested / total) * 100 : 50
  const retPct = total > 0 ? (returns / total) * 100 : 50

  return (
    <div
      className="anim-results"
      style={{
        background: 'var(--surface)',
        borderRadius: 24,
        boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 8px 40px rgba(0,0,0,0.08)',
        padding: 'clamp(24px, 3vw, 40px)',
      }}
    >
      {/* ── Total Value ── */}
      <div style={{ marginBottom: 32 }}>
        <span
          style={{
            display: 'block',
            fontSize: 11,
            fontWeight: 500,
            color: 'var(--text-tertiary)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          Total Value
        </span>
        <span
          className="tabular-nums"
          style={{
            display: 'block',
            fontSize: 'clamp(32px, 3.5vw, 44px)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          {smartFormat(aTot)}
        </span>
      </div>

      {/* ── Invested / Returns split ── */}
      <div
        className="flex"
        style={{
          gap: 0,
          paddingBottom: 28,
          borderBottom: '1px solid var(--border-light)',
          marginBottom: 28,
        }}
      >
        <div style={{ flex: 1 }}>
          <span
            style={{
              display: 'block',
              fontSize: 11,
              fontWeight: 500,
              color: 'var(--text-tertiary)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            Invested
          </span>
          <span
            className="tabular-nums"
            style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}
          >
            {smartFormat(aInv)}
          </span>
        </div>

        {/* Vertical divider */}
        <div
          style={{
            width: 1,
            background: 'var(--border)',
            margin: '0 24px',
            alignSelf: 'stretch',
          }}
        />

        <div style={{ flex: 1 }}>
          <span
            style={{
              display: 'block',
              fontSize: 11,
              fontWeight: 500,
              color: 'var(--text-tertiary)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            Est. Returns
          </span>
          <span
            className="tabular-nums"
            style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}
          >
            {smartFormat(aRet)}
          </span>
        </div>
      </div>

      {/* ── Progress Bar ── */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            height: 8,
            borderRadius: 4,
            background: 'var(--accent-light)',
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          <div
            className="progress-bar-segment"
            style={{
              width: `${invPct}%`,
              background: 'var(--accent)',
              borderRadius: 4,
            }}
          />
        </div>
        <div className="flex justify-between" style={{ marginTop: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
            Invested · {smartFormat(aInv)}
          </span>
          <span style={{ fontSize: 12, color: 'var(--accent)' }}>
            Returns · {smartFormat(aRet)}
          </span>
        </div>
      </div>

      {/* ── Donut Chart (desktop only) ── */}
      <div className="hidden lg:flex justify-center" style={{ paddingTop: 8 }}>
        <DonutChart invested={invested} returns={returns} total={total} />
      </div>
    </div>
  )
}
