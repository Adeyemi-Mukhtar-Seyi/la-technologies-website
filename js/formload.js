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

      // Instead of injecting the button here, we’ll add it later inside formWrap
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
      if (formWrap) formWrap.style.position = "relative";

      // Create close button and append it INSIDE the form
      const closeBtn = document.createElement("button");
      closeBtn.id = "closeBtnPop";
      closeBtn.className = "closeBtnPop";
      closeBtn.setAttribute("aria-label", "Close");
      closeBtn.innerHTML = "×";

      Object.assign(closeBtn.style, {
        position: "absolute",
        top: "10px",
        right: "10px",
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ff3b3b",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        zIndex: "10002",
        fontSize: "18px",
        lineHeight: "1",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
      });

      // Append inside formWrap (not outside)
      formWrap.appendChild(closeBtn);

      // Close button click handler
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        popup.remove();
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

          try {
            const response = await fetch("/send", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, subject, message }),
            });

            const result = await response.json();

            if (response.ok) {
              showMessage("success", " " + result.message);
              form.reset();
            } else {
              showMessage("error", "❌ " + result.message);
            }
          } catch (error) {
            console.error(error);
            showMessage("error", " Failed to send message. Please try again.");
          }
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
