// Hakkımızda Sayfası JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Resim slider'ını başlat
    initImageSlider();
    
    // Scroll animasyonlarını başlat
    initScrollAnimations();
    
    // İstatistik sayaçlarını başlat
    initStatCounters();
});

// Resim Slider Fonksiyonu
function initImageSlider() {
    const sliderImages = document.querySelectorAll('.slider-img');
    
    if (sliderImages.length === 0) return;
    
    let currentIndex = 0;
    
    // İlk resmi aktif yap
    sliderImages[0].classList.add('active');
    
    // Her 3 saniyede bir resmi değiştir
    setInterval(() => {
        // Mevcut aktif resmi pasif yap
        sliderImages[currentIndex].classList.remove('active');
        
        // Sonraki index'i hesapla
        currentIndex = (currentIndex + 1) % sliderImages.length;
        
        // Yeni resmi aktif yap
        sliderImages[currentIndex].classList.add('active');
    }, 3000);
}

// Scroll Animasyonları
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Özel animasyonlar
                if (entry.target.classList.contains('feature-card')) {
                    const cards = document.querySelectorAll('.feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(30px)';
                            
                            setTimeout(() => {
                                card.style.transition = 'all 0.6s ease';
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        }, index * 100);
                    });
                }
                
                if (entry.target.classList.contains('step')) {
                    const steps = document.querySelectorAll('.step');
                    steps.forEach((step, index) => {
                        setTimeout(() => {
                            step.style.opacity = '0';
                            step.style.transform = 'scale(0.8)';
                            
                            setTimeout(() => {
                                step.style.transition = 'all 0.5s ease';
                                step.style.opacity = '1';
                                step.style.transform = 'scale(1)';
                            }, 50);
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    // Animasyon için elementleri seç
    const elementsToAnimate = document.querySelectorAll(
        '.about-section, .mission-box, .vision-box, .feature-card, .step, .stat-item, .cta-section'
    );
    
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// İstatistik Sayaçları
function initStatCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    if (stats.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 saniye
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    // Sayıyı formatla (örn: 5000 -> 5,000)
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Hero bölümü parallax efekti
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.about-hero');
    
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Smooth scroll için butonlar
const ctaButtons = document.querySelectorAll('.cta-buttons .btn');

ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Kart hover efektleri
const cards = document.querySelectorAll('.feature-card, .mission-box, .vision-box');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Sayfa yüklenme animasyonu
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    console.log('Hakkımızda Sayfası Yükleme Süresi:', loadTime + 'ms');
});

// Export fonksiyonlar (test için)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initImageSlider,
        initScrollAnimations,
        initStatCounters
    };
}