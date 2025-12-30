function toggleOptions(section_name) {
    let i = 0;
    document.querySelectorAll('.suboptions-activated').forEach(activated_item => {
        if (!activated_item.classList.contains(section_name)) {
            activated_item.classList.toggle('suboptions-activated');
            i++;
        }
    });
    if (i > 0) {
        setTimeout(() => {
            document.querySelector('.' + section_name).classList.toggle('suboptions-activated');
        }, 300);
    } else {
        document.querySelector('.' + section_name).classList.toggle('suboptions-activated');
    }
}

function toggleMenu() {
    document.querySelector('.navbar .navigation-menu').classList.toggle('active');
    document.querySelector('.navbar').classList.toggle('navbar-red');
    let selection = document.querySelector('.suboptions-activated') != null;
    if (selection) {
        document.querySelector('.suboptions-activated').classList.toggle('suboptions-activated');
    }
}

window.addEventListener('scroll', () => {
    // If scroll position is greater than 10px, add 'scrolled' class to navbar
    if (window.scrollY > 10) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
})

function goToUrl(destination) {
    document.querySelector('.loading-screen').style.transform = 'scaleY(1)';
    setTimeout(() => {
        window.location.href = destination;
    }, 1000)
}