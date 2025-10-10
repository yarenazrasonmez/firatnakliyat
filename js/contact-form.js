// Contact Form JavaScript - E-posta alanı kaldırılmış

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    addFormAnimations();
});

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    // Form validation
    setupFormValidation(form);
    
    // Form submission
    form.addEventListener('submit', handleFormSubmission);
    
    // Real-time validation
    setupRealTimeValidation(form);
    
    // Form field animations
    setupFieldAnimations(form);
}

function setupFormValidation(form) {
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-ZğĞıİçÇşŞüÜöÖ\s]+$/,
            message: 'Ad en az 2 karakter olmalı ve sadece harf içermelidir.'
        },
        lastName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-ZğĞıİçÇşŞüÜöÖ\s]+$/,
            message: 'Soyad en az 2 karakter olmalı ve sadece harf içermelidir.'
        },
        phone: {
            required: true,
            pattern: /^[\+]?[0-9\s\-\(\)]{10,}$/,
            message: 'Geçerli bir telefon numarası giriniz.'
        },
        serviceType: {
            required: true,
            message: 'Lütfen hizmet türünü seçiniz.'
        },
        message: {
            required: true,
            minLength: 20,
            maxLength: 1000,
            message: 'Mesaj en az 20 karakter olmalıdır.'
        },
        agreement: {
            required: true,
            message: 'Lütfen veri işleme iznini onaylayınız.'
        }
    };
    
    form.validationRules = validationRules;
}

function validateField(field, rules) {
    const value = field.type === 'checkbox' ? field.checked : field.value.trim();
    const fieldGroup = field.closest('.form-group');
    const errorElement = fieldGroup.querySelector('.form-error');
    
    // Required validation
    if (rules.required && (!value || (field.type === 'checkbox' && !field.checked))) {
        showFieldError(fieldGroup, errorElement, rules.message || `${field.name} alanı zorunludur.`);
        return false;
    }
    
    // Skip other validations if field is empty and not required
    if (!rules.required && !value) {
        hideFieldError(fieldGroup, errorElement);
        return true;
    }
    
    // Pattern validation
    if (rules.pattern && value && !rules.pattern.test(value)) {
        showFieldError(fieldGroup, errorElement, rules.message);
        return false;
    }
    
    // Length validation
    if (rules.minLength && value.length < rules.minLength) {
        showFieldError(fieldGroup, errorElement, rules.message);
        return false;
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
        showFieldError(fieldGroup, errorElement, rules.message);
        return false;
    }
    
    hideFieldError(fieldGroup, errorElement);
    return true;
}

function showFieldError(fieldGroup, errorElement, message) {
    fieldGroup.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Smooth scroll to error if needed
    if (fieldGroup.getBoundingClientRect().top < 0) {
        fieldGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function hideFieldError(fieldGroup, errorElement) {
    fieldGroup.classList.remove('error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

function setupRealTimeValidation(form) {
    const fields = form.querySelectorAll('input, select, textarea');
    
    fields.forEach(field => {
        // Validation on blur
        field.addEventListener('blur', function() {
            const rules = form.validationRules[this.name];
            if (rules) {
                validateField(this, rules);
            }
        });
        
        // Clear error on input
        field.addEventListener('input', function() {
            const fieldGroup = this.closest('.form-group');
            if (fieldGroup.classList.contains('error')) {
                // Delay validation to avoid too frequent validation
                clearTimeout(this.validationTimeout);
                this.validationTimeout = setTimeout(() => {
                    const rules = form.validationRules[this.name];
                    if (rules) {
                        validateField(this, rules);
                    }
                }, 500);
            }
        });
    });
}

function setupFieldAnimations(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Focus animations
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.transform = 'translateY(-1px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            this.style.transform = 'translateY(0)';
        });
        
        // Hover animations for selects
        if (input.tagName === 'SELECT') {
            input.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-1px)';
            });
            
            input.addEventListener('mouseleave', function() {
                if (document.activeElement !== this) {
                    this.style.transform = 'translateY(0)';
                }
            });
        }
    });
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.btn-submit');
    const formData = new FormData(form);
    
    // Validate all fields
    if (!validateForm(form)) {
        showFormMessage('Lütfen form hatalarını düzeltin ve tekrar deneyin.', 'error');
        return;
    }
    
    // Show loading state
    const hideLoading = showButtonLoading(submitBtn, 'Gönderiliyor...');
    showFormLoading(form);
    
    // Simulate form submission (replace with actual endpoint)
    simulateFormSubmission(formData)
        .then(response => {
            hideLoading();
            hideFormLoading(form);
            
            if (response.success) {
                showFormMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
                form.reset();
                
                // Animate form reset
                animateFormReset(form);
                
                // Auto-hide success message after 5 seconds
                setTimeout(() => {
                    hideFormMessage();
                }, 5000);
                
            } else {
                throw new Error(response.message || 'Form gönderilirken bir hata oluştu.');
            }
        })
        .catch(error => {
            hideLoading();
            hideFormLoading(form);
            showFormMessage(error.message || 'Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.', 'error');
        });
}

function validateForm(form) {
    const fields = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    fields.forEach(field => {
        const rules = form.validationRules[field.name];
        if (rules && !validateField(field, rules)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function simulateFormSubmission(formData) {
    // This simulates an API call - replace with actual endpoint
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Log form data for development
            console.log('Form Data:');
            for (let [key, value] of formData.entries()) {
                console.log(key + ':', value);
            }
            
            // Simulate success (90% success rate for demo)
            if (Math.random() > 0.1) {
                resolve({ success: true, message: 'Form başarıyla gönderildi!' });
            } else {
                reject({ message: 'Simüle edilmiş hata - tekrar deneyin.' });
            }
        }, 2000); // 2 second delay to simulate network request
    });
}

function showFormMessage(message, type) {
    hideFormMessage(); // Hide existing message first
    
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    const form = document.getElementById('contactForm');
    form.insertBefore(messageElement, form.firstChild);
    
    // Animate in
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 100);
    
    // Auto-scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideFormMessage() {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.classList.remove('show');
        setTimeout(() => {
            existingMessage.remove();
        }, 300);
    }
}

function showFormLoading(form) {
    let overlay = form.querySelector('.form-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'form-overlay';
        overlay.innerHTML = '<div class="spinner"></div>';
        form.style.position = 'relative';
        form.appendChild(overlay);
    }
    overlay.classList.add('show');
}

function hideFormLoading(form) {
    const overlay = form.querySelector('.form-overlay');
    if (overlay) {
        overlay.classList.remove('show');
    }
}

function animateFormReset(form) {
    const fields = form.querySelectorAll('input, select, textarea');
    
    fields.forEach((field, index) => {
        setTimeout(() => {
            field.style.transform = 'scale(0.95)';
            field.style.opacity = '0.5';
            
            setTimeout(() => {
                field.style.transform = 'scale(1)';
                field.style.opacity = '1';
            }, 200);
        }, index * 50);
    });
}

function showButtonLoading(button, loadingText) {
    const originalText = button.querySelector('.btn-text').textContent;
    const btnText = button.querySelector('.btn-text');
    const btnLoading = button.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    btnLoading.textContent = loadingText;
    
    button.disabled = true;
    button.classList.add('loading');
    
    return function hideLoading() {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        button.disabled = false;
        button.classList.remove('loading');
    };
}

// Character counter for textarea
function addCharacterCounter() {
    const textarea = document.getElementById('message');
    if (!textarea) return;
    
    const formGroup = textarea.closest('.form-group');
    const maxLength = 1000;
    
    // Create counter element
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.cssText = `
        text-align: right;
        font-size: 0.9rem;
        color: #666;
        margin-top: 0.5rem;
    `;
    
    formGroup.appendChild(counter);
    
    function updateCounter() {
        const currentLength = textarea.value.length;
        counter.textContent = `${currentLength}/${maxLength}`;
        
        if (currentLength > maxLength * 0.9) {
            counter.style.color = '#dc3545';
        } else if (currentLength > maxLength * 0.8) {
            counter.style.color = '#ffc107';
        } else {
            counter.style.color = '#666';
        }
        
        if (currentLength > maxLength) {
            textarea.style.borderColor = '#dc3545';
        } else {
            textarea.style.borderColor = '#e9ecef';
        }
    }
    
    textarea.addEventListener('input', updateCounter);
    updateCounter(); // Initial count
}

// Auto-resize textarea
function addAutoResize() {
    const textarea = document.getElementById('message');
    if (!textarea) return;
    
    function resize() {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }
    
    textarea.addEventListener('input', resize);
    resize(); // Initial resize
}

// Add field focus indicators
function addFocusIndicators() {
    const fields = document.querySelectorAll('input, select, textarea');
    
    fields.forEach(field => {
        const label = field.previousElementSibling;
        
        field.addEventListener('focus', function() {
            if (label && label.tagName === 'LABEL') {
                label.style.color = '#3b82f6';
                label.style.transform = 'translateY(-2px)';
            }
        });
        
        field.addEventListener('blur', function() {
            if (label && label.tagName === 'LABEL') {
                label.style.color = '#334155';
                label.style.transform = 'translateY(0)';
            }
        });
    });
}

// Form analytics (basic tracking)
function trackFormInteraction(action, field = null) {
    const data = {
        action: action,
        field: field,
        timestamp: new Date().toISOString(),
        url: window.location.href
    };
    
    console.log('Form Analytics:', data);
    
    // Here you would send data to your analytics service
    // Example: sendToAnalytics(data);
}

// Add form animations
function addFormAnimations() {
    const formSections = document.querySelectorAll('.contact-form-section, .contact-info-section');
    
    formSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, (index + 1) * 200);
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    addCharacterCounter();
    addAutoResize();
    addFocusIndicators();
    
    // Track form start
    const form = document.getElementById('contactForm');
    if (form) {
        const fields = form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.addEventListener('focus', function() {
                trackFormInteraction('field_focus', this.name);
            }, { once: true });
        });
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById('contactForm');
        if (form && document.activeElement.closest('form') === form) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    }
});

// Debounce function (utility)
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

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        validateForm,
        showFormMessage,
        hideFormMessage
    };
}