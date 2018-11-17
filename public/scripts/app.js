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

//there is a potential to get rid of this code and feed it to the function above
  function addItemsToTheCart() {
    storeIdForTheCart(this.parentNode.getAttribute('data-id'));
  }

  const buttons = document.querySelectorAll('.menu__item-add');
  buttons.forEach(button =>
    button.addEventListener('click', addItemsToTheCart)
  );

  function removeElement(id) {
    $.ajax({
      type: 'post',
      url: '/removeElement',
      data: { id },
    });
  }

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
    console.log(elemenToChangePrice);
    $.ajax({
      type: 'post',
      url: '/addItem',
      data: { id: itemId },
      success(response) {
        $(`.${itemId}counter`).text(response.itemQty);
        elemenToChangePrice.text(`${elemenToChangePrice * response.itemQty}`);
      },
    });
  }

  const addButtons = document.querySelectorAll('.addQty');
  addButtons.forEach(button => button.addEventListener('click', addQty));

  function removeQty() {
    const itemID = this.parentNode.getAttribute('data-id');
    const elementToRemove = $(this).parent();
    $.ajax({
      type: 'post',
      url: '/removeItem',
      data: { id: itemID },
      success: response => {
        if (!response.itemQty) {
          elementToRemove.remove();
        }
        $(`.${itemID}counter`).text(response.itemQty);
      },
    });
  }

  const minusButtons = document.querySelectorAll('.minusQty');
  minusButtons.forEach(button => button.addEventListener('click', removeQty));

});
