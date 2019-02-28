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


    $('.omega-app-floater .autoscroll').each(function() {
      var isMacWebkit = navigator.userAgent.match(/Macintosh/) && navigator.userAgent.match(/WebKit/);
      var isFirefox = navigator.userAgent.match(/firefox/);

      this.onwheel = wheelHandler;
      this.onmousewheel = wheelHandler;
      if (isFirefox) {
          this.scrollTop = 0;
          this.addEventListener("DOMMouseScroll", wheelHandler, false);
      }
      function wheelHandler(event) {
          var e = event || window.event;
          var deltaY = e.deltaY * -20 || e.wheelDeltaY / 4 || (e.wheelDeltaY === undefined && e.wheelDelta / 4) || e.detail * -10 || 0;
          if (isMacWebkit) {
              deltaY /= 30;
          }
          e.currentTarget.scrollTop -= deltaY;
          if (isFirefox && e.type !== "DOMMouseScroll") {
              this.removeEventListener("DOMMouseScroll", wheelHandler, false);
          }

          e.preventDefault && e.preventDefault();
          e.stopPropagation && e.stopPropagation();
          e.cancelBubble = true;
          e.returnValue = false; 
          return false;
      }
    });


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