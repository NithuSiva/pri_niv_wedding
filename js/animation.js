
// --- Loader ---
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loader__bar');
 
const images = Array.from(document.images);
const videos = Array.from(document.querySelectorAll('video'));
const total = images.length + videos.length;
let loaded = 0;
 
function onAssetLoaded() {
    loaded++;
    const progress = total > 0 ? (loaded / total) * 100 : 100;
    if (loaderBar) loaderBar.style.width = progress + '%';
    if (loaded >= total) hideLoader();
}
 
function hideLoader() {
    setTimeout(() => {
        if (loader) loader.classList.add('hidden');
        document.body.style.overflow = '';
    }, 400);
}
 
if (total === 0) {
    hideLoader();
} else {
    document.body.style.overflow = 'hidden';
    images.forEach(img => {
        if (img.complete) onAssetLoaded();
        else {
            img.addEventListener('load', onAssetLoaded);
            img.addEventListener('error', onAssetLoaded);
        }
    });
    videos.forEach(video => {
        if (video.readyState >= 3) onAssetLoaded();
        else {
            video.addEventListener('canplay', onAssetLoaded, { once: true });
            video.addEventListener('error', onAssetLoaded, { once: true });
        }
    });
}

// TIME LINE ANIMATION 



// MODAL

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
    ignoreMobileResize: true   // ← clé : ignore les resize dus à la barre d'adresse Android
});



function updateVline() {
    const tl_left = document.querySelectorAll('.custom-tl-left');
    const vline = document.querySelector('.custom-tl-vline');
    if (!tl_left.length && !vline ) return;

    const tl_left_first = tl_left[0].getBoundingClientRect();
    const tl_left_last = tl_left[tl_left.length - 1].getBoundingClientRect();
    console.log("tl_left_first :", tl_left_first.height / 2 )
    const top =  tl_left_first.height / 2;
    const bottom = tl_left_last.height / 2;

    vline.style.top = top + 'px';
    vline.style.bottom = bottom + 'px';
}


window.addEventListener('load', updateVline);
window.addEventListener('resize', updateVline);

document.addEventListener("DOMContentLoaded", () => {

    
    
      // ========== MODALE TEXTE (existante) ==========
    const overlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.getElementById('close-modal');

    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const content = btn.closest('.tl-content');
            modalTitle.textContent = content.dataset.modalTitle || '';
            modalDesc.textContent = content.dataset.modalDesc || '';

            // Décoder le HTML si nécessaire
            let desc = content.dataset.modalDesc || '';
            // 1. D'abord, décoder TOUJOURS le HTML s'il y a des entités
            if (desc.includes('&lt;') || desc.includes('&gt;') || desc.includes('&amp;')) {
                const textarea = document.createElement('textarea');
                textarea.innerHTML = desc;
                desc = textarea.value;
            }

            // 2. Ensuite, gérer les &#10; qui restent
            if (desc.includes('&#10;')) {
                desc = desc.replace(/&#10;\s*&#10;/g, '</p><p>');
                desc = desc.replace(/&#10;/g, '<br>');
                desc = '<p>' + desc + '</p>';
            }
            // Utiliser innerHTML pour interpréter les balises
            modalDesc.innerHTML = desc;


            openModal();
        });
    });

    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // ========== MODALE IMAGE (nouvelle) ==========
    const imageOverlay = document.getElementById('image-modal-overlay');
    const modalImage = document.getElementById('modal-image');
    const closeImageBtn = document.getElementById('close-image-modal');

    // Fonction globale pour ouvrir une image
    window.openImage = function(imageSrc) {
        modalImage.src = imageSrc;
        openImageModal();
    };

    closeImageBtn.addEventListener('click', closeImageModal);

    imageOverlay.addEventListener('click', (e) => {
        if (e.target === imageOverlay) closeImageModal();
    });

    // Fermeture avec Escape (gère les deux modales)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (overlay.classList.contains('is-open')) {
                closeModal();
            }
            if (imageOverlay.classList.contains('is-open')) {
                closeImageModal();
            }
        }
    });

    // ========== FONCTIONS MODALE TEXTE ==========
    function openModal() {
        if (window.smoother) window.smoother.paused(true);
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');

        gsap.to(overlay, {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            duration: 0.3,
            ease: 'power2.out'
        });

        const modalInner = document.querySelector('.modal-inner');
        
        gsap.timeline()
            .set(modalInner, { opacity: 1 })
            .fromTo(modalInner,
                { y: 30, scale: 0.95 },
                { y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
            );
    }

    function closeModal() {
        const modalInner = document.querySelector('.modal-inner');
        
        gsap.timeline({
            onComplete: () => {
                if (window.smoother) window.smoother.paused(false);
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                
                overlay.classList.remove('is-open');
                overlay.setAttribute('aria-hidden', 'true');
                
                modalInner.style.opacity = '';
                modalInner.style.transform = '';
            }
        })
        .to(modalInner, {
            y: 20, scale: 0.95, opacity: 0,
            duration: 0.3, ease: 'power2.in'
        })
        .to(overlay, {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            duration: 0.3
        }, 0);

        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Forcer un reflow sur iOS
        setTimeout(() => {
            document.body.scrollTop = document.body.scrollTop;
        }, 100);
    }

    // ========== FONCTIONS MODALE IMAGE ==========

    document.querySelectorAll('.image-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const imageSrc = trigger.dataset.image;
        if (imageSrc) {
            openImage(imageSrc);
        }
    });

});

// Si vous gardez aussi les <a> avec onclick, assurez-vous que openImage est bien global
window.openImage = function(imageSrc) {
    const modalImage = document.getElementById('modal-image');
    if (modalImage) {
        modalImage.src = imageSrc;
        openImageModal();
    } else {
        console.error('modal-image non trouvé');
    }
};

    function openImageModal() {
        if (window.smoother) window.smoother.paused(true);
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        imageOverlay.classList.add('is-open');
        imageOverlay.setAttribute('aria-hidden', 'false');

        gsap.to(imageOverlay, {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            duration: 0.25,
            ease: 'power2.out'
        });

        const imageModalInner = document.querySelector('.image-modal-inner');
        
        gsap.timeline()
            .set(imageModalInner, { opacity: 1 })
            .fromTo(imageModalInner,
                { y: 20, scale: 0.9 },
                { y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.1)' }
            );
    }

    function closeImageModal() {
        const imageModalInner = document.querySelector('.image-modal-inner');
        
        gsap.timeline({
            onComplete: () => {
                if (window.smoother) window.smoother.paused(false);
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                
                imageOverlay.classList.remove('is-open');
                imageOverlay.setAttribute('aria-hidden', 'true');
                
                imageModalInner.style.opacity = '';
                imageModalInner.style.transform = '';
                modalImage.src = ''; // Vide la source
            }
        })
        .to(imageModalInner, {
            y: 15, scale: 0.9, opacity: 0,
            duration: 0.25, ease: 'power2.in'
        })
        .to(imageOverlay, {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            duration: 0.25
        }, 0);

         document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Forcer un reflow sur iOS
        setTimeout(() => {
            document.body.scrollTop = document.body.scrollTop;
        }, 100);
    }

    const infosSection = gsap.timeline({
        scrollTrigger: {
            trigger: ".main-section",
            start: "bottom 50%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
            // markers: true,
        }
    });

 
    infosSection.to(".info-bar", { 
        opacity: 0.95, 
        x: 0, 
        duration: 0.5, 
        ease: "power2.out"
    });

    infosSection.to(".info-bg-logo-1", { 
        opacity: 1, 
        x: 0, 
        duration: 0.5, 
        ease: "power2.out"
    });

    infosSection.to(".info-desc", { 
        opacity: 1, 
        x: 0, 
        duration: 0.5, 
        ease: "power2.out"
    });

    infosSection.to(".info-bg-logo-2", { 
        opacity: 1, 
        x: 0, 
        duration: 0.5, 
        ease: "power2.out"
    });

    infosSection.
    to(".info-image-1", { 
        opacity: 1, 
        x: 0, 
        rotation: 10, 
        duration: 0.7, 
        ease: "power4.out" 
    }, "-=0.1")
    .to(".info-image-2", { 
        opacity: 1, 
        x: 0, 
        rotation: -10, 
        duration: 0.7, 
        ease: "power4.out" 
    }, "-=0.1");
   
 
        
});