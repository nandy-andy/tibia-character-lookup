define('ga', function () {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-62603241-1', 'auto');
  ga('set', 'checkProtocolTask', null);
  ga('set', {
    page: '/tibia-character-lookup/plugin-background-script',
    title: 'Tibia character lookup background script'
  });
  ga('send', 'pageview');

  return ga;
});
