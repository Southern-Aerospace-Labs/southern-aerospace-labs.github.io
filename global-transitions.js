footer_section = document.querySelector('.footer');
let footer_h1 = document.querySelectorAll('.footer h1');
let footer_p = new SplitType('.footer p');
let footer_links = document.querySelectorAll('.footer a');
let footer_img = document.querySelectorAll('.footer img');

window.addEventListener('scroll', () => {
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