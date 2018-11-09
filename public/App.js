$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
        $("#articles").append(`
        <div class="container p-3">
            <a href="https://www.premierleague.com${data[i].link}" target="#">
            <div class="row mb-2" data-id=${data[i]._id}">${data[i].title}
            <br>
            </div>
            </a>
            <div class="input-group">
                <div class="input-group-prepend id="${data[i]._id}">
                <span class="input-group-text">Save Note</span>
                </div>
                <textarea class="form-control" aria-label="Note" id="bodyarea"></textarea>
                </div>
                <button data-id=${data[i]._id} id="savenote"">Submit</button>
            </div>
        </div>

        `)
    }
  });

  $(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");
    console.log(thisId)
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        id: thisId,
        note: $("#bodyarea").val()
      }
    })
      .then(function(data) {
        console.log(data);
      });
  
    $("#bodyarea").val("");
  });
  