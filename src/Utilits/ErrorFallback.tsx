import React from 'react'

export default function ErrorFallback({ error, resetErrorBoundary}:any) {
  return (
  <div >
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
  )
}
