export default function Footer() {
  return (
    <footer
      className="px-6 lg:px-10"
      style={{
        borderTop: '1px solid var(--border)',
        padding: '32px 24px',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="7" fill="var(--accent)" />
            <path d="M9 19V13M14 19V9M19 19V15" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>
            SPI Investment
          </span>
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
          Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.
        </span>
        <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
          © {new Date().getFullYear()} SPI Investment
        </span>
      </div>
    </footer>
  )
}
