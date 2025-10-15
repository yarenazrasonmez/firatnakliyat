// Header ve Footer Yükleyici

document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
});

async function loadComponents() {
    await loadHeader();
    await loadFooter();
    setActiveNavLink();
}

async function loadHeader() {
    try {
        const response = await fetch('header.html');
        const headerHTML = await response.text();
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    } catch (error) {
        console.error('Header yüklenemedi:', error);
    }
}

async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        const footerHTML = await response.text();
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    } catch (error) {
        console.error('Footer yüklenemedi:', error);
    }
}

function setActiveNavLink() {
    // Mevcut sayfa adını al
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Tüm navigasyon linklerini al
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Aktif sayfayı işaretle
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
