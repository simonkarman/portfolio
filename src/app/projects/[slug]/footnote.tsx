'use client';

export default function ShareButton(props: { title: string, url?: () => string }) {
  const url = props.url ?? (() => window.location.href);
  return <button
    className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100
             rounded-md hover:bg-gray-200 transition-colors"
    onClick={() => navigator.share({
      title: props.title,
      url: url(),
    }).catch(e => console.info('Share failed', e))}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {/* eslint-disable-next-line max-len */}
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
    Share
  </button>;
}
