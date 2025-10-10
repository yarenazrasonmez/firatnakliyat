// Hero Background Slider

document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();
});

function initHeroSlider() {
    const heroSection = document.getElementById('heroSection');
    if (!heroSection) return;

    // Resim listesi
    const images = [
        'images/resim1.jpg',
        'images/png1.jpg',
        'images/png2.jpg',
        'images/png4.jpg'
    ];

    let currentIndex = 0;

    // İlk arka plan resmini ayarla
    updateBackground(heroSection, images[currentIndex]);

    // Her 2 saniyede bir resmi değiştir
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateBackground(heroSection, images[currentIndex]);
    }, 2000);
}

function updateBackground(element, imageUrl) {
    // Yumuşak geçiş efekti için
    element.style.transition = 'background-image 1s ease-in-out';
    
    // Yeni arka plan resmini ayarla
    element.style.backgroundImage = `
        linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.7) 25%, rgba(51, 65, 85, 0.6) 50%, rgba(71, 85, 105, 0.7) 75%, rgba(100, 116, 139, 0.8) 100%),
        url('${imageUrl}')
    `;
}