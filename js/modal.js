const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModal");
const form = document.getElementById("contactForm");

openBtn.onclick = () => {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

closeBtn.onclick = () => {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
};

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// FORM SUBMIT
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
        message: form.message.value
      })
    });

    const data = await res.json();

    if (res.ok) {
      btn.classList.remove("loading");
      btn.classList.add("success");
      btnText.textContent = "Sent";

      form.reset();

      setTimeout(() => {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }, 1500);

    } else {
      throw new Error(data.message);
    }

  } catch (err) {
    alert("Failed to send message");
  }

  btn.classList.remove("loading");
  btn.disabled = false;
});