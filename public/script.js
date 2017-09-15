$(document).ready(() => {
  fetchAllItems();
})

// Garage door opening/closing:
$('#door').on('click', () => {
  $('.img-container').fadeOut();
  $('.garage-items').fadeIn(3000);
})

$('#close-door').on('click', () => {
  $('.garage-items').remove();
  $('.img-container').fadeIn(3000);
})

const fetchAllItems = () => {
  fetch('/api/v1/items')
  .then(res => res.json())
  .then(data => {
    appendAllItemNames(data)
  })
  .catch(error => console.log('Error fetching items: ', error))
}

const appendItemName = (item) => {
  $('#items-list').append(
   `<div class="garage-item">
      <button name="${item.name}" id='show-more' class="item">${item.name}</button>
      <div id="details" class="hide">
        <p><b>Reason for storing:</b> ${item.reason}</p>
        <p><b>Level of cleanliness:</b> ${item.cleanliness}</p>
     </div>
    </div>
   `
  )
}

const appendAllItemNames = (items) => {
  let counter = 0
  for (let i=0; i<items.length; i++){
    appendItemName(items[i])
    counter ++
  }
  countNumber(counter)
}

const countNumber = (No) => {
  $('#number').append(
    `<p>${No}</p>`
  )
}


$('#items-list').on('click', '#show-more', function(e) {
  $(e.target).parent().find('#details').toggleClass('hide')
})

const postItem = (item) => {
  const itemName = $('#name').val();
  const reason = $('#reason').val();
  const cleanliness = $('#cleanliness').val();

  fetch('/api/v1/items', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: itemName, reason: reason, cleanliness: cleanliness})
  })
  .then(res => res.json())
  .then( data => {
    appendItemName(data.id)
  })
  .catch(error => console.log('Error posting link: ', error))
}

$('#add-new').on('click', (e) => {
  const itemName = $('#name');
  const reason = $('#reason');

  e.preventDefault();

  postItem();
  itemName.val('');
  reason.val('');
})

//sort alphabetically
const sortAlphabetically = () => {
  // const items = $('.garage-item')
  const items = $('#items-list').find('.garage-item').get()
  // ********************* not working ******************
  console.log(items)



}

$('#sort').on('click', () => {
  sortAlphabetically()
})
