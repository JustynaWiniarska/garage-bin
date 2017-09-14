$(document).ready(() => {
  fetchAllItems();
})


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

const appendItemNames = (folders) => {
  folders.map(folder => {
     $('#items-list').append(
      `<h4>${folder.name}</h4>`
     )
  })
}
