const lista = [];
const url = ('http://34.73.4.188:5001/api/v1/status/');
const urlPlaces = ('http://34.73.4.188:5001/api/v1/places_search/')

function adds(str, add, remove, lista) {
  if (add != false) {
    lista.push(str);
  } else if (remove != false){
    for (let trav = 0; trav < str.length; trav++) {
      if (lista[trav] == str) {
        lista.splice(trav, 1);
      }
    }
  }
}

function statusApi() {
 $.get(url, (req) => {
   if (req.status == 'OK') {
    $('#api_status').addClass('available');
   } else {
    $('#api_status').removeClass('available');
   }
 });
}

function renderiza() {
  $.ajax({
    url: urlPlaces,
    contentType: "application/json",
    type: "POST",
    data: "{}",
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        let owner = getOwner(data[i].user_id)
        $('section.places').append(placesHtml(data[i]))
      }
    }
  })
}

function getOwner(user_id) {
  let url = ('http://34.73.4.188:5001/api/v1/users/');
  let urlUserId= url + user_id;
  let email;

  $.get(urlUserId, (req) => {
    email = req.email;
    console.log(email)
  })

  console.log(email)
  return email;
}

function placesHtml(obj) {
  const html = [];
  const owner = getOwner(obj.user_id);
  console.log(owner);
  html.push('<article>')
  html.push('<div class="title">')
  html.push(`<h2>${obj.name}</h2>`)
  html.push('<div class="price_by_night">')
  html.push(`${obj.price_by_night}`)
  html.push('</div>')
  html.push('</div>')
  html.push('<div class="information">')
  html.push('<div class="max_guest">')
  html.push('<i class="fa fa-users fa-3x" aria-hidden="true"></i>')
  html.push('<br/>')
  html.push(`${obj.max_guest}`)
  html.push('</div>')
  html.push('<div class="number_rooms">')
  html.push('<i class="fa fa-bed fa-3x" aria-hidden="true"></i>')
  html.push('<br />')
  html.push(`${obj.number_rooms}`)
  html.push('</div>')
  html.push('<div class="number_bathrooms">')
  html.push('<i class="fa fa-bath fa-3x" aria-hidden="true"></i>')
  html.push('<br />')
  html.push(`${obj.number_bathrooms}`)
  html.push('</div>')
  html.push('</div>')
  html.push('<div class="user">')
  html.push(`<strong>Owner: ${owner}</strong>`)
  html.push('</div>')
  html.push('<div class="description">')
  html.push(`${obj.description}`)
  html.push('</div>')
  html.push('</article>')
  html.push('</section>')
  return html.join('');
}

$(document).ready( function () {
  $('.amenities input').on('change', function (event) {
    name = $(this).data('name');
    if($(this)[0].checked == true) {
      adds(name, true, false, lista);
    } else if ($(this)[0].checked == false) {
      adds(name, false, true, lista);
    }
    $('.amenities h4').text(lista.join(', '));
  })
  statusApi();
  renderiza();
})
