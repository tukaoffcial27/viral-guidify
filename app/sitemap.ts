import { MetadataRoute } from 'next';
import cities from '@/cities.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://viral.guidify.app';

  // Daftar halaman utama
  const routes = ['', '/pricing', '/login'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  // Tambahkan semua kota otomatis
  const cityRoutes = cities.map((city) => ({
    url: `${baseUrl}/${city.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...cityRoutes];
}