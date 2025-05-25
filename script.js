/*=============== SHOW MENU ===============*/
document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('nav-menu'),
          navToggle = document.getElementById('nav-toggle'),
          navClose = document.getElementById('nav-close')

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu')
        })
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu')
        })
    }

    /*=============== REMOVE MENU MOBILE ===============*/
    const navLink = document.querySelectorAll('.nav__link')

    function linkAction() {
        const navMenu = document.getElementById('nav-menu')
        navMenu.classList.remove('show-menu')
    }
    navLink.forEach(n => n.addEventListener('click', linkAction))

    /*=============== ADD BLUR HEADER ===============*/
    function scrollHeader() {
        const header = document.getElementById('header')
        if (!header) {
            console.error('Header element not found!')
            return
        }
        if (this.scrollY >= 50) {
            header.classList.add('blur-header')
            header.classList.add('scrolled')
        } else {
            header.classList.remove('blur-header')
            header.classList.remove('scrolled')
        }
    }
    window.addEventListener('scroll', scrollHeader)

    /*=============== EMAIL JS ===============*/
    const contactForm = document.getElementById('contact-form'),
          contactMessage = document.createElement('div')

    contactMessage.classList.add('contact__message')

    // Initialize EmailJS with your public key
    emailjs.init('owgQkOI8xpHkgGUhZ')

    const sendEmail = (e) => {
        e.preventDefault()

        // Validate form inputs
        const nameInput = document.getElementById('names').value.trim(),
              emailInput = document.getElementById('email').value.trim(),
              messageInput = document.getElementById('message').value.trim()

        if (!nameInput || !emailInput || !messageInput) {
            contactMessage.textContent = 'Please fill in all fields ❌'
            contactMessage.classList.add('error')
            contactForm.appendChild(contactMessage)

            setTimeout(() => {
                contactMessage.remove()
            }, 5000)
            return
        }

        // Log data sebelum dikirim
        console.log('Form Data:', {
            names: nameInput,
            email: emailInput,
            message: messageInput
        })

        // Send email using EmailJS
        emailjs.sendForm('service_2vveotd', 'template_rf3ftmm', '#contact-form')
            .then(() => {
                contactMessage.textContent = 'Message sent successfully ✅'
                contactMessage.classList.add('success')
                contactForm.appendChild(contactMessage)

                setTimeout(() => {
                    contactMessage.remove()
                    contactForm.reset()
                }, 5000)
            }, (error) => {
                contactMessage.textContent = 'Message not sent (service error) ❌'
                contactMessage.classList.add('error')
                contactForm.appendChild(contactMessage)

                setTimeout(() => {
                    contactMessage.remove()
                }, 5000)
                console.error('EmailJS error details:', error.text, error)
            })
    }

    if (contactForm) {
        contactForm.addEventListener('submit', sendEmail)
    }

    /*=============== SHOW SCROLL UP ===============*/ 
    function scrollUp() {
        const scrollUp = document.getElementById('scroll-up')
        if (this.scrollY >= 200) scrollUp.classList.add('show-scroll')
        else scrollUp.classList.remove('show-scroll')
    }
    window.addEventListener('scroll', scrollUp)

    /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
    const sections = document.querySelectorAll('section[id]')

    function scrollActive() {
        const scrollY = window.pageYOffset

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight
            const sectionTop = current.offsetTop - 60
            const sectionId = current.getAttribute('id')
            
            const activeLink = document.querySelector(`.nav__menu .nav__list a[href*="${sectionId}"]`)
            if (activeLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    activeLink.classList.add('active-link')
                } else {
                    activeLink.classList.remove('active-link')
                }
            }
        })
    }
    window.addEventListener('scroll', scrollActive)

    /*=============== SCROLL REVEAL ANIMATION ===============*/
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '80px',
            duration: 1800,
            delay: 200,
            reset: true
        })

        sr.reveal(`.home__data`, { delay: 400, origin: 'left' })
        sr.reveal(`.home__photo`, { delay: 500, origin: 'right' })
        sr.reveal(`.home__scroll`, { delay: 600, origin: 'bottom' })
        sr.reveal(`.work__card, .videos__card`, { interval: 200, origin: 'bottom', opacity: 0 })
        sr.reveal(`.info__data`, { interval: 200, origin: 'left' })
        sr.reveal(`.info__photo`, { delay: 500, origin: 'right' })
        sr.reveal(`.info__skills`, { delay: 600, origin: 'bottom', opacity: 0 })
        sr.reveal(`.services__card`, { interval: 200, origin: 'top' })
        sr.reveal(`.contact__container > *`, { interval: 200, origin: 'bottom', opacity: 0 })
    }
})
