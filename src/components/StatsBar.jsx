export default function StatsBar() {
  const stats = [
    { bold: '₹500 Cr+', light: 'managed' },
    { bold: '2.4L+', light: 'investors' },
    { bold: 'Since 2019', light: '' },
  ]

  return (
    <section className="anim-stats px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <div
          style={{
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            padding: '28px 0',
          }}
        >
          <div className="grid grid-cols-3 gap-4 md:gap-0 md:flex md:items-center md:justify-between">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-baseline md:gap-2 text-center md:text-left">
                <span
                  className="tabular-nums"
                  style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}
                >
                  {s.bold}
                </span>
                {s.light && (
                  <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>
                    {s.light}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
