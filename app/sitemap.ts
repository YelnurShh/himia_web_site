import type { MetadataRoute } from 'next';
import { lessons } from '@/data/lessons';
import { projects } from '@/data/projects';
import { topExperiments } from '@/data/top-experiments';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const routes = ['', '/lessons', '/periodic-table', '/lab', '/experiments', '/safety', '/about'];
  return [
    ...routes.map(path => ({ url: `${base}${path}`, changeFrequency: 'weekly' as const, priority: path ? 0.7 : 1 })),
    ...lessons.map(item => ({ url: `${base}/lessons/${item.slug}`, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...topExperiments.map(item => ({ url: `${base}/experiments/${item.slug}`, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...projects.map(item => ({ url: `${base}/projects/${item.slug}`, changeFrequency: 'monthly' as const, priority: 0.3 })),
  ];
}
