import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Contact.scss';
import { API_BASE_URL } from '../../config/api';

function Contact() {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef(null);
  const subtitleRef = useRef(null);
  const listRef = useRef(null);
  const hoursRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    fetchContactData();
  }, []);

  useEffect(() => {
    if (!loading && contactData) {
      // Set initial visibility
      gsap.set([eyebrowRef.current, titleRef.current, descriptionRef.current, subtitleRef.current, hoursRef.current], { opacity: 1 });
      gsap.set([statsRef.current.children, listRef.current.children, ctaRef.current.children], { opacity: 1 });
      
      const tl = gsap.timeline({ 
        defaults: { ease: 'power2.out' },
        delay: 0.15
      });
      
      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.3 }
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.2'
      )
      .fromTo(descriptionRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.3 },
        '-=0.2'
      )
      .fromTo(statsRef.current.children,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.08 },
        '-=0.1'
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.3 },
        '-=0.2'
      )
      .fromTo(listRef.current.children,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.06 },
        '-=0.1'
      )
      .fromTo(hoursRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.3 },
        '-=0.1'
      )
      .fromTo(ctaRef.current.children,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.08 },
        '-=0.1'
      );
    }
  }, [loading, contactData]);

  const fetchContactData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const text = await response.text();
      const result = JSON.parse(text);
      if (result.success) setContactData(result.data);
    } catch (error) {
      console.error('Error fetching contact data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="contact-modern">
        <div className="container">
          <div className="contact-modern__loading">Duke ngarkuar...</div>
        </div>
      </section>
    );
  }

  if (!contactData) return null;

  return (
    <section
      className="contact-modern"
      id="contact"
      ref={sectionRef}
    >
      <div className="container">
        <div className="contact-modern__grid">
          <div className="contact-modern__info">
            <span className="eyebrow" ref={eyebrowRef}>{contactData.subtitle}</span>
            <h1 className="contact-modern__title" ref={titleRef}>{contactData.title}</h1>
            <p className="contact-modern__description" ref={descriptionRef}>{contactData.description}</p>
            <ul className="contact-modern__stats" ref={statsRef}>
              {contactData.stats.map((stat, index) => (
                <li key={index}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-modern__details">
            <h2 className="contact-modern__subtitle" ref={subtitleRef}>Informacion Kontakti</h2>
            <ul className="contact-modern__list" ref={listRef}>
              <li>{contactData.contactInfo.address}</li>
              <li>{contactData.contactInfo.phone}</li>
              <li>{contactData.contactInfo.email}</li>
              <li>{contactData.contactInfo.social}</li>
            </ul>

            <div className="contact-modern__hours" ref={hoursRef}>
              <h3>Orët e Punës</h3>
              <p>{contactData.workingHours.weekdays}</p>
              <p>{contactData.workingHours.sunday}</p>
            </div>

            <div className="contact-modern__cta-group" ref={ctaRef}>
              <a className="contact-modern__cta primary" href={`tel:${contactData.contactInfo.phone.replace(/\s/g, '')}`}>Thirr Tani</a>
              <a className="contact-modern__cta secondary" href={`https://wa.me/${contactData.contactInfo.phone.replace(/\D/g, '')}`}>WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
