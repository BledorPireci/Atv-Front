import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from '../assets/Logo.png'
import './Footer.scss'

gsap.registerPlugin(ScrollTrigger)

function Footer() {
  const footerRef = useRef(null)
  const brandRef = useRef(null)
  const linksRef = useRef(null)
  const followRef = useRef(null)
  const socialsRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    // Set initial visibility
    gsap.set([brandRef.current, linksRef.current, followRef.current, barRef.current], { opacity: 1 })
    gsap.set(linksRef.current.querySelectorAll('a'), { opacity: 1 })
    gsap.set(socialsRef.current.children, { opacity: 1 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 95%',
        once: true, // Only trigger once
        toggleActions: 'play none none none'
      },
      defaults: { ease: 'power3.out' }
    })

    tl.fromTo(brandRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
    .fromTo(linksRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    )
    .fromTo(linksRef.current.querySelectorAll('a'),
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.06 },
      '-=0.2'
    )
    .fromTo(followRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.4'
    )
    .fromTo(socialsRef.current.children,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.3, stagger: 0.08 },
      '-=0.2'
    )
    .fromTo(barRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      '-=0.2'
    )

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === footerRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <footer className="footer" ref={footerRef}>
      <div className="container footer__grid">
        <div className="footer__brand" ref={brandRef}>
          <img src={logo} alt="ATV Adventure" />
          <p>Ofron qira emocionuese të ATV-ve për të gjitha nivelet e aftësive.</p>
        </div>

        <nav className="footer__links" ref={linksRef}>
          <h4>Quick links</h4>
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/atv">Our Fleet</Link>
        </nav>

        <div className="footer__follow" ref={followRef}>
          <h4>Follow Us</h4>
          <div className="footer__socials" ref={socialsRef}>
            <a href="#" aria-label="Facebook" className="social social--fb">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.3V12h2.3V9.8c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.5.7-1.5 1.4V12h2.6l-.4 2.9h-2.2v7A10 10 0 0 0 22 12Z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="social social--ig">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.2c3 0 3.4 0 4.6.1 1.2.1 1.9.3 2.4.5.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.5.4 1.2.5 2.4.1 1.2.1 1.6.1 4.6s0 3.4-.1 4.6c-.1 1.2-.3 1.9-.5 2.4-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.5.2-1.2.4-2.4.5-1.2.1-1.6.1-4.6.1s-3.4 0-4.6-.1c-1.2-.1-1.9-.3-2.4-.5-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.5-.4-1.2-.5-2.4-.1-1.2-.1-1.6-.1-4.6s0-3.4.1-4.6c.1-1 .2-1.6.3-1.9.2-.5.4-.9.8-1.3.4-.4.8-.6 1.3-.8.3-.1.9-.2 1.9-.3 1.2-.1 1.6-.1 4.6-.1Zm0 1.8c-3 0-3.4 0-4.6.1-1 .1-1.6.2-1.9.3-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.1.3-.2.9-.3 1.9-.1 1.2-.1 1.6-.1 4.6s0 3.4.1 4.6c.1 1 .2 1.6.3 1.9.2.5.4.9.8 1.3.4.4.8.6 1.3.8.3.1.9.2 1.9.3 1.2.1 1.6.1 4.6.1s3.4 0 4.6-.1c1-.1 1.6-.2 1.9-.3.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.1-.3.2-.9.3-1.9.1-1.2.1-1.6.1-4.6s0-3.4-.1-4.6c-.1-1-.2-1.6-.3-1.9-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.3-.1-.9-.2-1.9-.3-1.2-.1-1.6-.1-4.6-.1Zm0 3.8a5.4 5.4 0 1 1 0 10.8 5.4 5.4 0 0 1 0-10.8Zm0 1.8a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Zm5.9-2.1a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0Z"/></svg>
            </a>
            <a href="#" aria-label="TikTok" className="social social--tt">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 8.6a6.7 6.7 0 0 1-4.3-1.6v6c0 3.7-3 6.6-6.6 6.6S3.6 16.7 3.6 13s3-6.6 6.6-6.6c.4 0 .7 0 1.1.1v3A3.8 3.8 0 0 0 9.6 9C7.8 9 6.4 10.5 6.4 12.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3V2.2h3a6.7 6.7 0 0 0 4.8 2.1v4.3Z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="footer__bar" ref={barRef}>
        <div className="container footer__bar__inner">
          <span>© {new Date().getFullYear()} Developed by Bledor Pireci. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
