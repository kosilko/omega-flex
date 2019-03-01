(function($) {
'use strict';
  $(document).ready(function() {
    $('.omega-app-floater').resizable({
      handles: 'w',
      //minWidth: '30%',
      resize: function(e, ui) {
        var p = ui.element.closest('body');
        var width = (100 / (parseInt(p.css('width')) / parseInt(ui.element.css('width')))).toFixed(2);
        width = Math.min(95, width);
        width = Math.max(30, width);
        ui.element.css({
          left: '', 
          width: width + '%'
        });
      }
    });








    // TODO: Evaluate next code only for desktops
    // Disable body scroll when messages/waves lists scrolls
    $(window).bind('scroll', function(e) {
      if (window._scrollLock && window._scrollState) {
        window.scrollTo(window._scrollState.left, window._scrollState.top);
      }
      else {
        window._scrollState = {
          left: self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, 
          top:  self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
        };
      }
    });
    
    $('.omega-app-floater').hover(
      function(e) {window._scrollLock = true;},
      function(e) {window._scrollLock = false;}
    );













    // autosize textarea
    autosize($('textarea'));


    // testing area
    $('.file, .wave, .message, .main-content-item').each(function() {
      var $e = $(this);
      $e.css('cursor', 'pointer');
      $e.click(function() {
        var n = $('.' + $e.attr('class'), $e.parent()).length;
        n++;
        $('<span />').text(' #' + n).appendTo($e.clone().appendTo($e.parent()).click(function() {$e.click();}));
        if ($e.is('.message')) {
          $e.parent().scrollTop($e.parent()[0].scrollHeight);
        }
      });        
    });
  });


})(jQuery);