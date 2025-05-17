export function transformImageSrc<T = unknown>(slug: string, original: T) {
  if (typeof original !== 'string') {
    return original;
  }
  const patterns = ['./public/', '/public/'];
  const pattern = patterns.find(p => original.startsWith(p));
  if (pattern === undefined) {
    return original;
  }

  const path = original.slice(pattern.length);
  return `/content/${slug}/${path}`;
}
