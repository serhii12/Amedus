$(() => {
  console.log('Ready to go');
  // Smooth Scrolling
  $('.menu__selection__items__item a, .main-header__center__order a').on(
    'click',
    function(event) {
      if (this.hash !== '') {
        event.preventDefault();

        const hash = this.hash;

        $('html, body').animate(
          {
            scrollTop: $(hash).offset().top,
          },
          800,
          () => {
            window.location.hash = hash;
          }
        );
      }
    }
  );
});
