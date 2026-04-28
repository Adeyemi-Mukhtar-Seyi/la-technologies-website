(function () {
  console.log("JS Loaded");

  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("closeModal");
  const buttons = document.querySelectorAll(".order-btn");
  const form = document.getElementById("contactForm");
  const productInput = document.getElementById("productInput");

  console.log("Buttons found:", buttons.length);

  // Open modal
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      console.log("Button clicked");
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  

        buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const productName = btn.getAttribute("data-product");

            productInput.value = productName;

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
        });

  // Close modal (X button)
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
      form.style.display = "flex";
      successMsg.style.display = "none";
    });
  }

  // Close when clicking outside
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  }

  // Form submit
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btn = form.querySelector(".submit-btn");
      const btnText = btn.querySelector(".btn-text");
      const successMsg = document.getElementById("successMessage");


      btn.classList.add("loading");
      btnText.textContent = "Sending...";
      btn.disabled = true;

      try {
        const res = await fetch("https://la-tech-backend.onrender.com/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            product: form.product.value,
            message: form.message.value,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          btn.classList.remove("loading");
          successMsg.style.display = "block";
          form.style.display = "none";
        //   btn.classList.add("success");
        //   btnText.textContent = "Sent";

          form.reset();

          setTimeout(() => {
            modal.classList.remove("active");
            document.body.style.overflow = "auto";
            btn.classList.remove("success");
            btnText.textContent = "Send Message";
          }, 6000);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        alert("Failed to send message");
      }

      btn.classList.remove("loading");
      btn.disabled = false;
    });
  }

})();

// document.addEventListener("DOMContentLoaded", () => {
//   const modal = document.getElementById("modal");
//   const closeBtn = document.getElementById("closeModal");
//   const form = document.getElementById("contactForm");

//   // ✅ SELECT ALL BUTTONS (not single ID)
//   const openButtons = document.querySelectorAll(".open-modal");

//   // OPEN MODAL
//   openButtons.forEach(btn => {
//     btn.addEventListener("click", () => {
//       modal.classList.add("active");
//       document.body.style.overflow = "hidden";
//     });
//   });

//   // CLOSE MODAL (X BUTTON)
//   closeBtn.addEventListener("click", () => {
//     modal.classList.remove("active");
//     document.body.style.overflow = "auto";
//   });

//   // CLOSE WHEN CLICKING OUTSIDE
//   modal.addEventListener("click", (e) => {
//     if (e.target === modal) {
//       modal.classList.remove("active");
//       document.body.style.overflow = "auto";
//     }
//   });

//   // =========================
//   // FORM SUBMIT
//   // =========================
//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const btn = form.querySelector(".submit-btn");
//     const btnText = btn.querySelector(".btn-text");

//     btn.classList.add("loading");
//     btnText.textContent = "Sending...";
//     btn.disabled = true;

//     try {
//       const res = await fetch("https://la-tech-backend.onrender.com/send", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           name: form.name.value,
//           email: form.email.value,
//           subject: form.subject.value,
//           message: form.message.value
//         })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         btn.classList.remove("loading");
//         btn.classList.add("success");
//         btnText.textContent = "Sent";

//         form.reset();

//         setTimeout(() => {
//           modal.classList.remove("active");
//           document.body.style.overflow = "auto";

//           // Reset button
//           btn.classList.remove("success");
//           btnText.textContent = "Send Message";
//         }, 1500);

//       } else {
//         throw new Error(data.message);
//       }

//     } catch (err) {
//       alert("Failed to send message");
//     }

//     btn.classList.remove("loading");
//     btn.disabled = false;
//   });
// });



// const modal = document.getElementById("modal");
// const openBtn = document.getElementById("openModalBtn");
// const closeBtn = document.getElementById("closeModal");
// const form = document.getElementById("contactForm");

// openBtn.onclick = () => {
//   modal.classList.add("active");
//   document.body.style.overflow = "hidden";
// };

// closeBtn.onclick = () => {
//   modal.classList.remove("active");
//   document.body.style.overflow = "auto";
// };

// modal.addEventListener("click", (e) => {
//   if (e.target === modal) {
//     modal.classList.remove("active");
//     document.body.style.overflow = "auto";
//   }
// });

// // FORM SUBMIT
// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const btn = form.querySelector(".submit-btn");
//   const btnText = btn.querySelector(".btn-text");

//   btn.classList.add("loading");
//   btnText.textContent = "Sending...";
//   btn.disabled = true;

//   try {
//     const res = await fetch("https://la-tech-backend.onrender.com/send", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         name: form.name.value,
//         email: form.email.value,
//         subject: form.subject.value,
//         message: form.message.value
//       })
//     });

//     const data = await res.json();

//     if (res.ok) {
//       btn.classList.remove("loading");
//       btn.classList.add("success");
//       btnText.textContent = "Sent";

//       form.reset();

//       setTimeout(() => {
//         modal.classList.remove("active");
//         document.body.style.overflow = "auto";
//       }, 1500);

//     } else {
//       throw new Error(data.message);
//     }

//   } catch (err) {
//     alert("Failed to send message");
//   }

//   btn.classList.remove("loading");
//   btn.disabled = false;
// });