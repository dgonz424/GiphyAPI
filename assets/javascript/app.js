    // Initial array of movies
      var characters = ["Leslie Knope", "Ron Swanson", "Tom Haverford", "Ann Perkins", "Andy Dwyer", "April Ludgate"];
      
      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayCharacterInfo() {

        var character = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        character + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var characterDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var characterImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            characterImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the characterDiv
            characterDiv.append(p);
            characterDiv.append(characterImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(characterDiv);
          }
        });
    ;

        // Creating an AJAX call for the specific character button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          // Creating a div to hold the movie
          var characterDiv = $("<div class='character'>");

          // Storing the rating data
          var rating = response.Rated;

          // Creating an element to have the rating displayed
          // var pOne = $("<p>").text("Rating: " + rating);

          // Displaying the rating
          // characterDiv.append(pOne);

          // Storing the release year
          var released = response.Released;

          // Creating an element to hold the release year
          // var pTwo = $("<p>").text("Released: " + released);

          // Displaying the release year
          // characterDiv.append(pTwo);

          // Storing the plot
          var plot = response.Plot;

          // Creating an element to hold the plot
          // var pThree = $("<p>").text("Plot: " + plot);

          // Appending the plot
          // characterDiv.append(pThree);

          // Retrieving the URL for the image
          var imgURL = response.Poster;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          characterDiv.append(image);

          // Putting the entire character above the previous characters
          $("#characters-view").prepend(characterDiv);
        });

      }



      // Function for displaying character data
      function renderButtons() {

        // Deleting the characters prior to adding new characters
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of characters
        for (var i = 0; i < characters.length; i++) {

          // Then dynamicaly generating buttons for each character in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of character to our button
          a.addClass("character");
          // Adding a data-attribute
          a.attr("data-name", characters[i]);
          // Providing the initial button text
          a.text(characters[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a character button is clicked
      $("#add-character").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var character = $("#character-input").val().trim();

        // Adding character from the textbox to our array
        characters.push(character);

        // Calling renderButtons which handles the processing of our character array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "character"
      $(document).on("click", ".character", displayCharacterInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      $(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

