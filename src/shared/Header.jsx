import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import logo from '../assets/Logo.png'
import './Header.scss'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const headerRef = useRef(null)
  const logoRef = useRef(null)
  const burgerRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Set initial visibility to prevent flash
    gsap.set([logoRef.current, burgerRef.current], { opacity: 1 })
    gsap.set(navRef.current.children, { opacity: 1 })
    
    // Initial load animations - only runs once
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.fromTo(headerRef.current,
      { y: -100 },
      { y: 0, duration: 0.5 }
    )
    .fromTo(logoRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4 },
      '-=0.3'
    )
    .fromTo(burgerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.3 },
      '-=0.2'
    )
    .fromTo(navRef.current.children,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 },
      '-=0.2'
    )
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`} ref={headerRef}>
      <div className="container header__inner">
        <Link to="/" className="header__brand" aria-label="ATV Adventure" ref={logoRef}>
          <img src={logo} alt="ATV Adventure" className="header__logo" />
        </Link>

        {/* Mobile burger menu */}
        <button 
          className={`header__burger${mobileMenuOpen ? ' active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          ref={burgerRef}
        >
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
        </button>

        {/* Navigation */}
        <nav className={`header__nav${mobileMenuOpen ? ' active' : ''}`} ref={navRef}>
          <NavLink to="/" end onClick={closeMobileMenu}>Ballina</NavLink>
          <NavLink to="/atv" onClick={closeMobileMenu}>ATV-të</NavLink>
          <NavLink to="/contact" onClick={closeMobileMenu}>Rreth nesh</NavLink>
        </nav>

        {/* Overlay */}
        <div 
          className={`header__overlay${mobileMenuOpen ? ' active' : ''}`}
          onClick={closeMobileMenu}
        ></div>
      </div>
    </header>
  )
}

export default Header
