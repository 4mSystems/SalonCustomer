/*
 ◄------------------------------------------------------------► 
 This file includes all cusomized javascript and all plugins libraries options 
 ◄------------------------------------------------------------►
 */


var the_base_url = $("#base-url").val();
// public function 
function RemoveDisabledTimes() {

    //Remove all in sequence 
    $('.service-calendar li.disabled:first-child .select-time').each(function () {
        $(this).parent('li').nextUntil('li:not(.disabled)').hide();
    });

    $('.service-calendar li.disabled:last-child .select-time').each(function () {
        $(this).parent('li').prevUntil('li:not(.disabled)').hide();
    });

    $('.service-calendar li.disabled').each(function () {
        var time = $(this).closest('.service-offered').find('.time-amount').attr('data-time'),
                numOfbtns = (time / 15) - 1;
        console.log(numOfbtns);
        $(this).hide();
        for (var i = 0; i < numOfbtns; i++) {

            $(this).prevUntil().eq(i).hide();
        }


    });

}

function reomveCanNotTimes() {
    $('.service-calendar li.cannot').each(function () {
        var time = $(this).closest('.service-offered').find('.time-amount').attr('data-time'),
                numOfbtns = (time / 15) - 1;
        console.log(numOfbtns);
        $(this).hide();
        for (var i = 0; i < numOfbtns; i++) {

            $(this).prevUntil().eq(i).hide();
        }


    });
}




function reomveCanNotTimesHome() {
    // get total blocks 
    var totalblock = 0;

    totalblock += parseInt($('.salon-services-wrapper').attr("data-time"));

    $('.service-calendar li.cannot').each(function () {

        var numOfbtns = parseInt((parseInt(totalblock / 15)) - 1);
        // console.log(numOfbtns);
        var timedataclock = $(this).find('button').attr("data-clock");
        console.log(timedataclock);

        $('.' + timedataclock).hide();
        for (var i = 0; i < numOfbtns + 4; i++) {
            // alert($(this).parents().eq(i).find('button').attr("data-clock"));
            console.log($(this).prevUntil().eq(i).find('.select-time').attr("data-clock"));

            var data_clock = $(this).prevUntil().eq(i).find('.select-time').attr("data-clock");
            var data_clock_next = $(this).nextUntil().eq(i).find('.select-time').attr("data-clock");
            $('.' + data_clock).hide();
            $('.' + data_clock_next).hide();
            // console.log(i + '.' + data_clock)

            // console.log($('.' + data_clock ).html())


        }

    });
}

function addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices) {
    $.ajax({
        method: "POST",
        url: the_base_url + "/add_to_cart",
        data: {serviceType: serviceType, minimumChargeAmount: minimumChargeAmount, packagesIds: packagesIds, servicesIds: servicesIds, totalPrice: totalPrice, services_check: services_check, salon_id: salon_id, date: date, numServices: numServices},
        cache: false,
        success: function (datas) {
            console.log(datas);
        }
    })

    $(".removeAll").show();

    if ($("#serviceType").val() == 1) {
        $('.tocalendar').attr('action', the_base_url + '/contenuBooking?homecalendar');
    } else {
        $('.tocalendar').attr('action', the_base_url + '/contenuBooking?saloncalendar');
    }

}



function emptyTheCart() {

    $.ajax({
        method: "POST",
        url: the_base_url + "/clear_cart_session",
        data: {},
        cache: false,
        success: function (datas) {
            $('#carrrt .service-in-list').remove();
            $(".cart-switcher .num").html('0');
            $('.contenuBook').hide();
            $('.no-services').removeClass('hide');
            $('.totalPrice').html('');
            $('.cart_salon_id').val('');
            $('#servicesIds').val('');
            $('#serviceType').val('');
            $('#packagesIds').val('');
            $('#services_check').val('');
            $('.cart_salon_id').val('');
            $('.anotherSaloneAlert').hide('');
        }
    })



}


//call when need to empty the cart whitout need to add service after removing 
function ConfirmDialog(message, title) {
    $('<div></div>').appendTo('body')
            .html('<div><h6>' + message + '?</h6></div>')
            .dialog({
                modal: true, title: title, zIndex: 1000000000000000, autoOpen: true,
                width: 'auto', resizable: false,
                dialogClass: 'cart-daialog',
                buttons: {
                    Yes: function () {
                        // $(obj).removeAttr('onclick');                                
                        // $(obj).parents('.Parent').remove();
                        emptyTheCart();


                        $(this).dialog("close");
                    },
                    No: function () {
                        $('body').append('<h1>Confirm Dialog Result: <i>No</i></h1>');

                        $(this).dialog("close");
                    }
                },
                close: function (event, ui) {
                    $(this).remove();
                }
            });
}
;

//call when want to add service from another salon and make choosing for user 
function ConfirmAnotherSalonDialog(message, title, choosenItem) {
    $('<div></div>').appendTo('body')
            .html('<div><h6>' + message + '?</h6></div>')
            .dialog({
                modal: true, title: title, zIndex: 1000000000000000, autoOpen: true,
                width: 'auto', resizable: false,
                dialogClass: 'cart-daialog',
                buttons: {
                    Yes: function () {
                        // $(obj).removeAttr('onclick');                                
                        // $(obj).parents('.Parent').remove();
                        emptyTheCart();

                        $(this).dialog("close");
                        emptyTheCart();
                        setTimeout(function () {
                            choosenItem.click();

                        }, 500);

                    },
                    No: function () {

                        $(this).dialog("close");

                    }
                },
                close: function (event, ui) {
                    $(this).remove();

                }
            });
}
;









(function () {

    //-- Enable Use Strict Mode --
    "use strict";

    $(window).load(function () {
        $('#loading-pre').addClass('fadeOut');
    });




    $('.pagges-dashboard .main-contents').prepend(
            "<div class='spiner'><i class='fa fa-spinner fa-spin'></i></div>"
            );
    $(window).load(function () {


        //cart empty 
        $('.emptyTheCart').click(function (event) {

            ConfirmDialog('Are You sure You want to empty the cart ??  ', 'empty Cart');



        });






        $('.pagges-dashboard .main-contents .container').css('opacity', 1);
        $('.pagges-dashboard .main-contents .spiner').hide();

        $('.mCustomScrollbar').each(function () {
            $(this).mCustomScrollbar({
                set_width: false,
                /*optional element width: boolean, pixels, percentage*/
                set_height: false,
                /*optional element height: boolean, pixels, percentage*/
                horizontalScroll: false,
                /*scroll horizontally: boolean*/
                scrollInertia: 950,
                /*scrolling inertia: integer (milliseconds)*/
                mouseWheel: true,
                /*mousewheel support: boolean*/
                mouseWheelPixels: "auto",
                /*mousewheel pixels amount: integer, "auto"*/
                autoDraggerLength: true,
                /*auto-adjust scrollbar dragger length: boolean*/
                autoHideScrollbar: false,
                /*auto-hide scrollbar when idle*/
                scrollButtons: {/*scroll buttons*/
                    enable: true,
                    /*scroll buttons support: boolean*/
                    scrollType: "continuous",
                    /*scroll buttons scrolling type: "continuous", "pixels"*/
                    scrollSpeed: "auto",
                    /*scroll buttons continuous scrolling speed: integer, "auto"*/
                    scrollAmount: 40 /*scroll buttons pixels scroll amount: integer (pixels)*/
                },
                advanced: {
                    updateOnBrowserResize: true,
                    /*update scrollbars on browser resize (for layouts based on percentages): boolean*/
                    updateOnContentResize: true,
                    /*auto-update scrollbars on content resize (for dynamic content): boolean*/
                    autoExpandHorizontalScroll: false,
                    /*auto-expand width for horizontal scrolling: boolean*/
                    autoScrollOnFocus: true,
                    /*auto-scroll on focused elements: boolean*/
                    normalizeMouseWheelDelta: false /*normalize mouse-wheel delta (-1/1)*/
                },
                contentTouchScroll: true,
                /*scrolling by touch-swipe content: boolean*/
                callbacks: {
                    onScrollStart: function () {
                    },
                    /*user custom callback function on scroll start event*/
                    onScroll: function () {
                    },
                    /*user custom callback function on scroll event*/
                    onTotalScroll: function () {
                    },
                    /*user custom callback function on scroll end reached event*/
                    onTotalScrollBack: function () {
                    },
                    /*user custom callback function on scroll begin reached event*/
                    onTotalScrollOffset: 0,
                    /*scroll end reached offset: integer (pixels)*/
                    onTotalScrollBackOffset: 0,
                    /*scroll begin reached offset: integer (pixels)*/
                    whileScrolling: function () {
                    } /*user custom callback function on scrolling event*/
                },
                theme: "light" /*"light", "dark", "light-2", "dark-2", "light-thick", "dark-thick", "light-thin", "dark-thin"*/
            });
        });
        $('.mCustomScrollbarHr').each(function () {
            $(this).mCustomScrollbar({
                set_width: false,
                /*optional element width: boolean, pixels, percentage*/
                set_height: false,
                /*optional element height: boolean, pixels, percentage*/
                horizontalScroll: true,
                /*scroll horizontally: boolean*/
                scrollInertia: 950,
                /*scrolling inertia: integer (milliseconds)*/
                mouseWheel: true,
                /*mousewheel support: boolean*/
                mouseWheelPixels: "auto",
                /*mousewheel pixels amount: integer, "auto"*/
                autoDraggerLength: true,
                /*auto-adjust scrollbar dragger length: boolean*/
                autoHideScrollbar: false,
                /*auto-hide scrollbar when idle*/
                scrollButtons: {/*scroll buttons*/
                    enable: true,
                    /*scroll buttons support: boolean*/
                    scrollType: "continuous",
                    /*scroll buttons scrolling type: "continuous", "pixels"*/
                    scrollSpeed: "auto",
                    /*scroll buttons continuous scrolling speed: integer, "auto"*/
                    scrollAmount: 10 /*scroll buttons pixels scroll amount: integer (pixels)*/
                },
                advanced: {
                    updateOnBrowserResize: true,
                    /*update scrollbars on browser resize (for layouts based on percentages): boolean*/
                    updateOnContentResize: true,
                    /*auto-update scrollbars on content resize (for dynamic content): boolean*/
                    autoExpandHorizontalScroll: false,
                    /*auto-expand width for horizontal scrolling: boolean*/
                    autoScrollOnFocus: true,
                    /*auto-scroll on focused elements: boolean*/
                    normalizeMouseWheelDelta: false /*normalize mouse-wheel delta (-1/1)*/
                },
                contentTouchScroll: true,
                /*scrolling by touch-swipe content: boolean*/
                callbacks: {
                    onScrollStart: function () {
                    },
                    /*user custom callback function on scroll start event*/
                    onScroll: function () {
                    },
                    /*user custom callback function on scroll event*/
                    onTotalScroll: function () {
                    },
                    /*user custom callback function on scroll end reached event*/
                    onTotalScrollBack: function () {
                    },
                    /*user custom callback function on scroll begin reached event*/
                    onTotalScrollOffset: 0,
                    /*scroll end reached offset: integer (pixels)*/
                    onTotalScrollBackOffset: 0,
                    /*scroll begin reached offset: integer (pixels)*/
                    whileScrolling: function () {
                    } /*user custom callback function on scrolling event*/
                },
                theme: "light" /*"light", "dark", "light-2", "dark-2", "light-thick", "dark-thick", "light-thin", "dark-thin"*/
            });
        });

    });

    // dropdown
    $(document).on('click', '[data-toggle="dropdown"]', function (e) {
        e.preventDefault();
        $('[data-toggle="dropdown"]').not(this).removeClass('active').next('.dropdown-menu').removeClass('active').slideUp(300);
        $(this).toggleClass('active').next('.dropdown-menu').addClass('active').slideToggle(300);
    });

    $(document).on('click', '.dropdown', function (event) {
        event.stopPropagation();
    });

    $(document).on('click', 'html', function () {
        $('[data-toggle="dropdown"]').removeClass('active').next('.dropdown-menu').removeClass('active').slideUp(300);
    });
    //------------------------------------
    // //-- MAIN SLIDER --     
    var owl = $('.main-slider-');
    var duration = 10000;


    owl.on('initialize.owl.carousel initialized.owl.carousel ', function (e) {
        $('.owl-slider-item').each(function () {
            var $owlslideritem = $(this),
                    animation = $owlslideritem.attr("data-owl-animation"),
                    animationDelay = $owlslideritem.attr("data-owl-animation-delay");


            $('.' + e.type)
            $owlslideritem.addClass(animation + ' owled');
            $owlslideritem.css({
                'animation-delay': animationDelay
            });

            window.setTimeout(function () {
                $('.' + e.type)
                // $owlslideritem.removeClass(animation +' owled');
            }, duration);

        });
    });


    owl.owlCarousel({
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        margin: 0,
        loop: true,
        autoplay: true,
        autoplayTimeout: duration,
        autoplayHoverPause: false,
        nav: true,
        dots: false,
        stagePadding: 0,
        smartSpeed: 0,
        mouseDrag: true,
        touchDrag: true,
        responsive: {
            0: {
                items: 1,
                slideBy: 1
            }
        }
    });


    var clientsss = $('.clients-carousel');

    clientsss.owlCarousel({
        margin: 30,
        loop: true,
        autoplay: true,
        nav: false,
        dots: false,
        stagePadding: 0,
        smartSpeed: 500,
        responsive: {
            0: {
                items: 2,
                slideBy: 2
            },
            991: {
                items: 4,
                slideBy: 4
            },
            1200: {
                items: 5,
                slideBy: 5
            }
        }
    });


    var col1 = jQuery(".carousel-col-1");

    col1.owlCarousel({
        nav: true,
        dots: true,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        margin: 30,
        responsive: {
            0: {
                items: 1,
                slideBy: 1
            }
        }
    });

    var col3 = jQuery(".carousel-col-3");

    col3.owlCarousel({
        nav: true,
        dots: true,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoHeight: true,
        margin: 30,
        responsive: {
            0: {
                items: 1,
                slideBy: 1
            },
            768: {
                items: 2,
                slideBy: 2
            },
            1200: {
                items: 3,
                slideBy: 3
            }
        }
    });


    var col4 = jQuery(".carousel-col-4");

    col4.owlCarousel({
        nav: true,
        dots: true,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        margin: 30,
        responsive: {
            0: {
                items: 1,
                slideBy: 1
            },
            768: {
                items: 2,
                slideBy: 2
            },
            991: {
                items: 3,
                slideBy: 3
            },
            1200: {
                items: 4,
                slideBy: 4
            }
        }
    });


    var col5 = jQuery(".carousel-col-5");

    col5.owlCarousel({
        nav: true,
        dots: true,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        margin: 30,
        responsive: {
            0: {
                items: 1,
                slideBy: 1
            },
            480: {
                items: 2,
                slideBy: 2
            },
            768: {
                items: 3,
                slideBy: 3
            },
            991: {
                items: 5,
                slideBy: 5
            }
        }
    });


    var servicescatscarousel = jQuery(".services-cats-carousel");

    servicescatscarousel.owlCarousel({
        nav: false,
        dots: false,
        loop: true,
        autoplay: true,
        margin: 30,
        autoplayTimeout: 40,
        smartSpeed: 8000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 2,
                slideBy: 1
            },
            480: {
                items: 3,
                slideBy: 1
            },
            768: {
                items: 4,
                slideBy: 1
            },
            991: {
                items: 5,
                slideBy: 1
            },
            1200: {
                items: 6,
                slideBy: 1
            },
            1400: {
                items: 7,
                slideBy: 1
            },
            1500: {
                items: 8,
                slideBy: 1
            },
            1900: {
                items: 9,
                slideBy: 1
            },
            2000: {
                items: 10,
                slideBy: 1
            }
        }
    });

    var servicescatscarousel2 = jQuery(".services-cats-carousel-2");

    servicescatscarousel2.owlCarousel({
        nav: false,
        dots: false,
        loop: true,
        autoplay: true,
        margin: 30,
        autoplayTimeout: 40,
        smartSpeed: 8000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 2,
                slideBy: 1
            },
            480: {
                items: 3,
                slideBy: 1
            },
            768: {
                items: 4,
                slideBy: 1
            },
            991: {
                items: 5,
                slideBy: 1
            },
            1200: {
                items: 6,
                slideBy: 1
            },
            1400: {
                items: 7,
                slideBy: 1
            },
            1500: {
                items: 8,
                slideBy: 1
            },
            1900: {
                items: 9,
                slideBy: 1
            },
            2000: {
                items: 10,
                slideBy: 1
            }
        }
    });



    //------------------------------------
    //tooltip
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover({
        // trigger: 'hover'
    });
    //------------------------------------

    // INPUT PLACEHOLDER
    $('input:not(input[type="checkbox"], input[type="radio"], input[type="submit"], input[type="file"], input[type="date"]),textarea').each(function () {
        // Use the "that" = $(this) Convention
        var that = $(this),
                holder = $.trim($(this).attr('data-placeholder'));

        that.blur(function () {
            //Use Trim because users can type empty space
            if ($.trim(that.attr('placeholder')).length == 0 && $.trim(that.attr('placeholder')) != holder) {
                that.attr('placeholder', holder);
            }
        })
                .focus(function () {
                    if ($.trim(that.attr('placeholder')) == holder) {
                        that.attr('placeholder', holder);
                    }
                });
        that.trigger('blur');
    });
    // INPUT PLACEHOLDER
    // $('input[name="phones"]:not(.pagges-dashboard input[name="phones"])').each(function () {
    //     // Use the "that" = jQuery(this) Convention
    //     var that   = $(this),
    //         holder = $.trim($(this).attr('placeholder'));

    //     that.blur(function()
    //     {
    //       //Use Trim because users can type empty space
    //       if ($.trim(that.attr('placeholder')).length == 0 && $.trim(that.attr('placeholder')) != holder)
    //       {
    //         that.attr('placeholder',holder);
    //         // that.val('');
    //       }
    //     })
    //     .focus(function()
    //     {
    //       if ($.trim(that.attr('placeholder')) == holder)
    //       {
    //         that.attr('placeholder','');
    //         that.val('965');
    //       }
    //     });

    //     that.trigger('blur');
    // });
    //--------------------------------------------------------------------------------------------
    //------------------------------------
    /* ◄------ WINDOW HEIGHT SECTION -------------------------------►
     var windowH = $(window).height();
     var hederHeight = $('header').height();
     $('.main-slider-wrapper').css({'height': windowH - hederHeight}); */
    //------------------------------------
    /* ◄------ chzn select -------------------------------► */
    var config = {
        '.chzn-select': {},
        '.chzn-select-deselect': {
            allow_single_deselect: true
        },
        '.chzn-select-no-single': {
            disable_search_threshold: 10
        },
        // '.chzn-select-no-results': {no_results_text:'Oops, nothing found!'},
        // '.chzn-select-width'     : {width:"95%"}
    }

    for (var selector in config) {
        $(selector).chosen(config[selector]);

    }



    $(document).on('click', '.chzn-single', function (event) {
        $(".mutliSelect-wrapper .dt a").removeClass('active');
        $(".mutliSelect-wrapper .dd").slideUp(0);
        event.stopPropagation();
        $('.chzn-results').mCustomScrollbar('destroy');
    });

    $(document).on('click', '.chzn-with-drop .chzn-single', function () {
        $(".mutliSelect-wrapper .dt a").removeClass('active');
        $(".mutliSelect-wrapper .dd").slideUp(0);
        event.stopPropagation();
        $('.chzn-results').mCustomScrollbar();
    });
    $(document).on('click', 'html', function () {
        $('.chzn-results').mCustomScrollbar('destroy');
    });
    //------------------------------------

    /* ◄------ jquery UI -------------------------------► */
    // date picker
    $(".datepicker").datepicker({
        dateFormat: 'yy-mm-dd',
        inline: true,
        minDate: 0,
        maxDate: 90,
        showOtherMonths: true
    }).datepicker('widget').wrap('<div class="ll-skin-nigran">');

    // $(".calendarDatePicker").datepicker({
    //     dateFormat: 'yy/mm/dd',
    //     inline: true,
    //     showOtherMonths: true,
    //     onSelect: function () {
    //         $(this).data('datepicker').inline = true;
    //     },
    //     onClose: function () {
    //         $(this).data('datepicker').inline = false;
    //     }
    // });


    $(".birth_date").datepicker({
        dateFormat: 'yy/mm/dd',
        inline: true,
        changeYear: true,
        changeMonth: true,
        viewMode: 'years',
        yearRange: "-100:+0", // last hundred years

        showOtherMonths: true,
        onSelect: function () {
            $(this).data('datepicker').inline = true;
        },
        onClose: function () {
            $(this).data('datepicker').inline = false;
        }
    }).datepicker('widget').wrap('<div class="ll-skin-nigran birth_date_widget">');



    var maxDateEdit = $('.editDatePicker').attr('data-maxdate');
    $(".editDatePicker").datepicker({
        dateFormat: 'yy-mm-dd',
        inline: true,
        minDate: 0,
        maxDate: maxDateEdit,
        showOtherMonths: true
    }).datepicker('widget').wrap('<div class="ll-skin-nigran editDatePickerـwidget">');



    /* ◄------ SET BACKGROUND IMAGE  -------------------------------► */
    $('.img-bg , .pattern-bg').each(function () {
        var section = $(this),
                bg = section.find('> img').attr('src');

        section.css('background-image', 'url(' + bg + ')').find('> img').hide();
    });
    //--------------------------------------------------------------------------------------------



    // multi select
    $(".mutliSelect-wrapper .dt a").on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).parent().next(".mutliSelect-wrapper .dd").slideToggle(0);
        // $('.mutliSelect > ul li:first-child > ul li:nth-child(2) input[type="checkbox"]').addClass('dddddd').focus();
        // alert('test');
    });

    $(".mutliSelect-wrapper .dd ul li a").on('click', function () {
        $(".mutliSelect-wrapper .dd ul").hide();
    });

    function getSelectedValue(id) {
        return $("#" + id).find(".dt a span.value").html();
    }

    $(document).on('click', 'body', function (e) {
        var $clicked = $(e.target);
        if (!$clicked.parents().hasClass("mutliSelect-wrapper")) {
            $(".mutliSelect-wrapper .dt a").removeClass('active');
            $(".mutliSelect-wrapper .dd").slideUp(0);
        }
    });

    $('.mutliSelect input[type="checkbox"]').on('click', function () {

        var title = $(this).closest('.mutliSelect').find('input[type="checkbox"]').data('value'),
                title = $(this).next('label').text();



        if ($(this).is(':checked')) {
            $(this).parent('li').addClass('active');
            var html = '<span class="' + title + '" title="' + title + '">' + title + '<em> , </em></span>';
            $(this).parents('.mutliSelect-wrapper').find('.multiSel').append(html);
            $(this).parents('.mutliSelect-wrapper').find(".hida").hide();
        } else {
            $('span[title="' + title + '"]').remove();
            $(this).parent('li').removeClass('active');
            // var ret = $(".hida");
            // $('.mutliSelect-wrapper .dt a').append(ret);
        }

        // alert($('.multiSel').children().length);

        $('.multiSel').each(function () {
            if ($(this).children().length == 0) {
                $(this).next(".hida").show();
            } else {
                $(this).next(".hida").hide();
            }
        });

    });

    $('.mutliSelect input[type="checkbox"]').each(function () {

        var title = $(this).closest('.mutliSelect').find('input[type="checkbox"]').data('value'),
                title = $(this).data('value');



        if ($(this).is(':checked')) {
            $(this).parent('li').addClass('active');
            var html = '<span title="' + title + '">' + title + '<em> , </em></span>';
            $(this).parents('.mutliSelect-wrapper').find('.multiSel').append(html);
            $(this).parents('.mutliSelect-wrapper').find(".hida").hide();
        } else {
            $('span[title="' + title + '"]').remove();
            $(this).parent('li').removeClass('active');
            // var ret = $(".hida");
            // $('.mutliSelect-wrapper .dt a').append(ret);
        }


    });


    $('.mutliSelect input[type="radio"]').on('click', function () {

        var title = $(this).closest('.mutliSelect').find('input[type="radio"]').data('value'),
                title = $(this).data('value');



        if ($(this).is(':checked')) {
            $(this).parents('.mutliSelect-wrapper').find('.dd .mutliSelect > ul li').removeClass('active');
            $(this).parents('.mutliSelect-wrapper').find('.multiSel span').remove();
            $(this).parent('li').addClass('active');
            var html = '<span title="' + title + '">' + title + '<em> , </em></span>';
            $(this).parents('.mutliSelect-wrapper').find('.multiSel').append(html);
            $(this).parents('.mutliSelect-wrapper').find(".hida").hide();
        }

        // alert($('.multiSel').children().length);

        $('.multiSel').each(function () {
            if ($(this).children().length == 0) {
                $(this).next(".hida").show();
            } else {
                $(this).next(".hida").hide();
            }
        });

    });

    $('.sort-by .mutliSelect .sort').on('click', function () {
        var html = $(this).html(),
                span = '<span class="nnnn" title="' + html + '">' + html + '</span>';
        $('.nnnn').remove();
        $(this).parents('.mutliSelect-wrapper').find('.multiSel').append(span);
        $(this).parents('.mutliSelect-wrapper').find(".hida").hide();

    });
    $('.promotionsFilters .filter').on('click', function () {
        var html = $(this).html(),
                span = '<span class="nnnn" title="' + html + '">' + html + '</span>';
        $(this).parents('.mutliSelect-wrapper').find('.nnnn').remove();
        $(this).parents('.mutliSelect-wrapper').find('.multiSel').append(span);
        $(this).parents('.mutliSelect-wrapper').find(".hida").hide();

    });


    /* ◄------ MIXITUP -------------------------------► */
    // To keep our code clean and modular, all custom functionality will be contained inside a single object literal called "multiFilter".

    var multiFilter = {
        // Declare any variables we will need as properties of the object

        $filterGroups: null,
        $filterUi: null,
        $reset: null,
        groups: [],
        outputArray: [],
        outputString: '',
        // The "init" method will run on document ready and cache any jQuery objects we will need.

        init: function () {
            var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.

            self.$filterUi = $('.custom-filter');
            self.$filterGroups = $('.filter-group');
            self.$reset = $('#Reset');
            self.$container = $('.salons-filter');

            self.$filterGroups.each(function () {
                self.groups.push({
                    $inputs: $(this).find('input'),
                    active: [],
                    tracker: false
                });
            });

            self.bindHandlers();
        },
        // The "bindHandlers" method will listen for whenever a form value changes. 

        bindHandlers: function () {
            var self = this,
                    typingDelay = 300,
                    typingTimeout = -1,
                    resetTimer = function () {
                        clearTimeout(typingTimeout);

                        typingTimeout = setTimeout(function () {
                            self.parseFilters();
                        }, typingDelay);
                    };

            self.$filterGroups
                    .filter('.checkboxes')
                    .on('click', function () {
                        self.parseFilters();
                    });

            self.$filterGroups
                    .filter('.search')
                    .on('keyup change', resetTimer);

            self.$reset.on('click', function (e) {
                e.preventDefault();
                self.$filterUi[0].reset();
                self.$filterUi.find('input[type="text"]').val('');
                self.parseFilters();
            });
        },
        // The parseFilters method checks which filters are active in each group:

        parseFilters: function () {
            var self = this;

            // loop through each filter group and add active filters to arrays

            for (var i = 0, group; group = self.groups[i]; i++) {
                group.active = []; // reset arrays
                group.$inputs.each(function () {
                    var searchTerm = '',
                            $input = $(this),
                            ttt = $input.data('filter'),
                            minimumLength = 3;

                    if ($input.is(':checked')) {
                        group.active.push(ttt);
                    }

                    if ($input.is('[type="text"]') && this.value.length >= minimumLength) {
                        searchTerm = this.value
                                .trim()
                                .toLowerCase()
                                .replace(' ', '-');

                        group.active[0] = '[class*="' + searchTerm + '"]';
                    }
                });
                group.active.length && (group.tracker = 0);
            }

            self.concatenate();
        },
        // The "concatenate" method will crawl through each group, concatenating filters as desired:

        concatenate: function () {
            var self = this,
                    cache = '',
                    crawled = false,
                    checkTrackers = function () {
                        var done = 0;

                        for (var i = 0, group; group = self.groups[i]; i++) {
                            (group.tracker === false) && done++;
                        }

                        return (done < self.groups.length);
                    },
                    crawl = function () {
                        for (var i = 0, group; group = self.groups[i]; i++) {
                            group.active[group.tracker] && (cache += group.active[group.tracker]);

                            if (i === self.groups.length - 1) {
                                self.outputArray.push(cache);
                                cache = '';
                                updateTrackers();
                            }
                        }
                    },
                    updateTrackers = function () {
                        for (var i = self.groups.length - 1; i > -1; i--) {
                            var group = self.groups[i];

                            if (group.active[group.tracker + 1]) {
                                group.tracker++;
                                break;
                            } else if (i > 0) {
                                group.tracker && (group.tracker = 0);
                            } else {
                                crawled = true;
                            }
                        }
                    };

            self.outputArray = []; // reset output array

            do {
                crawl();
            }
            while (!crawled && checkTrackers());

            self.outputString = self.outputArray.join();

            // If the output string is empty, show all rather than none:

            !self.outputString.length && (self.outputString = 'all');



            // ^ we can check the console here to take a look at the filter string that is produced

            // Send the output string to MixItUp via the 'filter' method:

            if (self.$container.mixItUp('isLoaded')) {
                self.$container.mixItUp('filter', self.outputString);
            }
        }
    };

    // On document ready, initialise our code.

    $(function () {

        // Initialize multiFilter code

        multiFilter.init();

        // Instantiate MixItUp

        $('.salons-filter').mixItUp({
            controls: {
                toggleFilterButtons: true,
                toggleLogic: 'and'
            },
            animation: {
                easing: 'ease',
                effects: 'fade',
                duration: 0
            }
        });
    });


    // To keep our code clean and modular, all custom functionality will be contained inside a single object literal called "buttonFilter".

    var buttonFilter = {
        // Declare any variables we will need as properties of the object

        $filters: null,
        $reset: null,
        groups: [],
        outputArray: [],
        outputString: '',
        // The "init" method will run on document ready and cache any jQuery objects we will need.

        init: function () {
            var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.

            self.$filters = $('.promotionsFilters');
            self.$reset = $('#Reset');
            self.$container = $('.promotions-filter');

            self.$filters.find('.mutliSelect-wrapper').each(function () {
                self.groups.push({
                    $buttons: $(this).find('.filter'),
                    active: ''
                });
            });

            self.bindHandlers();
        },
        // The "bindHandlers" method will listen for whenever a button is clicked. 

        bindHandlers: function () {
            var self = this;

            // Handle filter clicks

            self.$filters.on('click', '.filter', function (e) {
                e.preventDefault();

                var $button = $(this);

                // If the button is active, remove the active class, else make active and deactivate others.

                $button.hasClass('active') ?
                        $button.removeClass('active') :
                        $button.addClass('active').siblings('.filter').removeClass('active');

                self.parseFilters();
            });

            // Handle reset click

            self.$reset.on('click', function (e) {
                e.preventDefault();

                self.$filters.find('.filter').removeClass('active');

                self.parseFilters();
            });
        },
        // The parseFilters method checks which filters are active in each group:

        parseFilters: function () {
            var self = this;

            // loop through each filter group and grap the active filter from each one.

            for (var i = 0, group; group = self.groups[i]; i++) {
                group.active = group.$buttons.filter('.active').attr('data-filter') || '';
            }

            self.concatenate();
        },
        // The "concatenate" method will crawl through each group, concatenating filters as desired:

        concatenate: function () {
            var self = this;

            self.outputString = ''; // Reset output string

            for (var i = 0, group; group = self.groups[i]; i++) {
                self.outputString += group.active;
            }

            // If the output string is empty, show all rather than none:

            !self.outputString.length && (self.outputString = 'all');

            console.log(self.outputString);

            // ^ we can check the console here to take a look at the filter string that is produced

            // Send the output string to MixItUp via the 'filter' method:

            if (self.$container.mixItUp('isLoaded')) {
                self.$container.mixItUp('filter', self.outputString);
            }
        }
    };

    // On document ready, initialise our code.

    $(function () {

        // Initialize buttonFilter code

        buttonFilter.init();

        // Instantiate MixItUp

        $('.promotions-filter').mixItUp({
            controls: {
                enable: false,
                toggleFilterButtons: true,
                toggleLogic: 'and'
            },
            animation: {
                easing: 'ease',
                effects: 'fade',
                duration: 0
            }
        });
    });


    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        $('.promotions-filter').mixItUp({
            controls: {
                enable: false,
                toggleFilterButtons: true,
                toggleLogic: 'and'
            },
            animation: {
                easing: 'ease',
                effects: 'fade',
                duration: 0
            }
        });
        // $('.offers-filter').mixItUp({
        //     animation: {
        //         easing: 'ease',
        //         effects: 'fade',
        //         duration: 0
        //     }
        // });    
    });

    //------------------------------



    $('.has-offer').each(function () {
        var offer = $('#offerVal').attr('rel');
        $(this).find('.media-holder').append($('<div class="ribbon has-offer-ribbon">' + offer + '</div>'));
    });
    $('.has-package').each(function () {
        var packagess = $('#packageVal').attr('rel');
        $(this).find('.media-holder').append($('<div class="ribbon has-package-ribbon">' + packagess + '</div>'));
    });
    // $('.has-package.has-offer').each(function () {
    //     $(this).find('.media-holder').append($('<div class="ribbon">Package & Offer</div>'));
    // });

    var forMaleVal = $('#forMaleVal').attr('rel');
    var forFemaleVal = $('#forFemaleVal').attr('rel');
    $('.forFemale').each(function () {
        $(this).find('.over-contents .title').append($('<div class="marker">' + forFemaleVal + '</div>'));
    });
    $('.forMale').each(function () {
        $(this).find('.over-contents .title').append($('<div class="marker">' + forMaleVal + '</div>'));
    });
    //------------------------------



    // CART

    $(window).load(function () {
        if ($('.pagges-salon').find('.grid-item').hasClass('busy')) {
            $('.services-cart-page').removeClass('services-cart-page');
        }

        // var drop = $('#dropHere').attr('rel');
        // $(".pagges-salon .services-cart-page .service-in-list").draggable({
        //     appendTo: ".pagges-salon .services-cart-page .salon-services-wrapper",
        //     cursor: "move",
        //     helper: 'clone',
        //     revert: "invalid",
        //     // delay: 300,
        //     cursorAt: {
        //         left: 5
        //     },
        //     start: function(event, ui) {
        //         $(".pagges-salon .services-cart-page .cart .mCSB_container").addClass('droppping').append($('<p class="droppppp"><span>' + drop + '</span></p>'));
        //         $('.pagges-salon .services-cart-page .no-services').hide();
        //         $('.cart-wrapper').addClass('opened');

        //     },
        //     stop: function(event, ui) {
        //         $(".pagges-salon .services-cart-page .cart .mCSB_container").removeClass('droppping').find('.droppppp').remove();
        //         $(".pagges-salon .services-cart-page .no-services").show();
        //         $('.cart-wrapper').removeClass('opened');
        //     }
        // });


        // $(".pagges-salon .services-cart-page .cart .mCSB_container").droppable({
        //     tolerance: "intersect",
        //     accept: ".pagges-salon .services-cart-page .service-in-list",
        //     activeClass: "cart-default",
        //     hoverClass: "cart-hover",
        //     drop: function(event, ui) {
        //         $(this).find('.droppppp').remove();
        //         if ($(ui.draggable).find('a').hasClass('add-serv')) {
        //             $(ui.draggable).find('.add-serv').trigger('click');
        //         }

        //     }
        // });
    });

    // add service to cart
    $('.services').on('click', ".add-serv", function (e) {
        e.preventDefault();


        if (!$('.no-services').hasClass('hide')) {
            $('#servicesIds').val('');
            $('#packagesIds').val('');
            $('#services_check').val('');

        }

        var id = $(this).attr('rel'),
                type = $(this).attr('rell'),
                services_check_value = $(this).attr('services_check'),
                services_check = $('#services_check').val(),
                service_type = $(this).attr('service_type'),
                salon_id = $(this).attr('salon_id');
        console.log(service_type);
        var services_count = "yes";


        if (services_count != "none") {

            // check if service or package from the same salon to add more services 

            if (($('.cart_salon_id').val() == "" || $('.cart_salon_id').val() == salon_id) && ($('#serviceType').val() == "" || $('#serviceType').val() == service_type)) {
                var link = $('<a href="#" class="remove-serv" rel="' + id + '" rell="' + type + '" relll="' + services_check_value + '"><i class="fa fa-times"></i></a>'),
                        dataCoverText = $('#add_suc').attr("rel"),
                        cover = $('<div class="cover"><strong>' + dataCoverText + '</strong></div>');

                $('.no-services').hide();
                $('.no-services').addClass('hide');
                $('.contenuBook').show();
                $('.emptyTheCart').show();
                $('.cart-wrapper').addClass('opened');
                $('.cart_salon_id').val(salon_id);
                // alert("asdasddsa");


                $(this).parents('.service-in-list').prepend(cover).delay(1500).fadeOut(500).addClass('removed').clone().prependTo('.cart .mCSB_container').addClass('added').removeClass('removed').append(link).find('.cover').remove();
                setTimeout(function () {
                    $('.removed').remove();

                    $('.services-list').each(function () {
                        if ($(this).children().length == 0) {
                            $(this).next('.noserv').show();
                        }
                    });
                }, 2000);
                var numServices = $('.cart .mCSB_container').children(".service-in-list").length;
                // alert(numServices);
                $('.cart-switcher .num').html(numServices);



                if (type == "service") {
                    var value = $('#servicesIds').val();
                    if (value != "") {
                        $('#servicesIds').val(value + id + ",");
                    } else {
                        $('#servicesIds').val(id + ",");
                    }
                    if (services_check != "") {
                        $('#services_check').val(services_check_value + services_check);
                    } else {
                        $('#services_check').val(services_check_value);
                    }

                    // add service to session


                } else {
                    var value = $('#packagesIds').val();
                    if (value != "") {
                        $('#packagesIds').val(value + id + ",");
                    } else {
                        $('#packagesIds').val(id + ",");
                    }
                    if (services_check != "") {
                        $('#services_check').val(services_check_value + services_check);
                    } else {
                        $('#services_check').val(services_check_value);
                    }
                }
                //calc total price 

                // var totalPrice = parseInt($('.contenuBook .totalPrice').html());
                // if(!totalPrice) {
                //     totalPrice = 0 ;
                // }
                var totalPrice = 0;

                console.log(totalPrice);
                $('.service-in-list.added').each(function () {
                    var price = parseFloat($(this).data('totalprice'));
                    totalPrice += parseFloat(price, 10);

                });

                $('.totalPrice').html(totalPrice);
                $('#serviceType').val(service_type);
                $(".minimumChargeAmount").val($(".minimumcharge").val());
                var date = $('#checkin-date').val();
                var serviceType = $('#serviceType').val();
                var servicesIds = $('#servicesIds').val();
                var packagesIds = $('#packagesIds').val();
                var services_check = $('#services_check').val();
                var minimumChargeAmount = $('.minimumChargeAmount').val();

                addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);



            } else {
                var choosenItem = $(this);
                // show daialog
                ConfirmAnotherSalonDialog('You Choosed services from another Salon Do you want to clear your Cart and add This new service', 'Cart alert', choosenItem);



            }


        } else {
            $('#element_to_pop_up').show();
            $('#element_to_pop_up').html('<p style="color:#f00; padding:20px;">' + $('#service_found').val() + '</p>');
            $('#element_to_pop_up').bPopup();
            return false;
        }




    });

    $(window).load(function () {
        var cartLenghth = $('.cart .mCSB_container').children().length;
        // alert(cartLenghth);
        if (cartLenghth == 0) {
            $('.contenuBook').hide();
        } else {
            $('.contenuBook').show();
        }
    });


    // remove service from cart
    $('.cart').on('click', ".remove-serv", function (e) {
        e.preventDefault();

        var
                id = $(this).attr('rel') + ",",
                type = $(this).attr('rell'),
                services_check_value = $(this).attr('relll'),
                cate = '#' + $(this).parents('.service-in-list').attr('data-category'),
                services_check = $('#services_check').val();

        if (type == "service") {
            var value = $('#servicesIds').val();
        } else {
            var value = $('#packagesIds').val();
        }



        $(this).parents('.service-in-list').fadeOut(500).removeClass('added').addClass('returned').clone().prependTo(cate).addClass('back customStyle').removeClass('returned').find('.remove-serv').remove();
        setTimeout(function () {
            $('.returned').remove();
            $('.bookService').removeClass('hidden');

            var numServices = $('.cart .mCSB_container').children().length;
            $('.cart-switcher .num').html(numServices);

            $('.back').removeClass('back');


            var totalPrice = 0;
            console.log(totalPrice);
            $('.service-in-list.added').each(function () {
                var price = $(this).data('totalprice');
                totalPrice += parseFloat(price, 10);

            });

            $('.totalPrice').text(totalPrice);



            var date = $('#checkin-date').val();
            var salon_id = $('.cart_salon_id').val();
            var serviceType = $('#serviceType').val();
            var servicesIds = $('#servicesIds').val();
            var packagesIds = $('#packagesIds').val();
            var services_check = $('#services_check').val();
            var minimumChargeAmount = $('.minimumChargeAmount').val();
            var numServices = parseInt($('.cart-switcher .num').html());
            console.log(numServices + "," + servicesIds);
            addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);


            if ($('.cart .mCSB_container').children().length == 0) {

                // init to delete from the session omly the servie if it is equal to zero will kill the sessision

                emptyTheCart();
                $('.no-services').show();

                $('.cart-wrapper').removeClass('opened');
                $('.no-services').removeClass('hide');
                // $('.no-services').addClass('show');
                $('.contenuBook').hide();
                $('.emptyTheCart').hide();
            }
            ;

        }, 500);


        // var drop = $('#dropHere').attr('rel');
        // $(".pagges-salon .services-cart-page .service-in-list").draggable({
        //     appendTo: ".pagges-salon .services-cart-page .salon-services-wrapper",
        //     cursor: "move",
        //     helper: 'clone',
        //     revert: "invalid",
        //     // delay: 300,
        //     cursorAt: {
        //         left: 5
        //     },
        //     start: function(event, ui) {
        //         $(".pagges-salon .services-cart-page .cart .mCSB_container").addClass('droppping').append($('<p class="droppppp"><span>' + drop + '</span></p>'));
        //         $('.pagges-salon .services-cart-page .no-services').hide();
        //         $('.cart-wrapper').addClass('opened');


        //     },
        //     stop: function(event, ui) {
        //         $(".pagges-salon .services-cart-page .cart .mCSB_container").removeClass('droppping').find('.droppppp').remove();
        //         $(".pagges-salon .services-cart-page .no-services").show();
        //         $('.cart-wrapper').removeClass('opened');
        //     }
        // });
    });
    //------------------------------


    // $(document).on('click', '.cart-switcher', function (e) {
    //     e.preventDefault();
    //     $('.cart-wrapper').toggleClass('opened');
    // });

    // loading services 
    $(window).load(function () {
        $('#reservations .loading').remove();
        $('#servicesload').show();
    });
    //------------------------------



    // DataTable
    $('.dataTable').DataTable({
        order: [
            [0, "DESC"]
        ],
        responsive: true
    }, $('.rate-stars').each(function () {

        $(this).barrating({
            theme: 'fontawesome-stars',
            showSelectedRating: true,
            onSelect: function (value, text, event) {
                $('.rate').val(value);
            }
        });
    }));


    $(document).on('click', '.table-filter', function (e) {
        e.preventDefault();
        $(this).parents('.panel').find('.dataTables_wrapper .row:first-child').slideToggle();
    });

    //------------------------------



    // Tabs
    $(function () {
        var hash = window.location.hash;
        hash && $('ul.nav a[href="' + hash + '"]').tab('show');

        $('.nav-tabs a').click(function (e) {
            $(this).tab('show');
            var scrollmem = $('body').scrollTop() || $('html').scrollTop();
            window.location.hash = this.hash;
            $('html,body').scrollTop(scrollmem);



            var servicescatscarousel = jQuery(".services-cats-carousel");

            servicescatscarousel.owlCarousel({
                nav: false,
                dots: false,
                loop: true,
                autoplay: true,
                margin: 30,
                autoplayTimeout: 40,
                smartSpeed: 8000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 3,
                        slideBy: 3
                    },
                    480: {
                        items: 4,
                        slideBy: 4
                    },
                    768: {
                        items: 5,
                        slideBy: 5
                    },
                    991: {
                        items: 8,
                        slideBy: 8
                    },
                    1200: {
                        items: 9,
                        slideBy: 9
                    },
                    1400: {
                        items: 12,
                        slideBy: 12
                    }
                }
            });
        });
    });
    //------------------------------



    var actionTarget = jQuery(".services-filter .chzn-single , .services-filter .datepicker , .salon-hr .payments-methods li>a");
    var interval = null;
    $(document).on('ready', function () {
        interval = setInterval(function () {
            actionTarget.toggleClass("action");
        }, 4000);
    });

    // GALLARY
    $('.fancybox').fancybox({
        openEffect: 'none',
        closeEffect: 'none',
        helpers: {
            media: {}
        },
        beforeShow: function () {
            this.title = this.title + " <br><br><p> " + $(this.element).data("description") + "</p>";
        }
    });


    // // RESPONSIVE
    function checkSize() {
        var windowSize = $(window).width();
        if (windowSize < 992) {
            $('.main-nav').addClass('responsive-navigation dropdown').find('> ul').addClass('dropdown-menu');
            $('.filters .title').attr('aria-expanded', false);
            $('.filters .collapse').attr('aria-expanded', false);
            $('.filters .collapse').removeClass('in');
            $('.close-filter').show();
        } else {
            $('.main-nav').removeClass('responsive-navigation dropdown').find('> ul').removeClass('dropdown-menu');
            $('.filters .title').attr('aria-expanded', true);
            $('.filters .collapse').attr('aria-expanded', true);
            $('.filters .collapse').addClass('in');
            $('.close-filter').hide();
        }
    }

    checkSize();


    $(window).resize(function () {
        checkSize();

    });
    //----------------------------------------


    $(document).on('click', '.print-button', function (e) {
        e.preventDefault();
        window.print();
        return false;
    });
    //----------------------------------------


    $(document).on('click', '.spy-scroll', function (e) {

        e.preventDefault();
        var scrollAnchor = $(this).data('target'),
                scrollPoint = $('[id="' + scrollAnchor + '"]').offset().top - 1;

        $('body,html').animate({
            scrollTop: scrollPoint
        }, 1000);

    });


    $(document).ready(function () {

        var navListItems = $('div.setup-panel div a'),
                allWells = $('.setup-content'),
                allNextBtn = $('.nextBtn');

        allWells.hide();

        navListItems.click(function (e) {
            e.preventDefault();
            var $target = $($(this).attr('href')),
                    $item = $(this);

            if (!$item.hasClass('disabled')) {
                navListItems.removeClass('current').addClass('btn-default');
                $item.addClass('current');
                allWells.hide();
                $target.show();
                // $target.find('input:eq(0)').focus();
            }
        });

        allNextBtn.click(function () {
            var curStep = $(this).closest(".setup-content"),
                    curStepBtn = curStep.attr("id"),
                    nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
                    curInputs = curStep.find("input"),
                    isValid = true;

            $(".setup-content li").removeClass("has-error");
            for (var i = 3; i < curInputs.length; i++) {
                if (!curInputs[i].validity.valid) {
                    isValid = false;
                    $(curInputs[i]).closest(".setup-content li").addClass("has-error");
                }
            }

            if (isValid)
                nextStepWizard.removeAttr('disabled').trigger('click');
        });

        $('div.setup-panel div a.current').trigger('click');
    });

    $(function () {
        var curDown = false,
                curYPos = 0,
                curXPos = 0;
        $('.service-calendar #mCSB_1_container').mousemove(function (m) {
            if (curDown === true) {
                $('.service-calendar #mCSB_1_container').scrollTop($('.service-calendar #mCSB_1_container').scrollTop() + (curYPos - m.pageY));
                $('.service-calendar #mCSB_1_container').scrollLeft($('.service-calendar #mCSB_1_container').scrollLeft() + (curXPos - m.pageX));
                alert('tata');
                $('.mCSB_scrollTools.mCSB_scrollTools_horizontal .mCSB_buttonRight').trigger('click');
            }

        });

        $('.service-calendar #mCSB_1_container').mousedown(function (m) {
            curDown = true;
            curYPos = m.pageY;
            curXPos = m.pageX;
        });

        $('.service-calendar #mCSB_1_container').mouseup(function () {
            curDown = false;
        });
    });



    // $('.filters-sticky').stickyMojo({footerID: '.footer', contentID: '.sticky_parent'});
    // $(".filters-sticky").stick_in_parent({
    //     offset_top: 30
    // });

    // $(function() {
    //   return $("[data-sticky_column]").stick_in_parent({
    //     offset_top: 30,
    //     bottoming: true,
    //     parent: "[data-sticky_parent]"
    //   });
    // });
    $(function () {

        var stickWidth = 992;
        var win = $(window);
        var menu = $("[data-sticky_column]");
        var options = {
            offset_top: 30,
            bottoming: true,
            parent: "[data-sticky_parent]"
        };
        if (win.width() > stickWidth) {
            return menu.stick_in_parent(options);
        }else {
                menu.trigger("sticky_kit:detach");
            }
        win.resize(function () {
            if (win.width() > stickWidth) {
                return menu.stick_in_parent(options);
            } else {
                menu.trigger("sticky_kit:detach");
            }
        });

    });
    //---------------------------------------------------


    $(document).on('click', '.gift-offer > a', function (e) {

        e.preventDefault();

        var amount = $(this).data('gift'),
                input = $('#gift_amount'),
                email = $('#gift_email');
        $('.gift-offer').removeClass('active');
        $(this).parents('.gift-offer').addClass('active');
        input.val(amount);
        email.focus();

    });

    $('.prettySocial').prettySocial();



    $(document).on('click', '.social-area-btn', function (e) {

        e.preventDefault();

        // $('.social-area-btn').hide();
        $('.social-area-btn').removeClass('active').parent('li').find('ul').slideUp();
        $(this).addClass('active').parent('li').find('ul').slideDown();
    });

    $(document).on('click', '.social-area', function (e) {
        e.stopPropagation();
    });




    //-- Window Scroll Functions --
    //-- Making the header fixed --
    var header = jQuery('.downloadApps');
    var headerTop = header.offset().top;

    jQuery(window).scroll(function () {
        (jQuery(window).scrollTop() > headerTop) ? header.addClass('fixedHeader animated slideInDown') : header.removeClass('fixedHeader animated slideInDown');
    });
    //--------------------------------------------------------------------------------------------



    $("input[name='phones']").intlTelInput({
        initialCountry: "auto",
        geoIpLookup: function (callback) {
            $.get("https://ipinfo.io", function () {
            }, "jsonp").always(function (resp) {
                var countryCode = (resp && resp.country) ? resp.country : "";
                callback(countryCode);
            });
        },
        utilsScript: "../interface/js/utils.js" // just for formatting/placeholders etc
    });

    $(window).load(function () {

        $("img.lazy").show().lazyload({
            effect: "fadeIn",
            event: "scroll"
        });
        $(".promotions-filter img.lazy").show().lazyload({
            effect: "fadeIn",
            event: "load"
        });
    });


    // INSTAFEEDS
    $('.instafeeds').each(function () {
        var elem = $(this),
                idUser = elem.data("user"),
                target = elem.attr("id"),
                limits = elem.data("limit");

        var feed = new Instafeed({
            target: target,
            get: 'user',
            userId: idUser,
            limit: limits,
            // userId: 1582118886, // im_bayoo
            //userId: 269801886, // envato
            // resolution: 'thumbnail',
            // sortBy: 'none',
            // links: true,
            // mock: false,
            // useHttp: false        
            accessToken: '3241654069.e03489c.64f4716e27134d7e8a7516a128407ae2',
            template: '<li>' +
                    '<a class="media-holder" target="_blank" href="{{link}}" title="{{caption}}">' +
                    '<img src="{{image}}" alt="{{caption}}">' +
                    '<span class="cover"><i class="fa fa-link"></i></span>' +
                    '</a>' +
                    '</li>'
        });
        feed.run();
    });
    //---------------------------------------------------



    $(document).on('click', '.payments-methods li > a', function (e) {
        e.preventDefault();
        $(this).parents('.payments-methods').find('li').removeClass('active');
        $(this).parents('li').toggleClass('active');
    });

    $(window).load(function () {
        window.scrollReveal = new scrollReveal({
            reset: false,
            move: '50px'
        });



        var no_display = localStorage.getItem('no_display');
        if (no_display !== 'true') {
            $('.promotion-modal').fadeIn(600);
            localStorage.setItem('no_display', 'true');
        }



    });



    $(document).on('click', '.close-modalaaaa', function (e) {
        e.preventDefault();
        $('.promotion-modal').fadeOut(600);
    });




    var removeFav = $('#removeFav').attr('rel');
    var addFav = $('#addFav').attr('rel');
    $('.salon , .salon-hr').each(function () {
        if ($(this).hasClass('loved')) {
            var thiss = $(this),
                    fav = '<a href="#" class="remove-fav" data-original-title="' + removeFav + '" data-placement="bottom" data-toggle="tooltip"><i class="fa fa-heart-o"></i></a>';
            thiss.find('.title:not(.cove .title , .service-in-list .title)').append(fav);
            thiss.on('mouseover', function () {
                $('[data-toggle="tooltip"]').tooltip();
            });
        } else {
            var thiss = $(this),
                    fav = '<a href="#" class="add-fav" data-original-title="' + addFav + '" data-placement="bottom" data-toggle="tooltip"><i class="fa fa-heart-o"></i></a>';
            thiss.find('.title:not(.cove .title)').append(fav);
            thiss.on('mouseover', function () {
                $('[data-toggle="tooltip"]').tooltip();
            });
        }
    });

    $(document).on('click', '.add-fav', function (e) {

        e.preventDefault();
        var user_id = $(this).parents('.salon , .salon-hr').attr('user_id'),
                salon_id = $(this).parents('.salon , .salon-hr').attr('salon_id');
        if (user_id == 0) {
            $('#element_to_pop_up').show();
            $('#element_to_pop_up').html("<p style='color:#f00;padding:15px;'>" + $('#login_favourite').attr('rel') + "</p>");
            $('#element_to_pop_up').bPopup();
            return false;
        } else {
            var base_url = $('#base-url').val();
            $.ajax({
                type: "GET",
                url: base_url + "/add_favourite?salon_id=" + salon_id,
                success: function (datas) {
                    $('#element_to_pop_up').show();
                    $('#element_to_pop_up').html(datas);
                    $('#element_to_pop_up').bPopup();
                }
            });
            $(this).removeClass('add-fav').addClass('remove-fav').parents('.salon , .salon-hr').addClass('loved');
            $(this).attr('data-original-title', removeFav);
            return false;

        }
    });

    $(document).on('click', '.remove-fav', function (e) {
        e.preventDefault();
        var user_id = $(this).parents('.salon , .salon-hr').attr('user_id'),
                salon_id = $(this).parents('.salon , .salon-hr').attr('salon_id'),
                page = $(this).parents('.salon , .salon-hr').attr('page');
        var base_url = $('#base-url').val();


        $.ajax({
            type: "GET",
            url: base_url + "/remove_favourite?salon_id=" + salon_id,
            success: function (datas) {
                $('#element_to_pop_up').show();
                $('#element_to_pop_up').html(datas);
                $('#element_to_pop_up').bPopup();
            }
        });
        if (page != "dashborad") {
            $(this).removeClass('remove-fav').addClass('add-fav').parents('.salon , .salon-hr').removeClass('loved');
            $(this).attr('data-original-title', addFav);
        } else {
            $(this).parents('.grid-item').removeClass('loved').remove();
        }
        return false;
    });


    // var currentDatee = $('.calendarDatePicker').attr('data-startmomment');

    // var newdate = moment(currentDatee , 'YYYY-MM-DD'); 

    var startDateMain = moment().subtract('day', 1).format('YYYY-MM-DD');

    // var numofdays = newdate.diff(startDateMain, 'days');

    // alert(numofdays);

    $('.calendarDatePicker').each(function () {

        // alert(currentDatee);
        var simpleRangeCalendar = $(this).rangeCalendar({
            startDate: moment().subtract('day', 1).format('YYYY-MM-DD'),
            endDate: moment().add('day', 90),
            start: "+1",
            // start: "+"+numofdays,
            startRangeWidth: 1,
            weekends: true,
            theme: "full-green-theme",
            changeRangeCallback: rangeChanged
        });
    });



    function rangeChanged(target, range) {
        // console.log(range);

        var startDay = moment(range.start).subtract('day', 1).format('DD');
        var startMonth = moment(range.start).format('MM');
        var startYear = moment(range.start).format('YYYY');
        var endDay = moment(range.end).subtract('day', 1).format('DD');
        var endMonth = moment(range.end).format('MM');
        var endYear = moment(range.end).format('YYYY');





        $(".calendar-values .start-date .value").val(startYear + '-' + startMonth + '-' + startDay);
        // $(".calendar-values .start-date .label").html("");
        // $(".calendar-values .start-date .label").append(startMonth);
        // $(".calendar-values .start-date .label").append("<small>"+startYear+"</small>");
        $(".calendar-values .end-date .value").val(endYear + '-' + endMonth + '-' + endDay);
        // $(".calendar-values .end-date .label").html("");
        // $(".calendar-values .end-date .label").append(endMonth);
        // $(".calendar-values .end-date .label").append("<small>"+endYear+"</small>");
        // $(".calendar-values .days-width .value").html(range.width);
        // $(".calendar-values .from-now .label").html(range.fromNow);


    }
    // $('.calendar-values .value').each(function() {
    //     $(this).change(function(){
    //         alert($(this).val());    
    //     });
    // });
    var redirect = function (url, method) {
        var form = document.createElement('form');
        form.method = method;
        form.action = url;
        document.body.appendChild(form);


        form.submit();
    };

    var base_url = $('#base-url').val();
    var current_url = document.URL.substring(base_url.length);
    if (current_url.indexOf("contenuBooking") > -1) {
        var currentDatee = $('.calendarDatePicker').attr('data-startmomment');
        var newValue = currentDatee.replace(/\-/g, '');
        // $mylabel.text( newValue );

        // alert(newValue);

        $(".calendar.ui-draggable").scrollLeft(300);
    }
    // if (current_url.indexOf("homecalendar") > -1) {
    //     var currentDatee = $('.calendarDatePicker').attr('data-startmomment');
    //     var newValue = currentDatee.replace(/\-/g, '');
    //     // $mylabel.text( newValue );

    //     // alert(newValue);

    //     $( ".calendar.ui-draggable" ).scrollLeft( 300 );
    // }


    $(window).load(function () {
        $('.cell').each(function () {
            $(this).removeClass('start selected last');
        });
        $('.cell[date-id="' + newValue + '"]').each(function () {
            var celll = $(this);
            var monthid = celll.attr('month-id');
            var monthhh = $('body').find('.cell[month-id="' + monthid + '"]');
            celll.addClass('start selected last');
            $('body').find('.range-bar').clone().appendTo(celll);
            $('.months .cell[month-id="' + monthid + '"]').addClass('start selected last');
            $('.months .cell').find('i.bullet').hide();
            monthhh.find('i.bullet').show();

        });
    });

    $(document).on('click', '.cell', function () {
        // alert($('.calendar-values .start-date .value').val());
        var dateChanged = $('.calendar-values .start-date .value').val();


        // $(this).addClass('start selected last');
        var calenderType = $('.calenderType').val();

        $.ajax({
            method: "POST",
            url: the_base_url + "/change_date_booking",
            data: {dateChanged: dateChanged},
            cache: false,
            success: function (datas) {
                redirect(the_base_url + '/contenuBooking?' + calenderType, 'post');

            }
        })


    });

    $(document).on('click', '.clearFilter', function (e) {
        e.preventDefault();
        $(this).parents('.filters-sticky').find('input').val('');
        $(this).parents('.filters-sticky').find('input').removeAttr('checked');
    });

    // price slider range
    jQuery(function () {
        jQuery("#slider-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [0, 300],
            slide: function (event, ui) {
                jQuery(".amountSpan").text("KWD " + ui.values[0] + " - KWD " + ui.values[1]);
                jQuery("#amount").val(ui.values[0] + "," + ui.values[1]);

            },
            stop: function (event, ui) {
                $('.apply_filter').trigger('click');
            }

        });
        jQuery(".amountSpan").text("KWD " + $("#slider-range").slider("values", 0) + " - KWD " + $("#slider-range").slider("values", 1));
        jQuery("#amount").val($("#slider-range").slider("values", 0) + "," + $("#slider-range").slider("values", 1));
    });
    //------------------------------

    $('.filters-sticky input:not(.categories-checkboxes-wrapper input) , select').change(function () {
        $('.apply_filter').trigger('click');
    });

    $('.filters-sticky input[name="gender"]').change(function () {
        var value = $(this).val();
        if (value == 0) {
            $('.categroy_male_filter').hide();
            $('.categroy_female_filter').show();
        } else {
            $('.categroy_female_filter').hide();
            $('.categroy_male_filter').show();
        }
    });

    if ($('.filters-sticky input[name="gender"]:checked').val() == 0) {
        $('.categroy_male_filter').hide();
        $('.categroy_female_filter').show();
    } else {
        $('.categroy_female_filter').hide();
        $('.categroy_male_filter').show();
    }

    if ($('.areas_type:checked').val() == 0) {
        $('.in_salon_distrects').hide();
        $('.in_salon_areas').show();
        $('.in_salon_distrects .chzn-single').removeClass('action');
    } else {
        $('.in_salon_areas').hide();
        $('.in_salon_distrects').show();
        $('.in_salon_distrects .chzn-single').addClass('action');
    }
    $('.areas_type').change(function () {
        if ($(this).val() == 0) {
            $('.in_salon_distrects').hide();
            $('.in_salon_areas').show();
            $('.in_salon_distrects .chzn-single').removeClass('action');
        } else {
            $('.in_salon_areas').hide();
            $('.in_salon_distrects').show();
            $('.in_salon_distrects .chzn-single').addClass('action');
        }
    });

    $('.more_categories').hide();
    $('.more_category').click(function () {
        var new_class = $(this).attr('rel');
        $('.all_categories').hide();
        $('.' + new_class).show();
    });





    // filter categories

    $('.categories-checkboxes input[type="checkbox"]').each(function () {
        var checkbox = $(this);
        var value = checkbox.next('label').text();
        checkbox.parent('span').addClass('checked ' + value);
    });

    $('.categories-checkboxes input[type="checkbox"]').change(function () {


        var checkbox = $(this);
        var value = checkbox.next('label').text();

        var checkedlength = $('.categories-checkboxes-wrapper').children('span.checked').length;


        if (checkbox.is(':checked')) {
            checkbox.parent('span').addClass('checked ' + value);
            $('.lables-categories').removeClass('hidden').slideDown();


            $('.lables-categories .lables-wrapper').prepend($('<span class="padd-right-20 label" data-value="' + value + '">' + value + ' &nbsp; <a href="#" class="removeLabel pull-right" data-target="' + value + '">x</a></span>'));
            $('[data-services="' + value + '"]').removeClass('hidden').slideDown();

            $('.categories-checkboxes').addClass('closed').slideUp();

            // jQuery('body,html').animate({scrollTop: 204},500);

        }


    });

    $('.services-checkboxes span input[type="checkbox"]:checked').each(function () {
        var ser = $(this);
        var dataservices = ser.parents('.services-checkboxes').attr('data-services');

        $('span.' + dataservices).find('input[type="checkbox"]').trigger('click');

    });

    $(document).on('click', '.add-more-cate', function (e) {
        e.preventDefault();

        $('.categories-checkboxes').removeClass('closed').slideDown();
    });



    $(document).on('click', '.removeLabel', function (e) {

        var target = $(this).attr('data-target');
        e.preventDefault();

        $(this).parents('.label').remove();

        $('.categories-checkboxes span.' + target + ' input[type="checkbox"]').attr('checked', false);
        $('[data-services="' + target + '"] span input[type="checkbox"]:checked').trigger('click');

        $('[data-services="' + target + '"]').addClass('closed').slideUp();

        var checkedlength = $('.lables-wrapper').children('.label').length;



        if (checkedlength == 0) {
            // alert('checkedlength');
            $('.lables-categories').slideUp();
            $('.categories-checkboxes').removeClass('closed').slideDown();
        }
        // else{
        //     $('.lables-wrapper').slideDown();
        //     $('.categories-checkboxes').addClass('closed').slideUp();
        // }
    });

    $('#employees').each(function () {
        var services = $(this);
        var size_li = services.find(".employee").size();
        var more = services.next('.loadMore');
        var x = 5;
        services.find('.employee:lt(' + x + ')').show();

        more.on('click', function () {
            // e.preventDefault();
            x = (x + 5 <= size_li) ? x + 5 : size_li;
            services.find('.employee:lt(' + x + ')').show();
            if (x == size_li) {
                more.hide();
            }
        });
    });



    // $('.loadMore').click(function () {

    //     $('#employees .employee:lt('+x+')').show();
    // });
    // $('#showLess').click(function () {
    //     x=(x-5<0) ? 3 : x-5;
    //     $('#employees .employee').not(':lt('+x+')').hide();
    // });

    // var click = false;

    // var leftss = $('.calendar-carousel-wrapper').offset().left;
    // var leftsss = $('.calendarDatePicker .wrapper:last-child .cell.selected').offset().left;
    // var leftsss = $('.calendar .cell.selected').offset().left;

    // var draggedspace = leftsss - leftss;

    // alert(leftsss);

    // $(document).bind('mousemove', function (e) {
    //     if (click == true) {
    //         $('.calendar-carousel-wrapper .calendar').css({
    //             left: e.pageX,
    //             top: e.pageY
    //         });
    //     }
    // });

    // $('.calendar-carousel-wrapper .calendar').click(function() {
    //     click = !click;
    //     return false;
    // });

    $(window).load(function () {
        $('#services .services-box:first-child').each(function(){
            var headings = $(this).find('> .title');
            var bodyes = $(this).find('.services-list');

            headings.attr('aria-expanded','true');
            bodyes.addClass('in');

        });

    });

})();



/************ DEV.JS ************/



(function () {
    //-- Enable Use Strict Mode --
    // "use strict";
    jQuery('input[name="phones"]').keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });

    $('#choose_distrect_value').hide();
    $('input[name="phones"]').each(function () {

        $(this).attr('maxlength', '15');
        $(this).attr('minlength', '8');

    });
    //agree checkbox
    $('.agreeTerms_error').hide();
    if ($("input[name*='agreeTerms']:checked").length <= 0) {
        $('.agreeTerms_error').show();
        $('#signup-btn').attr('disabled', '');
        $('#signUpBtn').attr('disabled', '');
    }

    $("input[name*='agreeTerms']").change(function () {
        if ($("input[name*='agreeTerms']:checked").length <= 0) {
            $('.agreeTerms_error').show();
            $('#signup-btn').attr('disabled', '');
            $('#signUpBtn').attr('disabled', '');
        } else {
            $('.agreeTerms_error').hide();
            $('#signup-btn').removeAttr('disabled');
            $('#signUpBtn').removeAttr('disabled');
        }
    });
    $('#element_to_pop_up').hide();
    var base_url = $('#base-url').val();
    var current_url = document.URL.substring(base_url.length);
    /* ◄------ Add Comment -------------------------------► */
    $("#add_comment").click(function () {
        var comment = $('#comment').val();
        var id = $('#post_id').val();
        $.ajax({
            type: "GET",
            url: base_url + "/add_comment?post_id=" + id + "&comment=" + comment,
            success: function (datas) {
                $('#element_to_pop_up').show();
                $('#element_to_pop_up').html(datas);
                $('#element_to_pop_up').bPopup();
            }
        });
        $.ajax({
            type: "GET",
            url: base_url + "/get_comments?post_id=" + id,
            success: function (datas) {
                $('#comments').html(datas);
            }
        });
        $('#comment').val('');
        return false;
    });
    /* ◄------ MAILCHIMP -------------------------------► */

    $("#add_mail").click(function () {
        var mail = $('#mail_newsletter').val();
        var $btn = $(this);
        $btn.button('loading');
        $.ajax({
            type: "GET",
            url: base_url + "/add_email?email=" + mail,
            success: function (datas) {
                $('#element_to_pop_up').show();
                $('#element_to_pop_up').html(datas);
                $('#element_to_pop_up').bPopup();
                $btn.button('reset');
            }
        });
        $('#mail_newsletter').val('');
        return false;
    });
    $("#add_mail-2").click(function () {
        var mail = $('#mail_newsletter-2').val();
        var $btn = $(this);
        $btn.button('loading');
        $.ajax({
            type: "GET",
            url: base_url + "/add_email?email=" + mail,
            success: function (datas) {
                $('#element_to_pop_up').show();
                $('#element_to_pop_up').html(datas);
                $('#element_to_pop_up').bPopup();
                $btn.button('reset');
            }
        });
        $('#mail_newsletter-2').val('');
        return false;
    });
    $("#remove_mail").click(function () {
        var mail = $('#mail_newsletter').val();
        var $btn = $(this);
        $btn.button('loading');
        $.ajax({
            type: "GET",
            url: base_url + "/remove_email?email=" + mail,
            success: function (datas) {
                $('#element_to_pop_up').show();
                $('#element_to_pop_up').html(datas);
                $('#element_to_pop_up').bPopup();
                $btn.button('reset');
            }
        });
        $('#mail_newsletter').val('');
        return false;
    });
    $("#remove_mail-2").click(function () {
        var mail = $('#mail_newsletter-2').val();
        var $btn = $(this);
        $btn.button('loading');
        $.ajax({
            type: "GET",
            url: base_url + "/remove_email?email=" + mail,
            success: function (datas) {
                $('#element_to_pop_up').show();
                $('#element_to_pop_up').html(datas);
                $('#element_to_pop_up').bPopup();
                $btn.button('reset');
            }
        });
        $('#mail_newsletter-2').val('');
        return false;
    });
    //--------------------------------------------------------------------------------------------

    /* ◄------ Jquery Search Form -------------------------------► */
    var gender = $("[name='gender']:checked").val();
    $('.category_service').hide();
    if (gender == 1) {
        $('.categroy_male').show();
    } else {
        $('.categroy_female').show();
    }

    var place = $("[name='ser-place']:checked").val();
    if (place == 0) {
        if ($('#region').val() == "" && $('#region_type').val() == "") {
            $('#region').val('all');
            $('#region_type').val('all');
        }
        $('.in_salon').show();
        $('.in_home').hide();
    } else {
        $('.in_home').show();
        $('.in_salon').hide();
    }

    $("[name='gender']").change(function () {
        var val = $(this).val();
        $("[name='ser-services[]']").prop("checked", false).parents('.category_service').removeClass('active');
        $("[name='distrect']").prop("checked", false).parents('li').removeClass('active');
        $(".mutliSelect [type='checkbox']").prop("checked", false).parents('li').removeClass('active');
        $('.multiSel').html('');
        $('.hida').show();
        $('.mutliSelect li.active').removeClass('active');
        $('.category_service').hide();
        if (val == 1) {
            $('.categroy_male').show();
        } else {
            $('.categroy_female').show();
        }
    });
    $("[name='ser-place']").change(function () {
        var val = $(this).val();
        if (val == 0) {
            $('.in_salon').show();
            $('.in_home').hide();
            $('#region').val('all');
            $('#region_type').val('all');
        } else {
            $('.in_home').show();
            $('.in_salon').hide();
            $('#region').val('');
            $('#region_type').val('');
        }
    });

    //--------------------------------------------------------------------------------------------

    /* ◄------ Jquery Simple Search Form -------------------------------► */
    var gender = $("[name='gender_sm']:checked").val();
    $('.category_service_sm').hide();
    if (gender == 1) {
        $('.categroy_male_sm').show();
    } else {
        $('.categroy_female_sm').show();
    }

    var place = $("[name='ser-place_sm']:checked").val();
    if (place == 0) {
        if ($('#region_sm').val() == "" && $('#region_type_sm').val() == "") {
            $('#region_sm').val('all');
            $('#region_type_sm').val('all');
        }
        $('.in_salon_sm').show();
        $('.in_home_sm').hide();
    } else {
        $('.in_home_sm').show();
        $('.in_salon_sm').hide();
    }

    $("[name='gender_sm']").change(function () {
        var val = $(this).val();
        $("[name='ser-services[]']").prop("checked", false).parents('.category_service').removeClass('active');
        $("[name='distrect']").prop("checked", false).parents('li').removeClass('active');
        $(".mutliSelect [type='checkbox']").prop("checked", false).parents('li').removeClass('active');
        $('.multiSel').html('');
        $('.hida').show();
        $('.mutliSelect li.active').removeClass('active');
        $('.category_service_sm').hide();
        if (val == 1) {
            $('.categroy_male_sm').show();
        } else {
            $('.categroy_female_sm').show();
        }
    });
    $("[name='ser-place_sm']").change(function () {
        var val = $(this).val();
        if (val == 0) {
            $('.in_salon_sm').show();
            $('.in_home_sm').hide();
        } else {
            $('.in_home_sm').show();
            $('.in_salon_sm').hide();
        }
    });

    //--------------------------------------------------------------------------------------------

    /* ◄------ Enter Distrect Value And Type -------------------------------► */
    $('#ser-region').change(function () {
        var val = $(this).val();
        var my_val = val.split(",");
        $('#region').val(my_val[0]);
        $('#region_type').val(my_val[1]);
    });
    $('#ser-regionn').change(function () {
        var val = $(this).val();
        var my_val = val.split(",");
        $('#region').val(my_val[0]);
        $('#region_type').val(my_val[1]);
    });
    //--------------------------------------------------------------------------------------------

    /* ◄------ Enter Simple Distrect Value And Type -------------------------------► */
    $('#ser-region_sm').change(function () {
        var val = $(this).val();
        var my_val = val.split(",");
        $('#region_sm').val(my_val[0]);
        $('#region_type_sm').val(my_val[1]);
    });
    $('#ser-regionn_sm').change(function () {
        var val = $(this).val();
        var my_val = val.split(",");
        $('#region_sm').val(my_val[0]);
        $('#region_type_sm').val(my_val[1]);
    });
    //--------------------------------------------------------------------------------------------


    /* ◄------ Validdate Search Form -------------------------------► */

    $('.saerch_action').click(function () {
        var services = $("#ser-services").val();
        var region = $("#region").val();
        var region_type = $("#region_type").val();
        var checkin = $("#checkin-date").val();
        if ($("[name='ser-services[]']:checked").length == 0) {
            $('#element_to_pop_up').show();
            $('#element_to_pop_up').html("<p style='color:#f00;padding:15px;'>" + $("#service-error").val() + "</p>");
            $('#element_to_pop_up').bPopup();
            return false;
        } else if (checkin == "") {
            $('#element_to_pop_up').show();
            $('#element_to_pop_up').html("<p style='color:#f00;padding:15px;'>" + $("#checkin-error").val() + "</p>");
            $('#element_to_pop_up').bPopup();
            return false;
        } else if (region == "") {
            $('#element_to_pop_up').show();
            $('#element_to_pop_up').html("<p style='color:#f00;padding:15px;'>" + $("#region-error").val() + "</p>");
            $('#element_to_pop_up').bPopup();
            return false;
        } else if (region_type == "") {
            $('#element_to_pop_up').show();
            $('#element_to_pop_up').html("<p style='color:#f00;padding:15px;'>" + $("#region-error").val() + "</p>");
            $('#element_to_pop_up').bPopup();
            return false;
        }
    });
    //--------------------------------------------------------------------------------------------

    /* ◄------ Validdate Simple Search Form -------------------------------► */

    $('.saerch_action_sm').click(function () {
        var services = $("#ser-services_sm").val();
        var region = $("#region_sm").val();
        var region_type = $("#region_type_sm").val();
        if ($("[name='ser-services_sm[]']:checked").length == 0) {
            $('#element_to_pop_up').show();
            $('#element_to_pop_up').html("<p style='color:#f00;padding:15px;'>" + $("#service-error").val() + "</p>");
            $('#element_to_pop_up').bPopup();
            return false;
        } else if (region == "") {
            $('#element_to_pop_up').show();
            $('#element_to_pop_up').html("<p style='color:#f00;padding:15px;'>" + $("#region-error").val() + "</p>");
            $('#element_to_pop_up').bPopup();
            return false;
        } else if (region_type == "") {
            $('#element_to_pop_up').show();
            $('#element_to_pop_up').html("<p style='color:#f00;padding:15px;'>" + $("#region-error").val() + "</p>");
            $('#element_to_pop_up').bPopup();
            return false;
        }
    });
    //--------------------------------------------------------------------------------------------



    /* ◄------ Validdate Search Form -------------------------------► */
    $('.search-body .busy a').click(function () {
        $('#element_to_pop_up').show();
        $('#element_to_pop_up').html('<p style="color:#f00; padding:10px;">' + $('#busy_validate').val() + '</p>');
        $('#element_to_pop_up').bPopup();
        return false;
    });
    /* ◄------ Validdate Search Form -------------------------------► */
    $('.search-body .vacation a').click(function () {
        $('#element_to_pop_up').show();
        $('#element_to_pop_up').html('<p style="color:#f00; padding:10px;">' + $('#close_validate').val() + '</p>');
        $('#element_to_pop_up').bPopup();
        return false;
    });
    //--------------------------------------------------------------------------------------------


    /* ◄------ Change Inputs Sallon Page -------------------------------► */
    var ser_kind = $('#ser-kind').val();
    if (ser_kind == "1") {
        $('#home-distrect-dev').show();
        $('.tocalendar').attr('action', base_url + '/contenuBooking?homecalendar');
    } else {
        $('#home-distrect-dev').hide();
        $('.tocalendar').attr('action', base_url + '/contenuBooking?saloncalendar');
    }
    if ($("#serviceType").val() == 1) {
        $('.tocalendar').attr('action', base_url + '/contenuBooking?homecalendar');
    } else {
        $('.tocalendar').attr('action', base_url + '/contenuBooking?saloncalendar');
    }
    $('#choose_distrect_value').hide();
    $('.ajaxsubmit .changesub').change(function () {
        $('.cart .mCSB_container').html('');
        $('.cart').mCustomScrollbar('destroy');
        $("#servicesload").html("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
        var val = $('#ser-kind').val();
        if (val == "1") {
            var url = window.location.href;
            window.history.pushState(null, null, url.replace('/salon/', '/salonHome/'));
            $('#home-distrect-dev').show();
            var distrect_val = $('#home-distrect').val();
            if (distrect_val == "") {
                $('#choose_distrect_value').show();
                return false;
            } else {
                $('#choose_distrect_value').hide();
            }
        } else {
            $('#home-distrect-dev').hide();
            $('#choose_distrect_value').hide();
            var url = window.location.href;
            window.history.pushState(null, null, url.replace('/salonHome/', '/salon/'));
        }



        var form = $(".ajaxsubmit");
        $('.no-services').show().removeClass('hide');
        $('.contenuBook').hide();
        $('#servicesIds').val("");
        $('#packagesIds').val("");
        $('#services_check').val("");
        $('.cart-switcher .num').html(0);
        // $('.ajaxsubmit').submit();
        $.ajax({
            method: "POST",
            url: form.attr('action'),
            data: form.serialize(),
            cache: false,
        }).done(function (data) {
            $("#servicesload").html("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
            $('.cart').mCustomScrollbar();
            setTimeout(function () {
                $("#servicesload").append(data);
                $(".spiner").remove();
                $('.has-offer').each(function () {
                    $(this).find('.media-holder').append($('<div class="ribbon has-offer-ribbon">Offer</div>'));
                });
                $('.has-package').each(function () {
                    $(this).find('.media-holder').append($('<div class="ribbon has-package-ribbon">Package</div>'));
                });
                if (val == "1") {
                    $('.tocalendar').attr('action', base_url + '/contenuBooking?homecalendar');
                } else {
                    $('.tocalendar').attr('action', base_url + '/contenuBooking?saloncalendar');
                }

                if ($('.pagges-salon').find('.grid-item').hasClass('busy')) {
                    $('.services-cart-page').removeClass('services-cart-page');
                }





                // var drop = $('#dropHere').attr('rel');
                // $(".pagges-salon .services-cart-page .service-in-list").draggable({
                //     appendTo: ".pagges-salon .services-cart-page .salon-services-wrapper",
                //     cursor: "move",
                //     helper: 'clone',
                //     revert: "invalid",
                //     // delay: 300,
                //     cursorAt: {
                //         left: 5
                //     },
                //     start: function(event, ui) {
                //         $(".pagges-salon .services-cart-page .cart .mCSB_container").addClass('droppping').append($('<p class="droppppp"><span>' + drop + '</span></p>'));
                //         $('.pagges-salon .services-cart-page .no-services').hide();
                //         $('.cart-wrapper').addClass('opened');


                //     },
                //     stop: function(event, ui) {
                //         $(".pagges-salon .services-cart-page .cart .mCSB_container").removeClass('droppping').find('.droppppp').remove();
                //         $(".pagges-salon .services-cart-page .no-services").show();
                //         $('.cart-wrapper').removeClass('opened');
                //     }
                // });


                // $(".pagges-salon .services-cart-page .cart .mCSB_container").droppable({
                //     tolerance: "intersect",
                //     accept: ".pagges-salon .services-cart-page .service-in-list",
                //     activeClass: "cart-default",
                //     hoverClass: "cart-hover",
                //     drop: function(event, ui) {
                //         $(this).find('.droppppp').remove();
                //         if ($(ui.draggable).find('a').hasClass('add-serv')) {
                //             $(ui.draggable).find('.add-serv').trigger('click');
                //         }

                //     }
                // });
                // add service to cart
                // add service to cart
                $('.services').on('click', ".add-serv", function (e) {
                    e.preventDefault();


                    if (!$('.no-services').hasClass('hide')) {
                        $('#servicesIds').val('');
                        $('#packagesIds').val('');
                        $('#services_check').val('');

                    }

                    var id = $(this).attr('rel'),
                            type = $(this).attr('rell'),
                            services_check_value = $(this).attr('services_check'),
                            services_check = $('#services_check').val(),
                            service_type = $(this).attr('service_type'),
                            salon_id = $(this).attr('salon_id');
                    console.log(service_type);
                    var services_count = "yes";


                    if (services_count != "none") {

                        // check if service or package from the same salon to add more services 

                        if (($('.cart_salon_id').val() == "" || $('.cart_salon_id').val() == salon_id) && ($('#serviceType').val() == "" || $('#serviceType').val() == service_type)) {
                            var link = $('<a href="#" class="remove-serv" rel="' + id + '" rell="' + type + '" relll="' + services_check_value + '"><i class="fa fa-times"></i></a>'),
                                    dataCoverText = $('#add_suc').attr("rel"),
                                    cover = $('<div class="cover"><strong>' + dataCoverText + '</strong></div>');

                            $('.no-services').hide();
                            $('.no-services').addClass('hide');
                            $('.contenuBook').show();
                            $('.emptyTheCart').show();
                            $('.cart-wrapper').addClass('opened');
                            $('.cart_salon_id').val(salon_id);
                            // alert("asdasddsa");


                            $(this).parents('.service-in-list').prepend(cover).delay(1500).fadeOut(500).addClass('removed').clone().prependTo('.cart .mCSB_container').addClass('added').removeClass('removed').append(link).find('.cover').remove();
                            setTimeout(function () {
                                $('.removed').remove();

                                $('.services-list').each(function () {
                                    if ($(this).children().length == 0) {
                                        $(this).next('.noserv').show();
                                    }
                                });
                            }, 2000);
                            var numServices = $('.cart .mCSB_container').children(".service-in-list").length;
                            // alert(numServices);
                            $('.cart-switcher .num').html(numServices);



                            if (type == "service") {
                                var value = $('#servicesIds').val();
                                if (value != "") {
                                    $('#servicesIds').val(value + id + ",");
                                } else {
                                    $('#servicesIds').val(id + ",");
                                }
                                if (services_check != "") {
                                    $('#services_check').val(services_check_value + services_check);
                                } else {
                                    $('#services_check').val(services_check_value);
                                }

                                // add service to session


                            } else {
                                var value = $('#packagesIds').val();
                                if (value != "") {
                                    $('#packagesIds').val(value + id + ",");
                                } else {
                                    $('#packagesIds').val(id + ",");
                                }
                                if (services_check != "") {
                                    $('#services_check').val(services_check_value + services_check);
                                } else {
                                    $('#services_check').val(services_check_value);
                                }
                            }
                            //calc total price 

                            // var totalPrice = parseInt($('.contenuBook .totalPrice').html());
                            // if(!totalPrice) {
                            //     totalPrice = 0 ;
                            // }
                            var totalPrice = 0;

                            console.log(totalPrice);
                            $('.service-in-list.added').each(function () {
                                var price = parseFloat($(this).data('totalprice'));
                                totalPrice += parseFloat(price, 10);

                            });

                            $('.totalPrice').html(totalPrice);
                            $('#serviceType').val(service_type);
                            $(".minimumChargeAmount").val($(".minimumcharge").val());
                            var date = $('#checkin-date').val();
                            var serviceType = $('#serviceType').val();
                            var servicesIds = $('#servicesIds').val();
                            var packagesIds = $('#packagesIds').val();
                            var services_check = $('#services_check').val();
                            var minimumChargeAmount = $('.minimumChargeAmount').val();

                            addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);



                        } else {
                            var choosenItem = $(this);
                            // show daialog
                            ConfirmAnotherSalonDialog('You Choosed services from another Salon Do you want to clear your Cart and add This new service', 'Cart alert', choosenItem);



                        }


                    } else {
                        $('#element_to_pop_up').show();
                        $('#element_to_pop_up').html('<p style="color:#f00; padding:20px;">' + $('#service_found').val() + '</p>');
                        $('#element_to_pop_up').bPopup();
                        return false;
                    }




                });
            }, 1000);


        });
        // $.post(form.attr('action'), form.serialize(), function (data) {
        //     // just try to see the outputs
        //     if (data) {
        //         $("#servicesload").html("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
        //         setTimeout(function () {
        //             $("#servicesload").append(data);
        //             $(".spiner").remove();
        //         }, 1000);
        //     }
        // });

    });
    //--------------------------------------------------------------------------------------------

    /* ◄------ Check Before Submit Reservation -------------------------------► */

    $('#finish_bill').click(function (e) {
        var total = $('#total').val();
        var service_type = $('#service_type').val();
        var min_charge = $('#min_charge').val();
        var $btn = $(this);
        $btn.button('loading');
        if (service_type == 1) {
            if (parseFloat(total) < parseFloat(min_charge)) {
                $('#element_to_pop_up').show();
                $('#element_to_pop_up').html("<p style='color:#f00;padding:15px;'>" + $('#price_error').val() + "</p>");
                $('#element_to_pop_up').bPopup();
                $btn.button('reset');
                return false;
            }
            if ($('input[name=address]').val() == "") {
                $('#element_to_pop_up').show();
                $('#element_to_pop_up').html("<p style='color:#f00;padding:15px;'>" + $('#select_address_error').attr('rel') + "</p>");
                $('#element_to_pop_up').bPopup();
                $btn.button('reset');
                return false;
            }
        }
        $.ajax({
            type: "GET",
            url: base_url + "/ajax_bill",
            success: function (datas) {
                if (datas == "1") {
                    $('#element_to_pop_up').show();
                    $('#element_to_pop_up').html("<p style='color:#f00;padding:15px;'>" + $('#avaliable_error').val() + "</p>");
                    $('#element_to_pop_up').bPopup();
                    $btn.button('reset');
                    return false;
                }
            }
        });
    });
    //--------------------------------------------------------------------------------------------
    $('#dev_promotion').hide();
    $("#add_promotion").click(function () {
        var code = $('#promotion_code').val();
        var total = $('#total').val();
        var service_type = $('#service_type').val();
        var min_charge = $('#min_charge').val();
        if (service_type == 1) {
            if (total < min_charge) {
                $('#dev_promotion').hide();
                $('#element_to_pop_up').show();
                $('#element_to_pop_up').html("<p style='color:#f00;padding:15px;'>" + $('#price_error').val() + "</p>");
                $('#element_to_pop_up').bPopup();
                return false;
            }
        }
        $.ajax({
            type: "GET",
            url: base_url + "/add_promotion?code=" + code + "&total=" + total,
            success: function (datas) {
                var datas = datas.split(',');
                if (datas[0] == 0) {
                    $('#element_to_pop_up').show();
                    $('#dev_promotion').hide();
                    $('#after_promtion').html('');
                    $('#before_promtion').removeClass('old');
                    $('#element_to_pop_up').html("<p style='color:#f00;padding:15px;'>" + $('#promotion_error').val() + "</p>");
                    $('#element_to_pop_up').bPopup();
                    return false;
                } else {
                    $('#promotion_id').val(datas[1]);
                    $('#dev_promotion').show();
                    $('#after_promtion').html(datas[0]);
                    $('#before_promtion').addClass('old');
                    $('#element_to_pop_up').show();
                    $('#element_to_pop_up').html("<p style='color:#3C763D;padding:15px;'>" + $('#promotion_suc').val() + "</p>");
                    $('#element_to_pop_up').bPopup();
                    return false;
                }
            }
        });
        $('#promotion_code').val('');
        return false;
    });
    //--------------------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------------------
    //User Rate
    $('.rate_error').hide();
    $('.rate_button').click(function () {
        var id = $(this).attr('rel');
        var rate = $('#rate_value' + id).val();
        var book = $('#rate_book').val();
        var review = $('#rate_review' + id).val();
        var $btn = $(this);
        $btn.button('loading');
        if (rate <= 0) {
            $('.rate_error').show();
            $btn.button('reset');
            return false;
        } else {
            $('.rate_error').hide();
            $.ajax({
                type: "GET",
                url: base_url + "/user/addrate?book=" + book + "&id=" + id + "&rate=" + rate + "&review=" + review,
                success: function (datas) {
                    $('#myModal' + id).modal('toggle');
                    $('#rate_view' + id).hide();
                    $('#rate_dev' + id).html(datas);
                    $('#element_to_pop_up').show();
                    $('#element_to_pop_up').html("<p style='color:#3C763D;padding:15px;'>" + $('#rate_suc').val() + "</p>");
                    $('#element_to_pop_up').bPopup();
                    $btn.button('reset');
                    return false;
                }
            });
        }
    });
    //--------------------------------------------------------------------------------------------


    // In Salon Calender Page
    if (current_url.indexOf("saloncalendar") > -1) {

        $(".validform").validate();
        $.validator.messages.required = $(".requiredlay").val();
        $.validator.messages.email = $(".right_email").val();
        //address type validation
        if ($("input[name*='address_type']:checked").val() == 0) {
            $('.building_type_info').show();
            $("input[name*='house']").attr('required', '');
            $("input[name*='floor']").attr('required', '');
            $('#building').attr('placeholder', $('#span_building').attr('rel'));
        } else {
            $('.building_type_info').hide();
            $("input[name*='house']").removeAttr('required');
            $("input[name*='floor']").removeAttr('required');
            $('#building').attr('placeholder', $('#span_houseing').attr('rel'));
        }
        $("input[name*='address_type']").click(function () {
            if ($(this).val() == 0) {
                $('.building_type_info').slideDown();
                $("input[name*='house']").attr('required', '');
                $("input[name*='floor']").attr('required', '');
                $('#building').attr('placeholder', $('#span_building').attr('rel'));
            } else {
                $('.building_type_info').slideUp();
                $("input[name*='house']").removeAttr('required');
                $("input[name*='floor']").removeAttr('required');
                $('#building').attr('placeholder', $('#span_houseing').attr('rel'));
            }
        });
        //mobile valide code
        //
        $(".visitorMobile").focusout(function () {
            // var mobile = $(".visitorMobile"); //  var $btn = $("#visitor_btn");
            //  $btn.button('loading');
            // $.post(mobile.attr('action'), {mobile: mobile.val()}, function (data) {
            //     // just try to see the outputs
            //     console.log(data);
            //     if (data == 0) {
            //         $(".tohide").show();
            //         $(".toshow").hide();
            //         $("input[name*='full_name'").attr('required', '');
            //         $("input[name*='email'").attr('required', '');
            //     }
            //     else {
            //         $(".tohide").hide();
            //         $(".toshow").show();
            //         $("input[name*='full_name'").removeAttr('required');
            //         $("input[name*='email'").removeAttr('required');

            //     }

            //          $btn.button('reset');


            // });
        });
        // if idle for seconds

        var idleTime = 0;
        //Increment the idle time counter every second.

        // 1 sec = 1000
        var idleInterval = setInterval(timerIncrement, 18000000);

        function timerIncrement() {
            idleTime++;
            if (idleTime > 1) {
                doPreload();
            }
        }

        //Zero the idle timer on mouse movement.
        $(this).mousemove(function (e) {
            // idleTime = 0;
        });

        function doPreload() {
            var msg = $('#timeOutMessage').attr('rel');
            $('#element_to_pop_up').show();
            $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + msg + " </p> ");
            $('#element_to_pop_up').bPopup();
            setTimeout(function () {
                window.location = $('#salon_url').attr('rel');
            }, 1000);
            // alert(msg);
            //Preload images, etc.
        }


        /* ◄------ select time  -------------------------------► */

        /* ◄------ select time  -------------------------------► */
        $(document).on("click", ".select-time", function (e) {
            e.preventDefault();

            var time = $(this).closest('.service-offered').find('.time-amount').attr('data-time'),
                    numOfbtns = (time / 15) - 1;
            for (var i = 0; i < numOfbtns; i++) {

                if ($(this).parent().nextUntil().eq(i).hasClass('active') || $(this).parent().nextUntil().eq(i).hasClass('disabled')) {

                    $('#element_to_pop_up').show();
                    $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#cant_choose').attr('rel') + "</p>");
                    $('#element_to_pop_up').bPopup();
                    return false;
                }
            }
            if (numOfbtns == 0) {
                if ($(this).hasClass('active') || $(this).parent().hasClass('disabled')) {
                    $('#element_to_pop_up').show();
                    $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#cant_choose').attr('rel') + "</p>");
                    $('#element_to_pop_up').bPopup();
                    return false;
                } else {
                    $(this).closest('.service-offered').find('li').removeClass('active end start');
                    $(this).parent().addClass('active start');
                    $(this).parent().nextUntil().eq(numOfbtns).addClass('end');
                    $(this).parent().nextUntil('.end').addClass('active');
                    var start = $(this).parent('.start').find('button').text();
                    var end = $(this).closest('.service-offered').find('.end').children('button').text();
                    if (end.length == 0) {
                        end = $('.overTime').val();
                    }
                    $(this).closest('.service-calendar').slideUp();
                    $(this).closest('.service-offered').find('.notification').slideDown();
                    $(this).closest('.service-offered').find('.notification .time-start').text(start);
                    $(this).closest('.service-offered').find('.notification .time-end').text(end);
                    $(this).closest('.service-offered').find('.startTime').val(start);
                    // أضافة الوقت ل لنبوت هيدين للأحتفاظ بالتوقيتات المحجوزة
                    var thetime = $(this).parent('.start').find('button').attr('data-clock');
                    $(this).closest('.service-offered').find('.reservedTime').val(thetime + ',');
                    // alert($(this).parents('.service-offered').find('.reservedTime').val());


                    $('.select-time').each(function () {
                        var dataClock = $(this).attr('data-clock');
                        if ($(this).parent('li').hasClass('active')) {

                            if ($(this).parent('li').find('button').text() != end) {
                                $('.select-time[data-clock="' + dataClock + '"]').parent('li').addClass('active cannot');


                            }
                        }
                        ;
                    });
                }


                reomveCanNotTimes();


            } else if ($(this).hasClass('active') || $(this).parent().hasClass('disabled')) {
                $('#element_to_pop_up').show();
                $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'> You Cant Chose This Thime </p>");
                $('#element_to_pop_up').bPopup();
                return false;
            } else {

                $(this).closest('.service-offered').find('li').removeClass('active end start cannot');
                $(this).parent().addClass('active start cannot');
                $(this).parent().nextUntil().eq(numOfbtns).addClass('end');
                $(this).parent().nextUntil('.end').addClass('active cannot');
                var start = $(this).parent('.start').find('button').text();
                var end = $(this).closest('.service-offered').find('.end').children('button').text();
                if (end.length == 0) {
                    end = $('.overTime').val();
                }
                $(this).parents('.service-calendar').slideUp().closest('.service-offered').find('.notification').slideDown();
                $(this).closest('.service-offered').find('.notification .time-start').text(start);
                $(this).closest('.service-offered').find('.notification .time-end').text(end);
                $(this).closest('.service-offered').find('.startTime').val(start);
                $('.select-time').each(function () {
                    var dataClock = $(this).attr('data-clock');
                    if ($(this).parent('li').hasClass('active')) {

                        if ($(this).parent('li').find('button').text() != end) {

                            $('.select-time[data-clock="' + dataClock + '"]').parent('li').addClass('active cannot');
                        }
                    }
                    ;

                });


                reomveCanNotTimes();



                // حساب التوقيتات التى سيتم غلقها
                var times = $(this).parent('.start').find('button').attr('data-clock') + ',';
                for (var i = 0; i < numOfbtns; i++) {
                    times += $(this).parent().nextUntil().eq(i).find('button').attr('data-clock') + ',';
                }

                $(this).closest('.service-offered').find('.reservedTime').val(times);
                // alert($(this).parents('.service-offered').find('.reservedTime').val() );
            }
        });


        $('.select-time').each(function () {
            $(this).parent('li').append($('<div class="cover"></div>'));
        });
        //--------------------------------------------------------------------------------------------

        $(document).on('click', ".reset-time", function (e) {
            e.preventDefault();
            $(this).closest('.notification').slideUp().closest('.service-offered').find('.service-calendar').slideDown();
            $(this).closest('.service-offered').find('.active').show().removeClass('active start end cannot');
            $(this).closest('.service-offered').find('.active').show().removeClass('active start end cannot');
            $(this).closest('.service-offered').find('.notification').slideUp();
            $(this).closest('.service-offered').find('.service-calendar').slideDown();
            $(this).closest('.service-offered').find('.startTime').attr("value", "");
            var dataClock = $(this).closest('.service-offered').find('.reservedTime').val();
            $(this).closest('.service-offered').find('.reservedTime').val("");





            var arr = dataClock.split(',');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != "") {
                    // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                    $('.select-time[data-clock="' + arr[i] + '"]').parent('li').removeClass('active cannot');
                    $('.select-time[data-clock="' + arr[i] + '"]').parent('li').show();

                }

            }

            $('.reservedTime').each(function () {

                var dataClock = $(this).val();
                var arr = dataClock.split(',');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] != "") { // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                        $('.select-time[data-clock="' + arr[i] + '"]').parent('li').addClass('active');
                        $('.select-time[data-clock="' + arr[i] + '"]').parent('li').append($('<div class="cover"></div>'));
                    }

                }


            });



            RemoveDisabledTimes();
            reomveCanNotTimes();

        });
        /* ◄------ remove serv from cart -------------------------------► */
        $(document).on('click', ".remove-serv-cart", function (e) {
            e.preventDefault();

            var price = $(this).closest('.service-offered').attr('price');
            var total = $('.total-price label').html();
            var newtotal = total - price;
            // remove its times from reserved time before removing it
            var dataClock = $(this).parents('.service-offered').find('.reservedTime').val();
            $(this).parents('.service-offered').find('.reservedTime').val("");
            var arr = dataClock.split(',');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != "") {
                    $('.select-time[data-clock="' + arr[i] + '"]').parent('li').removeClass('active cannot');
                    $('.select-time[data-clock="' + arr[i] + '"]').parent('li').show();
                }

            }

            $('.reservedTime').each(function () {

                var dataClock = $(this).val();
                var arr = dataClock.split(',');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] != "") { // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                        $('.select-time[data-clock="' + arr[i] + '"]').parent('li').addClass('active cannot');
                        $('.select-time[data-clock="' + arr[i] + '"]').parent('li').append($('<div class="cover"></div>'));
                    }
                }
            });
            $('.total-price label').html(newtotal);
            $('.servicessum').val(newtotal);
            $('#keoped').attr('rel', newtotal + 8);
            $(this).closest('.service-offered').addClass('removed').slideUp(500);
            setTimeout(function () {
                $('.service-offered.removed').remove();
            }, 500);
            $(this).parents('.service-offered').find('.active').show().removeClass('active start end');
            $(this).parents('.service-offered').nextAll('.service-offered').find('.active').show().removeClass('active');
            if (newtotal == 0) {
                $('#cart_empty').show();
                $('.salon-services-wrapper').hide();
                $('.calendar-carousel-wrapper').hide();
            }

        });
        //--------------------------------------------------------------------------------------------

        RemoveDisabledTimes();
        reomveCanNotTimes();

        // $(window).load(function(){

        // });


        // $('.select-time').not('li.disabled .select-time').each(function(){
        //     $(this).addClass('avaliable');
        // }); 


        // check if the user choose times
        $('.submitBokdir').click(function (event) {
            event.preventDefault;
            var total = $('.total-price label').html();
            var service_type = $('.total-price').attr('service_type');
            var min_charge = $('.total-price').attr('min_charge');
            var real_price = $('#keoped').attr('rel') - 8;
            var real_pricee = $('.servicessum').val();
            if (service_type == 1 && parseInt(total) < parseInt(min_charge)) {
                $('#element_to_pop_up').show();
                $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#minimumCharge').attr('rel') + "</p> ");
                $('#element_to_pop_up').bPopup();
                return false;
            } else {

                var count = 0;
                $('.startTime').each(function () {
                    if (!$(this).val()) {
                        $('#element_to_pop_up').show();
                        $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#timeFirst').attr('rel') + "</p> ");
                        $('#element_to_pop_up').bPopup();
                        count++;
                        return false;
                    }

                });
                if (count == 0) {
                    if (total != real_price || real_price != real_pricee || real_price != total) {
                        $('#element_to_pop_up').show();
                        $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#keoped_msg').attr('rel') + "</p> ");
                        $('#element_to_pop_up').bPopup();
                        return false;
                    }
                    $(".bookform").submit();
                }
            }

        });
        $(".submitBook").click(function (e) {
            e.preventDefault;
            var total = $('.total-price label').html();
            var service_type = $('.total-price').attr('service_type');
            var min_charge = $('.total-price').attr('min_charge');
            var real_price = $('#keoped').attr('rel') - 8;
            var real_pricee = $('.servicessum').val();
            if (service_type == 1 && parseInt(total) < parseInt(min_charge)) {
                $('#element_to_pop_up').show();
                $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#minimumCharge').attr('rel') + "</p> ");
                $('#element_to_pop_up').bPopup();
                return false;
            } else {
                var count = 0;
                $('.startTime').each(function () {
                    if (!$(this).val()) {
                        $('#element_to_pop_up').show();
                        $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#timeFirst').attr('rel') + "</p>");
                        $('#element_to_pop_up').bPopup();
                        count++;
                        return false;
                    }
                    var total = $('.total-price label').html();
                    var service_type = $('.total-price').attr('service_type');
                    var min_charge = $('.total-price').attr('min_charge');
                    if (service_type == 1 && parseInt(total) < parseInt(min_charge)) {
                        count++;
                        $('#element_to_pop_up').show();
                        $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#minimumCharge').attr('rel') + "</p> ");
                        $('#element_to_pop_up').bPopup();
                        return false;
                    }

                });
                if (count == 0) {
                    if (total != real_price || real_price != real_pricee || real_price != total) {
                        $('#element_to_pop_up').show();
                        $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#keoped_msg').attr('rel') + "</p> ");
                        $('#element_to_pop_up').bPopup();
                        return false;
                    }
                    $('#signInModal').collapse('show');
                    // $('#myModal').modal('show');
                }
            }

        });
        //employee change times
        $('.employee').change(function () {
            // var form = $(".ajaxsubmit");
            // $('.ajaxsubmit').submit();
            // alert( this.value);
            // alert($(this).parents('.service-offered').attr('id'));
            $(this).closest('.service-offered').find('.notification').slideUp().find('.service-calendar').slideDown();
            $(this).closest('.service-offered').find('.active').show().removeClass('active cannot start end');
            $(this).closest('.service-offered').find('.active').show().removeClass('active cannot start end');
            $(this).closest('.service-offered').find('.notification').slideUp();
            $(this).closest('.service-offered').find('.service-calendar').slideDown();
            $(this).closest('.service-offered').find('.startTime').attr("value", "");
            var dataClock = $(this).closest('.service-offered').find('.reservedTime').val();
            $(this).closest('.service-offered').find('.reservedTime').attr("value", "");
            var calender = $(this).attr('calender');
            $.post($(this).attr('url'), {
                employee_id: this.value
            }, function (data) {
                // just try to see the outputs
                // console.log(data);
                if (data) {
                    $("#" + calender).children('ul').remove();
                    $("#" + calender).append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");

                    setTimeout(function () {
                        $("#" + calender).append(data);
                        $(".spiner").remove();


                        //remove disabled times 


                        RemoveDisabledTimes();
                        reomveCanNotTimes();

                    }, 500);
                    var arr = dataClock.split(',');
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] != "") {
                            // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                            $('.select-time[data-clock="' + arr[i] + '"]').parent('li').removeClass('active cannot');
                            $('.select-time[data-clock="' + arr[i] + '"]').parent('li').show();
                        }

                    }



                }

            })



        });
        //login ajax
        $('.loginajax').submit(function (event) {
            event.preventDefault();
            var form = $(".loginajax");
            var $btn = $("#signInBtn");
            // form.find('ul').slideUp();
            $btn.button('loading');
            // $('.ajaxsubmit').submit();
            $.post(form.attr('action'), form.serialize(), function (data) {
                // just try to see the outputs
                //                console.log(data)
                if (isNaN(data)) {

                    form.children('.load').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".load").html("<div class='alert alert-danger' role='alert'><p>" + data + "</p></div>");
                        // form.find('ul').slideDown();
                        $btn.button('reset');
                    }, 1000);
                } else if (data == 0) {

                    form.children('.load').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".load").html("<div class='alert alert-success' role='alert'><p>" + $('#LogedInSuccessfully').attr('rel') + "</p></div>");
                        $btn.button('reset');
                        $(".bookform").submit();
                    }, 1000);
                } else if (data != 0) {
                    form.children('.loadl').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".loadl").html("<div class='alert alert-success' role='alert'><p>" + $('#VerifySuccessfully').attr('rel') + "</p></div>");
                        $btn.button('reset');
                        form.slideUp();
                        form.next('form').removeClass('hidden');
                        $('#verify_login_id').val(data);
                        // $(".bookform").submit();
                    }, 1000);
                }


            })
        });
        //resend login verification code
        $('#verifiy-login-resend-btn').click(function () {
            var id = $('#verify_login_id').val();
            $('.loadl').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
            $.ajax({
                type: "GET",
                url: base_url + "/ajax_resend_verification/" + id,
                success: function (datas) {
                    $(".spiner").remove();
                    $(".loadl").html(datas);
                }
            });
        });
        //verify login account
        $('.verifyloginajax').submit(function (event) {
            event.preventDefault();
            var form = $(".verifyloginajax");
            var $btn = $("#VerifiyLoginBtn");
            $('#verifiy-login-resend-btn').hide();
            // form.find('ul').slideUp();
            $btn.button('loading');
            // $('.ajaxsubmit').submit();
            $.post(form.attr('action'), form.serialize(), function (data) {
                // just try to see the outputs
                //                console.log(data)
                if (isNaN(data)) {

                    form.children('.loadl').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".loadl").html(data);
                        // form.find('ul').slideDown();
                        $btn.button('reset');
                        $('#verifiy-login-resend-btn').show();
                    }, 1000);
                } else {

                    form.children('.loadl').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".loadl").html("<div class='alert alert-success' role='alert'><p>" + $('#RegisterSuccessfully').attr('rel') + "</p></div>");
                        $btn.button('reset');
                        form.slideUp();
                        $(".bookform").submit();
                    }, 1000);
                }


            })
        });
        //register account
        $('.registerajax').submit(function (event) {
            event.preventDefault();
            var form = $(".registerajax");
            var $btn = $("#signUpBtn");
            // form.find('ul').slideUp();
            $btn.button('loading');
            // $('.ajaxsubmit').submit();
            $.post(form.attr('action'), form.serialize(), function (data) {
                // just try to see the outputs
                //                console.log(data)
                var result = data.split(',');
                if (result[0] == 0) {

                    form.children('.load').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        $(".load").html(result[1]);
                        // form.find('ul').slideDown();
                        $btn.button('reset');
                    }, 1000);
                } else {
                    form.children('.loaded').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {

                        $(".spiner").remove();
                        $(".load").html(result[1]);
                        $btn.button('reset');
                        form.slideUp();
                        //                        form.next('form').removeClass('hidden');
                        //                        $('#verify_user_id').val(result[0]);
                        $(".bookform").submit();
                    }, 1000);
                }


            })
        });
        //resend verification code
        $('#verifiy-resend-btn').click(function () {
            var id = $('#verify_user_id').val();
            $('.loaded').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
            $.ajax({
                type: "GET",
                url: base_url + "/ajax_resend_verification/" + id,
                success: function (datas) {
                    $(".spiner").remove();
                    $(".loaded").html(datas);
                }
            });
        });
        //verify account
        $('.verifyajax').submit(function (event) {
            event.preventDefault();
            var form = $(".verifyajax");
            var $btn = $("#VerifiyBtn");
            $('#verifiy-resend-btn').hide();
            // form.find('ul').slideUp();
            $btn.button('loading');
            // $('.ajaxsubmit').submit();
            $.post(form.attr('action'), form.serialize(), function (data) {
                // just try to see the outputs
                //                console.log(data)
                if (isNaN(data)) {

                    form.children('.loaded').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".loaded").html(data);
                        // form.find('ul').slideDown();
                        $btn.button('reset');
                        $('#verifiy-resend-btn').show();
                    }, 1000);
                } else {

                    form.children('.loaded').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".loaded").html("<div class='alert alert-success' role='alert'><p>" + $('#RegisterSuccessfully').attr('rel') + "</p></div>");
                        $btn.button('reset');
                        form.slideUp();
                        $(".bookform").submit();
                    }, 1000);
                }


            })
        });
        //without account
        $('.withoutAcount').submit(function (event) {
            event.preventDefault();
            var form = $(".withoutAcount");
            var $btn = $("#noSignBtn");
            var verify_show = $('#verify_show').val();
            // form.find('ul').slideUp();
            $btn.button('loading');
            // $('.ajaxsubmit').submit();
            $.post(form.attr('action'), form.serialize(), function (data) {
                // just try to see the outputs
                //                console.log(data)
                var result = data.split(',');
                if (result[0] == 0) {

                    form.children('.load').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children('.load').html(result[1]);
                        // form.find('ul').slideDown();
                        $btn.button('reset');
                    }, 1000);
                } else {

                    form.children('.load').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children('.load').html(result[1]);
                        $btn.button('reset');
                        form.slideUp();
                        if (verify_show == "yes") {
                            form.next('form').removeClass('hidden');
                            $('#verify_visitor_id').val(result[0]);
                        } else {
                            $(".bookform").submit();
                        }
                        // $(".bookform").submit();
                    }, 1000);
                }
            });
        });
        //verify without account
        $('.verifyvisitorajax').submit(function (event) {
            event.preventDefault();
            var form = $(".verifyvisitorajax");
            var $btn = $("#VerifiyVisitorBtn");
            $('#verifiy-vistor-resend-btn').hide();
            // form.find('ul').slideUp();
            $btn.button('loading');
            // $('.ajaxsubmit').submit();
            $.post(form.attr('action'), form.serialize(), function (data) {
                // just try to see the outputs
                //                console.log(data)
                if (isNaN(data)) {
                    $('#verifiy-vistor-resend-btn').show();
                    form.children('.loadedv').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".loadedv").html(data);
                        // form.find('ul').slideDown();
                        $btn.button('reset');
                        $('#verifiy-visitor-resend-btn').show();
                    }, 1000);
                } else {

                    form.children('.loadedv').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".loadedv").html("<div class='alert alert-success' role='alert'><p>" + $('#RegisterSuccessfully').attr('rel') + "</p></div>");
                        $btn.button('reset');
                        form.slideUp();
                        $(".bookform").submit();
                    }, 1000);
                }


            })
        });
        //resend visitor verification code
        $('#verifiy-vistor-resend-btn').click(function () {
            var id = $('#verify_visitor_id').val();
            $('.loadedv').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
            $.ajax({
                type: "GET",
                url: base_url + "/ajax_vistor_resend_verification/" + id,
                success: function (datas) {
                    $(".loadedv .spiner").remove();
                    $(".loadedv").html(datas);
                }
            });
        });
    }
    // end of elli ana ba3mloh

    // At Home Calender Page
    if (current_url.indexOf("homecalendar") > -1) {


        RemoveDisabledTimes();
        reomveCanNotTimesHome();


        if ($("input[name='address_type']:checked").val() == 0) {
            $('.building_type_info_register').show();
            $('.house_register').attr('required', '');
            $('.floor_register').attr('required', '');
            $('.building_register').attr('placeholder', $('#span_building').attr('rel'));
        } else {
            $('.building_type_info_register').hide();
            $('.house_register').removeAttr('required');
            $('.floor_register').removeAttr('required');
            $('.building_register').attr('placeholder', $('#span_houseing').attr('rel'));
        }
        $("input[name='address_type']").click(function () {
            if ($(this).val() == 0) {
                $('.building_type_info_register').slideDown();
                $('.house_register').attr('required', '');
                $('.floor_register').attr('required', '');
                $('.building_register').attr('placeholder', $('#span_building').attr('rel'));
            } else {
                $('.building_type_info_register').slideUp();
                $('.house_register').removeAttr('required');
                $('.floor_register').removeAttr('required');
                $('.building_register').attr('placeholder', $('#span_houseing').attr('rel'));
            }
        });
        if ($("input[name=address_type_visitor]:checked").val() == 0) {
            $('.building_type_info_visitor').show();
            $('.house_visitor').attr('required', '');
            $('.floor_visitor').attr('required', '');
            $('.building_visitor').attr('placeholder', $('#span_building').attr('rel'));
        } else {
            $('.building_type_info_visitor').hide();
            $('.house_visitor').removeAttr('required');
            $('.floor_visitor').removeAttr('required');
            $('.building_visitor').attr('placeholder', $('#span_houseing').attr('rel'));
        }
        $("input[name=address_type_visitor]").click(function () {
            if ($(this).val() == 0) {
                $('.building_type_info_visitor').slideDown();
                $('.house_visitor').attr('required', '');
                $('.floor_visitor').attr('required', '');
                $('.building_visitor').attr('placeholder', $('#span_building').attr('rel'));
            } else {
                $('.building_type_info_visitor').slideUp();
                $('.house_visitor').removeAttr('required');
                $('.floor_visitor').removeAttr('required');
                $('.building_visitor').attr('placeholder', $('#span_houseing').attr('rel'));
            }
        });
        //mobile valide code
        //
        $(".visitorMobile").focusout(function () {
            var mobile = $(".visitorMobile");
            var $btn = $("#visitor_btn");
            $btn.button('loading');
            $.post(mobile.attr('action'), {
                mobile: mobile.val()
            }, function (data) {
                // just try to see the outputs
                //                console.log(data);
                if (data == 0) {
                    $(".tohide").show();
                    $(".toshow").hide();
                    $("input[name*='full_name'").attr('required', '');
                    $("input[name*='email'").attr('required', '');
                } else {
                    $(".tohide").hide();
                    $(".toshow").show();
                    $("input[name*='full_name'").removeAttr('required');
                    $("input[name*='email'").removeAttr('required');
                }
                $btn.button('reset');
            });
        });
        // if idle for seconds

        var idleTime = 0;
        //Increment the idle time counter every second.

        // 1 sec = 1000
        var idleInterval = setInterval(timerIncrement, 180000);

        function timerIncrement() {
            idleTime++;
            if (idleTime > 1) {
                doPreload();
            }
        }

        //Zero the idle timer on mouse movement.
        $(this).mousemove(function (e) {
            // idleTime = 0;
        });

        function doPreload() {
            // disable preloda 
            // var msg = $('#timeOutMessage').attr('rel');
            // $('#element_to_pop_up').show();
            // $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + msg + " </p> ");
            // $('#element_to_pop_up').bPopup();
            // setTimeout(function () {
            //     window.location = $('#salon_url').attr('rel');
            // }, 1000);
            // alert(msg);
            //Preload images, etc.
        }


        // $(".salon-services-wrapper").children('.service-offered:not(:first-child)').addClass("disableTimes");

        /* ◄------ select time  -------------------------------► */

        /* ◄------ select time  -------------------------------► */
        $(document).on('click', ".select-time", function (e) {
            e.preventDefault();
            // diable choose time for the latest services
            // :not(:first-child)

            if ($(this).closest('.service-offered').hasClass('disableTimes')) {


            } else {
                var start_to_count = $(this).parent().attr('class');
                // alert(start_to_count);


                var time = $(this).closest('.salon-services-wrapper').attr('data-time'),
                        numOfbtns = (time / 15) - 1;
                var stopthis = false;
                $('.' + start_to_count.trim()).each(function () { // console.log($(this).closest('.service-offered').attr('id'));
                    for (var i = 0; i < numOfbtns; i++) {

                        //                        console.log($(this).nextUntil().eq(i).closest('.service-offered').attr('id'));
                        //                        console.log($(this).nextUntil().eq(i).attr('class'));
                        if ($(this).nextUntil().eq(i).hasClass('active') || $(this).nextUntil().eq(i).hasClass('disabled')) {
                            console.log($(this).nextUntil().eq(i).hasClass('disabled'));
                            stopthis = true;
                            $('#element_to_pop_up').show();
                            $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#cant_choose').attr('rel') + "</p>");
                            $('#element_to_pop_up').bPopup();
                            return false;
                        }
                    }


                    if ($(this).hasClass('active') || $(this).parent().hasClass('disabled')) {
                        stopthis = true;
                        $('#element_to_pop_up').show();
                        $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#cant_choose').attr('rel') + "</p>");
                        $('#element_to_pop_up').bPopup();
                        return false;
                    }


                    // endforeach
                });
                // alert(stopthis);
                if (stopthis) {
                    return false;
                } else {


                    $(this).closest('.service-offered').find('li').removeClass('active end start');
                    $(this).parent().addClass('active start');
                    $(this).parent().nextUntil().eq(numOfbtns).addClass('end');
                    $(this).parent().nextUntil('.end').addClass('active');
                    var start = $(this).parent('.start').find('button').text();
                    var end = $(this).closest('.service-offered').find('.end').children('button').text();
                    if (end.length == 0) {
                        end = $('.overTime').val();
                    }
                    $('.service-calendar').slideUp().closest('.service-offered').find('.notification').slideDown();
                    $('.service-offered').find('.notification .time-start').text(start);
                    $('.service-offered').find('.notification .time-end').text(end);
                    $('#homeStart').val(start);
                    $('#homeEnd').val(end);
                    // $('.service-offered').find('.notification .time-end').text(end);

                    $('.service-offered').find('.startTime').val(start);
                    $('.select-time').each(function () {
                        var dataClock = $(this).attr('data-clock');
                        if ($(this).parent('li').hasClass('active')) {

                            if ($(this).parent('li').find('button').text() != end) {

                                $('.select-time[data-clock="' + dataClock + '"]').parent('li').addClass('active');
                            }
                        }
                        ;
                    });
                    // حساب التوقيتات التى سيتم غلقها
                    var times = $(this).parent('.start').find('button').attr('data-clock') + ',';
                    for (var i = 0; i < numOfbtns; i++) {
                        times += $(this).parent().nextUntil().eq(i).find('button').attr('data-clock') + ',';
                    }

                    $(this).closest('.service-offered').find('.reservedTime').val(times);
                    // alert($(this).parents('.service-offered').find('.reservedTime').val() );
                }


            }


        });
        $('.select-time').each(function () {
            $(this).parent('li').append($('<div class="cover"></div>'));
        });
        //--------------------------------------------------------------------------------------------

        $(document).on('click', ".reset-time", function (e) {
            e.preventDefault();
            $('.notification').slideUp().closest('.service-offered').find('.service-calendar').slideDown();
            $('.service-offered').find('.active').show().removeClass('active start end cannot');
            $('.service-offered').find('.active').show().removeClass('active start end cannot');
            $('.service-offered').find('.notification').slideUp();
            $('.service-offered').find('.service-calendar').slideDown();
            $('.service-offered').find('.startTime').attr("value", "");
            var dataClock = $('.service-offered').find('.reservedTime').val();
            $('.service-offered').find('.reservedTime').val("");




            RemoveDisabledTimes();
            reomveCanNotTimesHome();


            var arr = dataClock.split(',');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != "") {
                    // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                    $('.select-time[data-clock="' + arr[i] + '"]').parent('li').removeClass('active cannot');
                }

            }

            $('.reservedTime').each(function () {
                var dataClock = $(this).val();
                var arr = dataClock.split(',');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] != "") { // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                        $('.select-time[data-clock="' + arr[i] + '"]').parent('li').addClass('active');
                        $('.select-time[data-clock="' + arr[i] + '"]').parent('li').append($('<div class="cover"></div>'));
                    }

                }


            });
        });
        /* ◄------ remove serv from cart -------------------------------► */
        $(document).on('click', ".remove-serv-cart", function (e) {
            e.preventDefault();
            var price = $(this).closest('.service-offered').attr('price');
            var total = $('.total-price label').html();
            var newtotal = total - price;
            var duration = $(this).closest('.service-offered').attr('data-duration');
            var allduration = $(this).closest('.salon-services-wrapper').attr('data-time');
            var newduration = allduration - duration;
            // remove its times from reserved time before removing it
            var dataClock = $(this).parents('.service-offered').find('.reservedTime').val();
            $(this).parents('.service-offered').find('.reservedTime').val("");
            var arr = dataClock.split(',');
            $('.reservedTime').each(function () {

                var dataClock = $(this).val();
                var arr = dataClock.split(',');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] != "") { // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                        $('.select-time[data-clock="' + arr[i] + '"]').parent('li').addClass('active');
                        $('.select-time[data-clock="' + arr[i] + '"]').parent('li').append($('<div class="cover"></div>'));
                    }
                }
            });
            $('.total-price label').html(newtotal);
            $('.servicessum').val(newtotal);
            $('#keoped').attr('rel', newtotal + 8);
            $(this).closest('.salon-services-wrapper').attr('data-time', newduration)


            $(this).closest('.service-offered').addClass('removed').slideUp(500);
            //            console.log($(this).closest('.service-offered').attr('4'));
            $(this).closest('.service-offered').next('.service-offered').removeClass('disableTimes');
            setTimeout(function () {
                $('.service-offered.removed').remove();
            }, 500);
            $('.notification').slideUp().closest('.service-offered').find('.service-calendar').slideDown();
            $('.service-offered').find('.active').show().removeClass('active start end cannot');
            $('.service-offered').find('.active').show().removeClass('active start end cannot');
            $('.service-offered').find('.notification').slideUp();
            $('.service-offered').find('.service-calendar').slideDown();
            $('.service-offered').find('.startTime').attr("value", "");
            var dataClock = $('.service-offered').find('.reservedTime').val();
            $('.service-offered').find('.reservedTime').val("");
            var arr = dataClock.split(',');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != "") {
                    // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                    $('.select-time[data-clock="' + arr[i] + '"]').parent('li').removeClass('active cannot');
                }

            }

            $('.reservedTime').each(function () {

                var dataClock = $(this).val();
                var arr = dataClock.split(',');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] != "") { // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                        $('.select-time[data-clock="' + arr[i] + '"]').parent('li').addClass('active');
                        $('.select-time[data-clock="' + arr[i] + '"]').parent('li').append($('<div class="cover"></div>'));
                    }

                }


            });
            $(this).parents('.service-offered').find('.active').show().removeClass('active start end');
            $(this).parents('.service-offered').nextAll('.service-offered').find('.active').show().removeClass('active');
            if (newtotal == 0) {
                $('#').show();
                $('.salon-services-wrapper').hide();
            }


        });
        //--------------------------------------------------------------------------------------------


        // check if the user choose times
        $('.submitBokdir').click(function (event) {
            event.preventDefault;
            var total = $('.total-price label').html();
            var service_type = $('.total-price').attr('service_type');
            var min_charge = $('.total-price').attr('min_charge');
            var real_price = $('#keoped').attr('rel') - 8;
            var real_pricee = $('.servicessum').val();
            if (service_type == 1 && parseInt(total) < parseInt(min_charge)) {
                $('#element_to_pop_up').show();
                $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#minimumCharge').attr('rel') + "</p> ");
                $('#element_to_pop_up').bPopup();
                return false;
            } else {

                var count = 0;
                $('.startTime').each(function () {
                    if (!$(this).val()) {
                        $('#element_to_pop_up').show();
                        $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#timeFirst').attr('rel') + "</p> ");
                        $('#element_to_pop_up').bPopup();
                        count++;
                        return false;
                    }

                });
                if (count == 0) {
                    if (total != real_price || real_price != real_pricee || real_price != total) {
                        $('#element_to_pop_up').show();
                        $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#keoped_msg').attr('rel') + "</p> ");
                        $('#element_to_pop_up').bPopup();
                        return false;
                    }
                    $(".bookform").submit();
                }
            }

        });
        $(".submitBook").click(function (e) {
            e.preventDefault;
            var total = $('.total-price label').html();
            var service_type = $('.total-price').attr('service_type');
            var min_charge = $('.total-price').attr('min_charge');
            var real_price = $('#keoped').attr('rel') - 8;
            var real_pricee = $('.servicessum').val();
            var count = 0;
            if (service_type == 1 && parseInt(total) < parseInt(min_charge)) {
                $('#element_to_pop_up').show();
                $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#minimumCharge').attr('rel') + "</p> ");
                $('#element_to_pop_up').bPopup();
                return false;
            } else {
                $('.startTime').each(function () {
                    if (!$(this).val()) {
                        $('#element_to_pop_up').show();
                        $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#timeFirst').attr('rel') + "</p>");
                        $('#element_to_pop_up').bPopup();
                        count++;
                        return false;
                    }
                    var total = $('.total-price label').html();
                    var service_type = $('.total-price').attr('service_type');
                    var min_charge = $('.total-price').attr('min_charge');
                    if (service_type == 1 && parseInt(total) < parseInt(min_charge)) {
                        count++;
                        $('#element_to_pop_up').show();
                        $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#minimumCharge').attr('rel') + "</p> ");
                        $('#element_to_pop_up').bPopup();
                        return false;
                    }

                });
                if (count == 0) {
                    if (total != real_price || real_price != real_pricee || real_price != total) {
                        $('#element_to_pop_up').show();
                        $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#keoped_msg').attr('rel') + "</p> ");
                        $('#element_to_pop_up').bPopup();
                        return false;
                    }
                    $('#signInModal').collapse('show');
                    // $('#myModal').modal('show');
                }
            }

        });
        //employee change times
        $('.employee').change(function () {
            // var form = $(".ajaxsubmit");
            // $('.ajaxsubmit').submit();
            // alert( this.value);
            // alert($(this).parents('.service-offered').attr('id'));
            $('.service-offered').find('.notification').slideUp().find('.service-calendar').slideDown();
            $('.service-offered').find('.active').show().removeClass('active start end cannot');
            $('.service-offered').find('.active').show().removeClass('active start end cannot');
            $('.service-offered').find('.notification').slideUp();
            $('.service-offered').find('.service-calendar').slideDown();
            $('.service-offered').find('.startTime').attr("value", "");
            var dataClock = $('.service-offered').find('.reservedTime').val();
            $('.service-offered').find('.reservedTime').attr("value", "");
            var calender = $(this).attr('calender');
            $.post($(this).attr('url'), {
                employee_id: this.value
            }, function (data) {
                // just try to see the outputs
                // console.log(data);
                if (data) {
                    $("#" + calender).children('ul').remove();
                    $("#" + calender).append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $("#" + calender).append(data);
                        $(".spiner").remove();

                        RemoveDisabledTimes();
                        reomveCanNotTimesHome();

                    }, 500);
                    var arr = dataClock.split(',');
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] != "") {
                            // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                            $('.select-time[data-clock="' + arr[i] + '"]').parent('li').removeClass('active cannot');
                        }

                    }


                }


            })
        });
        //login ajax
        $('.loginajax').submit(function (event) {
            event.preventDefault();
            var form = $(".loginajax");
            var $btn = $("#singin_btn");
            $btn.button('loading');
            // $('.ajaxsubmit').submit();
            $.post(form.attr('action'), form.serialize(), function (data) {
                // just try to see the outputs
                //                console.log(data)
                if (isNaN(data)) {

                    form.children('.load').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".load").html("<div class='alert alert-danger' role='alert'><p>" + data + "</p></div>");
                        // form.find('ul').slideDown();
                        $btn.button('reset');
                    }, 1000);
                } else if (data == 0) {

                    form.children('.load').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".load").html("<div class='alert alert-success' role='alert'><p>" + $('#LogedInSuccessfully').attr('rel') + "</p></div>");
                        $btn.button('reset');
                        $(".bookform").submit();
                    }, 1000);
                } else if (data != 0) {
                    form.children('.loadl').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".loadl").html("<div class='alert alert-success' role='alert'><p>" + $('#VerifySuccessfully').attr('rel') + "</p></div>");
                        $btn.button('reset');
                        form.slideUp();
                        form.next('form').removeClass('hidden');
                        $('#verify_login_id').val(data);
                        // $(".bookform").submit();
                    }, 1000);
                }


            })
        });
        //resend login verification code
        $('#verifiy-login-resend-btn').click(function () {
            var id = $('#verify_login_id').val();
            $('.loadl').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
            $.ajax({
                type: "GET",
                url: base_url + "/ajax_resend_verification/" + id,
                success: function (datas) {
                    $(".spiner").remove();
                    $(".loadl").html(datas);
                }
            });
        });
        //verify login account
        $('.verifyloginajax').submit(function (event) {
            event.preventDefault();
            var form = $(".verifyloginajax");
            var $btn = $("#VerifiyLoginBtn");
            $('#verifiy-login-resend-btn').hide();
            // form.find('ul').slideUp();
            $btn.button('loading');
            // $('.ajaxsubmit').submit();
            $.post(form.attr('action'), form.serialize(), function (data) {
                // just try to see the outputs
                //                console.log(data)
                if (isNaN(data)) {

                    form.children('.loadl').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".loadl").html(data);
                        // form.find('ul').slideDown();
                        $btn.button('reset');
                        $('#verifiy-login-resend-btn').show();
                    }, 1000);
                } else {

                    form.children('.loadl').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".loadl").html("<div class='alert alert-success' role='alert'><p>" + $('#RegisterSuccessfully').attr('rel') + "</p></div>");
                        $btn.button('reset');
                        form.slideUp();
                        $(".bookform").submit();
                    }, 1000);
                }


            })
        });
        //register account
        $('.registerajax').submit(function (event) {
            event.preventDefault();
            var form = $(".registerajax");
            var $btn = $("#signUpBtn");
            // form.find('ul').slideUp();
            $btn.button('loading');
            // $('.ajaxsubmit').submit();
            $.post(form.attr('action'), form.serialize(), function (data) {
                // just try to see the outputs
                //                console.log(data)
                var result = data.split(',');
                if (result[0] == 0) {

                    form.children('.load').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        $(".load").html(result[1]);
                        // form.find('ul').slideDown();
                        $btn.button('reset');
                    }, 1000);
                } else {

                    form.children('.loaded').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {

                        $(".spiner").remove();
                        $(".load").html(result[1]);
                        $btn.button('reset');
                        form.slideUp();
                        //                        form.next('form').removeClass('hidden');
                        //                        $('#verify_user_id').val(result[0]);
                        $(".bookform").submit();
                    }, 1000);
                }


            })
        });
        //resend verification code
        $('#verifiy-resend-btn').click(function () {
            var id = $('#verify_user_id').val();
            $('.loaded').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
            $.ajax({
                type: "GET",
                url: base_url + "/ajax_resend_verification/" + id,
                success: function (datas) {
                    $(".spiner").remove();
                    $(".loaded").html(datas);
                }
            });
        });
        //verify account
        $('.verifyajax').submit(function (event) {
            event.preventDefault();
            var form = $(".verifyajax");
            var $btn = $("#VerifiyBtn");
            $('#verifiy-resend-btn').hide();
            // form.find('ul').slideUp();
            $btn.button('loading');
            // $('.ajaxsubmit').submit();
            $.post(form.attr('action'), form.serialize(), function (data) {
                // just try to see the outputs
                //                console.log(data)
                if (isNaN(data)) {

                    form.children('.loaded').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".loaded").html(data);
                        // form.find('ul').slideDown();
                        $btn.button('reset');
                        $('#verifiy-resend-btn').show();
                    }, 1000);
                } else {

                    form.children('.loaded').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".loaded").html("<div class='alert alert-success' role='alert'><p>" + $('#RegisterSuccessfully').attr('rel') + "</p></div>");
                        $btn.button('reset');
                        form.slideUp();
                        $(".bookform").submit();
                    }, 1000);
                }


            })
        });
        //without account
        $('.withoutAcount').submit(function (event) {
            event.preventDefault();
            var form = $(".withoutAcount");
            // alert("sdfsd");
            // $('.ajaxsubmit').submit();
            var $btn = $("#visitor_id");
            var verify_show = $('#verify_show').val();
            $btn.button('loading');
            $.post(form.attr('action'), form.serialize(), function (data) {
                // just try to see the outputs
                //                console.log(data)
                var result = data.split(',');
                if (result[0] == 0) {

                    form.children('.load').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        $(".load").html(result[1]);
                        // form.find('ul').slideDown();
                        $btn.button('reset');
                    }, 1000);
                } else {

                    form.children('.load').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        $(".load").html(result[1]);
                        $btn.button('reset');
                        form.slideUp();
                        if (verify_show == "yes") {
                            form.next('form').removeClass('hidden');
                            $('#verify_visitor_id').val(result[0]);
                        } else {
                            $(".bookform").submit();
                        }
                        // $(".bookform").submit();
                    }, 1000);
                }


            })
        });
        //verify without account
        $('.verifyvisitorajax').submit(function (event) {
            event.preventDefault();
            var form = $(".verifyvisitorajax");
            var $btn = $("#VerifiyVisitorBtn");
            $('#verifiy-vistor-resend-btn').hide();
            // form.find('ul').slideUp();
            $btn.button('loading');
            // $('.ajaxsubmit').submit();
            $.post(form.attr('action'), form.serialize(), function (data) {
                // just try to see the outputs
                //                console.log(data)
                if (isNaN(data)) {
                    $('#verifiy-vistor-resend-btn').show();
                    form.children('.loadedv').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".loadedv").html(data);
                        // form.find('ul').slideDown();
                        $btn.button('reset');
                        $('#verifiy-visitor-resend-btn').show();
                    }, 1000);
                } else {

                    form.children('.loadedv').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                    setTimeout(function () {
                        $(".spiner").remove();
                        form.children(".loadedv").html("<div class='alert alert-success' role='alert'><p>" + $('#RegisterSuccessfully').attr('rel') + "</p></div>");
                        $btn.button('reset');
                        form.slideUp();
                        $(".bookform").submit();
                    }, 1000);
                }

            })
        });
        //resend verification code
        $('#verifiy-vistor-resend-btn').click(function () {
            var id = $('#verify_visitor_id').val();
            $('.loadedv').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
            $.ajax({
                type: "GET",
                url: base_url + "/ajax_vistor_resend_verification/" + id,
                success: function (datas) {
                    $(".loadedv .spiner").remove();
                    $(".loadedv").html(datas);
                }
            });
        });
    }

    // Bill Page
    if (current_url.indexOf("billpage") > -1) {
        var idleTime = 0;
        //Increment the idle time counter every second.
        // 1 sec = 1000
        var idleInterval = setInterval(timerIncrement, 180000);

        function timerIncrement() {
            idleTime++;
            if (idleTime > 1) {
                doPreload();
            }
        }

        //Zero the idle timer on mouse movement.
        $(this).mousemove(function (e) {
            // idleTime = 0;
        });

        function doPreload() {
            var msg = $('#timeOutMessage').attr('rel');
            $('#element_to_pop_up').show();
            $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + msg + " </p> ");
            $('#element_to_pop_up').bPopup();
            setTimeout(function () {
                window.location = $('#salon_url').attr('rel');
            }, 1000);
            // alert(msg);
            //Preload images, etc.
        }


        $('#address_error').hide();
        $('#address_errorr').hide();
        if ($("input[name*='address_type']:checked").val() == 0) {
            $('.building_type_info').show();
            $("input[name*='house']").addClass('required_address');
            $("input[name*='floor']").addClass('required_address');
            $('#building').attr('placeholder', $('#span_building').attr('rel'));
        } else {
            $('.building_type_info').hide();
            $("input[name*='house']").removeClass('required_address');
            $("input[name*='floor']").removeClass('required_address');
            $('#building').attr('placeholder', $('#span_houseing').attr('rel'));
        }
        $("input[name*='address_type']").click(function () {
            if ($(this).val() == 0) {
                $('.building_type_info').slideDown();
                $("input[name*='house']").addClass('required_address');
                $("input[name*='floor']").addClass('required_address');
                $('#building').attr('placeholder', $('#span_building').attr('rel'));
            } else {
                $('.building_type_info').slideUp();
                $("input[name*='house']").removeClass('required_address');
                $("input[name*='floor']").removeClass('required_address');
                $('#building').attr('placeholder', $('#span_houseing').attr('rel'));
            }
        });
        $('.address_ajax').submit(function (event) {
            event.preventDefault();
            var form = $(".address_ajax");
            var not_compelte = "false";
            $('.required_address').each(function () {
                if ($(this).val() == "") {
                    $('#address_error').slideDown();
                    not_compelte = "true";
                    return false;
                }
            });
            if (not_compelte == "false") {
                $('#address_error').slideUp();
                $('.modal-footer').slideUp();
                $('.modal-contents').slideUp();
                $('.load').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin fa-2x'></i></div>");
                $.post(form.attr('action'), form.serialize(), function (data) {
                    // just try to see the outputs
                    if (data) {
                        setTimeout(function () {
                            $('.load').html("");
                            $('#myModal').modal('hide');
                            $('.new_adderss').each(function () {
                                if (!$(this).hasClass('distrect_require')) {
                                    $(this).val("");
                                }
                            });
                            $('.chzn-single span').html($('#distrectt').attr('rel'));
                            $('#address_error').slideUp();
                            $('#address_errorr').slideUp();
                            $('.modal-footer').slideDown();
                            $('.modal-contents').slideDown();
                            $('#element_to_pop_up').show();
                            $('#element_to_pop_up').html("<p style='color:#3C763D;padding:15px;'>" + $('#address_suc').attr('rel') + "</p> ");
                            $('#element_to_pop_up').bPopup();
                            $('#address_table').html(data);
                        }, 1000);
                    }
                });
            }


        });


        //check in load 
        $(window).load(function () {
            var val = $("[name='payOn']:checked").val();
            if (val != "cash") {

                $('#promotion_dev').slideDown();
                if ($('#promotion_code').val() != "") {
                    $('#add_promotion').click();
                }
            } else {
                $('#promotion_dev').slideUp();
                $('#dev_promotion').hide();
                $('#after_promtion').html('');
                $('#before_promtion').removeClass('old');
                $('#promotion_id').val(0);
            }

        });

        // promotion for online only
        $("[name='payOn']").change(function () {
            var val = $(this).val();
            if (val != "cash") {
                $('#promotion_dev').slideDown();
            } else {
                $('#promotion_dev').slideUp();
                $('#dev_promotion').hide();
                $('#after_promtion').html('');
                $('#before_promtion').removeClass('old');
                $('#promotion_id').val(0);
            }
        });
    }

    // salon service Page
    if (current_url.indexOf("salon") > -1) {
        // check if cart less than minimum charge
        $('.contenuBook').on('click', function (e) {
            e.preventDefault();
            var totaprice = $('.totalPrice').text();
            var minimumprice = $('.minimumcharge').val();
            var serviceKind = $('#ser-kind').val();
            // alert(parseFloat(totaprice));
            // alert(parseFloat(minimumprice));
            if (serviceKind == 1) {
                if (parseFloat(totaprice) < parseFloat(minimumprice)) {
                    var msg = $('#mimimumPriceMsg').val();
                    $('#element_to_pop_up').show();
                    $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + msg + " </p> ");
                    $('#element_to_pop_up').bPopup();
                } else {
                    //                    console.log("more")

                    $('.tocalendar').submit();
                }
            } else {
                //                console.log("pass")
                $('.tocalendar').submit();
            }
            // alert(serviceKind + "-"+minimumprice+"-"+totaprice);


        });
    }


    // Contact Page
    if (current_url.indexOf("contactus") > -1) {
        $(".validform").validate();
        $.validator.messages.required = $(".requiredlay").val();
        $.validator.messages.email = $(".right_email").val();
    }


    $(document).on('click', '.checkboxes .sort', function () {
        var thiss = $(this);
        $('.checkboxes .sort').removeClass('actived');
        thiss.addClass('actived');
    });


    // all salons page
    if (current_url.indexOf("allsalons") > -1) {

        $(window).load(function () {
            $('.get_more_filter').hide();

            $('.get_more').click(function () {
                var current = parseInt($(this).attr('current')) + 1;
                var link = $(this).attr('link');
                if (link.indexOf('?') > -1) {
                    link = link + "&page=" + current;
                } else {
                    link = link + "?page=" + current;
                }
                var max = $(this).attr('max');
                $(this).hide();
                $("#scroll_neww").html("<br><div class='spiner ta-center'><i class='fa fa-spinner fa-spin fa-2x'></i></div>");
                $.ajax({
                    type: "GET",
                    url: link,
                    success: function (datas) {
                        $(".salons-filter").append(datas);
                        $("#scroll_neww").html("");
                        if (current < max) {
                            $('.get_more').show();
                            $('.get_more').attr('current', current);
                        }
                        var offer = $('#offerVal').attr('rel');
                        var packagess = $('#packageVal').attr('rel');
                        var forMaleVal = $('#forMaleVal').attr('rel');
                        var forFemaleVal = $('#forFemaleVal').attr('rel');

                        $('.mix').find('.has-offer-ribbon').remove();
                        $('.mix').find('.has-package-ribbon').remove();
                        $('.mix').find('.marker').remove();


                        $('.has-offer').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-offer-ribbon">' + offer + '</div>'));
                        });
                        $('.has-package').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-package-ribbon">' + packagess + '</div>'));
                        });

                        $('.forFemale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forFemaleVal + '</div>'));
                        });
                        $('.forMale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forMaleVal + '</div>'));
                        });

                        // add service to cart -----------------
                        $('.services').on('click', ".add-serv", function (e) {
                            e.preventDefault();


                            if (!$('.no-services').hasClass('hide')) {
                                $('#servicesIds').val('');
                                $('#packagesIds').val('');
                                $('#services_check').val('');

                            }

                            var id = $(this).attr('rel'),
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('services_check'),
                                    services_check = $('#services_check').val(),
                                    salon_id = $(this).attr('salon_id');
                            var service_type = $(this).attr('service_type');
                            var services_count = "yes";
                            // if (type == "service") {
                            //     var services_count = services_check.search(services_check_value);
                            //     if (services_count >= 0) {
                            //         services_count = "none";
                            //     }
                            // } else {
                            //     var splitter = services_check_value.split(',')
                            //     for (var ii = 0; ii < splitter.length; ii++) {
                            //         var splitter_count = services_check.search(splitter[ii]);
                            //         if (splitter[ii] != "" && splitter_count >= 0) {
                            //             services_count = "none";
                            //         }
                            //     }
                            // }

                            if (services_count != "none") {

                                // check if service or package from the same salon to add more services 

                                if (($('.cart_salon_id').val() == "" || $('.cart_salon_id').val() == salon_id) && ($('#serviceType').val() == "" || $('#serviceType').val() == service_type)) {
                                    var link = $('<a href="#" class="remove-serv" rel="' + id + '" rell="' + type + '" relll="' + services_check_value + '"><i class="fa fa-times"></i></a>'),
                                            dataCoverText = $('#add_suc').attr("rel"),
                                            cover = $('<div class="cover"><strong>' + dataCoverText + '</strong></div>');

                                    $('.no-services').hide();
                                    $('.no-services').addClass('hide');
                                    $('.contenuBook').show();
                                    $('.emptyTheCart').show();
                                    $('.cart-wrapper').addClass('opened');
                                    $('.cart_salon_id').val(salon_id);
                                    // alert("asdasddsa");


                                    $(this).parents('.service-in-list').prepend(cover).delay(1500).fadeOut(500).addClass('removed').clone().prependTo('.cart .mCSB_container').addClass('added').removeClass('removed').append(link).find('.cover').remove();
                                    setTimeout(function () {
                                        $('.removed').remove();

                                        $('.services-list').each(function () {
                                            if ($(this).children().length == 0) {
                                                $(this).next('.noserv').show();
                                            }
                                        });
                                    }, 2000);
                                    var numServices = $('.cart .mCSB_container').children(".service-in-list").length;
                                    // alert(numServices);
                                    $('.cart-switcher .num').html(numServices);



                                    if (type == "service") {
                                        var value = $('#servicesIds').val();
                                        if (value != "") {
                                            $('#servicesIds').val(value + id + ",");
                                        } else {
                                            $('#servicesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }

                                        // add service to session


                                    } else {
                                        var value = $('#packagesIds').val();
                                        if (value != "") {
                                            $('#packagesIds').val(value + id + ",");
                                        } else {
                                            $('#packagesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }
                                    }
                                    //calc total price 

                                    var totalPrice = parseInt($('.contenuBook .totalPrice').html());
                                    if (!totalPrice) {
                                        totalPrice = 0;
                                    }
                                    console.log(totalPrice);
                                    $('.service-in-list.added').each(function () {
                                        var price = $(this).data('totalprice');
                                        totalPrice += parseFloat(price, 10);

                                    });

                                    $('.totalPrice').html(totalPrice);
                                    var service_type = $(this).attr('service_type');
                                    $('#serviceType').val(service_type);
                                    $(".minimumChargeAmount").val($(".minimumcharge").val());
                                    var date = $('#checkin-date').val();
                                    var serviceType = $('#serviceType').val();
                                    var servicesIds = $('#servicesIds').val();
                                    var packagesIds = $('#packagesIds').val();
                                    var services_check = $('#services_check').val();
                                    var minimumChargeAmount = $('.minimumChargeAmount').val();

                                    addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);



                                } else {
                                    var choosenItem = $(this);
                                    // show daialog
                                    ConfirmAnotherSalonDialog('You Choosed services from another Salon Do you want to clear your Cart and add This new service', 'Cart alert', choosenItem);



                                }


                            } else {
                                $('#element_to_pop_up').show();
                                $('#element_to_pop_up').html('<p style="color:#f00; padding:20px;">' + $('#service_found').val() + '</p>');
                                $('#element_to_pop_up').bPopup();
                                return false;
                            }




                        });

                        $(window).load(function () {
                            var cartLenghth = $('.cart .mCSB_container').children().length;
                            // alert(cartLenghth);
                            if (cartLenghth == 0) {
                                $('.contenuBook').hide();
                            } else {
                                $('.contenuBook').show();
                            }
                        });


                        // remove service from cart
                        $('.cart').on('click', ".remove-serv", function (e) {
                            e.preventDefault();

                            var
                                    id = $(this).attr('rel') + ",",
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('relll'),
                                    cate = '#' + $(this).parents('.service-in-list').attr('data-category'),
                                    services_check = $('#services_check').val();

                            if (type == "service") {
                                var value = $('#servicesIds').val();
                            } else {
                                var value = $('#packagesIds').val();
                            }



                            $(this).parents('.service-in-list').fadeOut(500).removeClass('added').addClass('returned').clone().prependTo(cate).addClass('back customStyle').removeClass('returned').find('.remove-serv').remove();
                            setTimeout(function () {
                                $('.returned').remove();
                                $('.bookService').removeClass('hidden');

                                var numServices = $('.cart .mCSB_container').children().length;
                                $('.cart-switcher .num').html(numServices);

                                $('.back').removeClass('back');


                                var totalPrice = $('.totalPrice').text();
                                console.log(totalPrice);
                                $('.service-in-list.returned').each(function () {
                                    var price = $(this).data('totalprice');
                                    totalPrice -= parseFloat(price, 10);

                                });

                                $('.totalPrice').text(totalPrice);




                                // var mystring = value.replace(id, '');
                                // if (type == "service") {
                                //     $('#servicesIds').val(mystring);
                                // } else {
                                //     $('#packagesIds').val(mystring);
                                // }

                                // var mystring2 = services_check.replace(services_check_value, '');
                                // if (type == "service") {
                                //     $('#services_check').val(mystring2);
                                // } else {
                                //     $('#services_check').val(mystring2);
                                // }


                                var date = $('#checkin-date').val();
                                var salon_id = $('.cart_salon_id').val();
                                var serviceType = $('#serviceType').val();
                                var servicesIds = $('#servicesIds').val();
                                var packagesIds = $('#packagesIds').val();
                                var services_check = $('#services_check').val();
                                var minimumChargeAmount = $('.minimumChargeAmount').val();
                                var numServices = parseInt($('.cart-switcher .num').html());

                                addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);


                                if ($('.cart .mCSB_container').children().length == 0) {

                                    // init to delete from the session omly the servie if it is equal to zero will kill the sessision

                                    emptyTheCart();
                                    $('.no-services').show();

                                    $('.cart-wrapper').removeClass('opened');
                                    $('.no-services').removeClass('hide');
                                    // $('.no-services').addClass('show');
                                    $('.contenuBook').hide();
                                    $('.emptyTheCart').hide();
                                }
                                ;

                            }, 500);


                            // var drop = $('#dropHere').attr('rel');
                            // $(".pagges-salon .services-cart-page .service-in-list").draggable({
                            //     appendTo: ".pagges-salon .services-cart-page .salon-services-wrapper",
                            //     cursor: "move",
                            //     helper: 'clone',
                            //     revert: "invalid",
                            //     // delay: 300,
                            //     cursorAt: {
                            //         left: 5
                            //     },
                            //     start: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").addClass('droppping').append($('<p class="droppppp"><span>' + drop + '</span></p>'));
                            //         $('.pagges-salon .services-cart-page .no-services').hide();
                            //         $('.cart-wrapper').addClass('opened');


                            //     },
                            //     stop: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").removeClass('droppping').find('.droppppp').remove();
                            //         $(".pagges-salon .services-cart-page .no-services").show();
                            //         $('.cart-wrapper').removeClass('opened');
                            //     }
                            // });
                        });
                        //------------------------------

                        var multiFilter = {
                            // Declare any variables we will need as properties of the object

                            $filterGroups: null,
                            $filterUi: null,
                            $reset: null,
                            groups: [],
                            outputArray: [],
                            outputString: '',
                            // The "init" method will run on document ready and cache any jQuery objects we will need.

                            init: function () {
                                var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.

                                self.$filterUi = $('.custom-filter');
                                self.$filterGroups = $('.filter-group');
                                self.$reset = $('#Reset');
                                self.$container = $('.salons-filter');

                                self.$filterGroups.each(function () {
                                    self.groups.push({
                                        $inputs: $(this).find('input'),
                                        active: [],
                                        tracker: false
                                    });
                                });

                                self.bindHandlers();
                            },
                            // The "bindHandlers" method will listen for whenever a form value changes. 

                            bindHandlers: function () {
                                var self = this,
                                        typingDelay = 300,
                                        typingTimeout = -1,
                                        resetTimer = function () {
                                            clearTimeout(typingTimeout);

                                            typingTimeout = setTimeout(function () {
                                                self.parseFilters();
                                            }, typingDelay);
                                        };

                                self.$filterGroups
                                        .filter('.checkboxes')
                                        .on('click', function () {
                                            self.parseFilters();
                                        });

                                self.$filterGroups
                                        .filter('.search')
                                        .on('keyup change', resetTimer);

                                self.$reset.on('click', function (e) {
                                    e.preventDefault();
                                    self.$filterUi[0].reset();
                                    self.$filterUi.find('input[type="text"]').val('');
                                    self.parseFilters();
                                });
                            },
                            // The parseFilters method checks which filters are active in each group:

                            parseFilters: function () {
                                var self = this;

                                // loop through each filter group and add active filters to arrays

                                for (var i = 0, group; group = self.groups[i]; i++) {
                                    group.active = []; // reset arrays
                                    group.$inputs.each(function () {
                                        var searchTerm = '',
                                                $input = $(this),
                                                ttt = $input.data('filter'),
                                                minimumLength = 3;

                                        if ($input.is(':checked')) {
                                            group.active.push(ttt);
                                        }

                                        if ($input.is('[type="text"]') && this.value.length >= minimumLength) {
                                            searchTerm = this.value
                                                    .trim()
                                                    .toLowerCase()
                                                    .replace(' ', '-');

                                            group.active[0] = '[class*="' + searchTerm + '"]';
                                        }
                                    });
                                    group.active.length && (group.tracker = 0);
                                }

                                // self.concatenate();
                            },
                            // The "concatenate" method will crawl through each group, concatenating filters as desired:

                        };

                        $(function () {
                            // Initialize multiFilter code
                            multiFilter.init();
                            // Instantiate MixItUp
                            $('.salons-filter').mixItUp({
                                controls: {
                                    toggleFilterButtons: true,
                                    toggleLogic: 'and'
                                },
                                animation: {
                                    easing: 'ease',
                                    effects: 'fade',
                                    duration: 0
                                }
                            });
                        });

                        var classes = [];
                        $(".multiSel").find("span").each(function (i) {
                            var curClass = $(this).attr("class");
                            if (jQuery.inArray(curClass, classes) > -1) {
                                $(this).remove();
                            }
                            classes[i] = curClass;
                        });

                        $("img.lazy").show().lazyload({
                            failure_limit: 10,
                            event: "scroll",
                            effect: "fadeIn"
                        });
                    }
                });
            });

            $('.apply_filter').click(function () {
                $('.current_filter').val(1);
                $(".salons-filter").html('');
                $('.get_more').hide();
                $('.get_more_filter').hide();
                $("#scroll_neww").html("<br><div class='spiner ta-center'><i class='fa fa-spinner fa-spin fa-2x'></i></div>");
                var form = $(".filter_form");
                $.get(form.attr('action'), form.serialize(), function (data) {
                    // just try to see the outputs
                    if (data) {
                        $(".salons-filter").append(data);
                        $("#scroll_neww").html("");

                        var max = $('.max_filter').attr('max');
                        var current = $('.current_filter').val();
                        $('.current_filter').attr('max', max);
                        $('.current_filter').val(parseInt(current) + 1);
                        if (current < max) {
                            $('.get_more_filter').show();
                        }

                        var offer = $('#offerVal').attr('rel');
                        var packagess = $('#packageVal').attr('rel');
                        var forMaleVal = $('#forMaleVal').attr('rel');
                        var forFemaleVal = $('#forFemaleVal').attr('rel');

                        $('.mix').find('.has-offer-ribbon').remove();
                        $('.mix').find('.has-package-ribbon').remove();
                        $('.mix').find('.marker').remove();


                        $('.has-offer').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-offer-ribbon">' + offer + '</div>'));
                        });
                        $('.has-package').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-package-ribbon">' + packagess + '</div>'));
                        });

                        $('.forFemale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forFemaleVal + '</div>'));
                        });
                        $('.forMale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forMaleVal + '</div>'));
                        });

                        // add service to cart -----------------
                        $('.services').on('click', ".add-serv", function (e) {
                            e.preventDefault();


                            if (!$('.no-services').hasClass('hide')) {
                                $('#servicesIds').val('');
                                $('#packagesIds').val('');
                                $('#services_check').val('');

                            }

                            var id = $(this).attr('rel'),
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('services_check'),
                                    services_check = $('#services_check').val(),
                                    salon_id = $(this).attr('salon_id');
                            var service_type = $(this).attr('service_type');

                            var services_count = "yes";
                            // if (type == "service") {
                            //     var services_count = services_check.search(services_check_value);
                            //     if (services_count >= 0) {
                            //         services_count = "none";
                            //     }
                            // } else {
                            //     var splitter = services_check_value.split(',')
                            //     for (var ii = 0; ii < splitter.length; ii++) {
                            //         var splitter_count = services_check.search(splitter[ii]);
                            //         if (splitter[ii] != "" && splitter_count >= 0) {
                            //             services_count = "none";
                            //         }
                            //     }
                            // }

                            if (services_count != "none") {

                                // check if service or package from the same salon to add more services 

                                if (($('.cart_salon_id').val() == "" || $('.cart_salon_id').val() == salon_id) && ($('#serviceType').val() == "" || $('#serviceType').val() == service_type)) {
                                    var link = $('<a href="#" class="remove-serv" rel="' + id + '" rell="' + type + '" relll="' + services_check_value + '"><i class="fa fa-times"></i></a>'),
                                            dataCoverText = $('#add_suc').attr("rel"),
                                            cover = $('<div class="cover"><strong>' + dataCoverText + '</strong></div>');

                                    $('.no-services').hide();
                                    $('.no-services').addClass('hide');
                                    $('.contenuBook').show();
                                    $('.emptyTheCart').show();
                                    $('.cart-wrapper').addClass('opened');
                                    $('.cart_salon_id').val(salon_id);
                                    // alert("asdasddsa");


                                    $(this).parents('.service-in-list').prepend(cover).delay(1500).fadeOut(500).addClass('removed').clone().prependTo('.cart .mCSB_container').addClass('added').removeClass('removed').append(link).find('.cover').remove();
                                    setTimeout(function () {
                                        $('.removed').remove();

                                        $('.services-list').each(function () {
                                            if ($(this).children().length == 0) {
                                                $(this).next('.noserv').show();
                                            }
                                        });
                                    }, 2000);
                                    var numServices = $('.cart .mCSB_container').children(".service-in-list").length;
                                    // alert(numServices);
                                    $('.cart-switcher .num').html(numServices);



                                    if (type == "service") {
                                        var value = $('#servicesIds').val();
                                        if (value != "") {
                                            $('#servicesIds').val(value + id + ",");
                                        } else {
                                            $('#servicesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }

                                        // add service to session


                                    } else {
                                        var value = $('#packagesIds').val();
                                        if (value != "") {
                                            $('#packagesIds').val(value + id + ",");
                                        } else {
                                            $('#packagesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }
                                    }
                                    //calc total price 

                                    var totalPrice = parseInt($('.contenuBook .totalPrice').html());
                                    if (!totalPrice) {
                                        totalPrice = 0;
                                    }
                                    console.log(totalPrice);
                                    $('.service-in-list.added').each(function () {
                                        var price = $(this).data('totalprice');
                                        totalPrice += parseFloat(price, 10);

                                    });

                                    $('.totalPrice').html(totalPrice);
                                    var service_type = $(this).attr('service_type');
                                    $('#serviceType').val(service_type);
                                    $(".minimumChargeAmount").val($(".minimumcharge").val());
                                    var date = $('#checkin-date').val();
                                    var serviceType = $('#serviceType').val();
                                    var servicesIds = $('#servicesIds').val();
                                    var packagesIds = $('#packagesIds').val();
                                    var services_check = $('#services_check').val();
                                    var minimumChargeAmount = $('.minimumChargeAmount').val();

                                    addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);



                                } else {
                                    var choosenItem = $(this);
                                    // show daialog
                                    ConfirmAnotherSalonDialog('You Choosed services from another Salon Do you want to clear your Cart and add This new service', 'Cart alert', choosenItem);



                                }


                            } else {
                                $('#element_to_pop_up').show();
                                $('#element_to_pop_up').html('<p style="color:#f00; padding:20px;">' + $('#service_found').val() + '</p>');
                                $('#element_to_pop_up').bPopup();
                                return false;
                            }




                        });

                        $(window).load(function () {
                            var cartLenghth = $('.cart .mCSB_container').children().length;
                            // alert(cartLenghth);
                            if (cartLenghth == 0) {
                                $('.contenuBook').hide();
                            } else {
                                $('.contenuBook').show();
                            }
                        });


                        // remove service from cart
                        $('.cart').on('click', ".remove-serv", function (e) {
                            e.preventDefault();

                            var
                                    id = $(this).attr('rel') + ",",
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('relll'),
                                    cate = '#' + $(this).parents('.service-in-list').attr('data-category'),
                                    services_check = $('#services_check').val();

                            if (type == "service") {
                                var value = $('#servicesIds').val();
                            } else {
                                var value = $('#packagesIds').val();
                            }



                            $(this).parents('.service-in-list').fadeOut(500).removeClass('added').addClass('returned').clone().prependTo(cate).addClass('back customStyle').removeClass('returned').find('.remove-serv').remove();
                            setTimeout(function () {
                                $('.returned').remove();
                                $('.bookService').removeClass('hidden');

                                var numServices = $('.cart .mCSB_container').children().length;
                                $('.cart-switcher .num').html(numServices);

                                $('.back').removeClass('back');


                                var totalPrice = $('.totalPrice').text();
                                console.log(totalPrice);
                                $('.service-in-list.returned').each(function () {
                                    var price = $(this).data('totalprice');
                                    totalPrice -= parseFloat(price, 10);

                                });

                                $('.totalPrice').text(totalPrice);




                                // var mystring = value.replace(id, '');
                                // if (type == "service") {
                                //     $('#servicesIds').val(mystring);
                                // } else {
                                //     $('#packagesIds').val(mystring);
                                // }

                                // var mystring2 = services_check.replace(services_check_value, '');
                                // if (type == "service") {
                                //     $('#services_check').val(mystring2);
                                // } else {
                                //     $('#services_check').val(mystring2);
                                // }


                                var date = $('#checkin-date').val();
                                var salon_id = $('.cart_salon_id').val();
                                var serviceType = $('#serviceType').val();
                                var servicesIds = $('#servicesIds').val();
                                var packagesIds = $('#packagesIds').val();
                                var services_check = $('#services_check').val();
                                var minimumChargeAmount = $('.minimumChargeAmount').val();
                                var numServices = parseInt($('.cart-switcher .num').html());

                                addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);


                                if ($('.cart .mCSB_container').children().length == 0) {

                                    // init to delete from the session omly the servie if it is equal to zero will kill the sessision

                                    emptyTheCart();
                                    $('.no-services').show();

                                    $('.cart-wrapper').removeClass('opened');
                                    $('.no-services').removeClass('hide');
                                    // $('.no-services').addClass('show');
                                    $('.contenuBook').hide();
                                    $('.emptyTheCart').hide();
                                }
                                ;

                            }, 500);


                            // var drop = $('#dropHere').attr('rel');
                            // $(".pagges-salon .services-cart-page .service-in-list").draggable({
                            //     appendTo: ".pagges-salon .services-cart-page .salon-services-wrapper",
                            //     cursor: "move",
                            //     helper: 'clone',
                            //     revert: "invalid",
                            //     // delay: 300,
                            //     cursorAt: {
                            //         left: 5
                            //     },
                            //     start: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").addClass('droppping').append($('<p class="droppppp"><span>' + drop + '</span></p>'));
                            //         $('.pagges-salon .services-cart-page .no-services').hide();
                            //         $('.cart-wrapper').addClass('opened');


                            //     },
                            //     stop: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").removeClass('droppping').find('.droppppp').remove();
                            //         $(".pagges-salon .services-cart-page .no-services").show();
                            //         $('.cart-wrapper').removeClass('opened');
                            //     }
                            // });
                        });
                        //------------------------------

                        var multiFilter = {
                            // Declare any variables we will need as properties of the object

                            $filterGroups: null,
                            $filterUi: null,
                            $reset: null,
                            groups: [],
                            outputArray: [],
                            outputString: '',
                            // The "init" method will run on document ready and cache any jQuery objects we will need.

                            init: function () {
                                var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.

                                self.$filterUi = $('.custom-filter');
                                self.$filterGroups = $('.filter-group');
                                self.$reset = $('#Reset');
                                self.$container = $('.salons-filter');

                                self.$filterGroups.each(function () {
                                    self.groups.push({
                                        $inputs: $(this).find('input'),
                                        active: [],
                                        tracker: false
                                    });
                                });

                                self.bindHandlers();
                            },
                            // The "bindHandlers" method will listen for whenever a form value changes. 

                            bindHandlers: function () {
                                var self = this,
                                        typingDelay = 300,
                                        typingTimeout = -1,
                                        resetTimer = function () {
                                            clearTimeout(typingTimeout);

                                            typingTimeout = setTimeout(function () {
                                                self.parseFilters();
                                            }, typingDelay);
                                        };

                                self.$filterGroups
                                        .filter('.checkboxes')
                                        .on('click', function () {
                                            self.parseFilters();
                                        });

                                self.$filterGroups
                                        .filter('.search')
                                        .on('keyup change', resetTimer);

                                self.$reset.on('click', function (e) {
                                    e.preventDefault();
                                    self.$filterUi[0].reset();
                                    self.$filterUi.find('input[type="text"]').val('');
                                    self.parseFilters();
                                });
                            },
                            // The parseFilters method checks which filters are active in each group:

                            parseFilters: function () {
                                var self = this;

                                // loop through each filter group and add active filters to arrays

                                for (var i = 0, group; group = self.groups[i]; i++) {
                                    group.active = []; // reset arrays
                                    group.$inputs.each(function () {
                                        var searchTerm = '',
                                                $input = $(this),
                                                ttt = $input.data('filter'),
                                                minimumLength = 3;

                                        if ($input.is(':checked')) {
                                            group.active.push(ttt);
                                        }

                                        if ($input.is('[type="text"]') && this.value.length >= minimumLength) {
                                            searchTerm = this.value
                                                    .trim()
                                                    .toLowerCase()
                                                    .replace(' ', '-');

                                            group.active[0] = '[class*="' + searchTerm + '"]';
                                        }
                                    });
                                    group.active.length && (group.tracker = 0);
                                }

                                // self.concatenate();
                            },
                            // The "concatenate" method will crawl through each group, concatenating filters as desired:

                        };

                        $(function () {
                            // Initialize multiFilter code
                            multiFilter.init();
                            // Instantiate MixItUp
                            $('.salons-filter').mixItUp({
                                controls: {
                                    toggleFilterButtons: true,
                                    toggleLogic: 'and'
                                },
                                animation: {
                                    easing: 'ease',
                                    effects: 'fade',
                                    duration: 0
                                }
                            });
                        });

                        var classes = [];
                        $(".multiSel").find("span").each(function (i) {
                            var curClass = $(this).attr("class");
                            if (jQuery.inArray(curClass, classes) > -1) {
                                $(this).remove();
                            }
                            classes[i] = curClass;
                        });

                        $("img.lazy").show().lazyload({
                            failure_limit: 10,
                            event: "scroll",
                            effect: "fadeIn"
                        });
                    }
                });
            });

            $('.get_more_filter').click(function () {
                $('.get_more_filter').hide();
                $("#scroll_neww").html("<br><div class='spiner ta-center'><i class='fa fa-spinner fa-spin fa-2x'></i></div>");
                var form = $(".filter_form");
                $.get(form.attr('action'), form.serialize(), function (data) {
                    // just try to see the outputs
                    if (data) {
                        $(".salons-filter").append(data);
                        $("#scroll_neww").html("");

                        var max = $('.max_filter').attr('max');
                        var current = $('.current_filter').val();
                        $('.current_filter').attr('max', max);
                        $('.current_filter').val(parseInt(current) + 1);
                        if (current < max) {
                            $('.get_more_filter').show();
                        }

                        var offer = $('#offerVal').attr('rel');
                        var packagess = $('#packageVal').attr('rel');
                        var forMaleVal = $('#forMaleVal').attr('rel');
                        var forFemaleVal = $('#forFemaleVal').attr('rel');

                        $('.mix').find('.has-offer-ribbon').remove();
                        $('.mix').find('.has-package-ribbon').remove();
                        $('.mix').find('.marker').remove();


                        $('.has-offer').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-offer-ribbon">' + offer + '</div>'));
                        });
                        $('.has-package').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-package-ribbon">' + packagess + '</div>'));
                        });

                        $('.forFemale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forFemaleVal + '</div>'));
                        });
                        $('.forMale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forMaleVal + '</div>'));
                        });

                        // add service to cart -----------------
                        $('.services').on('click', ".add-serv", function (e) {
                            e.preventDefault();


                            if (!$('.no-services').hasClass('hide')) {
                                $('#servicesIds').val('');
                                $('#packagesIds').val('');
                                $('#services_check').val('');

                            }

                            var id = $(this).attr('rel'),
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('services_check'),
                                    services_check = $('#services_check').val(),
                                    salon_id = $(this).attr('salon_id');
                            var service_type = $(this).attr('service_type');
                            var services_count = "yes";
                            // if (type == "service") {
                            //     var services_count = services_check.search(services_check_value);
                            //     if (services_count >= 0) {
                            //         services_count = "none";
                            //     }
                            // } else {
                            //     var splitter = services_check_value.split(',')
                            //     for (var ii = 0; ii < splitter.length; ii++) {
                            //         var splitter_count = services_check.search(splitter[ii]);
                            //         if (splitter[ii] != "" && splitter_count >= 0) {
                            //             services_count = "none";
                            //         }
                            //     }
                            // }

                            if (services_count != "none") {

                                // check if service or package from the same salon to add more services 

                                if (($('.cart_salon_id').val() == "" || $('.cart_salon_id').val() == salon_id) && ($('#serviceType').val() == "" || $('#serviceType').val() == service_type)) {
                                    var link = $('<a href="#" class="remove-serv" rel="' + id + '" rell="' + type + '" relll="' + services_check_value + '"><i class="fa fa-times"></i></a>'),
                                            dataCoverText = $('#add_suc').attr("rel"),
                                            cover = $('<div class="cover"><strong>' + dataCoverText + '</strong></div>');

                                    $('.no-services').hide();
                                    $('.no-services').addClass('hide');
                                    $('.contenuBook').show();
                                    $('.emptyTheCart').show();
                                    $('.cart-wrapper').addClass('opened');
                                    $('.cart_salon_id').val(salon_id);
                                    // alert("asdasddsa");


                                    $(this).parents('.service-in-list').prepend(cover).delay(1500).fadeOut(500).addClass('removed').clone().prependTo('.cart .mCSB_container').addClass('added').removeClass('removed').append(link).find('.cover').remove();
                                    setTimeout(function () {
                                        $('.removed').remove();

                                        $('.services-list').each(function () {
                                            if ($(this).children().length == 0) {
                                                $(this).next('.noserv').show();
                                            }
                                        });
                                    }, 2000);
                                    var numServices = $('.cart .mCSB_container').children(".service-in-list").length;
                                    // alert(numServices);
                                    $('.cart-switcher .num').html(numServices);



                                    if (type == "service") {
                                        var value = $('#servicesIds').val();
                                        if (value != "") {
                                            $('#servicesIds').val(value + id + ",");
                                        } else {
                                            $('#servicesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }

                                        // add service to session


                                    } else {
                                        var value = $('#packagesIds').val();
                                        if (value != "") {
                                            $('#packagesIds').val(value + id + ",");
                                        } else {
                                            $('#packagesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }
                                    }
                                    //calc total price 

                                    var totalPrice = parseInt($('.contenuBook .totalPrice').html());
                                    if (!totalPrice) {
                                        totalPrice = 0;
                                    }
                                    console.log(totalPrice);
                                    $('.service-in-list.added').each(function () {
                                        var price = $(this).data('totalprice');
                                        totalPrice += parseFloat(price, 10);

                                    });

                                    $('.totalPrice').html(totalPrice);
                                    var service_type = $(this).attr('service_type');
                                    $('#serviceType').val(service_type);
                                    $(".minimumChargeAmount").val($(".minimumcharge").val());
                                    var date = $('#checkin-date').val();
                                    var serviceType = $('#serviceType').val();
                                    var servicesIds = $('#servicesIds').val();
                                    var packagesIds = $('#packagesIds').val();
                                    var services_check = $('#services_check').val();
                                    var minimumChargeAmount = $('.minimumChargeAmount').val();

                                    addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);



                                } else {
                                    var choosenItem = $(this);
                                    // show daialog
                                    ConfirmAnotherSalonDialog('You Choosed services from another Salon Do you want to clear your Cart and add This new service', 'Cart alert', choosenItem);



                                }


                            } else {
                                $('#element_to_pop_up').show();
                                $('#element_to_pop_up').html('<p style="color:#f00; padding:20px;">' + $('#service_found').val() + '</p>');
                                $('#element_to_pop_up').bPopup();
                                return false;
                            }




                        });

                        $(window).load(function () {
                            var cartLenghth = $('.cart .mCSB_container').children().length;
                            // alert(cartLenghth);
                            if (cartLenghth == 0) {
                                $('.contenuBook').hide();
                            } else {
                                $('.contenuBook').show();
                            }
                        });


                        // remove service from cart
                        $('.cart').on('click', ".remove-serv", function (e) {
                            e.preventDefault();

                            var
                                    id = $(this).attr('rel') + ",",
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('relll'),
                                    cate = '#' + $(this).parents('.service-in-list').attr('data-category'),
                                    services_check = $('#services_check').val();

                            if (type == "service") {
                                var value = $('#servicesIds').val();
                            } else {
                                var value = $('#packagesIds').val();
                            }



                            $(this).parents('.service-in-list').fadeOut(500).removeClass('added').addClass('returned').clone().prependTo(cate).addClass('back customStyle').removeClass('returned').find('.remove-serv').remove();
                            setTimeout(function () {
                                $('.returned').remove();
                                $('.bookService').removeClass('hidden');

                                var numServices = $('.cart .mCSB_container').children().length;
                                $('.cart-switcher .num').html(numServices);

                                $('.back').removeClass('back');


                                var totalPrice = $('.totalPrice').text();
                                console.log(totalPrice);
                                $('.service-in-list.returned').each(function () {
                                    var price = $(this).data('totalprice');
                                    totalPrice -= parseFloat(price, 10);

                                });

                                $('.totalPrice').text(totalPrice);




                                // var mystring = value.replace(id, '');
                                // if (type == "service") {
                                //     $('#servicesIds').val(mystring);
                                // } else {
                                //     $('#packagesIds').val(mystring);
                                // }

                                // var mystring2 = services_check.replace(services_check_value, '');
                                // if (type == "service") {
                                //     $('#services_check').val(mystring2);
                                // } else {
                                //     $('#services_check').val(mystring2);
                                // }


                                var date = $('#checkin-date').val();
                                var salon_id = $('.cart_salon_id').val();
                                var serviceType = $('#serviceType').val();
                                var servicesIds = $('#servicesIds').val();
                                var packagesIds = $('#packagesIds').val();
                                var services_check = $('#services_check').val();
                                var minimumChargeAmount = $('.minimumChargeAmount').val();
                                var numServices = parseInt($('.cart-switcher .num').html());

                                addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);


                                if ($('.cart .mCSB_container').children().length == 0) {

                                    // init to delete from the session omly the servie if it is equal to zero will kill the sessision

                                    emptyTheCart();
                                    $('.no-services').show();

                                    $('.cart-wrapper').removeClass('opened');
                                    $('.no-services').removeClass('hide');
                                    // $('.no-services').addClass('show');
                                    $('.contenuBook').hide();
                                    $('.emptyTheCart').hide();
                                }
                                ;

                            }, 500);


                            // var drop = $('#dropHere').attr('rel');
                            // $(".pagges-salon .services-cart-page .service-in-list").draggable({
                            //     appendTo: ".pagges-salon .services-cart-page .salon-services-wrapper",
                            //     cursor: "move",
                            //     helper: 'clone',
                            //     revert: "invalid",
                            //     // delay: 300,
                            //     cursorAt: {
                            //         left: 5
                            //     },
                            //     start: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").addClass('droppping').append($('<p class="droppppp"><span>' + drop + '</span></p>'));
                            //         $('.pagges-salon .services-cart-page .no-services').hide();
                            //         $('.cart-wrapper').addClass('opened');


                            //     },
                            //     stop: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").removeClass('droppping').find('.droppppp').remove();
                            //         $(".pagges-salon .services-cart-page .no-services").show();
                            //         $('.cart-wrapper').removeClass('opened');
                            //     }
                            // });
                        });
                        //------------------------------

                        var multiFilter = {
                            // Declare any variables we will need as properties of the object

                            $filterGroups: null,
                            $filterUi: null,
                            $reset: null,
                            groups: [],
                            outputArray: [],
                            outputString: '',
                            // The "init" method will run on document ready and cache any jQuery objects we will need.

                            init: function () {
                                var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.

                                self.$filterUi = $('.custom-filter');
                                self.$filterGroups = $('.filter-group');
                                self.$reset = $('#Reset');
                                self.$container = $('.salons-filter');

                                self.$filterGroups.each(function () {
                                    self.groups.push({
                                        $inputs: $(this).find('input'),
                                        active: [],
                                        tracker: false
                                    });
                                });

                                self.bindHandlers();
                            },
                            // The "bindHandlers" method will listen for whenever a form value changes. 

                            bindHandlers: function () {
                                var self = this,
                                        typingDelay = 300,
                                        typingTimeout = -1,
                                        resetTimer = function () {
                                            clearTimeout(typingTimeout);

                                            typingTimeout = setTimeout(function () {
                                                self.parseFilters();
                                            }, typingDelay);
                                        };

                                self.$filterGroups
                                        .filter('.checkboxes')
                                        .on('click', function () {
                                            self.parseFilters();
                                        });

                                self.$filterGroups
                                        .filter('.search')
                                        .on('keyup change', resetTimer);

                                self.$reset.on('click', function (e) {
                                    e.preventDefault();
                                    self.$filterUi[0].reset();
                                    self.$filterUi.find('input[type="text"]').val('');
                                    self.parseFilters();
                                });
                            },
                            // The parseFilters method checks which filters are active in each group:

                            parseFilters: function () {
                                var self = this;

                                // loop through each filter group and add active filters to arrays

                                for (var i = 0, group; group = self.groups[i]; i++) {
                                    group.active = []; // reset arrays
                                    group.$inputs.each(function () {
                                        var searchTerm = '',
                                                $input = $(this),
                                                ttt = $input.data('filter'),
                                                minimumLength = 3;

                                        if ($input.is(':checked')) {
                                            group.active.push(ttt);
                                        }

                                        if ($input.is('[type="text"]') && this.value.length >= minimumLength) {
                                            searchTerm = this.value
                                                    .trim()
                                                    .toLowerCase()
                                                    .replace(' ', '-');

                                            group.active[0] = '[class*="' + searchTerm + '"]';
                                        }
                                    });
                                    group.active.length && (group.tracker = 0);
                                }

                                // self.concatenate();
                            },
                            // The "concatenate" method will crawl through each group, concatenating filters as desired:

                        };

                        $(function () {
                            // Initialize multiFilter code
                            multiFilter.init();
                            // Instantiate MixItUp
                            $('.salons-filter').mixItUp({
                                controls: {
                                    toggleFilterButtons: true,
                                    toggleLogic: 'and'
                                },
                                animation: {
                                    easing: 'ease',
                                    effects: 'fade',
                                    duration: 0
                                }
                            });
                        });

                        var classes = [];
                        $(".multiSel").find("span").each(function (i) {
                            var curClass = $(this).attr("class");
                            if (jQuery.inArray(curClass, classes) > -1) {
                                $(this).remove();
                            }
                            classes[i] = curClass;
                        });

                        $("img.lazy").show().lazyload({
                            failure_limit: 10,
                            event: "scroll",
                            effect: "fadeIn"
                        });
                    }
                });
            });
        });

    }

    // search salons by word page
    if (current_url.indexOf("searchword") > -1) {

        $(window).load(function () {
            $('.get_more_filter').hide();

            $('.get_more').click(function () {
                var current = parseInt($(this).attr('current')) + 1;
                var link = $(this).attr('link');
                link = link + "&page=" + current;
                var max = $(this).attr('max');
                $(this).hide();
                $("#scroll_neww").html("<br><div class='spiner ta-center'><i class='fa fa-spinner fa-spin fa-2x'></i></div>");
                $.ajax({
                    type: "GET",
                    url: link,
                    success: function (datas) {
                        $(".salons-filter").append(datas);
                        $("#scroll_neww").html("");
                        if (current < max) {
                            $('.get_more').show();
                            $('.get_more').attr('current', current);
                        }
                        var offer = $('#offerVal').attr('rel');
                        var packagess = $('#packageVal').attr('rel');
                        var forMaleVal = $('#forMaleVal').attr('rel');
                        var forFemaleVal = $('#forFemaleVal').attr('rel');

                        $('.mix').find('.has-offer-ribbon').remove();
                        $('.mix').find('.has-package-ribbon').remove();
                        $('.mix').find('.marker').remove();


                        $('.has-offer').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-offer-ribbon">' + offer + '</div>'));
                        });
                        $('.has-package').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-package-ribbon">' + packagess + '</div>'));
                        });

                        $('.forFemale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forFemaleVal + '</div>'));
                        });
                        $('.forMale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forMaleVal + '</div>'));
                        });

                        // add service to cart -----------------
                        $('.services').on('click', ".add-serv", function (e) {
                            e.preventDefault();


                            if (!$('.no-services').hasClass('hide')) {
                                $('#servicesIds').val('');
                                $('#packagesIds').val('');
                                $('#services_check').val('');

                            }

                            var id = $(this).attr('rel'),
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('services_check'),
                                    services_check = $('#services_check').val(),
                                    salon_id = $(this).attr('salon_id');
                            var service_type = $(this).attr('service_type');
                            var services_count = "yes";
                            // if (type == "service") {
                            //     var services_count = services_check.search(services_check_value);
                            //     if (services_count >= 0) {
                            //         services_count = "none";
                            //     }
                            // } else {
                            //     var splitter = services_check_value.split(',')
                            //     for (var ii = 0; ii < splitter.length; ii++) {
                            //         var splitter_count = services_check.search(splitter[ii]);
                            //         if (splitter[ii] != "" && splitter_count >= 0) {
                            //             services_count = "none";
                            //         }
                            //     }
                            // }

                            if (services_count != "none") {

                                // check if service or package from the same salon to add more services 

                                if (($('.cart_salon_id').val() == "" || $('.cart_salon_id').val() == salon_id) && ($('#serviceType').val() == "" || $('#serviceType').val() == service_type)) {
                                    var link = $('<a href="#" class="remove-serv" rel="' + id + '" rell="' + type + '" relll="' + services_check_value + '"><i class="fa fa-times"></i></a>'),
                                            dataCoverText = $('#add_suc').attr("rel"),
                                            cover = $('<div class="cover"><strong>' + dataCoverText + '</strong></div>');

                                    $('.no-services').hide();
                                    $('.no-services').addClass('hide');
                                    $('.contenuBook').show();
                                    $('.emptyTheCart').show();
                                    $('.cart-wrapper').addClass('opened');
                                    $('.cart_salon_id').val(salon_id);
                                    // alert("asdasddsa");


                                    $(this).parents('.service-in-list').prepend(cover).delay(1500).fadeOut(500).addClass('removed').clone().prependTo('.cart .mCSB_container').addClass('added').removeClass('removed').append(link).find('.cover').remove();
                                    setTimeout(function () {
                                        $('.removed').remove();

                                        $('.services-list').each(function () {
                                            if ($(this).children().length == 0) {
                                                $(this).next('.noserv').show();
                                            }
                                        });
                                    }, 2000);
                                    var numServices = $('.cart .mCSB_container').children(".service-in-list").length;
                                    // alert(numServices);
                                    $('.cart-switcher .num').html(numServices);



                                    if (type == "service") {
                                        var value = $('#servicesIds').val();
                                        if (value != "") {
                                            $('#servicesIds').val(value + id + ",");
                                        } else {
                                            $('#servicesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }

                                        // add service to session


                                    } else {
                                        var value = $('#packagesIds').val();
                                        if (value != "") {
                                            $('#packagesIds').val(value + id + ",");
                                        } else {
                                            $('#packagesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }
                                    }
                                    //calc total price 

                                    var totalPrice = parseInt($('.contenuBook .totalPrice').html());
                                    if (!totalPrice) {
                                        totalPrice = 0;
                                    }
                                    console.log(totalPrice);
                                    $('.service-in-list.added').each(function () {
                                        var price = $(this).data('totalprice');
                                        totalPrice += parseFloat(price, 10);

                                    });

                                    $('.totalPrice').html(totalPrice);
                                    var service_type = $(this).attr('service_type');
                                    $('#serviceType').val(service_type);
                                    $(".minimumChargeAmount").val($(".minimumcharge").val());
                                    var date = $('#checkin-date').val();
                                    var serviceType = $('#serviceType').val();
                                    var servicesIds = $('#servicesIds').val();
                                    var packagesIds = $('#packagesIds').val();
                                    var services_check = $('#services_check').val();
                                    var minimumChargeAmount = $('.minimumChargeAmount').val();

                                    addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);



                                } else {
                                    var choosenItem = $(this);
                                    // show daialog
                                    ConfirmAnotherSalonDialog('You Choosed services from another Salon Do you want to clear your Cart and add This new service', 'Cart alert', choosenItem);



                                }


                            } else {
                                $('#element_to_pop_up').show();
                                $('#element_to_pop_up').html('<p style="color:#f00; padding:20px;">' + $('#service_found').val() + '</p>');
                                $('#element_to_pop_up').bPopup();
                                return false;
                            }




                        });

                        $(window).load(function () {
                            var cartLenghth = $('.cart .mCSB_container').children().length;
                            // alert(cartLenghth);
                            if (cartLenghth == 0) {
                                $('.contenuBook').hide();
                            } else {
                                $('.contenuBook').show();
                            }
                        });


                        // remove service from cart
                        $('.cart').on('click', ".remove-serv", function (e) {
                            e.preventDefault();

                            var
                                    id = $(this).attr('rel') + ",",
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('relll'),
                                    cate = '#' + $(this).parents('.service-in-list').attr('data-category'),
                                    services_check = $('#services_check').val();

                            if (type == "service") {
                                var value = $('#servicesIds').val();
                            } else {
                                var value = $('#packagesIds').val();
                            }



                            $(this).parents('.service-in-list').fadeOut(500).removeClass('added').addClass('returned').clone().prependTo(cate).addClass('back customStyle').removeClass('returned').find('.remove-serv').remove();
                            setTimeout(function () {
                                $('.returned').remove();
                                $('.bookService').removeClass('hidden');

                                var numServices = $('.cart .mCSB_container').children().length;
                                $('.cart-switcher .num').html(numServices);

                                $('.back').removeClass('back');


                                var totalPrice = $('.totalPrice').text();
                                console.log(totalPrice);
                                $('.service-in-list.returned').each(function () {
                                    var price = $(this).data('totalprice');
                                    totalPrice -= parseFloat(price, 10);

                                });

                                $('.totalPrice').text(totalPrice);




                                // var mystring = value.replace(id, '');
                                // if (type == "service") {
                                //     $('#servicesIds').val(mystring);
                                // } else {
                                //     $('#packagesIds').val(mystring);
                                // }

                                // var mystring2 = services_check.replace(services_check_value, '');
                                // if (type == "service") {
                                //     $('#services_check').val(mystring2);
                                // } else {
                                //     $('#services_check').val(mystring2);
                                // }


                                var date = $('#checkin-date').val();
                                var salon_id = $('.cart_salon_id').val();
                                var serviceType = $('#serviceType').val();
                                var servicesIds = $('#servicesIds').val();
                                var packagesIds = $('#packagesIds').val();
                                var services_check = $('#services_check').val();
                                var minimumChargeAmount = $('.minimumChargeAmount').val();
                                var numServices = parseInt($('.cart-switcher .num').html());

                                addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);


                                if ($('.cart .mCSB_container').children().length == 0) {

                                    // init to delete from the session omly the servie if it is equal to zero will kill the sessision

                                    emptyTheCart();
                                    $('.no-services').show();

                                    $('.cart-wrapper').removeClass('opened');
                                    $('.no-services').removeClass('hide');
                                    // $('.no-services').addClass('show');
                                    $('.contenuBook').hide();
                                    $('.emptyTheCart').hide();
                                }
                                ;

                            }, 500);


                            // var drop = $('#dropHere').attr('rel');
                            // $(".pagges-salon .services-cart-page .service-in-list").draggable({
                            //     appendTo: ".pagges-salon .services-cart-page .salon-services-wrapper",
                            //     cursor: "move",
                            //     helper: 'clone',
                            //     revert: "invalid",
                            //     // delay: 300,
                            //     cursorAt: {
                            //         left: 5
                            //     },
                            //     start: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").addClass('droppping').append($('<p class="droppppp"><span>' + drop + '</span></p>'));
                            //         $('.pagges-salon .services-cart-page .no-services').hide();
                            //         $('.cart-wrapper').addClass('opened');


                            //     },
                            //     stop: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").removeClass('droppping').find('.droppppp').remove();
                            //         $(".pagges-salon .services-cart-page .no-services").show();
                            //         $('.cart-wrapper').removeClass('opened');
                            //     }
                            // });
                        });
                        //------------------------------

                        var multiFilter = {
                            // Declare any variables we will need as properties of the object

                            $filterGroups: null,
                            $filterUi: null,
                            $reset: null,
                            groups: [],
                            outputArray: [],
                            outputString: '',
                            // The "init" method will run on document ready and cache any jQuery objects we will need.

                            init: function () {
                                var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.

                                self.$filterUi = $('.custom-filter');
                                self.$filterGroups = $('.filter-group');
                                self.$reset = $('#Reset');
                                self.$container = $('.salons-filter');

                                self.$filterGroups.each(function () {
                                    self.groups.push({
                                        $inputs: $(this).find('input'),
                                        active: [],
                                        tracker: false
                                    });
                                });

                                self.bindHandlers();
                            },
                            // The "bindHandlers" method will listen for whenever a form value changes. 

                            bindHandlers: function () {
                                var self = this,
                                        typingDelay = 300,
                                        typingTimeout = -1,
                                        resetTimer = function () {
                                            clearTimeout(typingTimeout);

                                            typingTimeout = setTimeout(function () {
                                                self.parseFilters();
                                            }, typingDelay);
                                        };

                                self.$filterGroups
                                        .filter('.checkboxes')
                                        .on('click', function () {
                                            self.parseFilters();
                                        });

                                self.$filterGroups
                                        .filter('.search')
                                        .on('keyup change', resetTimer);

                                self.$reset.on('click', function (e) {
                                    e.preventDefault();
                                    self.$filterUi[0].reset();
                                    self.$filterUi.find('input[type="text"]').val('');
                                    self.parseFilters();
                                });
                            },
                            // The parseFilters method checks which filters are active in each group:

                            parseFilters: function () {
                                var self = this;

                                // loop through each filter group and add active filters to arrays

                                for (var i = 0, group; group = self.groups[i]; i++) {
                                    group.active = []; // reset arrays
                                    group.$inputs.each(function () {
                                        var searchTerm = '',
                                                $input = $(this),
                                                ttt = $input.data('filter'),
                                                minimumLength = 3;

                                        if ($input.is(':checked')) {
                                            group.active.push(ttt);
                                        }

                                        if ($input.is('[type="text"]') && this.value.length >= minimumLength) {
                                            searchTerm = this.value
                                                    .trim()
                                                    .toLowerCase()
                                                    .replace(' ', '-');

                                            group.active[0] = '[class*="' + searchTerm + '"]';
                                        }
                                    });
                                    group.active.length && (group.tracker = 0);
                                }

                                // self.concatenate();
                            },
                            // The "concatenate" method will crawl through each group, concatenating filters as desired:

                        };

                        $(function () {
                            // Initialize multiFilter code
                            multiFilter.init();
                            // Instantiate MixItUp
                            $('.salons-filter').mixItUp({
                                controls: {
                                    toggleFilterButtons: true,
                                    toggleLogic: 'and'
                                },
                                animation: {
                                    easing: 'ease',
                                    effects: 'fade',
                                    duration: 0
                                }
                            });
                        });

                        var classes = [];
                        $(".multiSel").find("span").each(function (i) {
                            var curClass = $(this).attr("class");
                            if (jQuery.inArray(curClass, classes) > -1) {
                                $(this).remove();
                            }
                            classes[i] = curClass;
                        });

                        $("img.lazy").show().lazyload({
                            failure_limit: 10,
                            event: "scroll",
                            effect: "fadeIn"
                        });
                    }
                });
            });

            $('.apply_filter').click(function () {
                $('.current_filter').val(1);
                $(".salons-filter").html('');
                $('.get_more').hide();
                $('.get_more_filter').hide();
                $("#scroll_neww").html("<br><div class='spiner ta-center'><i class='fa fa-spinner fa-spin fa-2x'></i></div>");
                var form = $(".filter_form");
                $.get(form.attr('action'), form.serialize(), function (data) {
                    // just try to see the outputs
                    if (data) {
                        $(".salons-filter").append(data);
                        $("#scroll_neww").html("");

                        var max = $('.max_filter').attr('max');
                        var current = $('.current_filter').val();
                        $('.current_filter').attr('max', max);
                        $('.current_filter').val(parseInt(current) + 1);
                        if (current < max) {
                            $('.get_more_filter').show();
                        }

                        var offer = $('#offerVal').attr('rel');
                        var packagess = $('#packageVal').attr('rel');
                        var forMaleVal = $('#forMaleVal').attr('rel');
                        var forFemaleVal = $('#forFemaleVal').attr('rel');

                        $('.mix').find('.has-offer-ribbon').remove();
                        $('.mix').find('.has-package-ribbon').remove();
                        $('.mix').find('.marker').remove();


                        $('.has-offer').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-offer-ribbon">' + offer + '</div>'));
                        });
                        $('.has-package').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-package-ribbon">' + packagess + '</div>'));
                        });

                        $('.forFemale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forFemaleVal + '</div>'));
                        });
                        $('.forMale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forMaleVal + '</div>'));
                        });

                        // add service to cart -----------------
                        $('.services').on('click', ".add-serv", function (e) {
                            e.preventDefault();


                            if (!$('.no-services').hasClass('hide')) {
                                $('#servicesIds').val('');
                                $('#packagesIds').val('');
                                $('#services_check').val('');

                            }

                            var id = $(this).attr('rel'),
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('services_check'),
                                    services_check = $('#services_check').val(),
                                    salon_id = $(this).attr('salon_id');
                            var service_type = $(this).attr('service_type');
                            var services_count = "yes";
                            // if (type == "service") {
                            //     var services_count = services_check.search(services_check_value);
                            //     if (services_count >= 0) {
                            //         services_count = "none";
                            //     }
                            // } else {
                            //     var splitter = services_check_value.split(',')
                            //     for (var ii = 0; ii < splitter.length; ii++) {
                            //         var splitter_count = services_check.search(splitter[ii]);
                            //         if (splitter[ii] != "" && splitter_count >= 0) {
                            //             services_count = "none";
                            //         }
                            //     }
                            // }

                            if (services_count != "none") {

                                // check if service or package from the same salon to add more services 

                                if (($('.cart_salon_id').val() == "" || $('.cart_salon_id').val() == salon_id) && ($('#serviceType').val() == "" || $('#serviceType').val() == service_type)) {
                                    var link = $('<a href="#" class="remove-serv" rel="' + id + '" rell="' + type + '" relll="' + services_check_value + '"><i class="fa fa-times"></i></a>'),
                                            dataCoverText = $('#add_suc').attr("rel"),
                                            cover = $('<div class="cover"><strong>' + dataCoverText + '</strong></div>');

                                    $('.no-services').hide();
                                    $('.no-services').addClass('hide');
                                    $('.contenuBook').show();
                                    $('.emptyTheCart').show();
                                    $('.cart-wrapper').addClass('opened');
                                    $('.cart_salon_id').val(salon_id);
                                    // alert("asdasddsa");


                                    $(this).parents('.service-in-list').prepend(cover).delay(1500).fadeOut(500).addClass('removed').clone().prependTo('.cart .mCSB_container').addClass('added').removeClass('removed').append(link).find('.cover').remove();
                                    setTimeout(function () {
                                        $('.removed').remove();

                                        $('.services-list').each(function () {
                                            if ($(this).children().length == 0) {
                                                $(this).next('.noserv').show();
                                            }
                                        });
                                    }, 2000);
                                    var numServices = $('.cart .mCSB_container').children(".service-in-list").length;
                                    // alert(numServices);
                                    $('.cart-switcher .num').html(numServices);



                                    if (type == "service") {
                                        var value = $('#servicesIds').val();
                                        if (value != "") {
                                            $('#servicesIds').val(value + id + ",");
                                        } else {
                                            $('#servicesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }

                                        // add service to session


                                    } else {
                                        var value = $('#packagesIds').val();
                                        if (value != "") {
                                            $('#packagesIds').val(value + id + ",");
                                        } else {
                                            $('#packagesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }
                                    }
                                    //calc total price 

                                    var totalPrice = parseInt($('.contenuBook .totalPrice').html());
                                    if (!totalPrice) {
                                        totalPrice = 0;
                                    }
                                    console.log(totalPrice);
                                    $('.service-in-list.added').each(function () {
                                        var price = $(this).data('totalprice');
                                        totalPrice += parseFloat(price, 10);

                                    });

                                    $('.totalPrice').html(totalPrice);
                                    var service_type = $(this).attr('service_type');
                                    $('#serviceType').val(service_type);
                                    $(".minimumChargeAmount").val($(".minimumcharge").val());
                                    var date = $('#checkin-date').val();
                                    var serviceType = $('#serviceType').val();
                                    var servicesIds = $('#servicesIds').val();
                                    var packagesIds = $('#packagesIds').val();
                                    var services_check = $('#services_check').val();
                                    var minimumChargeAmount = $('.minimumChargeAmount').val();

                                    addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);



                                } else {
                                    var choosenItem = $(this);
                                    // show daialog
                                    ConfirmAnotherSalonDialog('You Choosed services from another Salon Do you want to clear your Cart and add This new service', 'Cart alert', choosenItem);



                                }


                            } else {
                                $('#element_to_pop_up').show();
                                $('#element_to_pop_up').html('<p style="color:#f00; padding:20px;">' + $('#service_found').val() + '</p>');
                                $('#element_to_pop_up').bPopup();
                                return false;
                            }




                        });

                        $(window).load(function () {
                            var cartLenghth = $('.cart .mCSB_container').children().length;
                            // alert(cartLenghth);
                            if (cartLenghth == 0) {
                                $('.contenuBook').hide();
                            } else {
                                $('.contenuBook').show();
                            }
                        });


                        // remove service from cart
                        $('.cart').on('click', ".remove-serv", function (e) {
                            e.preventDefault();

                            var
                                    id = $(this).attr('rel') + ",",
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('relll'),
                                    cate = '#' + $(this).parents('.service-in-list').attr('data-category'),
                                    services_check = $('#services_check').val();

                            if (type == "service") {
                                var value = $('#servicesIds').val();
                            } else {
                                var value = $('#packagesIds').val();
                            }



                            $(this).parents('.service-in-list').fadeOut(500).removeClass('added').addClass('returned').clone().prependTo(cate).addClass('back customStyle').removeClass('returned').find('.remove-serv').remove();
                            setTimeout(function () {
                                $('.returned').remove();
                                $('.bookService').removeClass('hidden');

                                var numServices = $('.cart .mCSB_container').children().length;
                                $('.cart-switcher .num').html(numServices);

                                $('.back').removeClass('back');


                                var totalPrice = $('.totalPrice').text();
                                console.log(totalPrice);
                                $('.service-in-list.returned').each(function () {
                                    var price = $(this).data('totalprice');
                                    totalPrice -= parseFloat(price, 10);

                                });

                                $('.totalPrice').text(totalPrice);




                                // var mystring = value.replace(id, '');
                                // if (type == "service") {
                                //     $('#servicesIds').val(mystring);
                                // } else {
                                //     $('#packagesIds').val(mystring);
                                // }

                                // var mystring2 = services_check.replace(services_check_value, '');
                                // if (type == "service") {
                                //     $('#services_check').val(mystring2);
                                // } else {
                                //     $('#services_check').val(mystring2);
                                // }


                                var date = $('#checkin-date').val();
                                var salon_id = $('.cart_salon_id').val();
                                var serviceType = $('#serviceType').val();
                                var servicesIds = $('#servicesIds').val();
                                var packagesIds = $('#packagesIds').val();
                                var services_check = $('#services_check').val();
                                var minimumChargeAmount = $('.minimumChargeAmount').val();
                                var numServices = parseInt($('.cart-switcher .num').html());

                                addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);


                                if ($('.cart .mCSB_container').children().length == 0) {

                                    // init to delete from the session omly the servie if it is equal to zero will kill the sessision

                                    emptyTheCart();
                                    $('.no-services').show();

                                    $('.cart-wrapper').removeClass('opened');
                                    $('.no-services').removeClass('hide');
                                    // $('.no-services').addClass('show');
                                    $('.contenuBook').hide();
                                    $('.emptyTheCart').hide();
                                }
                                ;

                            }, 500);


                            // var drop = $('#dropHere').attr('rel');
                            // $(".pagges-salon .services-cart-page .service-in-list").draggable({
                            //     appendTo: ".pagges-salon .services-cart-page .salon-services-wrapper",
                            //     cursor: "move",
                            //     helper: 'clone',
                            //     revert: "invalid",
                            //     // delay: 300,
                            //     cursorAt: {
                            //         left: 5
                            //     },
                            //     start: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").addClass('droppping').append($('<p class="droppppp"><span>' + drop + '</span></p>'));
                            //         $('.pagges-salon .services-cart-page .no-services').hide();
                            //         $('.cart-wrapper').addClass('opened');


                            //     },
                            //     stop: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").removeClass('droppping').find('.droppppp').remove();
                            //         $(".pagges-salon .services-cart-page .no-services").show();
                            //         $('.cart-wrapper').removeClass('opened');
                            //     }
                            // });
                        });
                        //------------------------------

                        var multiFilter = {
                            // Declare any variables we will need as properties of the object

                            $filterGroups: null,
                            $filterUi: null,
                            $reset: null,
                            groups: [],
                            outputArray: [],
                            outputString: '',
                            // The "init" method will run on document ready and cache any jQuery objects we will need.

                            init: function () {
                                var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.

                                self.$filterUi = $('.custom-filter');
                                self.$filterGroups = $('.filter-group');
                                self.$reset = $('#Reset');
                                self.$container = $('.salons-filter');

                                self.$filterGroups.each(function () {
                                    self.groups.push({
                                        $inputs: $(this).find('input'),
                                        active: [],
                                        tracker: false
                                    });
                                });

                                self.bindHandlers();
                            },
                            // The "bindHandlers" method will listen for whenever a form value changes. 

                            bindHandlers: function () {
                                var self = this,
                                        typingDelay = 300,
                                        typingTimeout = -1,
                                        resetTimer = function () {
                                            clearTimeout(typingTimeout);

                                            typingTimeout = setTimeout(function () {
                                                self.parseFilters();
                                            }, typingDelay);
                                        };

                                self.$filterGroups
                                        .filter('.checkboxes')
                                        .on('click', function () {
                                            self.parseFilters();
                                        });

                                self.$filterGroups
                                        .filter('.search')
                                        .on('keyup change', resetTimer);

                                self.$reset.on('click', function (e) {
                                    e.preventDefault();
                                    self.$filterUi[0].reset();
                                    self.$filterUi.find('input[type="text"]').val('');
                                    self.parseFilters();
                                });
                            },
                            // The parseFilters method checks which filters are active in each group:

                            parseFilters: function () {
                                var self = this;

                                // loop through each filter group and add active filters to arrays

                                for (var i = 0, group; group = self.groups[i]; i++) {
                                    group.active = []; // reset arrays
                                    group.$inputs.each(function () {
                                        var searchTerm = '',
                                                $input = $(this),
                                                ttt = $input.data('filter'),
                                                minimumLength = 3;

                                        if ($input.is(':checked')) {
                                            group.active.push(ttt);
                                        }

                                        if ($input.is('[type="text"]') && this.value.length >= minimumLength) {
                                            searchTerm = this.value
                                                    .trim()
                                                    .toLowerCase()
                                                    .replace(' ', '-');

                                            group.active[0] = '[class*="' + searchTerm + '"]';
                                        }
                                    });
                                    group.active.length && (group.tracker = 0);
                                }

                                // self.concatenate();
                            },
                            // The "concatenate" method will crawl through each group, concatenating filters as desired:

                        };

                        $(function () {
                            // Initialize multiFilter code
                            multiFilter.init();
                            // Instantiate MixItUp
                            $('.salons-filter').mixItUp({
                                controls: {
                                    toggleFilterButtons: true,
                                    toggleLogic: 'and'
                                },
                                animation: {
                                    easing: 'ease',
                                    effects: 'fade',
                                    duration: 0
                                }
                            });
                        });

                        var classes = [];
                        $(".multiSel").find("span").each(function (i) {
                            var curClass = $(this).attr("class");
                            if (jQuery.inArray(curClass, classes) > -1) {
                                $(this).remove();
                            }
                            classes[i] = curClass;
                        });

                        $("img.lazy").show().lazyload({
                            failure_limit: 10,
                            event: "scroll",
                            effect: "fadeIn"
                        });
                    }
                });
            });

            $('.get_more_filter').click(function () {
                $('.get_more_filter').hide();
                $("#scroll_neww").html("<br><div class='spiner ta-center'><i class='fa fa-spinner fa-spin fa-2x'></i></div>");
                var form = $(".filter_form");
                $.get(form.attr('action'), form.serialize(), function (data) {
                    // just try to see the outputs
                    if (data) {
                        $(".salons-filter").append(data);
                        $("#scroll_neww").html("");

                        var max = $('.max_filter').attr('max');
                        var current = $('.current_filter').val();
                        $('.current_filter').attr('max', max);
                        $('.current_filter').val(parseInt(current) + 1);
                        if (current < max) {
                            $('.get_more_filter').show();
                        }

                        var offer = $('#offerVal').attr('rel');
                        var packagess = $('#packageVal').attr('rel');
                        var forMaleVal = $('#forMaleVal').attr('rel');
                        var forFemaleVal = $('#forFemaleVal').attr('rel');

                        $('.mix').find('.has-offer-ribbon').remove();
                        $('.mix').find('.has-package-ribbon').remove();
                        $('.mix').find('.marker').remove();


                        $('.has-offer').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-offer-ribbon">' + offer + '</div>'));
                        });
                        $('.has-package').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-package-ribbon">' + packagess + '</div>'));
                        });

                        $('.forFemale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forFemaleVal + '</div>'));
                        });
                        $('.forMale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forMaleVal + '</div>'));
                        });

                        // add service to cart -----------------
                        $('.services').on('click', ".add-serv", function (e) {
                            e.preventDefault();


                            if (!$('.no-services').hasClass('hide')) {
                                $('#servicesIds').val('');
                                $('#packagesIds').val('');
                                $('#services_check').val('');

                            }

                            var id = $(this).attr('rel'),
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('services_check'),
                                    services_check = $('#services_check').val(),
                                    salon_id = $(this).attr('salon_id');
                            var service_type = $(this).attr('service_type');
                            var services_count = "yes";
                            // if (type == "service") {
                            //     var services_count = services_check.search(services_check_value);
                            //     if (services_count >= 0) {
                            //         services_count = "none";
                            //     }
                            // } else {
                            //     var splitter = services_check_value.split(',')
                            //     for (var ii = 0; ii < splitter.length; ii++) {
                            //         var splitter_count = services_check.search(splitter[ii]);
                            //         if (splitter[ii] != "" && splitter_count >= 0) {
                            //             services_count = "none";
                            //         }
                            //     }
                            // }

                            if (services_count != "none") {

                                // check if service or package from the same salon to add more services 

                                if (($('.cart_salon_id').val() == "" || $('.cart_salon_id').val() == salon_id) && ($('#serviceType').val() == "" || $('#serviceType').val() == service_type)) {
                                    var link = $('<a href="#" class="remove-serv" rel="' + id + '" rell="' + type + '" relll="' + services_check_value + '"><i class="fa fa-times"></i></a>'),
                                            dataCoverText = $('#add_suc').attr("rel"),
                                            cover = $('<div class="cover"><strong>' + dataCoverText + '</strong></div>');

                                    $('.no-services').hide();
                                    $('.no-services').addClass('hide');
                                    $('.contenuBook').show();
                                    $('.emptyTheCart').show();
                                    $('.cart-wrapper').addClass('opened');
                                    $('.cart_salon_id').val(salon_id);
                                    // alert("asdasddsa");


                                    $(this).parents('.service-in-list').prepend(cover).delay(1500).fadeOut(500).addClass('removed').clone().prependTo('.cart .mCSB_container').addClass('added').removeClass('removed').append(link).find('.cover').remove();
                                    setTimeout(function () {
                                        $('.removed').remove();

                                        $('.services-list').each(function () {
                                            if ($(this).children().length == 0) {
                                                $(this).next('.noserv').show();
                                            }
                                        });
                                    }, 2000);
                                    var numServices = $('.cart .mCSB_container').children(".service-in-list").length;
                                    // alert(numServices);
                                    $('.cart-switcher .num').html(numServices);



                                    if (type == "service") {
                                        var value = $('#servicesIds').val();
                                        if (value != "") {
                                            $('#servicesIds').val(value + id + ",");
                                        } else {
                                            $('#servicesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }

                                        // add service to session


                                    } else {
                                        var value = $('#packagesIds').val();
                                        if (value != "") {
                                            $('#packagesIds').val(value + id + ",");
                                        } else {
                                            $('#packagesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }
                                    }
                                    //calc total price 

                                    var totalPrice = parseInt($('.contenuBook .totalPrice').html());
                                    if (!totalPrice) {
                                        totalPrice = 0;
                                    }
                                    console.log(totalPrice);
                                    $('.service-in-list.added').each(function () {
                                        var price = $(this).data('totalprice');
                                        totalPrice += parseFloat(price, 10);

                                    });

                                    $('.totalPrice').html(totalPrice);
                                    var service_type = $(this).attr('service_type');
                                    $('#serviceType').val(service_type);
                                    $(".minimumChargeAmount").val($(".minimumcharge").val());
                                    var date = $('#checkin-date').val();
                                    var serviceType = $('#serviceType').val();
                                    var servicesIds = $('#servicesIds').val();
                                    var packagesIds = $('#packagesIds').val();
                                    var services_check = $('#services_check').val();
                                    var minimumChargeAmount = $('.minimumChargeAmount').val();

                                    addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);



                                } else {
                                    var choosenItem = $(this);
                                    // show daialog
                                    ConfirmAnotherSalonDialog('You Choosed services from another Salon Do you want to clear your Cart and add This new service', 'Cart alert', choosenItem);



                                }


                            } else {
                                $('#element_to_pop_up').show();
                                $('#element_to_pop_up').html('<p style="color:#f00; padding:20px;">' + $('#service_found').val() + '</p>');
                                $('#element_to_pop_up').bPopup();
                                return false;
                            }




                        });

                        $(window).load(function () {
                            var cartLenghth = $('.cart .mCSB_container').children().length;
                            // alert(cartLenghth);
                            if (cartLenghth == 0) {
                                $('.contenuBook').hide();
                            } else {
                                $('.contenuBook').show();
                            }
                        });


                        // remove service from cart
                        $('.cart').on('click', ".remove-serv", function (e) {
                            e.preventDefault();

                            var
                                    id = $(this).attr('rel') + ",",
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('relll'),
                                    cate = '#' + $(this).parents('.service-in-list').attr('data-category'),
                                    services_check = $('#services_check').val();

                            if (type == "service") {
                                var value = $('#servicesIds').val();
                            } else {
                                var value = $('#packagesIds').val();
                            }



                            $(this).parents('.service-in-list').fadeOut(500).removeClass('added').addClass('returned').clone().prependTo(cate).addClass('back customStyle').removeClass('returned').find('.remove-serv').remove();
                            setTimeout(function () {
                                $('.returned').remove();
                                $('.bookService').removeClass('hidden');

                                var numServices = $('.cart .mCSB_container').children().length;
                                $('.cart-switcher .num').html(numServices);

                                $('.back').removeClass('back');


                                var totalPrice = $('.totalPrice').text();
                                console.log(totalPrice);
                                $('.service-in-list.returned').each(function () {
                                    var price = $(this).data('totalprice');
                                    totalPrice -= parseFloat(price, 10);

                                });

                                $('.totalPrice').text(totalPrice);




                                // var mystring = value.replace(id, '');
                                // if (type == "service") {
                                //     $('#servicesIds').val(mystring);
                                // } else {
                                //     $('#packagesIds').val(mystring);
                                // }

                                // var mystring2 = services_check.replace(services_check_value, '');
                                // if (type == "service") {
                                //     $('#services_check').val(mystring2);
                                // } else {
                                //     $('#services_check').val(mystring2);
                                // }


                                var date = $('#checkin-date').val();
                                var salon_id = $('.cart_salon_id').val();
                                var serviceType = $('#serviceType').val();
                                var servicesIds = $('#servicesIds').val();
                                var packagesIds = $('#packagesIds').val();
                                var services_check = $('#services_check').val();
                                var minimumChargeAmount = $('.minimumChargeAmount').val();
                                var numServices = parseInt($('.cart-switcher .num').html());

                                addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);


                                if ($('.cart .mCSB_container').children().length == 0) {

                                    // init to delete from the session omly the servie if it is equal to zero will kill the sessision

                                    emptyTheCart();
                                    $('.no-services').show();

                                    $('.cart-wrapper').removeClass('opened');
                                    $('.no-services').removeClass('hide');
                                    // $('.no-services').addClass('show');
                                    $('.contenuBook').hide();
                                    $('.emptyTheCart').hide();
                                }
                                ;

                            }, 500);


                            // var drop = $('#dropHere').attr('rel');
                            // $(".pagges-salon .services-cart-page .service-in-list").draggable({
                            //     appendTo: ".pagges-salon .services-cart-page .salon-services-wrapper",
                            //     cursor: "move",
                            //     helper: 'clone',
                            //     revert: "invalid",
                            //     // delay: 300,
                            //     cursorAt: {
                            //         left: 5
                            //     },
                            //     start: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").addClass('droppping').append($('<p class="droppppp"><span>' + drop + '</span></p>'));
                            //         $('.pagges-salon .services-cart-page .no-services').hide();
                            //         $('.cart-wrapper').addClass('opened');


                            //     },
                            //     stop: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").removeClass('droppping').find('.droppppp').remove();
                            //         $(".pagges-salon .services-cart-page .no-services").show();
                            //         $('.cart-wrapper').removeClass('opened');
                            //     }
                            // });
                        });
                        //------------------------------

                        var multiFilter = {
                            // Declare any variables we will need as properties of the object

                            $filterGroups: null,
                            $filterUi: null,
                            $reset: null,
                            groups: [],
                            outputArray: [],
                            outputString: '',
                            // The "init" method will run on document ready and cache any jQuery objects we will need.

                            init: function () {
                                var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.

                                self.$filterUi = $('.custom-filter');
                                self.$filterGroups = $('.filter-group');
                                self.$reset = $('#Reset');
                                self.$container = $('.salons-filter');

                                self.$filterGroups.each(function () {
                                    self.groups.push({
                                        $inputs: $(this).find('input'),
                                        active: [],
                                        tracker: false
                                    });
                                });

                                self.bindHandlers();
                            },
                            // The "bindHandlers" method will listen for whenever a form value changes. 

                            bindHandlers: function () {
                                var self = this,
                                        typingDelay = 300,
                                        typingTimeout = -1,
                                        resetTimer = function () {
                                            clearTimeout(typingTimeout);

                                            typingTimeout = setTimeout(function () {
                                                self.parseFilters();
                                            }, typingDelay);
                                        };

                                self.$filterGroups
                                        .filter('.checkboxes')
                                        .on('click', function () {
                                            self.parseFilters();
                                        });

                                self.$filterGroups
                                        .filter('.search')
                                        .on('keyup change', resetTimer);

                                self.$reset.on('click', function (e) {
                                    e.preventDefault();
                                    self.$filterUi[0].reset();
                                    self.$filterUi.find('input[type="text"]').val('');
                                    self.parseFilters();
                                });
                            },
                            // The parseFilters method checks which filters are active in each group:

                            parseFilters: function () {
                                var self = this;

                                // loop through each filter group and add active filters to arrays

                                for (var i = 0, group; group = self.groups[i]; i++) {
                                    group.active = []; // reset arrays
                                    group.$inputs.each(function () {
                                        var searchTerm = '',
                                                $input = $(this),
                                                ttt = $input.data('filter'),
                                                minimumLength = 3;

                                        if ($input.is(':checked')) {
                                            group.active.push(ttt);
                                        }

                                        if ($input.is('[type="text"]') && this.value.length >= minimumLength) {
                                            searchTerm = this.value
                                                    .trim()
                                                    .toLowerCase()
                                                    .replace(' ', '-');

                                            group.active[0] = '[class*="' + searchTerm + '"]';
                                        }
                                    });
                                    group.active.length && (group.tracker = 0);
                                }

                                // self.concatenate();
                            },
                            // The "concatenate" method will crawl through each group, concatenating filters as desired:

                        };

                        $(function () {
                            // Initialize multiFilter code
                            multiFilter.init();
                            // Instantiate MixItUp
                            $('.salons-filter').mixItUp({
                                controls: {
                                    toggleFilterButtons: true,
                                    toggleLogic: 'and'
                                },
                                animation: {
                                    easing: 'ease',
                                    effects: 'fade',
                                    duration: 0
                                }
                            });
                        });

                        var classes = [];
                        $(".multiSel").find("span").each(function (i) {
                            var curClass = $(this).attr("class");
                            if (jQuery.inArray(curClass, classes) > -1) {
                                $(this).remove();
                            }
                            classes[i] = curClass;
                        });

                        $("img.lazy").show().lazyload({
                            failure_limit: 10,
                            event: "scroll",
                            effect: "fadeIn"
                        });
                    }
                });
            });
        });

    }

    // search salons advanced
    if (current_url.indexOf("service_search") > -1) {

        $(window).load(function () {
            $('.get_more_filter').hide();

            $('.get_more').click(function () {
                var current = parseInt($(this).attr('current')) + 1;
                var link = $(this).attr('link');
                link = link + "&page=" + current;
                var max = $(this).attr('max');
                $(this).hide();
                $("#scroll_neww").html("<br><div class='spiner ta-center'><i class='fa fa-spinner fa-spin fa-2x'></i></div>");
                $.ajax({
                    type: "GET",
                    url: link,
                    success: function (datas) {
                        $(".salons-filter").append(datas);
                        $("#scroll_neww").html("");
                        if (current < max) {
                            $('.get_more').show();
                            $('.get_more').attr('current', current);
                        }
                        var offer = $('#offerVal').attr('rel');
                        var packagess = $('#packageVal').attr('rel');
                        var forMaleVal = $('#forMaleVal').attr('rel');
                        var forFemaleVal = $('#forFemaleVal').attr('rel');

                        $('.mix').find('.has-offer-ribbon').remove();
                        $('.mix').find('.has-package-ribbon').remove();
                        $('.mix').find('.marker').remove();


                        $('.has-offer').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-offer-ribbon">' + offer + '</div>'));
                        });
                        $('.has-package').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-package-ribbon">' + packagess + '</div>'));
                        });

                        $('.forFemale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forFemaleVal + '</div>'));
                        });
                        $('.forMale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forMaleVal + '</div>'));
                        });

                        // add service to cart -----------------
                        $('.services').on('click', ".add-serv", function (e) {
                            e.preventDefault();


                            if (!$('.no-services').hasClass('hide')) {
                                $('#servicesIds').val('');
                                $('#packagesIds').val('');
                                $('#services_check').val('');

                            }

                            var id = $(this).attr('rel'),
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('services_check'),
                                    services_check = $('#services_check').val(),
                                    salon_id = $(this).attr('salon_id');
                            var service_type = $(this).attr('service_type');
                            var services_count = "yes";
                            // if (type == "service") {
                            //     var services_count = services_check.search(services_check_value);
                            //     if (services_count >= 0) {
                            //         services_count = "none";
                            //     }
                            // } else {
                            //     var splitter = services_check_value.split(',')
                            //     for (var ii = 0; ii < splitter.length; ii++) {
                            //         var splitter_count = services_check.search(splitter[ii]);
                            //         if (splitter[ii] != "" && splitter_count >= 0) {
                            //             services_count = "none";
                            //         }
                            //     }
                            // }

                            if (services_count != "none") {

                                // check if service or package from the same salon to add more services 

                                if (($('.cart_salon_id').val() == "" || $('.cart_salon_id').val() == salon_id) && ($('#serviceType').val() == "" || $('#serviceType').val() == service_type)) {
                                    var link = $('<a href="#" class="remove-serv" rel="' + id + '" rell="' + type + '" relll="' + services_check_value + '"><i class="fa fa-times"></i></a>'),
                                            dataCoverText = $('#add_suc').attr("rel"),
                                            cover = $('<div class="cover"><strong>' + dataCoverText + '</strong></div>');

                                    $('.no-services').hide();
                                    $('.no-services').addClass('hide');
                                    $('.contenuBook').show();
                                    $('.emptyTheCart').show();
                                    $('.cart-wrapper').addClass('opened');
                                    $('.cart_salon_id').val(salon_id);
                                    // alert("asdasddsa");


                                    $(this).parents('.service-in-list').prepend(cover).delay(1500).fadeOut(500).addClass('removed').clone().prependTo('.cart .mCSB_container').addClass('added').removeClass('removed').append(link).find('.cover').remove();
                                    setTimeout(function () {
                                        $('.removed').remove();

                                        $('.services-list').each(function () {
                                            if ($(this).children().length == 0) {
                                                $(this).next('.noserv').show();
                                            }
                                        });
                                    }, 2000);
                                    var numServices = $('.cart .mCSB_container').children(".service-in-list").length;
                                    // alert(numServices);
                                    $('.cart-switcher .num').html(numServices);



                                    if (type == "service") {
                                        var value = $('#servicesIds').val();
                                        if (value != "") {
                                            $('#servicesIds').val(value + id + ",");
                                        } else {
                                            $('#servicesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }

                                        // add service to session


                                    } else {
                                        var value = $('#packagesIds').val();
                                        if (value != "") {
                                            $('#packagesIds').val(value + id + ",");
                                        } else {
                                            $('#packagesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }
                                    }
                                    //calc total price 

                                    var totalPrice = parseInt($('.contenuBook .totalPrice').html());
                                    if (!totalPrice) {
                                        totalPrice = 0;
                                    }
                                    console.log(totalPrice);
                                    $('.service-in-list.added').each(function () {
                                        var price = $(this).data('totalprice');
                                        totalPrice += parseFloat(price, 10);

                                    });

                                    $('.totalPrice').html(totalPrice);
                                    var service_type = $(this).attr('service_type');
                                    $('#serviceType').val(service_type);
                                    $(".minimumChargeAmount").val($(".minimumcharge").val());
                                    var date = $('#checkin-date').val();
                                    var serviceType = $('#serviceType').val();
                                    var servicesIds = $('#servicesIds').val();
                                    var packagesIds = $('#packagesIds').val();
                                    var services_check = $('#services_check').val();
                                    var minimumChargeAmount = $('.minimumChargeAmount').val();

                                    addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);



                                } else {
                                    var choosenItem = $(this);
                                    // show daialog
                                    ConfirmAnotherSalonDialog('You Choosed services from another Salon Do you want to clear your Cart and add This new service', 'Cart alert', choosenItem);



                                }


                            } else {
                                $('#element_to_pop_up').show();
                                $('#element_to_pop_up').html('<p style="color:#f00; padding:20px;">' + $('#service_found').val() + '</p>');
                                $('#element_to_pop_up').bPopup();
                                return false;
                            }




                        });

                        $(window).load(function () {
                            var cartLenghth = $('.cart .mCSB_container').children().length;
                            // alert(cartLenghth);
                            if (cartLenghth == 0) {
                                $('.contenuBook').hide();
                            } else {
                                $('.contenuBook').show();
                            }
                        });


                        // remove service from cart
                        $('.cart').on('click', ".remove-serv", function (e) {
                            e.preventDefault();

                            var
                                    id = $(this).attr('rel') + ",",
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('relll'),
                                    cate = '#' + $(this).parents('.service-in-list').attr('data-category'),
                                    services_check = $('#services_check').val();

                            if (type == "service") {
                                var value = $('#servicesIds').val();
                            } else {
                                var value = $('#packagesIds').val();
                            }



                            $(this).parents('.service-in-list').fadeOut(500).removeClass('added').addClass('returned').clone().prependTo(cate).addClass('back customStyle').removeClass('returned').find('.remove-serv').remove();
                            setTimeout(function () {
                                $('.returned').remove();
                                $('.bookService').removeClass('hidden');

                                var numServices = $('.cart .mCSB_container').children().length;
                                $('.cart-switcher .num').html(numServices);

                                $('.back').removeClass('back');


                                var totalPrice = $('.totalPrice').text();
                                console.log(totalPrice);
                                $('.service-in-list.returned').each(function () {
                                    var price = $(this).data('totalprice');
                                    totalPrice -= parseFloat(price, 10);

                                });

                                $('.totalPrice').text(totalPrice);




                                // var mystring = value.replace(id, '');
                                // if (type == "service") {
                                //     $('#servicesIds').val(mystring);
                                // } else {
                                //     $('#packagesIds').val(mystring);
                                // }

                                // var mystring2 = services_check.replace(services_check_value, '');
                                // if (type == "service") {
                                //     $('#services_check').val(mystring2);
                                // } else {
                                //     $('#services_check').val(mystring2);
                                // }


                                var date = $('#checkin-date').val();
                                var salon_id = $('.cart_salon_id').val();
                                var serviceType = $('#serviceType').val();
                                var servicesIds = $('#servicesIds').val();
                                var packagesIds = $('#packagesIds').val();
                                var services_check = $('#services_check').val();
                                var minimumChargeAmount = $('.minimumChargeAmount').val();
                                var numServices = parseInt($('.cart-switcher .num').html());

                                addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);


                                if ($('.cart .mCSB_container').children().length == 0) {

                                    // init to delete from the session omly the servie if it is equal to zero will kill the sessision

                                    emptyTheCart();
                                    $('.no-services').show();

                                    $('.cart-wrapper').removeClass('opened');
                                    $('.no-services').removeClass('hide');
                                    // $('.no-services').addClass('show');
                                    $('.contenuBook').hide();
                                    $('.emptyTheCart').hide();
                                }
                                ;

                            }, 500);


                            // var drop = $('#dropHere').attr('rel');
                            // $(".pagges-salon .services-cart-page .service-in-list").draggable({
                            //     appendTo: ".pagges-salon .services-cart-page .salon-services-wrapper",
                            //     cursor: "move",
                            //     helper: 'clone',
                            //     revert: "invalid",
                            //     // delay: 300,
                            //     cursorAt: {
                            //         left: 5
                            //     },
                            //     start: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").addClass('droppping').append($('<p class="droppppp"><span>' + drop + '</span></p>'));
                            //         $('.pagges-salon .services-cart-page .no-services').hide();
                            //         $('.cart-wrapper').addClass('opened');


                            //     },
                            //     stop: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").removeClass('droppping').find('.droppppp').remove();
                            //         $(".pagges-salon .services-cart-page .no-services").show();
                            //         $('.cart-wrapper').removeClass('opened');
                            //     }
                            // });
                        });
                        //------------------------------

                        var multiFilter = {
                            // Declare any variables we will need as properties of the object

                            $filterGroups: null,
                            $filterUi: null,
                            $reset: null,
                            groups: [],
                            outputArray: [],
                            outputString: '',
                            // The "init" method will run on document ready and cache any jQuery objects we will need.

                            init: function () {
                                var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.

                                self.$filterUi = $('.custom-filter');
                                self.$filterGroups = $('.filter-group');
                                self.$reset = $('#Reset');
                                self.$container = $('.salons-filter');

                                self.$filterGroups.each(function () {
                                    self.groups.push({
                                        $inputs: $(this).find('input'),
                                        active: [],
                                        tracker: false
                                    });
                                });

                                self.bindHandlers();
                            },
                            // The "bindHandlers" method will listen for whenever a form value changes. 

                            bindHandlers: function () {
                                var self = this,
                                        typingDelay = 300,
                                        typingTimeout = -1,
                                        resetTimer = function () {
                                            clearTimeout(typingTimeout);

                                            typingTimeout = setTimeout(function () {
                                                self.parseFilters();
                                            }, typingDelay);
                                        };

                                self.$filterGroups
                                        .filter('.checkboxes')
                                        .on('click', function () {
                                            self.parseFilters();
                                        });

                                self.$filterGroups
                                        .filter('.search')
                                        .on('keyup change', resetTimer);

                                self.$reset.on('click', function (e) {
                                    e.preventDefault();
                                    self.$filterUi[0].reset();
                                    self.$filterUi.find('input[type="text"]').val('');
                                    self.parseFilters();
                                });
                            },
                            // The parseFilters method checks which filters are active in each group:

                            parseFilters: function () {
                                var self = this;

                                // loop through each filter group and add active filters to arrays

                                for (var i = 0, group; group = self.groups[i]; i++) {
                                    group.active = []; // reset arrays
                                    group.$inputs.each(function () {
                                        var searchTerm = '',
                                                $input = $(this),
                                                ttt = $input.data('filter'),
                                                minimumLength = 3;

                                        if ($input.is(':checked')) {
                                            group.active.push(ttt);
                                        }

                                        if ($input.is('[type="text"]') && this.value.length >= minimumLength) {
                                            searchTerm = this.value
                                                    .trim()
                                                    .toLowerCase()
                                                    .replace(' ', '-');

                                            group.active[0] = '[class*="' + searchTerm + '"]';
                                        }
                                    });
                                    group.active.length && (group.tracker = 0);
                                }

                                // self.concatenate();
                            },
                            // The "concatenate" method will crawl through each group, concatenating filters as desired:

                        };

                        $(function () {
                            // Initialize multiFilter code
                            multiFilter.init();
                            // Instantiate MixItUp
                            $('.salons-filter').mixItUp({
                                controls: {
                                    toggleFilterButtons: true,
                                    toggleLogic: 'and'
                                },
                                animation: {
                                    easing: 'ease',
                                    effects: 'fade',
                                    duration: 0
                                }
                            });
                        });

                        var classes = [];
                        $(".multiSel").find("span").each(function (i) {
                            var curClass = $(this).attr("class");
                            if (jQuery.inArray(curClass, classes) > -1) {
                                $(this).remove();
                            }
                            classes[i] = curClass;
                        });

                        $("img.lazy").show().lazyload({
                            failure_limit: 10,
                            event: "scroll",
                            effect: "fadeIn"
                        });
                    }
                });
            });

            $('.apply_filter').click(function () {
                $('.current_filter').val(1);
                $(".salons-filter").html('');
                $('.get_more').hide();
                $('.get_more_filter').hide();
                $("#scroll_neww").html("<br><div class='spiner ta-center'><i class='fa fa-spinner fa-spin fa-2x'></i></div>");
                var form = $(".filter_form");
                $.get(form.attr('action'), form.serialize(), function (data) {
                    // just try to see the outputs
                    if (data) {
                        $(".salons-filter").append(data);
                        $("#scroll_neww").html("");

                        var max = $('.max_filter').attr('max');
                        var current = $('.current_filter').val();
                        $('.current_filter').attr('max', max);
                        $('.current_filter').val(parseInt(current) + 1);
                        if (current < max) {
                            $('.get_more_filter').show();
                        }

                        var offer = $('#offerVal').attr('rel');
                        var packagess = $('#packageVal').attr('rel');
                        var forMaleVal = $('#forMaleVal').attr('rel');
                        var forFemaleVal = $('#forFemaleVal').attr('rel');

                        $('.mix').find('.has-offer-ribbon').remove();
                        $('.mix').find('.has-package-ribbon').remove();
                        $('.mix').find('.marker').remove();


                        $('.has-offer').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-offer-ribbon">' + offer + '</div>'));
                        });
                        $('.has-package').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-package-ribbon">' + packagess + '</div>'));
                        });

                        $('.forFemale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forFemaleVal + '</div>'));
                        });
                        $('.forMale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forMaleVal + '</div>'));
                        });



                        // add service to cart -----------------
                        $('.services').on('click', ".add-serv", function (e) {
                            e.preventDefault();


                            if (!$('.no-services').hasClass('hide')) {
                                $('#servicesIds').val('');
                                $('#packagesIds').val('');
                                $('#services_check').val('');

                            }

                            var id = $(this).attr('rel'),
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('services_check'),
                                    services_check = $('#services_check').val(),
                                    salon_id = $(this).attr('salon_id');
                            var service_type = $(this).attr('service_type');
                            var services_count = "yes";
                            // if (type == "service") {
                            //     var services_count = services_check.search(services_check_value);
                            //     if (services_count >= 0) {
                            //         services_count = "none";
                            //     }
                            // } else {
                            //     var splitter = services_check_value.split(',')
                            //     for (var ii = 0; ii < splitter.length; ii++) {
                            //         var splitter_count = services_check.search(splitter[ii]);
                            //         if (splitter[ii] != "" && splitter_count >= 0) {
                            //             services_count = "none";
                            //         }
                            //     }
                            // }

                            if (services_count != "none") {

                                // check if service or package from the same salon to add more services 

                                if (($('.cart_salon_id').val() == "" || $('.cart_salon_id').val() == salon_id) && ($('#serviceType').val() == "" || $('#serviceType').val() == service_type)) {
                                    var link = $('<a href="#" class="remove-serv" rel="' + id + '" rell="' + type + '" relll="' + services_check_value + '"><i class="fa fa-times"></i></a>'),
                                            dataCoverText = $('#add_suc').attr("rel"),
                                            cover = $('<div class="cover"><strong>' + dataCoverText + '</strong></div>');

                                    $('.no-services').hide();
                                    $('.no-services').addClass('hide');
                                    $('.contenuBook').show();
                                    $('.emptyTheCart').show();
                                    $('.cart-wrapper').addClass('opened');
                                    $('.cart_salon_id').val(salon_id);
                                    // alert("asdasddsa");


                                    $(this).parents('.service-in-list').prepend(cover).delay(1500).fadeOut(500).addClass('removed').clone().prependTo('.cart .mCSB_container').addClass('added').removeClass('removed').append(link).find('.cover').remove();
                                    setTimeout(function () {
                                        $('.removed').remove();

                                        $('.services-list').each(function () {
                                            if ($(this).children().length == 0) {
                                                $(this).next('.noserv').show();
                                            }
                                        });
                                    }, 2000);
                                    var numServices = $('.cart .mCSB_container').children(".service-in-list").length;
                                    // alert(numServices);
                                    $('.cart-switcher .num').html(numServices);



                                    if (type == "service") {
                                        var value = $('#servicesIds').val();
                                        if (value != "") {
                                            $('#servicesIds').val(value + id + ",");
                                        } else {
                                            $('#servicesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }

                                        // add service to session


                                    } else {
                                        var value = $('#packagesIds').val();
                                        if (value != "") {
                                            $('#packagesIds').val(value + id + ",");
                                        } else {
                                            $('#packagesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }
                                    }
                                    //calc total price 

                                    var totalPrice = parseInt($('.contenuBook .totalPrice').html());
                                    if (!totalPrice) {
                                        totalPrice = 0;
                                    }
                                    console.log(totalPrice);
                                    $('.service-in-list.added').each(function () {
                                        var price = $(this).data('totalprice');
                                        totalPrice += parseFloat(price, 10);

                                    });

                                    $('.totalPrice').html(totalPrice);
                                    var service_type = $(this).attr('service_type');
                                    $('#serviceType').val(service_type);
                                    $(".minimumChargeAmount").val($(".minimumcharge").val());
                                    var date = $('#checkin-date').val();
                                    var serviceType = $('#serviceType').val();
                                    var servicesIds = $('#servicesIds').val();
                                    var packagesIds = $('#packagesIds').val();
                                    var services_check = $('#services_check').val();
                                    var minimumChargeAmount = $('.minimumChargeAmount').val();

                                    addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);



                                } else {
                                    var choosenItem = $(this);
                                    // show daialog
                                    ConfirmAnotherSalonDialog('You Choosed services from another Salon Do you want to clear your Cart and add This new service', 'Cart alert', choosenItem);



                                }


                            } else {
                                $('#element_to_pop_up').show();
                                $('#element_to_pop_up').html('<p style="color:#f00; padding:20px;">' + $('#service_found').val() + '</p>');
                                $('#element_to_pop_up').bPopup();
                                return false;
                            }




                        });

                        $(window).load(function () {
                            var cartLenghth = $('.cart .mCSB_container').children().length;
                            // alert(cartLenghth);
                            if (cartLenghth == 0) {
                                $('.contenuBook').hide();
                            } else {
                                $('.contenuBook').show();
                            }
                        });


                        // remove service from cart
                        $('.cart').on('click', ".remove-serv", function (e) {
                            e.preventDefault();

                            var
                                    id = $(this).attr('rel') + ",",
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('relll'),
                                    cate = '#' + $(this).parents('.service-in-list').attr('data-category'),
                                    services_check = $('#services_check').val();

                            if (type == "service") {
                                var value = $('#servicesIds').val();
                            } else {
                                var value = $('#packagesIds').val();
                            }



                            $(this).parents('.service-in-list').fadeOut(500).removeClass('added').addClass('returned').clone().prependTo(cate).addClass('back customStyle').removeClass('returned').find('.remove-serv').remove();
                            setTimeout(function () {
                                $('.returned').remove();
                                $('.bookService').removeClass('hidden');

                                var numServices = $('.cart .mCSB_container').children().length;
                                $('.cart-switcher .num').html(numServices);

                                $('.back').removeClass('back');


                                var totalPrice = $('.totalPrice').text();
                                console.log(totalPrice);
                                $('.service-in-list.returned').each(function () {
                                    var price = $(this).data('totalprice');
                                    totalPrice -= parseFloat(price, 10);

                                });

                                $('.totalPrice').text(totalPrice);




                                // var mystring = value.replace(id, '');
                                // if (type == "service") {
                                //     $('#servicesIds').val(mystring);
                                // } else {
                                //     $('#packagesIds').val(mystring);
                                // }

                                // var mystring2 = services_check.replace(services_check_value, '');
                                // if (type == "service") {
                                //     $('#services_check').val(mystring2);
                                // } else {
                                //     $('#services_check').val(mystring2);
                                // }


                                var date = $('#checkin-date').val();
                                var salon_id = $('.cart_salon_id').val();
                                var serviceType = $('#serviceType').val();
                                var servicesIds = $('#servicesIds').val();
                                var packagesIds = $('#packagesIds').val();
                                var services_check = $('#services_check').val();
                                var minimumChargeAmount = $('.minimumChargeAmount').val();
                                var numServices = parseInt($('.cart-switcher .num').html());

                                addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);


                                if ($('.cart .mCSB_container').children().length == 0) {

                                    // init to delete from the session omly the servie if it is equal to zero will kill the sessision

                                    emptyTheCart();
                                    $('.no-services').show();

                                    $('.cart-wrapper').removeClass('opened');
                                    $('.no-services').removeClass('hide');
                                    // $('.no-services').addClass('show');
                                    $('.contenuBook').hide();
                                    $('.emptyTheCart').hide();
                                }
                                ;

                            }, 500);


                            // var drop = $('#dropHere').attr('rel');
                            // $(".pagges-salon .services-cart-page .service-in-list").draggable({
                            //     appendTo: ".pagges-salon .services-cart-page .salon-services-wrapper",
                            //     cursor: "move",
                            //     helper: 'clone',
                            //     revert: "invalid",
                            //     // delay: 300,
                            //     cursorAt: {
                            //         left: 5
                            //     },
                            //     start: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").addClass('droppping').append($('<p class="droppppp"><span>' + drop + '</span></p>'));
                            //         $('.pagges-salon .services-cart-page .no-services').hide();
                            //         $('.cart-wrapper').addClass('opened');


                            //     },
                            //     stop: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").removeClass('droppping').find('.droppppp').remove();
                            //         $(".pagges-salon .services-cart-page .no-services").show();
                            //         $('.cart-wrapper').removeClass('opened');
                            //     }
                            // });
                        });
                        //------------------------------

                        var multiFilter = {
                            // Declare any variables we will need as properties of the object

                            $filterGroups: null,
                            $filterUi: null,
                            $reset: null,
                            groups: [],
                            outputArray: [],
                            outputString: '',
                            // The "init" method will run on document ready and cache any jQuery objects we will need.

                            init: function () {
                                var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.

                                self.$filterUi = $('.custom-filter');
                                self.$filterGroups = $('.filter-group');
                                self.$reset = $('#Reset');
                                self.$container = $('.salons-filter');

                                self.$filterGroups.each(function () {
                                    self.groups.push({
                                        $inputs: $(this).find('input'),
                                        active: [],
                                        tracker: false
                                    });
                                });

                                self.bindHandlers();
                            },
                            // The "bindHandlers" method will listen for whenever a form value changes. 

                            bindHandlers: function () {
                                var self = this,
                                        typingDelay = 300,
                                        typingTimeout = -1,
                                        resetTimer = function () {
                                            clearTimeout(typingTimeout);

                                            typingTimeout = setTimeout(function () {
                                                self.parseFilters();
                                            }, typingDelay);
                                        };

                                self.$filterGroups
                                        .filter('.checkboxes')
                                        .on('click', function () {
                                            self.parseFilters();
                                        });

                                self.$filterGroups
                                        .filter('.search')
                                        .on('keyup change', resetTimer);

                                self.$reset.on('click', function (e) {
                                    e.preventDefault();
                                    self.$filterUi[0].reset();
                                    self.$filterUi.find('input[type="text"]').val('');
                                    self.parseFilters();
                                });
                            },
                            // The parseFilters method checks which filters are active in each group:

                            parseFilters: function () {
                                var self = this;

                                // loop through each filter group and add active filters to arrays

                                for (var i = 0, group; group = self.groups[i]; i++) {
                                    group.active = []; // reset arrays
                                    group.$inputs.each(function () {
                                        var searchTerm = '',
                                                $input = $(this),
                                                ttt = $input.data('filter'),
                                                minimumLength = 3;

                                        if ($input.is(':checked')) {
                                            group.active.push(ttt);
                                        }

                                        if ($input.is('[type="text"]') && this.value.length >= minimumLength) {
                                            searchTerm = this.value
                                                    .trim()
                                                    .toLowerCase()
                                                    .replace(' ', '-');

                                            group.active[0] = '[class*="' + searchTerm + '"]';
                                        }
                                    });
                                    group.active.length && (group.tracker = 0);
                                }

                                // self.concatenate();
                            },
                            // The "concatenate" method will crawl through each group, concatenating filters as desired:

                        };

                        $(function () {
                            // Initialize multiFilter code
                            multiFilter.init();
                            // Instantiate MixItUp
                            $('.salons-filter').mixItUp({
                                controls: {
                                    toggleFilterButtons: true,
                                    toggleLogic: 'and'
                                },
                                animation: {
                                    easing: 'ease',
                                    effects: 'fade',
                                    duration: 0
                                }
                            });
                        });

                        var classes = [];
                        $(".multiSel").find("span").each(function (i) {
                            var curClass = $(this).attr("class");
                            if (jQuery.inArray(curClass, classes) > -1) {
                                $(this).remove();
                            }
                            classes[i] = curClass;
                        });

                        $("img.lazy").show().lazyload({
                            failure_limit: 10,
                            event: "scroll",
                            effect: "fadeIn"
                        });
                    }
                });
            });

            $('.get_more_filter').click(function () {
                $('.get_more_filter').hide();
                $("#scroll_neww").html("<br><div class='spiner ta-center'><i class='fa fa-spinner fa-spin fa-2x'></i></div>");
                var form = $(".filter_form");
                $.get(form.attr('action'), form.serialize(), function (data) {
                    // just try to see the outputs
                    if (data) {
                        $(".salons-filter").append(data);
                        $("#scroll_neww").html("");

                        var max = $('.max_filter').attr('max');
                        var current = $('.current_filter').val();
                        $('.current_filter').attr('max', max);
                        $('.current_filter').val(parseInt(current) + 1);
                        if (current < max) {
                            $('.get_more_filter').show();
                        }

                        var offer = $('#offerVal').attr('rel');
                        var packagess = $('#packageVal').attr('rel');
                        var forMaleVal = $('#forMaleVal').attr('rel');
                        var forFemaleVal = $('#forFemaleVal').attr('rel');

                        $('.mix').find('.has-offer-ribbon').remove();
                        $('.mix').find('.has-package-ribbon').remove();
                        $('.mix').find('.marker').remove();


                        $('.has-offer').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-offer-ribbon">' + offer + '</div>'));
                        });
                        $('.has-package').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-package-ribbon">' + packagess + '</div>'));
                        });

                        $('.forFemale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forFemaleVal + '</div>'));
                        });
                        $('.forMale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forMaleVal + '</div>'));
                        });

                        // add service to cart -----------------
                        $('.services').on('click', ".add-serv", function (e) {
                            e.preventDefault();


                            if (!$('.no-services').hasClass('hide')) {
                                $('#servicesIds').val('');
                                $('#packagesIds').val('');
                                $('#services_check').val('');

                            }

                            var id = $(this).attr('rel'),
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('services_check'),
                                    services_check = $('#services_check').val(),
                                    salon_id = $(this).attr('salon_id');
                            var service_type = $(this).attr('service_type');

                            var services_count = "yes";
                            // if (type == "service") {
                            //     var services_count = services_check.search(services_check_value);
                            //     if (services_count >= 0) {
                            //         services_count = "none";
                            //     }
                            // } else {
                            //     var splitter = services_check_value.split(',')
                            //     for (var ii = 0; ii < splitter.length; ii++) {
                            //         var splitter_count = services_check.search(splitter[ii]);
                            //         if (splitter[ii] != "" && splitter_count >= 0) {
                            //             services_count = "none";
                            //         }
                            //     }
                            // }

                            if (services_count != "none") {

                                // check if service or package from the same salon to add more services 

                                if (($('.cart_salon_id').val() == "" || $('.cart_salon_id').val() == salon_id) && ($('#serviceType').val() == "" || $('#serviceType').val() == service_type)) {
                                    var link = $('<a href="#" class="remove-serv" rel="' + id + '" rell="' + type + '" relll="' + services_check_value + '"><i class="fa fa-times"></i></a>'),
                                            dataCoverText = $('#add_suc').attr("rel"),
                                            cover = $('<div class="cover"><strong>' + dataCoverText + '</strong></div>');

                                    $('.no-services').hide();
                                    $('.no-services').addClass('hide');
                                    $('.contenuBook').show();
                                    $('.emptyTheCart').show();
                                    $('.cart-wrapper').addClass('opened');
                                    $('.cart_salon_id').val(salon_id);
                                    // alert("asdasddsa");


                                    $(this).parents('.service-in-list').prepend(cover).delay(1500).fadeOut(500).addClass('removed').clone().prependTo('.cart .mCSB_container').addClass('added').removeClass('removed').append(link).find('.cover').remove();
                                    setTimeout(function () {
                                        $('.removed').remove();

                                        $('.services-list').each(function () {
                                            if ($(this).children().length == 0) {
                                                $(this).next('.noserv').show();
                                            }
                                        });
                                    }, 2000);
                                    var numServices = $('.cart .mCSB_container').children(".service-in-list").length;
                                    // alert(numServices);
                                    $('.cart-switcher .num').html(numServices);



                                    if (type == "service") {
                                        var value = $('#servicesIds').val();
                                        if (value != "") {
                                            $('#servicesIds').val(value + id + ",");
                                        } else {
                                            $('#servicesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }

                                        // add service to session


                                    } else {
                                        var value = $('#packagesIds').val();
                                        if (value != "") {
                                            $('#packagesIds').val(value + id + ",");
                                        } else {
                                            $('#packagesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }
                                    }
                                    //calc total price 

                                    var totalPrice = parseInt($('.contenuBook .totalPrice').html());
                                    if (!totalPrice) {
                                        totalPrice = 0;
                                    }
                                    console.log(totalPrice);
                                    $('.service-in-list.added').each(function () {
                                        var price = $(this).data('totalprice');
                                        totalPrice += parseFloat(price, 10);

                                    });

                                    $('.totalPrice').html(totalPrice);
                                    var service_type = $(this).attr('service_type');

                                    $('#serviceType').val(service_type);
                                    $(".minimumChargeAmount").val($(".minimumcharge").val());
                                    var date = $('#checkin-date').val();
                                    var serviceType = $('#serviceType').val();
                                    var servicesIds = $('#servicesIds').val();
                                    var packagesIds = $('#packagesIds').val();
                                    var services_check = $('#services_check').val();
                                    var minimumChargeAmount = $('.minimumChargeAmount').val();

                                    addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);



                                } else {
                                    var choosenItem = $(this);
                                    // show daialog
                                    ConfirmAnotherSalonDialog('You Choosed services from another Salon Do you want to clear your Cart and add This new service', 'Cart alert', choosenItem);



                                }


                            } else {
                                $('#element_to_pop_up').show();
                                $('#element_to_pop_up').html('<p style="color:#f00; padding:20px;">' + $('#service_found').val() + '</p>');
                                $('#element_to_pop_up').bPopup();
                                return false;
                            }




                        });

                        $(window).load(function () {
                            var cartLenghth = $('.cart .mCSB_container').children().length;
                            // alert(cartLenghth);
                            if (cartLenghth == 0) {
                                $('.contenuBook').hide();
                            } else {
                                $('.contenuBook').show();
                            }
                        });


                        // remove service from cart
                        $('.cart').on('click', ".remove-serv", function (e) {
                            e.preventDefault();

                            var
                                    id = $(this).attr('rel') + ",",
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('relll'),
                                    cate = '#' + $(this).parents('.service-in-list').attr('data-category'),
                                    services_check = $('#services_check').val();

                            if (type == "service") {
                                var value = $('#servicesIds').val();
                            } else {
                                var value = $('#packagesIds').val();
                            }



                            $(this).parents('.service-in-list').fadeOut(500).removeClass('added').addClass('returned').clone().prependTo(cate).addClass('back customStyle').removeClass('returned').find('.remove-serv').remove();
                            setTimeout(function () {
                                $('.returned').remove();
                                $('.bookService').removeClass('hidden');

                                var numServices = $('.cart .mCSB_container').children().length;
                                $('.cart-switcher .num').html(numServices);

                                $('.back').removeClass('back');


                                var totalPrice = $('.totalPrice').text();
                                console.log(totalPrice);
                                $('.service-in-list.returned').each(function () {
                                    var price = $(this).data('totalprice');
                                    totalPrice -= parseFloat(price, 10);

                                });

                                $('.totalPrice').text(totalPrice);




                                // var mystring = value.replace(id, '');
                                // if (type == "service") {
                                //     $('#servicesIds').val(mystring);
                                // } else {
                                //     $('#packagesIds').val(mystring);
                                // }

                                // var mystring2 = services_check.replace(services_check_value, '');
                                // if (type == "service") {
                                //     $('#services_check').val(mystring2);
                                // } else {
                                //     $('#services_check').val(mystring2);
                                // }


                                var date = $('#checkin-date').val();
                                var salon_id = $('.cart_salon_id').val();
                                var serviceType = $('#serviceType').val();
                                var servicesIds = $('#servicesIds').val();
                                var packagesIds = $('#packagesIds').val();
                                var services_check = $('#services_check').val();
                                var minimumChargeAmount = $('.minimumChargeAmount').val();
                                var numServices = parseInt($('.cart-switcher .num').html());

                                addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);


                                if ($('.cart .mCSB_container').children().length == 0) {

                                    // init to delete from the session omly the servie if it is equal to zero will kill the sessision

                                    emptyTheCart();
                                    $('.no-services').show();

                                    $('.cart-wrapper').removeClass('opened');
                                    $('.no-services').removeClass('hide');
                                    // $('.no-services').addClass('show');
                                    $('.contenuBook').hide();
                                    $('.emptyTheCart').hide();
                                }
                                ;

                            }, 500);


                            // var drop = $('#dropHere').attr('rel');
                            // $(".pagges-salon .services-cart-page .service-in-list").draggable({
                            //     appendTo: ".pagges-salon .services-cart-page .salon-services-wrapper",
                            //     cursor: "move",
                            //     helper: 'clone',
                            //     revert: "invalid",
                            //     // delay: 300,
                            //     cursorAt: {
                            //         left: 5
                            //     },
                            //     start: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").addClass('droppping').append($('<p class="droppppp"><span>' + drop + '</span></p>'));
                            //         $('.pagges-salon .services-cart-page .no-services').hide();
                            //         $('.cart-wrapper').addClass('opened');


                            //     },
                            //     stop: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").removeClass('droppping').find('.droppppp').remove();
                            //         $(".pagges-salon .services-cart-page .no-services").show();
                            //         $('.cart-wrapper').removeClass('opened');
                            //     }
                            // });
                        });
                        //------------------------------

                        var multiFilter = {
                            // Declare any variables we will need as properties of the object

                            $filterGroups: null,
                            $filterUi: null,
                            $reset: null,
                            groups: [],
                            outputArray: [],
                            outputString: '',
                            // The "init" method will run on document ready and cache any jQuery objects we will need.

                            init: function () {
                                var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.

                                self.$filterUi = $('.custom-filter');
                                self.$filterGroups = $('.filter-group');
                                self.$reset = $('#Reset');
                                self.$container = $('.salons-filter');

                                self.$filterGroups.each(function () {
                                    self.groups.push({
                                        $inputs: $(this).find('input'),
                                        active: [],
                                        tracker: false
                                    });
                                });

                                self.bindHandlers();
                            },
                            // The "bindHandlers" method will listen for whenever a form value changes. 

                            bindHandlers: function () {
                                var self = this,
                                        typingDelay = 300,
                                        typingTimeout = -1,
                                        resetTimer = function () {
                                            clearTimeout(typingTimeout);

                                            typingTimeout = setTimeout(function () {
                                                self.parseFilters();
                                            }, typingDelay);
                                        };

                                self.$filterGroups
                                        .filter('.checkboxes')
                                        .on('click', function () {
                                            self.parseFilters();
                                        });

                                self.$filterGroups
                                        .filter('.search')
                                        .on('keyup change', resetTimer);

                                self.$reset.on('click', function (e) {
                                    e.preventDefault();
                                    self.$filterUi[0].reset();
                                    self.$filterUi.find('input[type="text"]').val('');
                                    self.parseFilters();
                                });
                            },
                            // The parseFilters method checks which filters are active in each group:

                            parseFilters: function () {
                                var self = this;

                                // loop through each filter group and add active filters to arrays

                                for (var i = 0, group; group = self.groups[i]; i++) {
                                    group.active = []; // reset arrays
                                    group.$inputs.each(function () {
                                        var searchTerm = '',
                                                $input = $(this),
                                                ttt = $input.data('filter'),
                                                minimumLength = 3;

                                        if ($input.is(':checked')) {
                                            group.active.push(ttt);
                                        }

                                        if ($input.is('[type="text"]') && this.value.length >= minimumLength) {
                                            searchTerm = this.value
                                                    .trim()
                                                    .toLowerCase()
                                                    .replace(' ', '-');

                                            group.active[0] = '[class*="' + searchTerm + '"]';
                                        }
                                    });
                                    group.active.length && (group.tracker = 0);
                                }

                                // self.concatenate();
                            },
                            // The "concatenate" method will crawl through each group, concatenating filters as desired:

                        };

                        $(function () {
                            // Initialize multiFilter code
                            multiFilter.init();
                            // Instantiate MixItUp
                            $('.salons-filter').mixItUp({
                                controls: {
                                    toggleFilterButtons: true,
                                    toggleLogic: 'and'
                                },
                                animation: {
                                    easing: 'ease',
                                    effects: 'fade',
                                    duration: 0
                                }
                            });
                        });

                        var classes = [];
                        $(".multiSel").find("span").each(function (i) {
                            var curClass = $(this).attr("class");
                            if (jQuery.inArray(curClass, classes) > -1) {
                                $(this).remove();
                            }
                            classes[i] = curClass;
                        });

                        $("img.lazy").show().lazyload({
                            failure_limit: 10,
                            event: "scroll",
                            effect: "fadeIn"
                        });
                    }
                });
            });
        });

    }

    // salons from category
    // all salons page
    if (current_url.indexOf("category") > -1) {

        $(window).load(function () {
            $('.get_more_filter').hide();

            $('.get_more').click(function () {
                var current = parseInt($(this).attr('current')) + 1;
                var link = $(this).attr('link');
                link = link + "?page=" + current;
                var max = $(this).attr('max');
                $(this).hide();
                $("#scroll_neww").html("<br><div class='spiner ta-center'><i class='fa fa-spinner fa-spin fa-2x'></i></div>");
                $.ajax({
                    type: "GET",
                    url: link,
                    success: function (datas) {
                        $(".salons-filter").append(datas);
                        $("#scroll_neww").html("");
                        if (current < max) {
                            $('.get_more').show();
                            $('.get_more').attr('current', current);
                        }
                        var offer = $('#offerVal').attr('rel');
                        var packagess = $('#packageVal').attr('rel');
                        var forMaleVal = $('#forMaleVal').attr('rel');
                        var forFemaleVal = $('#forFemaleVal').attr('rel');

                        $('.mix').find('.has-offer-ribbon').remove();
                        $('.mix').find('.has-package-ribbon').remove();
                        $('.mix').find('.marker').remove();


                        $('.has-offer').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-offer-ribbon">' + offer + '</div>'));
                        });
                        $('.has-package').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-package-ribbon">' + packagess + '</div>'));
                        });

                        $('.forFemale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forFemaleVal + '</div>'));
                        });
                        $('.forMale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forMaleVal + '</div>'));
                        });

                        // add service to cart -----------------
                        $('.services').on('click', ".add-serv", function (e) {
                            e.preventDefault();


                            if (!$('.no-services').hasClass('hide')) {
                                $('#servicesIds').val('');
                                $('#packagesIds').val('');
                                $('#services_check').val('');

                            }

                            var id = $(this).attr('rel'),
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('services_check'),
                                    services_check = $('#services_check').val(),
                                    salon_id = $(this).attr('salon_id');
                            var service_type = $(this).attr('service_type');
                            var services_count = "yes";
                            // if (type == "service") {
                            //     var services_count = services_check.search(services_check_value);
                            //     if (services_count >= 0) {
                            //         services_count = "none";
                            //     }
                            // } else {
                            //     var splitter = services_check_value.split(',')
                            //     for (var ii = 0; ii < splitter.length; ii++) {
                            //         var splitter_count = services_check.search(splitter[ii]);
                            //         if (splitter[ii] != "" && splitter_count >= 0) {
                            //             services_count = "none";
                            //         }
                            //     }
                            // }

                            if (services_count != "none") {

                                // check if service or package from the same salon to add more services 

                                if (($('.cart_salon_id').val() == "" || $('.cart_salon_id').val() == salon_id) && ($('#serviceType').val() == "" || $('#serviceType').val() == service_type)) {
                                    var link = $('<a href="#" class="remove-serv" rel="' + id + '" rell="' + type + '" relll="' + services_check_value + '"><i class="fa fa-times"></i></a>'),
                                            dataCoverText = $('#add_suc').attr("rel"),
                                            cover = $('<div class="cover"><strong>' + dataCoverText + '</strong></div>');

                                    $('.no-services').hide();
                                    $('.no-services').addClass('hide');
                                    $('.contenuBook').show();
                                    $('.emptyTheCart').show();
                                    $('.cart-wrapper').addClass('opened');
                                    $('.cart_salon_id').val(salon_id);
                                    // alert("asdasddsa");


                                    $(this).parents('.service-in-list').prepend(cover).delay(1500).fadeOut(500).addClass('removed').clone().prependTo('.cart .mCSB_container').addClass('added').removeClass('removed').append(link).find('.cover').remove();
                                    setTimeout(function () {
                                        $('.removed').remove();

                                        $('.services-list').each(function () {
                                            if ($(this).children().length == 0) {
                                                $(this).next('.noserv').show();
                                            }
                                        });
                                    }, 2000);
                                    var numServices = $('.cart .mCSB_container').children(".service-in-list").length;
                                    // alert(numServices);
                                    $('.cart-switcher .num').html(numServices);



                                    if (type == "service") {
                                        var value = $('#servicesIds').val();
                                        if (value != "") {
                                            $('#servicesIds').val(value + id + ",");
                                        } else {
                                            $('#servicesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }

                                        // add service to session


                                    } else {
                                        var value = $('#packagesIds').val();
                                        if (value != "") {
                                            $('#packagesIds').val(value + id + ",");
                                        } else {
                                            $('#packagesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }
                                    }
                                    //calc total price 

                                    var totalPrice = parseInt($('.contenuBook .totalPrice').html());
                                    if (!totalPrice) {
                                        totalPrice = 0;
                                    }
                                    console.log(totalPrice);
                                    $('.service-in-list.added').each(function () {
                                        var price = $(this).data('totalprice');
                                        totalPrice += parseFloat(price, 10);

                                    });

                                    $('.totalPrice').html(totalPrice);
                                    var service_type = $(this).attr('service_type');

                                    $('#serviceType').val(service_type);
                                    $(".minimumChargeAmount").val($(".minimumcharge").val());
                                    var date = $('#checkin-date').val();
                                    var serviceType = $('#serviceType').val();
                                    var servicesIds = $('#servicesIds').val();
                                    var packagesIds = $('#packagesIds').val();
                                    var services_check = $('#services_check').val();
                                    var minimumChargeAmount = $('.minimumChargeAmount').val();

                                    addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);



                                } else {
                                    var choosenItem = $(this);
                                    // show daialog
                                    ConfirmAnotherSalonDialog('You Choosed services from another Salon Do you want to clear your Cart and add This new service', 'Cart alert', choosenItem);



                                }


                            } else {
                                $('#element_to_pop_up').show();
                                $('#element_to_pop_up').html('<p style="color:#f00; padding:20px;">' + $('#service_found').val() + '</p>');
                                $('#element_to_pop_up').bPopup();
                                return false;
                            }




                        });

                        $(window).load(function () {
                            var cartLenghth = $('.cart .mCSB_container').children().length;
                            // alert(cartLenghth);
                            if (cartLenghth == 0) {
                                $('.contenuBook').hide();
                            } else {
                                $('.contenuBook').show();
                            }
                        });


                        // remove service from cart
                        $('.cart').on('click', ".remove-serv", function (e) {
                            e.preventDefault();

                            var
                                    id = $(this).attr('rel') + ",",
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('relll'),
                                    cate = '#' + $(this).parents('.service-in-list').attr('data-category'),
                                    services_check = $('#services_check').val();

                            if (type == "service") {
                                var value = $('#servicesIds').val();
                            } else {
                                var value = $('#packagesIds').val();
                            }



                            $(this).parents('.service-in-list').fadeOut(500).removeClass('added').addClass('returned').clone().prependTo(cate).addClass('back customStyle').removeClass('returned').find('.remove-serv').remove();
                            setTimeout(function () {
                                $('.returned').remove();
                                $('.bookService').removeClass('hidden');

                                var numServices = $('.cart .mCSB_container').children().length;
                                $('.cart-switcher .num').html(numServices);

                                $('.back').removeClass('back');


                                var totalPrice = $('.totalPrice').text();
                                console.log(totalPrice);
                                $('.service-in-list.returned').each(function () {
                                    var price = $(this).data('totalprice');
                                    totalPrice -= parseFloat(price, 10);

                                });

                                $('.totalPrice').text(totalPrice);




                                // var mystring = value.replace(id, '');
                                // if (type == "service") {
                                //     $('#servicesIds').val(mystring);
                                // } else {
                                //     $('#packagesIds').val(mystring);
                                // }

                                // var mystring2 = services_check.replace(services_check_value, '');
                                // if (type == "service") {
                                //     $('#services_check').val(mystring2);
                                // } else {
                                //     $('#services_check').val(mystring2);
                                // }


                                var date = $('#checkin-date').val();
                                var salon_id = $('.cart_salon_id').val();
                                var serviceType = $('#serviceType').val();
                                var servicesIds = $('#servicesIds').val();
                                var packagesIds = $('#packagesIds').val();
                                var services_check = $('#services_check').val();
                                var minimumChargeAmount = $('.minimumChargeAmount').val();
                                var numServices = parseInt($('.cart-switcher .num').html());

                                addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);


                                if ($('.cart .mCSB_container').children().length == 0) {

                                    // init to delete from the session omly the servie if it is equal to zero will kill the sessision

                                    emptyTheCart();
                                    $('.no-services').show();

                                    $('.cart-wrapper').removeClass('opened');
                                    $('.no-services').removeClass('hide');
                                    // $('.no-services').addClass('show');
                                    $('.contenuBook').hide();
                                    $('.emptyTheCart').hide();
                                }
                                ;

                            }, 500);


                            // var drop = $('#dropHere').attr('rel');
                            // $(".pagges-salon .services-cart-page .service-in-list").draggable({
                            //     appendTo: ".pagges-salon .services-cart-page .salon-services-wrapper",
                            //     cursor: "move",
                            //     helper: 'clone',
                            //     revert: "invalid",
                            //     // delay: 300,
                            //     cursorAt: {
                            //         left: 5
                            //     },
                            //     start: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").addClass('droppping').append($('<p class="droppppp"><span>' + drop + '</span></p>'));
                            //         $('.pagges-salon .services-cart-page .no-services').hide();
                            //         $('.cart-wrapper').addClass('opened');


                            //     },
                            //     stop: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").removeClass('droppping').find('.droppppp').remove();
                            //         $(".pagges-salon .services-cart-page .no-services").show();
                            //         $('.cart-wrapper').removeClass('opened');
                            //     }
                            // });
                        });
                        //------------------------------

                        var multiFilter = {
                            // Declare any variables we will need as properties of the object

                            $filterGroups: null,
                            $filterUi: null,
                            $reset: null,
                            groups: [],
                            outputArray: [],
                            outputString: '',
                            // The "init" method will run on document ready and cache any jQuery objects we will need.

                            init: function () {
                                var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.

                                self.$filterUi = $('.custom-filter');
                                self.$filterGroups = $('.filter-group');
                                self.$reset = $('#Reset');
                                self.$container = $('.salons-filter');

                                self.$filterGroups.each(function () {
                                    self.groups.push({
                                        $inputs: $(this).find('input'),
                                        active: [],
                                        tracker: false
                                    });
                                });

                                self.bindHandlers();
                            },
                            // The "bindHandlers" method will listen for whenever a form value changes. 

                            bindHandlers: function () {
                                var self = this,
                                        typingDelay = 300,
                                        typingTimeout = -1,
                                        resetTimer = function () {
                                            clearTimeout(typingTimeout);

                                            typingTimeout = setTimeout(function () {
                                                self.parseFilters();
                                            }, typingDelay);
                                        };

                                self.$filterGroups
                                        .filter('.checkboxes')
                                        .on('click', function () {
                                            self.parseFilters();
                                        });

                                self.$filterGroups
                                        .filter('.search')
                                        .on('keyup change', resetTimer);

                                self.$reset.on('click', function (e) {
                                    e.preventDefault();
                                    self.$filterUi[0].reset();
                                    self.$filterUi.find('input[type="text"]').val('');
                                    self.parseFilters();
                                });
                            },
                            // The parseFilters method checks which filters are active in each group:

                            parseFilters: function () {
                                var self = this;

                                // loop through each filter group and add active filters to arrays

                                for (var i = 0, group; group = self.groups[i]; i++) {
                                    group.active = []; // reset arrays
                                    group.$inputs.each(function () {
                                        var searchTerm = '',
                                                $input = $(this),
                                                ttt = $input.data('filter'),
                                                minimumLength = 3;

                                        if ($input.is(':checked')) {
                                            group.active.push(ttt);
                                        }

                                        if ($input.is('[type="text"]') && this.value.length >= minimumLength) {
                                            searchTerm = this.value
                                                    .trim()
                                                    .toLowerCase()
                                                    .replace(' ', '-');

                                            group.active[0] = '[class*="' + searchTerm + '"]';
                                        }
                                    });
                                    group.active.length && (group.tracker = 0);
                                }

                                // self.concatenate();
                            },
                            // The "concatenate" method will crawl through each group, concatenating filters as desired:

                        };

                        $(function () {
                            // Initialize multiFilter code
                            multiFilter.init();
                            // Instantiate MixItUp
                            $('.salons-filter').mixItUp({
                                controls: {
                                    toggleFilterButtons: true,
                                    toggleLogic: 'and'
                                },
                                animation: {
                                    easing: 'ease',
                                    effects: 'fade',
                                    duration: 0
                                }
                            });
                        });

                        var classes = [];
                        $(".multiSel").find("span").each(function (i) {
                            var curClass = $(this).attr("class");
                            if (jQuery.inArray(curClass, classes) > -1) {
                                $(this).remove();
                            }
                            classes[i] = curClass;
                        });

                        $("img.lazy").show().lazyload({
                            failure_limit: 10,
                            event: "scroll",
                            effect: "fadeIn"
                        });
                    }
                });
            });

            $('.apply_filter').click(function () {
                $('.current_filter').val(1);
                $(".salons-filter").html('');
                $('.get_more').hide();
                $('.get_more_filter').hide();
                $("#scroll_neww").html("<br><div class='spiner ta-center'><i class='fa fa-spinner fa-spin fa-2x'></i></div>");
                var form = $(".filter_form");
                $.get(form.attr('action'), form.serialize(), function (data) {
                    // just try to see the outputs
                    if (data) {
                        $(".salons-filter").append(data);
                        $("#scroll_neww").html("");

                        var max = $('.max_filter').attr('max');
                        var current = $('.current_filter').val();
                        $('.current_filter').attr('max', max);
                        $('.current_filter').val(parseInt(current) + 1);
                        if (current < max) {
                            $('.get_more_filter').show();
                        }

                        var offer = $('#offerVal').attr('rel');
                        var packagess = $('#packageVal').attr('rel');
                        var forMaleVal = $('#forMaleVal').attr('rel');
                        var forFemaleVal = $('#forFemaleVal').attr('rel');

                        $('.mix').find('.has-offer-ribbon').remove();
                        $('.mix').find('.has-package-ribbon').remove();
                        $('.mix').find('.marker').remove();


                        $('.has-offer').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-offer-ribbon">' + offer + '</div>'));
                        });
                        $('.has-package').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-package-ribbon">' + packagess + '</div>'));
                        });

                        $('.forFemale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forFemaleVal + '</div>'));
                        });
                        $('.forMale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forMaleVal + '</div>'));
                        });

                        // add service to cart -----------------
                        $('.services').on('click', ".add-serv", function (e) {
                            e.preventDefault();


                            if (!$('.no-services').hasClass('hide')) {
                                $('#servicesIds').val('');
                                $('#packagesIds').val('');
                                $('#services_check').val('');

                            }

                            var id = $(this).attr('rel'),
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('services_check'),
                                    services_check = $('#services_check').val(),
                                    salon_id = $(this).attr('salon_id');
                            var service_type = $(this).attr('service_type');
                            var services_count = "yes";
                            // if (type == "service") {
                            //     var services_count = services_check.search(services_check_value);
                            //     if (services_count >= 0) {
                            //         services_count = "none";
                            //     }
                            // } else {
                            //     var splitter = services_check_value.split(',')
                            //     for (var ii = 0; ii < splitter.length; ii++) {
                            //         var splitter_count = services_check.search(splitter[ii]);
                            //         if (splitter[ii] != "" && splitter_count >= 0) {
                            //             services_count = "none";
                            //         }
                            //     }
                            // }

                            if (services_count != "none") {

                                // check if service or package from the same salon to add more services 

                                if (($('.cart_salon_id').val() == "" || $('.cart_salon_id').val() == salon_id) && ($('#serviceType').val() == "" || $('#serviceType').val() == service_type)) {
                                    var link = $('<a href="#" class="remove-serv" rel="' + id + '" rell="' + type + '" relll="' + services_check_value + '"><i class="fa fa-times"></i></a>'),
                                            dataCoverText = $('#add_suc').attr("rel"),
                                            cover = $('<div class="cover"><strong>' + dataCoverText + '</strong></div>');

                                    $('.no-services').hide();
                                    $('.no-services').addClass('hide');
                                    $('.contenuBook').show();
                                    $('.emptyTheCart').show();
                                    $('.cart-wrapper').addClass('opened');
                                    $('.cart_salon_id').val(salon_id);
                                    // alert("asdasddsa");


                                    $(this).parents('.service-in-list').prepend(cover).delay(1500).fadeOut(500).addClass('removed').clone().prependTo('.cart .mCSB_container').addClass('added').removeClass('removed').append(link).find('.cover').remove();
                                    setTimeout(function () {
                                        $('.removed').remove();

                                        $('.services-list').each(function () {
                                            if ($(this).children().length == 0) {
                                                $(this).next('.noserv').show();
                                            }
                                        });
                                    }, 2000);
                                    var numServices = $('.cart .mCSB_container').children(".service-in-list").length;
                                    // alert(numServices);
                                    $('.cart-switcher .num').html(numServices);



                                    if (type == "service") {
                                        var value = $('#servicesIds').val();
                                        if (value != "") {
                                            $('#servicesIds').val(value + id + ",");
                                        } else {
                                            $('#servicesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }

                                        // add service to session


                                    } else {
                                        var value = $('#packagesIds').val();
                                        if (value != "") {
                                            $('#packagesIds').val(value + id + ",");
                                        } else {
                                            $('#packagesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }
                                    }
                                    //calc total price 

                                    var totalPrice = parseInt($('.contenuBook .totalPrice').html());
                                    if (!totalPrice) {
                                        totalPrice = 0;
                                    }
                                    console.log(totalPrice);
                                    $('.service-in-list.added').each(function () {
                                        var price = $(this).data('totalprice');
                                        totalPrice += parseFloat(price, 10);

                                    });

                                    $('.totalPrice').html(totalPrice);
                                    var service_type = $(this).attr('service_type');

                                    $('#serviceType').val(service_type);
                                    $(".minimumChargeAmount").val($(".minimumcharge").val());
                                    var date = $('#checkin-date').val();
                                    var serviceType = $('#serviceType').val();
                                    var servicesIds = $('#servicesIds').val();
                                    var packagesIds = $('#packagesIds').val();
                                    var services_check = $('#services_check').val();
                                    var minimumChargeAmount = $('.minimumChargeAmount').val();

                                    addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);



                                } else {
                                    var choosenItem = $(this);
                                    // show daialog
                                    ConfirmAnotherSalonDialog('You Choosed services from another Salon Do you want to clear your Cart and add This new service', 'Cart alert', choosenItem);



                                }


                            } else {
                                $('#element_to_pop_up').show();
                                $('#element_to_pop_up').html('<p style="color:#f00; padding:20px;">' + $('#service_found').val() + '</p>');
                                $('#element_to_pop_up').bPopup();
                                return false;
                            }




                        });

                        $(window).load(function () {
                            var cartLenghth = $('.cart .mCSB_container').children().length;
                            // alert(cartLenghth);
                            if (cartLenghth == 0) {
                                $('.contenuBook').hide();
                            } else {
                                $('.contenuBook').show();
                            }
                        });


                        // remove service from cart
                        $('.cart').on('click', ".remove-serv", function (e) {
                            e.preventDefault();

                            var
                                    id = $(this).attr('rel') + ",",
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('relll'),
                                    cate = '#' + $(this).parents('.service-in-list').attr('data-category'),
                                    services_check = $('#services_check').val();

                            if (type == "service") {
                                var value = $('#servicesIds').val();
                            } else {
                                var value = $('#packagesIds').val();
                            }



                            $(this).parents('.service-in-list').fadeOut(500).removeClass('added').addClass('returned').clone().prependTo(cate).addClass('back customStyle').removeClass('returned').find('.remove-serv').remove();
                            setTimeout(function () {
                                $('.returned').remove();
                                $('.bookService').removeClass('hidden');

                                var numServices = $('.cart .mCSB_container').children().length;
                                $('.cart-switcher .num').html(numServices);

                                $('.back').removeClass('back');


                                var totalPrice = $('.totalPrice').text();
                                console.log(totalPrice);
                                $('.service-in-list.returned').each(function () {
                                    var price = $(this).data('totalprice');
                                    totalPrice -= parseFloat(price, 10);

                                });

                                $('.totalPrice').text(totalPrice);




                                // var mystring = value.replace(id, '');
                                // if (type == "service") {
                                //     $('#servicesIds').val(mystring);
                                // } else {
                                //     $('#packagesIds').val(mystring);
                                // }

                                // var mystring2 = services_check.replace(services_check_value, '');
                                // if (type == "service") {
                                //     $('#services_check').val(mystring2);
                                // } else {
                                //     $('#services_check').val(mystring2);
                                // }


                                var date = $('#checkin-date').val();
                                var salon_id = $('.cart_salon_id').val();
                                var serviceType = $('#serviceType').val();
                                var servicesIds = $('#servicesIds').val();
                                var packagesIds = $('#packagesIds').val();
                                var services_check = $('#services_check').val();
                                var minimumChargeAmount = $('.minimumChargeAmount').val();
                                var numServices = parseInt($('.cart-switcher .num').html());

                                addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);


                                if ($('.cart .mCSB_container').children().length == 0) {

                                    // init to delete from the session omly the servie if it is equal to zero will kill the sessision

                                    emptyTheCart();
                                    $('.no-services').show();

                                    $('.cart-wrapper').removeClass('opened');
                                    $('.no-services').removeClass('hide');
                                    // $('.no-services').addClass('show');
                                    $('.contenuBook').hide();
                                    $('.emptyTheCart').hide();
                                }
                                ;

                            }, 500);


                            // var drop = $('#dropHere').attr('rel');
                            // $(".pagges-salon .services-cart-page .service-in-list").draggable({
                            //     appendTo: ".pagges-salon .services-cart-page .salon-services-wrapper",
                            //     cursor: "move",
                            //     helper: 'clone',
                            //     revert: "invalid",
                            //     // delay: 300,
                            //     cursorAt: {
                            //         left: 5
                            //     },
                            //     start: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").addClass('droppping').append($('<p class="droppppp"><span>' + drop + '</span></p>'));
                            //         $('.pagges-salon .services-cart-page .no-services').hide();
                            //         $('.cart-wrapper').addClass('opened');


                            //     },
                            //     stop: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").removeClass('droppping').find('.droppppp').remove();
                            //         $(".pagges-salon .services-cart-page .no-services").show();
                            //         $('.cart-wrapper').removeClass('opened');
                            //     }
                            // });
                        });
                        //------------------------------

                        var multiFilter = {
                            // Declare any variables we will need as properties of the object

                            $filterGroups: null,
                            $filterUi: null,
                            $reset: null,
                            groups: [],
                            outputArray: [],
                            outputString: '',
                            // The "init" method will run on document ready and cache any jQuery objects we will need.

                            init: function () {
                                var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.

                                self.$filterUi = $('.custom-filter');
                                self.$filterGroups = $('.filter-group');
                                self.$reset = $('#Reset');
                                self.$container = $('.salons-filter');

                                self.$filterGroups.each(function () {
                                    self.groups.push({
                                        $inputs: $(this).find('input'),
                                        active: [],
                                        tracker: false
                                    });
                                });

                                self.bindHandlers();
                            },
                            // The "bindHandlers" method will listen for whenever a form value changes. 

                            bindHandlers: function () {
                                var self = this,
                                        typingDelay = 300,
                                        typingTimeout = -1,
                                        resetTimer = function () {
                                            clearTimeout(typingTimeout);

                                            typingTimeout = setTimeout(function () {
                                                self.parseFilters();
                                            }, typingDelay);
                                        };

                                self.$filterGroups
                                        .filter('.checkboxes')
                                        .on('click', function () {
                                            self.parseFilters();
                                        });

                                self.$filterGroups
                                        .filter('.search')
                                        .on('keyup change', resetTimer);

                                self.$reset.on('click', function (e) {
                                    e.preventDefault();
                                    self.$filterUi[0].reset();
                                    self.$filterUi.find('input[type="text"]').val('');
                                    self.parseFilters();
                                });
                            },
                            // The parseFilters method checks which filters are active in each group:

                            parseFilters: function () {
                                var self = this;

                                // loop through each filter group and add active filters to arrays

                                for (var i = 0, group; group = self.groups[i]; i++) {
                                    group.active = []; // reset arrays
                                    group.$inputs.each(function () {
                                        var searchTerm = '',
                                                $input = $(this),
                                                ttt = $input.data('filter'),
                                                minimumLength = 3;

                                        if ($input.is(':checked')) {
                                            group.active.push(ttt);
                                        }

                                        if ($input.is('[type="text"]') && this.value.length >= minimumLength) {
                                            searchTerm = this.value
                                                    .trim()
                                                    .toLowerCase()
                                                    .replace(' ', '-');

                                            group.active[0] = '[class*="' + searchTerm + '"]';
                                        }
                                    });
                                    group.active.length && (group.tracker = 0);
                                }

                                // self.concatenate();
                            },
                            // The "concatenate" method will crawl through each group, concatenating filters as desired:

                        };

                        $(function () {
                            // Initialize multiFilter code
                            multiFilter.init();
                            // Instantiate MixItUp
                            $('.salons-filter').mixItUp({
                                controls: {
                                    toggleFilterButtons: true,
                                    toggleLogic: 'and'
                                },
                                animation: {
                                    easing: 'ease',
                                    effects: 'fade',
                                    duration: 0
                                }
                            });
                        });

                        var classes = [];
                        $(".multiSel").find("span").each(function (i) {
                            var curClass = $(this).attr("class");
                            if (jQuery.inArray(curClass, classes) > -1) {
                                $(this).remove();
                            }
                            classes[i] = curClass;
                        });

                        $("img.lazy").show().lazyload({
                            failure_limit: 10,
                            event: "scroll",
                            effect: "fadeIn"
                        });
                    }
                });
            });

            $('.get_more_filter').click(function () {
                $('.get_more_filter').hide();
                $("#scroll_neww").html("<br><div class='spiner ta-center'><i class='fa fa-spinner fa-spin fa-2x'></i></div>");
                var form = $(".filter_form");
                $.get(form.attr('action'), form.serialize(), function (data) {
                    // just try to see the outputs
                    if (data) {
                        $(".salons-filter").append(data);
                        $("#scroll_neww").html("");

                        var max = $('.max_filter').attr('max');
                        var current = $('.current_filter').val();
                        $('.current_filter').attr('max', max);
                        $('.current_filter').val(parseInt(current) + 1);
                        if (current < max) {
                            $('.get_more_filter').show();
                        }

                        var offer = $('#offerVal').attr('rel');
                        var packagess = $('#packageVal').attr('rel');
                        var forMaleVal = $('#forMaleVal').attr('rel');
                        var forFemaleVal = $('#forFemaleVal').attr('rel');

                        $('.mix').find('.has-offer-ribbon').remove();
                        $('.mix').find('.has-package-ribbon').remove();
                        $('.mix').find('.marker').remove();


                        $('.has-offer').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-offer-ribbon">' + offer + '</div>'));
                        });
                        $('.has-package').each(function () {
                            $(this).find('.media-holder').append($('<div class="ribbon has-package-ribbon">' + packagess + '</div>'));
                        });

                        $('.forFemale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forFemaleVal + '</div>'));
                        });
                        $('.forMale').each(function () {
                            $(this).find('.over-contents .title').append($('<div class="marker">' + forMaleVal + '</div>'));
                        });

                        // add service to cart -----------------
                        $('.services').on('click', ".add-serv", function (e) {
                            e.preventDefault();


                            if (!$('.no-services').hasClass('hide')) {
                                $('#servicesIds').val('');
                                $('#packagesIds').val('');
                                $('#services_check').val('');

                            }

                            var id = $(this).attr('rel'),
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('services_check'),
                                    services_check = $('#services_check').val(),
                                    salon_id = $(this).attr('salon_id');
                            var service_type = $(this).attr('service_type');
                            var services_count = "yes";
                            // if (type == "service") {
                            //     var services_count = services_check.search(services_check_value);
                            //     if (services_count >= 0) {
                            //         services_count = "none";
                            //     }
                            // } else {
                            //     var splitter = services_check_value.split(',')
                            //     for (var ii = 0; ii < splitter.length; ii++) {
                            //         var splitter_count = services_check.search(splitter[ii]);
                            //         if (splitter[ii] != "" && splitter_count >= 0) {
                            //             services_count = "none";
                            //         }
                            //     }
                            // }

                            if (services_count != "none") {

                                // check if service or package from the same salon to add more services 

                                if (($('.cart_salon_id').val() == "" || $('.cart_salon_id').val() == salon_id) && ($('#serviceType').val() == "" || $('#serviceType').val() == service_type)) {
                                    var link = $('<a href="#" class="remove-serv" rel="' + id + '" rell="' + type + '" relll="' + services_check_value + '"><i class="fa fa-times"></i></a>'),
                                            dataCoverText = $('#add_suc').attr("rel"),
                                            cover = $('<div class="cover"><strong>' + dataCoverText + '</strong></div>');

                                    $('.no-services').hide();
                                    $('.no-services').addClass('hide');
                                    $('.contenuBook').show();
                                    $('.emptyTheCart').show();
                                    $('.cart-wrapper').addClass('opened');
                                    $('.cart_salon_id').val(salon_id);
                                    // alert("asdasddsa");


                                    $(this).parents('.service-in-list').prepend(cover).delay(1500).fadeOut(500).addClass('removed').clone().prependTo('.cart .mCSB_container').addClass('added').removeClass('removed').append(link).find('.cover').remove();
                                    setTimeout(function () {
                                        $('.removed').remove();

                                        $('.services-list').each(function () {
                                            if ($(this).children().length == 0) {
                                                $(this).next('.noserv').show();
                                            }
                                        });
                                    }, 2000);
                                    var numServices = $('.cart .mCSB_container').children(".service-in-list").length;
                                    // alert(numServices);
                                    $('.cart-switcher .num').html(numServices);



                                    if (type == "service") {
                                        var value = $('#servicesIds').val();
                                        if (value != "") {
                                            $('#servicesIds').val(value + id + ",");
                                        } else {
                                            $('#servicesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }

                                        // add service to session


                                    } else {
                                        var value = $('#packagesIds').val();
                                        if (value != "") {
                                            $('#packagesIds').val(value + id + ",");
                                        } else {
                                            $('#packagesIds').val(id + ",");
                                        }
                                        if (services_check != "") {
                                            $('#services_check').val(services_check_value + services_check);
                                        } else {
                                            $('#services_check').val(services_check_value);
                                        }
                                    }
                                    //calc total price 

                                    var totalPrice = parseInt($('.contenuBook .totalPrice').html());
                                    if (!totalPrice) {
                                        totalPrice = 0;
                                    }
                                    console.log(totalPrice);
                                    $('.service-in-list.added').each(function () {
                                        var price = $(this).data('totalprice');
                                        totalPrice += parseFloat(price, 10);

                                    });

                                    $('.totalPrice').html(totalPrice);
                                    var service_type = $(this).attr('service_type');
                                    $('#serviceType').val(service_type);
                                    $(".minimumChargeAmount").val($(".minimumcharge").val());
                                    var date = $('#checkin-date').val();
                                    var serviceType = $('#serviceType').val();
                                    var servicesIds = $('#servicesIds').val();
                                    var packagesIds = $('#packagesIds').val();
                                    var services_check = $('#services_check').val();
                                    var minimumChargeAmount = $('.minimumChargeAmount').val();

                                    addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);



                                } else {
                                    var choosenItem = $(this);
                                    // show daialog
                                    ConfirmAnotherSalonDialog('You Choosed services from another Salon Do you want to clear your Cart and add This new service', 'Cart alert', choosenItem);



                                }


                            } else {
                                $('#element_to_pop_up').show();
                                $('#element_to_pop_up').html('<p style="color:#f00; padding:20px;">' + $('#service_found').val() + '</p>');
                                $('#element_to_pop_up').bPopup();
                                return false;
                            }




                        });

                        $(window).load(function () {
                            var cartLenghth = $('.cart .mCSB_container').children().length;
                            // alert(cartLenghth);
                            if (cartLenghth == 0) {
                                $('.contenuBook').hide();
                            } else {
                                $('.contenuBook').show();
                            }
                        });


                        // remove service from cart
                        $('.cart').on('click', ".remove-serv", function (e) {
                            e.preventDefault();

                            var
                                    id = $(this).attr('rel') + ",",
                                    type = $(this).attr('rell'),
                                    services_check_value = $(this).attr('relll'),
                                    cate = '#' + $(this).parents('.service-in-list').attr('data-category'),
                                    services_check = $('#services_check').val();

                            if (type == "service") {
                                var value = $('#servicesIds').val();
                            } else {
                                var value = $('#packagesIds').val();
                            }



                            $(this).parents('.service-in-list').fadeOut(500).removeClass('added').addClass('returned').clone().prependTo(cate).addClass('back customStyle').removeClass('returned').find('.remove-serv').remove();
                            setTimeout(function () {
                                $('.returned').remove();
                                $('.bookService').removeClass('hidden');

                                var numServices = $('.cart .mCSB_container').children().length;
                                $('.cart-switcher .num').html(numServices);

                                $('.back').removeClass('back');


                                var totalPrice = $('.totalPrice').text();
                                console.log(totalPrice);
                                $('.service-in-list.returned').each(function () {
                                    var price = $(this).data('totalprice');
                                    totalPrice -= parseFloat(price, 10);

                                });

                                $('.totalPrice').text(totalPrice);




                                // var mystring = value.replace(id, '');
                                // if (type == "service") {
                                //     $('#servicesIds').val(mystring);
                                // } else {
                                //     $('#packagesIds').val(mystring);
                                // }

                                // var mystring2 = services_check.replace(services_check_value, '');
                                // if (type == "service") {
                                //     $('#services_check').val(mystring2);
                                // } else {
                                //     $('#services_check').val(mystring2);
                                // }


                                var date = $('#checkin-date').val();
                                var salon_id = $('.cart_salon_id').val();
                                var serviceType = $('#serviceType').val();
                                var servicesIds = $('#servicesIds').val();
                                var packagesIds = $('#packagesIds').val();
                                var services_check = $('#services_check').val();
                                var minimumChargeAmount = $('.minimumChargeAmount').val();
                                var numServices = parseInt($('.cart-switcher .num').html());

                                addToCart(serviceType, minimumChargeAmount, packagesIds, servicesIds, totalPrice, services_check, salon_id, date, numServices);


                                if ($('.cart .mCSB_container').children().length == 0) {

                                    // init to delete from the session omly the servie if it is equal to zero will kill the sessision

                                    emptyTheCart();
                                    $('.no-services').show();

                                    $('.cart-wrapper').removeClass('opened');
                                    $('.no-services').removeClass('hide');
                                    // $('.no-services').addClass('show');
                                    $('.contenuBook').hide();
                                    $('.emptyTheCart').hide();
                                }
                                ;

                            }, 500);


                            // var drop = $('#dropHere').attr('rel');
                            // $(".pagges-salon .services-cart-page .service-in-list").draggable({
                            //     appendTo: ".pagges-salon .services-cart-page .salon-services-wrapper",
                            //     cursor: "move",
                            //     helper: 'clone',
                            //     revert: "invalid",
                            //     // delay: 300,
                            //     cursorAt: {
                            //         left: 5
                            //     },
                            //     start: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").addClass('droppping').append($('<p class="droppppp"><span>' + drop + '</span></p>'));
                            //         $('.pagges-salon .services-cart-page .no-services').hide();
                            //         $('.cart-wrapper').addClass('opened');


                            //     },
                            //     stop: function(event, ui) {
                            //         $(".pagges-salon .services-cart-page .cart .mCSB_container").removeClass('droppping').find('.droppppp').remove();
                            //         $(".pagges-salon .services-cart-page .no-services").show();
                            //         $('.cart-wrapper').removeClass('opened');
                            //     }
                            // });
                        });
                        //------------------------------

                        var multiFilter = {
                            // Declare any variables we will need as properties of the object

                            $filterGroups: null,
                            $filterUi: null,
                            $reset: null,
                            groups: [],
                            outputArray: [],
                            outputString: '',
                            // The "init" method will run on document ready and cache any jQuery objects we will need.

                            init: function () {
                                var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.

                                self.$filterUi = $('.custom-filter');
                                self.$filterGroups = $('.filter-group');
                                self.$reset = $('#Reset');
                                self.$container = $('.salons-filter');

                                self.$filterGroups.each(function () {
                                    self.groups.push({
                                        $inputs: $(this).find('input'),
                                        active: [],
                                        tracker: false
                                    });
                                });

                                self.bindHandlers();
                            },
                            // The "bindHandlers" method will listen for whenever a form value changes. 

                            bindHandlers: function () {
                                var self = this,
                                        typingDelay = 300,
                                        typingTimeout = -1,
                                        resetTimer = function () {
                                            clearTimeout(typingTimeout);

                                            typingTimeout = setTimeout(function () {
                                                self.parseFilters();
                                            }, typingDelay);
                                        };

                                self.$filterGroups
                                        .filter('.checkboxes')
                                        .on('click', function () {
                                            self.parseFilters();
                                        });

                                self.$filterGroups
                                        .filter('.search')
                                        .on('keyup change', resetTimer);

                                self.$reset.on('click', function (e) {
                                    e.preventDefault();
                                    self.$filterUi[0].reset();
                                    self.$filterUi.find('input[type="text"]').val('');
                                    self.parseFilters();
                                });
                            },
                            // The parseFilters method checks which filters are active in each group:

                            parseFilters: function () {
                                var self = this;

                                // loop through each filter group and add active filters to arrays

                                for (var i = 0, group; group = self.groups[i]; i++) {
                                    group.active = []; // reset arrays
                                    group.$inputs.each(function () {
                                        var searchTerm = '',
                                                $input = $(this),
                                                ttt = $input.data('filter'),
                                                minimumLength = 3;

                                        if ($input.is(':checked')) {
                                            group.active.push(ttt);
                                        }

                                        if ($input.is('[type="text"]') && this.value.length >= minimumLength) {
                                            searchTerm = this.value
                                                    .trim()
                                                    .toLowerCase()
                                                    .replace(' ', '-');

                                            group.active[0] = '[class*="' + searchTerm + '"]';
                                        }
                                    });
                                    group.active.length && (group.tracker = 0);
                                }

                                // self.concatenate();
                            },
                            // The "concatenate" method will crawl through each group, concatenating filters as desired:

                        };

                        $(function () {
                            // Initialize multiFilter code
                            multiFilter.init();
                            // Instantiate MixItUp
                            $('.salons-filter').mixItUp({
                                controls: {
                                    toggleFilterButtons: true,
                                    toggleLogic: 'and'
                                },
                                animation: {
                                    easing: 'ease',
                                    effects: 'fade',
                                    duration: 0
                                }
                            });
                        });

                        var classes = [];
                        $(".multiSel").find("span").each(function (i) {
                            var curClass = $(this).attr("class");
                            if (jQuery.inArray(curClass, classes) > -1) {
                                $(this).remove();
                            }
                            classes[i] = curClass;
                        });

                        $("img.lazy").show().lazyload({
                            failure_limit: 10,
                            event: "scroll",
                            effect: "fadeIn"
                        });
                    }
                });
            });
        });

    }

    $(window).load(function () {
        var thearr = window.location.pathname.split('/');
        var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character


        // user dashboard & tabs

        if (thearr.indexOf('dashboard') > -1) {


            // insert country code
            $('.country-list li').removeClass('active');
            $('.country-list li').each(function () {
                var cur = $(this);
                var li_val = cur.attr('data-dial-code');
                var parent_val = $('.phone-select').attr('data-select');
                if (li_val == parent_val) {
                    cur.trigger('click');
                }
            });
            $('#address_error').hide();
            $('#address_errorr').hide();
            $(".validform").validate();
            $.validator.messages.required = $(".requiredlay").val();
            $.validator.messages.email = $(".right_email").val();
            $('.address_ajax').submit(function (event) {
                event.preventDefault();
                var form = $(".address_ajax");
                var not_compelte = "false";
                $('.required_address').each(function () {
                    if ($(this).val() == "") {
                        $('#address_error').slideDown();
                        not_compelte = "true";
                        return false;
                    }
                });
                if (not_compelte == "false") {
                    $('#address_error').slideUp();
                    $('.modal-footer').slideUp();
                    $('.modal-contents').slideUp();
                    $('.load').append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin fa-2x'></i></div>");
                    $.post(form.attr('action'), form.serialize(), function (data) {
                        // just try to see the outputs
                        if (data) {
                            setTimeout(function () {
                                $('.load').html("");
                                $('#myModal').modal('hide');
                                $('.new_adderss').each(function () {
                                    $(this).val("");
                                });
                                $('.chzn-single span').html($(".distrectt").val());
                                $('#address_error').slideUp();
                                $('#address_errorr').slideUp();
                                $('.modal-footer').slideDown();
                                $('.modal-contents').slideDown();
                                $('#element_to_pop_up').show();
                                $('#element_to_pop_up').html("<p style='color:#3C763D;padding:15px;'>" + $('.address_suc').val() + "</p> ");
                                $('#element_to_pop_up').bPopup();
                                $('#address_table').html(data);
                            }, 1000);
                        }
                    });
                }


            });
            if ($("input[name*='address_type']:checked").val() == 0) {
                $('.building_type_info').show();
                $("input[name*='house']").addClass('required_address');
                $("input[name*='floor']").addClass('required_address');
                $('#building').attr('placeholder', $('.building').val());
            } else {
                $('.building_type_info').hide();
                $("input[name*='house']").removeClass('required_address');
                $("input[name*='floor']").removeClass('required_address');
                $('#building').attr('placeholder', $('.houseing').val());
            }
            $("input[name*='address_type']").click(function () {
                if ($(this).val() == 0) {
                    $('.building_type_info').slideDown();
                    $("input[name*='house']").addClass('required_address');
                    $("input[name*='floor']").addClass('required_address');
                    $('#building').attr('placeholder', $('.building').val());
                } else {
                    $('.building_type_info').slideUp();
                    $("input[name*='house']").removeClass('required_address');
                    $("input[name*='floor']").removeClass('required_address');
                    $('#building').attr('placeholder', $('.houseing').val());
                }
            });


        }

        // user Edit Reservation Home Reservations
        if (thearr.indexOf('edit_book') > -1 && $('.serviceplace').val() == 1) {
            //

            var idleTime = 0;
            var idleInterval = setInterval(timerIncrement, 180000);

            function timerIncrement() {
                idleTime++;
                if (idleTime > 1) {
                    // doPreload();
                }
            }

            function doPreload() {
                var msg = $('.timeOutMessage').val();
                $('#element_to_pop_up').show();
                $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + msg + " </p> ");
                $('#element_to_pop_up').bPopup();
                setTimeout(function () {
                    window.location = $('.urlprevious').val();
                }, 1000);
            }

            $('.select-time').parents('.service-calendar').slideUp().parents('.service-offered').find('.notification').slideDown();
            /* ◄------ select time  -------------------------------► */

            /* ◄------ select time  -------------------------------► */
            $(document).on('click', ".select-time", function (e) {
                e.preventDefault(); // diable choose time for the latest services


                if ($(this).closest('.service-offered').hasClass('disableTimes')) {


                } else {
                    var start_to_count = $(this).parent().attr('class');
                    var time = $('#services_duration').val(),
                            numOfbtns = (time / 15) - 1;
                    var stopthis = false;
                    $('.' + start_to_count.trim()).each(function () { // console.log($(this).closest('.service-offered').attr('id'));
                        for (var i = 0; i < numOfbtns; i++) {
                            if ($(this).nextUntil().eq(i).hasClass('active') || $(this).nextUntil().eq(i).hasClass('disabled') || $(this).nextUntil().eq(numOfbtns - 1).length == 0) {
                                stopthis = true;
                                $('#element_to_pop_up').show();
                                $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>You Cant Chose This Time </p>");
                                $('#element_to_pop_up').bPopup();
                                return false;
                            }
                        }
                        if ($(this).hasClass('active') || $(this).parent().hasClass('disabled')) {
                            stopthis = true;
                            $('#element_to_pop_up').show();
                            $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'> You Cant Chose This Thime </p>");
                            $('#element_to_pop_up').bPopup();
                            return false;
                        }
                        // endforeach
                    });
                    if (stopthis) {
                        return false;
                    } else {
                        $(this).closest('.service-offered').find('li').removeClass('active end start');
                        $(this).parent().addClass('active start');
                        $(this).parent().nextUntil().eq(numOfbtns).addClass('end');
                        $(this).parent().nextUntil('.end').addClass('active');
                        var start = $(this).parent('.start').find('button').text();
                        var end = $(this).closest('.service-offered').find('.end').children('button').text();
                        if (end.length == 0) {
                            end = $('.overTime').val();
                        }
                        $('.service-calendar').slideUp().closest('.service-offered').find('.notification').slideDown();
                        $('.service-offered').find('.notification .time-start').text(start);
                        $('.service-offered').find('.notification .time-end').text(end);
                        $('#homeStart').val(start);
                        $('#homeEnd').val(end);
                        // $('.service-offered').find('.notification .time-end').text(end);

                        $('.service-offered').find('.startTime').val(start);
                        $('.select-time').each(function () {
                            var dataClock = $(this).attr('data-clock');
                            if ($(this).parent('li').hasClass('active')) {
                                if ($(this).parent('li').find('button').text() != end) {
                                    $('.select-time[data-clock="' + dataClock + '"]').parent('li').addClass('active');
                                }
                            }
                            ;
                        });
                        // حساب التوقيتات التى سيتم غلقها
                        var times = $(this).parent('.start').find('button').attr('data-clock') + ',';
                        for (var i = 0; i < numOfbtns; i++) {
                            times += $(this).parent().nextUntil().eq(i).find('button').attr('data-clock') + ',';
                        }
                        $(this).closest('.service-offered').find('.reservedTime').val(times);
                        // alert($(this).parents('.service-offered').find('.reservedTime').val() );
                    }


                }


            });
            $('.select-time').each(function () {
                $(this).parent('li').append($('<div class="cover"></div>'));
            });
            //--------------------------------------------------------------------------------------------

            $(document).on('click', ".reset-time", function (e) {
                e.preventDefault();
                $('.notification').slideUp().closest('.service-offered').find('.service-calendar').slideDown();
                $('.service-offered').find('.active').show().removeClass('active start end cannot');
                $('.service-offered').find('.active').show().removeClass('active start end cannot');
                $('.service-offered').find('.notification').slideUp();
                $('.service-offered').find('.service-calendar').slideDown();
                $('.service-offered').find('.startTime').attr("value", "");
                var dataClock = $('.service-offered').find('.reservedTime').val();
                $('.service-offered').find('.reservedTime').val("");


                RemoveDisabledTimes();
                reomveCanNotTimesHome();


                var arr = dataClock.split(',');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] != "") { // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                        $('.select-time[data-clock=' + arr[i] + ']').parent('li').removeClass('active');
                    }

                }

                $('.reservedTime').each(function () {
                    var dataClock = $(this).val();
                    var arr = dataClock.split(',');
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] != "") { // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                            $('.select-time[data-clock=' + arr[i] + ']').parent('li').addClass('active');
                            $('.select-time[data-clock=' + arr[i] + ']').parent('li').append($('<div class="cover"></div>'));
                        }
                    }
                });
            });
            /* ◄------ remove serv from cart -------------------------------► */
            $(document).on('click', ".remove-serv-cart", function (e) {
                e.preventDefault();
                var price = $(this).closest('.service-offered').attr('price');
                var total = $('.total-price label').html();
                var newtotal = total - price;
                var min_charge = $('.total-price').attr('min_charge');
                var promotion_min = $('.total-price').attr('promotion_min');
                if (parseInt(newtotal) < parseInt(min_charge)) {
                    $('#element_to_pop_up').show();
                    $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#minimumChargeNot').attr('rel') + "</p> ");
                    $('#element_to_pop_up').bPopup();
                } else if (newtotal == 0) {
                    $('#element_to_pop_up').show();
                    $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#min_service').attr('rel') + "</p>");
                    $('#element_to_pop_up').bPopup();
                } else if (parseInt(promotion_min) > 0 && parseInt(newtotal) < parseInt(promotion_min)) {
                    $('#element_to_pop_up').show();
                    $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#promotion_min_value').attr('rel') + "</p>");
                    $('#element_to_pop_up').bPopup();
                } else {
                    // remove its times from reserved time before removing it
                    var dataClock = $(this).parents('.service-offered').find('.reservedTime').val();
                    $(this).parents('.service-offered').find('.reservedTime').val("");
                    var arr = dataClock.split(',');
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] != "") {
                            $('.select-time[data-clock="' + arr[i] + '"]').parent('li').removeClass('active cannot');
                        }

                    }

                    $('.reservedTime').each(function () {

                        var dataClock = $(this).val();
                        var arr = dataClock.split(',');
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i] != "") {
                                // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                                $('.select-time[data-clock="' + arr[i] + '"]').parent('li').addClass('active');
                                $('.select-time[data-clock="' + arr[i] + '"]').parent('li').append($('<div class="cover"></div>'));
                            }
                        }
                    });
                    $('.total-price label').html(newtotal);
                    $('.servicessum').val(newtotal);
                    $(this).closest('.service-offered').addClass('removed').slideUp(500);
                    setTimeout(function () {
                        $('.service-offered.removed').remove();
                    }, 500);
                    $(this).parents('.service-offered').find('.active').show().removeClass('active start end');
                    $(this).parents('.service-offered').nextAll('.service-offered').find('.active').show().removeClass('active');
                }
            });
            //--------------------------------------------------------------------------------------------


            // check if the user choose times
            $('.submitBokdir').click(function (event) {
                event.preventDefault;
                var total = $('.total-price label').html();
                var service_type = $('.total-price').attr('service_type');
                var min_charge = $('.total-price').attr('min_charge');
                if (service_type == 1 && parseInt(total) < parseInt(min_charge)) {
                    $('#element_to_pop_up').show();
                    $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#minimumCharge').attr('rel') + "</p> ");
                    $('#element_to_pop_up').bPopup();
                    return false;
                } else {
                    var count = 0;
                    $('.startTime').each(function () {
                        if (!$(this).val()) {
                            $('#element_to_pop_up').show();
                            $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#timeFirst').attr('rel') + "</p> ");
                            $('#element_to_pop_up').bPopup();
                            count++;
                            return false;
                        }
                    });
                    if (count == 0) {
                        $(".bookform").submit();
                    }
                }

            });
            //employee change times
            $('.employee').change(function () {
                // var form = $(".ajaxsubmit");
                // $('.ajaxsubmit').submit();   // alert( this.value);
                // alert($(this).parents('.service-offered').attr('id'));
                $('.notification').slideUp().find('.service-calendar').slideDown();
                $('.active').show().removeClass('active start end');
                $('.active').show().removeClass('active start end');
                $('.notification').slideUp();
                $('.service-calendar').slideDown();
                $('.startTime').attr("value", "");
                var dataClock = $('.reservedTime').val();
                $('.reservedTime').attr("value", "");
                var calender = $(this).attr('calender');
                $.post($(this).attr('url'), {
                    employee_id: this.value,
                    book_id: $(this).attr('book_id'),
                    reserve_id: $(this).attr('reserve_id'),
                    date: $('#date').val()
                }, function (data) {
                    // just try to see the outputs
                    // console.log(data);
                    if (data) {
                        $("#" + calender).children('ul').remove();
                        $("#" + calender).append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                        setTimeout(function () {
                            $("#" + calender).append(data);
                            $(".spiner").remove();

                            RemoveDisabledTimes();
                            reomveCanNotTimesHome();
                        }, 500);
                        var arr = dataClock.split(',');
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i] != "") {
                                // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                                $('.select-time[data-clock="' + arr[i] + '"]').parent('li').removeClass('active cannot');
                            }
                        }
                    }
                })
            });
            $('.edit_calender_action').click(function () {
                var base_url = $('#base-url').val();

                var date = $('#date').val();
                var id = $('#reservation_id').val();
                var total_price = $('.total-price').attr('rel');
                $('.total-price label').html(total_price);
                $.ajax({
                    type: "GET",
                    url: base_url + "/get_times?id=" + id + "&date=" + date + "&place=1",
                    success: function (datas) {

                        $("#times_ajax").html("<div class='spiner text-center'><i style='margin: 0 auto; display:table; font-size:24px;' class='fa fa-spinner fa-spin '></i></div>");
                        setTimeout(function () {

                            $("#times_ajax").html(datas);
                            $(".spiner").remove();

                            $('#send_date').val(date);
                        }, 500);

                        setTimeout(function () {
                            RemoveDisabledTimes();
                            reomveCanNotTimesHome();
                        }, 600);


                    }
                });
            });
        }


        // user Edit Reservation in salon Reservations
        if (thearr.indexOf('edit_book') > -1 && $('.serviceplace').val() == 0) {

            var idleTime = 0;
            var idleInterval = setInterval(timerIncrement, 180000);

            function timerIncrement() {
                idleTime++;
                if (idleTime > 1) {
                    doPreload();
                }
            }

            function doPreload() {
                var msg = $('.timeOutMessage').val();
                $('#element_to_pop_up').show();
                $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + msg + " </p> ");
                $('#element_to_pop_up').bPopup();
                setTimeout(function () {
                    window.location = $('.urlprevious').val();
                }, 1000);
            }

            $('.select-time').parents('.service-calendar').slideUp().parents('.service-offered').find('.notification').slideDown();
            /* ◄------ select time  -------------------------------► */

            /* ◄------ select time  -------------------------------► */
            $(document).on('click', ".select-time", function (e) {
                e.preventDefault();
                var time = $(this).closest('.service-offered').find('.time-amount').attr('data-time'),
                        numOfbtns = (time / 15) - 1;
                for (var i = 0; i < numOfbtns; i++) {

                    if ($(this).parent().nextUntil().eq(i).hasClass('active') || $(this).parent().nextUntil().eq(i).hasClass('disabled')) {

                        $('#element_to_pop_up').show();
                        $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>You Cant Chose This Time </p>");
                        $('#element_to_pop_up').bPopup();
                        return false;
                    }
                }
                if (numOfbtns == 0) {
                    if ($(this).hasClass('active') || $(this).parent().hasClass('disabled')) {
                        $('#element_to_pop_up').show();
                        $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'> You Cant Chose This Time </p>");
                        $('#element_to_pop_up').bPopup();
                        return false;
                    } else {
                        $(this).closest('.service-offered').find('li').removeClass('active end start');
                        $(this).parent().addClass('active start');
                        $(this).parent().nextUntil().eq(numOfbtns).addClass('end');
                        $(this).parent().nextUntil('.end').addClass('active');
                        var start = $(this).parent('.start').find('button').text();
                        var end = $(this).closest('.service-offered').find('.end').children('button').text();
                        if (end.length == 0) {
                            end = $('.overTime').val();
                        }
                        $(this).parents('.service-calendar').slideUp().closest('.service-offered').find('.notification').slideDown();
                        $(this).closest('.service-offered').find('.notification .time-start').text(start);
                        $(this).closest('.service-offered').find('.notification .time-end').text(end);
                        $(this).closest('.service-offered').find('.startTime').val(start);
                        // أضافة الوقت ل لنبوت هيدين للأحتفاظ بالتوقيتات المحجوزة
                        var thetime = $(this).parent('.start').find('button').attr('data-clock');
                        $(this).closest('.service-offered').find('.reservedTime').val(thetime + ',');
                        // alert($(this).closest('.service-offered').find('.reservedTime').val());


                        $('.select-time').each(function () {
                            var dataClock = $(this).attr('data-clock');
                            if ($(this).parent('li').hasClass('active')) {

                                if ($(this).parent('li').find('button').text() != end) {

                                    $('.select-time[data-clock="' + dataClock + '"]').parent('li').addClass('active');
                                }
                            }
                            ;
                        });
                    }
                } else if ($(this).hasClass('active') || $(this).parent().hasClass('disabled')) {
                    $('#element_to_pop_up').show();
                    $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'> You Cant Chose This Time </p>");
                    $('#element_to_pop_up').bPopup();
                    return false;
                } else {

                    $(this).closest('.service-offered').find('li').removeClass('active end start');
                    $(this).parent().addClass('active start');
                    $(this).parent().nextUntil().eq(numOfbtns).addClass('end');
                    $(this).parent().nextUntil('.end').addClass('active');
                    var start = $(this).parent('.start').find('button').text();
                    var end = $(this).closest('.service-offered').find('.end').children('button').text();
                    if (end.length == 0) {
                        end = $('.overTime').val();
                    }
                    $(this).parents('.service-calendar').slideUp().closest('.service-offered').find('.notification').slideDown();
                    $(this).closest('.service-offered').find('.notification .time-start').text(start);
                    $(this).closest('.service-offered').find('.notification .time-end').text(end);
                    $(this).closest('.service-offered').find('.startTime').val(start);
                    $('.select-time').each(function () {
                        var dataClock = $(this).attr('data-clock');
                        if ($(this).parent('li').hasClass('active')) {

                            if ($(this).parent('li').find('button').text() != end) {

                                $('.select-time[data-clock="' + dataClock + '"]').parent('li').addClass('active');
                            }
                        }
                        ;
                    });
                    // حساب التوقيتات التى سيتم غلقها
                    var times = $(this).parent('.start').find('button').attr('data-clock') + ',';
                    for (var i = 0; i < numOfbtns; i++) {
                        times += $(this).parent().nextUntil().eq(i).find('button').attr('data-clock') + ',';
                    }

                    $(this).closest('.service-offered').find('.reservedTime').val(times);
                    // alert($(this).parents('.service-offered').find('.reservedTime').val() );
                }

            });
            $('.select-time').each(function () {
                $(this).parent('li').append($('<div class="cover"></div>'));
            });
            //--------------------------------------------------------------------------------------------

            $(document).on('click', ".reset-time", function (e) {
                e.preventDefault();
                $(this).closest('.notification').slideUp().closest('.service-offered').find('.service-calendar').slideDown();
                $(this).closest('.service-offered').find('.active').show().removeClass('active start end cannot');
                $(this).closest('.service-offered').find('.active').show().removeClass('active start end cannot');
                $(this).closest('.service-offered').find('.notification').slideUp();
                $(this).closest('.service-offered').find('.service-calendar').slideDown();
                $(this).closest('.service-offered').find('.startTime').attr("value", "");
                var dataClock = $(this).closest('.service-offered').find('.reservedTime').val();
                $(this).closest('.service-offered').find('.reservedTime').val("");
                $(this).closest('.service-offered').find('.unreservedTime').val(dataClock);




                setTimeout(function () {
                    RemoveDisabledTimes();
                    reomveCanNotTimes();
                }, 600);



                var arr = dataClock.split(',');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] != "") { // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                        $('.select-time[data-clock=' + arr[i] + ']').parent('li').removeClass('active');
                    }

                }

                $('.reservedTime').each(function () {
                    var dataClock = $(this).val();
                    var arr = dataClock.split(',');
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] != "") {
                            $('.select-time[data-clock=' + arr[i] + ']').parent('li').addClass('active');
                            $('.select-time[data-clock=' + arr[i] + ']').parent('li').append($('<div class="cover"></div>'));
                        }

                    }
                });
            });
            /* ◄------ remove serv from cart -------------------------------► */
            $(document).on('click', ".remove-serv-cart", function (e) {
                e.preventDefault();
                var price = $(this).closest('.service-offered').attr('price');
                var total = $('.total-price label').html();
                var newtotal = total - price;
                var promotion_min = $('.total-price').attr('promotion_min');
                if (newtotal == 0) {
                    $('#element_to_pop_up').show();
                    $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#min_service').attr('rel') + "</p>");
                    $('#element_to_pop_up').bPopup();
                } else if (parseInt(promotion_min) > 0 && parseInt(newtotal) < parseInt(promotion_min)) {
                    $('#element_to_pop_up').show();
                    $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#promotion_min_value').attr('rel') + "</p>");
                    $('#element_to_pop_up').bPopup();
                } else {

                    // remove its times from reserved time before removing it
                    var dataClock = $(this).parents('.service-offered').find('.reservedTime').val();
                    $(this).parents('.service-offered').find('.reservedTime').val("");
                    var arr = dataClock.split(',');
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] != "") {
                            $('.select-time[data-clock="' + arr[i] + '"]').parent('li').removeClass('active cannot');
                        }

                    }

                    $('.reservedTime').each(function () {

                        var dataClock = $(this).val();
                        var arr = dataClock.split(',');
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i] != "") {
                                // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                                $('.select-time[data-clock="' + arr[i] + '"]').parent('li').addClass('active');
                                $('.select-time[data-clock="' + arr[i] + '"]').parent('li').append($('<div class="cover"></div>'));
                            }
                        }
                    });
                    $('.total-price label').html(newtotal);
                    $('.servicessum').val(newtotal);
                    $(this).closest('.service-offered').addClass('removed').slideUp(500);
                    setTimeout(function () {
                        $('.service-offered.removed').remove();
                    }, 500);
                    $(this).parents('.service-offered').find('.active').show().removeClass('active start end');
                    $(this).parents('.service-offered').nextAll('.service-offered').find('.active').show().removeClass('active');
                }
            });
            //--------------------------------------------------------------------------------------------


            // check if the user choose times
            $('.submitBokdir').click(function (event) {
                event.preventDefault;
                var total = $('.total-price label').html();
                var service_type = $('.total-price').attr('service_type');
                var min_charge = $('.total-price').attr('min_charge');
                if (service_type == 1 && parseInt(total) < parseInt(min_charge)) {
                    $('#element_to_pop_up').show();
                    $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#minimumCharge').attr('rel') + "</p> ");
                    $('#element_to_pop_up').bPopup();
                    return false;
                } else {
                    var count = 0;
                    $('.startTime').each(function () {
                        if (!$(this).val()) {
                            $('#element_to_pop_up').show();
                            $('#element_to_pop_up').html("<p style='color:#E40C0C;padding:15px;'>" + $('#timeFirst').attr('rel') + "</p> ");
                            $('#element_to_pop_up').bPopup();
                            count++;
                            return false;
                        }
                    });
                    if (count == 0) {
                        $(".bookform").submit();
                    }
                }

            });
            //employee change times
            $('.employee').change(function () {
                // var form = $(".ajaxsubmit");
                // $('.ajaxsubmit').submit();   // alert( this.value);
                // alert($(this).parents('.service-offered').attr('id'));
                $(this).closest('.service-offered').find('.notification').slideUp().find('.service-calendar').slideDown();
                $(this).closest('.service-offered').find('.active').show().removeClass('active start end');
                $(this).closest('.service-offered').find('.active').show().removeClass('active start end');
                $(this).closest('.service-offered').find('.notification').slideUp();
                $(this).closest('.service-offered').find('.service-calendar').slideDown();
                $(this).closest('.service-offered').find('.startTime').attr("value", "");
                var dataClock = $(this).closest('.service-offered').find('.reservedTime').val();
                $(this).closest('.service-offered').find('.reservedTime').val("");
                $(this).closest('.service-offered').find('.unreservedTime').val(dataClock);
                var calender = $(this).attr('calender');
                $.post($(this).attr('url'), {
                    employee_id: this.value,
                    book_id: $(this).attr('book_id'),
                    reserve_id: $(this).attr('reserve_id'),
                    date: $('#date').val(),
                    type_time: $('#type_time').val()
                }, function (data) {
                    // just try to see the outputs
                    // console.log(data);
                    if (data) {
                        $("#" + calender).children('ul').remove();
                        $("#" + calender).append("<div class='spiner ta-center'><i class='fa fa-spinner fa-spin '></i></div>");
                        setTimeout(function () {
                            $("#" + calender).append(data);
                            $(".spiner").remove();



                            RemoveDisabledTimes();
                            reomveCanNotTimes();
                        }, 500);
                        var arr = dataClock.split(',');
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i] != "") {
                                // alert($('.select-time[data-clock="'+ arr[i] +'"]').parent('li').html());
                                $('.select-time[data-clock="' + arr[i] + '"]').parent('li').removeClass('active cannot');
                            }
                        }
                    }
                })
            });
            $('.edit_calender_action').click(function () {
                var base_url = $('#base-url').val();
                var type_time = $('#type_time').val();
                var date = $('#date').val();
                var id = $('#reservation_id').val();
                var total_price = $('.total-price').attr('rel');
                $('.total-price label').html(total_price);
                $.ajax({
                    type: "GET",
                    url: base_url + "/get_times?id=" + id + "&type_time=" + type_time + "&date=" + date + "&place=0",
                    success: function (datas) {
                        $("#times_ajax").html("<div class='spiner text-center'><i style='margin: 0 auto; display:table; font-size:24px;' class='fa fa-spinner fa-spin '></i></div>");
                        setTimeout(function () {

                            $("#times_ajax").html(datas);
                            $(".spiner").remove();
                            $('#send_type_time').val(type_time);
                            $('#send_date').val(date);
                        }, 500);

                        setTimeout(function () {
                            RemoveDisabledTimes();
                            reomveCanNotTimes();
                        }, 600);
                    }
                });
            });
        }


        // user registeration
        if (thearr.indexOf('register') > -1) {


            $(".validform").validate();
            $.validator.messages.required = $(".requiredlay").val();
            $.validator.messages.email = $(".right_email").val();
            if ($("input[name*='address_type']:checked").val() == 0) {
                $('.building_type_info').show();
                $("input[name*='house']").attr('required', '');
                $("input[name*='floor']").attr('required', '');
                $('#building').attr('placeholder', $('.building').val());
            } else {
                $('.building_type_info').hide();
                $("input[name*='house']").removeAttr('required');
                $("input[name*='floor']").removeAttr('required');
                $('#building').attr('placeholder', $('.houseing').val());
            }
            $("input[name*='address_type']").click(function () {
                if ($(this).val() == 0) {
                    $('.building_type_info').slideDown();
                    $("input[name*='house']").attr('required', '');
                    $("input[name*='floor']").attr('required', '');
                    $('#building').attr('placeholder', $('.building').val());
                } else {
                    $('.building_type_info').slideUp();
                    $("input[name*='house']").removeAttr('required');
                    $("input[name*='floor']").removeAttr('required');
                    $('#building').attr('placeholder', $('.houseing').val());
                }
            });
        }


        if (thearr.indexOf('login') > -1) {


            $(".validform").validate();
            $.validator.messages.required = $(".requiredlay").val();
            $.validator.messages.email = $(".right_email").val();
        }

        if (thearr.indexOf('blog') > -1 || thearr.indexOf('post') > -1 || thearr.indexOf('blog_dept') > -1) {
            /* ◄------ TWITTER FEEDS -------------------------------► */
            jQuery('#twitter-feed').twittie({
                dateFormat: '%b. %d, %Y',
                username: 'salonatcom',
                apiPath: '../interface/php/twitter-api/tweet.php',
                template: '<p>{{tweet}}</p>' +
                        '<a href="{{url}}" target="_blank" class="date">{{date}}</a>',
                count: 3,
                loadingText: '<p>Loading <i class="animate-spin fa fa-repeat"></i></p>'
            },
            function () {
                var owl = jQuery('#twitter-feed ul');
                owl.owlCarousel({
                    nav: false,
                    dots: false,
                    loop: true,
                    autoplay: true,
                    autoplayHoverPause: true,
                    responsive: {
                        0: {
                            items: 1,
                            slideBy: 1
                        }
                    }
                });
            });
            //--------------------------------------------------------------------------------------------
        }


    });



    // Google Map Script
    if (current_url.indexOf("contactus") > -1 || (current_url.indexOf("salon") > -1 || current_url.indexOf("services") > -1)) {
        if (current_url.indexOf("service_search") > -1 || current_url.indexOf("allsalons") > -1) {
            return false;
        }
        var gmap = $("#map");
        // map vars
        var map;
        var markerImg = $('.google-map').data('marker-img');
        var markerlat = $('.google-map').data('lat');
        var markerlng = $('.google-map').data('lng');
        var mapZoom = parseFloat($('.google-map').data('zoom-level'));
        var enableZoom = $('.google-map').data('enable-zoom');
        var locationName = $('.google-map').data('place-id');
        var locationDesc = $('.google-map').data('place-description');
        var latlng = new google.maps.LatLng(markerlat, markerlng);

        function initialize() {

            var stylez = [{
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#e9e9e9"
                        }, {
                            "lightness": 17
                        }]
                }, {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#f5f5f5"
                        }, {
                            "lightness": 20
                        }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "color": "#ffffff"
                        }, {
                            "lightness": 17
                        }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                            "color": "#ffffff"
                        }, {
                            "lightness": 29
                        }, {
                            "weight": 0.2
                        }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#ffffff"
                        }, {
                            "lightness": 18
                        }]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#ffffff"
                        }, {
                            "lightness": 16
                        }]
                }, {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#f5f5f5"
                        }, {
                            "lightness": 21
                        }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#dedede"
                        }, {
                            "lightness": 21
                        }]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                            "visibility": "on"
                        }, {
                            "color": "#ffffff"
                        }, {
                            "lightness": 16
                        }]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                            "saturation": 36
                        }, {
                            "color": "#333333"
                        }, {
                            "lightness": 40
                        }]
                }, {
                    "elementType": "labels.icon",
                    "stylers": [{
                            "visibility": "off"
                        }]
                }, {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#f2f2f2"
                        }, {
                            "lightness": 19
                        }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "color": "#fefefe"
                        }, {
                            "lightness": 20
                        }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                            "color": "#fefefe"
                        }, {
                            "lightness": 17
                        }, {
                            "weight": 1.2
                        }]
                }];
            // map properities
            var mapProp = {
                center: latlng,
                zoom: mapZoom,
                zoomControl: enableZoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: true,
                scrollwheel: false,
                panControl: false,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, "Salonatcom"]
                },
                // zoomControlOptions: {
                //     style:google.maps.ZoomControlStyle.SMALL
                // }
                // disableDefaultUI:true, turn off all controls
                // panControl:true,
                // zoomControl:true,
                // mapTypeControl:true,
                // scaleControl:true,
                // streetViewControl:true,
                // overviewMapControl:true,
                // rotateControl:true
            };
            map = new google.maps.Map(document.getElementById("map"), mapProp);
            styledMapType = new google.maps.StyledMapType(stylez, {
                name: "Salonatcom"
            });
            var contentString = '<div class="infowindow-content"><div class="locationName">' + locationName + '</div><div class="locationDesc">' + locationDesc + '</div></div>';
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            var marker = new google.maps.Marker({
                map: map,
                icon: markerImg,
                position: latlng
            });
            map.mapTypes.set("Salonatcom", styledMapType);
            map.setMapTypeId('Salonatcom');
            marker.setMap(map);
            infowindow.open(map, marker);
            $(document).on('click', 'a[href="#info"]', function (e) {
                google.maps.event.trigger(map, 'resize');
                map.setCenter(marker.getPosition());
            });
        }

        google.maps.event.addDomListener(window, 'load', initialize);
    }



    // apps
    // apps
    if (current_url.indexOf('apps') > -1) {



        var userAgent = navigator.userAgent || navigator.vendor || window.opera;



        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {

        }

        if (/android/i.test(userAgent)) {

            var isChromium = window.chrome,
                    winNav = window.navigator,
                    vendorName = winNav.vendor,
                    isOpera = winNav.userAgent.indexOf("OPR") > -1,
                    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
                    isIOSChrome = winNav.userAgent.match("CriOS");
            is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (is_firefox || isOpera) {
                // window.location = "http://google.com";
                window.open("intent://salon/#Intent;scheme=salonatcom;package=com.salonatcom.user;end", "_self");

            } else if (isChromium) {
                window.location.replace = "intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end";


            } else {
                // window.open("market://details?id=com.salonatcom.user","_self");
                // To avoid the "protocol not supported" alert, fail must open another app.
                var appstorefail = "market://details?id=com.salonatcom.user";
                var appstoressss = "salonatcom://dsfsdf";
                var loadedAt = +new Date;
                setTimeout(
                        function () {
                            if (+new Date - loadedAt < 2000) {
                                window.location = appstorefail;
                            }
                        }, 100);

                function LaunchApp() {

                    window.location = appstoressss;

                }
                ;
                LaunchApp();
            }
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            // To avoid the "protocol not supported" alert, fail must open another app.
            var appstore = "itms://itunes.apple.com/app/salonatcom/id1158649975?mt=8";

            var loadedAt = +new Date;
            setTimeout(
                    function () {
                        if (+new Date - loadedAt < 2000) {
                            window.location = appstore;
                        }
                    }, 100);


            window.open("Salonatcom://nowhere", "_self");
        }



    }


})();

