"use client"

import NotReadyComponent from '@/components/error/non-ready';
import { useEffect } from 'react';

export default function AboutPage() {
  let ready = "not-ready"; // Set this to your actual condition

  useEffect(() => {
    if (ready === "not-ready") {
      // Redirect to the specified URL when the component mounts
      redirectToExternalURL('https://kana-arima.vercel.app');
    }
  }, [ready]);

  return (
    <main>
      {ready === "ready" ? <p>About Page</p> : <NotReadyComponent />}
    </main>
  )
}

function redirectToExternalURL(url) {
  window.open(url, "_blank");
}
