var disneyArray = ['Lion King', 'Little Mermaid', 'Disney Princess', 'Mickey Mouse', 'Elsa', 'Simba', 'Buzz Lightyear', 'Maleficient', 'Eeyore', 'Jafar', 'Bambi', 'Peter Pan', 'Dumbo', 'Hercules'];

createButtons();

$('#disneyView').on('click', ".disneyAdd",function() {
	  var name = $(this).data('name');
	  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=10";

	  $.ajax({
	    url: queryURL,
	     method: 'GET'
	   })
 
		  .done(function(response) {

			    console.log(queryURL);
			    console.log(response)

			    var results = response.data;
			    $('#disneyGifs').empty();
			   
			   for (var i = 0; i < results.length; i++) {
						var disneyDiv = $('<div>');

			      var p = $('<p>').text("Rating: " + results[i].rating);

			      var disneyImage = $('<img>');
			      disneyImage.attr('src', results[i].images.fixed_height.url);
			      disneyImage.attr('data-still', results[i].images.fixed_height_still.url);
			      disneyImage.attr('data-animate', results[i].images.fixed_height.url);
			      disneyImage.attr('data-state', "animate");
			      disneyDiv.append(p);
			      disneyDiv.append(disneyImage);

			     	$('#disneyGifs').prepend(disneyDiv);
			      }

				});

		});

function createButtons(){ 
		$('#disneyView').empty();

		for (var i = 0; i < disneyArray.length; i++){
		    var a = $('<button>')
		    a.addClass('disneyAdd');
		    a.addClass('btn');
		    a.addClass('btn-info'); 
		    a.attr('data-name', disneyArray[i]);
		    a.text(disneyArray[i]);
		    $('#disneyView').append(a);
		}
	}

	$('#addDisney').on('click', function(){

		var disneyAdd = $('#disney-input').val().trim();
		$('#disney-input').val("");
		disneyArray.push(disneyAdd);	
		createButtons();
		return false;
	});


 $('#disneyGifs').on('click',function(event){
 	var state = $(event.target).attr('data-state'); 
   console.log(event.target,state);

  if ( state == 'still'){
    $(event.target).attr('src', $(event.target).data('animate'));
    $(event.target).attr('data-state', 'animate');
    }else{
     $(event.target).attr('src', $(event.target).data('still'));
     $(event.target).attr('data-state', 'still');
    }
	});
