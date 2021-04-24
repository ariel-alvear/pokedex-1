// https://pokeapi.co/api/v2/pokemon/ url de primeros 20
// "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20" URL para los siguientes 20

$(document).ready(function(){
    function requestApi() {
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon/',
            context: document.body,
            method: 'GET',
            success: function(response){
                console.log(response);
            }
        })
    }
});
