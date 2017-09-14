

$('#door').on('click', () => {
  $('.img-container').fadeOut();
  $('.garage-items').fadeIn(4000);
})

$('#close-door').on('click', () => {
  $('.garage-items').remove();
  $('.img-container').fadeIn(3000);
})
