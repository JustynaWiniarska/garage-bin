$(document).ready(() => {
  fetchAllItems();
})

// Garage door opening/closing:
$('#door').on('click', () => {
  $('.img-container').fadeOut();
  $('.garage-items').fadeIn(1000);
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
   `<button id='show-more'>${item.name}</button>
   <div id="details" class="hide">
    <p>Reason for storing: ${item.reason}</p>
    <p>Level of cleanliness: ${item.cleanliness}</p>
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

  $(e.target).parent().find('#details').removeClass('hide')
})
