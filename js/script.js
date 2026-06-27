// ========================================
// 1. DARK / LIGHT MODE TOGGLE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    const icon = toggleBtn.querySelector('i');
    
    // Check if user has a saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      if (icon) icon.className = 'fas fa-sun';
    }
    
    toggleBtn.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      
      if (document.body.classList.contains('dark-mode')) {
        if (icon) icon.className = 'fas fa-sun';
        localStorage.setItem('darkMode', 'enabled');
      } else {
        if (icon) icon.className = 'fas fa-moon';
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }
});

// ========================================
// 2. PRODUCT FILTERING (for products.html)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productItems = document.querySelectorAll('.product-item');
  
  if (filterButtons.length > 0 && productItems.length > 0) {
    
    // Set "All" as active by default
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) {
      allBtn.classList.add('active-filter', 'btn-primary');
      allBtn.classList.remove('btn-outline-primary');
    }
    
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(b => {
          b.classList.remove('active-filter', 'btn-primary');
          b.classList.add('btn-outline-primary');
        });
        
        // Add active class to clicked button
        this.classList.add('active-filter', 'btn-primary');
        this.classList.remove('btn-outline-primary');
        
        const filter = this.dataset.filter;
        
        // Show/hide products with smooth animation
        productItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }
});

// ========================================
// 3. CONTACT FORM VALIDATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const successDiv = document.getElementById('formSuccess');
      
      // Reset validation states
      [name, email, message].forEach(f => {
        if (f) f.classList.remove('is-invalid');
      });
      
      let isValid = true;
      
      // Validate Name
      if (!name || !name.value.trim()) {
        if (name) name.classList.add('is-invalid');
        isValid = false;
      }
      
      // Validate Email
      if (!email || !email.value.trim() || !email.value.includes('@')) {
        if (email) email.classList.add('is-invalid');
        isValid = false;
      }
      
      // Validate Message
      if (!message || !message.value.trim()) {
        if (message) message.classList.add('is-invalid');
        isValid = false;
      }
      
      if (isValid) {
        // Show success message
        if (successDiv) {
          successDiv.classList.remove('d-none');
          successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Thank you ' + name.value + '! We\'ll get back to you within 24 hours.';
        }
        
        // Reset form
        contactForm.reset();
        
        // Hide success after 5 seconds
        setTimeout(() => {
          if (successDiv) successDiv.classList.add('d-none');
        }, 5000);
      }
    });
  }
});

// ========================================
// 4. QUICK VIEW MODAL (for index.html & products.html)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const quickViewBtns = document.querySelectorAll('.quick-view');
  
  if (quickViewBtns.length > 0) {
    // Check if modal exists, if not create it
    if (!document.getElementById('quickViewModal')) {
      const modalHTML = `
        <div class="modal fade" id="quickViewModal" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalProductName">Product</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body" id="modalProductBody">
                <p>Product details will appear here.</p>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    const modalTitle = document.getElementById('modalProductName');
    const modalBody = document.getElementById('modalProductBody');
    
    quickViewBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const product = this.dataset.product;
        modalTitle.textContent = product;
        modalBody.innerHTML = `
          <div class="text-center">
            <i class="fas fa-box fa-3x text-primary mb-3"></i>
            <h5>${product}</h5>
            <p class="text-muted">Premium quality electronic product.</p>
            <ul class="text-start">
              <li>100% authentic product</li>
              <li>2-year warranty</li>
              <li>Free delivery in Nairobi</li>
              <li>30-day return policy</li>
            </ul>
            <button class="btn btn-primary w-100">Add to Cart</button>
          </div>
        `;
        modal.show();
      });
    });
  }
});

// ========================================
// 5. QUANTITY SELECTOR (for product-detail.html)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const qtyInput = document.getElementById('quantity');
  const decreaseBtn = document.getElementById('decreaseQty');
  const increaseBtn = document.getElementById('increaseQty');
  
  if (qtyInput && decreaseBtn && increaseBtn) {
    decreaseBtn.addEventListener('click', function() {
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) {
        qtyInput.value = val - 1;
        qtyInput.dispatchEvent(new Event('change'));
      }
    });
    
    increaseBtn.addEventListener('click', function() {
      let val = parseInt(qtyInput.value) || 1;
      if (val < 10) {
        qtyInput.value = val + 1;
        qtyInput.dispatchEvent(new Event('change'));
      }
    });
    
    qtyInput.addEventListener('change', function() {
      let val = parseInt(this.value) || 1;
      if (val < 1) this.value = 1;
      if (val > 10) this.value = 10;
    });
  }
});

// ========================================
// 6. SMOOTH SCROLL TO TOP (Bonus Feature)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Create "Back to Top" button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'backToTop';
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #0a192f;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    z-index: 999;
  `;
  
  document.body.appendChild(backToTopBtn);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
    }
  });
  
  // Scroll to top when clicked
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Dark mode support for the back-to-top button
  const darkModeObserver = new MutationObserver(function() {
    if (document.body.classList.contains('dark-mode')) {
      backToTopBtn.style.background = '#2d2d44';
    } else {
      backToTopBtn.style.background = '#0a192f';
    }
  });
  darkModeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
});

// ========================================
// 7. SHOW ACTIVE NAV LINK (Optional Enhancement)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else if (currentPage === '' && href === 'index.html') {
      link.classList.add('active');
    }
  });
});