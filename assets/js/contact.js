$(document).ready(function() {
  var forms = document.getElementsByClassName('needs-validation');
  var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {

      // On Failed Validation
      if (form.checkValidity() === false) {
        alert('failed validation');
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
      }
      else{
        // On Success Validation
        alert('success validation');
        event.preventDefault();
        submitForm();
        form.classList.remove('was-validated');
      }
    }, false);
  });
});

  function submitForm(){
      // Initiate Variables With Form Content
      var name = $("#name").val();
      var phone = $("#phone").val();
      var subject = $("#subject").val();
      var email = $("#email").val();
      var message = $("#message").val();

      $.ajax({
          type: "POST",
          url: "/assets/php/contact.php",
          data: "name=" + name + "&email=" + email +"&phone=" + phone +"&subject=" + subject + "&message=" + message,
          success : function(text){
              if (text == "success"){
                  formSuccess();
              } else {
                  formError();
                  submitMSG(false,text);
              }
          }
      });
  }

  function formSuccess(){
      $("#contactForm")[0].reset();
      submitMSG(true, "Message Sent Successfully!")
  }

  function formError(){
      $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass();
      });
  }

  function submitMSG(valid, msg){
      if(valid){
          var msgClasses = "alert alert-success";
      } else {
          var msgClasses = "alert alert-danger";
      }
      $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
  }
