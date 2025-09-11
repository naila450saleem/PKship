document.addEventListener("DOMContentLoaded", function () {
  /* ---------------- NAVBAR SCROLL EFFECT ---------------- */
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /* ---------------- HERO SLIDER ---------------- */
  const sliderTrack = document.querySelector(".text-slider-track");
  const slides = document.querySelectorAll(".slider-item");
  const prevArrow = document.querySelector(".arrow-left");
  const nextArrow = document.querySelector(".arrow-right");
  let index = 0;

  function showSlide(i) {
    index = (i + slides.length) % slides.length;
    sliderTrack.style.transform = `translateX(-${index * 100}%)`;
  }

  prevArrow.addEventListener("click", () => showSlide(index - 1));
  nextArrow.addEventListener("click", () => showSlide(index + 1));

  setInterval(() => showSlide(index + 1), 5000);

  /* ---------------- CATEGORY FILTER ---------------- */
  const categories = document.querySelectorAll(".category");
  const storeLogos = document.querySelectorAll(".store-logo");

  categories.forEach(category => {
    category.addEventListener("click", () => {
      categories.forEach(c => c.classList.remove("active"));
      category.classList.add("active");

      const cat = category.dataset.category;
      storeLogos.forEach(logo => {
        if (cat === "all" || logo.classList.contains(cat)) {
          logo.style.display = "block";
        } else {
          logo.style.display = "none";
        }
      });
    });
  });

  /* ---------------- TESTIMONIAL SLIDER ---------------- */
  const tSlides = document.querySelectorAll(".testimonials-section .slide");
  const dotsContainer = document.querySelector(".testimonials-section .dots");
  let currentIndex = 0;

  // Create dots dynamically
  tSlides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      currentIndex = i;
      showTestimonial(currentIndex);
    });
    dotsContainer.appendChild(dot);
  });

  function showTestimonial(i) {
    tSlides.forEach((slide, idx) => {
      slide.classList.remove("active");
      dotsContainer.children[idx].classList.remove("active");
    });
    tSlides[i].classList.add("active");
    dotsContainer.children[i].classList.add("active");
  }

  showTestimonial(currentIndex);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % tSlides.length;
    showTestimonial(currentIndex);
  }, 5000);

  /* ---------------- ORDER FORM MODAL ---------------- */
  const modal = document.getElementById("orderFormModal");
  const closeBtn = modal.querySelector(".close");
  const productList = document.getElementById("productList");
  const emptyMessage = document.getElementById("emptyMessage");
  const productTable = document.querySelector(".product-table");
  const nextBtnStep1 = document.querySelector('[data-step="1"] .btn-next');
  const steps = document.querySelectorAll(".form-steps .step");
  const contents = document.querySelectorAll(".step-content");
  const orderSummary = document.getElementById("orderSummary");
  const thankYouMessage = document.getElementById("thankYouMessage");

  let currentStep = 1;
  let cart = []; // empty by default

  function renderCart() {
    if (cart.length === 0) {
      emptyMessage.style.display = "block";
      productTable.style.display = "none";
      nextBtnStep1.style.display = "none";
      return;
    }

    emptyMessage.style.display = "none";
    productTable.style.display = "table";
    nextBtnStep1.style.display = "inline-block";

    productList.innerHTML = "";
    cart.forEach((item, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <img src="${item.img}" width="40">
          <strong>${item.name}</strong><br>
          Size: ${item.size}, Color: ${item.color}
        </td>
        <td>
          <button class="qty-btn" data-index="${i}" data-action="minus">-</button>
          <input type="text" value="${item.qty}" class="qty-input" readonly>
          <button class="qty-btn" data-index="${i}" data-action="plus">+</button>
        </td>
        <td><input type="text" placeholder="Comments"></td>
      `;
      productList.appendChild(row);
    });
  }

  function showStep(step) {
    contents.forEach(c => {
      c.style.display = c.dataset.step == step ? "block" : "none";
    });
    steps.forEach(s => {
      s.classList.toggle("active", s.dataset.step == step);
    });
    currentStep = step;

    // Step 3: order summary
    if (step == 3) {
      orderSummary.innerHTML = "";
      cart.forEach(item => {
        orderSummary.innerHTML += `<p>${item.name} (x${item.qty}) - ${item.color}, ${item.size}</p>`;
      });
    }
  }

  // Quantity update
  productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("qty-btn")) {
      const index = e.target.dataset.index;
      const action = e.target.dataset.action;
      if (action === "plus") cart[index].qty++;
      if (action === "minus" && cart[index].qty > 1) cart[index].qty--;
      renderCart();
    }
  });

  // Open modal (blank first)
  document.querySelectorAll(".openForm").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      renderCart();
      showStep(1);
      modal.style.display = "block";
    });
  });

  // Close
  closeBtn.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (event) => {
    if (event.target === modal) modal.style.display = "none";
  });

  // Next / Back / Submit
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-next")) {
      if (currentStep < 3) showStep(currentStep + 1);
    }
    if (e.target.classList.contains("btn-prev")) {
      if (currentStep > 1) showStep(currentStep - 1);
    }
    if (e.target.classList.contains("btn-submit")) {
      // Generate random order ID
      const orderId = Math.floor(1000 + Math.random() * 9000);

      // Show Thank you message
      thankYouMessage.textContent = `Thank You, your order ID is: ${orderId}, you will get reply within 24 Hours.`;
      thankYouMessage.style.display = "block";

      // Auto close after 3 sec
      setTimeout(() => {
        modal.style.display = "none";
        thankYouMessage.style.display = "none"; // reset for next time
      }, 3000);
    }
  });

  // 🔹 Example: Product add simulation
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      cart.push({ img: "belt.jpg", name: "Leather Belt", size: "M", color: "Brown", qty: 1 });
      alert("Product added!");
    });
  });
});
