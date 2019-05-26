var topics = ["Jon Snow", "Sansa Stark", "Arya Stark", "Samwell Tarly", "Daenerys Targaryen", "Tyrion Lannister", "Brienne of Tarth", "The Hound", "Gendry", "Tormund"];

function renderButtons() {

    $("#buttons-view").empty();

    topics.forEach(function (topic) {

        var button = $("<button>");
        button.text(topic);
        button.attr("data-topic", topic);
        $("#buttons-view").append(button);
    })
}

function displayTopicInfo(data) {

    for (var i = 0; i < 10; i++) {

        var topicDiv = $("<div class='topic'>");
        var rating = data.data[i].rating;
        var ratingDiv = $("<p>").text("Rating: " + rating);
        var gifImage = $("<img>");
        gifImage.attr("src", data.data[i].images.original_still.url);
        gifImage.attr("data-animate", data.data[i].images.original.url);
        gifImage.attr("class", "gif");
        gifImage.attr("data-still", data.data[i].images.original_still.url);
        gifImage.attr("data-state", "still");

        $("#buttons-view").append(topicDiv);



        topicDiv.append(gifImage);
        topicDiv.append(ratingDiv);


        $("#theme-view").append(topicDiv);
    }

    $(".gif").on("click", function () {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    })
}




$("#add-theme").on("click", function (event) {
    event.preventDefault();
    var topic = $("#theme-input").val().trim();

    topics.push(topic);

    renderButtons();

    $('#theme-input').val('');
});

$("#buttons-view").on("click", "button", function () {
    var theme = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        theme + "&api_key=TSUNPTa6z2tklGuh4PZEaPMuEogApupk&=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        $("#theme-view").empty();

        displayTopicInfo(response);


    });
})

renderButtons();