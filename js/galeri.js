// Galeri JavaScript - Modern Slider

document.addEventListener('DOMContentLoaded', function() {
    initGallerySlider();
    initKeyboardNavigation();
    initTouchSupport();
    // Görselleri ekranda oldukça yükle
    try { initLazyLoading(); } catch (e) {}
});

let currentSlide = 0;
let autoplayInterval = null;
let isTransitioning = false;

// Ana Galeri Slider
function initGallerySlider() {
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.gallery-slide');

    if (!prevBtn || !nextBtn || slides.length === 0) return;

    // Buton olayları
    prevBtn.addEventListener('click', () => {
        if (!isTransitioning) {
            changeSlide(currentSlide - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (!isTransitioning) {
            changeSlide(currentSlide + 1);
        }
    });

    // İndikatör olayları
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (!isTransitioning) {
                changeSlide(index);
            }
        });
    });

    // Otomatik oynatma başlat
    startAutoplay();

    // İlk görsel yüklendiğinde container boyutunu ayarla
    const firstImg = slides[0]?.querySelector('img');
    if (firstImg) {
        if (firstImg.complete && firstImg.naturalHeight !== 0) {
            adjustSliderHeight(0);
        } else {
            firstImg.onload = function() {
                adjustSliderHeight(0);
            };
        }
    }

    // Hover'da otomatik oynatmayı durdur
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', stopAutoplay);
        sliderWrapper.addEventListener('mouseleave', startAutoplay);
    }

    // Pencere boyutu değiştiğinde container boyutunu yeniden ayarla
    window.addEventListener('resize', () => {
        adjustSliderHeight(currentSlide);
    });
}

function changeSlide(newIndex) {
    const slides = document.querySelectorAll('.gallery-slide');
    const indicators = document.querySelectorAll('.indicator');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    
    if (newIndex < 0) {
        newIndex = slides.length - 1;
    } else if (newIndex >= slides.length) {
        newIndex = 0;
    }

    if (currentSlide === newIndex) return;

    isTransitioning = true;

    // Eski slide'ı gizle
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    // Yeni slide'ı göster
    currentSlide = newIndex;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');

    // Yeni görselin boyutuna göre container boyutunu ayarla
    adjustSliderHeight(newIndex);

    // Transition tamamlandıktan sonra kilidi aç
    setTimeout(() => {
        isTransitioning = false;
    }, 1000);

    // Otomatik oynatmayı sıfırla
    restartAutoplay();
}

function adjustSliderHeight(slideIndex) {
    const slides = document.querySelectorAll('.gallery-slide');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const activeSlide = slides[slideIndex];
    const activeImg = activeSlide.querySelector('img');
    
    if (activeImg && sliderWrapper) {
        // Eğer görsel yüklenmişse container boyutunu ayarla
        if (activeImg.complete && activeImg.naturalHeight !== 0) {
            const aspectRatio = activeImg.naturalHeight / activeImg.naturalWidth;
            const containerWidth = sliderWrapper.offsetWidth;
            const maxViewportHeight = window.innerHeight * 0.8; // Viewport'un %80'i
            let newHeight = Math.min(containerWidth * aspectRatio, maxViewportHeight);
            newHeight = Math.max(newHeight, 300); // Minimum 300px
            
            sliderWrapper.style.height = newHeight + 'px';
        } else {
            // Görsel henüz yüklenmemişse yüklenme olayını bekle
            activeImg.onload = function() {
                const aspectRatio = this.naturalHeight / this.naturalWidth;
                const containerWidth = sliderWrapper.offsetWidth;
                const maxViewportHeight = window.innerHeight * 0.8;
                let newHeight = Math.min(containerWidth * aspectRatio, maxViewportHeight);
                newHeight = Math.max(newHeight, 300);
                
                sliderWrapper.style.height = newHeight + 'px';
            };
        }
    }
}

function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
        changeSlide(currentSlide + 1);
    }, 3500); // 3.5 saniyede bir değiş (daha az CPU / daha akıcı)
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

// Klavye Navigasyonu
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && !isTransitioning) {
            changeSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight' && !isTransitioning) {
            changeSlide(currentSlide + 1);
        }
    });
}

// Touch Support (Mobil için kaydırma)
function initTouchSupport() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (!sliderWrapper) return;

    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        sliderWrapper.classList.add('swiping');
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        sliderWrapper.classList.remove('swiping');
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > minSwipeDistance && !isTransitioning) {
            if (swipeDistance > 0) {
                // Sağa kaydırma - önceki
                changeSlide(currentSlide - 1);
            } else {
                // Sola kaydırma - sonraki
                changeSlide(currentSlide + 1);
            }
        }
    }
}

// Preload Images (Performans için)
function preloadImages() {
    const slides = document.querySelectorAll('.gallery-slide img');
    slides.forEach(img => {
        if (img.dataset.src) {
            const newImg = new Image();
            newImg.src = img.dataset.src;
        }
    });
}

// Sayfa yüklendiğinde resimleri önceden yükle
window.addEventListener('load', preloadImages);

// Lazy Loading için Intersection Observer
function initLazyLoading() {
    const images = document.querySelectorAll('.gallery-slide img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    images.forEach(img => imageObserver.observe(img));
}

// Sayfa görünürlüğü değiştiğinde otomatik oynatmayı yönet
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAutoplay();
    } else {
        startAutoplay();
    }
});

// Scroll animasyonları
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.gallery-intro, .main-gallery-slider, .gallery-cta');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
        observer.observe(element);
    });
}

// Sayfa yüklendiğinde scroll animasyonlarını başlat
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
});

// Performance Monitoring
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Galeri Sayfa Yükleme Süresi: ${loadTime}ms`);
    }
}

window.addEventListener('load', logPerformance);

// Analytics tracking (opsiyonel)
function trackGalleryView(index) {
    console.log(`Görüntülenen resim: ${index + 1}`);
    // Buraya analytics kodu eklenebilir
}

// Resim değiştiğinde tracking
const originalChangeSlide = changeSlide;
changeSlide = function(newIndex) {
    originalChangeSlide(newIndex);
    trackGalleryView(currentSlide);
};

// Export fonksiyonlar (test için)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        changeSlide,
        currentSlide: () => currentSlide
    };
}

// Global erişim için
window.GalleryApp = {
    changeSlide,
    currentSlide: () => currentSlide,
    startAutoplay,
    stopAutoplay
};