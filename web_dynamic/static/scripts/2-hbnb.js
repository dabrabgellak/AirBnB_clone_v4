const lista = [];
const url = ('http://34.73.4.188:5001/api/v1/status/');

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
})
