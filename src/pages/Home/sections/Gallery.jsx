import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Gallery.scss';

// Importimi i imazheve
import one from '../../../assets/1.jpeg';
import two from '../../../assets/2.jpeg';
import three from '../../../assets/3.jpeg';
import four from '../../../assets/4.jpeg';
import five from '../../../assets/5.jpeg';
import six from '../../../assets/6.jpeg';

gsap.registerPlugin(ScrollTrigger);

function Gallery() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imagesRef = useRef([]);
  
  const images = [
    { src: one, alt: 'ATV aventure 1' },
    { src: two, alt: 'ATV aventure 2' },
    { src: three, alt: 'ATV aventure 3' },
    { src: four, alt: 'ATV aventure 4' },
    { src: five, alt: 'ATV aventure 5' },
    { src: six, alt: 'ATV aventure 6' }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none'
      },
      defaults: { ease: 'power3.out' }
    });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo(imagesRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.5,
        stagger: 0.1
      },
      '-=0.3'
    );
  }, []);

  return (
    <section className="gallery" ref={sectionRef}>
      <div className="container">
        <h2 ref={titleRef}>Galeria Jonë</h2>
        <div className="gallery__grid">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="thumb"
              ref={(el) => (imagesRef.current[index] = el)}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;