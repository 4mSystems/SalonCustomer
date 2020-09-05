(function ($) {
    "use strict"

    /* 1. Proloder */
    $(window).on('load', function () {
        $('#preloader-active').delay(450).fadeOut('slow');
        $('body').delay(450).css({
            'overflow': 'visible'
        });
    });


    /* 2. slick Nav */
    // mobile_menu
    var menu = $('ul#navigation');
    if (menu.length) {
        menu.slicknav({
            prependTo: ".mobile_menu",
            closedSymbol: '+',
            openedSymbol: '-'
        });
    };


    /* 3. MainSlider-1 */
    function mainSlider() {
        var BasicSlider = $('.slider-active');
        BasicSlider.on('init', function (e, slick) {
            var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });
        BasicSlider.slick({
            autoplay: false,
            autoplaySpeed: 10000,
            dots: false,
            fade: true,
            arrows: false,
            prevArrow: '<button type="button" class="slick-prev"><i class="ti-shift-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="ti-shift-right"></i></button>',
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
            ]
        });

        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function () {
                    $this.removeClass($animationType);
                });
            });
        }
    }
    mainSlider();



    /* 4. Testimonial Active*/
    var testimonial = $('.h1-testimonial-active');
    if (testimonial.length) {
        testimonial.slick({
            dots: false,
            infinite: true,
            speed: 1000,
            autoplay: false,
            loop: true,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrow: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
            ]
        });
    }


    /* 5. Gallery Active */
    var client_list = $('.completed-active');
    if (client_list.length) {
        client_list.owlCarousel({
            slidesToShow: 2,
            slidesToScroll: 1,
            loop: true,
            autoplay: true,
            speed: 3000,
            smartSpeed: 2000,
            nav: false,
            dots: false,
            margin: 15,

            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 2
                },
                1200: {
                    items: 3
                }
            }
        });
    }


    /* 6. Nice Selectorp  */
    var nice_Select = $('select');
    if (nice_Select.length) {
        nice_Select.niceSelect();
    }

    /* 7.  Custom Sticky Menu  */
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll < 245) {
            $(".header-sticky").removeClass("sticky-bar");
        } else {
            $(".header-sticky").addClass("sticky-bar");
        }
    });

    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll < 245) {
            $(".header-sticky").removeClass("sticky");
        } else {
            $(".header-sticky").addClass("sticky");
        }
    });



    /* 8. sildeBar scroll */
    $.scrollUp({
        scrollName: 'scrollUp', // Element ID
        topDistance: '300', // Distance from top before showing element (px)
        topSpeed: 300, // Speed back to top (ms)
        animation: 'fade', // Fade, slide, none
        animationInSpeed: 200, // Animation in speed (ms)
        animationOutSpeed: 200, // Animation out speed (ms)
        scrollText: '<i class="ti-arrow-up"></i>', // Text for element
        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
    });


    /* 9. data-background */
    $("[data-background]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
    });


    /* 10. WOW active */
    new WOW().init();

    /* 11. Datepicker */

    // 11. ---- Mailchimp js --------//  
    function mailChimp() {
        $('#mc_embed_signup').find('form').ajaxChimp();
    }
    mailChimp();


    // 12 Pop Up Img
    var popUp = $('.single_gallery_part, .img-pop-up');
    if (popUp.length) {
        popUp.magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }


    /* ----------------- Other Inner page Start ------------------ */


    $('.popup-youtube, .popup-vimeo').magnificPopup({
        // disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    var review = $('.client_review_slider');
    if (review.length) {
        review.owlCarousel({
            items: 1,
            loop: true,
            dots: true,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            nav: true,
            dots: false,
            navText: [" <i class='ti-angle-left'></i> ", "<i class='ti-angle-right'></i> "],
            responsive: {
                0: {
                    nav: false
                },
                768: {
                    nav: false
                },
                991: {
                    nav: true
                }
            }
        });
    }


    var product_slide = $('.product_img_slide');
    if (product_slide.length) {
        product_slide.owlCarousel({
            items: 1,
            loop: true,
            dots: true,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            nav: true,
            dots: false,
            navText: [" <i class='ti-angle-left'></i> ", "<i class='ti-angle-right'></i> "],
            responsive: {
                0: {
                    nav: false
                },
                768: {
                    nav: false
                },
                991: {
                    nav: true
                }
            }
        });
    }

    //product list slider
    var product_list_slider = $('.product_list_slider');
    if (product_list_slider.length) {
        product_list_slider.owlCarousel({
            items: 1,
            loop: true,
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            nav: true,
            navText: ["next", "previous"],
            smartSpeed: 1000,
            responsive: {
                0: {
                    margin: 15,
                    nav: false,
                    items: 1
                },
                600: {
                    margin: 15,
                    items: 1,
                    nav: false
                },
                768: {
                    margin: 30,
                    nav: true,
                    items: 1
                }
            }
        });
    }

    if ($('.img-gal').length > 0) {
        $('.img-gal').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }

    // niceSelect js code
    $(document).ready(function () {
        $('select').niceSelect();
    });

    // menu fixed js code
    $(window).scroll(function () {
        var window_top = $(window).scrollTop() + 1;
        if (window_top > 50) {
            $('.main_menu').addClass('menu_fixed animated fadeInDown');
        } else {
            $('.main_menu').removeClass('menu_fixed animated fadeInDown');
        }
    });

    // $('.counter').counterUp({
    //   time: 2000
    // });

    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        speed: 300,
        infinite: true,
        asNavFor: '.slider-nav-thumbnails',
        autoplay: true,
        pauseOnFocus: true,
        dots: true,
    });

    $('.slider-nav-thumbnails').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider',
        focusOnSelect: true,
        infinite: true,
        prevArrow: false,
        nextArrow: false,
        centerMode: true,
        responsive: [{
            breakpoint: 480,
            settings: {
                centerMode: false,
            }
        }]
    });


    // Search Toggle
    $("#search_input_box").hide();
    $("#search_1").on("click", function () {
        $("#search_input_box").slideToggle();
        $("#search_input").focus();
    });
    $("#close_search").on("click", function () {
        $('#search_input_box').slideUp(500);
    });

    //------- Mailchimp js --------//  
    function mailChimp() {
        $('#mc_embed_signup').find('form').ajaxChimp();
    }
    mailChimp();

    //------- makeTimer js --------//  
    function makeTimer() {

        //		var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");	
        var endTime = new Date("27 Sep 2019 12:56:00 GMT+01:00");
        endTime = (Date.parse(endTime) / 1000);

        var now = new Date();
        now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;

        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        if (hours < "10") {
            hours = "0" + hours;
        }
        if (minutes < "10") {
            minutes = "0" + minutes;
        }
        if (seconds < "10") {
            seconds = "0" + seconds;
        }

        $("#days").html("<span>Days</span>" + days);
        $("#hours").html("<span>Hours</span>" + hours);
        $("#minutes").html("<span>Minutes</span>" + minutes);
        $("#seconds").html("<span>Seconds</span>" + seconds);

    }
    // click counter js
    (function () {

        window.inputNumber = function (el) {

            var min = el.attr('min') || false;
            var max = el.attr('max') || false;

            var els = {};

            els.dec = el.prev();
            els.inc = el.next();


            els.dec.on('click', decrement);
            els.inc.on('click', increment);

            function decrement() {
                var value = $(this).next().attr("value");
                value--;
                if (!min || value >= min) {
                    $(this).next().attr("value", value);
                }
            }

            function increment() {
                var value = $(this).prev().attr("value");
                value++;
                if (!max || value <= max) {
                    $(this).prev().attr("value", value);
                }
            }
        }
    })();

    inputNumber($('.input-number'));

    setInterval(function () {
        makeTimer();
    }, 1000);


    $('.select_option_dropdown').hide();
    $(".select_option_list").click(function () {
        $(this).parent(".select_option").children(".select_option_dropdown").slideToggle('100');
        $(this).find(".right").toggleClass("fas fa-caret-down, fas fa-caret-up");
    });

    if ($('.new_arrival_iner').length > 0) {
        var containerEl = document.querySelector('.new_arrival_iner');
        var mixer = mixitup(containerEl);
    }


    $('.controls').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });


    /* ----------------- Other Inner page End ------------------ */


})(jQuery);

sessionStorage.clear();


if (Cookies.get('loginSalon') != null) {
    var saved_data = JSON.parse(Cookies.get('loginSalon'));
    $('#login_item').append(' <ul class="header-right f-right d-none d-lg-block d-flex justify-content-between" id="profile-dropdown">' +
        '<li class="dropdown" data-toggle="dropdown"><a href="#" type="button" data-toggle="dropdown"><img class="img-fluid rounded-circle" style="width:40%;height:20%;" ' +
        'src="' + saved_data.data.image + '"/></a><div class="dropdown-menu"><a onclick="logout()">تسجيل الخروج</a></div></li></ul>');
} else {
    $('#login_item').append('<a href="login.html" class="btn header-btn">تسجيل دخول</a>');
}
function logout() {
    Cookies.remove("loginSalon");
    location.reload();
}
function addToCart(value, type = null) {
    if (Cookies.get('loginSalon') == null) {
        location.href = "../../login.html"
    }
    var pageid = location.pathname;
    var cookies = JSON.parse(Cookies.get('loginSalon'));
    var obj;

    if (pageid == "/Services.html" || type == "ser") {
        obj = {
            api_token: cookies.data.api_token,
            user_id: cookies.data.id,
            service_id: value,
            salon_id: salonId

        }
    } else if (pageid == "/Products.html" || type == "pro") {
        obj = {
            api_token: cookies.data.api_token,
            user_id: cookies.data.id,
            product_id: value,
            salon_id: salonId
        }
    }

    $.ajax({
        url: "http://vqb.mqu.mybluehost.me/BeautyCenterApp/public/api/addtocart",
        dataType: "json",
        type: 'POST',
        data: obj,
        success: function (res) {
            console.log(res);
            if(res.code == 200){
                $(".badge").text(res.data)
                $("#alert").fadeIn();
                setTimeout(function () {
                    $("#alert").fadeOut();
                }, 3000);
            }
            if(res.code == 400){
                $("#alertdanger").fadeIn();
                setTimeout(function () {
                    $("#alertdanger").fadeOut();
                }, 3000);
            }
        }
    });
}

function OpenDialogCart() {
    if (Cookies.get('loginSalon') == null) {
        location.href = "../../login.html"
    }
    var value = JSON.parse(Cookies.get('loginSalon')).data.api_token;
    var obj = {
        api_token: value
    }
    getAllCart(obj);
}
function getAllCart(obj) {
    $(".cart-container .loadingio-spinner-spinner").attr("style", "display:block");
    $(".cart-container .cart-detail").remove();
    $("#total-amount").text("0دك");
    var totatAmount = 0;
    $.ajax({
        url: "http://vqb.mqu.mybluehost.me/BeautyCenterApp/public/api/allCart",
        dataType: "json",
        type: 'POST',
        data: obj,
        success: function (res) {
            console.log(res);
            if (res.data.carts_products.length == 0 && res.data.carts_products.length ==0 ) {
                $(".cart-container").attr("style", "min-height:71px")
                $(".cart-container").append("<p style='text-align:center;padding:20px 0px'>سلة المنتجات فارغة</p>")
            } else {
                res.data.carts_products.forEach(cartList);
                res.data.carts_services.forEach(cartList);
            }
            $(".arabic .cart-container .loadingio-spinner-spinner").attr("style", "display:none");
        }
    });

    function cartList(value) {
        var img, name, count, price;
        if (value.product_id != null) {
            console.log(value.get_product.main_image);
            img = value.get_product.main_image;
            name = value.get_product.name;
            count = value.count;
            if (value.get_product.price_after != null) {
                price = value.get_product.price_after * value.count;
            } else {
                price = value.get_product.price_before * value.count;

            }
        } else if (value.service_id != null) {
            img = value.get_service.image;
            name = value.get_service.name;
            count = 1;
            if (value.get_service.price_after != null) {
                price = value.get_service.price_after;
            } else {
                price = value.get_service.price_before;

            }
        }
        console.log(price);
        totatAmount += price;
        $(".cart-container").append('<div class="row cart-detail">'
            + '<div class="col-lg-4 col-sm-4 col-4 cart-detail-img">'
            + '<img src="' + img + '">'
            + '</div>'
            + '<div class="col-lg-8 col-sm-8 col-8 cart-detail-product">'
            + ' <p>' + name + '</p>'
            + ' <span class="count"> الكمية : ' + count + '</span>'
            + '<span class="price text-info"> السعر :' + price + 'دك</span> </div></div>');


        $("#total-amount").text(totatAmount + "دك")

    }
}

