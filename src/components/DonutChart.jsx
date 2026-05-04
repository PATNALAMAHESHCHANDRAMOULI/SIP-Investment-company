import { smartFormat } from '../hooks'

export default function DonutChart({ invested, returns, total }) {
  const size = 180
  const strokeWidth = 22
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  const invRatio = total > 0 ? invested / total : 0.5
  const gap = 0.015

  const invArc = circumference * Math.max(invRatio - gap, 0.01)
  const retArc = circumference * Math.max(1 - invRatio - gap, 0.01)
  const retOffset = -(circumference * invRatio + circumference * gap)

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        {/* Invested arc */}
        <circle
          className="donut-seg"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${invArc} ${circumference - invArc}`}
          strokeDashoffset={0}
          strokeLinecap="round"
        />
        {/* Returns arc */}
        <circle
          className="donut-seg"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--accent-light)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${retArc} ${circumference - retArc}`}
          strokeDashoffset={retOffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Total
        </span>
        <span className="tabular-nums" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          {smartFormat(total)}
        </span>
      </div>
    </div>
  )
}
