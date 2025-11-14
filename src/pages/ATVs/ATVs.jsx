import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ATVs.scss'; 
import atvDetailsBackground from '../../assets/atvDetailsBackground.svg';
import atvBackground from '../../assets/atvBackground.svg';
import seat from '../../assets/seat.png';
import { API_BASE_URL, BACKEND_URL } from '../../config/api'; 

function ATVs() {
    const [atvModels, setAtvModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const pageRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        fetchAtvData();
    }, []);

    useEffect(() => {
        if (!loading && atvModels.length > 0) {
            cardsRef.current = cardsRef.current.slice(0, atvModels.length);
            
            const ctx = gsap.context(() => {
                const tl = gsap.timeline({ 
                    defaults: { ease: 'power1.out' },
                    delay: 0.2 
                });
                
                tl.to(titleRef.current, {
                    opacity: 1,
                    duration: 0.8
                })
                .to(descriptionRef.current, {
                    opacity: 1,
                    duration: 0.8
                }, '-=0.5')
                .to(cardsRef.current, {
                    opacity: 1,
                    duration: 1,
                    stagger: {
                        each: 0.12,
                        ease: 'power1.inOut'
                    }
                }, '-=0.5');
            }, pageRef);

            return () => ctx.revert();
        }
    }, [loading, atvModels]);

    const fetchAtvData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/atvs`);
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            const result = await response.json();
            
            if (result.data && result.data.length > 0) {
                result.data.slice(0, 3).forEach(atv => {
                    const img = new Image();
                    img.src = `${BACKEND_URL}/public${atv.image}`;
                });
            }
            
            setAtvModels(result.data); 
        } catch (err) {
            console.error("Error fetching public ATV data:", err);
            setError(`Nuk mund të ngarkohet lista e ATV-ve. Ju lutemi provoni më vonë.`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="page atvs-page">
                <div className="container">
                    <h1>ATV-të</h1>
                    <p>Duke ngarkuar modelet...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="page atvs-page">
                <div className="container">
                    <h1>ATV-të</h1>
                    <p className="error-message">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="page atvs-page" ref={pageRef}>
            <div className="container">
                <h1 ref={titleRef}>ATV-të</h1>
                <p ref={descriptionRef}>Zgjidhni ATV-n tuaj për një përvojë të paharrueshme në natyrë.</p>
                
                <div className="atvs-grid">
                    {atvModels.map((atv, index) => (
                        <div 
                            className="atv-detail-card" 
                            key={atv._id}
                            ref={(el) => (cardsRef.current[index] = el)}
                            style={{ 
                                '--desktop-bg': `url(${atvDetailsBackground})`,
                                '--mobile-bg': `url(${atvBackground})`
                            }}
                        >
                            <span className="earlyBirdBadge">{atv.name}</span>
                            
                            <div className="atv-detail-content">
                                <div className="atv-detail-left">
                                    <img 
                                        src={`${BACKEND_URL}/public${atv.image}`} 
                                        alt={atv.name} 
                                        className="atv-detail-image"
                                        loading="eager"
                                        decoding="async"
                                    />
                                </div>

                                <div className="atv-detail-right">
                                    <div className="price-info">
                                        <div className="price-main">
                                            <span className="amount">{atv.price}</span>
                                            <div className="price-period">
                                                <span className="currency">€</span>
                                                <span className="period">/Hour</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="specs-grid">
                                        <div className="spec-item">
                                            <span className="spec-label">SEATS</span>
                                            <span className="spec-value">{atv.seats}</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">ENGINE</span>
                                            <span className="spec-value">{atv.engine}</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">TRANSMISSION</span>
                                            <span className="spec-value">{atv.transmission}</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">DRIVE TYPE</span>
                                            <span className="spec-value">{atv.driveType}</span>
                                        </div>
                                        <div className="spec-item features-container">
                                            <span className="spec-label">FEATURES</span>
                                            <div className="features-list">
                                                {atv.features.map((feature, index) => (
                                                    <span key={index} className="feature-item">
                                                        {feature}
                                                        {index < atv.features.length - 1 && <span className="feature-separator">•</span>}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">STATUS</span>
                                            <span className={`spec-value ${atv.available ? 'available' : 'not-available'}`}>
                                                {atv.available ? 'AVAILABLE' : 'NOT AVAILABLE'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ATVs;