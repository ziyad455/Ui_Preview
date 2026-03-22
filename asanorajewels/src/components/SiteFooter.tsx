import { Link } from 'react-router-dom'
import { assetPath } from '../lib/assets'

const footerLinks = [
  { label: 'Home', href: '/', kind: 'route' as const },
  {
    label: 'Collection',
    href: `${import.meta.env.BASE_URL}#collection`,
    kind: 'anchor' as const,
  },
  { label: 'Products', href: '/products', kind: 'route' as const },
  { label: 'FAQ', href: `${import.meta.env.BASE_URL}#faq`, kind: 'anchor' as const },
]

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img
            src={assetPath('logo.jpg')}
            alt="Asanora Jewels logo"
            width="64"
            height="64"
          />
          <div>
            <strong>Asanora Jewels</strong>
            <p>
              Curated bracelets, chains, and statement pieces with a simpler
              Instagram-first order flow.
            </p>
          </div>
        </div>

        <div className="site-footer__links">
          {footerLinks.map((item) =>
            item.kind === 'route' ? (
              <Link key={item.href} to={item.href}>
                {item.label}
              </Link>
            ) : (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ),
          )}
        </div>

        <p className="site-footer__meta">
          Built for mobile-first browsing and direct Instagram orders.
        </p>
      </div>
    </footer>
  )
}
