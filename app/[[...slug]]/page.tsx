import App from '@/src/App';

interface CatchAllPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const resolvedParams = await params;
  const pathname = resolvedParams.slug?.length ? `/${resolvedParams.slug.join('/')}` : '/';
  return <App initialPathname={pathname} />;
}
