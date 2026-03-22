const INSTAGRAM_USERNAME = 'asanorajewels'

export function buildInstagramDmLink(message?: string) {
  const baseUrl = `https://ig.me/m/${INSTAGRAM_USERNAME}`

  if (!message) {
    return baseUrl
  }

  return `${baseUrl}?text=${encodeURIComponent(message)}`
}

export function buildInstagramOrderLink(productName: string, reference: string) {
  return buildInstagramDmLink(
    `Hi Asanora Jewels, I want to order ${productName} (${reference}). Can you share the price and availability?`,
  )
}
