var main = function() {

  $('form').submit(function(event) {
    $('#result').html('')
    var $input = $(event.target).find('input');
    var comment = $input.val();
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=" + comment + "&prop=info&inprop=url&callback=?", function(json) {
      if (json.query.searchinfo.totalhits === 0) {
        $('#result').append("<div class='effect'>No result found. Please try again.</div>")
      } else {
        for (var i = 0; i < 9; i++) {
          var caption = json.query.search[i].title;
          var url = caption.replace(/ /g, "_");
          $('#result').append("<div class='effect'><a href='https://en.wikipedia.org/wiki/" + url + "' target='_blank'>" + caption + "</a>" + "<br>" + json.query.search[i].snippet + "</div>" + "<br>")
        }
      }
    });
    $('.form-control').val("");

    return false;
  });
}

$(document).ready(main);