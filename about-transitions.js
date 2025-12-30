let parallax_image = document.querySelector('.image-container .image');

let about_section = document.querySelector('.about .summary');
let more_info_section = document.querySelector('.about .more-info');

let about_h3 = document.querySelector('.about h3');
let summary_text = new SplitType('.summary p');
let more_info_text = new SplitType('.more-info p');

let first_principle_section = document.querySelector('.principles .vision');
let second_principle_section = document.querySelector('.principles .values');
let third_principle_section = document.querySelector('.principles .mission');
let principles_text = new SplitType('.principles p');
let principles_h2 = document.querySelector('.principles h2');


window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollPercent = scrollTop / docHeight;
    background_position_y = 150 - (scrollPercent*200);
    parallax_image.style.backgroundPosition = '50% ' + background_position_y + '%';
})

window.addEventListener('scroll', () => {
    if (about_section.getBoundingClientRect().top < (window.innerHeight/2)) {
        about_h3.style.transform = 'translateY(0)';
        let i = 6;
        this.document.querySelectorAll('.about .summary .line').forEach(line => {
            line.querySelectorAll('.word').forEach(char => {
                char.style.transform = "translateY(0)";
                char.style.transitionDelay = i*25 + 'ms';
                i++;
            })
        })
    }

    if (more_info_section.getBoundingClientRect().top < (window.innerHeight/2)) {
        more_info_section.style.opacity = '1';
        let i = 6;
        this.document.querySelectorAll('.more-info .line').forEach(line => {
            line.querySelectorAll('.word').forEach(char => {
                char.style.transform = "translateY(0)";
                char.style.transitionDelay = i*100 + 'ms';
            })
            i++;
        })
    }

    if (first_principle_section.getBoundingClientRect().top < (window.innerHeight)) {
        principles_h2.style.transform = 'translateY(0)';
        setTimeout(() => {
            first_principle_section.style.opacity = '1';
        }, 300)
        setTimeout(() => {
            first_principle_section.querySelector('h3').style.transform = 'translateY(0)';
        }, 500)
        let i = 6;
        this.document.querySelectorAll('.principles .vision .line').forEach(line => {
            line.querySelectorAll('.word').forEach(char => {
                char.style.transform = "translateY(0)";
                char.style.transitionDelay = i*100 + 'ms';
            })
            i++;
        })
    }

    if (second_principle_section.getBoundingClientRect().top < (window.innerHeight / 1.25)) {
        second_principle_section.style.opacity = 1;
        setTimeout(() => {
            second_principle_section.querySelector('h3').style.transform = 'translateY(0)';
        }, 200)
        let i = 4;
        this.document.querySelectorAll('.principles .values .line').forEach(line => {
            line.querySelectorAll('.word').forEach(char => {
                char.style.transform = "translateY(0)";
                char.style.transitionDelay = i*100 + 'ms';
            })
            i++;
        })
    }

    if (third_principle_section.getBoundingClientRect().top < (window.innerHeight / 1.25)) {
        third_principle_section.style.opacity = 1;
        setTimeout(() => {
            third_principle_section.querySelector('h3').style.transform = 'translateY(0)';
        }, 200)
        let i = 4;
        this.document.querySelectorAll('.principles .mission .line').forEach(line => {
            line.querySelectorAll('.word').forEach(char => {
                char.style.transform = "translateY(0)";
                char.style.transitionDelay = i*100 + 'ms';
            })
            i++;
        })
    }
})