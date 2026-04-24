
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

const modal = document.getElementById("videoModal");
const video = document.getElementById("modalVideo");

function openVideoModal() {
    modal.style.display = "flex";
    video.play();

    // Demander le plein écran au navigateur
    if (modal.requestFullscreen) {
        modal.requestFullscreen();
    } else if (modal.webkitRequestFullscreen) { // Safari
        modal.webkitRequestFullscreen();
    }
    
    // Optionnel : Verrouiller l'orientation si le navigateur le permet (Android)
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(err => console.log(err));
    }
}

function closeVideoModal() {
    modal.style.display = "none";
    video.pause();
    
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
// 1. Enregistrement des plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// 2. Initialisation de ScrollSmoother
// Assure-toi que ce code s'exécute AVANT tes autres animations
const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5, 
    effects: true,
    normalizeScroll: true // Aide à lisser les sauts sur mobile/trackpad
});

AOS.init({ duration: 1000, once: true });

document.addEventListener("DOMContentLoaded", () => {

  

    
});