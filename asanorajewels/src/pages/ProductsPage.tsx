import { useDeferredValue, useState } from 'react'
import { ButtonLink } from '../components/ButtonLink'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { SiteFrame } from '../components/SiteFrame'
import { allProducts, productFilters } from '../data/content'

interface ProductsPageProps {
  generalOrderLink: string
}

export function ProductsPage({ generalOrderLink }: ProductsPageProps) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const normalizedQuery = deferredQuery.trim().toLowerCase()

  const visibleProducts = normalizedQuery
    ? allProducts.filter((product) => {
        const searchableText = [
          product.name,
          product.reference,
          product.category,
          product.note,
          product.description,
        ]
          .join(' ')
          .toLowerCase()

        return searchableText.includes(normalizedQuery)
      })
    : allProducts

  return (
    <SiteFrame generalOrderLink={generalOrderLink}>
      <main className="products-page">
        <section className="section section--products-hero">
          <div className="section__inner products-page__hero">
            <div className="products-page__copy">
              <span className="eyebrow">All products</span>
              <h1 className="products-page__title">
                Browse the full jewelry selection in one place.
              </h1>
              <p className="products-page__lead">
                Search by product name, reference, or style and jump straight to
                Instagram when you are ready to order.
              </p>
            </div>

            <div className="products-page__hero-card">
              <p className="mini-label">Quick ordering</p>
              <strong>Tap any product to open Instagram in a new tab.</strong>
              <p>
                Your place on the site stays open while the DM conversation
                starts separately.
              </p>
              <ButtonLink
                href={generalOrderLink}
                variant="secondary"
                target="_blank"
                rel="noreferrer"
              >
                Message Asanora Jewels
              </ButtonLink>
            </div>
          </div>
        </section>

        <section className="section products-catalog">
          <div className="section__inner">
            <SectionHeading
              eyebrow="Product catalog"
              title="Search the collection and keep the next action simple."
              description="Use the search bar now. Filter controls are already styled and ready for a functional pass later."
            />

            <div className="products-toolbar" data-reveal>
              <label className="products-toolbar__search">
                <span className="products-toolbar__label">Search products</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name, reference, or style"
                />
              </label>

              <div className="products-toolbar__filters">
                <span className="products-toolbar__label">Filter options</span>
                <div className="products-toolbar__chips" aria-label="Filter UI">
                  {productFilters.map((filter, index) => (
                    <button
                      key={filter}
                      type="button"
                      className={`filter-chip${index === 0 ? ' filter-chip--active' : ''}`}
                      aria-disabled={index !== 0}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                <p className="products-toolbar__note">
                  Filters are displayed for navigation planning and can be wired
                  next.
                </p>
              </div>
            </div>

            <div className="products-results" data-reveal>
              <p className="products-results__count">
                {visibleProducts.length} product
                {visibleProducts.length === 1 ? '' : 's'} found
              </p>
            </div>

            {visibleProducts.length > 0 ? (
              <div className="products-grid products-grid--full">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.reference} {...product} />
                ))}
              </div>
            ) : (
              <div className="products-empty" data-reveal>
                <h2>No matching products</h2>
                <p>
                  Try a different search term or message Asanora Jewels directly
                  for help choosing a piece.
                </p>
                <ButtonLink
                  href={generalOrderLink}
                  variant="secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ask on Instagram
                </ButtonLink>
              </div>
            )}
          </div>
        </section>
      </main>
    </SiteFrame>
  )
}
