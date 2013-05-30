var simpleInput = '<input type="text" name="firstName" placeholder="First name" />'
  , $input;
  
module("defaults", {
  setup: function () {
    $input = $(simpleInput);
    $('#qunit-fixture').append($input);
    $input.placeover(); // Initialize with defaults
    
  },
  teardown: function () {
    $input.remove();
    $input = null;
  }
});

test("displays text after initializing blank input", function () {
  ok(textVisible($input), "Text to be visible");
});

test("does not display after intializing filled input", function () {
  var $filledInput = $(simpleInput);
  $filledInput.val('value');
  $filledInput.placeover();
      
  ok(textNotVisible($filledInput));
});

test("hides text when setting value to input", function () {
  $input.val('value');
  ok(textNotVisible($input));
});

test("displays text on input focus", function () {
  $input.trigger('focus');
  ok(textVisible($input))
});

/*test("hides text when typing", function () {
  var e = $.Event('keydown');
  e.which = 65;
  ok(textVisible($input));
  $input.trigger(e);
  ok(textNotVisible($input));
});*/

test("displays text when input is empty", function () {
  $input.val('A').val('');
  ok(textVisible($input));
});

test("displays text on input blur", function () {
  
  $input.blur();
  ok(textVisible($input));
  
});

test("sets the input value", function () {
  
  ok(textVisible($input));
  $input.val('value');
  ok(textNotVisible($input));
  
});

test("updates the input value", function () {
  
  $input.val('value');
  ok(textNotVisible($input));
  $input.val('value2');
  ok(textNotVisible($input));
  
});

test("clears the input value", function () {
  
  $input.val('value');
  ok(textNotVisible($input));
  $input.val('');
  ok(textVisible($input));
  
});

test("updates the placeover text", function () {
  
  $input.placeover('text', 'new placeholder');
  strictEqual('new placeholder', getText($input).text(), "Text to be updated"); 
      
});

module("explicit invocation", {
  setup: function () {
    $input = $(simpleInput);
    $('#qunit-fixture').append($input);
    $input.placeover({ explicit: true });
  },
  teardown: function () {
    $input.remove();
    $input = null;
  }
});

test("appears on show", function () {
  $input.placeover('hide');
  ok(textNotVisible($input), "Text to be hidden");
  $input.placeover('show');
  ok(textVisible($input), "Text to be visible");
});

test("disappears on hide", function () {
  ok(textVisible($input), "Text to be visible");
  $input.placeover('hide');
  ok(textNotVisible($input), "Text to be hidden")
});
  
module("eventing", {
  setup: function () {
    $input = $('<input />');
    $('#qunit-fixture').append($input);
    $input.placeover({ explicit: true });
  },
  teardown: function() {
    $input.remove();
    $input = null;
  }
});

test("triggers show event before displaying text", function () {
  
  // Hide the placeover to start
  $input.placeover('hide');
  
  // Attach handler to show event
  $input.on('show.placeover', function () {
    ok(textNotVisible($input));
  });
  
  // Show placeover
  $input.placeover('show');
  
  ok(textVisible($input));
      
});

test("is not shown when prevented", function () {
  
  // Hide the placeover to start
  $input.placeover('hide');
  
  // Attach handler to event
  $input.on('show.placeover', function (e) {
    e.preventDefault();
  });
  
  // Show placeover
  $input.placeover('show');
  
  ok(textNotVisible($input), "Text to be prevented from showing");
  
});

test("is not hidden when prevented", function () {
  
  // Show the placeover to start
  $input.placeover('show');
  
  // Attache handler to event
  $input.on('hide.placeover', function (e) {
    e.preventDefault();
  });
  
  // Hide placeover
  $input.placeover('hide');
  
  ok(textVisible($input), "Text to still be visible");
  
});