'use client';

import { useState } from 'react';

export function Counter(props: { initialCount?: number }) {
  const [count, setCount] = useState(props.initialCount ?? 0);

  return (
    <div>
      <h2>Counter</h2>
      <p className='text-gray-300'>Count: {count}</p>
      <button
        className='bg-darkblue-200 text-white px-4 py-2 rounded hover:bg-darkblue-600 transition duration-200 focus:outline-none focus:ring-2'
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  );
}
