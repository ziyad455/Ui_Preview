import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ButtonLink } from '../components/ButtonLink'
import { FaqItem } from '../components/FaqItem'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { SiteFrame } from '../components/SiteFrame'
import {
  editorialTags,
  faqs,
  featuredProducts,
  heroHighlights,
  orderSteps,
  promiseItems,
} from '../data/content'
import { assetPath } from '../lib/assets'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface LandingPageProps {
  generalOrderLink: string
}

export function LandingPage({ generalOrderLink }: LandingPageProps) {
  const scope = useRef<HTMLDivElement>(null)
  const productsPath = `${import.meta.env.BASE_URL}products`

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add(
        {
          desktop: '(min-width: 960px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions as {
            desktop: boolean
            reduceMotion: boolean
          }

          if (reduceMotion) {
            return
          }

          const introTimeline = gsap.timeline({
            defaults: {
              duration: 0.95,
              ease: 'power3.out',
            },
          })

          introTimeline
            .from('.js-nav', {
              y: -24,
              autoAlpha: 0,
              duration: 0.72,
            })
            .from(
              '.js-hero-copy > *',
              {
                y: 28,
                autoAlpha: 0,
                stagger: 0.12,
              },
              '-=0.2',
            )
            .from(
              '.js-hero-media',
              {
                y: 34,
                autoAlpha: 0,
                scale: 0.96,
                duration: 1.05,
              },
              '-=0.68',
            )
            .from(
              '.js-float-card',
              {
                y: 18,
                autoAlpha: 0,
                stagger: 0.1,
                duration: 0.82,
              },
              '-=0.74',
            )

          ScrollTrigger.batch('[data-reveal]', {
            once: true,
            start: 'top 86%',
            onEnter: (batch) => {
              gsap.fromTo(
                batch,
                {
                  y: 38,
                  autoAlpha: 0,
                },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.9,
                  ease: 'power3.out',
                  stagger: 0.12,
                  overwrite: true,
                },
              )
            },
          })

          if (desktop) {
            gsap.to('.js-ambient-top', {
              yPercent: -16,
              ease: 'none',
              scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.1,
              },
            })

            gsap.to('.js-hero-primary', {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.1,
              },
            })

            gsap.to('.js-hero-secondary', {
              yPercent: -12,
              ease: 'none',
              scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.3,
              },
            })

            gsap.to('.js-spotlight-media', {
              yPercent: -6,
              ease: 'none',
              scrollTrigger: {
                trigger: '.collection',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            })
          }
        },
        scope,
      )

      return () => media.revert()
    },
    { scope },
  )

  return (
    <SiteFrame ref={scope} generalOrderLink={generalOrderLink}>
      <main>
        <section className="section section--hero hero" id="top">
          <div className="section__inner hero__layout">
            <div className="hero__copy js-hero-copy">
              <span className="eyebrow">Shop Asanora Jewels on Instagram</span>
              <h1>Jewels as unique as you.</h1>
              <p className="hero__lead">
                Browse the featured pieces, tap Order Now, and go straight into
                Instagram messages with the product already identified for you.
              </p>

              <div className="hero__actions">
                <ButtonLink href="#collection">Browse the collection</ButtonLink>
                <ButtonLink href={productsPath} variant="ghost">
                  View all products
                </ButtonLink>
              </div>

              <div className="hero__highlights">
                {heroHighlights.map((highlight) => (
                  <article key={highlight.title} className="highlight-card">
                    <p className="highlight-card__title">{highlight.title}</p>
                    <p className="highlight-card__text">{highlight.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="hero__showcase js-hero-media">
              <div className="hero__frame hero__frame--primary js-hero-primary">
                <img
                  src={assetPath('products/editorial-plate.jpg')}
                  alt="Assorted gold jewelry styled on a plate for an editorial brand shot"
                  fetchPriority="high"
                />
              </div>

              <div className="hero__frame hero__frame--secondary js-hero-secondary js-float-card">
                <img
                  src={assetPath('products/gold-mesh-bracelet.jpg')}
                  alt="Layered gold bracelet on dark draped fabric"
                />
              </div>

              <div className="hero__mini-card js-float-card">
                <img
                  src={assetPath('products/watch-bracelet.jpg')}
                  alt="Gold watch bracelet on a dark background"
                />
                <div>
                  <span className="mini-label">Signature detail</span>
                  <strong>Drop-led styling</strong>
                </div>
              </div>

              <div className="hero__brand-card js-float-card">
                <img
                  src={assetPath('logo.jpg')}
                  alt=""
                  width="72"
                  height="72"
                  aria-hidden="true"
                />
                <div>
                  <p className="mini-label">Fast ordering</p>
                  <p className="hero__brand-copy">
                    Each featured piece connects directly to Instagram DMs so
                    customers can inquire without friction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section collection" id="collection">
          <div className="section__inner">
            <div data-reveal>
              <SectionHeading
                eyebrow="The essence collection"
                title="Featured pieces with a clearer path from browsing to ordering."
                description="Every product card now carries a direct Instagram order button so interest can turn into a message immediately."
                action={{ href: productsPath, label: 'View all products' }}
              />
            </div>

            <div className="collection__layout">
              <article className="spotlight-card" data-reveal>
                <div className="spotlight-card__body">
                  <span className="eyebrow eyebrow--soft">Signature edit</span>
                  <h3>
                    Discover the piece, tap once, and continue the conversation
                    where the brand already sells best.
                  </h3>
                  <p>
                    The layout keeps the premium look, but the ordering flow is
                    intentionally simple: product first, message next.
                  </p>

                  <div className="tag-list">
                    {editorialTags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <ButtonLink
                    href={generalOrderLink}
                    variant="secondary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Order through Instagram
                  </ButtonLink>
                </div>

                <div className="spotlight-card__media js-spotlight-media">
                  <img
                    src={assetPath('products/knot-bracelet.jpg')}
                    alt="Gold knot bracelet placed on a soft beige jewelry box"
                  />
                </div>
              </article>

              <div className="product-grid">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.reference} {...product} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section promise" id="story">
          <div className="section__inner promise__layout">
            <div className="promise__intro" data-reveal>
              <SectionHeading
                eyebrow="The curator's promise"
                title="A premium page can still feel simple when the next action is obvious."
                description="The design stays polished, but the user never has to wonder how to ask about a piece."
              />

              <div className="promise__feature-card">
                <div className="promise__feature-media">
                  <img
                    src={assetPath('products/onyx-bracelet.jpg')}
                    alt="Black enamel bracelet in a minimal studio composition"
                  />
                </div>
                <div className="promise__feature-copy">
                  <p className="mini-label">Visual direction</p>
                  <strong>Soft luxury, not sterile minimalism.</strong>
                  <p>
                    Cream surfaces, brushed gold accents, and direct message
                    CTAs keep the experience elegant and actionable.
                  </p>
                </div>
              </div>
            </div>

            <div className="promise__grid">
              {promiseItems.map((item, index) => (
                <article key={item.title} className="promise-card" data-reveal>
                  <span className="promise-card__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section order" id="order">
          <div className="section__inner order__layout">
            <div className="order__media" data-reveal>
              <div className="order__media-card">
                <img
                  src={assetPath('products/snake-pendant.jpg')}
                  alt="Gold pendant necklace on dark fabric"
                />
              </div>

              <div className="order__floating-card">
                <span className="mini-label">Simple path to purchase</span>
                <ul className="order__floating-list">
                  <li>Choose the piece that matches the drop.</li>
                  <li>Send a direct message with the item name.</li>
                  <li>Confirm size, city, and delivery details.</li>
                </ul>
              </div>
            </div>

            <div className="order__content">
              <div data-reveal>
                <SectionHeading
                  eyebrow="Your journey to elegance"
                  title="The order flow is now built around Instagram Direct Messages."
                  description="Instead of making customers think, the page points them straight to the fastest way to ask and buy."
                />
              </div>

              <div className="step-list">
                {orderSteps.map((step) => (
                  <article key={step.number} className="step-card" data-reveal>
                    <span className="step-card__number">{step.number}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="section__inner faq__inner">
            <div data-reveal>
              <SectionHeading
                eyebrow="Frequently asked"
                title="Answers stay short so customers can keep moving toward the order."
                description="The page supports quick questions without adding extra steps to the buying process."
                align="center"
              />
            </div>

            <div className="faq-list">
              {faqs.map((item) => (
                <FaqItem key={item.question} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="section cta" id="contact">
          <div className="section__inner">
            <div className="cta__shell" data-reveal>
              <div className="cta__copy">
                <span className="eyebrow eyebrow--inverse">
                  Order directly on Instagram
                </span>
                <h2>Ready to ask about your favorite piece?</h2>
                <p>
                  Send a direct message to Asanora Jewels and continue the order
                  with product details, sizing, and delivery in one place.
                </p>

                <div className="cta__actions">
                  <ButtonLink
                    href={generalOrderLink}
                    variant="inverse"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Message Asanora Jewels
                  </ButtonLink>
                  <ButtonLink href={productsPath} variant="ghost-light">
                    View featured pieces
                  </ButtonLink>
                </div>
              </div>

              <div className="cta__card">
                <img
                  src={assetPath('logo.jpg')}
                  alt="Asanora Jewels logo"
                  width="96"
                  height="96"
                />
                <p className="mini-label">Instagram ordering</p>
                <strong>Asanora Jewels</strong>
                <p>
                  Clear product cards, simpler order buttons, and a faster path
                  from discovery to inquiry.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  )
}
