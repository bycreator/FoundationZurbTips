
var $nav_list = $( '.tabs' ),
    $nav_tab = $nav_list.children( '.tab' ),
    $back_tab = $( '.tab-back' ),
    $more_tab = $( '.tab-more' ),
    $sections = $( '.slides' ),
    tab_list_length = $nav_tab.length,
    tab_width = $nav_tab.eq(0).outerWidth(),
    list_width = $nav_list.innerWidth(),
    tabs_displayed = parseInt(( list_width / tab_width ), 10),
    pos_counter = 0;

// configure the slider
$sections.slick({
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: false,
    speed: 1000,
    infinite: false,

    // set the height of the slide display based on the currently displayed slide when the slider is initialized
    onInit: function() {
        startingSlideHeight = $( '.slick-active' ).outerHeight();
        $sections.css({
            'height': startingSlideHeight + 'px',
            'overflow': 'hidden'
        });
    },

    // when navigating via the slider, keep the active section's tab in view in the tab display
    onBeforeChange: function( slick, currentSlide, targetSlide ) {
        //round tabs_displayed to nearest whole number to ensure logic is correct after resizing
        var tabs_rounded = Math.round( tabs_displayed );
        
        // trigger a rightward animation of tabs
        if( ( targetSlide - pos_counter ) / ( tabs_rounded - 1 ) >= 1 && targetSlide < ( tab_list_length - 1 ) ){
            var modulus = ((targetSlide - pos_counter)%(tabs_rounded)) + 1;
            var integer = Math.floor( (targetSlide - pos_counter)/tabs_rounded );
            var tab_animation_distance = ( ((integer - 1) * tabs_rounded) + modulus + 1 ) * tab_width;
            $nav_tab.each(function() {
                $(this).animate({
                    left: '-=' + tab_animation_distance
                }, 300);
            });
            pos_counter+=( ((integer - 1) * tabs_rounded) + modulus + 1 );
            if( pos_counter < tab_list_length - tabs_rounded ){
                $more_tab.css( 'right', '0px' );
            } else {
                $more_tab.css( 'right', '999px' );
            }
            if( pos_counter > 0 ){
                $back_tab.css( 'left', '0px' );
            } 
        } else {
            // behavior for tabs if sliding to last panel while tab view is offset some distance to the left
            if( ( targetSlide - pos_counter ) / ( tabs_rounded - 1 ) >= 1 && targetSlide === ( tab_list_length - 1 ) ){
                var last_pos = tab_list_length - tabs_rounded;
                $nav_tab.each( function() {
                    var index = $(this).index();
                    $(this).animate({
                        left: ((index - last_pos) * tab_width) + 'px'
                    }, 300);
                });
                $more_tab.css( 'right', '999px' );
                $back_tab.css( 'left', '0px' );
                pos_counter = last_pos;
            }
        }

        // trigger a leftward animation of tabs
        if( targetSlide / pos_counter <= 1 && targetSlide > 0 ){
            var distance_multiplier = ( pos_counter - targetSlide ) + 1;
            var tab_animation_distance = distance_multiplier * tab_width;
            $nav_tab.each( function() {
                $(this).animate({
                    left: '+=' + tab_animation_distance
                }, 300);
            });
            pos_counter-=distance_multiplier;
            if( pos_counter > 0 ){
                $back_tab.css( 'left', '0px' );
            } else {
                $back_tab.css( 'left', '-999px' );
            }
            if( pos_counter < tab_list_length - tabs_rounded ){
                $more_tab.css( 'right', '0px' );
            }
        } else {
            // behavior for tabs if sliding to first panel while tab view is offset some distance to the right
            if( targetSlide / pos_counter <= 1 && targetSlide === 0 ){
                $nav_tab.each( function() {
                    var index = $(this).index();
                    $(this).animate({
                        left: (index * tab_width) + 'px'
                    }, 300);
                });
                $more_tab.css( 'right', '0px' );
                $back_tab.css( 'left', '-999px' );
                pos_counter = 0;
            }
        }
    },

    // after sliding, fix the height of the display to that of the currently displayed slide
    // update the active tab
    onAfterChange: function() {
        var index = $sections.slickCurrentSlide(),
            this_sectionHeight = $( '.slick-active' ).outerHeight();
        $nav_tab.removeClass( 'active' );
        $nav_tab.eq(index).addClass( 'active' );
        $sections.animate({
            height: this_sectionHeight + 'px'
        });
    }
});

$nav_tab.each( function() {
    var index = $(this).index();
    var left_pos = (tab_width * index) + 'px';
    $(this).css( 'left', left_pos );
});

//on click on more or back tabs, list animates right or left, more and back tab appearance determined by counter value
$more_tab.click( function() {
    $nav_tab.each( function() {
        $(this).animate({
            left: '-=' + tab_width
        }, 300);
    });
    pos_counter++;
    if( pos_counter < tab_list_length - tabs_displayed ){
        $more_tab.css( 'right', '0px' );
    } else {
        $more_tab.css( 'right', '999px' );
    }
    if( pos_counter > 0 ){
        $back_tab.css( 'left', '0px' );
    }
});
$back_tab.click( function() {
    $nav_tab.each( function() {
        $(this).animate({
            left: '+=' + tab_width
        }, 300);
    });
    pos_counter--;
    if( pos_counter > 0 ){
        $back_tab.css( 'left', '0px' );
    } else {
        $back_tab.css( 'left', '-999px' );
    }
    if( pos_counter < tab_list_length - tabs_displayed ){
        $more_tab.css( 'right', '0px' );
    }
});

//clicking on a nav_tab gives it the active class, slides slider to the corresponding section
$nav_tab.click( function() {
    $nav_tab.removeClass( 'active' );
    $(this).addClass( 'active' );
    var index = $(this).index();
    $sections.slickGoTo( parseInt(index) );
});

// remeasure an li and tab width for spacing, re-measure num of tabs displayed
function set_sizes() {
    tab_width = $nav_tab.outerWidth();
    list_width = $nav_list.outerWidth();
    tabs_displayed = list_width / tab_width;
    //recalculate height of the currently displayed slide
    var this_sectionHeight = $( '.slick-active' ).outerHeight();
    $sections.css( 'height', this_sectionHeight + 'px' );
    //use tab width and tab index to set horizontal spacing
    $nav_tab.each( function() {
        var index = $(this).index();
        var left_pos = (tab_width * (index - pos_counter)) + 'px';
        $(this).css( 'left', left_pos );
    });
}

// trigger set_sizes on page resize
var resizeTimer;
$(window).resize( function() {
    clearTimeout( resizeTimer );
    resizeTimer = setTimeout( set_sizes, 15 );
});