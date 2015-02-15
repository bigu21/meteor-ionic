IonKeyboard = {
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
  }
};


var durationTime = 200;

window.addEventListener('native.keyboardshow', function (event) {
  var keyboardHeight = event.keyboardHeight;
  IonKeyboard.disableScroll();
  IonKeyboard.hideKeyboardAccessoryBar();

  // Hide any elements that want to be hidden
  $('.hide-on-keyboard-open').hide();

  //Attach any elements that want to be attached
  $('[data-keyboard-attach="true"]').each(function (index, el) {
    $(el).data('ionkeyboard.bottom', $(el).css('bottom'));

    //$(el).velocity({ bottom: keyboardHeight}, { queue: false, duration: durationTime, easing: "easeInQuint" });
    $(el).css({bottom: keyboardHeight});
  });

  $('.content.overflow-scroll').each(function (index, el) {
    $(el).data('ionkeyboard.bottom', $(el).css('bottom'));

    $(el).velocity({ bottom: keyboardHeight + 10}, { duration: durationTime, easing: "easeInQuint" });
  });

  $('.content.overflow-scroll').on('focus', 'input,textarea', function(event) {
    var scrollTo = ($(this).offset().top - $(event.delegateTarget).offset().top) - 10;
    console.log(scrollTo);

     $('html').velocity('scroll', {
        container: $(event.delegateTarget),
        offset: srollTo,
        duration: durationTime,
        easing: "easeInQuint"
     });

  });
});

window.addEventListener('native.keyboardhide', function (event) {
  //IonKeyboard.enableScroll();

   //Show any elements that were hidden
  $('.hide-on-keyboard-open').show();

  // Detach any elements that were attached
  $('[data-keyboard-attach="true"]').each(function (index, el) {
    $(el).velocity({ bottom: $(el).data('ionkeyboard.bottom') }, { duration: durationTime, easing: "easeInQuint" });
    //$(el).css({bottom: $(el).data('ionkeyboard.bottom')});
  });

  // Reset the content areas
  $('.content.overflow-scroll').each(function (index, el) {
    $(el).velocity({ bottom: $(el).data('ionkeyboard.bottom') }, { duration: durationTime, easing: "easeInQuint" });
    //$(el).css({bottom: $(el).data('ionkeyboard.bottom')});
  });
});
