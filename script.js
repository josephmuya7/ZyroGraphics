document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        slides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    showSlide(0);  // Show the first slide
    setInterval(nextSlide, 2000);  // Change slide every 2 seconds

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav li');
    const logo = document.querySelector('.logo-icon');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            formMessage.className = 'form-message success';
            contactForm.reset();
        })
        .catch(error => {
            formMessage.textContent = 'Oops! There was a problem submitting your form. Please try again later.';
            formMessage.className = 'form-message error';
        });
    });

    // Generate a unique reference number
    function generateReferenceNumber() {
        return 'IMG-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    // Cloudinary Widget
    var myWidget = cloudinary.createUploadWidget({
        cloudName: 'dsluqynke', 
        uploadPreset: 'ml_default',
        apiKey: '827691554189241',
        sources: ['local', 'url', 'camera'],
        maxFiles: 1,
        folder: 'images/client_uploads', // Specify a subfolder for client uploads
        styles: {
            palette: {
                window: "#FFFFFF",
                sourceBg: "#F4F4F5",
                windowBorder: "#90A0B3",
                tabIcon: "#0094C7",
                inactiveTabIcon: "#69778A",
                menuIcons: "#0094C7",
                link: "#53AD9D",
                action: "#8F5DA5",
                inProgress: "#0194C7",
                complete: "#53AD9D",
                error: "#c43737",
                textDark: "#000000",
                textLight: "#FFFFFF"
            }
        },
        clientAllowedFormats: ["png", "jpg", "jpeg", "gif"],
        publicId: (filename) => {
            const referenceNumber = generateReferenceNumber();
            return `${referenceNumber}_${filename}`;
        },
        tags: ["client_upload"],
        context: {
            alt: "Client upload",
            caption: "Awaiting processing"
        }
    }, (error, result) => { 
        if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info); 
            const referenceNumber = result.info.public_id.split('/').pop().split('_')[0];
            const imageUrl = result.info.secure_url;
            
            // Display success message with reference number
            document.getElementById('upload-result').innerHTML = `
                <p class="success-message">Image uploaded successfully!</p>
                <p>Your reference number is: <strong>${referenceNumber}</strong></p>
                <p>Please use this number when contacting us about your editing requirements.</p>
            `;
        }
    });
    
    document.getElementById("upload_widget").addEventListener("click", function(){
        myWidget.open();
    }, false);

    // Scroll to top when logo is clicked
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hide/show header on scroll
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.style.top = '-80px'; // Adjust this value based on your header height
        } else {
            header.style.top = '0';
        }
        lastScrollTop = scrollTop;
    });
});