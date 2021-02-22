$(document).ready(function () {
  $('.toc-container .toc-title a').on('click', function () {
    $('.toc-container .toc-content').toggle('normal', function () {
      var display = $(this).css('display')
      if (display === 'none') {
        $('.toc-container .toc-title a').text('[显示]')
      } else {
        $('.toc-container .toc-title a').text('[隐藏]')
      }
      console.log()
    })
  })
})