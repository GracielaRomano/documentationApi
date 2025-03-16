$(document).ready(function() {
    // Animación inicial del hero
    setTimeout(function() {
        $('.hero').addClass('loaded');
        $('.hero-library').addClass('loaded');

    }, 200);

    // Animación de las características al hacer scroll
    const animateFeatureCards = function() {
        const featureCards = $('.feature-card');
        
        featureCards.each(function(index) {
            const card = $(this);
            const cardPosition = card.offset().top;
            const scrollPosition = $(window).scrollTop() + $(window).height() * 0.8;
            
            if (scrollPosition > cardPosition) {
                setTimeout(function() {
                    card.addClass('visible');
                }, index * 100); // Escalonamos la animación
            }
        });
    };

    // Animación de los pasos al hacer scroll
    const animateSteps = function() {
        const steps = $('.step');
        
        steps.each(function(index) {
            const step = $(this);
            const stepPosition = step.offset().top;
            const scrollPosition = $(window).scrollTop() + $(window).height() * 0.8;
            
            if (scrollPosition > stepPosition) {
                setTimeout(function() {
                    step.addClass('visible');
                }, index * 150); // Escalonamos la animación
            }
        });
    };

    // Smooth scroll para los enlaces del menú
    $('nav a, .btn').on('click', function(e) {
        if (this.hash !== '') {
            e.preventDefault();
            
            const hash = this.hash;
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });

    // Manejo de tabs
    $('.tab-btn').on('click', function() {
        const tabId = $(this).data('tab');
        
        // Remover clase active de todos los botones y contenidos
        $('.tab-btn').removeClass('active');
        $('.tab-content').removeClass('active');
        
        // Agregar clase active al botón y contenido seleccionado
        $(this).addClass('active');
        $('#' + tabId).addClass('active');
        
        // Reiniciar la animación de los pasos
        const steps = $('#' + tabId + ' .step');
        steps.removeClass('visible');
        
        setTimeout(function() {
            animateSteps();
        }, 100);
    });

    // Toggle para errores comunes (expandir/contraer soluciones)
    $('.error-item h4').on('click', function() {
        const solutionList = $(this).siblings('.solution-list');
        solutionList.slideToggle(300);
        $(this).parent().toggleClass('active');
    });

    // Agregar efecto hover a los bloques de código
    $('.code-block').hover(
        function() {
            $(this).css('box-shadow', '0 4px 12px rgba(0, 0, 0, 0.1)');
        },
        function() {
            $(this).css('box-shadow', 'none');
        }
    );

    // Botón para copiar código al portapapeles
    $('.code-block').each(function() {
        const codeBlock = $(this);
        const copyButton = $('<button class="copy-btn">Copiar</button>');
        
        copyButton.css({
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'var(--success)',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            padding: '0.3rem 0.6rem',
            fontSize: '0.75rem',
            cursor: 'pointer',
            opacity: '0',
            transition: 'opacity 0.3s'
        });
        
        codeBlock.css('position', 'relative').append(copyButton);
        
        codeBlock.hover(
            function() {
                copyButton.css('opacity', '1');
            },
            function() {
                copyButton.css('opacity', '0');
            }
        );
        
        copyButton.on('click', function() {
            const codeText = codeBlock.text();
            
            // Crear un elemento textarea temporal
            const textarea = document.createElement('textarea');
            textarea.value = codeText;
            document.body.appendChild(textarea);
            
            // Seleccionar y copiar el texto
            textarea.select();
            document.execCommand('copy');
            
            // Eliminar el textarea temporal
            document.body.removeChild(textarea);
            
            // Cambiar texto del botón temporalmente
            copyButton.text('¡Copiado!');
            setTimeout(function() {
                copyButton.text('Copiar');
            }, 2000);
        });
    });

    // Detección de scroll para animaciones
    $(window).on('scroll', function() {
        animateFeatureCards();
        animateSteps();
    });

    // Iniciar animaciones al cargar la página
    animateFeatureCards();
    animateSteps();

    // Mantener activo el tab seleccionado al recargar la página
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const tabBtn = $('[data-tab="' + hash + '"]');
        
        if (tabBtn.length) {
            tabBtn.click();
        }
    }

    // Agregar animaciones a elementos específicos
    $('.logo').addClass('pulse');

    // Agregar interactividad a la navegación
    $('nav ul li a').each(function() {
        if ($(this).attr('href') === window.location.hash) {
            $(this).addClass('active');
        }
    });

    $('nav ul li a').on('click', function() {
        $('nav ul li a').removeClass('active');
        $(this).addClass('active');
    });

    // Efecto parallax para el hero
    $(window).on('scroll', function() {
        const scrollPosition = $(window).scrollTop();
        $('.hero').css('background-position', '0 ' + (scrollPosition * 0.2) + 'px');
        $('.hero-library').css('background-position', '0 ' + (scrollPosition * 0.2) + 'px');
    });

    // Menú responsive para móviles
    const createMobileMenu = function() {
        if ($(window).width() <= 768 && !$('.mobile-toggle').length) {
            const mobileToggle = $('<button class="mobile-toggle">☰</button>');
            
            mobileToggle.css({
                display: 'none',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: 'var(--primary)',
                marginBottom: '1rem'
            });
            
            $('.header-content').prepend(mobileToggle);
            
            mobileToggle.on('click', function() {
                $('nav ul').slideToggle(300);
            });
            
            if ($(window).width() <= 768) {
                mobileToggle.css('display', 'block');
                $('nav ul').hide();
            }
        } else if ($(window).width() > 768) {
            $('.mobile-toggle').remove();
            $('nav ul').show();
        }
    };

    // Inicializar menú responsive
    createMobileMenu();
    
    // Ajustar menú al cambiar tamaño de ventana
    $(window).on('resize', function() {
        createMobileMenu();
    });
});