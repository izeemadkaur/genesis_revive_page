const collections = {
    cabinet: ['Wood', 'Smooth'],
    wallboard: ['Linen', 'Wood', 'Smooth', 'Specialty'],
    ceiling: ['Textured']
};

const swatchToImagesMap = {
    cabBirchBark: [
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Cab_BirchBrak.jpg",
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Cab_BirchBark_Limbo.jpg"
    ],
    cabBlondeWalnut: [
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Cab_BlondeWalnut.jpg",
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Cab_BlondeWalnut_Limbo.jpg"
    ],
    cabGreenOak: [
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Cab_GreenOak.jpg",
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Cab_GreenOak_Limbo.jpg"
    ],
    cabAlpineAsh: [
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Cab_AlpineAsh.jpg",
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Cab_AlpineAsh_Limbo_Limbo.jpg"
    ],
    cabDesginerWhite: [
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Cab_DesignerWhite.jpg",
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Cab_DesignerWhite_Limbo.jpg"
    ],
    cabStoneGray: [
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Cab_StoneGray.jpg",
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Cab_StoneGray_Limbo.jpg"
    ],
    cabMidnightBlue: [
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Cab_MidnightBlue.jpg",
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Cab_MidnightBlue_Limbo.jpg"
    ],
    cabMatteBlack: [
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Cab_MatteBlk.jpg",
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Cab_MatteBlack_Limbo.jpg"
    ],
    wallWhitewashPlankedWood: [
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Wall_WhitewashPlankedWood.jpg",
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Wall_WhitewashPlankedWood_Limbo.jpg"
    ],
    wallStructuredLinen: [
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Wall_StructuredLinen.jpg",
        "http://genesisproductsinc.com/content/uploads/2024/01/Revive_Wall_StructuredLinen_Limbo.jpg",
    ],
};

let currentIndex = 0;

function navigateSlider(direction) {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const slideWidth = slides[0].offsetWidth;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    } else if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    const translateValue = -currentIndex * slideWidth;
    slider.style.transform = `translateX(${translateValue}px)`;
}

function handleCollectionChange(selectedCollection) {
    const allSwatchesContainers = document.querySelectorAll('.color-swatches > div');
    allSwatchesContainers.forEach(container => {
        container.style.display = 'none';
    });

    const selectedSwatchesContainer = document.getElementById(selectedCollection + '-swatches');
    if (selectedSwatchesContainer) {
        selectedSwatchesContainer.style.display = 'block';
    }
}


function updateCollectionSwitches(kit) {
    const collectionsContainer = document.querySelector('.toggle-collections');
    collectionsContainer.innerHTML = '';

    if (!collections[kit]) {
        console.error(`No collections found for kit: ${kit}`);
        return;
    }

    collections[kit].forEach((collection) => {
        const switchElement = document.createElement('div');
        switchElement.className = 'toggle-switch collections-switch';
        switchElement.textContent = collection;
        switchElement.onclick = () => {
            collectionsSwitch(kit, switchElement)
            const firstCollectionId = `${kit}_${collection}`
            setDefaultSwatch(firstCollectionId, switchElement);
        };
        collectionsContainer.appendChild(switchElement);
    });
}

function kitsSwitch(element) {
    const switches = document.querySelectorAll(".kits-switch");
    switches.forEach((switchElement) => {
        switchElement.classList.remove("active");
    });

    element.classList.add("active");

    let kit = element.textContent.trim().toLowerCase();
    updateCollectionSwitches(kit);

    const collectionSwitches = document.querySelectorAll('.toggle-collections .toggle-switch');
    collectionSwitches.forEach((firstCollectionSwitch, idx) => {
        if (idx == 0) {

            collectionsSwitch(kit, firstCollectionSwitch);

            const firstCollectionId = `${kit}_${firstCollectionSwitch.textContent.toLowerCase().replace(/\s+/g, '_')}-swatches`;
            setDefaultSwatch(firstCollectionId);
        }
    })
}


function setDefaultSwatch(collectionId) {
    const collectionContainer = document.getElementById(collectionId);
    if (collectionContainer) {
        const firstSwatch = collectionContainer.querySelector('.swatch_collection');
        if (firstSwatch) {
            const swatchKey = firstSwatch.getAttribute('data-swatch-key');
            changeProductImage(swatchKey);
        }
    }
}




function collectionsSwitch(kit, element) {
    const switches = document.querySelectorAll(".collections-switch");
    switches.forEach((switchElement) => {
        switchElement.classList.remove("active");
    });
    element.classList.add("active");


    const selectedCollection = `${kit}_${element.textContent.toLowerCase().replace(/\s+/g, '_')}`;
    handleCollectionChange(selectedCollection);

    setDefaultSwatch(selectedCollection + "-swatches");
}


document.addEventListener("DOMContentLoaded", function () {
    const defaultKitSwitch = document.querySelector('.toggle-kits .toggle-switch');
    if (defaultKitSwitch) {
        kitsSwitch(defaultKitSwitch);
    }
});

function changeProductImage(swatchKey) {
    const images = swatchToImagesMap[swatchKey];
    if (!images) {
        console.error('Images not found for swatch:', swatchKey);
        return;
    }

    const slider = document.querySelector('.slider');
    slider.innerHTML = '';

    images.forEach(imageSrc => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        const img = document.createElement('img');
        img.src = imageSrc;
        slide.appendChild(img);
        slider.appendChild(slide);
    });

    currentIndex = 0;
    updateSliderPosition();
}

function updateSliderPosition() {
    const slider = document.querySelector('.slider');
    const slideWidth = document.querySelector('.slide').offsetWidth;
    const translateValue = -currentIndex * slideWidth;
    slider.style.transform = `translateX(${translateValue}px)`;
}

// STICKY NAV //
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.revive-sticky-nav');
    const navPlaceholder = document.querySelector('.nav-placeholder');
    const navLinks = document.querySelectorAll('.nav-link');
    const navInitialTop = nav.offsetTop;

    function adjustNavPlaceholderHeight() {
        if (nav.classList.contains('fixed-nav')) {
            navPlaceholder.style.height = `${nav.offsetHeight}px`;
        } else {
            navPlaceholder.style.height = '0px';
        }
    }

    function toggleStickyNav() {
        const fromTop = window.scrollY;

        if (fromTop >= navInitialTop) {
            nav.classList.add('fixed-nav');
        } else {
            nav.classList.remove('fixed-nav');
        }
        adjustNavPlaceholderHeight();
    }

    function highlightLink() {
        let currentSection = '';
        const fromTop = window.scrollY + nav.offsetHeight;

        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            const sectionTop = section.offsetTop;
            if (fromTop >= sectionTop - nav.offsetHeight) {
                currentSection = link.getAttribute('href');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            const targetPosition = targetSection.offsetTop - nav.offsetHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', () => {
        toggleStickyNav();
        highlightLink();
    });

    toggleStickyNav();
});