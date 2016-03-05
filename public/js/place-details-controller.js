$(document).ready(function(){

  $("#inquiryForm").submit(function(e){
    {{#each businesses}}
      {{this.name}}
    {{/each}}
  })

});