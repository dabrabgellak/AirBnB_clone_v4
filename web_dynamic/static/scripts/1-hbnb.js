const lista = []

function adds(str, add, remove, lista) {
  if (add != false) {
    lista.push(str);
    console.log(lista)
  } else if (remove != false){
    for (let trav = 0; trav < str.length; trav++) {
      if (lista[trav] == str) {
        lista.splice(trav, 1);
      }
    }
  }
}

$(document).ready( function () {
  $('.amenities input').on('change', function (event) {
    name = $(this).data('name');
    if($(this)[0].checked == true) {
      adds(name, true, false, lista);
    } else if ($(this)[0].checked == false) {
      adds(name, false, true, lista);
    }
    console.log(lista)
  $('.amenities h4').text(lista.join(', '));
  })
})
