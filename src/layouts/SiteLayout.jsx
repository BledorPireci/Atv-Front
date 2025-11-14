import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Header from '../shared/Header.jsx'
import Footer from '../shared/Footer.jsx'

function SiteLayout() {
  const location = useLocation()
  const mainRef = useRef(null)

  useEffect(() => {
    // Scroll to top immediately without animation
    window.scrollTo(0, 0)
    
    // Quick fade transition
    const tl = gsap.timeline()
    
    tl.fromTo(mainRef.current, 
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.2,
        ease: 'power2.out'
      }
    )
  }, [location.pathname])

  return (
    <div className="site-layout">
      <Header />
      <main ref={mainRef}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default SiteLayout
