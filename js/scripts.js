$(window).load(function () {

    "use strict";

    setTimeout(function () {
        $('#loader').addClass('hide-loader');
    }, 1000);

    setTimeout(function () {
        $('.slide-content').addClass('show-slide');
        if ($(window).width() > 768) {
            $('#nav').addClass('open-menu');
        }
    }, 1500);

    $('#progress-bar').width('100%');
});

$(document).ready(function () {

    "use strict";

    var count = 0;
    $('img').load(function () {
        count = count + 1;
        var percent = (count * 12) + "%";
        $('#progress-bar').width(percent);
    });

    $('#progress-bar').css('top', ($(window).height() / 2));

    // Initialize Smooth Scroll to internal links

    $('.internal-link').smoothScroll({
        offset: -137,
        speed: 800
    });

    // Initialize Sliders

    $('#home-slider').flexslider({
        directionNav: false
    });
    $('#gallery-small-slider').flexslider({
        controlNav: false,
        directionNav: false
    });
    $('#gallery-slider').flexslider({
        controlNav: false,
        animation: "slide"
    });

    // Display menu on hover & Display menu by default on larger devices

    $('#nav-toggle').click(function () {
        if ($('#nav').hasClass('open-menu')) {
            $('#nav').removeClass('open-menu');
        } else {
            $('#nav').addClass('open-menu');
        }
    });

    // Place Nav Off Canvas

    $('#nav').css('top', -$('#nav').height());

    $(window).resize(function () {
        $('#nav').css('top', -$('#nav').height());
    });


    // Adjust the height of the home slider to be 3/4 of the height of the window

    var quarterHeight = ($(window).height() / 4);
    var sliderHeight = quarterHeight * 3.3;

    $('#home-slider .slides li').css('height', sliderHeight);

    // Append HTML <img>'s as CSS Background for slides
    // also center the content of the slide

    $('#home-slider .slides li').each(function () {

        var imgSrc = $(this).children('.slider-bg').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('.slider-bg').remove();



        var slideHeight = $(this).height();
        var contentHeight = $(this).children('.slide-content').height();
        var padTop = (slideHeight / 2) - (contentHeight / 2);

        $(this).children('.slide-content').css('padding-top', padTop);

    });


    // Append HTML <img>'s as CSS Backgrounds for Dividers

    $('.divider').each(function () {

        var divImgSrc = $('.divider-bg').attr('src');
        $(this).children('.divider-bg').remove();
        $(this).css('background', 'url("' + divImgSrc + '")');


    });

    // Manage FAQ Clicks

    $('.question').click(function () {

        $('.question').removeClass('open-question');

        if ($(this).hasClass('open-question')) {
            $(this).removeClass('open-question');
        } else {
            $(this).addClass('open-question');
        }

    });

    //Contact Form Code:

    $(function () {
        $("#form-btn").click(function (e) {
            var $error = 0;
            var email = $(this).siblings("#newsletter-email").val();
            var name = $(this).siblings("#newsletter-name").val();



            if (email === "" || name === "") {
                $(this).siblings('.details-error-wrap').addClass('show-error');
                $error = 1;

            } else {
                $(this).siblings('.details-error-wrap').removeClass('show-error');

            }

            if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(email))) {
                $(this).siblings('.details-error-wrap').addClass('show-error');
                $error = 1;
            }


            var that = this;
            var dataString = 'name=' + name + '&email=' + email;
            if ($error === 0) {
                $.ajax({
                    type: "POST",
                    url: "newsletter.php",
                    data: dataString,
                    success: function () {
                        $(that).siblings('.details-error-wrap').removeClass('show-error');
                        $(that).html("<i class=\"typcn typcn-tick\"></i>");
                        $(that).siblings('.form-sent').addClass('show-sent');




                    }
                });
                return false;
            }

            e.preventDefault();
        });
    });

});