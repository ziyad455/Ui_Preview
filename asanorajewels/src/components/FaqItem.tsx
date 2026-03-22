export interface FaqItemProps {
  question: string
  answer: string
}

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="faq-item" data-reveal>
      <summary>
        <span>{question}</span>
        <span className="faq-item__icon" aria-hidden="true" />
      </summary>
      <p>{answer}</p>
    </details>
  )
}
