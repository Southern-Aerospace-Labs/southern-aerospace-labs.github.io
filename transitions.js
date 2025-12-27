let about_section = document.querySelector('.about');
let about_h2 = document.querySelector('.about h2');
let about_image = document.querySelector('.about img');
let about_text = new SplitType('.about p');

let services_h1 = document.querySelectorAll('.services h1');
let services_section = document.querySelector('.services');

first_service_section = document.querySelector('.first-service');
let first_service_h2 = document.querySelector('.first-service h2');
let first_service_p = new SplitType('.first-service p');
let first_service_button = document.querySelector('.first-service a');

second_service_section = document.querySelector('.dark-service');
let second_service_h2 = document.querySelector('.dark-service h2');
let second_service_p = new SplitType('.dark-service p');
let second_service_button = document.querySelector('.dark-service a');
let second_service_img = document.querySelector('.dark-service img');

footer_section = document.querySelector('.footer');
let footer_h1 = document.querySelectorAll('.footer h1');
let footer_p = new SplitType('.footer p');
let footer_links = document.querySelectorAll('.footer a');
let footer_img = document.querySelectorAll('.footer img');

window.addEventListener('scroll', () => {
    if (about_section.getBoundingClientRect().top < (window.innerHeight/2)) {
        about_h2.style.transform = 'translateY(0)';
        this.setTimeout(() => {
            about_image.style.transform = 'translateX(0)';
        }, 200)
        let i = 6;
        this.document.querySelectorAll('.about .line').forEach(line => {
            line.querySelectorAll('.word').forEach(char => {
                char.style.transform = "translateY(0)";
                char.style.transitionDelay = i*25 + 'ms';
                i++;
            })
        })
    }

    if (services_section.getBoundingClientRect().top < (window.innerHeight/4)) {
        let i = 0;
        services_h1.forEach(title => {
            title.style.transform = "translateY(0)";
            title.style.transitionDelay = i*200 + 'ms';
            i++;
        })
    }

    if (first_service_section.getBoundingClientRect().top < (window.innerHeight/2)) {
        first_service_h2.style.transform = 'translateY(0)';
        let i = 6;
        this.document.querySelectorAll('.first-service .line').forEach(line => {
            line.querySelectorAll('.word').forEach(char => {
                char.style.transform = "translateY(0)";
                char.style.transitionDelay = i*25 + 'ms';
                i++;
            })
        })
        this.setTimeout(() => {
            first_service_button.style.transform = 'translateY(0)';
            first_service_button.style.opacity = '1';
        }, 450)
    }

    if (second_service_section.getBoundingClientRect().top < (window.innerHeight/2)) {
        second_service_h2.style.transform = 'translateY(0)';
        let i = 6;
        this.document.querySelectorAll('.dark-service .line').forEach(line => {
            line.querySelectorAll('.word').forEach(char => {
                char.style.transform = "translateY(0)";
                char.style.transitionDelay = i*25 + 'ms';
                i++;
            })
        })
        this.setTimeout(() => {
            second_service_button.style.transform = 'translateY(0)';
            second_service_button.style.opacity = '1';
        }, 450)
        this.setTimeout(() => {
            second_service_img.style.transform = 'translateY(0)';
            second_service_img.style.opacity = '1';
        }, 550)
    }

    if (footer_section.getBoundingClientRect().top < (window.innerHeight/2)) {
        let i = 0;
        footer_h1.forEach(title => {
            title.style.transform = "translateY(0)";
            title.style.transitionDelay = i*100 + 'ms';
            i++;
        })
        footer_img.forEach(image => {
            image.style.transform = 'translateX(0)';
            image.style.transitionDelay = i*100 + 'ms';
            i++;
        })
        i = 10;
        this.document.querySelectorAll('.footer .line').forEach(line => {
            line.querySelectorAll('.word').forEach(char => {
                char.style.transform = "translateY(0)";
                char.style.transitionDelay = i*25 + 'ms';
                i++;
            })
        })
        i=10;
        footer_links.forEach(link => {
            this.setTimeout(() => {
                link.style.transform = 'translateY(0)';
                link.style.opacity = '1';
            }, i*100)
            i++;
        })
    }
})