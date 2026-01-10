import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gas Rate Calculator UK',
    short_name: 'Gas Rate Calc',
    description: 'Free gas rate calculator for UK Gas Safe registered engineers',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#f97316',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icon',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
