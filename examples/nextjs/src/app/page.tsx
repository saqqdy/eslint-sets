'use client'

import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Next.js Counter</h1>
      <p>
        Count:
        {count}
      </p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </main>
  )
}
