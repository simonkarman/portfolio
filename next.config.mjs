import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeHighlight from 'rehype-highlight';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      new URL('https://images.ctfassets.net/**'),
      new URL('https://mdg.imgix.net/**'),
      { hostname: 'raw.githubusercontent.com' },
    ],
  },
  experimental: {
    useCache: true,
  },
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [rehypeHighlight],
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
  },
});

export default withMDX(nextConfig);
