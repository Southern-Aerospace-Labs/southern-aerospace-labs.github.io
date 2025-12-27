let loading_screen_h2 = new SplitType('.loading-screen h2');

function loadingScreenAnimation() {
    let i = 0;
    this.document.querySelectorAll('.loading-screen .line').forEach(line => {
        line.querySelectorAll('.word').forEach(char => {
            char.style.transform = "translateY(0)";
            char.style.transitionDelay = i*25 + 'ms';
            i++;
        })
    })

    setTimeout(() => {
        this.document.querySelectorAll('.loading-screen .line').forEach(line => {
            line.querySelectorAll('.word').forEach(char => {
                char.style.opacity = "0";
            })
        })
    }, 1500)

    setTimeout(() => {
        document.querySelector('.loading-screen').style.transform = 'scaleY(0)';
    }, 1900)
}