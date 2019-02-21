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



      $('.omega-app-floater').on('mouseenter', function (event) {
          $("body").css("overflow","hidden");
      }).on('mouseleave',  function(){
          $("body").css("overflow","auto");
      });

  });


})(jQuery);