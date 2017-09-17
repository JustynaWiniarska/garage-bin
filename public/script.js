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

//fetching items and appending them to page
const fetchAllItems = () => {
  fetch('/api/v1/items')
  .then(res => res.json())
  .then(data => {
    appendAllItemNames(data)
  })
  .catch(error => console.log('Error fetching items: ', error))
}

const appendAllItemNames = (items) => {
  // const sortedList = items.sort((a, b) => {
  //   return b.name < a.name
  // })
  let counter = 0
  for (let i=0; i<items.length; i++){
    appendItemName(items[i])
    // appendItemName(sortedList[i])
    counter ++
  }
  countNumber(counter)
  countPerCleanliness(items)
}

const countNumber = (No) => {
  $('#number').append(
    `<p>${No}</p>`
  )
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

//A count of the number of items per each value of cleanliness (i.e. 5 items are sparkling, 2 are dusty, 3 are rancid).
const countPerCleanliness = (items) => {
  let cleanliness = {
    sparkling: 0,
    dusty: 0,
    rancid: 0
  }

  const checkCleanliness = items.map((item) => {
    cleanliness[item.cleanliness]++
  })

  $('#clean-level').empty();
  $('#clean-level').append(
    `<div>
      <h4 class="cleanliness-level">Cleanliness levels:</h4>
      <p><span class="level-span">Sparkling: </span>${cleanliness.sparkling}
         <span class="level-span">Dusty: </span>${cleanliness.dusty}
         <span class="level-span">Rancid: </span>${cleanliness.rancid}
      </p>
    </div>`
  )
}

//viewing item details
$('#items-list').on('click', '#show-more', function(e) {
  $(e.target).parent().find('#details').toggleClass('hide')
})

//adding new item
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
    // appendItemName(data.id)
    $('#items-list').empty()
    $('#number').empty()
    fetchAllItems()
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

//sorting items
$('#sort').on('click', function(){
  const items = $('.garage-item')

  const sorted = items.sort((a,b) => {
    return $(a).find('.item').prop('name').toLowerCase() > $(b).find('.item').prop('name').toLowerCase();
  });

  Object.keys(sorted).map(item => {
    $('#items-list').append(sorted[item])
  })

  $('#items-list').empty()
  $('#number').empty()
  appendAllItemNames(sorted)
});
