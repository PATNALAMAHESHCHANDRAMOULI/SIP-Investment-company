export default function StatsBar() {
  return (
    <section className="anim-stats px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <div
          style={{
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            padding: '28px 24px',
          }}
        >
          <div className="stats-bar-group" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'nowrap' }}>
            {/* Stat 1 */}
            <div className="stats-bar-item">
              <span
                className="tabular-nums stats-bar-bold"
                style={{ fontWeight: 700, color: 'var(--text-primary)' }}
              >
                100+
              </span>
              <span
                className="stats-bar-label"
                style={{ color: 'var(--text-tertiary)' }}
              >
                investors
              </span>
            </div>

            {/* Divider */}
            <div
              style={{
                width: 1,
                height: 20,
                background: '#E5E7EB',
                alignSelf: 'center',
                flexShrink: 0,
              }}
            />

            {/* Stat 2 */}
            <div className="stats-bar-item">
              <span
                className="tabular-nums stats-bar-bold"
                style={{ fontWeight: 700, color: 'var(--text-primary)' }}
              >
                Since 2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
