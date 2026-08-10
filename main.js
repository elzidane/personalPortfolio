document.addEventListener("DOMContentLoaded", function () {
    /* ── SPLASH SCREEN LOADER ────────────────────────────────── */
    const splash = document.getElementById('splash');
    const fill = document.getElementById('splash-fill');
    const lbl = document.getElementById('splash-label');
    const steps = [
        { p: 25, t: 'MENGINISIALISASI...' },
        { p: 50, t: 'MEMUAT ASET...' },
        { p: 75, t: 'MENYIAPKAN UI...' },
        { p: 95, t: 'HAMPIR SELESAI...' },
        { p: 100, t: 'SIAP!' }
    ];
    let si = 0;

    function nextStep() {
        if (si >= steps.length) {
            setTimeout(() => {
                splash.classList.add('exit');
                setTimeout(() => splash.style.display = 'none', 700);
                startAnimations();
            }, 300);
            return;
        }
        const s = steps[si++];
        fill.style.width = s.p + '%';
        lbl.textContent = s.t;
        setTimeout(nextStep, si === steps.length ? 300 : Math.random() * 200 + 150);
    }
    
    // Start splash loading sequences
    setTimeout(nextStep, 200);

    // Skip splash on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && splash.style.display !== 'none') {
            fill.style.width = '100%';
            setTimeout(() => {
                splash.classList.add('exit');
                setTimeout(() => {
                    splash.style.display = 'none';
                    startAnimations();
                }, 700);
            }, 100);
        }
    });

    /* ── SCROLL PROGRESS BAR ─────────────────────────────────── */
    const prog = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const s = document.documentElement.scrollTop;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (h > 0) {
            prog.style.width = (s / h * 100) + '%';
        }
    });

    /* ── NAV SCROLL & ACTIVE LINK HIGHLIGHT ──────────────────── */
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    });

    const navLinks = document.querySelectorAll('.nav-links a');
    const sectionIds = ['home', 'about', 'portfolio', 'skills', 'certificates', 'experience', 'contact'];
    const allSections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    function updateActiveLink() {
        const mid = window.scrollY + window.innerHeight * 0.35;
        let activeId = allSections[0] ? allSections[0].id : '';
        allSections.forEach(s => {
            if (s.offsetTop <= mid) {
                activeId = s.id;
            }
        });
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + activeId));
    }
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    /* ── BACK TO TOP ─────────────────────────────────────────── */
    const btt = document.getElementById('btt');
    window.addEventListener('scroll', () => {
        btt.classList.toggle('visible', window.scrollY > 350);
    });
    btt.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ── MOBILE MENU NAVIGATION ──────────────────────────────── */
    const hmb = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileClose = document.getElementById('mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hmb) {
        hmb.addEventListener('click', () => mobileNav.classList.add('open'));
    }
    if (mobileClose) {
        mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
    }
    mobileLinks.forEach(a => {
        a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });

    /* ── SMOOTH SCROLL ANCHORS ───────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const targetId = a.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                window.scrollTo({
                    top: targetEl.offsetTop - 15,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ── NOTIFICATION COMPONENT ──────────────────────────────── */
    window.showNotif = function (msg, type = 'success') {
        const el = document.getElementById('notif');
        const icon = document.getElementById('notif-icon');
        const msgSpan = document.getElementById('notif-msg');
        
        msgSpan.textContent = msg;
        el.className = 'show ' + type;
        icon.className = 'fas ' + (type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle');
        
        setTimeout(() => {
            el.className = '';
        }, 3000);
    };

    /* ── CV DOWNLOAD HELPER ──────────────────────────────────── */
    const cvBtn = document.getElementById('btn-cv');
    if (cvBtn) {
        cvBtn.addEventListener('click', () => {
            window.showNotif('Mengunduh CV... 📄', 'success');
            const link = document.createElement('a');
            link.href = 'asset/CV_ATS_EL_ZIDANE_ARDYANSYAH (1).pdf';
            link.download = 'CV_EL_Zidane_Ardyansyah.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    /* ── CERTIFICATE FILTER & LIGHTBOX PREVIEW ───────────────── */
    const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
    const certCards = document.querySelectorAll('.cert-card');
    const certLightbox = document.getElementById('cert-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Filtering logic
    certFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            certFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            certCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.92) translateY(12px)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // Lightbox trigger
    certCards.forEach(card => {
        const imgWrap = card.querySelector('.cert-img-wrap');
        if (imgWrap) {
            imgWrap.addEventListener('click', (e) => {
                e.stopPropagation();
                const img = imgWrap.querySelector('img');
                const title = card.querySelector('.cert-name').textContent;
                const issuer = card.querySelector('.cert-issuer').textContent;
                
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxCaption.innerHTML = `${title} <br><span style="font-size:0.82rem;font-weight:400;color:var(--accent-2);">${issuer}</span>`;
                    certLightbox.classList.add('show');
                    document.body.style.overflow = 'hidden'; // Lock body scroll
                }
            });
        }
    });

    function closeLightboxFunc() {
        if (certLightbox) {
            certLightbox.classList.remove('show');
            document.body.style.overflow = ''; // Unlock body scroll
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightboxFunc);
    }
    if (certLightbox) {
        certLightbox.addEventListener('click', (e) => {
            if (e.target === certLightbox || e.target.classList.contains('lightbox-close')) {
                closeLightboxFunc();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && certLightbox.classList.contains('show')) {
                closeLightboxFunc();
            }
        });
    }

    /* ── INTERSECTION OBSERVER SCROLL ANIMATIONS ──────────────── */
    function startAnimations() {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

        document.querySelectorAll('.fade-in, .fade-in-l, .fade-in-r, .timeline-item').forEach(el => obs.observe(el));
        
        // Animating progress fills
        const pobs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.querySelectorAll('.progress-fill').forEach(bar => {
                        bar.style.width = bar.dataset.width + '%';
                    });
                    pobs.unobserve(e.target);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.skills-progress').forEach(el => pobs.observe(el));

        // Stats counter animations
        const cobs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.querySelectorAll('.countup').forEach(el => {
                        const target = +el.dataset.target;
                        let cur = 0;
                        const step = () => {
                            cur += Math.ceil(target / 30);
                            if (cur >= target) {
                                el.textContent = target + '+';
                                return;
                            }
                            el.textContent = cur + '+';
                            requestAnimationFrame(step);
                        };
                        step();
                    });
                    cobs.unobserve(e.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.hero-stats').forEach(el => cobs.observe(el));
    }

    /* ── HERO TEXT TYPEWRITER ────────────────────────────────── */
    const words = ['Web Developer', 'Mobile Developer', 'UI/UX Designer', 'Fullstack Dev'];
    let wi = 0, ci = 0, del = false;
    const tw = document.getElementById('typewriter');
    
    function type() {
        if (!tw) return;
        if (del) {
            tw.textContent = words[wi].substring(0, ci--);
            if (ci < 0) {
                del = false;
                wi = (wi + 1) % words.length;
                setTimeout(type, 350);
                return;
            }
        } else {
            tw.textContent = words[wi].substring(0, ci++);
            if (ci > words[wi].length) {
                del = true;
                setTimeout(type, 1800);
                return;
            }
        }
        setTimeout(type, del ? 50 : 80);
    }
    setTimeout(type, 1200);

    /* ── MOUSE SHIFTS & MAGNETIC CALCULATIONS ───────────────── */
    let currentScrollY = window.scrollY;
    let interpolatedScrollY = window.scrollY;
    const lerpFactor = 0.08;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetGridX = 0;
    let targetGridY = 0;
    let currentGridX = 0;
    let currentGridY = 0;

    window.addEventListener('scroll', () => {
        currentScrollY = window.scrollY;
    });

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        targetGridX = (mouseX / window.innerWidth - 0.5) * -12;
        targetGridY = (mouseY / window.innerHeight - 0.5) * -12;
    });

    const parallaxElems = document.querySelectorAll('[data-parallax]');
    const projectImages = document.querySelectorAll('.parallax-img');
    const gridBg = document.querySelector('.grid-bg');
    
    function animationLoop() {
        // Interpolated scroll damping
        interpolatedScrollY += (currentScrollY - interpolatedScrollY) * lerpFactor;
        
        // Large outline text and orb parallax
        const viewportCenter = window.innerHeight / 2;
        parallaxElems.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed')) || 0.1;
            const dir = el.getAttribute('data-parallax-dir') || 'y';
            const rotate = el.getAttribute('data-rotate') || '0';
            const parent = el.closest('section') || el.parentElement;
            const rect = parent.getBoundingClientRect();
            
            const parentRelativeTop = rect.top + window.scrollY - interpolatedScrollY;
            const parentCenter = parentRelativeTop + rect.height / 2;
            const distanceFromCenter = parentCenter - viewportCenter;
            const offset = distanceFromCenter * speed;
            
            if (dir === 'x') {
                el.style.transform = `translate3d(${offset}px, 0, 0) rotate(${rotate}deg)`;
            } else {
                el.style.transform = `translate3d(0, ${offset}px, 0) rotate(${rotate}deg)`;
            }
        });

        // Project images vertical perspective shifting
        projectImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            const percentVisible = (rect.top + rect.height) / (viewHeight + rect.height);
            const yOffset = (percentVisible - 0.5) * 20;
            img.style.transform = `scale(1.1) translate3d(0, ${yOffset}px, 0)`;
        });

        // Grid background shift
        if (gridBg) {
            currentGridX += (targetGridX - currentGridX) * 0.08;
            currentGridY += (targetGridY - currentGridY) * 0.08;
            gridBg.style.transform = `translate3d(${currentGridX}px, ${currentGridY}px, 0)`;
        }

        updateMagneticButtons();
        requestAnimationFrame(animationLoop);
    }
    requestAnimationFrame(animationLoop);

    /* ── CARD TILT & GLARE EFFECT ───────────────────────────── */
    const tiltCards = document.querySelectorAll('.project-card, .skill-card');
    
    tiltCards.forEach(card => {
        const glare = card.querySelector('.card-glare');
        
        card.addEventListener('mousemove', e => {
            if (window.innerWidth < 768) return; // Disable tilt on mobile
            
            const rect = card.getBoundingClientRect();
            const cardX = e.clientX - rect.left;
            const cardY = e.clientY - rect.top;
            
            const x = cardX / rect.width - 0.5;
            const y = cardY / rect.height - 0.5;
            
            const rotateX = -y * 8; // Refined max tilt (8 degrees)
            const rotateY = x * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            
            if (glare) {
                const glareX = (cardX / rect.width) * 100;
                const glareY = (cardY / rect.height) * 100;
                card.style.setProperty('--glare-x', `${glareX}%`);
                card.style.setProperty('--glare-y', `${glareY}%`);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    /* ── MAGNETIC ATTRACTION ON BUTTONS ──────────────────────── */
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-ghost, #hamburger');
    const magIntensity = 0.25; // Subtler snap intensity
    const magRadius = 45; 

    const buttonStates = new Map();
    magneticBtns.forEach(btn => {
        buttonStates.set(btn, { x: 0, y: 0 });
    });

    function updateMagneticButtons() {
        if (window.innerWidth < 1024) {
            magneticBtns.forEach(btn => btn.style.transform = '');
            return;
        }

        magneticBtns.forEach(btn => {
            const state = buttonStates.get(btn);
            if (!state) return;

            const rect = btn.getBoundingClientRect();
            const btnCenterX = rect.left + rect.width / 2;
            const btnCenterY = rect.top + rect.height / 2;

            const dx = mouseX - btnCenterX;
            const dy = mouseY - btnCenterY;
            const distance = Math.hypot(dx, dy);

            let targetX = 0;
            let targetY = 0;

            if (distance < magRadius) {
                const pullPower = (magRadius - distance) / magRadius;
                targetX = dx * pullPower * magIntensity;
                targetY = dy * pullPower * magIntensity;
            }

            state.x += (targetX - state.x) * 0.12;
            state.y += (targetY - state.y) * 0.12;

            btn.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
        });
    }

    /* ── HERO 3D MOUSE PARALLAX ──────────────────────────────── */
    const heroSection = document.getElementById('home');
    const heroImageSide = document.querySelector('.hero-image-side');
    const mainFrame = document.querySelector('.hero-img-frame');
    const badgeTop = document.querySelector('.badge-top');
    const badgeBottom = document.querySelector('.badge-bottom');
    const ft1 = document.querySelector('.ft-1');
    const ft2 = document.querySelector('.ft-2');
    const ft3 = document.querySelector('.ft-3');

    if (heroSection && heroImageSide) {
        heroSection.addEventListener('mousemove', e => {
            if (window.innerWidth < 1024) return;
            
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            const rotateX = -y * 8; // Refined tilt angles
            const rotateY = x * 8;
            heroImageSide.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            if (mainFrame) mainFrame.style.transform = `translateZ(20px) translate3d(${x * 8}px, ${y * 8}px, 0)`;
            if (badgeTop) badgeTop.style.transform = `translateZ(50px) translate3d(${x * 20}px, ${y * 20}px, 0) translateX(10px) translateY(-5px)`;
            if (badgeBottom) badgeBottom.style.transform = `translateZ(40px) translate3d(${x * 16}px, ${y * 16}px, 0) translateX(-10px) translateY(5px)`;
            if (ft1) ft1.style.transform = `translateZ(60px) translate3d(${x * -25}px, ${y * -25}px, 0) rotate(-10deg)`;
            if (ft2) ft2.style.transform = `translateZ(80px) translate3d(${x * -32}px, ${y * -32}px, 0) rotate(15deg)`;
            if (ft3) ft3.style.transform = `translateZ(50px) translate3d(${x * -20}px, ${y * -20}px, 0) rotate(5deg)`;
        });
        
        heroSection.addEventListener('mouseleave', () => {
            heroImageSide.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
            if (mainFrame) mainFrame.style.transform = 'translateZ(20px) translate3d(0, 0, 0)';
            if (badgeTop) badgeTop.style.transform = 'translateZ(50px) translate3d(0, 0, 0) translateX(10px) translateY(-5px)';
            if (badgeBottom) badgeBottom.style.transform = 'translateZ(40px) translate3d(0, 0, 0) translateX(-10px) translateY(5px)';
            if (ft1) ft1.style.transform = 'translateZ(60px) translate3d(0, 0, 0) rotate(-10deg)';
            if (ft2) ft2.style.transform = 'translateZ(80px) translate3d(0, 0, 0) rotate(15deg)';
            if (ft3) ft3.style.transform = 'translateZ(50px) translate3d(0, 0, 0) rotate(5deg)';
        });
    }

    /* ── THREE.JS BACKGROUND PARTICLES ───────────────────────── */
    const canvas = document.getElementById('three-canvas');
    if (canvas && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const geometry = new THREE.BufferGeometry();
        const particlesCount = 700; // Subtler particle count
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 80;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const material = new THREE.PointsMaterial({
            size: 0.07,
            color: 0x00e5c3,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        const particlesMesh = new THREE.Points(geometry, material);
        scene.add(particlesMesh);

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        window.dispatchEvent(new Event('resize'));
        const clock = new THREE.Clock();
        
        function animate3D() {
            requestAnimationFrame(animate3D);
            const elapsedTime = clock.getElapsedTime();

            particlesMesh.rotation.y = elapsedTime * 0.04;
            const scrollInfluence = (typeof interpolatedScrollY !== 'undefined' ? interpolatedScrollY : window.scrollY) * 0.0008;
            particlesMesh.rotation.x = scrollInfluence * 0.4;
            
            const mouseXInfluence = (typeof mouseX !== 'undefined' ? (mouseX / window.innerWidth - 0.5) : 0) * 4;
            const mouseYInfluence = (typeof mouseY !== 'undefined' ? (mouseY / window.innerHeight - 0.5) : 0) * 4;
            
            const targetX = mouseXInfluence;
            const targetY = (scrollInfluence * 5) - mouseYInfluence;

            particlesMesh.position.x += (targetX - particlesMesh.position.x) * 0.05;
            particlesMesh.position.y += (targetY - particlesMesh.position.y) * 0.05;

            renderer.render(scene, camera);
        }
        animate3D();
    }
});

/* ─── EMAILJS & SYNCED INTERFACE CONTROLLERS ─────────────── */
(function() {
    /* ═══════════════════════════════════════════════════════════
       1. DARK / LIGHT MODE TOGGLE
    ═══════════════════════════════════════════════════════════ */
    document.addEventListener("DOMContentLoaded", () => {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;
        const icon = btn.querySelector('i');
        const savedTheme = localStorage.getItem('theme') || 'dark';
        
        if (savedTheme === 'light') {
            document.body.setAttribute('data-theme', 'light');
            icon.className = 'fas fa-sun';
        }
        
        btn.addEventListener('click', () => {
            const isLight = document.body.getAttribute('data-theme') === 'light';
            if (isLight) {
                document.body.removeAttribute('data-theme');
                icon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'dark');
                if (window.playThemeChime) window.playThemeChime(false);
            } else {
                document.body.setAttribute('data-theme', 'light');
                icon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'light');
                if (window.playThemeChime) window.playThemeChime(true);
            }

            // Sync skills chart text color on theme update
            if (window.skillsChart) {
                const updatedIsLight = document.body.getAttribute('data-theme') === 'light';
                const labelColor = updatedIsLight ? '#1a1d2e' : '#e8eaf0';
                window.skillsChart.options.scales.r.pointLabels.color = labelColor;
                window.skillsChart.update();
            }
        });
    });

    /* ═══════════════════════════════════════════════════════════
       GITHUB STATS — Native API Fetch
    ═══════════════════════════════════════════════════════════ */
    document.addEventListener("DOMContentLoaded", () => {
        const GITHUB_USERNAME = 'elzidanee';
        const GH_API = `https://api.github.com/users/${GITHUB_USERNAME}`;
        const GH_REPOS_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`;

        // Language color palette
        const LANG_COLORS = {
            'JavaScript': '#f7df1e',
            'TypeScript': '#3178c6',
            'Python': '#3776ab',
            'Dart': '#00b4ab',
            'HTML': '#e34c26',
            'CSS': '#264de4',
            'Vue': '#42b883',
            'Kotlin': '#7f52ff',
            'Swift': '#fa7343',
            'Go': '#00add8',
            'Rust': '#ce422b',
            'PHP': '#777bb4',
            'Java': '#b07219',
            'C++': '#f34b7d',
            'C': '#555555',
            'Shell': '#89e051',
        };
        function getLangColor(lang) {
            return LANG_COLORS[lang] || ('#' + Math.abs(lang.split('').reduce((a,c) => a*31+c.charCodeAt(0),0)).toString(16).slice(-6).padStart(6,'a'));
        }

        async function fetchGithubStats() {
            try {
                const [userRes, reposRes] = await Promise.all([
                    fetch(GH_API),
                    fetch(GH_REPOS_API)
                ]);

                if (!userRes.ok) throw new Error('User not found');
                const user = await userRes.json();
                const repos = reposRes.ok ? await reposRes.json() : [];

                // Calculate total stars
                const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

                // --- POPULATE STATS CARD ---
                const avatar = document.getElementById('gh-avatar');
                const usernameEl = document.getElementById('gh-username');
                const profileLink = document.getElementById('gh-profile-link');

                if (avatar) {
                    avatar.src = user.avatar_url;
                    avatar.onload = () => avatar.classList.add('loaded');
                }
                if (usernameEl) usernameEl.textContent = user.login;
                if (profileLink) profileLink.href = user.html_url;

                const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
                set('gh-repos', user.public_repos || 0);
                set('gh-stars', totalStars);
                set('gh-followers', user.followers || 0);
                set('gh-following', user.following || 0);

                // Fake contribution bar data (GitHub API doesn't expose this without auth)
                // We'll generate visually plausible bars based on repo push dates
                const barsWrap = document.getElementById('gh-contrib-bars');
                if (barsWrap) {
                    const monthCounts = new Array(24).fill(0);
                    const now = new Date();
                    repos.forEach(r => {
                        if (r.pushed_at) {
                            const diff = (now - new Date(r.pushed_at)) / (1000 * 60 * 60 * 24 * 30);
                            const idx = Math.floor(diff);
                            if (idx >= 0 && idx < 24) monthCounts[idx]++;
                        }
                    });
                    // Add base noise for visual appeal
                    const bars = monthCounts.reverse().map((v, i) => {
                        const noise = Math.floor(Math.random() * 2);
                        return Math.min(v + noise, 4);
                    });
                    const maxVal = Math.max(...bars, 1);
                    barsWrap.innerHTML = bars.map(v => {
                        const heightPct = Math.max(8, Math.round((v / maxVal) * 100));
                        const level = v === 0 ? 0 : v === 1 ? 1 : v <= 2 ? 2 : v <= 3 ? 3 : 4;
                        return `<div class="gh-contrib-bar" data-level="${level}" style="height:${heightPct}%" title="${v} kontribusi"></div>`;
                    }).join('');
                }

                // Hide stats loading
                const statsLoading = document.getElementById('gh-loading');
                if (statsLoading) statsLoading.classList.add('hidden');

                // --- POPULATE LANGUAGES CARD ---
                const langMap = {};
                repos.forEach(r => {
                    if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
                });
                const sortedLangs = Object.entries(langMap).sort((a,b) => b[1]-a[1]).slice(0, 6);
                const totalCount = sortedLangs.reduce((a,b) => a+b[1], 0);

                const langList = document.getElementById('gh-languages-list');
                const langBarTotal = document.getElementById('gh-lang-bar-total');

                if (langList && sortedLangs.length > 0) {
                    langList.innerHTML = sortedLangs.map(([lang, count]) => {
                        const pct = ((count / totalCount) * 100).toFixed(1);
                        const color = getLangColor(lang);
                        return `
                        <div class="gh-lang-row">
                            <div class="gh-lang-dot" style="background:${color}"></div>
                            <div class="gh-lang-name">${lang}</div>
                            <div class="gh-lang-bar"><div class="gh-lang-bar-fill" style="background:${color};width:0%" data-width="${pct}"></div></div>
                            <div class="gh-lang-pct">${pct}%</div>
                        </div>`;
                    }).join('');

                    // Animate bar fills after DOM insertion
                    setTimeout(() => {
                        langList.querySelectorAll('.gh-lang-bar-fill').forEach(el => {
                            el.style.width = el.dataset.width + '%';
                        });
                    }, 100);
                } else if (langList) {
                    langList.innerHTML = '<div class="gh-error"><i class="fas fa-code-branch"></i>Belum ada repo publik</div>';
                }

                if (langBarTotal && sortedLangs.length > 0) {
                    langBarTotal.innerHTML = sortedLangs.map(([lang, count]) => {
                        const pct = ((count / totalCount) * 100).toFixed(1);
                        return `<div class="gh-lang-bar-segment" style="width:${pct}%;background:${getLangColor(lang)}"></div>`;
                    }).join('');
                }

                // Hide langs loading
                const langsLoading = document.getElementById('gh-langs-loading');
                if (langsLoading) langsLoading.classList.add('hidden');

            } catch (err) {
                console.warn('GitHub API fetch failed:', err);
                // Show error states
                ['gh-loading', 'gh-langs-loading'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.innerHTML = '<div class="gh-error"><i class="fas fa-wifi"></i>Tidak dapat memuat data GitHub</div>';
                    }
                });
            }
        }

        // Fetch on load
        fetchGithubStats();
    });

    /* ═══════════════════════════════════════════════════════════
       2. PROJECT DETAIL MODAL DATA
    ═══════════════════════════════════════════════════════════ */
    const projectsData = [
        {
            title: 'EazyChise',
            tag: 'WEB',
            img: 'asset/eazychise.png',
            desc: 'Platform marketplace waralaba responsif yang membantu mitra bisnis memperluas jaringan franchise mereka secara digital. Dibangun dari desain hingga deployment dengan performa tinggi dan fitur autentikasi lengkap.',
            features: [
                'Autentikasi pengguna berbasis Supabase (sign up, sign in, session)',
                'Pencarian multi-kategori franchise dengan filter canggih',
                'Kalkulator simulasi keuntungan bisnis interaktif',
                'Formulir digital pendaftaran mitra berbasis Supabase',
                'Desain responsif dengan Tailwind CSS & Framer Motion',
                'Deployment otomatis via Vercel CI/CD'
            ],
            tech: ['Next.js','TypeScript','Tailwind CSS','Supabase','Vercel','Framer Motion'],
            live: 'https://eazychise.vercel.app',
            github: 'https://github.com/elzidane'
        },
        {
            title: 'Monsef — Pencatat Keuangan',
            tag: 'MOBILE',
            img: 'asset/monsef.png',
            desc: 'Aplikasi pencatat keuangan mobile multiplatform dengan teknologi AI terkini. Memungkinkan pengguna mencatat transaksi lewat scan struk (OCR), suara (Speech-to-Text), atau input manual — dibangun dari nol hingga produksi.',
            features: [
                'Scan struk otomatis dengan integrasi OCR API',
                'Input transaksi via Speech-to-Text',
                'Sinkronisasi data cloud real-time dengan Supabase',
                'Dashboard analitik pengeluaran & pemasukan',
                'Antarmuka mobile-first yang smooth & responsif',
                'Multi-platform: Android & iOS (Flutter)'
            ],
            tech: ['Flutter','Dart','Supabase','OCR API','Speech-to-Text'],
            live: '#',
            github: 'https://github.com/elzidane'
        },
        {
            title: 'HaloAir — Manajemen PDAM',
            tag: 'MOBILE',
            img: 'asset/haloair.png',
            desc: 'Aplikasi mobile manajemen layanan PDAM dengan arsitektur multi-role untuk keamanan hak akses. Admin dapat mengelola data pelanggan dan tagihan secara real-time, sementara user dapat memantau tagihan dan status layanan mereka.',
            features: [
                'Arsitektur Multi-Role (Admin & User) dengan hak akses terpisah',
                'Manajemen tagihan air real-time via RESTful API',
                'Sinkronisasi data operasional pelanggan',
                'Notifikasi tagihan dan status pembayaran',
                'Riwayat penggunaan air per periode',
                'Pengujian API komprehensif dengan Postman & Git'
            ],
            tech: ['Flutter','Dart','REST API','Postman','Git'],
            live: '#',
            github: 'https://github.com/elzidane'
        },
        {
            title: 'PortaTrip — UI/UX Design',
            tag: 'UI/UX',
            img: 'asset/portatrip.png',
            desc: 'Desain UI/UX komprehensif untuk platform aplikasi wisata dan pemesanan porter guide. Dimulai dari riset pengguna, user flow, wireframe, hingga interactive prototype yang siap diuji.',
            features: [
                'User Flow & Information Architecture lengkap',
                'Wireframe detail seluruh halaman aplikasi',
                'Interactive Prototype di Figma untuk user testing',
                'Desain sistem komponen yang konsisten',
                'Mind mapping & diagram alur dengan Whimsical',
                'Fokus pada UX intuitif untuk wisatawan'
            ],
            tech: ['Figma','Whimsical','UI/UX Design','Prototyping','User Research'],
            live: '#',
            github: 'https://github.com/elzidane'
        },
        {
            title: 'Web Visit SMK Telkom Malang',
            tag: 'WEB',
            img: 'asset/webvisit.png',
            desc: 'Website resmi kunjungan untuk SMK Telkom Malang, memfasilitasi pendataan dan informasi seputar kunjungan.',
            features: [
                'Informasi kunjungan',
                'Pendataan pengunjung',
                'Desain responsif'
            ],
            tech: ['HTML', 'CSS', 'JavaScript'],
            live: 'https://mokletvisit.vercel.app',
            github: 'https://github.com/elzidane'
        },
        {
            title: 'Aplikasi Mobile Eazychise',
            tag: 'MOBILE',
            img: 'asset/monsef.png',
            desc: 'Platform marketplace waralaba versi aplikasi mobile, memudahkan pengguna mencari dan bertransaksi franchise di mana saja.',
            features: [
                'Pencarian franchise',
                'Transaksi aman',
                'Mobile optimized'
            ],
            tech: ['Flutter', 'Dart'],
            live: '#',
            github: 'https://github.com/elzidane'
        },
        {
            title: 'Aplikasi Toko Online',
            tag: 'WEB/MOBILE',
            img: 'asset/port.png',
            desc: 'Aplikasi toko online komprehensif untuk transaksi produk fisik dan digital secara mudah dan aman.',
            features: [
                'Katalog produk',
                'Keranjang belanja',
                'Pembayaran digital'
            ],
            tech: ['Fullstack', 'E-Commerce'],
            live: 'https://mokletvisit.vercel.app',
            github: 'https://github.com/elzidane'
        },
        {
            title: 'Aplikasi EcoGuard',
            tag: 'APP',
            img: 'asset/port.png',
            desc: 'Aplikasi berfokus pada pelestarian lingkungan dan edukasi masyarakat melalui fitur-fitur interaktif EcoGuard.',
            features: [
                'Edukasi lingkungan',
                'Laporan kegiatan',
                'Gamifikasi peduli lingkungan'
            ],
            tech: ['Tech Stack'],
            live: '#',
            github: 'https://github.com/elzidane'
        },
        {
            title: 'Website Mokleters',
            tag: 'WEB',
            img: 'asset/port.png',
            desc: 'Website resmi untuk komunitas Mokleters yang interaktif dan dinamis, memudahkan penyebaran informasi kegiatan.',
            features: [
                'Portal komunitas',
                'Manajemen event',
                'Forum diskusi'
            ],
            tech: ['Web Dev', 'Community Platform'],
            live: '#',
            github: 'https://github.com/elzidane'
        }
    ];

    document.addEventListener("DOMContentLoaded", () => {
        const overlay = document.getElementById('project-modal-overlay');
        const closeBtn = document.getElementById('project-modal-close');
        if (!overlay) return;

        function openModal(idx) {
            const d = projectsData[idx];
            if (!d) return;
            document.getElementById('modal-img').src = d.img;
            document.getElementById('modal-img').alt = d.title;
            document.getElementById('modal-tag').textContent = d.tag;
            document.getElementById('modal-title').textContent = d.title;
            document.getElementById('modal-desc').textContent = d.desc;
            const fl = document.getElementById('modal-features');
            fl.innerHTML = d.features.map(f => `<li>${f}</li>`).join('');
            const tl = document.getElementById('modal-tech');
            tl.innerHTML = d.tech.map(t => `<span class="tech-pill">${t}</span>`).join('');
            document.getElementById('modal-live-link').href = d.live;
            document.getElementById('modal-github-link').href = d.github;
            
            overlay.style.display = 'flex';
            requestAnimationFrame(() => overlay.classList.add('open'));
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            overlay.classList.remove('open');
            setTimeout(() => { 
                overlay.style.display = 'none'; 
                document.body.style.overflow = ''; 
            }, 300);
        }

        document.querySelectorAll('.project-card[data-modal-id]').forEach(card => {
            card.addEventListener('click', e => {
                if (e.target.closest('a')) return; // let buttons trigger links directly
                openModal(+card.dataset.modalId);
            });
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });
    });

    /* ═══════════════════════════════════════════════════════════
       3. DEVELOPER TERMINAL INTERACTIVE SHELL
    ═══════════════════════════════════════════════════════════ */
    document.addEventListener("DOMContentLoaded", () => {
        const toggle = document.getElementById('terminal-toggle');
        const widget = document.getElementById('terminal-widget');
        const body   = document.getElementById('terminal-body');
        const input  = document.getElementById('terminal-input');
        if (!toggle || !widget || !body || !input) return;

        let isOpen = false;
        let history = [];
        let histIdx = -1;

        const commands = {
            help: () => [
                { cls:'accent',  text: '┌─────────────────────────────────────┐' },
                { cls:'accent',  text: '│     ZeeDev Terminal — Available Cmds │' },
                { cls:'accent',  text: '└─────────────────────────────────────┘' },
                { cls:'success', text: '  help       — tampilkan perintah ini' },
                { cls:'success', text: '  about      — tentang developer' },
                { cls:'success', text: '  skills     — daftar teknologi' },
                { cls:'success', text: '  projects   — list proyek' },
                { cls:'success', text: '  contact    — info kontak' },
                { cls:'success', text: '  social     — link sosial media' },
                { cls:'success', text: '  clear      — bersihkan terminal' },
                { cls:'success', text: '  theme      — toggle dark/light mode' },
                { cls:'success', text: '  hire       — info ketersediaan' },
                { cls: 'muted',  text: '' }
            ],
            about: () => [
                { cls:'accent', text: '> EL Zidane Ardyansyah' },
                { cls:'output', text: '  Siswa SMK Telkom Malang' },
                { cls:'output', text: '  Jurusan: Rekayasa Perangkat Lunak | 2024-2027' },
                { cls:'output', text: '  Spesialisasi: Web Dev · Mobile · UI/UX' },
                { cls:'output', text: '  Lokasi: Kota Malang, Jawa Timur' },
                { cls:'output', text: '  Status: Tersedia untuk proyek freelance' },
                { cls:'muted',  text: '' }
            ],
            skills: () => [
                { cls:'accent',  text: '> Tech Stack:' },
                { cls:'success', text: '  Frontend  → HTML · CSS · JavaScript · TypeScript · React · Next.js · Tailwind' },
                { cls:'success', text: '  Mobile    → Flutter · Dart' },
                { cls:'success', text: '  Backend   → MySQL · Supabase · REST API · Vercel' },
                { cls:'success', text: '  Tools     → Git · Postman · Figma · Framer Motion · QR Scanner' },
                { cls:'success', text: '  UI/UX     → Wireframing · Prototyping · User Flow · Whimsical' },
                { cls:'muted',   text: '' }
            ],
            projects: () => [
                { cls:'accent',  text: '> Proyek Unggulan:' },
                { cls:'output',  text: '  [0] EazyChise (Web Marketplace)     — Next.js · Supabase · Vercel' },
                { cls:'output',  text: '  [1] Monsef (Mobile Keuangan)        — Flutter · OCR · Speech-to-Text' },
                { cls:'output',  text: '  [2] HaloAir (PDAM Mobile App)       — Flutter · REST API' },
                { cls:'output',  text: '  [3] PortaTrip (UI/UX Design)        — Figma · Whimsical' },
                { cls:'output',  text: '  [4] Web Visit SMK Telkom            — HTML · CSS · JS' },
                { cls:'output',  text: '  [5] Mobile Eazychise                — Flutter · Dart' },
                { cls:'output',  text: '  [6] Aplikasi Toko Online            — Fullstack' },
                { cls:'output',  text: '  [7] Aplikasi EcoGuard               — Tech Stack' },
                { cls:'output',  text: '  [8] Website Mokleters               — Web Dev' },
                { cls:'muted',   text: '  ketik project 0-8 untuk detail' },
                { cls:'muted',   text: '' }
            ],
            contact: () => [
                { cls:'accent',  text: '> Kontak:' },
                { cls:'output',  text: '  Email   → elzidaneardyansyah265@gmail.com' },
                { cls:'output',  text: '  Phone   → +62 877 9273 5999' },
                { cls:'output',  text: '  Lokasi  → Malang, Jawa Timur, Indonesia' },
                { cls:'muted',   text: '' }
            ],
            social: () => [
                { cls:'accent',  text: '> Social Media:' },
                { cls:'output',  text: '  GitHub    → github.com/elzidane' },
                { cls:'output',  text: '  LinkedIn  → linkedin.com/in/elzidane' },
                { cls:'output',  text: '  Instagram → instagram.com/_elzdne' },
                { cls:'muted',   text: '' }
            ],
            hire: () => [
                { cls:'success', text: '  ✓ STATUS: TERSEDIA UNTUK PROYEK' },
                { cls:'output',  text: '  Terbuka untuk: Freelance · Internship · Part-time' },
                { cls:'output',  text: '  Kirim pesan via form kontak atau email langsung!' },
                { cls:'muted',   text: '' }
            ],
            theme: () => {
                const themeBtn = document.getElementById('theme-toggle');
                if (themeBtn) themeBtn.click();
                const isLight = document.body.getAttribute('data-theme') === 'light';
                return [{ cls:'success', text: `  Tema diubah ke: ${isLight ? '☀ Light' : '🌙 Dark'} Mode` },{ cls:'muted', text:'' }];
            },
            clear: () => { body.innerHTML = ''; return []; }
        };

        function print(lines) {
            lines.forEach(l => {
                const el = document.createElement('div');
                el.className = 'terminal-line ' + (l.cls||'output');
                el.textContent = l.text;
                body.appendChild(el);
            });
            body.scrollTop = body.scrollHeight;
        }

        function printWelcome() {
            print([
                { cls:'accent',  text: '  ███████╗███████╗███████╗██████╗ ███████╗██╗   ██╗' },
                { cls:'accent',  text: '      ZeeDev Interactive Terminal v1.0' },
                { cls:'muted',   text: '  Ketik "help" untuk melihat perintah yang tersedia.' },
                { cls:'muted',   text: '' }
            ]);
        }

        function handleCommand(cmd) {
            cmd = cmd.trim();
            if (!cmd) return;
            history.unshift(cmd);
            histIdx = -1;
            print([{ cls:'cmd', text: '$ ' + cmd }]);

            const lowerCmd = cmd.toLowerCase();

            // Match project detail shortcut
            if (/^project [0-8]$/.test(lowerCmd)) {
                const idx = +lowerCmd.split(' ')[1];
                const cards = document.querySelectorAll('.project-card[data-modal-id]');
                if (cards[idx]) {
                    const event = new MouseEvent('click', { bubbles: true });
                    cards[idx].dispatchEvent(event);
                }
                print([{ cls:'success', text: '  Membuka detail proyek...' },{ cls:'muted', text:'' }]);
                if (window.playTone) window.playTone(880, 'sine', 0.03, 0.04);
                return;
            }

            if (commands[lowerCmd]) {
                print(commands[lowerCmd]());
                if (window.playTone) window.playTone(880, 'sine', 0.03, 0.04);
            } else {
                print([
                    { cls:'error', text: `  command not found: ${cmd}` },
                    { cls:'muted', text: '  Ketik "help" untuk melihat perintah.' },
                    { cls:'muted', text: '' }
                ]);
                if (window.playTone) window.playTone(220, 'triangle', 0.03, 0.08); // Error tone
            }
        }

        toggle.addEventListener('click', () => {
            isOpen = !isOpen;
            if (isOpen) {
                widget.style.display = 'flex';
                requestAnimationFrame(() => widget.classList.add('open'));
                if (!body.children.length) printWelcome();
                setTimeout(() => input.focus(), 250);
            } else {
                widget.classList.remove('open');
                setTimeout(() => widget.style.display = 'none', 300);
            }
        });

        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                handleCommand(input.value);
                input.value = '';
            } else if (e.key === 'ArrowUp') {
                histIdx = Math.min(histIdx + 1, history.length - 1);
                input.value = history[histIdx] || '';
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                histIdx = Math.max(histIdx - 1, -1);
                input.value = histIdx >= 0 ? history[histIdx] : '';
                e.preventDefault();
            }
        });
    });

    /* ═══════════════════════════════════════════════════════════
       4. EMAILJS FORM SUBMISSION
    ═══════════════════════════════════════════════════════════ */
    document.addEventListener("DOMContentLoaded", () => {
        emailjs.init('F0dnYTmCI7xr50VI6');

        const form = document.getElementById('contact-form');
        const btn  = document.getElementById('btn-send');
        const btnText = document.getElementById('btn-send-text');
        const btnIcon = document.getElementById('btn-send-icon');
        const status  = document.getElementById('form-status');

        if (!form || !btn) return;

        form.addEventListener('submit', async e => {
            e.preventDefault();
            const name    = document.getElementById('f-name').value.trim();
            const email   = document.getElementById('f-email').value.trim();
            const subject = document.getElementById('f-subject').value.trim();
            const message = document.getElementById('f-message').value.trim();

            if (!name || !email || !subject || !message) {
                showStatus('⚠ Semua field harus diisi.', '#f59e0b');
                return;
            }

            btn.disabled = true;
            btnText.textContent = 'Mengirim...';
            btnIcon.className = 'fas fa-circle-notch fa-spin';

            try {
                const templateParams = {
                    name: name,
                    email: email,
                    title: subject,
                    message: message
                };
                await emailjs.send('service_3hipg48', 'template_c3mn0tz', templateParams);

                btnText.textContent = 'Terkirim!';
                btnIcon.className = 'fas fa-check';
                btn.style.background = '#28c840';
                
                if (typeof window.showNotif === 'function') {
                    window.showNotif('Pesan berhasil dikirim! 🚀', 'success');
                }
                showStatus('✓ Pesan terkirim! Saya akan membalas segera.', '#28c840');
                form.reset();
            } catch (err) {
                console.error('EmailJS error:', err);
                btnText.textContent = 'Gagal';
                btnIcon.className = 'fas fa-times';
                btn.style.background = '#ff5f57';
                
                if (typeof window.showNotif === 'function') {
                    window.showNotif('Gagal mengirim pesan.', 'error');
                }
                showStatus('✗ Gagal mengirim. Silakan hubungi via email langsung.', '#ff6b6b');
            }

            setTimeout(() => {
                btn.disabled = false;
                btnText.textContent = 'Kirim Pesan';
                btnIcon.className = 'fas fa-paper-plane';
                btn.style.background = '';
            }, 3000);
        });

        function showStatus(msg, color) {
            if (!status) return;
            status.textContent = msg;
            status.style.color = color;
            status.style.display = 'block';
            setTimeout(() => { status.style.display = 'none'; }, 5000);
        }
    });

    /* ═══════════════════════════════════════════════════════════
       5. PREMIUM AUDIO SYNTH FEEDBACK (WEB AUDIO API)
    ═══════════════════════════════════════════════════════════ */
    let audioCtx = null;
    let isMuted = localStorage.getItem('audio_muted') !== 'false'; // default to muted for UX guidelines

    document.addEventListener("DOMContentLoaded", () => {
        const audioToggle = document.getElementById('audio-toggle');
        if (!audioToggle) return;
        const audioIcon = audioToggle.querySelector('i');

        if (!isMuted) {
            audioIcon.className = 'fas fa-volume-up';
            audioToggle.classList.add('active');
        } else {
            audioIcon.className = 'fas fa-volume-mute';
            audioToggle.classList.remove('active');
        }

        audioToggle.addEventListener('click', () => {
            isMuted = !isMuted;
            localStorage.setItem('audio_muted', isMuted);
            
            if (!isMuted) {
                audioIcon.className = 'fas fa-volume-up';
                audioToggle.classList.add('active');
                initAudioContext();
                playTone(523.25, 'sine', 0.04, 0.08); // Startup chime C5 (subtle)
            } else {
                audioIcon.className = 'fas fa-volume-mute';
                audioToggle.classList.remove('active');
            }
        });
    });

    function initAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function playTone(freq, type, volume, duration) {
        if (isMuted) return;
        try {
            initAudioContext();
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            
            gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
            
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {}
    }
    window.playTone = playTone;

    function playTypewriterSound() {
        if (isMuted) return;
        try {
            initAudioContext();
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            const pitch = 950 + Math.random() * 300; 
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(pitch, audioCtx.currentTime);
            
            gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime); // Lower volume (0.02)
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.015); // Shorter duration
            
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.015);
        } catch (e) {}
    }

    function playHoverSound() {
        playTone(1000, 'sine', 0.006, 0.02); // Premium quick haptic beep (0.006 vol, 0.02 sec)
    }

    function playClickSound() {
        playTone(700, 'sine', 0.04, 0.06); // Crisp click (0.04 vol, 0.06 sec)
    }

    function playThemeChime(isToLight) {
        if (isMuted) return;
        try {
            if (isToLight) {
                playTone(523.25, 'sine', 0.02, 0.08);
                setTimeout(() => playTone(659.25, 'sine', 0.02, 0.08), 60);
                setTimeout(() => playTone(783.99, 'sine', 0.02, 0.12), 120);
            } else {
                playTone(783.99, 'sine', 0.02, 0.08);
                setTimeout(() => playTone(659.25, 'sine', 0.02, 0.08), 60);
                setTimeout(() => playTone(523.25, 'sine', 0.02, 0.12), 120);
            }
        } catch (e) {}
    }
    window.playThemeChime = playThemeChime;

    // Attach synth listeners to inputs and hoverables
    document.addEventListener("DOMContentLoaded", () => {
        const termInput = document.getElementById('terminal-input');
        if (termInput) {
            termInput.addEventListener('keydown', (e) => {
                if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter') {
                    playTypewriterSound();
                }
            });
        }

        const clickables = document.querySelectorAll('a, button, .project-card, .skill-card, .cert-filter-btn');
        clickables.forEach(el => {
            if (el.id === 'terminal-input' || el.id === 'audio-toggle') return;
            el.addEventListener('mouseenter', playHoverSound);
            el.addEventListener('click', playClickSound);
        });
    });

    /* ═══════════════════════════════════════════════════════════
       6. SKILLS RADAR CHART COMPONENT (CHART.JS)
    ═══════════════════════════════════════════════════════════ */
    document.addEventListener("DOMContentLoaded", () => {
        const chartCanvas = document.getElementById('skills-radar-chart');
        if (!chartCanvas || typeof Chart === 'undefined') return;

        const isLight = document.body.getAttribute('data-theme') === 'light';
        const labelColor = isLight ? '#1a1d2e' : '#e8eaf0';
        const gridColor = 'rgba(255, 255, 255, 0.06)';

        window.skillsChart = new Chart(chartCanvas, {
            type: 'radar',
            data: {
                labels: ['Frontend', 'Mobile Dev', 'UI/UX Design', 'Backend/Cloud', 'Database', 'Git / Tools'],
                datasets: [{
                    label: 'Tingkat Penguasaan',
                    data: [88, 90, 85, 75, 78, 85],
                    backgroundColor: 'rgba(91, 127, 255, 0.12)',
                    borderColor: '#5b7fff',
                    pointBackgroundColor: '#00e5c3',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#00e5c3',
                    borderWidth: 1.5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: gridColor
                        },
                        grid: {
                            color: gridColor
                        },
                        pointLabels: {
                            color: labelColor,
                            font: {
                                family: "'DM Sans', sans-serif",
                                size: 10,
                                weight: '500'
                            }
                        },
                        ticks: {
                            display: false,
                            maxTicksLimit: 4
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#0b0d14',
                        titleFont: { family: "'Syne', sans-serif" },
                        bodyFont: { family: "'DM Sans', sans-serif" },
                        borderColor: 'rgba(91,127,255,0.15)',
                        borderWidth: 1
                    }
                }
            }
        });
    });
})();
