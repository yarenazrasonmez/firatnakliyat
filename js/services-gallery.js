// Services Gallery JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initServicesGallery();
});

function initServicesGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length === 0) return;

    // Lightbox oluştur
    createLightbox();

    // Her galeri öğesine tıklama eventi ekle
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-overlay span').textContent;
            openLightbox(img.src, caption);
        });

        // Animasyon gecikmesi
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    lightbox.id = 'galleryLightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" onclick="closeLightbox()">×</button>
            <img id="lightboxImage" src="" alt="Galeri Görseli">
            <div class="lightbox-caption" id="lightboxCaption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Lightbox dışına tıklayınca kapat
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // ESC tuşu ile kapat
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

function openLightbox(src, caption) {
    const lightbox = document.getElementById('galleryLightbox');
    const img = document.getElementById('lightboxImage');
    const captionEl = document.getElementById('lightboxCaption');

    img.src = src;
    captionEl.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Global fonksiyon olarak da tanımla
window.closeLightbox = closeLightbox;