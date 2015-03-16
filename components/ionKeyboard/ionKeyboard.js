Meteor.startup(function () {
  if (Meteor.isCordova) {
    IonKeyboard.disableScroll();
    IonKeyboard.hideKeyboardAccessoryBar();
  }
});


IonKeyboard = {
  transitionsDuration: 300,
  transitionsIn: "easyInQuint",
  transitionsOut: "easyOutQuint",
  close: function () {
    if (Meteor.isCordova) {
      cordova.plugins.Keyboard.close();
    }
  },

  show: function () {
    if (Meteor.isCordova) {
      cordova.plugins.Keyboard.show();
    }
  },

  hideKeyboardAccessoryBar: function () {
    if (Meteor.isCordova) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
  },

  showKeyboardAccessoryBar: function () {
    if (Meteor.isCordova) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
  },

  disableScroll: function () {
    if (Meteor.isCordova) {
      cordova.plugins.Keyboard.disableScroll(true);
    }
  },

  enableScroll: function () {
    if (Meteor.isCordova) {
      cordova.plugins.Keyboard.disableScroll(false);
    }
  },
  _reFocus: false,
  reFocusOn: function(el) {
    IonKeyboard._reFocus = true;
    el.focus();
  }
};

window.addEventListener('native.keyboardshow', function (event) {
  var keyboardHeight = event.keyboardHeight;
  $('body').addClass('keyboard-open');

  if(Platform.isIOS()) {

    if(!IonKeyboard._reFocus) {
      //Attach any elements that want to be attached
      $('[data-keyboard-attach="true"]').each(function (index, el) {
        $(el).data('ionkeyboard.bottom', $(el).css('bottom'));

        //$(el).velocity({ bottom: keyboardHeight}, { queue: false, duration: IonKeyboard.transisionsDuration, easing: "easeInQuint" });
        $(el).css({bottom: keyboardHeight});
      });

      // Move the bottom of the content area(s) above the top of the keyboard
      $('.content.overflow-scroll').each(function (index, el) {
        $(el).data('ionkeyboard.bottom', $(el).css('bottom'));

        $(el).velocity({ bottom: keyboardHeight + 10}, { duration: IonKeyboard.transisionsDuration, easing: IonKeyboard.transitionsIn });
      });

      $('.content.overflow-scroll').on('focus', 'input,textarea', function(event) {
        var contentOffset = $(event.delegateTarget).offset().top;
        var padding = 10;
        var scrollTo = $(event.delegateTarget).scrollTop() + $(this).offset().top - (contentOffset + padding);

        $('html').velocity('scroll', {
          container: $(event.delegateTarget),
          offset: srollTo,
          duration: IonKeyboard.transisionsDuration,
          easing: IonKeyboard.transitionsIn
        });

      });

    } else {
      IonKeyboard._reFocus = false;
    }

  }
});

window.addEventListener('native.keyboardhide', function (event) {

  if(Platform.isIOS()) {

    if(!IonKeyboard._reFocus) {
      $('body').removeClass('keyboard-open');

      // Detach any elements that were attached
      $('[data-keyboard-attach="true"]').each(function (index, el) {
        $(el).velocity({ bottom: $(el).data('ionkeyboard.bottom') }, { duration: IonKeyboard.transisionsDuration, easing: IonKeyboard.transitionsOut });
      });

      // Reset the content area(s)
      $('.content.overflow-scroll').each(function (index, el) {
        $(el).velocity({ bottom: $(el).data('ionkeyboard.bottom') }, { duration: IonKeyboard.transisionsDuration, easing: IonKeyboard.transitionsOut });
      });
    }
  }

});


window.addEventListener('native.keyboardchange', function (event) {
  var keyboardHeight = event.keyboardHeight;
  console.log(keyboardHeight);
});
