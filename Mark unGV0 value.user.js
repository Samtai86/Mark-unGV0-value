// ==UserScript==
// @name         mark unGV0 value
// @namespace    mark_ungv0_value
// @version      1
// @description  try to reduce a miss of mapping the unGV0 values
// @author       ushentai@
// @match        https://enumeration-discovery*.amazon.com/*
// @include     https://enumeration-discovery*.amazon.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://gist.github.com/BrockA/2625891/raw/waitForKeyElements.js
// @downloadURL  https://drive.corp.amazon.com/view/GCO%20Tools/mark_ungv0_value.user.js
// @updateURL    https://drive.corp.amazon.com/view/GCO%20Tools/mark_ungv0_value.user.js
// @run-at       document-start
// ==/UserScript==


(function() {
  'use strict';

  waitForKeyElements('.search-results', refresh);

  function refresh() {
  var isSynOrValid = false;

$('td').filter(function() {
  var tabIndex = $(this).attr('tabindex');

  if (tabIndex % 8 === 3) {
    var spanText = $(this).find('span').text().trim();
    isSynOrValid = spanText.match(/^(Synonym|Valid)$/i);
  }
  else if (tabIndex % 8 === 0) {
    var divText = $(this).find('div').text().trim();

    if (divText > '0.0' && !$(this).find('span').text().match(/^(Synonym|Valid)$/i) && !isSynOrValid) {
      $(this).closest('tr').css('background-color', '#F0F8FF'); //change color by deleting #F0F8FF and type the color codes https://htmlcolorcodes.com/
    }
  }
});

  }

  var amstypeinterval = window.setInterval(function(){
    refresh();
  }, 600);

})();
