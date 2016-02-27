
window.userInfo = {
    eMail : "",
    fName : "",
    lName : "",
    userExists: "False"
};

$(document).ready(function(){

  $("#login").on("click", function(){
    $("#loginModal").modal("show")
  })

   $("#email").on("click",function(){
     $("#loginModal").modal("hide");
     $("#emailModal").modal("show");

     $("#saveRegister").on("click",function(e){
        e.preventDefault();
          //var fName,lName,eMail;

            req.send("Test save click");

            // userInfo.fName = $("#firstName").val();
            // userInfo.lName = $("#lastName").val();
            // userInfo.eMail = $("#eMail").val();

            console.log("User Info:"+req.body.fName);
            console.log("User Info:"+req.body.lName);
            console.log("User Info:"+req.body.eMail);

            // connection.child(userInfo.fName).set({
            //   eMail : userInfo.eMail,
            //   fName : userInfo.fName,
            //   lName : userInfo.lName,
            //   passord: test
            //   active :true;
            // });
            // $("#userInputForm").hide();
            // $("#SuccessfulLogin").show();
            // $("#validationMessage").html("Congratulations "+userInfo.fName+", your account has been successfully created.").css("color","black")
            //  .append("Click 'Start Search' to start your search").css("color","black");
      });
   });

});
