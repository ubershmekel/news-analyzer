export interface NewsLink {
  id: number
  url: string
}

export interface NewsItem {
  title: string
  links: NewsLink[]
}

export interface SpanSummary {
  daysBack: number
  name: string
  items: NewsItem[]
}

export interface FrontPageSummaries {
  createdAt: string
  summaries: SpanSummary[]
}

export const summarySpans: SpanSummary[] = [
  {
    daysBack: 1,
    name: 'Today',
    items: [],
  },
  {
    daysBack: 3,
    name: '3 days',
    items: [],
  },
  {
    daysBack: 7,
    name: '7 days',
    items: [],
  },
  {
    daysBack: 14,
    name: '14 days',
    items: [],
  },
  {
    daysBack: 30,
    name: '30 days',
    items: [],
  },
]
