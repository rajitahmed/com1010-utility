"use client"

import { useEffect, useState } from "react"

export default function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore')

    if (hasVisitedBefore) {
      // Skip animation, but let fade-out complete
      setIsLoading(false)
      const fadeOutTimer = setTimeout(() => setShouldRender(false), 500) // Match fade-out duration
      return () => clearTimeout(fadeOutTimer)
    }

    localStorage.setItem('hasVisitedBefore', 'true')

    const typingAnimationDuration = 4500 // ms
    const bufferTime = 500 // ms
    
    const mainTimer = setTimeout(() => {
      setIsLoading(false);
      // Allow fade-out before unmounting
      const fadeOutTimer = setTimeout(() => setShouldRender(false), 500); // Adjust if fade-out CSS changes
      return () => clearTimeout(fadeOutTimer); // Add return statement to properly clean up fadeOutTimer
    }, typingAnimationDuration + bufferTime);

    return () => clearTimeout(mainTimer)
  }, [])

  if (!shouldRender) return null

  return (
    <div className={`loading-animation ${!isLoading ? "fade-out" : ""}`}>
      <div className="loading-text">Welcome to COM1010 Utility Tool</div>
    </div>
  )
}
