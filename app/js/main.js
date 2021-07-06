if (document.readyState === 'loading') {

    document.addEventListener("DOMContentLoaded", function (event) {
        // swiper
        const swiper = new Swiper('.testimonials', {
            slidesPerView: 1,
            navigation: {
                nextEl: '.testimonials__nav-btn_dir_next',
                prevEl: '.testimonials__nav-btn_dir_prev'
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            spaceBetween: 20,
            slideToClickedSlide: true,
            centeredSlides: true,
            loop: true,
            breakpoints: {
                548: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    centeredSlides: false
                },
                932: {
                    slidesPerView: 3,
                    spaceBetween: 50
                }
            }
        });

        // menu

        const toggleActiveClasses = () => {
            document.body.classList.toggle('page_lock');
            iconMenu.classList.toggle('menu__icon_active');
            menuBody.classList.toggle('menu__body_active');
        }

        const iconMenu = document.querySelector('.menu__icon');
        const menuBody = document.querySelector('.menu__body');

        if (iconMenu) iconMenu.addEventListener('click', toggleActiveClasses)

        //

        // smooth scrolling stub

        const nativeSmoothScrollTo = (gotoSection, extraDistance) => {

            const gotoSectionValue = gotoSection.getBoundingClientRect().top + pageYOffset - extraDistance;

            window.scrollTo({
                top: gotoSectionValue,
                behavior: "smooth"
            });
        }

        const smoothScrollTo = (to, duration) => {
            const element = document.scrollingElement || document.documentElement,
                start = element.scrollTop,
                change = to - start,
                startDate = +new Date();

            // t = current time
            // b = start value
            // c = change in value
            // d = duration
            const easeInOutQuad = (t, b, c, d) => {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            };

            const animateScroll = _ => {
                const currentDate = +new Date();
                const currentTime = currentDate - startDate;
                element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
                if (currentTime < duration) {
                    requestAnimationFrame(animateScroll);
                }
                else {
                    element.scrollTop = to;
                }
            };
            animateScroll();
        };


        const scrollToElem = elem => {
            if (!elem) {
                return;
            }

            const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;

            if (elem) {
                if (supportsNativeSmoothScroll) {
                    nativeSmoothScrollTo(elem, document.querySelector('header').offsetHeight);
                } else {
                    smoothScrollTo(elem.offsetTop, 600);
                }
            }
        };



        const onMenuLinkClick = e => {
            const menuLink = e.target;
            const dataAttr = menuLink.getAttribute('href');
            const gotoSection = document.querySelector(dataAttr);

            if (dataAttr && gotoSection) {

                if (iconMenu.classList.contains('menu__icon_active')) toggleActiveClasses();
                scrollToElem(gotoSection);
                e.preventDefault();

            }

        }

        const menuLinks = document.querySelectorAll('.link');

        if (menuLinks) {

            if (typeof NodeList.prototype.forEach !== 'function') {
                NodeList.prototype.forEach = Array.prototype.forEach;
            }

            menuLinks.forEach(menuLink => {
                menuLink.addEventListener('click', onMenuLinkClick);
            })


        }

    });
}


