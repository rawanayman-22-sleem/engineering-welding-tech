window.ServicePage = (function () {
  const allImages = [];
  let currentIndex = 0;

  function createServiceSection(description, imagePaths) {
    const section = document.createElement("div");
    section.className = "section";

    const descDiv = document.createElement("div");
    descDiv.className = "description";
    descDiv.textContent = description;

    const cardsDiv = document.createElement("div");
    cardsDiv.className = "cards";

    const baseIndex = allImages.length;
    allImages.push(...imagePaths);

    imagePaths.forEach((src, i) => {
      const card = document.createElement("div");
      card.className = "card hidden";

      const img = document.createElement("img");
      img.src = src;
      img.alt = `صورة ${i + 1}`;
      img.onclick = () => openLightbox(baseIndex + i);
      

      card.appendChild(img);
      cardsDiv.appendChild(card);
    });

    section.appendChild(descDiv);   // الوصف أولاً
    section.appendChild(cardsDiv); // ثم الصور
    document.getElementById("services-container").appendChild(section);

    observeCards();
  }

  function openLightbox(index) {
    currentIndex = index;
    document.getElementById("lightbox-img").src = allImages[currentIndex];
    document.getElementById("lightbox").classList.add("show");
  }

  function closeLightbox() {
    document.getElementById("lightbox").classList.remove("show");
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % allImages.length;
    document.getElementById("lightbox-img").src = allImages[currentIndex];
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    document.getElementById("lightbox-img").src = allImages[currentIndex];
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeLightbox();
  });

  // Scroll Reveal Animation
  function observeCards() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    document.querySelectorAll(".card").forEach(card => {
      observer.observe(card);
    });
  }

  // فلتره الازرار

  document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  const sections = document.querySelectorAll(".work-section");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // إزالة الكلاس active من الكل
      filterButtons.forEach(btn => btn.classList.remove("active"));
      // إضافة الكلاس active للزر اللي اضغط عليه
      button.classList.add("active");

      const filter = button.dataset.filter;

      sections.forEach(section => {
        if (filter === "all" || section.dataset.type === filter) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });
    });
  });
});


  return {
    createServiceSection,
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
  };
})();

