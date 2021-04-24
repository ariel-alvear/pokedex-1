// https://pokeapi.co/api/v2/pokemon/ url de primeros 20
// "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20" URL para los siguientes 20

$(document).ready(function(){
    function requestApi(pokemon) {
        var respuesta
        $.ajax({
            url: pokemon,
            context: document.body,
            method: 'GET',
            success: function(response){
                var n = 1
                respuesta = response
                response.results.forEach(function(info){
                    let details = `<div class='container col-md-4 pokemon'>
                    <div class="card mb-5 mt-5 pt-5 pb-5" style="width: 18rem;">
                    <div class="card-body">
                      <h1 class="card-title">${info.name}</h1>
                      <a id='enlace-${n}' href="#" url="${info.url}" class="btn btn-primary pokemodal">¡Quiero ver más de este pokémon!</a>
                    </div>
                  </div>
                  </div>`
                  $('#info').append(details);
                  n = n + 1;
                })
                next_url = response.next
                back_url = response.previous
                if (back_url == null){
                  $('#btn_back').hide()
                } else {
                  $('#btn_back').show()
                }
                let nextAdress = `<a id='pokeparagraph' href="${response.next}">Ver los otros pokemones</a>`
                $('#next-button').append(nextAdress)
                console.log(nextAdress)

                $('.pokemodal').click(function(e){
                  e.preventDefault();
                  let new_url = ($(this).attr('url'));
                  $('#url-pokemon-modal').html(new_url);
                  $.ajax({
                    url: new_url,
                    context: document.body,
                    method: 'GET',
                    beforeSend: function(){
                      $('.erase-before-send').empty()
                    },
                    success: function(response){ 
                      response.abilities.forEach(function(abi){ 
                        $("#abilityPokemon").append("<p class='list-ability'>"+abi.ability.name.charAt(0).toUpperCase()+abi.ability.name.substr(1).toLowerCase()+"</p>")
                        })
                    }
                  });
                  $('#myModal').modal('show');
                });
            }
        })
        console.log(respuesta)
    }
    var back_url
    var next_url
    requestApi('https://pokeapi.co/api/v2/pokemon/');



    function activeButton (){
        $('#btn').click(function(){
            $('#info').empty('.pokemon')
            $('#pokeparagraph').remove()
            requestApi(next_url)
        });
        $('#btn_back').click(function(){
          $('#info').empty('.pokemon')
          $('#pokeparagraph').remove()
          requestApi(back_url)
        });
    };
    activeButton()
});
