// Contact Stats Animation - Güncellenmiş

document.addEventListener('DOMContentLoaded', function() {
    // İstatistikleri görünene kadar başlatma
    initStatsAnimation();
    // Haritayı görünür olunca yükle
    initLazyMapEmbed();
});

function initStatsAnimation() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(statsSection);
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((statNumber, index) => {
        const target = parseInt(statNumber.getAttribute('data-target'));
        const duration = 2000; // 2 saniye
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        // Gecikme ile başlat
        setTimeout(() => {
            const timer = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    statNumber.textContent = formatNumber(target);
                    clearInterval(timer);
                } else {
                    statNumber.textContent = formatNumber(Math.floor(current));
                }
            }, 16);
        }, index * 200);
    });
}

function formatNumber(num) {
    // Sayıyı formatla (örn: 1000 -> 1,000)
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Harita lazy-load: placeholder görünür olduğunda gerçek iframe'i ekle
function initLazyMapEmbed() {
    const placeholder = document.getElementById('mapLazyPlaceholder');
    if (!placeholder) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = document.createElement('iframe');
                iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.7584586722847!2d28.97794831541842!3d41.01127797930123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9bd6570f4e1%3A0xe8c5c39dcd84b5!2zVGFrc2ltLCDEsXN0YW5idWw!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str';
                iframe.width = '100%';
                iframe.height = '100%';
                iframe.style.border = '0';
                iframe.loading = 'lazy';
                iframe.referrerPolicy = 'no-referrer-when-downgrade';
                placeholder.replaceWith(iframe);
                obs.disconnect();
            }
        });
    }, { rootMargin: '200px 0px' });

    observer.observe(placeholder);
}

// Stat cards hover animations
document.addEventListener('DOMContentLoaded', function() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateStats,
        formatNumber
    };
}