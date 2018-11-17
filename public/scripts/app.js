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

  function storeIdForTheCart() {
    const id = this.parentNode.getAttribute('data-id');
    $.ajax({
      type: 'post',
      url: '/addItem',
      data: { id },
      success(response) {
        $('.cartcount').text(response.count);
      },
    });
  }

  const buttons = document.querySelectorAll('.menu__item-add');
  buttons.forEach(button =>
    button.addEventListener('click', storeIdForTheCart)
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
  // Remove elemet on checkout page
  $('.menu__item').on('click', 'a', function() {
    const checkoutCart = $(this).parent();
    removeElement(this.parentNode.getAttribute('data-id'));
    checkoutCart.remove();
  });

  function addQty() {
    const itemId = this.parentNode.getAttribute('data-id');
    const price = $('.menu__item-price');
    const elemenToChangePrice = $(this)
      .parent()
      .find(price);
    $.ajax({
      type: 'post',
      url: '/addItem',
      data: { id: itemId },
      success(response) {
        $(`.${itemId}counter`).text(response.itemsQty);
        elemenToChangePrice.text(
          `$${(response.itemsQty * (response.unitPrice / 100)).toFixed(2)}`
        );
      },
    });
  }

  function removeQty() {
    const itemId = this.parentNode.getAttribute('data-id');
    const elementToRemove = $(this).parent();
    const price = $('.menu__item-price');
    const elemenToChangePrice = $(this)
      .parent()
      .find(price);
    $.ajax({
      type: 'post',
      url: '/removeItem',
      data: { id: itemId },
      success: response => {
        if (!response.itemsQty) {
          elementToRemove.remove();
        }
        $(`.${itemId}counter`).text(response.itemsQty);
        elemenToChangePrice.text(`
          $${(response.itemsQty * (response.unitPrice / 100)).toFixed(2)}
        `);
      },
    });
  }
  const addButtons = document.querySelectorAll('.addQty');
  addButtons.forEach(button => button.addEventListener('click', addQty));

  const minusButtons = document.querySelectorAll('.minusQty');
  minusButtons.forEach(button => button.addEventListener('click', removeQty));
});
