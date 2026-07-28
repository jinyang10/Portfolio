(() => {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const revealItems = document.querySelectorAll(".reveal");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const closeMenu = () => {
    if (!menuToggle || !mobileNav) return;
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-label", "Open menu");
    mobileNav.hidden = true;
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    if (!menuToggle || !mobileNav) return;
    menuToggle.classList.add("is-open");
    menuToggle.setAttribute("aria-label", "Close menu");
    mobileNav.hidden = false;
    document.body.style.overflow = "hidden";
  };

  menuToggle?.addEventListener("click", () => {
    if (mobileNav?.hidden) openMenu();
    else closeMenu();
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-in"));
  }

  // Gentle parallax on hero media for desktop
  const heroImage = document.querySelector(".hero-image");
  if (heroImage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = Math.min(window.scrollY, window.innerHeight);
          heroImage.style.transform = `scale(${1.06 + y * 0.00008}) translate3d(0, ${y * 0.12}px, 0)`;
          ticking = false;
        });
      },
      { passive: true }
    );
  }
})();
