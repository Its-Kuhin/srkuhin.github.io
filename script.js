document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Sidebar Toggle ---
    const burgerIcon = document.querySelector('.burger .menu-icon-burger');
    const sidebar = document.querySelector('.sidebar');
    const closeButton = document.querySelector('.sidebar .close-icon');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const mainContentOverlay = document.querySelector('.main-content-overlay');

    if (burgerIcon && sidebar && closeButton && mainContentOverlay) {
        burgerIcon.addEventListener('click', () => {
            sidebar.classList.add('open');
            mainContentOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeSidebar = () => {
            sidebar.classList.remove('open');
            mainContentOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeButton.addEventListener('click', closeSidebar);
        mainContentOverlay.addEventListener('click', closeSidebar);

        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                const header = document.querySelector('header');

                closeSidebar(); // Close sidebar first

                if (targetElement) {
                    const headerOffset = header ? header.offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 10;

                    setTimeout(() => {
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    }, 300);
                }
            });
        });
    } else {
        console.error("Sidebar elements not found. Burger/sidebar functionality might be affected.");
    }

    // --- Theme Toggle Functionality ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggleButton && body) {
        const toggleIcon = themeToggleButton.querySelector('i');

        const applyTheme = (theme) => {
            if (theme === 'dark') {
                body.classList.add('dark-mode');
                if (toggleIcon) {
                    toggleIcon.classList.remove('fa-moon');
                    toggleIcon.classList.add('fa-sun');
                }
            } else {
                body.classList.remove('dark-mode');
                if (toggleIcon) {
                    toggleIcon.classList.remove('fa-sun');
                    toggleIcon.classList.add('fa-moon');
                }
            }
        };

        const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        applyTheme(storedTheme);

        themeToggleButton.addEventListener('click', () => {
            let newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    // --- Typewriter Effect for Hero Section ---
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const typewriterTexts = [
            "CSE Student",
            "ML Enthusiast",
            "Deep Learning Developer",
            "Problem Solver",
            "Researcher"
        ];
        let textIndex = 0;
        let charIndex = 0;
        let currentTypingText = "";
        let isDeleting = false;
        const typeSpeed = 90;
        const deletePauseTime = 1800;
        const typePauseTime = 450;

        function typeEffect() {
            currentTypingText = typewriterTexts[textIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentTypingText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentTypingText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentTypingText.length) {
                isDeleting = true;
                setTimeout(typeEffect, deletePauseTime);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % typewriterTexts.length;
                setTimeout(typeEffect, typePauseTime);
            } else {
                setTimeout(typeEffect, isDeleting ? typeSpeed / 1.8 : typeSpeed);
            }
        }
        if (typewriterTexts.length > 0) setTimeout(typeEffect, typeSpeed);
    }

    // --- Smooth Scroll for Main Navigation Links ---
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const header = document.querySelector('header');

            if (targetElement) {
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 10;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Update Current Year in Footer ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Visitor Count ---
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
        let visits = localStorage.getItem('siteVisits_srk_portfolio_v2');
        visits = visits ? parseInt(visits) + 1 : 1;
        localStorage.setItem('siteVisits_srk_portfolio_v2', visits);
        visitorCountElement.textContent = visits;
    }

    // --- tsParticles Hero Background Animation ---
    if (window.tsParticles && document.getElementById("tsparticles")) {
        tsParticles.load("tsparticles", {
            autoPlay: true,
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: { enable: true, mode: "push" },
                    onHover: { enable: true, mode: "repulse" },
                },
                modes: {
                    push: { quantity: 3 },
                    repulse: { distance: 100, duration: 0.4 },
                },
            },
            particles: {
                color: { value: ["#5e0fff", "#00c6ff", "#ff4081", "#ffffff"] },
                links: {
                    color: "random",
                    distance: 140,
                    enable: true,
                    opacity: 0.3,
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: { default: "bounce" },
                    random: true,
                    speed: 1,
                    straight: false,
                },
                number: {
                    density: { enable: true, area: 800 },
                    value: 50,
                },
                opacity: {
                    value: { min: 0.2, max: 0.7 },
                    animation: { enable: true, speed: 1, minimumValue: 0.1 },
                },
                shape: {
                    type: "image",
                    image: [
                        { src: "images/ai_icons/researchgate.svg", width: 15, height: 15 },
                        { src: "images/ai_icons/codeforces.svg", width: 15, height: 15 },
                        { src: "images/ai_icons/codechef.svg", width: 15, height: 15 },
                        { src: "images/ai_icons/linux.svg", width: 15, height: 15 },
                        { src: "images/ai_icons/youtube.svg", width: 15, height: 15 },
                        { src: "images/ai_icons/meta.svg", width: 15, height: 15 },
                        { src: "images/ai_icons/tensorflow.svg", width: 15, height: 15 },
                        { src: "images/ai_icons/tesla.svg", width: 15, height: 15 },
                        { src: "images/ai_icons/python.svg", width: 15, height: 15 },
                        { src: "images/ai_icons/cplusplus.svg", width: 15, height: 15 },
                        { src: "images/ai_icons/c.svg", width: 15, height: 15 },
                        { src: "images/ai_icons/googlegemini.svg", width: 15, height: 15 },
                        { src: "images/ai_icons/ollama.svg", width: 15, height: 15 },
                        { src: "images/ai_icons/opencv.svg", width: 15, height: 15 },
                        { src: "images/ai_icons/openai.svg", width: 15, height: 15 }
                    ]
                },
                size: {
                    value: 15,
                    animation: { enable: false }
                },
                collisions: { enable: true, mode: "bounce" },
            },
            detectRetina: true,
        });
    }

    // --- Project Video Hover Interaction ---
    const projectMediaContainers = document.querySelectorAll('.project-media-container');
    projectMediaContainers.forEach(container => {
        const video = container.querySelector('.project-video-element');
        if (video) {
            const playVideo = () => {
                video.play().then(() => {
                    container.classList.add('playing');
                }).catch(error => console.info("Video play attempt failed (might be due to browser policy):", error));
            };
            const pauseVideo = () => {
                video.pause();
                container.classList.remove('playing');
            };
            container.addEventListener('mouseenter', playVideo);
            container.addEventListener('mouseleave', pauseVideo);
            video.addEventListener('ended', () => {
                container.classList.remove('playing');
                video.currentTime = 0;
            });
        }
    });

    // --- Memory Match Game Logic ---
    const memoryGameContainer = document.getElementById('memory-match-game');
    if (memoryGameContainer) {
        const grid = document.getElementById('memory-grid');
        const movesDisplay = document.getElementById('memory-moves');
        const matchesDisplay = document.getElementById('memory-matches');
        const totalPairsDisplay = document.getElementById('memory-total-pairs');
        const messageDisplay = document.getElementById('memory-game-message');
        const resetButton = document.getElementById('reset-memory-game-button');

        if (!grid || !movesDisplay || !matchesDisplay || !totalPairsDisplay || !messageDisplay || !resetButton) {
            console.error("Memory Game Critical Error: DOM elements missing.");
        } else {
            const cardIcons = [
                { name: 'researchgate', icon: 'images/ai_icons/researchgate.svg' },
                { name: 'codeforces',  icon: 'images/ai_icons/codeforces.svg' },
                { name: 'codechef',    icon: 'images/ai_icons/codechef.svg' },
                { name: 'linux',       icon: 'images/ai_icons/linux.svg' },
                { name: 'youtube',     icon: 'images/ai_icons/youtube.svg' },
                { name: 'meta',        icon: 'images/ai_icons/meta.svg' },
                { name: 'tensorflow',  icon: 'images/ai_icons/tensorflow.svg' },
                { name: 'tesla',       icon: 'images/ai_icons/tesla.svg' },
                { name: 'python',      icon: 'images/ai_icons/python.svg' },
                { name: 'cplusplus',   icon: 'images/ai_icons/cplusplus.svg' },
                { name: 'c',           icon: 'images/ai_icons/c.svg' },
                { name: 'googlegemini',icon: 'images/ai_icons/googlegemini.svg' },
                { name: 'ollama',      icon: 'images/ai_icons/ollama.svg' },
                { name: 'opencv',      icon: 'images/ai_icons/opencv.svg' },
                { name: 'openai',      icon: 'images/ai_icons/openai.svg' }
            ];
            let currentCardSet = cardIcons.slice(0, 8);
            let cardsArray = [];
            let cardsChosen = [];
            let cardsChosenId = [];
            let cardsWon = [];
            let moves = 0;
            let lockBoard = false;

            function initializeGame() {
                cardsArray = [...currentCardSet, ...currentCardSet];
                cardsArray.sort(() => 0.5 - Math.random());
                grid.innerHTML = '';
                cardsChosen = [];
                cardsChosenId = [];
                cardsWon = [];
                moves = 0;
                lockBoard = false;
                movesDisplay.textContent = moves;
                matchesDisplay.textContent = cardsWon.length;
                totalPairsDisplay.textContent = currentCardSet.length;
                messageDisplay.textContent = '';
                messageDisplay.style.color = 'var(--current-accent-color)';
                createBoard();
            }

            function createBoard() {
                for (let i = 0; i < cardsArray.length; i++) {
                    const card = document.createElement('div');
                    card.classList.add('memory-card');
                    card.setAttribute('data-id', i);

                    const cardFaceFront = document.createElement('div');
                    cardFaceFront.classList.add('card-face', 'card-front');

                    const cardFaceBack = document.createElement('div');
                    cardFaceBack.classList.add('card-face', 'card-back');

                    // If the icon path ends with an image extension, use <img>
                    const iconPath = cardsArray[i].icon;
                    if (/\.(svg|png|jpg|jpeg|gif)$/i.test(iconPath)) {
                        const img = document.createElement('img');
                        img.src = iconPath;
                        img.alt = cardsArray[i].name + ' icon';
                        img.width = 30;
                        img.height = 30;
                        cardFaceBack.appendChild(img);
                    } else {
                        // Fallback for Font Awesome classes
                        const iconElement = document.createElement('i');
                        iconElement.className = cardsArray[i].icon;
                        cardFaceBack.appendChild(iconElement);
                    }

                    card.appendChild(cardFaceFront);
                    card.appendChild(cardFaceBack);
                    card.addEventListener('click', flipCard);
                    grid.appendChild(card);
                }
            }

            function flipCard() {
                if (lockBoard || this.classList.contains('flipped') || this.classList.contains('matched')) {
                    return;
                }
                this.classList.add('flipped');
                const cardId = this.getAttribute('data-id');
                cardsChosen.push(cardsArray[cardId].name);
                cardsChosenId.push(cardId);
                if (cardsChosen.length === 2) {
                    lockBoard = true;
                    moves++;
                    movesDisplay.textContent = moves;
                    setTimeout(checkForMatch, 700);
                }
            }

            function checkForMatch() {
                const optionOneId = cardsChosenId[0];
                const optionTwoId = cardsChosenId[1];
                const cardOneElement = grid.querySelector(`.memory-card[data-id='${optionOneId}']`);
                const cardTwoElement = grid.querySelector(`.memory-card[data-id='${optionTwoId}']`);

                if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
                    messageDisplay.textContent = 'You found a match!';
                    messageDisplay.style.color = 'var(--current-secondary-color)';
                    if (cardOneElement) cardOneElement.classList.add('matched');
                    if (cardTwoElement) cardTwoElement.classList.add('matched');
                    cardsWon.push(cardsChosen[0]);
                } else {
                    messageDisplay.textContent = 'Sorry, try again!';
                    messageDisplay.style.color = 'var(--current-accent-color)';
                    if (cardOneElement) cardOneElement.classList.remove('flipped');
                    if (cardTwoElement) cardTwoElement.classList.remove('flipped');
                }
                cardsChosen = [];
                cardsChosenId = [];
                matchesDisplay.textContent = cardsWon.length;
                lockBoard = false;
                if (cardsWon.length === currentCardSet.length) {
                    messageDisplay.textContent = `Congratulations! All ${currentCardSet.length} pairs matched in ${moves} moves!`;
                    messageDisplay.style.color = 'gold';
                }
                if (cardsWon.length !== currentCardSet.length) {
                    setTimeout(() => {
                        if (messageDisplay.textContent !== `Congratulations! All ${currentCardSet.length} pairs matched in ${moves} moves!`) {
                            messageDisplay.textContent = '';
                        }
                    }, 1800);
                }
            }

            if (resetButton) {
                resetButton.addEventListener('click', initializeGame);
            }
            initializeGame();
        }
    } else {
        console.warn("Memory Game container missing. Game will not load.");
    }

    // --- Smooth scroll for hero scroll-down indicator ---
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const header = document.querySelector('header');
            if (targetElement) {
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 10;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    }
}); // End DOMContentLoaded
