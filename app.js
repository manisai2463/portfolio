document.addEventListener('DOMContentLoaded', () => {

    /* --- Certificate Modal Logic --- */
    const modal = document.getElementById('certModal');
    const closeBtn = document.querySelector('.close-modal');
    const certFrame = document.getElementById('certFrame');

    window.openCertModal = function(driveId) {
        // Standard view: "/preview" for Google Drive
        certFrame.src = `https://drive.google.com/file/d/${driveId}/preview`;
        modal.classList.add('show');
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            certFrame.src = '';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            certFrame.src = '';
        }
    });

    /* --- Image Viewer Modal Logic --- */
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const imageCloseBtns = imageModal.querySelectorAll('.close-modal');

    // Function to open image modal
    window.openImageModal = function(imageSrc, altText) {
        modalImage.src = imageSrc;
        modalImage.alt = altText;
        imageModal.classList.add('show');
    };

    // Close modal when clicking close button
    imageCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            imageModal.classList.remove('show');
            modalImage.src = '';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.classList.remove('show');
            modalImage.src = '';
        }
    });

    // Add click handlers to project images
    const projectImages = document.querySelectorAll('.proj-image-preview img');
    projectImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt') || 'Project Image';
            openImageModal(src, alt);
        });
    });

    /* --- Loading Screen --- */
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    /* --- Custom Cursor --- */
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Small delay for follower
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Expand cursor on hoverable elements
    const hoverables = document.querySelectorAll('a, button, input, textarea, .theme-toggle, .social-icon, .mobile-menu-btn');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.background = 'rgba(0, 240, 255, 0.5)';
            cursorFollower.style.borderColor = 'transparent';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursor.style.background = 'var(--neon-blue)';
            cursorFollower.style.borderColor = 'var(--neon-purple)';
        });
    });

    /* --- Navbar Scroll Effect & Mobile Menu --- */
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* --- Typing Animation --- */
    const typedTextSpan = document.querySelector(".typed-text");
    const textArray = ["Developer", "Builder", "Innovator"];
    const typingDelay = 100;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    setTimeout(type, newTextDelay + 250);

    /* --- Project Filtering --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* --- GSAP Animations --- */
    gsap.registerPlugin(ScrollTrigger);

    // Hero Content fade in
    gsap.from(".hero-text-content > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1.8 // After loader
    });

    // Section Titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Glass Cards stagger
    gsap.utils.toArray('.skills-grid, .projects-grid, .activities-grid, .education-grid').forEach(grid => {
        const cards = grid.querySelectorAll('.glass-card');
        gsap.from(cards, {
            scrollTrigger: {
                trigger: grid,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)"
        });
    });

    // Timeline Items
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.1
        });
    });

    /* --- Theme Toggle --- */
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    /* --- Particles JS Animation --- */
    if (window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#bd00ff", "#00f0ff"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": true, "distance": 150, "color": "#bd00ff", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 150, "line_linked": { "opacity": 0.6 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    /* --- Contact Form send as email using EmailJS --- */
    emailjs.init({ publicKey: 'USHjlAA4ALceddglh' }); // <-- Replace with your EmailJS public key

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Please complete all fields before sending.');
                return;
            }

            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'mani.sai2463@gmail.com'
            };

            emailjs.send('service_64y05xc', 'template_bjwgh3v', templateParams)
                .then(() => {
                    alert('Message sent successfully! You will get email notifications at mani.sai2463@gmail.com.');
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error('EmailJS send error:', error);
                    alert('Something went wrong. Please try again, or email directly to mani.sai2463@gmail.com');
                });
        });
    }
});
