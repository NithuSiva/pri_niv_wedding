/**
 * @param {string} lang - Code langue ('fr', 'en', 'ta')
 */
function selectLang(lang) {
    // localStorage.setItem('wedding-lang', lang);
    
    const langScreen = document.getElementById('lang-screen');
    if (langScreen) langScreen.style.display = 'none';
    document.body.classList.remove('lang-pending');
    
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.documentElement.style.overflow = '';
    
    if (window.initLoader) {
        window.initLoader(() => {
            applyLang(lang);
            if (window.initAnimations) {
                window.initAnimations();
            }
            showContentScreen();
        });
    } else {
        applyLang(lang);
        showContentScreen();
    }
}

function showContentScreen() {
    const contentScreen = document.getElementById('content-screen');
    if (contentScreen) {
        contentScreen.style.display = 'block';
        contentScreen.style.visibility = 'visible';
        contentScreen.style.position = 'relative';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('wedding-lang');
    
    if (saved) {
        // Langue déjà choisie
        const langScreen = document.getElementById('lang-screen');
        if (langScreen) langScreen.style.display = 'none';
        document.body.classList.remove('lang-pending');
        
        // Réactiver le scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.documentElement.style.overflow = '';
        
        if (window.initLoader) {
            window.initLoader(() => {
                applyLang(saved);
                if (window.initAnimations) window.initAnimations();
                showContentScreen();
            });
        } else {
            applyLang(saved);
            showContentScreen();
        }
    } else {
        // En attente de choix de langue
        document.body.classList.add('lang-pending');
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.documentElement.style.overflow = 'hidden';
        
        const langScreen = document.getElementById('lang-screen');
        if (langScreen) {
            langScreen.style.display = 'grid';
        }
        
        const contentScreen = document.getElementById('content-screen');
        if (contentScreen) contentScreen.style.display = 'none';
        
        // Cacher le loader
        const loader = document.getElementById('loader-overlay');
        if (loader) loader.classList.add('hidden');
    }
});

function goBack() {
    localStorage.removeItem('wedding-lang');
    
    document.body.classList.add('lang-pending');
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.documentElement.style.overflow = 'hidden';
    
    const langScreen = document.getElementById('lang-screen');
    if (langScreen) langScreen.style.display = 'grid';
    
    const contentScreen = document.getElementById('content-screen');
    if (contentScreen) contentScreen.style.display = 'none';
    
    const loader = document.getElementById('loader-overlay');
    if (loader) {
        loader.classList.remove('hidden');
        const loaderBar = document.getElementById('loader-bar');
        if (loaderBar) loaderBar.style.width = '0%';
    }
}

const translations = {
  fr: {
    "main-rel-details": "Détails de la Cérémonie Hindoue",
    "main-rec-details": "Détails de la Réception",
    "cd-title": "Compte à rebours",
    "cd-days": "Jours",
    "cd-hours": "Heures",
    "cd-minutes": "Minutes",
    "cd-secondes": "Secondes",
    "info-desc": "Bienvenue sur notre site web dédié à notre mariage. Vous trouverez ici toutes les informations nécessaires pour vous guider tout au long de cette journée très spéciale. Nous avons hâte de créer ces souvenirs avec vous. Jetez un œil ci-dessous pour ne rien manquer !",
    "rel-place-title": "À propos du lieu",
    "rel-place-desc": "La cérémonie",
    "rel-place-dress-code": "Code vestimentaire",
    "rel-place-dress-code-desc": "Tradition Intemporelle. Nous vous invitons à porter votre plus belle tenue traditionnelle dans une palette de blanc cassé, doré et vert feuillage.",
    "rcp-place-dress-code-desc": "Électro Chic. Nous vous invitons à porter des couleurs vives et audacieuses de notre palette. Des teintes éclatantes et saisissantes pour créer une atmosphère énergique et inoubliable.",
    "rcp-main-desc": "Nous sommes ravis de vous accueillir pour célébrer notre union lors d'une soirée de réception inoubliable.<br>Rejoignez-nous pour partager un moment de joie, de danse et de festivités. Une soirée placée sous le signe de l'élégance et de la bonne humeur vous attend, rythmée par la découpe du gâteau, un dîner savoureux et de nombreuses surprises jusqu'au bout de la nuit.",
    "tl-title": "Programme",
    "tl-desc-read": "Lire plus",
    "tl-desc-full-1": "La journée de mariage commence à l'aube avec les sons résonnants du Nadaswaram et du Thavil. Ces deux instruments sont inséparables dans la musique des temples tamouls et des mariages ; leur son combiné est considéré comme suprêmement auspicieux et signale qu'un événement sacré est en cours.",
    "tl-desc-1": "Un accueil auspicieux.",
    "tl-desc-full-2": "Le marié arrive au lieu de la cérémonie et est accueilli par la famille de la mariée. Le Thozhan (le frère de la mariée) lave les pieds du marié pour l'accueillir officiellement dans la famille. Le marié offre en retour une bague en or au Thozhan. Deux femmes mariées effectuent ensuite l'Aalathi, faisant tourner un plateau portant une flamme trois fois autour du marié pour éloigner les mauvais esprits et la négativité. Le père de la mariée passe une guirlande au marié.",
    "tl-desc-2": "Accueil du marié.",
    "tl-desc-full-3": "Après l'accueil, le marié est accompagné de sa famille et de ses garçons d'honneur portant des plateaux décorés jusqu'au Manavarai (la scène de mariage cérémonielle) où le feu sacré a été préparé et où l'Iyer (prêtre) attend. Tout au long de la cérémonie, le prêtre chante des mantras védiques et shaïvites.",
    "tl-desc-3": "Allumage de la lampe.",
    "tl-desc-full-4": "Le prêtre commence officiellement la cérémonie en invoquant le Seigneur Ganesha (Pillaiyar), le dissipateur d'obstacles, pour s'assurer que le mariage se déroule sans encombre. Des prières sont offertes et l'espace sacré est sanctifié. Cette étape marque le début spirituel de tous les rites qui suivent.",
    "tl-desc-4": "Commencement de la cérémonie.",
    "tl-desc-full-5": "Le marié subit un rituel de purification : On lui remet un Therpai (une bague faite d'herbe darbha) à porter, symbolisant la pureté mentale et la concentration. Un fil de safran (kaapu) est noué autour de son poignet droit par le prêtre, servant de protection spirituelle contre les mauvais vœux et l'énergie négative.",
    "tl-desc-5": "Purification du marié.",
    "tl-desc-full-6": "La mariée entre dans le Manavarai, escortée par la Thozhi (la sœur du marié ou une parente féminine), ses demoiselles d'honneur et sa famille. Elle est assise à la droite du marié. Les parents de la mariée donnent officiellement leur fille au marié et à sa famille. Le marié promet de la protéger et de la chérir tout au long de leur vie.",
    "tl-desc-6": "Arrivée de la mariée & remise de la mariée.",
    "tl-desc-full-7": "Le marié offre à la mariée deux objets sacrés : Koorai Pudavai : le sari de mariage, offert par la famille du marié. Thali : le pendentif en or sacré. C'est le symbole du mariage. Les deux objets sont placés sur un plateau, bénis par le prêtre, puis circulés parmi les invités afin que chacun puisse les toucher et leur transmettre ses bénédictions. La mariée quitte ensuite la scène pour revêtir le sari Koorai.",
    "tl-desc-7": "Bénédiction du sari et du collier de mariage.",
    "tl-desc-full-8": "C'est LE moment central de tout le mariage, le Muhurtham. La mariée revient au Manavarai dans son sari Koorai, tenant une guirlande pour le marié. Alors que le Nadaswaram atteint un crescendo dramatique (le Ketti Melam), le marié noue le Thali autour du cou de la mariée avec trois nœuds. Le marié applique du Kungumam (vermillon rouge) sur la raie des cheveux de la mariée, signifiant son statut d'épouse. Le couple échange des guirlandes, généralement trois fois, symbolisant l'acceptation mutuelle. Le couple est déclaré mari et femme.",
    "tl-desc-8": "Le nœud sacré.",
    "tl-desc-full-9": "Le couple nouvellement marié effectue le Saptapadi, sept pas faits ensemble. Ces pas représentent les quatre buts de la vie : Dharma (éthique), Artha (prospérité), Kama (amour) et Moksha (libération spirituelle). Après les sept pas, le marié conduit la mariée vers l'Ammi (une pierre à moudre en granit). Il pose son pied droit dessus, symbolisant que leur lien est aussi solide et inébranlable que la pierre. Il orne ensuite chacun de ses pieds d'un Metti (anneau d'orteil en argent).",
    "tl-desc-9": "Les sept pas et la cérémonie de l'anneau d'orteil.",
    "tl-desc-full-10": "La cérémonie se conclut par un dernier Aalathi effectué devant le couple pour dissiper toute négativité restante et un Asirvatham (bénédictions) des parents puis des anciens. Un festin de mariage festif (traditionnellement végétarien, servi sur des feuilles de bananier) suit, marquant la joyeuse conclusion.",
    "tl-desc-10": "Bénédictions finales & adieux de la mariée.",
    "rcp-main-title": "Réception de Mariage",
    "custom-tl-1-heure": "18h00",
    "custom-tl-1-desc": "Entrée des mariés",
    "custom-tl-2-heure": "19h00",
    "custom-tl-2-desc": "DÉCOUPE <br> DU GÂTEAU",
    "custom-tl-3-heure": "19h30",
    "custom-tl-3-desc": "PHOTO <br> FAMILLE & AMIS",
    "custom-tl-4-heure": "20h30",
    "custom-tl-4-desc": "DÎNER <br> SERVI",
    "custom-tl-5-heure": "21h00",
    "custom-tl-5-desc": "FESTIVITÉS <br> CONTINUENT",
    "custom-tl-6-heure": "22h00",
    "custom-tl-6-desc": "DANSE <br> SOLO",
    "custom-tl-7-heure": "22h30",
    "custom-tl-7-desc": "SOIRÉE",
    "img-ct-rcp-bg": "assets/img/ct-rcp-fr.png",
    "img-carte-reception": "assets/img/carte-reception-fr.png",
    "img-carte-fr": "assets/img/carte-fr.png",
  },
  en: {
    "main-rel-details": "Hindu Ceremony Details",
    "main-rec-details": "Reception Details",
    "cd-title": "Countdown",
    "cd-days": "Days",
    "cd-hours": "Hours",
    "cd-minutes": "Minutes",
    "cd-secondes": "Seconds",
    "info-desc": "Welcome to our wedding website. You will find all the necessary details to guide you through this very special day. We look forward to creating these memories with you. Take a look below so you don't miss a thing!",
    "rel-place-title": "About the place",
    "rel-place-desc": "The ceremony",
    "rel-place-dress-code": "Dress code",
    "rel-place-dress-code-desc": "Timeless Tradition. We invite you to wear your finest traditional attire in a palette of off-white, gold, and foliage green.",
    "rcp-place-dress-code-desc": "Electro Chic. We invite you to wear bold and vibrant colors from our palette. bright, striking tones to create an energetic and unforgettable atmosphere.",
    "rcp-main-desc": "We are delighted to welcome you to celebrate our union during an unforgettable reception evening.<br>Join us to share a moment of joy, dance, and festivities. An evening of elegance and good cheer awaits you, with cake cutting, a delicious dinner, and many surprises until the end of the night.",
    "tl-title": "Timeline",
    "tl-desc-read": "Read more",
    "tl-desc-full-1": "The wedding day begins at dawn with the resonant sounds of the Nadaswaram and the Thavil. These two instruments are inseparable in Tamil temple and wedding music; their combined sound is considered supremely auspicious and signals that a sacred event is underway.",
    "tl-desc-1": "An auspicious welcome.",
    "tl-desc-full-2": "The groom arrives at the venue and is received by the bride's family. The Thozhan (the bride's brother) washes the groom's feet to formally welcomes him into the family. The groom gifts the Thozhan a gold ring in return. Two married women then perform Aalathi, circling a tray bearing a flame three times around the groom to ward off evil spirits and negativity. The bride's father garlands the groom.",
    "tl-desc-2": "Welcoming the groom.",
    "tl-desc-full-3": "After the welcoming, the groom is accompanied by his family and groomsmen carrying decorated trays to the Manavarai (the ceremonial wedding stage) where the sacred fire has been prepared and the Iyer (priest) awaits. Throughout the ceremony, the priest chants Vedic and Saiva mantras.",
    "tl-desc-3": "Lighting of the lamp.",
    "tl-desc-full-4": "The priest formally commences the ceremony by invoking Lord Ganesha (Pillaiyar), the remover of obstacles, to ensure the wedding proceeds without hindrance. Prayers are offered, and the sacred space is sanctified. This step marks the spiritual 'start' of all rites that follow.",
    "tl-desc-4": "Commencement of the ceremony.",
    "tl-desc-full-5": "The groom undergoes a purification ritual: He is given a Therpai (a ring made of darbha grass) to wear, symbolising mental purity and focus. A saffron thread (kaapu) is tied around his right wrist by the priest, serving as spiritual protection against ill wishes and negative energy.",
    "tl-desc-5": "Purifying the groom.",
    "tl-desc-full-6": "The bride enters the Manavarai, escorted by the Thozhi (the groom's sister or a female relative), her bridesmaids, and her family. She is seated to the right of the groom. The bride's parents formally give their daughter to the groom and his family. The groom promises to protect and cherish her throughout their life.",
    "tl-desc-6": "Arrival of the bride & giving her away.",
    "tl-desc-full-7": "The groom presents the bride with two sacred items: Koorai Pudavai: the wedding saree, gifted by the groom's family. Thali: the sacred gold pendant. It is the symbol of marriage. Both items are placed on a tray, blessed by the priest, and then circulated among the assembled guests so that everyone may touch them and impart their blessings. The bride then leaves the stage to change into the Koorai saree.",
    "tl-desc-7": "Blessing the wedding sari and necklace.",
    "tl-desc-full-8": "This is THE central moment of the entire wedding, the Muhurtham. The bride returns to the Manavarai in her Koorai saree, holding a garland for the groom. As the Nadaswaram reaches a dramatic crescendo (the Ketti Melam), the groom ties the Thali around the bride's neck with three knots. The groom applies Kungumam (red vermillion) to the bride's hair parting, signifying her married status. The couple exchanges garlands, typically three times, symbolising mutual acceptance. The couple is declared husband and wife.",
    "tl-desc-8": "Tying the sacred knot.",
    "tl-desc-full-9": "The newly married couple performs the Saptapadi, seven steps taken together. These steps represent the four purposes of life: Dharma (ethics), Artha (prosperity), Kama (love), and Moksha (spiritual liberation). After the seven steps, the groom leads the bride to the Ammi (a granite grinding stone). He places her right foot upon it, symbolising that their bond is as strong and unshakeable as stone. He then adorns each of her feet with a Metti (silver toe ring).",
    "tl-desc-9": "The seven steps and toe-ring ceremony.",
    "tl-desc-full-10": "The ceremony concludes with a final Aalathi performed in front of the couple to dispel any remaining negativity and Asirvatham (blessings) with both of parents and then elders. A festive wedding feast (traditionally vegetarian, served on banana leaves) follows, marking the joyous conclusion.",
    "tl-desc-10": "Final blessings bride's farewell.",
    "rcp-main-title": "Wedding Reception",
    "custom-tl-1-heure": "6:00 Pm",
    "custom-tl-1-desc": "Entry of the bride and groom",
    "custom-tl-2-heure": "7:00 Pm",
    "custom-tl-2-desc": "CAKE <br> CUTTING",
    "custom-tl-3-heure": "7:30 pm",
    "custom-tl-3-desc": "FAMILY & <br> friends PHOTO",
    "custom-tl-4-heure": "8:30 Pm",
    "custom-tl-4-desc": "dinner <br> served",
    "custom-tl-5-heure": "9:00 pm",
    "custom-tl-5-desc": "festifities <br> continue",
    "custom-tl-6-heure": "10:00 Pm",
    "custom-tl-6-desc": "sOLO dANCE",
    "custom-tl-7-heure": "10:30 pm",
    "custom-tl-7-desc": "night Party",
    "img-ct-rcp-bg": "assets/img/ct-rcp-en.png",
    "img-carte-reception": "assets/img/carte-reception-en.png",
    "img-carte-fr": "assets/img/carte-en.png",
  },
  ta: {
    "main-rel-details": "இந்து திருமண விவரங்கள்",
    "main-rec-details": "வரவேற்பு விவரங்கள்",
    "cd-title": "எண்ணிக்கை",
    "cd-days": "நாட்கள்",
    "cd-hours": "மணி",
    "cd-minutes": "நிமிடங்கள்",
    "cd-secondes": "வினாடிகள்",
    "info-desc": "எங்கள் திருமண இணையதளத்திற்கு வரவேற்கிறோம். உங்கள் முறையான அழைப்பிதழில் உள்ள தகவல்களுடன், இந்த மிகச் சிறப்பான நாளில் உங்களுக்கு வழிகாட்ட தேவையான அனைத்து விவரங்களையும் இங்கே காணலாம். உங்களுடன் இந்த நினைவுகளை உருவாக்க நாங்கள் ஆவலுடன் காத்திருக்கிறோம். எதுவும் தவறவிடாமல் இருக்க கீழே பார்க்கவும்!",
    "rel-place-title": "இடம் பற்றி",
    "rel-place-desc": "சடங்கு",
    "rel-place-dress-code": "உடை நெறிமுறை",
    "rel-place-dress-code-desc": "நிலையான பாரம்பரியம். வெண்மை, தங்கம் மற்றும் பச்சை நிற தாவர நிறங்களில் உங்கள் சிறந்த பாரம்பரிய உடையை அணிய அழைக்கிறோம்.",
    "rcp-place-dress-code-desc": "எலக்ட்ரோ சிக். தைரியமான மற்றும் துடிப்பான நிறங்களை அணிய அழைக்கிறோம். ஆற்றல் மிக்க மற்றும் மறக்கமுடியாத சூழலை உருவாக்க பிரகாசமான, கண்கவர் தொனிகள்.",
    "rcp-main-desc": "எங்கள் திருமண வரவேற்பின் மறக்க முடியாத மாலை நிகழ்வில் உங்களை வரவேற்பதில் பெருமகிழ்ச்சி அடைகிறோம்.<br>மகிழ்ச்சி, நடனம் மற்றும் கொண்டாட்டங்கள் நிறைந்த இந்த தருணத்தை எங்களுடன் பகிர்ந்து கொள்ள வாருங்கள். கேக் வெட்டுதல், சுவையான இரவு உணவு மற்றும் இரவு முழுவதும் பல ஆச்சரியங்களுடன் கூடிய நேர்த்தியான மற்றும் மகிழ்ச்சியான மாலை உங்களுக்காக காத்திருக்கிறது.",
    "tl-title": "நிகழ்ச்சி நிரல்",
    "tl-desc-read": "மேலும் படிக்க",
    "tl-desc-full-1": "திருமண நாள் விடியலில் நாதஸ்வரம் மற்றும் தவிலின் ஒலியுடன் தொடங்குகிறது. இந்த இரண்டு கருவிகளும் தமிழ் கோயில் மற்றும் திருமண இசையில் பிரிக்கமுடியாதவை; அவற்றின் இணைந்த ஒலி மிகவும் மங்களகரமானதாகக் கருதப்படுகிறது மற்றும் ஒரு புனித நிகழ்வு நடைபெறுகிறது என்பதை அறிவிக்கிறது.",
    "tl-desc-1": "மங்களகரமான வரவேற்பு.",
    "tl-desc-full-2": "மணமகன் நிகழ்வு இடத்திற்கு வருகிறார், மணமகளின் குடும்பத்தினரால் வரவேற்கப்படுகிறார். தோழன் (மணமகளின் சகோதரன்) மணமகனின் கால்களை கழுவி அவரை குடும்பத்தில் முறையாக வரவேற்கிறார். மணமகன் பதிலுக்கு தோழனுக்கு தங்க மோதிரம் பரிசளிக்கிறார். இரண்டு திருமணமான பெண்கள் ஆலத்தி செய்கின்றனர், திருஷ்டி மற்றும் எதிர்மறையை விரட்ட மணமகனைச் சுற்றி மூன்று முறை ஒரு தட்டில் தீபம் ஏந்தி சுழற்றுகின்றனர். மணமகளின் தந்தை மணமகனுக்கு மாலை அணிவிக்கிறார்.",
    "tl-desc-2": "மணமகனை வரவேற்றல்.",
    "tl-desc-full-3": "வரவேற்பிற்குப் பிறகு, மணமகன் அவரது குடும்பத்தினர் மற்றும் அலங்கரிக்கப்பட்ட தட்டுகளை ஏந்திய மாப்பிள்ளை தோழர்களுடன் மணவறை (சடங்கு திருமண மேடை) க்கு அழைத்துச் செல்லப்படுகிறார், அங்கு புனித நெருப்பு தயார் செய்யப்பட்டு இயர் (பூசாரி) காத்திருக்கிறார். சடங்கு முழுவதும், பூசாரி வேத மற்றும் சைவ மந்திரங்களை உச்சரிக்கிறார்.",
    "tl-desc-3": "விளக்கேற்றுதல்.",
    "tl-desc-full-4": "பூசாரி திருமணம் தடையின்றி நடைபெறுவதை உறுதிப்படுத்த தடைகளை நீக்குபவரான பிள்ளையார் (கணபதி) ஐ வணங்கி சடங்கை முறையாகத் தொடங்குகிறார். பிரார்த்தனைகள் செலுத்தப்பட்டு, புனித இடம் தூய்மைப்படுத்தப்படுகிறது. இந்த படி அனைத்து சடங்குகளின் ஆன்மீக தொடக்கத்தை குறிக்கிறது.",
    "tl-desc-4": "சடங்கின் தொடக்கம்.",
    "tl-desc-full-5": "மணமகன் ஒரு சுத்திகரிப்பு சடங்கிற்கு உட்படுகிறார்: அவருக்கு தர்ப்பை புல்லால் செய்யப்பட்ட தெர்பை (மோதிரம்) அணியப்படுகிறது, இது மன தூய்மை மற்றும் கவனத்தை அடையாளப்படுத்துகிறது. காப்பு என்ற குங்கும நூல் பூசாரியால் அவரது வலது மணிக்கட்டில் கட்டப்படுகிறது, இது தீய எண்ணங்கள் மற்றும் எதிர்மறை சக்திகளுக்கு எதிரான ஆன்மீக பாதுகாப்பாக செயல்படுகிறது.",
    "tl-desc-5": "மணமகனை தூய்மைப்படுத்தல்.",
    "tl-desc-full-6": "மணமகள் மணவறையில் நுழைகிறாள், தோழி (மணமகனின் சகோதரி அல்லது பெண் உறவினர்), அவளது மணமகள் தோழிகள் மற்றும் குடும்பத்தினரால் அழைத்துச் செல்லப்படுகிறாள். அவள் மணமகனுக்கு வலதுபுறம் அமர்கிறாள். மணமகளின் பெற்றோர் முறையாக தங்கள் மகளை மணமகன் மற்றும் அவரது குடும்பத்திடம் ஒப்படைக்கிறார்கள். மணமகன் அவளை வாழ்நாள் முழுவதும் பாதுகாப்பதாகவும் அன்பாக வாழ்வதாகவும் வாக்குறுதி அளிக்கிறார்.",
    "tl-desc-6": "மணமகளின் வருகை மற்றும் கன்னிகாதானம்.",
    "tl-desc-full-7": "மணமகன் மணமகளுக்கு இரண்டு புனித பொருட்களை வழங்குகிறார்: கூரை புடவை: மணமகனின் குடும்பத்தினர் பரிசளித்த திருமண புடவை. தாலி: புனித தங்க பதக்கம். இது திருமணத்தின் அடையாளம். இரண்டு பொருட்களும் ஒரு தட்டில் வைக்கப்பட்டு, பூசாரியால் ஆசீர்வதிக்கப்பட்டு, அனைவரும் தொட்டு ஆசீர்வாதம் வழங்கும் வகையில் கூடியிருந்த விருந்தினர்களிடையே சுற்றி வரவிடப்படுகின்றன. பின்னர் மணமகள் கூரை புடவை அணிய மேடையை விட்டு வெளியேறுகிறாள்.",
    "tl-desc-7": "திருமண புடவை மற்றும் தாலியை ஆசீர்வதித்தல்.",
    "tl-desc-full-8": "இது முழு திருமணத்தின் மையமான தருணம், முகூர்த்தம். மணமகள் கூரை புடவையில் மணவறைக்குத் திரும்புகிறாள், மணமகனுக்கு மாலை ஏந்தி வருகிறாள். நாதஸ்வரம் கேட்டி மேளமாக உச்சத்தை அடையும்போது, மணமகன் மணமகளின் கழுத்தில் மூன்று முடிச்சுகளுடன் தாலி கட்டுகிறார். மணமகன் மணமகளின் தலை பிரிப்பில் குங்குமம் (சிவப்பு வர்மிலியன்) இடுகிறார், அது அவளது திருமணமான தகுதியை குறிக்கிறது. தம்பதியினர் மாலை மாற்றிக்கொள்கிறார்கள், பொதுவாக மூன்று முறை, இது பரஸ்பர ஏற்றுக்கொள்ளலை அடையாளப்படுத்துகிறது. தம்பதியினர் கணவன் மனைவியாக அறிவிக்கப்படுகிறார்கள்.",
    "tl-desc-8": "புனித கயிறு கட்டுதல்.",
    "tl-desc-full-9": "புதிதாக திருமணமான தம்பதியினர் சப்தபதி செய்கிறார்கள், ஏழு படிகள் ஒன்றாக எடுக்கப்படுகின்றன. இந்த படிகள் வாழ்க்கையின் நான்கு நோக்கங்களை பிரதிநிதித்துவப்படுத்துகின்றன: தர்மம் (நீதி), அர்த்தம் (செழிப்பு), காமம் (அன்பு), மற்றும் மோட்சம் (ஆன்மீக விமோசனம்). ஏழு படிகளுக்குப் பிறகு, மணமகன் மணமகளை அம்மி (கிரானைட் அரைக்கும் கல்) க்கு அழைத்துச் செல்கிறார். அவர் அவளது வலது காலை அதன் மீது வைக்கிறார், அவர்களின் பந்தம் கல்லைப் போல் உறுதியானது மற்றும் அசையாதது என்று அடையாளப்படுத்துகிறார். பின்னர் அவர் அவளது ஒவ்வொரு காலிலும் மெட்டி (வெள்ளி கால் மோதிரம்) அணிவிக்கிறார்.",
    "tl-desc-9": "ஏழு அடிகள் மற்றும் மெட்டி சடங்கு.",
    "tl-desc-full-10": "சடங்கு தம்பதியினருக்கு முன்னால் செய்யப்படும் இறுதி ஆலத்தியுடன் முடிவடைகிறது, மேலும் பெற்றோர் மற்றும் பெரியோரிடமிருந்து ஆசீர்வாதம் (அசீர்வாதம்) பெறப்படுகிறது. ஒரு கொண்டாட்டமான திருமண விருந்து (பாரம்பரியமாக சைவ உணவு, வாழை இலையில் பரிமாறப்படுகிறது) தொடர்கிறது, இது மகிழ்ச்சியான முடிவை குறிக்கிறது.",
    "tl-desc-10": "இறுதி ஆசீர்வாதங்கள் மற்றும் மணமகளின் விடைபெறல்.",
    "rcp-main-title": "திருமண வரவேற்பு",
    "custom-tl-1-heure": "மாலை 6:00",
    "custom-tl-1-desc": "மணமகன் மணமகள் வருகை",
    "custom-tl-2-heure": "மாலை 7:00",
    "custom-tl-2-desc": "கேக் <br> வெட்டுதல்",
    "custom-tl-3-heure": "மாலை 7:30",
    "custom-tl-3-desc": "குடும்பம் & <br> நண்பர்கள் புகைப்படம்",
    "custom-tl-4-heure": "இரவு 8:30",
    "custom-tl-4-desc": "இரவு உணவு <br> பரிமாறல்",
    "custom-tl-5-heure": "இரவு 9:00",
    "custom-tl-5-desc": "விழா <br> தொடர்கிறது",
    "custom-tl-6-heure": "இரவு 10:00",
    "custom-tl-6-desc": "தனி <br> நடனம்",
    "custom-tl-7-heure": "இரவு 10:30",
    "custom-tl-7-desc": "இரவு விழா",
    "img-ct-rcp-bg": "assets/img/ct-rcp-en.png",
    "img-carte-reception": "assets/img/carte-reception-en.png",
    "img-carte-fr": "assets/img/carte-en.png",
  }
};

/**
 * @param {string} lang - Code langue ('fr', 'en', 'ta')
 */
function applyLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.classList.remove('lang-fr', 'lang-en', 'lang-ta');
    document.documentElement.classList.add('lang-' + lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (translations[lang][key].includes('<')) {
                el.innerHTML = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    document.querySelectorAll('[data-i18n-modal-desc]').forEach(el => {
        const key = el.getAttribute('data-i18n-modal-desc');
        if (translations[lang] && translations[lang][key]) {
            el.setAttribute('data-modal-desc', translations[lang][key]);
        }
    });

    document.querySelectorAll('[data-i18n-img]').forEach(el => {
        const key = el.getAttribute('data-i18n-img');
        if (translations[lang] && translations[lang][key]) {
            el.src = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-bg]').forEach(el => {
        const key = el.getAttribute('data-i18n-bg');
        if (translations[lang] && translations[lang][key]) {
            el.style.backgroundImage = `url('${translations[lang][key]}')`;
        }
    });

    document.querySelectorAll('[data-i18n-data-image]').forEach(el => {
        const key = el.getAttribute('data-i18n-data-image');
        if (translations[lang] && translations[lang][key]) {
            el.setAttribute('data-image', translations[lang][key]);
        }
    });
}

window.selectLang = selectLang;
window.applyLang = applyLang;
window.goBack = goBack;