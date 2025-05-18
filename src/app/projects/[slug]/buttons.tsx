'use client';

/* eslint-disable max-len */
import ShareButton from '@/app/projects/[slug]/footnote';
import { sendDownloadMail } from '@/utils/mailer';

export function Buttons(props: {
  slug: string,
  title: string,
  forceShowShare: boolean,
  repository?: string,
  documentation?: string,
  download?: string,
  demo?: string
}) {
  const showShare = props.forceShowShare || props.repository || props.documentation || props.download || props.demo;
  const clicked = (type: string, url: string) => {
    const mail = { project: props.slug, type, url };
    sendDownloadMail(mail)
      .then((res) => console.log('Download email sent!', res))
      .catch((e) => console.error('Error while sending download email', e));
  };
  return <>
    {props.repository && (
      <a
        href={props.repository}
        onClick={() => clicked('repository', props.repository!)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"/>
        </svg>
        Repository
      </a>
    )}

    {props.documentation && (
      <a
        href={props.documentation}
        onClick={() => clicked('documentation', props.documentation!)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        Documentation
      </a>
    )}

    {props.download && (
      <a
        href={props.download}
        onClick={() => clicked('download', props.download!)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        Download
      </a>
    )}

    {props.demo && (
      <a
        href={props.demo}
        onClick={() => clicked('demo', props.demo!)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
        Live Demo
      </a>
    )}

    {showShare && <ShareButton title={props.title}/>}
  </>;
}
