$(document).ready(function() {
    var mq = window.matchMedia("(max-width: 570px)");
    if (mq.matches) {
        var value = 5;

    }
    var value = 9;
    var owl = $('#servise-list');
    owl.owlCarousel({
        items: value,
        loop: true,
        margin: 20,
        slideTransition: 'linear',
        autoplay: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 4000,
        autoplayHoverPause: false,
        dots: false

    });
});