// Header ve Footer Yükleyici - UTF-8 Desteği Eklenmiş

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
        const response = await fetch('header.html', {
            headers: {
                'Content-Type': 'text/html; charset=UTF-8'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const headerHTML = await response.text();
        
        // Header'ı sayfaya ekle
        const headerContainer = document.createElement('div');
        headerContainer.innerHTML = headerHTML;
        
        // Body'nin en başına ekle
        document.body.insertBefore(headerContainer.firstElementChild, document.body.firstChild);
        
        console.log('Header başarıyla yüklendi');
    } catch (error) {
        console.error('Header yüklenemedi:', error);
    }
}

async function loadFooter() {
    try {
        const response = await fetch('footer.html', {
            headers: {
                'Content-Type': 'text/html; charset=UTF-8'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const footerHTML = await response.text();
        
        // Footer'ı sayfaya ekle
        const footerContainer = document.createElement('div');
        footerContainer.innerHTML = footerHTML;
        
        // Body'nin sonuna ekle
        document.body.appendChild(footerContainer.firstElementChild);
        
        console.log('Footer başarıyla yüklendi');
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
