document.addEventListener("DOMContentLoaded", function () {

  const cta = document.getElementById("cta");
  const error = document.getElementById("error");
  const email = document.getElementById("email");

  if (cta && email) {
    cta.addEventListener('click', function () {

      if (!email.value) {
        alert('Input your email');
        if (error) error.innerHTML = "Please input your email";
        return;
      }

      let fetchData = {
        method: 'POST',
        body: JSON.stringify({ email: email.value, js: true }),
        headers: { "Content-Type": "application/json" }
      };

      fetch('/public', fetchData)
        .then(res => {
          if (res.ok) {
            alert("success");
          } else {
            alert("error");
          }
        });
    });
  }

});



document.addEventListener("DOMContentLoaded", function () {

  const bar = document.getElementById("bar");
  const close = document.getElementById("close");
  const nav = document.getElementById("navbar");

  if (bar && nav) {
    bar.addEventListener("click", function () {
      nav.classList.add("active");
    });
  }

  if (close && nav) {
    close.addEventListener("click", function () {
      nav.classList.remove("active");
    });
  }

});


//Home page text animation
if (document.querySelector('.element')) {
  var typed = new Typed('.element', {
    strings: ["Website.", "Graphic Design.", "UI/UX.", "General Printing"],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true
  });
}






//Form Loading

// function formload(){
//    if (document.getElementById("order-now")){
//          if (document.getElementById("order-now").style.display == "none"){
//             document.getElementById("order-now").style.display = "block";
//             document.getElementById("formDisplay").style.direction = "none";
//          }
//          else {
//             document.getElementById("order-now").style.display = "none";
//             document.getElementById("formDisplay").style.display = "block"
//          }
//    }
//    /*var x = document.getElementById("order-now")
//    if (x.style.dispplay === "none"){
//       x.style.display = "block"
//    }else{
//       x.style.display = "none"
//    }*/
// }

// function off(){
//      document.getElementById("order-now").style.display = "none";
// }








