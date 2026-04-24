

function changeSize() {
    let $colors_buttons = $(".colors-buttons");
    let $colors_image = $(".colors-image");
 
    $colors_buttons.height($colors_image.height());
    

    console.log("Taille de l'image : " + $colors_image.height())
    console.log("Taille du div des bouttons :" + $colors_buttons.height())
}


$(document).ready(function() {

    changeSize();
    // Définir les couleurs pour chaque bouton
    const colorThemes = {
        'color-1': '#5a3c3cff',  // Marron
        'color-2': '#1c5721ff',  // Vert
        'color-3': '#f4ecdaff',  // Beige clair
        'color-4': '#f9e9b8ff',  // Jaune clair
        'color-5': '#f9d2e1ff'   // Rose clair
    };
    
    // Fonction pour modifier les couleurs du SVG
    function changeSareeColor(color) {
        // Cibler les éléments SVG par leur ID et modifier la couleur
        $('#saree-body, #saree-top, #saree-left-arm, #saree-right-arm').each(function() {
            // Méthode 1: Modifier l'attribut fill
            $(this).attr('fill', color);
            
            // Méthode 2: Modifier le style inline
            $(this).css('fill', color);
            
            // Méthode 3: Modifier l'attribut style (au cas où)
            if ($(this).attr('style')) {
                $(this).attr('style', `fill: ${color};`);
            }
        });
        
        // Optionnel: Ajouter un effet visuel pour confirmer le changement
        console.log(`Couleur changée pour: ${color}`);
    }
    
    // Version plus robuste avec vérification
    function changeSareeColorRobust(color) {
        const elements = ['saree-body', 'saree-top', 'saree-left-arm', 'saree-right-arm'];
        let foundCount = 0;
        
        elements.forEach(id => {
            const $element = $('#' + id);
            if ($element.length) {
                $element.attr('fill', color);
                $element.css('fill', color);
                foundCount++;
            } else {
                console.warn(`Élément #${id} non trouvé dans le SVG`);
            }
        });
        
        if (foundCount === 0) {
            console.error('Aucun élément SVG trouvé. Vérifiez les IDs dans votre SVG.');
        } else {
            console.log(`${foundCount} éléments modifiés avec la couleur ${color}`);
        }
    }
    
    // Ajouter les événements de clic aux boutons
    $('.color-button span').on('click', function() {
        // Récupérer la couleur du span
        const color = $(this).css('background-color');
        
        // Convertir RGB en Hex (car css() retourne du RGB)
        function rgbToHex(rgb) {
            // Si c'est déjà en hex ou un nom de couleur
            if (rgb.startsWith('#')) return rgb;
            
            const result = rgb.match(/\d+/g);
            if (result) {
                const hex = '#' + result.map(x => {
                    const hex = parseInt(x).toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                }).join('');
                return hex + 'ff'; // Ajouter l'opacité
            }
            return '#5a3c3cff'; // Couleur par défaut
        }
        
        const hexColor = rgbToHex(color);
        changeSareeColorRobust(hexColor);
    });
    
    // Alternative: Utiliser les couleurs prédéfinies
    $('.color-1 .color-button span').on('click', () => changeSareeColor(colorThemes['color-1']));
    $('.color-2 .color-button span').on('click', () => changeSareeColor(colorThemes['color-2']));
    $('.color-3 .color-button span').on('click', () => changeSareeColor(colorThemes['color-3']));
    $('.color-4 .color-button span').on('click', () => changeSareeColor(colorThemes['color-4']));
    $('.color-5 .color-button span').on('click', () => changeSareeColor(colorThemes['color-5']));
    
    // Vérifier que les éléments SVG existent au chargement
    setTimeout(() => {
        const svgElements = $('#saree-body, #saree-top, #saree-left-arm, #saree-right-arm');
        if (svgElements.length === 0) {
            console.warn('⚠️ Attention: Les éléments SVG avec les IDs requis n\'ont pas été trouvés');
            console.log('IDs recherchés: saree-body, saree-top, saree-left-arm, saree-right-arm');
        } else {
            console.log('✅ SVG trouvé et prêt à être modifié');
        }
    }, 100);
});