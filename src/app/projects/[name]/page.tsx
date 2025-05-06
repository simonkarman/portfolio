'use client';

import { PropsWithChildren, use, useRef, useState } from 'react';
import { PageProps } from '@/utils/page-props';
import { getAllProjects } from '@/utils/projects';
import Custom404 from '@/app/not-found';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.min.css';

// Simple icon components
const CopyIcon = (props: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const CheckIcon = (props: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

// Separate component for code blocks with copy functionality
const CodeBlockWithCopy = ({ children }: PropsWithChildren<{ className?: string }>) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);

  const handleCopy = () => {
    const code = (preRef.current as unknown as { textContent: string }).textContent;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre ref={preRef} className='rounded-md'>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white rounded p-1 text-xs opacity-0
          group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {copied ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <CopyIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default function Project(props: PageProps<{ name: string }>) {
  const params = use(props.params);
  const project = getAllProjects().find((p => p.name === params.name));
  if (!project) {
    return <Custom404 />;
  }
  return <div className='bg-darkblue-400'>
    <div className='relative w-full'>
      <div className='container mx-auto px-5 text-white text-center z-[2] relative py-16 sm:py-24 md:py-32'>
        <h1 className='inline-block font-bold border-b pb-3 mb-3 text-3xl sm:text-5xl'>{project.title}</h1>
        <p className='text-lg sm:text-xl'>{project.description}</p>
        <div className='flex flex-wrap items-center justify-center gap-3 mt-4'>
          {project.tags.map(tag => <Link key={tag} href={`/projects?q=tag:${tag}`}
            className={`text-sm sm:text-base px-3 inline-block border border-gray-200 hover:border-gray-400 text-darkblue-500 rounded-3xl
                     bg-gradient-to-br from-white via-gray-50 to-gray-100 hover:via-gray-50 hover:to-gray-300`}>
            {tag}
          </Link>)}
        </div>
      </div>
      <div className='relative container mx-auto z-[3] px-5 pb-4 flex flex-col sm:flex-row items-center flex-wrap justify-between gap-1 text-white'>
        <p>Created by <strong className='font-bold'>{project.contributors}</strong></p>
        <p>Published on <strong className='font-bold'>{project.date.toFormat('yyyy-MM-dd')}</strong></p>
      </div>
      <Image
        src={project.image} alt={project.description}
        fill={true} objectFit='cover'
        className='z-[1] blur-sm opacity-50'
      />
    </div>
    <div className='bg-white'>
      <div className='container mx-auto p-5'>
        <div className='prose prose-lg prose-pre:p-0 prose-pre:border prose-pre:border-gray-100'>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
            components={{
              pre: ({ children, ...props }) => {
                return <CodeBlockWithCopy {...props}>{children}</CodeBlockWithCopy>;
              },
            }}
          >
            {project.content}
          </ReactMarkdown>
        </div>
        <hr className='my-4' />
        {project.repository && <p className='text-sm text-gray-500'>Repository: {project.repository}</p>}
        {project.documentation && <p className='text-sm text-gray-500'>Documentation: {project.documentation}</p>}
        {project.download && <p className='text-sm text-gray-500'>Download: {project.download}</p>}
        {project.demo && <p className='text-sm text-gray-500'>Demo: {project.demo}</p>}
      </div>
    </div>
  </div>;
}
