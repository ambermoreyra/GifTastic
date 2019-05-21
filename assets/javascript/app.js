
      // Initial array of movies
      var topics = ["mountain", "waterfall", "sunrise", "prairie", "beach", "forest", "rainbow", "moon", "river", "rocks"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayTopicInfo() {

        var topic = $(this).attr("data-nature");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          topic + "&api_key=TSUNPTa6z2tklGuh4PZEaPMuEogApupk&=10";
  
        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);


          var results = response.data;
          $("#theme-view").empty();
          for (var i = 0; i < 10; i++) {
            var info = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.original_still.url);
            gifImage.attr("data-animate", results[i].images.original.url);
            gifImage.attr("class", "gif");
            gifImage.attr("data-still", results[i].images.original_still.url);
            gifImage.attr("data-state", "still");
            $("#buttons-view").append(info);
  
            

          info.append(gifImage);
          info.append(p);
            
     
          $("#theme-view").append(info);
          }

          $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
    
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }      
            
          })
        });

    
      }

     

      // Function for displaying movie data
      function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var button = $("<button>");
          // Adds a class of movie to our button
          button.addClass("nature");
          // Added a data-attribute
          button.attr("data-nature",topics[i]);
          // Provided the initial button text
          button.text(topics[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(button);
        }
      }

      // This function handles events where the add movie button is clicked
      $("#add-theme").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var topic = $("#theme-input").val().trim();

        // The movie from the textbox is then added to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".nature", displayTopicInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
