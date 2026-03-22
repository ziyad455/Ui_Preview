import { ButtonLink } from './ButtonLink'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description: string
  align?: 'left' | 'center'
  action?: {
    href: string
    label: string
  }
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      {action ? (
        <div className="section-heading__action">
          <ButtonLink href={action.href} variant="secondary">
            {action.label}
          </ButtonLink>
        </div>
      ) : null}
    </div>
  )
}
