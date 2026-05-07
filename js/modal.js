(function () {

  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("closeModal");
  const buttons = document.querySelectorAll(".order-btn");
  const form = document.getElementById("contactForm");
  const productInput = document.getElementById("productInput");
  const successMsg = document.getElementById("successMessage");

  const productType = document.getElementById("productType");
  const productMaterial = document.getElementById("productMaterial");
  const quantityInput = document.getElementById("quantity");
  const totalPrice = document.getElementById("totalPrice");


  // OPEN MODAL
  buttons.forEach(btn => {

  btn.addEventListener("click", () => {

    const productName = btn.getAttribute("data-product");

    productInput.value = productName;

    form.subject.value = "Order for " + productName;

    productType.innerHTML = '<option value="">Select Type</option>';
    productMaterial.innerHTML = '<option value="">Select Material</option>';

    quantityInput.value = 1;
    totalPrice.value = "";

    // LOGO DESIGN
    if (productName === "Logo Design") {
      productType.innerHTML += `
        <option value="standard">Standard Logo Design</option>
      `;
    }

    // BUSINESS CARD
    if (productName === "Business Card") {

      productType.innerHTML += `
        <option value="singleSided300gsm50">Single Sided 300gsm (50)</option>
        <option value="singleSided600gsm50">Single Sided 600gsm (50)</option>
        <option value="doubleSided300gsm50">Double Sided 300gsm (50)</option>
        <option value="doubleSided600gsm50">Double Sided 600gsm (50)</option>
        <option value="doubleSided400gsm100">Double Sided 400gsm (100)</option>
      `;
    }

    // FLYERS
    if (productName === "Flyer Design and Printing") {

      productType.innerHTML += `
        <option value="singleSidedA4_100">Single A4 (100)</option>
        <option value="doubleSidedA4_100">Double A4 (100)</option>
        <option value="singleSidedA5_100">Single A5 (100)</option>
        <option value="doubleSidedA5_100">Double A5 (100)</option>
        <option value="singleSidedA6_100">Single A6 (100)</option>
        <option value="doubleSidedA6_100">Double A6 (100)</option>
      `;
    }

    // OFFICE LETTERHEAD
    if (productName === "Office Letterhead") {

      productType.innerHTML += `
        <option value="a4_100">A4 (100 Copies)</option>
      `;
    }

    // PAPER BAG
    if (productName === "Paper Bag") {

      productType.innerHTML += `
        <option value="a5_50">A5 (50 Copies)</option>
        <option value="a4_100">A4 (100 Copies)</option>
        <option value="a3_50">A3 (50 Copies)</option>
      `;
    }

    // NOTEPAD
    if (productName === "Notepad Design and Printing") {

      productType.innerHTML += `
        <option value="a4_soft_50">A4 Soft Cover (50)</option>
        <option value="a4_hard_50">A4 Hard Cover (50)</option>
        <option value="a4_perfect_50">A4 Perfect Binding (50)</option>

        <option value="a5_soft_50">A5 Soft Cover (50)</option>
        <option value="a5_hard_50">A5 Hard Cover (50)</option>
        <option value="a5_perfect_50">A5 Perfect Binding (50)</option>
      `;
    }

    // BILLBOARD POSTER
    if (productName === "Billboard Poster") {

      productType.innerHTML += `
        <option value="bigMachine">Big Machine per ft</option>
        <option value="smallMachine">Small Machine per ft</option>
        <option value="stickerBig">Sticker Big Machine per ft</option>
        <option value="stickerSmall">Sticker Small Machine per ft</option>
      `;
    }

    // BUS BRANDING
    if (productName === "Bus Branding and Design") {

      productType.innerHTML += `
        <option value="oneWay">One Way Vision</option>
        <option value="basic">Basic Spot Graphics</option>
        <option value="spot">Spot Graphics</option>
        <option value="partial">Partial Wrap</option>
        <option value="full">Full Wrap</option>
      `;
    }

    // POSTER
    if (productName === "Poster") {

      productType.innerHTML += `
        <option value="poster100">150gsm Matte (100 Copies)</option>
      `;
    }

    // NYLON BAG
    if (productName === "Nylon Bag") {

      productType.innerHTML += `
        <option value="medium50">Medium (50)</option>
        <option value="large50">Large (50)</option>
        <option value="xLarge50">X-Large (50)</option>
      `;
    }

    // ROLLUP BANNER
    if (productName === "Rollup Banner") {

      productType.innerHTML += `
        <option value="smallBase">Small Base</option>
        <option value="bigBase">Big Base</option>
        <option value="fourFt">4ft Size</option>
      `;
    }

    // TABLE CALENDAR
    if (productName === "Table Calendar") {

      productType.innerHTML += `
        <option value="sevenSheets10">7 Sheets (10 copies)</option>
        <option value="thirteenSheets10">13 Sheets (10 copies)</option>
      `;
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    successMsg.style.display = "none";
    form.style.display = "flex";
  });

});
  // buttons.forEach(btn => {
  //   btn.addEventListener("click", () => {
  //     const productName = btn.getAttribute("data-product");

  //     productInput.value = productName;
  //     form.subject.value = "Order for " + productName;

  //     modal.classList.add("active");
  //     document.body.style.overflow = "hidden";

  //     // reset UI
  //     successMsg.style.display = "none";
  //     form.style.display = "flex";
  //   });
  // });

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

        const amount = parseInt(
            totalPrice.value.replace(/[₦,]/g, "")
          );

      payWithPaystack(
        form.email.value,
        form.product.value,
        amount,
        {
          name: form.name.value,
          email: form.email.value,
          subject: form.subject.value,
          product: form.product.value,
          message: form.message.value
        }
      );
  })

})();


productType.addEventListener("change", updatePrice);
quantityInput.addEventListener("input", updatePrice);

function updatePrice() {

  const product = productInput.value;
  const type = productType.value;
  const quantity = parseInt(quantityInput.value) || 1;

  let basePrice = 0;

  // LOGO
  if (product === "Logo Design") {
    basePrice = pricing.logoDesign?.[type];
  }

  // BUSINESS CARD
  if (product === "Business Card") {
    basePrice = pricing.businessCard[type];
  }

  // FLYER
  if (product === "Flyer Design and Printing") {
    basePrice = pricing.flyerDesignAndPrinting[type];
  }

  // OFFICE LETTERHEAD
  if (product === "Office Letterhead") {
    basePrice = pricing.officeLetterhead[type];
  }

  // PAPER BAG
  if (product === "Paper Bag") {
    basePrice = pricing.paperBag[type];
  }

  // NOTEPAD
  if (product === "Notepad Design and Printing") {
    basePrice = pricing.notepadDesignAndPrinting[type];
  }

  // BILLBOARD POSTER
  if (product === "Billboard Poster") {
    basePrice = pricing.billboardPoster[type];
  }

  // BUS BRANDING
  if (product === "Bus Branding and Design") {
    basePrice = pricing.busBrandingAndDesign[type];
  }

  // POSTER
  if (product === "Poster") {
    basePrice = pricing.poster[type];
  }

  // NYLON BAG
  if (product === "Nylon Bag") {
    basePrice = pricing.nylonBag[type];
  }

  // ROLLUP BANNER
  if (product === "Rollup Banner") {
    basePrice = pricing.rollupBanner[type];
  }

  // TABLE CALENDAR
  if (product === "Table Calendar") {
    basePrice = pricing.tableCalendar[type];
  }

 if (!basePrice) {
  console.warn("Missing price for:", product, type);
  return;
}

  const total = basePrice * quantity;

  totalPrice.value = "₦" + total.toLocaleString();
}


  const pricing = {

  logoDesign: {
    standard: 25000
  },

  businessCard: {
    singleSided300gsm50: 6000,
    singleSided600gsm50: 7000,
    doubleSided300gsm50: 8500,
    doubleSided600gsm50: 9500,
    doubleSided400gsm100: 20000
  },

  flyerDesignAndPrinting: {
    singleSidedA4_100: 43500,
    doubleSidedA4_100: 52300,

    singleSidedA5_100: 25800,
    doubleSidedA5_100: 38900,

    singleSidedA6_100: 17400,
    doubleSidedA6_100: 29400
  },

  officeLetterhead: {
    a4_100: 25500
  },

  paperBag: {
    a5_50: 40800,
    a4_100: 104800,
    a3_50: 171100
  },

  notepadDesignAndPrinting: {

    a4_soft_50: 75900,
    a4_hard_50: 103400,
    a4_perfect_50: 143400,

    a5_soft_50: 44900,
    a5_hard_50: 60900,
    a5_perfect_50: 99900
  },

  billboardPoster: {
    bigMachine: 200,
    smallMachine: 210,
    stickerBig: 210,
    stickerSmall: 220
  },

  busBrandingAndDesign: {
    oneWay: 22000,
    basic: 32000,
    spot: 60000,
    partial: 60000,
    full: 80000
  },

  poster: {
    poster100: 7500
  },

  nylonBag: {
    medium50: 12500,
    large50: 14500,
    xLarge50: 18500
  },

  rollupBanner: {
    smallBase: 60000,
    bigBase: 65000,
    fourFt: 140000
  },

  tableCalendar: {
    sevenSheets10: 35600,
    thirteenSheets10: 54400
  }
};



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

