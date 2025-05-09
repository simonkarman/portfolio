import Content from './content.mdx';

import 'highlight.js/styles/github.min.css';

export default function Page() {
  return <div className='px-5 py-10 overflow-x-hidden'>
    <div className='mx-auto prose prose-lg
                           prose-pre:p-2 prose-pre:border prose-pre:border-gray-100 prose-pre:bg-gray-50
                           prose-img:mx-auto prose-img:max-h-[60vh] prose-img:max-w-[90%] prose-img:rounded-lg prose-img:border
                           '>
      <Content />
    </div>
  </div>;
}
