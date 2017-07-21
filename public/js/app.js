

function getFiles() {
  return $.ajax('/api/trailLogs')
    .then(res => {
      console.log("Results from getFiles()", res);
      return res;
    })
    .fail(err => {
      console.log("Error in getFiles()", err);
      throw err;
    });
}

/*************Refresh code for after changes or delete********/

function refreshFileList() {
  const template = $('#list-template').html();
  const compiledTemplate = Handlebars.compile(template);

  getFiles()
    .then(files => {

      window.fileList = files;

      const data = {files: files};
      const html = compiledTemplate(data);
      $('.list-container').html(html);
    })
}

/**********Toggle code to make the archive hidden when desired(halfway working)**********/

function toggleAddFileList() { 
  setFormData({});
  toggleAddFileListVisibility();
  console.log("It works!!");    
}

function toggleAddFileListVisibility() {
  $('.list-container').toggleClass('hidden');
}


/***********Submit Code**************/

function submitFileForm() {
    const trailData = {
          trailName: $('#file-trailName').val(),
          trailLength: $('#file-trailLength').val(),
          trailLocation: $('#file-trailLocation').val(),
          trailDifficulty: $('#file-trailDifficulty').val(),
          trailDescription: $('#file-trailDescription').val(),
          _id: $('#file-id').val(),    
    };
    
         let method, url;
      if (trailData._id) {
        method = 'PUT';
        url = '/api/trailLogs' + trailData._id;
      } else {
        method = 'POST';
        url = '/api/trailLogs';
  }
    
        $.ajax({
        type: method,
        url: url,
        data: JSON.stringify(trailData),
        dataType: 'json',
        contentType : 'application/json',
      })
        
        .done(function(response) {
          console.log("We have posted the data");
          refreshFileList();
          //toggleAddFileList();    
        })
        
        .fail(function(error) {
        });
    console.log("Trail Data :", trailData)
};




/***********Edit part that dosen't seem to work :(  *****************/


function editFileClick(id) {
  const file = window.fileList.find(file => file._id === id);
  if (file) {
    setFormData(file);
    console.log('??!!');
    toggleAddFileListVisibility();  
  }
}



/************Delete ****************/


function deleteFileClick(id) {
  if (confirm("Remove Trail?")) {
    $.ajax({
      type: 'DELETE',
      url: '/api/trailLogs/' + id,
      dataType: 'json',
      contentType : 'application/json',
    })
      .done(function(response) {
        console.log("File", id, "is outta here!!");
        refreshFileList();
      })
      .fail(function(error) {
        console.log("I'm not dead yet!", error);
      })
  }
}

/***********Sets my form for data collection******************/


function setFormData(data) {
  data = data || {};

  const trailFile = {
    trailName: data.trailName || '',
    trailLength: data.trailLength || '',
    trailLocation: data.trailLocation || '',
    trailDifficulty: data.trailDifficulty || '',
    trailDescription: data.trailDescription || '',  
    _id: data._id || '',
  };

  $('#file-trailName').val(trailFile.trailName);
  $('#file-trailLength').val(trailFile.trailLength);
  $('#file-trailLocation').val(trailFile.trailLocation);
  $('#file-trailDifficulty').val(trailFile.trailDifficulty);
  $('#file-trailDescription').val(trailFile.trailDescription);
  $('#file-id').val(trailFile._id);
}
