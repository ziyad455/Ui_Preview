import { Link, useLocation } from 'react-router-dom'
import { ButtonLink } from './ButtonLink'
import { assetPath } from '../lib/assets'

interface SiteHeaderProps {
  generalOrderLink: string
}

const navItems = [
  { label: 'Home', href: '/', kind: 'route' as const },
  {
    label: 'Collection',
    href: `${import.meta.env.BASE_URL}#collection`,
    kind: 'anchor' as const,
  },
  { label: 'Products', href: '/products', kind: 'route' as const },
  { label: 'FAQ', href: `${import.meta.env.BASE_URL}#faq`, kind: 'anchor' as const },
]

export function SiteHeader({ generalOrderLink }: SiteHeaderProps) {
  const { pathname } = useLocation()

  return (
    <header className="site-header js-nav">
      <div className="site-header__shell">
        <Link className="brand" to="/" aria-label="Asanora Jewels home">
          <img
            className="brand__mark"
            src={assetPath('logo.jpg')}
            alt="Asanora Jewels logo"
            width="56"
            height="56"
          />
          <span className="brand__text">
            <strong>Asanora Jewels</strong>
            <small>Jewels as unique as you</small>
          </span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          {navItems.map((item) =>
            item.kind === 'route' ? (
              <Link
                key={item.href}
                className={`nav-link${pathname === item.href ? ' nav-link--active' : ''}`}
                to={item.href}
              >
                {item.label}
              </Link>
            ) : (
              <a key={item.href} className="nav-link" href={item.href}>
                {item.label}
              </a>
            ),
          )}
        </nav>

        <ButtonLink
          href={generalOrderLink}
          variant="secondary"
          target="_blank"
          rel="noreferrer"
        >
          Start an order
        </ButtonLink>
      </div>
    </header>
  )
}
