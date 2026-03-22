import type { FaqItemProps } from '../components/FaqItem'
import type { ProductCardProps } from '../components/ProductCard'

export const heroHighlights = [
  {
    title: 'Order in one tap',
    text: 'Every featured piece now leads straight into Instagram messages without extra steps or a contact form.',
  },
  {
    title: 'Product-specific inquiry',
    text: 'The message can already include the product name and reference so customers do not need to explain what they want.',
  },
  {
    title: 'Built for mobile',
    text: 'The page keeps browsing light and fast for Instagram-first shoppers who usually buy from their phone.',
  },
]

export const editorialTags = [
  'Instagram-first ordering',
  'Clear product references',
  'Fast mobile inquiry flow',
]

export const allProducts: ProductCardProps[] = [
  {
    name: 'Zodiac Bracelet',
    reference: 'AJ-01',
    image: '/products/zodiac-bracelet.jpg',
    alt: 'Gold bracelet worn over a blue sleeve in a lifestyle shot',
    category: 'Personalized favorite',
    note: 'Ready to order',
    description: 'A daily-wear bracelet with personal appeal and an easy DM path for quick inquiries.',
    position: 'center',
  },
  {
    name: 'Heart Set',
    reference: 'AJ-02',
    image: '/products/heart-set.jpg',
    alt: 'Gold heart earrings and matching necklace on a shell-like plate',
    category: 'Matching set',
    note: 'New arrival',
    description: 'A romantic matching set for customers who want a complete look in one message.',
    position: 'center',
  },
  {
    name: 'Onyx Bracelet',
    reference: 'AJ-03',
    image: '/products/onyx-bracelet.jpg',
    alt: 'Black enamel gold bracelet styled against a contrasting studio background',
    category: 'Studio contrast',
    note: 'Best for stacking',
    description: 'A darker contrast piece that stands out quickly in the feed and on the landing page.',
    position: 'center',
  },
  {
    name: 'Butterfly Handpiece',
    reference: 'AJ-04',
    image: '/products/butterfly-handpiece.jpg',
    alt: 'Butterfly-shaped handpiece bracelet on a cream background',
    category: 'Occasion detail',
    note: 'Limited batch',
    description: 'An occasion-led piece that benefits from a direct DM CTA instead of a longer checkout flow.',
    position: 'center top',
  },
  {
    name: 'Snake Pendant',
    reference: 'AJ-05',
    image: '/products/snake-pendant.jpg',
    alt: 'Snake chain necklace with a round pendant on black draped fabric',
    category: 'Pendant necklace',
    note: 'Everyday piece',
    description: 'A sleek gold necklace that feels minimal, polished, and easy to wear daily.',
    position: 'center',
  },
  {
    name: 'Mother of Pearl Chain',
    reference: 'AJ-06',
    image: '/products/mother-of-pearl-chain.jpg',
    alt: 'Fine gold chain with mother of pearl stations on a dark backdrop',
    category: 'Layering chain',
    note: 'Soft shine',
    description: 'A lighter, more delicate chain for customers looking for subtle layering details.',
    position: 'center',
  },
  {
    name: 'Gold Mesh Bracelet',
    reference: 'AJ-07',
    image: '/products/gold-mesh-bracelet.jpg',
    alt: 'Wide gold bracelet laid on dark fabric',
    category: 'Statement bracelet',
    note: 'Bold finish',
    description: 'A stronger bracelet silhouette that adds a more elevated statement to the collection.',
    position: 'center',
  },
  {
    name: 'Knot Bracelet',
    reference: 'AJ-08',
    image: '/products/knot-bracelet.jpg',
    alt: 'Gold knot bracelet displayed on a jewelry box',
    category: 'Bracelet',
    note: 'Giftable favorite',
    description: 'A polished bracelet with a gift-friendly look and a more classic presentation.',
    position: 'center',
  },
  {
    name: 'Watch Bracelet',
    reference: 'AJ-09',
    image: '/products/watch-bracelet.jpg',
    alt: 'Gold watch bracelet on a dark studio background',
    category: 'Statement piece',
    note: 'Editorial pick',
    description: 'A watch-style piece that gives the catalog stronger variety and visual contrast.',
    position: 'center',
  },
  {
    name: 'Charm Layer Necklace',
    reference: 'AJ-10',
    image: '/products/editorial-plate.jpg',
    alt: 'Assorted gold necklaces and charms styled on a plate',
    category: 'Charm necklace',
    note: 'Signature edit',
    description: 'A layered charm direction inspired by the reel styling and the most editorial brand shots.',
    position: 'center',
  },
]

export const featuredProducts = allProducts.slice(0, 4)

export const productFilters = [
  'All',
  'Bracelets',
  'Necklaces',
  'Sets',
  'Statement',
]

export const promiseItems = [
  {
    title: 'Clear buying path',
    text: 'Customers move from product discovery to Instagram conversation with almost no friction.',
  },
  {
    title: 'Product-led layout',
    text: 'Warm surfaces and clean spacing keep attention on the jewelry while the CTA stays obvious.',
  },
  {
    title: 'Simpler conversion flow',
    text: 'No account creation, no cart, and no complicated funnel before the customer can start ordering.',
  },
]

export const orderSteps = [
  {
    number: '01',
    title: 'Choose the piece',
    text: 'Browse the featured products and tap the piece you want instead of searching manually in Instagram.',
  },
  {
    number: '02',
    title: 'Tap Order Now',
    text: 'The button opens Instagram Direct Messages with the product name and reference already prepared.',
  },
  {
    number: '03',
    title: 'Confirm details',
    text: 'Confirm size, city, and delivery details directly in chat and finish the order without extra forms.',
  },
]

export const faqs: FaqItemProps[] = [
  {
    question: 'How do I place an order?',
    answer:
      'Choose a product, tap Order Now, and Instagram will open a direct message with the item name and reference already added.',
  },
  {
    question: 'Do you release limited drops?',
    answer:
      'Yes. Reel-featured edits and smaller batches can move quickly, so availability is typically confirmed at the time of inquiry.',
  },
  {
    question: 'Can I ask about sizing or gifting before ordering?',
    answer:
      'Yes. Bracelets, chains, and gift recommendations can all be discussed before the order is finalized.',
  },
  {
    question: 'How is delivery arranged?',
    answer:
      'Delivery timing and payment details are confirmed directly during follow-up so the process can stay flexible by location and item.',
  },
  {
    question: 'Do the order buttons work on mobile?',
    answer:
      'Yes. They are designed for Instagram-first mobile use and send customers straight into the brand’s DM flow.',
  },
]
