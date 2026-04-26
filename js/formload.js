function formload() {
  function showMessage(type, text) {
    const msg = document.createElement("div");
    msg.className = `message-alert ${type}`;
    msg.textContent = text;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 4000);
  }

  fetch("indexForm.html")
    .then(res => res.text())
    .then(data => {
      // Remove any existing popup
      document.querySelector(".popup-container")?.remove();

      // Create popup
      const popup = document.createElement("div");
      popup.classList.add("popup-container");

      
      popup.innerHTML = `
        <div class="popup-inner">
          <div class="form-wrap">${data}</div>
        </div>
      `;
      document.body.appendChild(popup);
      popup.style.display = "flex";

      // ---------- Force correct positioning ----------
      const inner = popup.querySelector(".popup-inner");
      const formWrap = popup.querySelector(".form-wrap");

      if (inner) inner.style.position = "relative";
      // if (formWrap) formWrap.style.position = "relative";

      // Create close button and append it INSIDE the form
      const closeBtn = document.createElement("button");
      closeBtn.id = "closeBtnPop";
      closeBtn.className = "closeBtnPop";
      closeBtn.setAttribute("aria-label", "Close");
      closeBtn.innerHTML = "×";

      Object.assign(closeBtn.style, {
          position: "absolute",
          top: "12px",
          right: "12px",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(5px)"
        // position: "fixed",
        // top: "20px",
        // right: "20px",
        // zIndex: "10005"
      });

      // Append inside formWrap (not outside)
      // formWrap.appendChild(closeBtn);
      inner.appendChild(closeBtn);

      // Close button click handler
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        popup.style.opacity = "0";
        popup.querySelector(".popup-inner").style.transform = "scale(0.9)";

        setTimeout(() => popup.remove(), 200);
      };

      // Prevent clicks inside popup-inner from closing popup
      if (inner) {
        inner.addEventListener("click", (e) => e.stopPropagation());
      }

      // Click outside closes popup
      popup.addEventListener("click", () => popup.remove());

      //  Attach form handler
      const form = popup.querySelector(".contact-form");
      if (form) {
        form.addEventListener("submit", async (e) => {
          e.preventDefault();

          const name = form.querySelector("#name").value.trim();
          const email = form.querySelector("#email").value.trim();
          const subject = form.querySelector("#subject").value.trim();
          const message = form.querySelector("#message").value.trim();

          const submitBtn = form.querySelector("button[type='submit']");
          const originalText = submitBtn.textContent;
          const btnText = submitBtn.querySelector(".btn-text");
          const spinner = submitBtn.querySelector(".spinner");
          const checkmark = submitBtn.querySelector(".checkmark");

          //  Start loading
          submitBtn.classList.add("loading");
          submitBtn.textContent = "Sending...";
          submitBtn.disabled = true;

          try {
            const response = await fetch("https://la-tech-backend.onrender.com/send", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, subject, message }),
            });

            const result = await response.json();

            if (response.ok) {
              submitBtn.classList.remove("loading");
              submitBtn.classList.add("success");
              btnText.textContent = "Sent";
              showMessage("success", " " + result.message);
              form.reset();

              setTimeout(() => {
                document.querySelector(".popup-container")?.remove();
              }, 1800);

            } else {
              throw new Error(result.message);
              // showMessage("error", " " + result.message);
            }

          } catch (error) {
            console.error(error);
            showMessage("error", " Failed to send message. Please try again.");
          }

          //  Stop loading 
          submitBtn.classList.remove("loading");
          btnText.textContent = "Send Message";
          submitBtn.disabled = false;
          // submitBtn.textContent = originalText;
          // submitBtn.disabled = false;
        });

      } else {
        console.warn(" No .contact-form element found inside popup.");
      }
    })
    .catch((err) => {
      console.error("Error loading form:", err);
      showMessage("error", "Form could not be loaded.");
    });
}
