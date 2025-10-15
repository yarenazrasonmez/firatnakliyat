// Ana JavaScript Dosyası - Genel İşlevler + Logo Animasyonları

document.addEventListener('DOMContentLoaded', function() {
    // Logo animasyonlarını başlat
    initLogoAnimations();
    
    // Navigasyon işlevleri
    initNavigation();
    
    // Scroll animasyonları
    initScrollAnimations();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Loading animations
    initLoadingAnimations();
    
    // Mobile menu
    initMobileMenu();
    
    // Scroll to top
    addScrollToTop();
});

// === LOGO ANIMASYONLARI ===
function initLogoAnimations() {
    const logoWrapper = document.querySelector('.logo-wrapper');
    const starGroup = document.querySelector('.star-group');
    const speedLines = document.querySelectorAll('.speed-lines line');

    if (!logoWrapper) return;

    // Logo'ya hover yapıldığında animasyon hızını artır
    logoWrapper.addEventListener('mouseenter', function() {
        if(starGroup) {
            starGroup.style.animationDuration = '3s';
        }
        speedLines.forEach(line => {
            line.style.animationDuration = '0.8s';
        });
    });

    // Logo'dan hover çıkıldığında normal hıza dön
    logoWrapper.addEventListener('mouseleave', function() {
        if(starGroup) {
            starGroup.style.animationDuration = '6s';
        }
        speedLines.forEach(line => {
            line.style.animationDuration = '1.2s';
        });
    });

    // Mobil cihazlarda daha iyi performans için animasyon iyileştirmesi
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if(isMobile && starGroup) {
        starGroup.style.animationDuration = '8s';
    }

    console.log('✓ FIRAT NAKLIYAT Logo sistemi yüklendi');
}

// === NAVIGASYON İŞLEVLERİ ===
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
        
        // Hover efektleri
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// === SCROLL ANIMASYONLARI ===
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
            }
        });
    }, observerOptions);

    // Animasyon için elemanları seç
    const elementsToAnimate = document.querySelectorAll('.card, .feature, .service-card, .step-item, .skill-category, .value-item, .goal-card');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// === SMOOTH SCROLLING ===
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === LOADING ANIMASYONLARI ===
function initLoadingAnimations() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        body.style.opacity = '1';
        
        // Hero içerikleri için sıralı animasyon
        const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero-buttons');
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, (index + 1) * 200);
        });
    });
}

// === MOBILE MENU ===
function initMobileMenu() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (!nav || !navLinks) return;
    
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            display: block;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 5px;
            transition: background 0.3s ease;
        `;
        
        nav.appendChild(mobileMenuBtn);
        
        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
            }
        });
    }
    
    // Window resize event
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileMenuBtn) {
                mobileMenuBtn.remove();
            }
        }
    });
}

// === SCROLL TO TOP ===
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.classList.add('scroll-to-top');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    const toggleScrollToTop = debounce(() => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(100px)';
        }
    }, 100);
    
    window.addEventListener('scroll', toggleScrollToTop);
    
    // Click event
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
        this.style.transform = 'translateY(0) scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
        if (window.pageYOffset > 300) {
            this.style.transform = 'translateY(0)';
        }
    });
}

// === UTILITY FUNCTIONS ===
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showButtonLoading(button, loadingText = 'Yükleniyor...') {
    const originalText = button.textContent;
    button.textContent = loadingText;
    button.disabled = true;
    button.classList.add('loading');
    
    return function hideLoading() {
        button.textContent = originalText;
        button.disabled = false;
        button.classList.remove('loading');
    };
}

// === ERROR HANDLING ===
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// === PERFORMANCE MONITORING ===
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log('Sayfa Yükleme Süresi:', loadTime + 'ms');
        
        if (loadTime > 3000) {
            console.warn('Sayfa yavaş yüklendi. Kaynakları optimize etmeyi düşünün.');
        }
    }
});

// === DARK MODE HANDLING ===
function handleDarkMode() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function updateDarkMode(e) {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
    
    updateDarkMode(darkModeMediaQuery);
    darkModeMediaQuery.addEventListener('change', updateDarkMode);
}

document.addEventListener('DOMContentLoaded', function() {
    handleDarkMode();
});

// === EXPORT FOR TESTING ===
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        showButtonLoading,
        initScrollAnimations,
        initSmoothScrolling
    };
}

// === GLOBAL UTILITIES ===
window.WebSiteUtils = {
    debounce,
    showButtonLoading,
    initScrollAnimations,
    initSmoothScrolling
};
