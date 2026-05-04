export default function Hero() {
  return (
    <section className="px-6 lg:px-10" style={{ paddingTop: 80 }}>
      <div className="max-w-6xl mx-auto">
        <h1
          className="anim-hero font-extrabold"
          style={{
            fontSize: 'clamp(36px, 4.5vw, 48px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}
        >
          SIP Investment Company
        </h1>
        <p
          className="anim-sub"
          style={{
            marginTop: 8,
            fontSize: 18,
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}
        >
          See exactly how your SIP grows.
          <br />
          Future Money Investment Plan.
        </p>
      </div>
    </section>
  )
}
