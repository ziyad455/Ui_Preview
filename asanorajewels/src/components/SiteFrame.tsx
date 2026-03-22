import { forwardRef, type ReactNode } from 'react'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

interface SiteFrameProps {
  children: ReactNode
  generalOrderLink: string
}

export const SiteFrame = forwardRef<HTMLDivElement, SiteFrameProps>(
  function SiteFrame({ children, generalOrderLink }, ref) {
    return (
      <div className="page-shell" ref={ref}>
        <div className="ambient ambient--top js-ambient-top" aria-hidden="true" />
        <div className="ambient ambient--side" aria-hidden="true" />
        <SiteHeader generalOrderLink={generalOrderLink} />
        {children}
        <SiteFooter />
      </div>
    )
  },
)
