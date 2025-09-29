document.addEventListener("DOMContentLoaded", function () {
const navLinks = document.querySelectorAll('.navbar .nav-link');

// 1️⃣ Website load hote hi Home link active
window.addEventListener('DOMContentLoaded', () => {
  const homeLink = document.querySelector('.navbar .nav-link[href="#"]');
  if(homeLink) homeLink.classList.add('active');
});

// 2️⃣ Click event – underline move
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    // Remove active from all links
    navLinks.forEach(l => l.classList.remove('active'));

    // Add active to clicked link
    this.classList.add('active');
  });
});

  
  /* ---------------- NAVBAR SCROLL EFFECT ---------------- */
  // const navbar = document.querySelector(".navbar");
  // window.addEventListener("scroll", () => {
  //   if (window.scrollY > 50) {
  //     navbar.classList.add("scrolled");
  //   } else {
  //     navbar.classList.remove("scrolled");
  //   }
  // });

  /* ---------------- HERO SLIDER ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    const heroTrack = document.querySelector(".text-slider-track");
    const heroSlides = document.querySelectorAll(".slider-item");
    const heroPrev = document.querySelector(".arrow-left");
    const heroNext = document.querySelector(".arrow-right");
    let heroIndex = 0;

    // Ensure everything exists
    if (!heroTrack || heroSlides.length === 0 || !heroPrev || !heroNext) {
        console.warn("Hero slider elements missing!");
        return;
    }

    function showHeroSlide(i) {
        heroIndex = (i + heroSlides.length) % heroSlides.length;
        heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;
    }

    heroPrev.addEventListener("click", () => showHeroSlide(heroIndex - 1));
    heroNext.addEventListener("click", () => showHeroSlide(heroIndex + 1));

    // Auto slide every 5 seconds
    setInterval(() => showHeroSlide(heroIndex + 1), 5000);
});


  /* ---------------- CATEGORY FILTER ---------------- */
  // const categories = document.querySelectorAll(".category");
  // const storeLogos = document.querySelectorAll(".store-logo");

  // categories.forEach(category => {
  //   category.addEventListener("click", () => {
  //     categories.forEach(c => c.classList.remove("active"));
  //     category.classList.add("active");

  //     const cat = category.dataset.category;
  //     storeLogos.forEach(logo => {
  //       if (cat === "all" || logo.classList.contains(cat)) {
  //         logo.style.display = "flex";
  //       } else {
  //         logo.style.display = "none";
  //       }
  //     });
  //   });
  // });

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

  /* ---------------- Stats section ---------------- */
  
 });


// Store Logos
  // sabhi categories select karo
  const categories = document.querySelectorAll(".category");
  const logos = document.querySelectorAll(".store-logo");

  categories.forEach(category => {
    category.addEventListener("click", () => {
      // sab categories se active class hatao
      categories.forEach(cat => cat.classList.remove("active"));
      // clicked category ko active karo
      category.classList.add("active");

      const selectedCategory = category.getAttribute("data-category");

      logos.forEach(logo => {
        // agar "all" hai to sab dikhado
        if (selectedCategory === "all") {
          logo.style.display = "flex";
        } 
        // warna sirf selected category wale show karo
        else {
          if (logo.classList.contains(selectedCategory)) {
            logo.style.display = "flex";
          } else {
            logo.style.display = "none";
          }
        }
      });
    });
  });


  // Testimonial
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".testimonial-slider .item");
  const prevBtn = document.querySelector("#testimonial-nav .prev");
  const nextBtn = document.querySelector("#testimonial-nav .next");
  const dotsContainer = document.querySelector(".dots");
  let currentIndex = 0;

  // Create dots dynamically
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");

  function showSlide(newIndex, direction) {
    if (newIndex === currentIndex) return;

    const currentSlide = slides[currentIndex];
    const nextSlide = slides[newIndex];

    slides.forEach((s, i) => {
      s.classList.remove(
        "active",
        "slide-in-right",
        "slide-out-left",
        "slide-in-left",
        "slide-out-right"
      );
      dots[i].classList.remove("active");
    });

    if (direction === "next") {
      currentSlide.classList.add("slide-out-left");
      nextSlide.classList.add("slide-in-right");
    } else {
      currentSlide.classList.add("slide-out-right");
      nextSlide.classList.add("slide-in-left");
    }

    nextSlide.classList.add("active");
    dots[newIndex].classList.add("active");
    currentIndex = newIndex;
  }

  function goToSlide(index) {
    let direction = index > currentIndex ? "next" : "prev";
    showSlide(index, direction);
  }

  // Show first slide
  slides[currentIndex].classList.add("active");
  dots[currentIndex].classList.add("active");

  // Next/Prev controls
  nextBtn.addEventListener("click", () => {
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex, "next");
  });

  prevBtn.addEventListener("click", () => {
    let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex, "prev");
  });

  // Auto slide
  setInterval(() => {
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex, "next");
  }, 5000);
});


