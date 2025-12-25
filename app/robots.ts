import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Kita larang Google masuk ke Dashboard & API (karena butuh login)
      disallow: ['/dashboard/', '/api/', '/auth/'],
    },
    // Tunjukkan di mana peta kita berada
    sitemap: 'https://viral.guidify.app/sitemap.xml',
  }
}