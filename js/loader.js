function initLoader(callback) {
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loader__bar');
    
    if (!loader) {
        if (callback) callback();
        return;
    }
    
    loader.classList.remove('hidden');
    if (loaderBar) loaderBar.style.width = '0%';
    
    const images = Array.from(document.images);
    const videos = Array.from(document.querySelectorAll('video'));
    const contentImages = images.filter(img => !img.closest('.loader'));
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
            if (loader) loader.classList.add('hidden');
            document.body.style.overflow = '';
            if (callback) callback();
        }, 400);
    }
    
    // Chargement des polices avec l'API standard
    document.fonts.ready.then(() => {
        console.log('✅ Toutes les polices sont chargées');
        fontsReady = true;
        updateProgress();
        checkAllLoaded();
    });
    
    // Timeout de sécurité pour les polices
    setTimeout(() => {
        if (!fontsReady) {
            console.warn('⚠️ Timeout des polices');
            fontsReady = true;
            updateProgress();
            checkAllLoaded();
        }
    }, 4000);
    
    // Chargement des médias
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
    console.log(`📦 Loader - ${totalAssets} médias, polices en attente...`);
}

window.initLoader = initLoader;