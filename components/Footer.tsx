export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--surface-base)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '64px 48px 32px',
      }}
    >
      {/* Top grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 max-w-6xl mx-auto pb-12 border-b"
        style={{ borderBottomColor: 'var(--border-subtle)' }}
      >
        {/* Brand */}
        <div>
          <img
            src="/assets/brand/logo-vettia-color.svg"
            alt="Vettia"
            width={100}
            height={28}
          />
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: 'var(--text-secondary)',
              marginTop: 16,
              lineHeight: 1.5,
            }}
          >
            Software B2B para nichos específicos.
            <br />
            Betim, MG.
          </p>
        </div>

        {/* Produtos */}
        <div>
          <span
            style={{
              display: 'block',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginBottom: 16,
            }}
          >
            Produtos
          </span>
          <nav
            aria-label="Produtos Vettia"
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
          >
            {[
              { href: '/frota360', label: 'Frota360' },   // TODO: substituir por URL real quando rota /frota360 existir
              { href: '/autoquote', label: 'AutoQuote' }, // TODO: substituir por URL real quando rota /autoquote existir
              { href: '#desenvolvimento', label: 'Dev sob medida' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="hover:text-[var(--text-primary)] transition-colors duration-150"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contato */}
        <div>
          <span
            style={{
              display: 'block',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginBottom: 16,
            }}
          >
            Contato
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a
              href="https://wa.me/553175142675"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors duration-150"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
              }}
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/vett.ia.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors duration-150"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
              }}
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-6xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 400,
            fontSize: 12,
            color: 'var(--text-secondary)',
            opacity: 0.5,
          }}
        >
          © 2025 Vettia Soluções em Tecnologia Ltda.
        </p>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 400,
            fontSize: 12,
            color: 'var(--text-secondary)',
            opacity: 0.5,
          }}
        >
          CNPJ 67.852.495/0001-58
        </p>
      </div>
    </footer>
  )
}
