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
    $('.cartcount').html(counter);
  }
}

function storeTaskInLocalStorage(id) {
  if (!itemCart[id]) {
    itemCart[id] = 1;
    counter += 1;
  } else {
    counter += 1;
    itemCart[id] += 1;
  }
  $('.cartcount').html(counter);
}
// Will take id for lookup
function addItemsToTheCart() {
  // add to cart coutner everytime item has been clicked
  storeTaskInLocalStorage(this.parentNode.getAttribute('data-id'));
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

  $('.nav__menu__item__link').click(e => {
    e.preventDefault();
    localStorage.setItem('ids', JSON.stringify(itemCart));
    localStorage.setItem('counter', JSON.stringify(counter));
    $.ajax({
      type: 'post',
      url: '/checkout',
      data: itemCart,
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
    // removeTaskFromLocalStorage(this.parentNode.getAttribute('data-id'));
    // toDoListItem.remove();
  });

  console.log(itemCart);
  const addQty = id => {
    // Lookup itemCart id
    // const qty = itemCart[id];
    // $('.counter').html(qty);
    // $('.id').click(() => {
    //   counter--;
    //   $('.counter').html(counter);
    // });
    // $('').click(() => {
    //   counter++;
    //   $('.counter').html(counter);
    // });
    // id id="add"
    // id id="subtract"
    // this.parentNode.getAttribute('data-id')
  };

  // Remove from LS
  // function removeTaskFromLocalStorage(id) {
  //   if (itemCart[id]) {
  //     itemCart[id] -= 1;
  //     counter -= 1;
  //   }
  // }
});
