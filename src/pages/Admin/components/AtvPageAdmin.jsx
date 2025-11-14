import React, { useState, useEffect } from 'react';
import './AtvPageAdmin.scss'; 
// NDRYSHIM: Shto URL-në bazë të backend-it
const API_BASE_URL = 'http://localhost:5000/api'; 
const BACKEND_URL = 'http://localhost:5000'; // URL-ja e serverit Node/Express

const NEW_ATV_TEMPLATE = {
    name: 'New ATV Model',
    image: '', 
    engine: 'CC',
    seats: 1,
    price: 0.00,
    transmission: 'Automatic',
    driveType: '4WD',
    available: true,
    features: ['4WD', 'Digital Display'],
};

function ATVPageAdmin() {
    const [atvs, setAtvs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedAtv, setSelectedAtv] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false); 
    const [newFeature, setNewFeature] = useState('');
    const [newImageFile, setNewImageFile] = useState(null);
    
    // Toast notifications
    const [toasts, setToasts] = useState([]);
    const [deleteModal, setDeleteModal] = useState({ show: false, atvId: null, atvName: '' });
    
    const showToast = (type, title, message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, type, title, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    };
    
    const closeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    useEffect(() => {
        fetchAtvs();
    }, []);

    const fetchAtvs = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/atvs`); 
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server responded with error status:", response.status, errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json(); 
            
            setAtvs(result.data); 
        } catch (err) {
            console.error("Error fetching ATVs:", err);
            setError(`Nuk mund të ngarkohet lista e ATV-ve. (Gabim: ${err.message})`);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Helper function to send the entire updated list to the backend.
     * @param {Array} updatedList - The full array of ATVs to save.
     */
    const saveAtvsToBackend = async (updatedList) => {
        try {
            const saveResponse = await fetch(`${API_BASE_URL}/atvs`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ atvModels: updatedList }),
            });

            if (!saveResponse.ok) {
                const saveErrorResult = await saveResponse.json();
                throw new Error(saveErrorResult.message || `Dështoi ruajtja e të dhënave: Status ${saveResponse.status}`);
            }
            
            const saveResult = await saveResponse.json();
            setAtvs(saveResult.data);
            showToast('success', 'Sukses', 'Ndryshimet u ruajtën me sukses!');
            return true; 

        } catch (saveError) {
            showToast('error', 'Gabim', `Gabim gjatë ruajtjes së të dhënave: ${saveError.message}`);
            console.error(saveError);
            return false; 
        }
    }

    const handleAddAtv = () => {
        const tempId = `temp-${Date.now()}`;
        
        const newAtv = { ...NEW_ATV_TEMPLATE, _id: tempId };
        
        setSelectedAtv(newAtv);
        setIsAdding(true);
        setIsEditing(true);
    };

    const handleDeleteAtv = (atvToDelete) => {
        setDeleteModal({
            show: true,
            atvId: atvToDelete._id,
            atvName: atvToDelete.name
        });
    };
    
    const confirmDelete = async () => {
        const atvToDeleteId = deleteModal.atvId;
        setDeleteModal({ show: false, atvId: null, atvName: '' });
        
        const newAtvList = atvs.filter(atv => atv._id !== atvToDeleteId);
        const success = await saveAtvsToBackend(newAtvList);

        if (success) {
             setAtvs(newAtvList);
             showToast('success', 'U fshi', 'ATV u fshi me sukses!');
        }
    };

    const handleUpdateAtv = async () => {
        if (!selectedAtv) return;

        let imagePathToSave = selectedAtv.image;
        if (newImageFile) {
            console.log('Uploading new image...');
            const formData = new FormData();
            formData.append('atvImage', newImageFile); 

            try {
                const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
                    method: 'POST',
                    body: formData, 
                });

                if (!uploadResponse.ok) {
                    const uploadErrorResult = await uploadResponse.json();
                    throw new Error(uploadErrorResult.message || "Upload dështoi pa mesazh specifik.");
                }

                const uploadResult = await uploadResponse.json();
                // RUHET PATH-i RELATIV I KTHYER NGA BACKEND-i: p.sh. /atv_images/atvImage-176...png
                imagePathToSave = uploadResult.filePath; 

            } catch (uploadError) {
                showToast('error', 'Gabim', `Gabim gjatë ngarkimit të fotos: ${uploadError.message}`);
                console.error(uploadError);
                return; 
            }
        }
        
        const finalAtv = { ...selectedAtv, image: imagePathToSave };

        let updatedAtvs;

        if (isAdding) {
            delete finalAtv._id; 
            updatedAtvs = [...atvs, finalAtv]; 
        } else {
            updatedAtvs = atvs.map(atv => 
                atv._id === selectedAtv._id ? finalAtv : atv
            );
        }

        const success = await saveAtvsToBackend(updatedAtvs);

        if (success) {
            setIsEditing(false);
            setIsAdding(false);
            setSelectedAtv(null);
            setNewImageFile(null);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setIsAdding(false);
        setSelectedAtv(null);
        setNewImageFile(null);
    }
    
    const handleImageChange = (e) => {
        setNewImageFile(e.target.files[0]);
    };
    
    const handleEditAtv = (atv) => {
        setSelectedAtv({ ...atv });
        setNewImageFile(null);
        setIsEditing(true);
        setIsAdding(false);
    };

    const handleAddFeature = () => {
        if (newFeature.trim()) {
          setSelectedAtv({
            ...selectedAtv,
            features: [...selectedAtv.features, newFeature.trim()]
          });
          setNewFeature('');
        }
    };

    const handleRemoveFeature = (indexToRemove) => {
        setSelectedAtv({
          ...selectedAtv,
          features: selectedAtv.features.filter((_, index) => index !== indexToRemove)
        });
    };

    if (loading) return <div className="atv-admin-page">Duke ngarkuar...</div>;
    if (error) return <div className="atv-admin-page error">{error}</div>;

    return (
        <div className="atv-admin-page">
            {/* Toast Notifications */}
            {toasts.length > 0 && (
                <div className="toast-container">
                    {toasts.map(toast => (
                        <div key={toast.id} className={`toast toast--${toast.type}`}>
                            <div className="toast-icon">
                                {toast.type === 'success' && (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                )}
                                {toast.type === 'error' && (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="15" y1="9" x2="9" y2="15"></line>
                                        <line x1="9" y1="9" x2="15" y2="15"></line>
                                    </svg>
                                )}
                            </div>
                            <div className="toast-content">
                                <div className="toast-title">{toast.title}</div>
                                <div className="toast-message">{toast.message}</div>
                            </div>
                            <button className="toast-close" onClick={() => closeToast(toast.id)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
                <div className="modal-overlay" onClick={() => setDeleteModal({ show: false, atvId: null, atvName: '' })}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-icon modal-icon--danger">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </div>
                            <h3 className="modal-title">Fshi ATV</h3>
                            <p className="modal-description">
                                Jeni të sigurt që dëshironi të fshini <strong>{deleteModal.atvName}</strong>? Ky veprim nuk mund të zhbëhet.
                            </p>
                        </div>
                        <div className="modal-actions">
                            <button 
                                className="modal-btn modal-btn--secondary" 
                                onClick={() => setDeleteModal({ show: false, atvId: null, atvName: '' })}
                            >
                                Anulo
                            </button>
                            <button className="modal-btn modal-btn--danger" onClick={confirmDelete}>
                                Po, Fshi
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {!isEditing && !isAdding ? (
                /* ATV LIST VIEW */
                <div className="atv-list-container">
                    <div className="list-header">
                        <div className="list-header__info">
                            <h2 className="list-title">ATV Modelet</h2>
                            <p className="list-subtitle">{atvs.length} modele në total</p>
                        </div>
                        <button 
                            className="btn btn--primary btn--icon" 
                            onClick={handleAddAtv}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            <span>Shto ATV</span>
                        </button>
                    </div>

                    <div className="atv-grid">
                        {atvs.map(atv => (
                            <div key={atv._id} className="atv-card">
                                {atv.image && (
                                    <div className="atv-card__image">
                                        <img 
                                            src={`${BACKEND_URL}/public${atv.image}`}
                                            alt={atv.name}
                                        />
                                        <div className={`atv-card__badge ${atv.available ? 'badge--success' : 'badge--danger'}`}>
                                            {atv.available ? 'Në Dispozicion' : 'Jo në Dispozicion'}
                                        </div>
                                    </div>
                                )}
                                <div className="atv-card__content">
                                    <h3 className="atv-card__title">{atv.name}</h3>
                                    <div className="atv-card__specs">
                                        <div className="spec">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="M12 6v6l4 2"></path>
                                            </svg>
                                            <span>{atv.engine}</span>
                                        </div>
                                        <div className="spec">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="9" cy="7" r="4"></circle>
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                            </svg>
                                            <span>{atv.seats} ulëse</span>
                                        </div>
                                        <div className="spec">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                            </svg>
                                            <span>€{atv.price?.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="atv-card__actions">
                                    <button 
                                        className="btn btn--sm btn--secondary"
                                        onClick={() => handleEditAtv(atv)}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                        Ndrysho
                                    </button>
                                    <button 
                                        className="btn btn--sm btn--danger"
                                        onClick={() => handleDeleteAtv(atv)}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                        Fshi
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                /* EDIT/ADD FORM */
                <div className="atv-form-container">
                    <div className="form-header">
                        <button className="btn-back" onClick={handleCancel}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Kthehu
                        </button>
                        <h2 className="form-title">
                            {isAdding ? "Shto ATV të Ri" : `Ndrysho: ${selectedAtv.name}`}
                        </h2>
                    </div>

                    <div className="form-content">
                        {/* Image Preview */}
                        <div className="image-upload-section">
                            <div className="image-preview">
                                {(selectedAtv.image || newImageFile) ? (
                                    <img 
                                        src={newImageFile 
                                            ? URL.createObjectURL(newImageFile) 
                                            : `${BACKEND_URL}/public${selectedAtv.image}`
                                        }
                                        alt={selectedAtv.name}
                                        className="preview-image"
                                    />
                                ) : (
                                    <div className="preview-placeholder">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                            <polyline points="21 15 16 10 5 21"></polyline>
                                        </svg>
                                        <p>Nuk ka foto</p>
                                    </div>
                                )}
                            </div>
                            <div className="image-upload-control">
                                <label className="file-upload-btn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="17 8 12 3 7 8"></polyline>
                                        <line x1="12" y1="3" x2="12" y2="15"></line>
                                    </svg>
                                    {newImageFile ? 'Ndrysho foton' : 'Ngarko foto'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        hidden
                                    />
                                </label>
                                {newImageFile && (
                                    <p className="file-name">{newImageFile.name}</p>
                                )}
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="form-grid">
                            <div className="form-field">
                                <label className="form-label">Emri i Modelit</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={selectedAtv.name || ''}
                                    onChange={e => setSelectedAtv({...selectedAtv, name: e.target.value})}
                                    placeholder="p.sh. Yamaha Grizzly 700"
                                />
                            </div>

                            <div className="form-field">
                                <label className="form-label">Motori</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={selectedAtv.engine || ''}
                                    onChange={e => setSelectedAtv({...selectedAtv, engine: e.target.value})}
                                    placeholder="p.sh. 1000CC"
                                />
                            </div>

                            <div className="form-field">
                                <label className="form-label">Ulëset</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={selectedAtv.seats || 0}
                                    onChange={e => setSelectedAtv({...selectedAtv, seats: parseInt(e.target.value)})}
                                    min="1"
                                />
                            </div>

                            <div className="form-field">
                                <label className="form-label">Çmimi (€)</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={selectedAtv.price || 0}
                                    onChange={e => setSelectedAtv({...selectedAtv, price: parseFloat(e.target.value)})}
                                    step="0.01"
                                    min="0"
                                />
                            </div>

                            <div className="form-field">
                                <label className="form-label">Transmisioni</label>
                                <select
                                    className="form-select"
                                    value={selectedAtv.transmission || 'Automatic'}
                                    onChange={e => setSelectedAtv({...selectedAtv, transmission: e.target.value})}
                                >
                                    <option value="Automatic">Automatic</option>
                                    <option value="Manual">Manual</option>
                                    <option value="CVT">CVT</option>
                                </select>
                            </div>

                            <div className="form-field">
                                <label className="form-label">Lloji i Tërheqjes</label>
                                <select
                                    className="form-select"
                                    value={selectedAtv.driveType || '4WD'}
                                    onChange={e => setSelectedAtv({...selectedAtv, driveType: e.target.value})}
                                >
                                    <option value="4WD">4WD</option>
                                    <option value="2WD">2WD</option>
                                    <option value="AWD">AWD</option>
                                </select>
                            </div>

                            <div className="form-field form-field--full">
                                <label className="form-label">Disponueshmëria</label>
                                <select
                                    className="form-select"
                                    value={selectedAtv.available}
                                    onChange={e => setSelectedAtv({...selectedAtv, available: e.target.value === 'true'})}
                                >
                                    <option value="true">Në Dispozicion</option>
                                    <option value="false">Jo në Dispozicion</option>
                                </select>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="features-section">
                            <h3 className="section-title">Karakteristikat</h3>
                            <div className="features-grid">
                                {selectedAtv.features?.map((feature, index) => (
                                    <div key={index} className="feature-chip">
                                        <span>{feature}</span>
                                        <button 
                                            className="feature-remove"
                                            onClick={() => handleRemoveFeature(index)}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="feature-add">
                                <input
                                    type="text"
                                    className="form-input"
                                    value={newFeature}
                                    onChange={e => setNewFeature(e.target.value)}
                                    placeholder="Shto karakteristikë të re"
                                    onKeyPress={e => e.key === 'Enter' && handleAddFeature()}
                                />
                                <button 
                                    className="btn btn--secondary"
                                    onClick={handleAddFeature}
                                >
                                    Shto
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="form-actions">
                            <button 
                                className="btn btn--primary btn--lg"
                                onClick={handleUpdateAtv}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                {isAdding ? "Shto ATV" : "Ruaj Ndryshimet"}
                            </button>
                            <button 
                                className="btn btn--outline btn--lg"
                                onClick={handleCancel}
                            >
                                Anulo
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ATVPageAdmin;