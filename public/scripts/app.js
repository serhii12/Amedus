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

  const form = $('.hideJS');
  const confirmOrder = $('.btn-checkout');
  // Hide form
  form.hide();

  confirmOrder.click(() => {
    form.slideToggle();
  });

  function storeIdForTheCart() {
    const id = this.parentNode.getAttribute('data-id');
    $.ajax({
      type: 'post',
      url: 'cart/addItem',
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

  function removeElement(id) {
    $.ajax({
      type: 'post',
      url: 'cart/removeElement',
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
    const itemID = this.parentNode.getAttribute('data-id');
    const price = $('.menu__item-price');
    const elemenToChangePrice = $(this)
      .parent()
      .find(price);
    $.ajax({
      type: 'post',
      url: 'cart/addItem',
      data: { id: itemID },
      success(response) {
        $(`.${itemID}counter`).text(response.itemQty);
        elemenToChangePrice.text(
          `$${(response.itemQty * (response.unitPrice / 100)).toFixed(2)}`
        );
      },
    });
  }

  const addButtons = document.querySelectorAll('.addQty');
  addButtons.forEach(button => button.addEventListener('click', addQty));

  function removeQty() {
    const itemID = this.parentNode.getAttribute('data-id');
    const elementToRemove = $(this).parent();
    const price = $('.menu__item-price');
    const elemenToChangePrice = $(this)
      .parent()
      .find(price);
    $.ajax({
      type: 'post',
      url: 'cart/removeItem',
      data: { id: itemID },
      success: response => {
        if (!response.itemQty) {
          elementToRemove.remove();
        }
        $(`.${itemID}counter`).text(response.itemQty);
        elemenToChangePrice.text(`
          $${(response.itemQty * (response.unitPrice / 100)).toFixed(2)}
        `);
      },
    });
  }

  const minusButtons = document.querySelectorAll('.minusQty');
  minusButtons.forEach(button => button.addEventListener('click', removeQty));

  const card = new Card({
    form: 'form',
    container: '.card-wrapper',

    formSelectors: {
      nameInput: 'input[name="firstname"], input[name="lastname"]',
      numberInput: 'input[name="number"]',
      expiryInput: 'input[name="expiry"]',
      cvcInput: 'input[name="cvc"]',
    },
    width: 350, // optional — default 350px
    // Default placeholders for rendered fields - optional
    placeholders: {
      number: '•••• •••• •••• ••••',
      name: 'Full Name',
      expiry: '••/••',
      cvc: '•••',
    },
    masks: {
      cardNumber: '•', // optional - mask card number
    },
  });
});
