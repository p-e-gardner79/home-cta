document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.getElementById('main-nav');
    const desktopLoginButton = document.querySelector('.login-button'); // Renamed for clarity

    // Function to close all dropdowns
    function closeAllDropdowns() {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    // Toggle individual dropdowns (for both desktop and mobile)
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');

        dropbtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior

            // Close other open dropdowns *unless* they are the parent of the current dropdown
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                    otherDropdown.classList.remove('active');
                }
            });

            // Toggle the 'active' class on the clicked dropdown
            dropdown.classList.toggle('active');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        // If the click is not inside a dropdown OR the hamburger menu/mobile nav
        if (!event.target.closest('.dropdown') && !event.target.closest('.hamburger-menu') && !event.target.closest('#main-nav')) {
            closeAllDropdowns();
            // Also close the mobile menu if open and clicked outside
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            }
        }
    });

    // Hamburger menu toggle for mobile
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent click from bubbling up to document and closing immediately
            mainNav.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
            closeAllDropdowns(); // Close any open dropdowns when toggling the main menu
        });
    }

    // Handle login button visibility based on screen size
    function updateLoginButtonVisibility() {
        if (window.innerWidth <= 1200) {
            // Hide the desktop login button
            if (desktopLoginButton) {
                desktopLoginButton.style.display = 'none';
            }

            // Check if mobile login link already exists
            let mobileLoginListItem = mainNav.querySelector('.mobile-login-link');

            if (!mobileLoginListItem) { // If it doesn't exist, create and append it
                mobileLoginListItem = document.createElement('li');
                mobileLoginListItem.classList.add('mobile-login-link');

                const mobileLoginAnchor = document.createElement('a');
                mobileLoginAnchor.href = "#"; // Or your actual login page URL
                mobileLoginAnchor.textContent = 'Log in';
                mobileLoginListItem.appendChild(mobileLoginAnchor);

                mainNav.appendChild(mobileLoginListItem); // Add to the end of the mobile nav
            }
        } else {
            // Show the desktop login button
            if (desktopLoginButton) {
                desktopLoginButton.style.display = ''; // Revert to default display
            }

            // Remove the mobile login link if it exists
            const mobileLoginListItem = mainNav.querySelector('.mobile-login-link');
            if (mobileLoginListItem) {
                mobileLoginListItem.remove();
            }
        }
    }

    // Call on load and on resize
    updateLoginButtonVisibility();
    window.addEventListener('resize', updateLoginButtonVisibility);
});