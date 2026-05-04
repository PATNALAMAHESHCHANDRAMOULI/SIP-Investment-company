export default function ContentSection() {
  return (
    <section id="content" className="px-6 lg:px-10" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* ─── What is SIP? ─── */}
        <article className="anim-content" style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 20 }}>
            What is SIP?
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 16 }}>
            A Systematic Investment Plan lets you invest a fixed amount into mutual funds at
            regular intervals — typically monthly. Instead of timing the market with a single
            large bet, SIP automates discipline. You buy more units when prices dip and fewer
            when they peak, averaging your cost over time.
          </p>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 28 }}>
            The real power of SIP isn't the strategy — it's the consistency. Compounding
            needs time, and time needs habit. SIP turns investing from a decision into a default.
          </p>
          {/* Pull quote */}
          <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 20, margin: '32px 0' }}>
            <p style={{ fontSize: 20, fontWeight: 600, fontStyle: 'italic', color: '#374151', lineHeight: 1.6 }}>
              "Wealth is built in months, not moments."
            </p>
          </div>
        </article>

        {/* ─── Why SIP beats lump sum ─── */}
        <article className="anim-content" style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 20 }}>
            Why SIP beats lump sum
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              { lead: 'Rupee-cost averaging', body: 'smooths out market volatility. You automatically buy more units when NAV is low and fewer when it\'s high.' },
              { lead: 'Discipline over prediction', body: '— no need to time the market. Your investment happens regardless of headlines or sentiment.' },
              { lead: 'Lower barrier to entry', body: '— start with as little as ₹500 per month. You don\'t need a lakh sitting idle in your savings account.' },
              { lead: 'Compounding acceleration', body: '— each installment starts compounding the moment it\'s invested, creating multiple compounding timelines working in parallel.' },
            ].map((item, i) => (
              <li key={i} className="flex gap-3" style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 12 }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0, fontWeight: 600, fontSize: 14, marginTop: 3 }}>→</span>
                <span>
                  <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{item.lead}</strong>{' '}
                  {item.body}
                </span>
              </li>
            ))}
          </ul>
        </article>

        {/* ─── How returns are calculated ─── */}
        <article className="anim-content" style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 20 }}>
            How returns are calculated
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>
            The future value of a SIP is calculated using the compound interest formula for
            recurring deposits. Each monthly installment compounds independently from its deposit date.
          </p>
          <div className="formula-block">
            <div><span className="v">FV</span> = <span className="v">P</span> × [(1 + <span className="v">r</span>)<sup><span className="v">n</span></sup> − 1] / <span className="v">r</span> × (1 + <span className="v">r</span>)</div>
            <div style={{ marginTop: 12 }}><span className="c">where:</span></div>
            <div><span className="v">P</span>{'  '} = monthly investment amount</div>
            <div><span className="v">r</span>{'  '} = monthly rate of return (annual rate ÷ 12)</div>
            <div><span className="v">n</span>{'  '} = total number of months</div>
            <div><span className="v">FV</span> = future value of the investment</div>
          </div>
        </article>

        {/* ─── Real Example ─── */}
        <article className="anim-content">
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 20 }}>
            Real example
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>
            Investing ₹5,000 every month for 15 years at 12% expected annual return.
          </p>
          <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid var(--border)' }}>
            <table className="spi-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ color: 'var(--text-secondary)' }}>Monthly SIP</td>
                  <td>₹5,000</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>—</td>
                </tr>
                <tr>
                  <td style={{ color: 'var(--text-secondary)' }}>Duration</td>
                  <td>15 years</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>180 months</td>
                </tr>
                <tr>
                  <td style={{ color: 'var(--text-secondary)' }}>Annual Return</td>
                  <td>12%</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>1% / month</td>
                </tr>
                <tr>
                  <td style={{ color: 'var(--text-secondary)' }}>Total Invested</td>
                  <td>₹9,00,000</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>₹9L</td>
                </tr>
                <tr>
                  <td>Total Value</td>
                  <td style={{ fontWeight: 700, color: 'var(--accent)' }}>₹25.23L</td>
                  <td style={{ fontWeight: 700, color: 'var(--accent)' }}>₹16.23L returns</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

      </div>
    </section>
  )
}
