import type { CSSProperties } from 'react'
import { buildInstagramOrderLink } from '../lib/instagram'

export interface ProductCardProps {
  name: string
  reference: string
  image: string
  alt: string
  category: string
  note: string
  description: string
  position?: string
}

export function ProductCard({
  name,
  reference,
  image,
  alt,
  category,
  note,
  description,
  position = 'center',
}: ProductCardProps) {
  const orderLink = buildInstagramOrderLink(name, reference)

  return (
    <article
      className="product-card"
      data-reveal
      style={{ '--product-position': position } as CSSProperties}
    >
      <div className="product-card__media">
        <img src={image} alt={alt} loading="lazy" />
        <span className="product-card__pill">{category}</span>
      </div>

      <div className="product-card__content">
        <div>
          <div className="product-card__meta">
            <p className="product-card__note">{note}</p>
            <p className="product-card__reference">Ref {reference}</p>
          </div>
          <h3>{name}</h3>
        </div>
        <p className="product-card__description">{description}</p>
      </div>

      <a
        className="product-card__action"
        href={orderLink}
        aria-label={`Order ${name} on Instagram`}
        target="_blank"
        rel="noreferrer"
      >
        Order Now
        <span aria-hidden="true">-&gt;</span>
      </a>

      <p className="product-card__hint">
        Opens Instagram DM with {name} and {reference} already filled in.
      </p>
    </article>
  )
}
