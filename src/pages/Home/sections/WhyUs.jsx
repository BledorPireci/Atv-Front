import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import whyUs from '../../../assets/whyUs.jpg'
import './WhyUs.scss'

gsap.registerPlugin(ScrollTrigger)

function WhyUs() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const paragraphRef = useRef(null)
  const listRef = useRef(null)
  const badgesRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      defaults: { ease: 'power3.out' }
    })

    tl.fromTo(imageRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8 }
    )
    .fromTo(eyebrowRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.5'
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    )
    .fromTo(paragraphRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    )
    .fromTo(listRef.current.children,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
      '-=0.2'
    )
    .fromTo(badgesRef.current.children,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08 },
      '-=0.2'
    )
  }, [])

  return (
    <section className="why-us" ref={sectionRef}>
      <div className="container">
        <div className="why-us__grid">
          {/* Media */}
          <div className="why-us__media" ref={imageRef}>
            <img src={whyUs} alt="ATV adventure in nature" />
          </div>

          {/* Content */}
          <div className="why-us__content">
            <span className="eyebrow" ref={eyebrowRef}>Pse ne?</span>
            <h2 ref={titleRef}>Pse të na zgjedhesh për aventurë?</h2>
            <p ref={paragraphRef}>
              Ne ofrojmë shërbimin më të sigurt dhe më argëtues për qiranë e ATV-ve.
              Ekipi ynë është gati t'ju udhëheqë në çdo hap me mjete të mirëmbajtura dhe çmime të
              përballueshme.
            </p>

            {/* List */}
            <ul className="why-us__list" ref={listRef}>
              <li>
                <span className="icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path
                      d="M8 12.5l2.5 2.5L16 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Çmime të arsyeshme
              </li>
              <li>
                <span className="icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path
                      d="M8 12.5l2.5 2.5L16 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Siguri dhe guida profesionale
              </li>
              <li>
                <span className="icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path
                      d="M8 12.5l2.5 2.5L16 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Aventurë për të gjithë
              </li>
            </ul>

            {/* Badges */}
            <div className="why-us__badges" ref={badgesRef}>
              <span className="badge">Mjete të reja</span>
              <span className="badge">Shërbim i shpejtë</span>
              <span className="badge">Mbështetje 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUs
