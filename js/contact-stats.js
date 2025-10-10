// Contact Stats Animation - Güncellenmiş

document.addEventListener('DOMContentLoaded', function() {
    initStatsAnimation();
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