import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Hero.scss'
import banner from '../../../assets/banner.png'

function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const paragraphRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    // Set initial visibility
    gsap.set([heroRef.current, titleRef.current, paragraphRef.current, ctaRef.current], { opacity: 1 })
    
    const tl = gsap.timeline({ 
      defaults: { ease: 'power2.out' },
      delay: 0.15
    })
    
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
    .fromTo(paragraphRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4 },
      '-=0.3'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.3 },
      '-=0.2'
    )
  }, [])

  return (
    <section className="hero" ref={heroRef} style={{ backgroundImage: `url(${banner})` }}>
      <div className="container">
        <div className="hero__content">
          <h1 ref={titleRef}>Përjeto aventurën me ATV-të tona</h1>
          <p ref={paragraphRef}>Shijo natyrën dhe adrenalinën me qira ATV në zonat më të bukura. Jepi vetes një eksperiencë që nuk harrohet.</p>
          <div className="hero__actions" ref={ctaRef}>
            <a className="cta" href="#contact">
              <span className="cta__icon" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.52 3.48A11.94 11.94 0 0 0 12.01 0C5.39 0 .03 5.36.03 11.98c0 2.11.55 4.17 1.59 5.98L0 24l6.2-1.6a11.94 11.94 0 0 0 5.81 1.49h.01c6.62 0 11.98-5.36 11.98-11.98 0-3.2-1.25-6.21-3.48-8.43ZM12.02 21.5h-.01a9.52 9.52 0 0 1-4.85-1.32l-.35-.2-3.68.95.98-3.59-.23-.37a9.48 9.48 0 1 1 8.14 4.53Zm5.22-7.09c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.74.91-.9 1.09-.17.19-.33.21-.61.07-.28-.14-1.17-.43-2.23-1.38-.82-.73-1.38-1.63-1.54-1.9-.16-.28-.02-.43.12-.57.12-.12.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.54-.47-.46-.64-.47-.16-.01-.35-.01-.54-.01-.19 0-.49.07-.75.35-.26.28-1 1-1 2.45 0 1.45 1.02 2.85 1.17 3.04.14.19 2 3.05 4.84 4.28.68.29 1.21.47 1.62.61.68.22 1.29.19 1.77.12.54-.08 1.66-.68 1.89-1.33.23-.66.23-1.23.16-1.35-.07-.12-.26-.19-.54-.33Z" fill="currentColor"/>
                </svg>
              </span>
              <span className="cta__label">Na kontakto tani</span>
              <span className="cta__badge">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
