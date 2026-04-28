(function () {

  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("closeModal");
  const buttons = document.querySelectorAll(".order-btn");
  const form = document.getElementById("contactForm");
  const productInput = document.getElementById("productInput");
  const successMsg = document.getElementById("successMessage");

  // OPEN MODAL
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const productName = btn.getAttribute("data-product");

      productInput.value = productName;
      form.subject.value = "Order for " + productName;

      modal.classList.add("active");
      document.body.style.overflow = "hidden";

      // reset UI
      successMsg.style.display = "none";
      form.style.display = "flex";
    });
  });

  // CLOSE MODAL
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";

    successMsg.style.display = "none";
    form.style.display = "flex";
  });

  // CLICK OUTSIDE
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // SUBMIT FORM
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector(".submit-btn");
    const btnText = btn.querySelector(".btn-text");

    btn.classList.add("loading");
    btnText.textContent = "Sending...";
    btn.disabled = true;

    try {
      const res = await fetch("https://la-tech-backend.onrender.com/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          subject: form.subject.value,
          product: form.product.value,
          message: form.message.value
        })
      });

      if (res.ok) {
        console.log("SUCCESS BLOCK HIT");
        form.reset();
        

        successMsg.textContent = "✅ Your request has been sent successfully!";
        successMsg.style.display = "block";

        form.style.display = "none";
      } else {
        throw new Error();
      }

    } catch (err) {
      successMsg.textContent = "❌ Failed to send message. Try again.";
      successMsg.style.display = "block";
    }

    btn.classList.remove("loading");
    btn.disabled = false;
    btnText.textContent = "Send Message";
  });

})();



// (function () {
//   console.log("JS Loaded");

//   const modal = document.getElementById("modal");
//   const closeBtn = document.getElementById("closeModal");
//   const buttons = document.querySelectorAll(".order-btn");
//   const form = document.getElementById("contactForm");
//   const productInput = document.getElementById("productInput");

//   console.log("Buttons found:", buttons.length);

//   // Open modal
//   buttons.forEach(btn => {
//     btn.addEventListener("click", () => {
//       console.log("Button clicked");
//       modal.classList.add("active");
//       document.body.style.overflow = "hidden";
//     });
//   });

  

//         buttons.forEach(btn => {
//         btn.addEventListener("click", () => {
//             const productName = btn.getAttribute("data-product");

//             productInput.value = productName;

//             modal.classList.add("active");
//             document.body.style.overflow = "hidden";
//         });
//         });

//   // Close modal (X button)
//   if (closeBtn) {
//     closeBtn.addEventListener("click", () => {
//       modal.classList.remove("active");
//       document.body.style.overflow = "auto";
//       successMsg.style.display = "none";
//       form.style.display = "none";
//     });
//   }

//   // Close when clicking outside
//   if (modal) {
//     modal.addEventListener("click", (e) => {
//       if (e.target === modal) {
//         modal.classList.remove("active");
//         document.body.style.overflow = "auto";
//       }
//     });
//   }

//   // Form submit
//   if (form) {
//     form.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const successMsg = document.getElementById("successMessage");
//       const btn = form.querySelector(".submit-btn");
//       const btnText = btn.querySelector(".btn-text");
      


//       btn.classList.add("loading");
//       btnText.textContent = "Sending...";
//       btn.disabled = true;

        
//       try {
//         const res = await fetch("https://la-tech-backend.onrender.com/send", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             name: form.name.value,
//             email: form.email.value,
//             subject: form.subject.value,
//             product: form.product.value,
//             message: form.message.value,
//           }),
//         });

//         const data = await res.json();

//         if (res.ok) {
//           btn.classList.remove("loading");
//           successMsg.style.display = "block";
//           form.style.display = "none";
//         //   btn.classList.add("success");
//         //   btnText.textContent = "Sent";

//           form.reset();

//             successMsg.textContent = "✅ Your request has been sent successfully!";
//             successMsg.style.display = "block";

//             form.style.display = "none";


//           setTimeout(() => {
//             modal.classList.remove("active");
//             document.body.style.overflow = "auto";
//             btn.classList.remove("success");
//             btnText.textContent = "Send Message";
//           }, 6000);
//         } else {
//           throw new Error(data.message);
//         }
//       } catch (err) {
//         alert("Failed to send message");
//       }

//       btn.classList.remove("loading");
//       btn.disabled = false;
//     });
//   }

// })();

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