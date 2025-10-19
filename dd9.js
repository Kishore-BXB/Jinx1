document.addEventListener('DOMContentLoaded', () => {
    // Select all navigation links and the main content sections
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    const tryNowButton = document.querySelector('.try-now');
    const ctaButton = document.querySelector('.cta-btn');
    const uploadBox = document.querySelector('.upload-box');
    const fileInput = document.getElementById('video-upload');

    // Function to show a specific section and hide all others
    function showSection(targetId) {
        // Hide all sections first
        sections.forEach(section => {
            section.classList.add('hidden');
        });
        // Show the target section
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
    }

    // Function to update the 'active' class on navigation links
    function updateActiveLink(targetId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the target section ID
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }

    // 1. Handle navigation clicks for all links (This fixes the ordering/display issue)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            showSection(targetId);
            updateActiveLink(targetId);
            // Scroll smoothly to the top of the main content area
            document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 2. Handle 'Try Now' and 'Try Detection Now' buttons
    [tryNowButton, ctaButton].forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href');
            showSection(targetId);
            updateActiveLink(targetId);
            document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // 3. Handle Upload Box interaction
    if (uploadBox) {
        // Trigger the hidden file input when the upload box is clicked
        uploadBox.addEventListener('click', () => {
            fileInput.click();
        });
    }

    // 4. Handle Contact Form submission (Mock submission)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent successfully!');
            contactForm.reset(); 
        });
    }

    // 5. Initialize the page: Show the Home section and set active link on load
    const initialHash = window.location.hash || '#home';
    showSection(initialHash);
    updateActiveLink(initialHash);

    // Optional: Handle browser back/forward buttons (hash change)
    window.addEventListener('hashchange', () => {
        const targetId = window.location.hash || '#home';
        showSection(targetId);
        updateActiveLink(targetId);
    });
});
document.addEventListener('DOMContentLoaded', (event) => {
    const clearAllButton = document.getElementById('clear-all-btn');
    const videoListContainer = document.getElementById('video-list');
    const emptyListMessage = document.getElementById('empty-list-message');
    
    // Function to clear all videos
    function clearVideoContent() {
        // Confirm with the user before deleting all content
        if (confirm("Are you sure you want to clear ALL analyzed videos? This action cannot be undone.")) {
            // Remove all children elements inside the video-list container
            while (videoListContainer.firstChild) {
                videoListContainer.removeChild(videoListContainer.firstChild);
            }

            // Show the "empty list" message
            emptyListMessage.style.display = 'block';

            // Re-append the empty list message (if it was removed by the loop)
            videoListContainer.appendChild(emptyListMessage);
            
            console.log("Video content cleared.");
        }
    }

    // Attach the event listener to the button
    if (clearAllButton) {
        clearAllButton.addEventListener('click', clearVideoContent);
    }
});