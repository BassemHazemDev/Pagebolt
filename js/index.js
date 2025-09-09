// ================== Navbar Scroll Behavior ==================
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector('.navbar');
    const navLinks = navbar.querySelectorAll('.nav-link, .btn');
    const logoImg = navbar.querySelector('.navbar-brand img');
    let lastScrollTop = window.scrollY;
    let ticking = false;
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;

    navbar.style.transition = "background-color 0.4s, box-shadow 0.4s, color 0.4s, transform 0.4s";
    navLinks.forEach(link => {
        link.style.transition = "color 0.4s, background-color 0.4s, border-color 0.4s";
    });
    if (logoImg) {
        logoImg.style.transition = "filter 0.4s";
    }

    function setNavbarWhite() {
        navbar.classList.remove('navbar-dark', 'bg-black');
        navbar.classList.add('navbar-light', 'bg-white', 'shadow');
        navLinks.forEach(link => {
            if (link.classList.contains('nav-link')) {
                link.classList.remove('text-white');
                link.classList.add('text-dark');
            }
            if (link.classList.contains('btn')) {
                link.classList.remove('text-white');
                link.classList.add('text-dark');
            }
        });
        if (logoImg) {
            logoImg.src = "images/pagebolt-logo.webp";
        }
        const signupBtn = navbar.querySelector('button[type="button"].fw-semibold');
        if (signupBtn) {
            signupBtn.classList.remove('bg-white', 'text-dark');
            signupBtn.classList.add('bg-primary', 'text-white');
        }
    }

    function setNavbarBlack() {
        navbar.classList.remove('navbar-light', 'bg-white', 'shadow');
        navbar.classList.add('navbar-dark', 'bg-black');
        navLinks.forEach(link => {
            if (link.classList.contains('nav-link')) {
                link.classList.remove('text-dark');
                link.classList.add('text-white');
            }
            if (link.classList.contains('btn')) {
                link.classList.remove('text-dark');
                link.classList.add('text-white');
            }
        });
        if (logoImg) {
            logoImg.src = "images/pagebolt-logo-2.webp";
        }
        const signupBtn = navbar.querySelector('button[type="button"].fw-semibold');
        if (signupBtn) {
            signupBtn.classList.remove('bg-primary', 'text-white');
            signupBtn.classList.add('bg-white', 'text-dark');
        }
    }

    function handleNavbarStyle() {
        if (window.scrollY > headerHeight - 10) {
            setNavbarWhite();
        } else {
            setNavbarBlack();
        }
    }

    function handleNavbarShowHide() {
        let st = window.scrollY;
        if (st > lastScrollTop && st > headerHeight) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = st <= 0 ? 0 : st;
    }

    const backToTopBtn = document.getElementById('backToTopBtn');

    function handleBackToTopBtn() {
        if (!backToTopBtn) return;
        if (window.scrollY > headerHeight - 10) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                handleNavbarStyle();
                handleNavbarShowHide();
                handleBackToTopBtn();
                ticking = false;
            });
            ticking = true;
        }
    }

    handleNavbarStyle();
    handleBackToTopBtn();

    window.addEventListener('scroll', onScroll, { passive: true });
});
