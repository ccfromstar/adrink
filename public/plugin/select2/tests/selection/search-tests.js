module('Selection containers - Inline search');

var MultipleSelection = require('select2/selection/multiple');
var InlineSearch = require('select2/selection/search');

var $ = require('jquery');
var Options = require('select2/options');
var Utils = require('select2/utils');

var options = new Options({});

test('updating selection does not shift the focus', function (assert) {
  // Check for IE 8, which triggers a false negative during testing
  if (window.attachEvent && !window.addEventListener) {
    // We must expect 0 assertions or the test will fail
    expect(0);
    return;
  }

  var $container = $('#qunit-fixture .event-container');
  var container = new MockContainer();

  var CustomSelection = Utils.Decorate(MultipleSelection, InlineSearch);

  var $element = $('#qunit-fixture .multiple');
  var selection = new CustomSelection($element, options);

  var $selection = selection.render();
  selection.bind(container, $container);

  // Update the selection so the search is rendered
  selection.update([]);

  // Make it visible so the browser can place focus on the search
  $container.append($selection);

  var $search = $selection.find('input');
  $search.trigger('focus');

  assert.equal($search.length, 1, 'The search was not visible');

  assert.equal(
    document.activeElement,
    $search[0],
    'The search did not have focus originally'
  );

  // Trigger an update, this should redraw the search box
  selection.update([]);

  assert.equal($search.length, 1, 'The search box disappeared');

  assert.equal(
    document.activeElement,
    $search[0],
    'The search did not have focus after the selection was updated'
  );
});
