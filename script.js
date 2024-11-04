//La validación del formulário con javascript es considerada un desafío extra, no es obligatório realizar esta validación para realizar su entrega
// Script para manejar el formulario de contacto

// menu links
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav__list');
    const header = document.querySelector('.header');
    const contactForm = document.getElementById('contact-form');

    // Funcionalidad del menú hamburguesa
    navToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace (móvil)
    document.querySelectorAll('.nav__list a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 480) {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
            }
            
            // Scroll a las secciones
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 480 && 
            !navList.contains(e.target) && 
            !navToggle.contains(e.target) && 
            navList.classList.contains('active')) {
            navList.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Control de visibilidad del header al hacer scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Validación del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validación básica
            if (!name || !email || !subject || !message) {
                alert('Por favor, complete todos los campos');
                return;
            }

            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingrese un email válido');
                return;
            }

            // Simulación de envío del formulario
            console.log('Formulario enviado:', { name, email, subject, message });
            
            // Resetear formulario y mostrar mensaje de éxito
            contactForm.reset();
            alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
        });
    }

    // Animación para los elementos del formulario
    const formInputs = document.querySelectorAll('.form__group input, .form__group textarea');
    formInputs.forEach(input => {
        // Clase active si el campo tiene valor al cargar
        if (input.value) {
            input.parentElement.classList.add('active');
        }

        // Eventos de focus y blur
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('active');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('active');
            }
        });
    });
});

