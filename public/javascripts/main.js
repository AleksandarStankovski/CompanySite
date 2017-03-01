(function() {
    var mainScript = {
        pageScroll: function(){
            var hrefScrollElement = $('a.page-scroll');
            hrefScrollElement.on('click', function(event) {
                var anchorElement = $(this);
                if ($('.mobile-indicator').is(':visible')) {
                    var navHeight = 93;
                } else {
                    var navHeight = $('.site-header-content').outerHeight() + 10;
                }
                $('html, body').stop().animate({
                    scrollTop: $(anchorElement.attr('href')).offset().top-navHeight;
                }, 1000);
                event.preventDefault();
            })
        },

        closeResponsiveNav: function(){
            var hrefNavElement = $('.navbar-collapse ul li a');
            hrefNavElement.click(function() {
                $('.navbar-toggle:visible').click();
            });
        },

        activationNav: function(){
            var bodyElement = $('body');
            if($('.mobile-indicator').is(':visible')){
                var navHeight = 93;
            }else{
                var navHeight = $('.site-header-content').outerHeight() + 10;
            }
            bodyElement.scrollspy({
                offset: navHeight,
                target: '.navbar-fixed-top'
            })
        },

        activationSlider: function(){
            $('.carousel').carousel();
        },

        sendContact : function(data){
            $.ajax({
                url : "/contact",
                type : "POST",
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                data : JSON.stringify(data),
                complete : function(response){
                    $("#msg").html(response.responseText)
                }
            })
        },

        gallery : function(){
            $(".fancybox-button").fancybox({
                prevEffect: 'fade',
                nextEffect: 'fade',
                closeBtn: true,
                arrows: true,
                padding: 1,
                helpers:  {
                    title:  null
                }
            });
        },

        showMechanizationContent: function(element){           
            element.find('.mechanization-link-content').stop().fadeIn(500);
        },

        hideMechanizationContent: function(element){        
            element.find('.mechanization-link-content').stop().fadeOut(50);
        },

        galleryPrev: function(element){    
            var imgWidth = $('.gallery-container > a').outerWidth(); 
            $(element).animate({
                scrollLeft: '-='+imgWidth
            }, 400); 
        },

        galleryNext: function(element){  
            var imgWidth = $('.gallery-container > a').outerWidth(); 
            $(element).animate({
                scrollLeft: '+='+imgWidth
            }, 400);     
        },
        
        init: function(){
            mainScript.pageScroll();
            mainScript.closeResponsiveNav();
            mainScript.activationNav();
            mainScript.activationSlider();
            mainScript.gallery();
        }
    };

    $('document').ready(function () {
        mainScript.init();
        new WOW().init();

        $('.mechanization-link').hover(
            function(){
                mainScript.showMechanizationContent($(this));
            }, function() {
                mainScript.hideMechanizationContent($(this));
            }
        );

        $('.gallery-prev').click(function(){
            mainScript.galleryPrev('.gallery-section-container');
        });

        $('.gallery-next').click(function(){
            mainScript.galleryNext('.gallery-section-container');
        });
    });
}())