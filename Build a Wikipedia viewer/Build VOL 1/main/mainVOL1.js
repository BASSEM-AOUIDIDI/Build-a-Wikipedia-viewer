
const $ = window.$
function searchToggle (obj, evt) {
  var container = $(obj).closest('.search-wrapper')

  if (!container.hasClass('active')) {
    container.addClass('active')
    evt.preventDefault()
  } else if (container.hasClass('active') && $(obj).closest('.input-holder').length === 0) {
    container.removeClass('active')
                  // clear input
    container.find('.search-input').val('')
                  // clear and hide result container when we press close
    container.find('.result-container').fadeOut(100, function () { $(this).empty() })
  }
}

var main = function () {
  $('form').submit(function (event) {
    console.log('search-input')
    $('.result-container').html('')
    var $input = $('input')
    var comment = $input.val()
    $.getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=' + comment + '&prop=info&inprop=url&callback=?', function (data) {
      console.log(data)
      // if (data.query.searchinfo.totalhits === 0) {
      //   $('.result-container').append("<div class='effect'>No result found. Please try again.</div>")
      // } else {
      //   for (var i = 0; i < 9; i++) {
      //     var caption = data.query.search[i].title
      //     var url = caption.replace(/ /g, '_')
      //     $('.result-container').append("<div class='effect'><a href='https://en.wikipedia.org/wiki/" + url + "' target='_blank'>" + caption + "</a>" + "<br>" + data.query.search[i].snippet + "</div>" + "<br>")
      //   }
      // }
    })
    $('.search-input').val('')

    return false
  })
}

$(document).ready(main)

