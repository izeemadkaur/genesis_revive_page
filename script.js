// DROPDOWN LOGIC //
const collections = {
    cabinet: ['Cabinet Wood Collection', 'Cabinet Smooth Collection'],
    wallboard: ['Wallboard Linen Collection', 'Wallboard Wood Collection', 'Wallboard Smooth Collection', 'Wallboard Specialty Collection']
};

function updateCollectionDropdown(kit) {
    const collectionDropdown = document.getElementById('collectionDropdown');
    collectionDropdown.innerHTML = '';

    collections[kit].forEach((collection) => {
        const option = document.createElement('option');
        option.value = collection.toLowerCase().replace(/\s+/g, '_');
        option.textContent = collection;
        collectionDropdown.appendChild(option);
    });

    collectionDropdown.onchange = () => {
        const selectedCollection = collectionDropdown.value;
        handleCollectionChange(selectedCollection);
        setDefaultSwatch(selectedCollection);
    };

    collectionDropdown.dispatchEvent(new Event('change'));
}

function handleCollectionChange(selectedCollection) {
    document.querySelectorAll('.collection_selection .collection').forEach(coll => {
        coll.style.display = 'none';
    });

    const selectedColl = document.getElementById(selectedCollection);
    if (selectedColl) {
        selectedColl.style.display = 'block';
    }
}

function setDefaultSwatch(collectionId) {
    const collectionContainer = document.getElementById(collectionId);
    if (collectionContainer) {
        const firstSwatch = collectionContainer.querySelector('.swatch_collection');
        if (firstSwatch) {
            changeProductImage(firstSwatch.getAttribute('data-swatch-key'));
        }
    }
}

function handleKitChange(selectedKit) {
    document.getElementById('cabinetCollections').style.display = selectedKit === 'cabinet' ? 'block' : 'none';
    document.getElementById('wallboardCollections').style.display = selectedKit === 'wallboard' ? 'block' : 'none';

    updateCollectionDropdown(selectedKit);
}

document.addEventListener('DOMContentLoaded', function () {
    const kitDropdown = document.getElementById('kitDropdown');
    kitDropdown.value = 'cabinet';
    handleKitChange(kitDropdown.value);
});

// CAROUSEL LOGIC //
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

function changeProductImage(swatchKey) {
    const images = swatchToImagesMap[swatchKey];
    const container = document.getElementById('productImageContainer');
    container.innerHTML = '';

    if (images.length > 1) {
        const carousel = createCarousel(images);
        container.appendChild(carousel);
    } else {
        const img = document.createElement('img');
        img.src = images[0];
        img.className = 'product_img';
        container.appendChild(img);
    }
}

function createCarousel(imageUrls) {
    const carousel = document.createElement('div');
    carousel.className = 'carousel';

    imageUrls.forEach((url, index) => {
        const img = document.createElement('img');
        img.src = url;
        img.className = index === 0 ? 'carousel-item active' : 'carousel-item';
        carousel.appendChild(img);
    });

    const prevButton = document.createElement('button');
    prevButton.innerText = 'Prev';
    prevButton.className = 'carousel-control';
    prevButton.onclick = () => navigateCarousel(carousel, 'prev');

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.className = 'carousel-control';
    nextButton.onclick = () => navigateCarousel(carousel, 'next');

    const controls = document.createElement('div');
    controls.className = 'carousel-controls';
    controls.appendChild(prevButton);
    controls.appendChild(nextButton);

    carousel.appendChild(controls);

    return carousel;
}

function navigateCarousel(carousel, direction) {
    const items = carousel.querySelectorAll('.carousel-item');
    let activeIndex = Array.from(items).findIndex(item => item.classList.contains('active'));

    items[activeIndex].classList.remove('active');

    if (direction === 'next') {
        activeIndex = activeIndex + 1 >= items.length ? 0 : activeIndex + 1;
    } else {
        activeIndex = activeIndex - 1 < 0 ? items.length - 1 : activeIndex - 1;
    }

    items[activeIndex].classList.add('active');
}

// STICKY NAV //
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.sticky-nav');
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








