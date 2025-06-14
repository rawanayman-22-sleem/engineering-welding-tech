window.ServicePage = (function () {
  const allImages = [];
  let currentIndex = 0;

  function renderServiceGallery(description, imagePaths, type) {
    const section = document.createElement("div");
    section.className = "section work-section";
    section.setAttribute("data-type", type);

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
      img.setAttribute("data-type", type);

      card.appendChild(img);
      cardsDiv.appendChild(card);
    });

    section.appendChild(descDiv);
    section.appendChild(cardsDiv);
    document.getElementById("services-container").appendChild(section);

    observeCards();
    setupFiltering(); // *** نعيد تفعيل الفلترة بعد إضافة قسم جديد
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

  // دالة إعداد الفلترة، توضع هنا لتُعاد استدعاؤها بعد إضافة الأقسام
  function setupFiltering() {
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    const sections = document.querySelectorAll(".work-section");

    filterButtons.forEach(button => {
      button.onclick = () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        sections.forEach(section => {
          if (filter === "all" || section.dataset.type === filter) {
            section.style.display = "block";
          } else {
            section.style.display = "none";
          }
        });
      };
    });
  }

  // لا تقم بوضع حدث DOMContentLoaded هنا لأنه في الصفحة يتم استدعاء الدوال بعد تهيئة i18next

  return {
    renderServiceGallery,
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
    setupFiltering, // إن أردت تستدعيها يدويًا من الخارج
  };
})();

