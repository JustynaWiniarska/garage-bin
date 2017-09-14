$(document).ready(() => {
  fetchAllItems();
})

// Garage door opening/closing:
$('#door').on('click', () => {
  $('.img-container').fadeOut();
  $('.garage-items').fadeIn(4000);
})

$('#close-door').on('click', () => {
  $('.garage-items').remove();
  $('.img-container').fadeIn(3000);
})


const fetchAllItems = () => {
  fetch('/api/v1/items')
  .then(res => res.json())
  .then(data => {
    appendItemNames(data)
  })
  .catch(error => console.log('Error fetching items: ', error))
}

const appendItemNames = (items) => {
  items.map(item => {
     $('#items-list').append(
      `<button id='show-more'>${item.name}</button>`
     )
  })
}

$('#items-list').on('click', '#show-more', () => {
  $('#item-details').append(
    `<div>Details</div>`
  )
})
