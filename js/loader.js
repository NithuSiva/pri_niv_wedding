
function initLoader(callback) {
    const loaderOverlay = document.getElementById('loader-overlay');
    const loaderBar = document.getElementById('loader-bar');
    
    if (!loaderOverlay) {
        if (callback) callback();
        return;
    }
    
    loaderOverlay.classList.remove('hidden');
    if (loaderBar) loaderBar.style.width = '0%';
    
    const images = Array.from(document.images);
    const videos = Array.from(document.querySelectorAll('video'));
    const contentImages = images.filter(img => !img.closest('#loader-overlay'));
    const totalAssets = contentImages.length + videos.length;
    
    let loadedAssets = 0;
    let fontsReady = false;
    
    function updateProgress() {
        const assetProgress = totalAssets > 0 ? (loadedAssets / totalAssets) * 100 : 100;
        const fontProgress = fontsReady ? 100 : 0;
        
        const totalProgress = totalAssets > 0 
            ? (assetProgress * 0.7) + (fontProgress * 0.3)
            : (fontProgress * 0.3) + 70;
        
        if (loaderBar) {
            loaderBar.style.width = Math.min(totalProgress, 100) + '%';
        }
    }
    
    function checkAllLoaded() {
        if (loadedAssets >= totalAssets && fontsReady) {
            hideLoader();
        }
    }
    
    function onAssetLoaded() {
        loadedAssets++;
        updateProgress();
        checkAllLoaded();
    }
    
    function hideLoader() {
        setTimeout(() => {
            if (loaderOverlay) loaderOverlay.classList.add('hidden');
            document.body.style.overflow = '';
            if (callback) callback();
        }, 400);
    }
    
    // Chargement des polices
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            fontsReady = true;
            updateProgress();
            checkAllLoaded();
        });
    } else {
        fontsReady = true;
        updateProgress();
    }
    
    // Timeout de sécurité
    setTimeout(() => {
        if (!fontsReady) {
            fontsReady = true;
            updateProgress();
            checkAllLoaded();
        }
    }, 4000);
    
    if (totalAssets === 0) {
        updateProgress();
        checkAllLoaded();
    } else {
        document.body.style.overflow = 'hidden';
        
        contentImages.forEach(img => {
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
    
    updateProgress();
}

window.initLoader = initLoader;