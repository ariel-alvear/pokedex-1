// https://pokeapi.co/api/v2/pokemon/ url de primeros 20
// "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20" URL para los siguientes 20

$(document).ready(function(){
    function requestApi() {
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon/',
            context: document.body,
            method: 'GET',
            success: function(response){ 
                var n = 1
                response.results.forEach(function(info){
                    let details = `<div class='container col-md-4 '>
                    <div class="card mb-5 mt-5 pt-5 pb-5" style="width: 18rem;">
                    <img id='current-${n}' class='card-img-top' alt='error' width='100' height='100'>
                    <div class="card-body">
                      <h1 class="card-title">${info.name}</h1>
                      <a id='enlace-${n}' href="#" url="${info.url}" class="btn btn-primary">¡Quiero ver más de este pokémon!</a>
                    </div>
                  </div> 
                  </div>`
                  $('#info').append(details);
                  n = n + 1;
                })
            }
        })
    }
    requestApi();
})    