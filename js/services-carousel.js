// Services Carousel JavaScript - 3 Kart için Güncellenmiş

document.addEventListener('DOMContentLoaded', function() {
    initServicesCarousel();
});

let currentIndex = 0;
let autoplayInterval = null;
let isTransitioning = false;

function initServicesCarousel() {
    const cards = document.querySelectorAll('.service-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (!cards.length || !prevBtn || !nextBtn) return;

    // İlk kartı aktif yap
    updateCarousel(0);

    // Buton olayları
    prevBtn.addEventListener('click', () => {
        if (!isTransitioning) {
            navigateCarousel(-1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (!isTransitioning) {
            navigateCarousel(1);
        }
    });

    // Klavye navigasyonu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && !isTransitioning) {
            navigateCarousel(-1);
        } else if (e.key === 'ArrowRight' && !isTransitioning) {
            navigateCarousel(1);
        }
    });

    // Otomatik oynatmayı başlat
    startAutoplay();

    // Hover'da otomatik oynatmayı durdur
    const carouselSection = document.querySelector('.services-carousel-section');
    if (carouselSection) {
        carouselSection.addEventListener('mouseenter', stopAutoplay);
        carouselSection.addEventListener('mouseleave', startAutoplay);
    }

    // Touch desteği
    addTouchSupport();
}

function navigateCarousel(direction) {
    const cards = document.querySelectorAll('.service-card');
    const totalCards = cards.length;

    isTransitioning = true;

    currentIndex += direction;

    // Döngüsel navigasyon
    if (currentIndex < 0) {
        currentIndex = totalCards - 1;
    } else if (currentIndex >= totalCards) {
        currentIndex = 0;
    }

    updateCarousel(currentIndex);

    // Transition tamamlandıktan sonra kilidi aç
    setTimeout(() => {
        isTransitioning = false;
    }, 600);

    // Otomatik oynatmayı sıfırla
    restartAutoplay();
}

function updateCarousel(index) {
    const cards = document.querySelectorAll('.service-card');
    const totalCards = cards.length;

    cards.forEach((card, i) => {
        // Tüm sınıfları temizle
        card.classList.remove('active', 'prev', 'next');
        
        // Pozisyon hesapla
        const position = (i - index + totalCards) % totalCards;

        if (position === 0) {
            // Aktif kart (ortada)
            card.classList.add('active');
        } else if (position === totalCards - 1) {
            // Önceki kart (solda)
            card.classList.add('prev');
        } else if (position === 1) {
            // Sonraki kart (sağda)
            card.classList.add('next');
        }
        // Diğer kartlar görünmez kalacak (sınıf yok)
    });
}

function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
        if (!isTransitioning) {
            navigateCarousel(1);
        }
    }, 3000); // 3 saniyede bir değiş
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}

function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
}

// Touch desteği (mobil için kaydırma)
function addTouchSupport() {
    const carousel = document.querySelector('.services-carousel');
    if (!carousel) return;

    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > minSwipeDistance && !isTransitioning) {
            if (swipeDistance > 0) {
                // Sağa kaydırma - önceki
                navigateCarousel(-1);
            } else {
                // Sola kaydırma - sonraki
                navigateCarousel(1);
            }
        }
    }
}

// Sayfa görünürlüğü değiştiğinde otomatik oynatmayı yönet
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAutoplay();
    } else {
        startAutoplay();
    }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        navigateCarousel,
        updateCarousel
    };
}