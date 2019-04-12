(function($) {
'use strict';
  $(document).ready(function() {
    
    
    function percentWidth($e, $parent) {
      return 100 * $e.width() / ($parent || $e.offsetParent()).width();
    }
    
    function fixMinMaxWidth(width) {
      width = Math.min(95, width);
      width = Math.max(30, width);
      return width;
    }
    
    function setResizable($e) {
      $e.resizable({
        handles: 'w',
        //minWidth: '30%',
        resize: function(e, ui) {
          ui.element.css({
            left: '', 
            width: fixMinMaxWidth(percentWidth(ui.element)) + '%'
          });
        }
      });      
    }
    
    setResizable($('.omega-app-floater'));
    
    $('.waves-list .wave').bind('click', function(e) {
      var $e = $('.omega-app-floater');
      if (!$e.hasClass('left-col-hidden')) {
        // Hide left col
        $e
          .data('width-ratio', $e.width() / $('.right-col', $e).width())
          .resizable('destroy')
          .css('width', percentWidth($('.right-col', $e), $e.offsetParent()).toFixed(2) + '%')
          .addClass('left-col-hidden');
      }
      else {
        // Show left col
        $e
        .removeClass('left-col-hidden')
        .css('width', fixMinMaxWidth($e.data('width-ratio') * percentWidth($('.right-col', $e), $e.offsetParent())).toFixed(2) + '%');
        setResizable($e);
      }
    });
    

    // autosize textarea
    autosize($('textarea'));
    
    
    // IN CONSTRUCTION
    document.onpaste = function (e) {
      // use event.originalEvent.clipboard for newer chrome versions
      var items = (e.clipboardData  || e.originalEvent.clipboardData).items;
      console.log(JSON.stringify(items)); // will give you the mime types
      // find pasted image among pasted items
      var blob = null;
      for (var i = 0; i < items.length; i++) {
        console.log(items[i]);
        if (items[i].type.match(/^image($|\/)/)) { // image/png
          blob = items[i].getAsFile();
          console.log(blob);
        }
        else if (items[i].type === 'text/html') {
          items[i].getAsString(function(item) {
            var $e = $(item = item.replace(/<\/?(body|html)>/gi, '').replace(/<!--.*?-->/g, ''));
            blob = $e.attr('src');
            
          console.log(blob);
          });
        }
      }
      // load image if there is a pasted image
      if (0 && blob !== null) {
        var reader = new FileReader();
        reader.onload = function(e) {
          console.log(e.target.result); // data url!
        };
        reader.readAsDataURL(blob);
      }
    };
    



    // TODO: IKW: Evaluate next code only for desktops
    $(window).bind('scroll', function(e) {
      // Disable body scroll when messages/waves lists scrolls
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