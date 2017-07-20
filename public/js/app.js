function submitFileForm() {
    const trailData = {
          trailName = $('#file-trailName').val(),
          trailLength = $('#file-trailLength').val(),
          trailLocation = $('#file-trailLocation').val(),
          trailDifficulty = $('#file-trailDifficulty').val(),
          trailDescription = $('#file-trailDescription').val(),
    };
        $.ajax({
        type: "POST",
        url: '/trailInfo',
        data: JSON.stringify(trailData),
        dataType: 'json',
        contentType : 'application/json',
      })
        .done(function(response) {
          console.log("We have posted the data");
          refreshFileList();
        })
        .fail(function(error) {
        });
};