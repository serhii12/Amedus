// On Document load call functions which will check local storage for any ids
document.addEventListener('DOMContentLoaded', getIds);
// Set counter
let counter;
let itemCart;

// Get Ids of the items in the local storage
function getIds() {
  // Check if local storage doesn't exists
  if (localStorage.getItem('ids') === null) {
    // if not not make cartItems empty object
    itemCart = {};
    counter = 0;
  } else {
    // if localStorage.getItem('ids') is not NULL meaning we have previusly saved id's
    // Then set cartItems to the array of ids
    itemCart = JSON.parse(localStorage.getItem('ids'));
    // Also set coutner to length of that array
    counter = JSON.parse(localStorage.getItem('counter'));
    // And show the counter on the page
    $('.cartcount').text(counter);
  }
}

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

  // $('.nav__menu__item__link').click(e => {
  //   e.preventDefault();
  //   localStorage.setItem('ids', JSON.stringify(itemCart));
  //   localStorage.setItem('counter', JSON.stringify(counter));
  //   $.ajax({
  //     type: 'get',
  //     url: '/checkout',
  //     data: itemCart,
  //     // success: () => {
  //     //   window.location.href = 'http://localhost:8080/checkout';
  //     // },
  //   });
  // });

  function storeIdForTheCart(id) {
    $.ajax({
      type: 'post',
      url: '/addItem',
      data: { id },
      success(response) {
        console.log('Counter ');
      },
    });
    // if (!itemCart[id]) {
    //   itemCart[id] = 1;
    //   counter += 1;
    // } else {
    //   counter += 1;
    //   itemCart[id] += 1;
    // }
    $('.cartcount').text(counter);
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
  function removeIdsFromLocalStorage(id) {
    // change to ajax post to remove item
    delete itemCart[id];
    localStorage.setItem('ids', JSON.stringify(itemCart));
    localStorage.setItem('counter', JSON.stringify(counter));
  }
  // Remove elemet on checkout page
  $('.menu__item').on('click', 'a', function() {
    const checkoutCart = $(this).parent();
    removeIdsFromLocalStorage(this.parentNode.getAttribute('data-id'));
    checkoutCart.remove();
  });

  function addQty() {
    const itemId = this.parentNode.getAttribute('data-id');
    itemCart[itemId] += 1;
    counter += 1;
    $(`.${itemId}counter`).text(itemCart[itemId]);
    $.ajax({
      type: 'post',
      url: '/addItem',
      data: { id: itemId },
      success(response) {
        console.log('Counter ');
      },
    });
    // localStorage.setItem('ids', JSON.stringify(itemCart));
    // localStorage.setItem('counter', JSON.stringify(counter));
  }
  function removeQty() {
    const itemId = this.parentNode.getAttribute('data-id');
    const elementToRemove = $(this).parent();
    itemCart[itemId] -= 1;
    if (itemCart[itemId] === 0) {
      removeIdsFromLocalStorage(itemId);
      elementToRemove.remove();
    }
    counter -= 1;
    $(`.${itemId}counter`).text(itemCart[itemId]);
    localStorage.setItem('ids', JSON.stringify(itemCart));
    localStorage.setItem('counter', JSON.stringify(counter));
  }
  const addButtons = document.querySelectorAll('.addQty');
  addButtons.forEach(button => button.addEventListener('click', addQty));

  const minusButtons = document.querySelectorAll('.minusQty');
  minusButtons.forEach(button => button.addEventListener('click', removeQty));
});
