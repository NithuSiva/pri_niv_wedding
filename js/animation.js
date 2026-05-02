// animation.js - Version corrigée avec gestion du DOM ready et resize

document.addEventListener("DOMContentLoaded", () => {
    
    // ========== MODALE TEXTE ==========
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeModalBtn = document.getElementById('modal-close-btn');
    const modalInner = document.querySelector('.modal__inner');
    const modalBgImg = document.querySelector('.modal__bg-img');
    const modalTextWrap = document.querySelector('.modal__text-wrap');

    function adjustModalTextWrapHeight() {
        if (!modalBgImg || !modalTextWrap) return;
        
        // Attendre que l'image soit chargée
        if (modalBgImg.complete) {
            setTextWrapHeight();
        } else {
            modalBgImg.addEventListener('load', setTextWrapHeight);
            // Timeout de sécurité
            setTimeout(setTextWrapHeight, 500);
        }
    }

    function setTextWrapHeight() {
        const bgImgHeight = modalBgImg.getBoundingClientRect().height;
        const modalInnerHeight = modalInner ? modalInner.getBoundingClientRect().height : 480;
        
        // Utiliser la hauteur la plus petite entre l'image et la modale
        const maxHeight = Math.min(bgImgHeight, modalInnerHeight) * 0.9;
        
        modalTextWrap.style.maxHeight = maxHeight + 'px';
        modalTextWrap.style.overflowY = 'auto';
        modalTextWrap.style.padding = '20px 15px';
        
        console.log(`Modal ajustée - hauteur image: ${bgImgHeight}px, hauteur max texte: ${maxHeight}px`);
    }

    function openModal() {
        if (window.smoother) window.smoother.paused(true);
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        modalOverlay.classList.add('is-open');
        modalOverlay.setAttribute('aria-hidden', 'false');

         setTimeout(adjustModalTextWrapHeight, 50);

        if (typeof gsap !== 'undefined') {
            gsap.to(modalOverlay, {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                duration: 0.3,
                ease: 'power2.out'
            });

            gsap.timeline()
                .set(modalInner, { opacity: 1 })
                .fromTo(modalInner,
                    { y: 30, scale: 0.95 },
                    { y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
                );
        } else {
            modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            modalInner.style.opacity = '1';
            modalInner.style.transform = 'translateY(0) scale(1)';
        }
    }

    function closeModal() {
        if (typeof gsap !== 'undefined') {
            gsap.timeline({
                onComplete: () => {
                    if (window.smoother) window.smoother.paused(false);
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                    modalOverlay.classList.remove('is-open');
                    modalOverlay.setAttribute('aria-hidden', 'true');
                      // Réinitialiser le scroll
                    if (modalTextWrap) modalTextWrap.scrollTop = 0;
                }
            })
            .to(modalInner, {
                y: 20, scale: 0.95, opacity: 0,
                duration: 0.3, ease: 'power2.in'
            })
            .to(modalOverlay, {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                duration: 0.3
            }, 0);
        } else {
            modalOverlay.classList.remove('is-open');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const content = btn.closest('.tl-content');
            if (content) {
                const title = content.getAttribute('data-modal-title') || '';
                let desc = content.getAttribute('data-modal-desc') || '';
                
                if (modalTitle) modalTitle.textContent = title;
                if (modalDesc) {
                    if (desc.includes('&lt;') || desc.includes('&gt;') || desc.includes('&amp;')) {
                        const textarea = document.createElement('textarea');
                        textarea.innerHTML = desc;
                        desc = textarea.value;
                    }
                    if (desc.includes('&#10;')) {
                        desc = desc.replace(/&#10;\s*&#10;/g, '</p><p>');
                        desc = desc.replace(/&#10;/g, '<br>');
                        desc = '<p>' + desc + '</p>';
                    }
                    modalDesc.innerHTML = desc;
                }
            }
            openModal();
        });
    });

    // ========== MODALE IMAGE ==========
    const imageModalOverlay = document.getElementById('modal-image-overlay');
    const modalImage = document.getElementById('modal-image-src');
    const closeImageBtn = document.getElementById('modal-image-close-btn');
    const imageModalInner = document.querySelector('.modal__inner--image');

    function openImageModal(imageSrc) {
        if (modalImage) modalImage.src = imageSrc;
        
        if (window.smoother) window.smoother.paused(true);
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        imageModalOverlay.classList.add('is-open');
        imageModalOverlay.setAttribute('aria-hidden', 'false');

        if (typeof gsap !== 'undefined') {
            gsap.to(imageModalOverlay, {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                duration: 0.25,
                ease: 'power2.out'
            });

            gsap.timeline()
                .set(imageModalInner, { opacity: 1 })
                .fromTo(imageModalInner,
                    { y: 20, scale: 0.9 },
                    { y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.1)' }
                );
        } else {
            imageModalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        }
    }

    function closeImageModal() {
        if (typeof gsap !== 'undefined') {
            gsap.timeline({
                onComplete: () => {
                    if (window.smoother) window.smoother.paused(false);
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                    imageModalOverlay.classList.remove('is-open');
                    imageModalOverlay.setAttribute('aria-hidden', 'true');
                    if (modalImage) modalImage.src = '';
                }
            })
            .to(imageModalInner, {
                y: 15, scale: 0.9, opacity: 0,
                duration: 0.25, ease: 'power2.in'
            })
            .to(imageModalOverlay, {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                duration: 0.25
            }, 0);
        } else {
            imageModalOverlay.classList.remove('is-open');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            if (modalImage) modalImage.src = '';
        }
    }

    if (closeImageBtn) closeImageBtn.addEventListener('click', closeImageModal);
    if (imageModalOverlay) imageModalOverlay.addEventListener('click', (e) => {
        if (e.target === imageModalOverlay) closeImageModal();
    });

    document.querySelectorAll('.image-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const imageSrc = trigger.getAttribute('data-image');
            if (imageSrc) {
                openImageModal(imageSrc);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modalOverlay && modalOverlay.classList.contains('is-open')) closeModal();
            if (imageModalOverlay && imageModalOverlay.classList.contains('is-open')) closeImageModal();
        }
    });
});

// ========== TIMELINE VERTICALE - VERSION CORRIGÉE ==========

/**
 * Met à jour la position de la ligne verticale dans la timeline
 * Version robuste avec vérification des dimensions
 */
function updateVline() {
    const customTlLeft = document.querySelectorAll('.custom-tl-left');
    const vline = document.querySelector('.custom-tl-vline');
    
    console.log("updateVline called - éléments trouvés:", {
        customTlLeftLength: customTlLeft.length,
        vlineExists: !!vline
    });
    
    if (!customTlLeft.length || !vline) return;

    const container = document.querySelector('.custom-timeline-grid');
    if (!container) {
        console.warn("Container .custom-timeline-grid not found");
        return;
    }
    
    // Forcer un reflow pour s'assurer que les dimensions sont à jour
    void container.offsetHeight;
    
    const containerRect = container.getBoundingClientRect();
    
    // Vérifier que le container a des dimensions valides
    if (containerRect.height === 0) {
        console.warn("Container height is 0, retrying...");
        // Réessayer après un court délai
        setTimeout(updateVline, 100);
        return;
    }
    
    // S'assurer que les éléments .custom-tl-left sont positionnés
    let firstValidElement = null;
    let lastValidElement = null;
    
    for (let i = 0; i < customTlLeft.length; i++) {
        const rect = customTlLeft[i].getBoundingClientRect();
        if (rect.height > 0 || rect.top > 0) {
            if (!firstValidElement) firstValidElement = customTlLeft[i];
            lastValidElement = customTlLeft[i];
        }
    }
    
    if (!firstValidElement || !lastValidElement) {
        console.warn("No valid elements found with proper dimensions");
        return;
    }
    
    const firstRect = firstValidElement.getBoundingClientRect();
    const lastRect = lastValidElement.getBoundingClientRect();
    
    console.log("Dimensions calculées:", {
        containerTop: containerRect.top,
        containerBottom: containerRect.bottom,
        containerHeight: containerRect.height,
        firstTop: firstRect.top,
        lastBottom: lastRect.bottom,
        firstHeight: firstRect.height,
        lastHeight: lastRect.height
    });
    
    // Ajuster les offsets en fonction des hauteurs réelles
    const topOffset = firstRect.height / 2;
    const bottomOffset = lastRect.height / 2;
    
    const topPosition = firstRect.top - containerRect.top + topOffset;
    const bottomPosition = containerRect.bottom - lastRect.bottom + bottomOffset;
    
    console.log("Positions calculées:", { topPosition, bottomPosition });
    
    if (topPosition > 0 && bottomPosition > 0) {
        vline.style.top = topPosition + 'px';
        vline.style.bottom = bottomPosition + 'px';
    } else {
        console.warn("Positions invalides, utilisation des valeurs par défaut");
        vline.style.top = '25px';
        vline.style.bottom = '25px';
    }
}

/**
 * Initialise la timeline avec plusieurs tentatives
 * @param {number} attempt - Numéro de tentative
 */
function initTimelineVline(attempt = 0) {
    const maxAttempts = 5;
    const delay = 200;
    
    console.log(`initTimelineVline - Tentative ${attempt + 1}/${maxAttempts}`);
    
    // Vérifier si les éléments existent
    const customTlLeft = document.querySelectorAll('.custom-tl-left');
    const vline = document.querySelector('.custom-tl-vline');
    const container = document.querySelector('.custom-timeline-grid');
    
    if (customTlLeft.length && vline && container) {
        // Vérifier si les dimensions sont valides
        const containerRect = container.getBoundingClientRect();
        const firstRect = customTlLeft[0].getBoundingClientRect();
        
        if (containerRect.height > 0 && firstRect.height > 0) {
            console.log("Timeline prête, mise à jour de la ligne");
            updateVline();
            return;
        }
    }
    
    if (attempt < maxAttempts) {
        setTimeout(() => initTimelineVline(attempt + 1), delay);
    } else {
        console.warn("Timeline non initialisée après plusieurs tentatives");
        // Définir des valeurs par défaut
        if (vline) {
            vline.style.top = '25px';
            vline.style.bottom = '25px';
        }
    }
}

// Observer les changements de taille de la fenêtre avec debounce
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateVline();
    }, 150);
}

// Utiliser MutationObserver pour détecter quand le contenu est chargé
function observeTimelineChanges() {
    const container = document.querySelector('.custom-timeline-grid');
    if (!container) return;
    
    const observer = new MutationObserver(() => {
        updateVline();
    });
    
    observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });
    
    return observer;
}

// Initialisation principale
function initAnimations() {
    console.log('Animations initialisées');
    
    // Initialiser AOS si disponible
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });
    }
    
    // Initialiser la timeline avec plusieurs stratégies
    initTimelineVline();
    
    // Observer les changements
    const observer = observeTimelineChanges();
    
    // Écouter les événements de chargement des images
    const images = document.querySelectorAll('.custom-tl-img');
    let loadedImagesCount = 0;
    
    function onImageLoad() {
        loadedImagesCount++;
        if (loadedImagesCount === images.length) {
            updateVline();
        }
    }
    
    images.forEach(img => {
        if (img.complete) {
            onImageLoad();
        } else {
            img.addEventListener('load', onImageLoad);
            img.addEventListener('error', onImageLoad);
        }
    });
    
    // Nettoyer l'observateur après un délai (optionnel)
    setTimeout(() => {
        if (observer) observer.disconnect();
    }, 5000);
}

// Événements avec gestion de l'état du DOM
window.addEventListener('load', () => {
    // Attendre que tout soit chargé
    setTimeout(() => {
        updateVline();
    }, 100);
});

window.addEventListener('resize', handleResize);

// Écouter également les changements d'orientation
window.addEventListener('orientationchange', () => {
    setTimeout(updateVline, 100);
});

// Exporter les fonctions globales
window.updateVline = updateVline;
window.initAnimations = initAnimations;

// Fonction pour ouvrir la modale image (globale)
window.openImageModal = function(imageSrc) {
    const modalImage = document.getElementById('modal-image-src');
    if (modalImage) {
        modalImage.src = imageSrc;
        // Déclencher l'ouverture de la modale
        const event = new CustomEvent('openImageModal');
        document.dispatchEvent(event);
    }
};