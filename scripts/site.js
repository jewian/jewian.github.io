(function() {
  var htmlEncode;

  htmlEncode = function(value) {
    return $('<div/>').text(value).html();
  };

  $(function() {
    var codeIndex;
    $('.post img').each(function() {
      var $el;
      $el = $(this);
      return $el.addClass('img-responsive');
    });
    $(".post,.project").each(function(i) {
      var _i;
      _i = i;
      return $(this).find('img.fancybox').each(function() {
        var $img, classes, title;
        $img = $(this);
        title = $img.attr('title');
        classes = $img.attr('class');
        $img.removeAttr('class');
        $img.wrap('<a href="' + this.src + '" class="' + classes + '" data-fancybox-group="post-' + _i + '" />');
        if (title != null) {
          return $img.parent().attr('title', title);
        }
      });
    });
    $(".fancybox").fancybox();
    codeIndex = 0;
    $('pre code.lang-coffeescript').each(function() {
      var $code, $pre, $tabContent, coffeeSource, e, jsSource;
      try {
        codeIndex++;
        $code = $(this);
        $pre = $code.parent();
        coffeeSource = $code.text();
        jsSource = CoffeeScript.compile(coffeeSource, {
          bare: true
        });
        $tabContent = $pre.wrap("<div class='tab-content'><div class='tab-pane active' id='code-" + codeIndex + "-coffee'></div></div>").parent().parent();
        $("<ul class='nav nav-tabs auto-coffee'><li class='active'><a href='#code-" + codeIndex + "-coffee' data-toggle='tab'>CoffeeScript</a></li><li><a href='#code-" + codeIndex + "-js' data-toggle='tab'>JavaScript</a></li></ul>").insertBefore($tabContent);
        return $tabContent.append("<div class='tab-pane' id='code-" + codeIndex + "-js'><pre><code class='lang-javascript'>" + (htmlEncode(jsSource)) + "</code></pre></div>");
      } catch (_error) {
        e = _error;
      }
    });
    $('.lang-coffeescript-nojs').removeClass('lang-coffeescript-nojs').addClass('lang-coffeescript');
    $('.lang-none').removeClass('lang-none').addClass('lang-no-highlight');
    return $('pre code').each(function(index, element) {
      var $code, classes, e, fixedClass, origClass, _i, _len, _ref;
      $code = $(this);
      classes = (_ref = $code.attr('class')) != null ? _ref.split(' ') : void 0;
      if (classes != null) {
        for (_i = 0, _len = classes.length; _i < _len; _i++) {
          origClass = classes[_i];
          fixedClass = origClass.replace(/^lang-/, 'language-');
          if (fixedClass !== origClass) {
            $code.removeClass(origClass).addClass(fixedClass);
          }
        }
      }
      try {
        return hljs.highlightBlock(element);
      } catch (_error) {
        e = _error;
      }
    });
  });

}).call(this);
