//  Display floating alert message on screen
function showMessage(type, text) {
  const msg = document.createElement("div");
  msg.className = `message-alert ${type}`;
  msg.textContent = text;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 4000);
}

document.addEventListener("DOMContentLoaded", function () {

  const contactForm = document.querySelector(".contact-form");

  if (!contactForm) return; //  Stop if form doesn't exist on this page

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email")?.value;
    const subject = document.getElementById("subject")?.value;
    const message = document.getElementById("message")?.value;

    try {
      const response = await fetch("https://la-tech-backend.onrender.com/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage("success", " " + data.message);
        contactForm.reset();
      } else {
        showMessage("error", " " + data.message);
      }

    } catch (error) {
      console.error(error);
      showMessage("error", " Failed to send message. Please try again.");
    }
  });

});



