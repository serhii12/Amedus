$(() => {
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

  let counter = 0;
  // Will take id for lookup
  const arrayOfOrderInfo = [];
  function addItemsToTheCart() {
    // add to cart coutner everytime item has been clicked
    counter += 1;
    arrayOfOrderInfo.push(this.parentNode.getAttribute('data-id'));
    $('.cartcount').html(counter);
  }

  $('.nav__menu__item__link').click(e => {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/checkout',
      data: { orderInfo: arrayOfOrderInfo },
      success: () => {
        window.location.href = 'http://localhost:8080/checkout';
      },
    });
  });

  const buttons = document.querySelectorAll('.menu__item-add');
  buttons.forEach(button =>
    button.addEventListener('click', addItemsToTheCart)
  );

  // Remove elemet on checkout page
  $('.menu__item').on('click', 'a', function() {
    const toDoListItem = $(this).parent();
    toDoListItem.remove();
  });
});
