// =========================================================================
// CONFIGURACIÓN CENTRALIZADA DE CONTACTO (Edita solo aquí tus datos)
// =========================================================================
const CONTACT_DATA = {
    email: "jose@cruztelecom.com",
    linkedin: "https://www.linkedin.com/in/josej-cruz/",
    whatsappPhone: "525613388030", // Lada internacional (52) + número
    msgEN: "Hello José! I saw your portfolio and wanted to contact you.",
    msgES: "Hola José! Vi tu portafolio y me gustaría ponerme en contacto contigo."
};

document.addEventListener("DOMContentLoaded", function() {
    
    // =========================================
    // INYECCIÓN DINÁMICA DE CONTACTOS (PRINCIPIO DRY)
    // =========================================
    document.querySelectorAll('.email-text').forEach(el => el.innerText = CONTACT_DATA.email);
    document.querySelectorAll('.linkedin-link').forEach(el => el.href = CONTACT_DATA.linkedin);
    
    const encodedMsgEN = encodeURIComponent(CONTACT_DATA.msgEN);
    const encodedMsgES = encodeURIComponent(CONTACT_DATA.msgES);
    document.querySelectorAll('.whatsapp-link-en').forEach(el => el.href = `https://wa.me/${CONTACT_DATA.whatsappPhone}?text=${encodedMsgEN}`);
    document.querySelectorAll('.whatsapp-link-es').forEach(el => el.href = `https://wa.me/${CONTACT_DATA.whatsappPhone}?text=${encodedMsgES}`);

    // =========================================
    // 1. ANIMACIONES DE SCROLL (Intersection Observer)
    // =========================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // =========================================
    // 2. LÓGICA DE IDIOMA (Inglés / Español)
    // =========================================
    const langToggleBtn = document.getElementById('langToggle');
    const langText = document.getElementById('langText');
    const body = document.body;

    langToggleBtn.addEventListener('click', () => {
        const currentLang = body.getAttribute('data-lang');
        if (currentLang === 'en') {
            body.setAttribute('data-lang', 'es');
            langText.innerText = 'EN';
        } else {
            body.setAttribute('data-lang', 'en');
            langText.innerText = 'ES';
        }
    });

    // =========================================
    // 3. COPIAR CORREO AL PORTAPAPELES (Múltiples Botones)
    // =========================================
    const copyTriggers = document.querySelectorAll('.copy-email-trigger');
    const toast = document.getElementById('toast');

    if (copyTriggers.length > 0) {
        copyTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault(); 
                
                navigator.clipboard.writeText(CONTACT_DATA.email).then(() => {
                    toast.classList.add('show-toast');
                    setTimeout(() => {
                        toast.classList.remove('show-toast');
                    }, 3000);
                }).catch(err => {
                    console.error('Error al copiar al portapapeles: ', err);
                });
            });
        });
    }
    
    // =========================================
    // 4. ANIMACIÓN DE RED Y TRÁFICO DE PAQUETES (CANVAS)
    // =========================================
    const canvas = document.getElementById('networkCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const header = document.querySelector('.hero');
        
        canvas.width = header.offsetWidth;
        canvas.height = header.offsetHeight;
        
        let particlesArray = [];
        let packetsArray = [];
        let mouse = { x: null, y: null };
        
        header.addEventListener('mousemove', (event) => {
            let rect = header.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        });
        
        header.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // [NUEVO] Neutralizar el comportamiento errático en pantallas táctiles
        window.addEventListener('touchmove', () => {
            if (typeof mouse !== 'undefined') {
                mouse.x = null;
                mouse.y = null;
            }
        }, { passive: true });
        
        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x; this.y = y;
                this.directionX = directionX; this.directionY = directionY;
                this.size = size; this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if(this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if(this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        class Packet {
            constructor(startNode, endNode) {
                this.startNode = startNode;
                this.endNode = endNode;
                this.progress = 0;
                this.speed = 0.01 + Math.random() * 0.02;
            }
            update() {
                this.progress += this.speed;
            }
            draw() {
                let currentX = this.startNode.x + (this.endNode.x - this.startNode.x) * this.progress;
                let currentY = this.startNode.y + (this.endNode.y - this.startNode.y) * this.progress;
                
                ctx.beginPath();
                ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.shadowBlur = 8;
                ctx.shadowColor = '#00f0ff';
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
        
        function initNodes() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 6000;
            for(let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 1.5) + 1;
                let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                let color = 'rgba(0, 240, 255, 0.8)';
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }
        
        function animateNodes() {
            requestAnimationFrame(animateNodes);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for(let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            
            connectNodesAndSpawnPackets();
            
            for(let i = packetsArray.length - 1; i >= 0; i--) {
                packetsArray[i].update();
                packetsArray[i].draw();
                if (packetsArray[i].progress >= 1) {
                    packetsArray.splice(i, 1);
                }
            }
        }
        
        function connectNodesAndSpawnPackets() {
            let opacityValue = 1;
            for(let a = 0; a < particlesArray.length; a++) {
                for(let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                                   ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    
                    if(distance < 10000) {
                        opacityValue = 1 - (distance/10000);
                        ctx.strokeStyle = 'rgba(0, 240, 255,' + opacityValue + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();

                        if (Math.random() < 0.0008) {
                            packetsArray.push(new Packet(particlesArray[a], particlesArray[b]));
                        }
                    }
                }
                
                if(mouse.x != null && mouse.y != null) {
                    let distanceMouse = ((particlesArray[a].x - mouse.x) * (particlesArray[a].x - mouse.x)) + 
                                        ((particlesArray[a].y - mouse.y) * (particlesArray[a].y - mouse.y));
                    if(distanceMouse < 20000) {
                        ctx.strokeStyle = 'rgba(0, 240, 255,' + (1 - distanceMouse/20000) + ')';
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        // [NUEVO] Control de redimensionamiento optimizado
        let currentScreenWidth = window.innerWidth;
        
        window.addEventListener('resize', () => {
            // Solo reiniciamos la animación si la pantalla cambia de ancho (rotación)
            if (window.innerWidth !== currentScreenWidth) {
                canvas.width = header.offsetWidth;
                canvas.height = header.offsetHeight;
                currentScreenWidth = window.innerWidth;
                initNodes();
            }
        });
        
        initNodes();
        animateNodes();
    }
});