import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Fleet.scss';
import seat from '../../../assets/seat.png';
import { API_BASE_URL, BACKEND_URL } from '../../../config/api';

gsap.registerPlugin(ScrollTrigger); 

function Fleet() {
    const [atvModels, setAtvModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        fetchFleetData();
    }, []);

    useEffect(() => {
        if (!loading && atvModels.length > 0) {
            cardsRef.current = cardsRef.current.slice(0, atvModels.length);
            
            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none none'
                    }
                });

                tl.to(titleRef.current, {
                    opacity: 1,
                    duration: 1,
                    ease: 'power1.out'
                })
                .to(cardsRef.current, {
                    opacity: 1,
                    duration: 1.2,
                    stagger: {
                        each: 0.1,
                        ease: 'power1.inOut'
                    },
                    ease: 'power1.out'
                }, '-=0.6');
            }, sectionRef);

            return () => ctx.revert();
        }
    }, [loading, atvModels]);

    const fetchFleetData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/atvs`);
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const result = await response.json();
            setAtvModels(result.data); 
        } catch (err) {
            console.error("Error fetching public ATV data for Fleet:", err);
            setError(`Nuk mund të ngarkohet flota e ATV-ve. Provoni më vonë.`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="fleet">
                <div className="container">
                    <h2>Flota Jonë</h2>
                    <p>Duke ngarkuar flotën...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="fleet">
                <div className="container">
                    <h2>Flota Jonë</h2>
                    <p className="error-message">{error}</p>
                </div>
            </section>
        );
    }
    
    return (
        <section className="fleet" ref={sectionRef}>
            <div className="container">
                <h2 ref={titleRef}>Flota Jonë</h2>
                <div className="fleet__grid">
                    {atvModels.map((atv, index) => ( 
                        <article 
                            className="card" 
                            key={atv._id}
                            ref={(el) => (cardsRef.current[index] = el)}
                        >
                            <h3 className="card__title">{atv.name}</h3>
                            <div className="card__image-container">
                                <img 
                                    // RREGULLIMI: Përdor URL-në e plotë
                                    src={`${BACKEND_URL}/public${atv.image}`} 
                                    alt={atv.name} 
                                    className="card__atv-image"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div className="card__price-section">
                                <div className="card__price">
                                    <span className="price-amount">{atv.price ? atv.price.toFixed(2) : 'N/A'}</span> 
                                    <span className="price-unit">€ /Ora</span>
                                </div>
                            </div>
                            <div className="card__specs">
                                <span className="spec-tag">
                                    <img src={seat} alt="seat" />
                                    {atv.seats} Seats 
                                </span>
                                <span className="spec-tag">{atv.engine}</span>
                                <span className="spec-tag">{atv.transmission}</span> 
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Fleet;