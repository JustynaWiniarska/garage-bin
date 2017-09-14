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
    console.log(data)
    appendAllItemNames(data)
  })
  .catch(error => console.log('Error fetching items: ', error))
}

const appendItemName = (item) => {
  $('#items-list').append(
   `<button id='show-more'>${item.name}</button>`
  )
}

const appendAllItemNames = (items) => {
  for (let i=0; i<items.length; i++){
    appendItemName(items[i])
  }
}

const fetchOneItem = (id) => {
  fetch(`/api/v1/items/${id}`)
    .then(res => res.json())
    .then(item => {
      console.log(item)
      appendItemDetails(item)
    })
}

const appendItemDetails = (item) => {
  $('#item-details').empty();
  $('#item-details').append(
    `<div>
      <p>${item.reason}</p>
      <p>${item.cleanliness}</p>
    </div>
    `
  )
  console.log('reason',  item.reason)
}


$('#items-list').on('click', '#show-more', (id) => {
  fetchOneItem(id)
})
