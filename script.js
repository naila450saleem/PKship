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
 });


//  Animations
