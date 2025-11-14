import React, { useState, useEffect } from 'react';
import './AboutPageAdmin.scss';

function ContactPageAdmin() {
  const [contactData, setContactData] = useState({
    title: "",
    subtitle: "",
    description: "",
    stats: [
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" }
    ],
    contactInfo: {
      address: "",
      phone: "",
      email: "",
      social: ""
    },
    workingHours: {
      weekdays: "",
      sunday: ""
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch contact data on component mount
  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contact');
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      console.log('Response text:', text);
      
      const result = JSON.parse(text);
      
      if (result.success) {
        setContactData(result.data);
      } else {
        setMessage({ type: 'error', text: result.message || 'Gabim në ngarkimin e të dhënave' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Gabim në ngarkimin e të dhënave: ' + error.message });
      console.error('Error fetching contact data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStatsChange = (index, key, value) => {
    setContactData(prev => {
      const newStats = [...prev.stats];
      newStats[index] = { ...newStats[index], [key]: value };
      return { ...prev, stats: newStats };
    });
  };

  const handleContactInfoChange = (field, value) => {
    setContactData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const handleWorkingHoursChange = (field, value) => {
    setContactData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Ndryshimet u ruajtën me sukses!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Gabim në ruajtjen e të dhënave' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Gabim në ruajtjen e të dhënave' });
      console.error('Error saving contact data:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-contact-page">
        <div className="admin-loading">Duke ngarkuar...</div>
      </div>
    );
  }

  return (
    <div className="about-admin-page">
      {/* Success/Error Message */}
      {message.text && (
        <div className={`alert alert--${message.type}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {message.type === 'success' ? (
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            ) : (
              <circle cx="12" cy="12" r="10"></circle>
            )}
            {message.type === 'success' ? (
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            ) : (
              <>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </>
            )}
          </svg>
          <span>{message.text}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header">
        <div className="page-header__info">
          <h2 className="page-title">Rreth Nesh</h2>
          <p className="page-subtitle">Menaxho informacionet e faqes së kontaktit</p>
        </div>
      </div>

      <div className="content-sections">
        {/* Main Information */}
        <div className="section-card">
          <div className="section-header">
            <div className="section-icon section-icon--blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h3 className="section-title">Informacionet Kryesore</h3>
          </div>
          <div className="section-content">
            <div className="form-field">
              <label className="form-label">Titulli</label>
              <input
                type="text"
                className="form-input"
                value={contactData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Titulli kryesor i faqes"
              />
            </div>
            <div className="form-field">
              <label className="form-label">Nëntitulli</label>
              <input
                type="text"
                className="form-input"
                value={contactData.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                placeholder="Nëntitulli"
              />
            </div>
            <div className="form-field">
              <label className="form-label">Përshkrimi</label>
              <textarea
                className="form-textarea"
                rows="4"
                value={contactData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Përshkrimi i kompanisë"
              />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="section-card">
          <div className="section-header">
            <div className="section-icon section-icon--purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
              </svg>
            </div>
            <h3 className="section-title">Statistikat</h3>
          </div>
          <div className="section-content">
            <div className="stats-grid">
              {contactData.stats.map((stat, index) => (
                <div key={index} className="stat-field">
                  <div className="stat-number">{index + 1}</div>
                  <div className="stat-inputs">
                    <input
                      type="text"
                      className="form-input"
                      value={stat.value}
                      onChange={(e) => handleStatsChange(index, 'value', e.target.value)}
                      placeholder="Vlera (p.sh. 500+)"
                    />
                    <input
                      type="text"
                      className="form-input"
                      value={stat.label}
                      onChange={(e) => handleStatsChange(index, 'label', e.target.value)}
                      placeholder="Etiketa (p.sh. Klientë)"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="section-card">
          <div className="section-header">
            <div className="section-icon section-icon--green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3 className="section-title">Informacionet e Kontaktit</h3>
          </div>
          <div className="section-content">
            <div className="contact-grid">
              <div className="form-field">
                <label className="form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Adresa
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={contactData.contactInfo.address}
                  onChange={(e) => handleContactInfoChange('address', e.target.value)}
                  placeholder="Adresa e kompanisë"
                />
              </div>
              <div className="form-field">
                <label className="form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Numri i Telefonit
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={contactData.contactInfo.phone}
                  onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                  placeholder="+383 XX XXX XXX"
                />
              </div>
              <div className="form-field">
                <label className="form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  Email
                </label>
                <input
                  type="email"
                  className="form-input"
                  value={contactData.contactInfo.email}
                  onChange={(e) => handleContactInfoChange('email', e.target.value)}
                  placeholder="info@company.com"
                />
              </div>
              <div className="form-field">
                <label className="form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  Rrjetet Sociale
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={contactData.contactInfo.social}
                  onChange={(e) => handleContactInfoChange('social', e.target.value)}
                  placeholder="Link i rrjetit social"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="section-card">
          <div className="section-header">
            <div className="section-icon section-icon--orange">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3 className="section-title">Orët e Punës</h3>
          </div>
          <div className="section-content">
            <div className="hours-grid">
              <div className="form-field">
                <label className="form-label">Ditët e Javës (E Hënë - E Shtunë)</label>
                <input
                  type="text"
                  className="form-input"
                  value={contactData.workingHours.weekdays}
                  onChange={(e) => handleWorkingHoursChange('weekdays', e.target.value)}
                  placeholder="p.sh. 09:00 - 18:00"
                />
              </div>
              <div className="form-field">
                <label className="form-label">E Diela</label>
                <input
                  type="text"
                  className="form-input"
                  value={contactData.workingHours.sunday}
                  onChange={(e) => handleWorkingHoursChange('sunday', e.target.value)}
                  placeholder="p.sh. Mbyllur"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button - Sticky on Mobile */}
      <div className="save-section">
        <button 
          className={`btn-save ${saving ? 'btn-save--loading' : ''}`}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <>
              <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
              </svg>
              Duke ruajtur...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Ruaj Ndryshimet
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ContactPageAdmin;