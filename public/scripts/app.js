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

  function storeIdForTheCart(id) {
    $.ajax({
      type: 'post',
      url: '/addItem',
      data: { id },
      success(response) {
        $('.cartcount').text(response.count);
      },
    });
  }
  // Will take id for lookup
  function addItemsToTheCart() {
    // add to cart coutner everytime item has been clicked
    storeIdForTheCart(this.parentNode.getAttribute('data-id'));
  }

  const buttons = document.querySelectorAll('.menu__item-add');
  buttons.forEach(button =>
    button.addEventListener('click', addItemsToTheCart)
  );

  // Remove from LS
  function removeElement(id) {
    // change to ajax post to remove item
    $.ajax({
      type: 'post',
      url: '/removeElement',
      data: { id },
    });
  }

  function removeIds(id) {
    $.ajax({
      type: 'post',
      url: '/removeElement',
      data: { id },
    });
  }
  // Remove elemet on checkout page
  $('.menu__item').on('click', 'a', function() {
    const checkoutCart = $(this).parent();
    removeElement(this.parentNode.getAttribute('data-id'));
    checkoutCart.remove();
  });

  function addQty() {
    const itemId = this.parentNode.getAttribute('data-id');
    $.ajax({
      type: 'post',
      url: '/addItem',
      data: { id: itemId },
      success(response) {
        $(`.${itemId}counter`).text(response.itemsQty);
      },
    });
  }

  function removeQty() {
    const itemId = this.parentNode.getAttribute('data-id');
    const elementToRemove = $(this).parent();
    $.ajax({
      type: 'post',
      url: '/removeItem',
      data: { id: itemId },
      success: response => {
        if (!response.itemsQty) {
          removeIds(itemId);
          elementToRemove.remove();
        }
        $(`.${itemId}counter`).text(response.itemsQty);
      },
    });
  }
  const addButtons = document.querySelectorAll('.addQty');
  addButtons.forEach(button => button.addEventListener('click', addQty));

  const minusButtons = document.querySelectorAll('.minusQty');
  minusButtons.forEach(button => button.addEventListener('click', removeQty));
});
