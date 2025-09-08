    function navigateTo(page) {
        // Add loading animation to the clicked block
        const clickedBlock = event.target.closest('.dashboard-block');
        if (clickedBlock) {
            // Navigate time
            setTimeout(() => {
                window.location.href = page;
            }, 300);

        } else {
            // Fallback direct navigation
            window.location.href = page;
        }
    }
    //DOM content loading
    document.addEventListener('DOMContentLoaded', function() {
        const dashboardBlocks = document.querySelectorAll('.dashboard-block');
        
        dashboardBlocks.forEach(block => {
            // Add keyboard navigation support
            block.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
            
            block.addEventListener('mouseleave', function() {
                if (!this.style.opacity || this.style.opacity === '1') {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                }
            });
        });
        
        addStatusIndicators();
    });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            // Reset any loading states when returning to page
            resetLoadingStates();
        }
    });

    // Reset loading states
    function resetLoadingStates() {
        const blocks = document.querySelectorAll('.dashboard-block');
        blocks.forEach(block => {
            block.style.transform = '';
            block.style.opacity = '';
            
            const arrow = block.querySelector('.block-arrow i');
            if (arrow && arrow.classList.contains('fa-spinner')) {
                arrow.className = 'fas fa-chevron-right';
            }
        });
    }

    // Add error handling
    window.addEventListener('error', function(e) {
        console.error('Navigation error:', e);
        resetLoadingStates();
    });