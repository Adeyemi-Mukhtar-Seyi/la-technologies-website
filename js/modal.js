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

        payWithPaystack(
          form.email.value,
          form.product.value,
          {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            product: form.product.value,
            message: form.message.value
          }
        )
  })

})();


//payment fucntion
function payWithPaystack(email, product, amount, formData) {
  const successMsg = document.getElementById("successMessage");
  const form = document.getElementById("contactForm");
  const modal = document.getElementById("modal");

  let handler = PaystackPop.setup({
    key: "pk_test_ea5fb3fff04a232c5ba54e50c513f31a99d84a52",
    email: email,
    amount: amount * 100,


    callback: async function (response) {

  console.log("Payment successful:", response.reference);

  try {

    // SEND TO BACKEND AFTER PAYMENT
    const res = await fetch("https://la-tech-backend.onrender.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formData,
        paymentReference: response.reference
      })
    });

    if (!res.ok) {
      throw new Error("Failed to send order");
    }

    // SUCCESS MESSAGE
    successMsg.innerHTML = `
      <div style="padding:15px; background:#e6ffed; color:#0f5132; border-radius:6px;">
        ✅ Payment successful for ${product}! We will contact you shortly.
      </div>
    `;

    successMsg.style.display = "block";

    // RESET FORM
    form.reset();

    // RESET BUTTON
    const btn = form.querySelector(".submit-btn");
    const btnText = btn.querySelector(".btn-text");

    btn.classList.remove("loading");
    btn.disabled = false;
    btnText.textContent = "Send Message";

    // CLOSE MODAL
    setTimeout(() => {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
      successMsg.style.display = "none";
    }, 4000);

  } catch (err) {

    console.error(err);

    successMsg.innerHTML = `
      <div style="padding:15px; background:#ffe6e6; color:#842029; border-radius:6px;">
        ❌ Payment succeeded but order failed to send.
      </div>
    `;

    successMsg.style.display = "block";
  }
}
  });

  handler.openIframe();
}

