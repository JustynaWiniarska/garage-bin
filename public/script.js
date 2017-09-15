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
   `<div>
      <button id='show-more' class="item">${item.name}</button>
      <div id="details" class="hide">
        <p><b>Reason for storing:</b> ${item.reason}</p>
        <p><b>Level of cleanliness:</b> ${item.cleanliness}</p>
     </div>
    </div>
   `
  )
}

const appendAllItemNames = (items) => {
  for (let i=0; i<items.length; i++){
    appendItemName(items[i])
  }
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
  e.preventDefault();

  postItem()
})
