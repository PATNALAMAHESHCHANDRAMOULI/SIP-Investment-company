export default function Navbar() {
  const scrollTo = (e) => {
    e.preventDefault()
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-10"
      style={{
        height: 64,
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="7" fill="var(--accent)" />
          <path d="M9 19V13M14 19V9M19 19V15" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        <span
          className="font-semibold"
          style={{ fontSize: 15, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
        >
          SPI Investment
        </span>
      </div>

      {/* Desktop link */}
      <a
        href="#content"
        onClick={scrollTo}
        className="hidden md:block"
        style={{
          fontSize: 14,
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          transition: 'color 150ms',
        }}
        onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
        onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
      >
        How it works
      </a>
    </nav>
  )
}
