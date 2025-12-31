import { MetadataRoute } from 'next';
import cities from '../cities.json'; // Jalur ke file cities.json di Root

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://viral.guidify.app';

  // Halaman Utama
  const routes = ['', '/pricing', '/login'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  // Halaman Kota Otomatis
  const cityRoutes = cities.map((city) => ({
    url: `${baseUrl}/${city.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...cityRoutes];
}