import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'inverse'
  | 'ghost-light'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: ButtonVariant
}

export function ButtonLink({
  children,
  className = '',
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  const classes = ['button', `button--${variant}`, className].filter(Boolean)

  return (
    <a className={classes.join(' ')} {...props}>
      <span>{children}</span>
      <span className="button__icon" aria-hidden="true">
        -&gt;
      </span>
    </a>
  )
}
