// 顶部可拖拽/点击滚动进度条
$(function() {
  var $progress = $('#progress');
  var $line = $progress.find('.line');
  var dragging = false;

  function updateProgress() {
    var pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var scrollAvail = pageHeight - windowHeight;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var ratio = scrollAvail > 0 ? (scrollTop / scrollAvail) * 100 : 0;
    $line.css('width', ratio + '%');
  }

  $(window).scroll(updateProgress);

  function scrollToPosition(e) {
    var pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var scrollAvail = pageHeight - windowHeight;
    var clickX = e.clientX - $progress.offset().left;
    var barWidth = $progress.width();
    var ratio = Math.max(0, Math.min(1, clickX / barWidth));
    window.scrollTo({ top: ratio * scrollAvail, behavior: 'smooth' });
  }

  // 点击跳转
  $progress.on('click', function(e) {
    if (!dragging) scrollToPosition(e);
    dragging = false;
  });

  // 拖拽
  $progress.on('mousedown', function(e) {
    dragging = true;
    scrollToPosition(e);
    e.preventDefault();
  });

  $(document).on('mousemove', function(e) {
    if (dragging) scrollToPosition(e);
  }).on('mouseup', function() {
    dragging = false;
  });

  updateProgress();
});
