$(document).ready(function(){

  $("#inquiryForm").submit(function(e){
    debugger;
    for (var i = 0; i < businesses.length; i++) {
      console.log(businesses[i].name)
    };
    
  })

});