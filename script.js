(() => {
  const header = document.querySelector("[data-header]");
  const progressBar = document.querySelector("[data-progress]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const navLinks = document.querySelectorAll("[data-nav]");
  const sections = document.querySelectorAll("[data-section]");
  const revealItems = document.querySelectorAll(".reveal");
  const heroImage = document.querySelector("[data-hero-image]");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* Header state, reading progress, gentle hero parallax ------------- */
  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;

      header?.classList.toggle("is-scrolled", y > 32);

      if (progressBar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }

      if (heroImage && !prefersReducedMotion && y <= window.innerHeight) {
        heroImage.style.transform = `scale(${1.07 + y * 0.00006}) translate3d(0, ${y * 0.1}px, 0)`;
      }

      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Header tone: light text while over the hero and the dark closing --- */
  const darkZones = document.querySelectorAll(".hero, .contact");
  const syncHeaderTone = () => {
    const overDark = [...darkZones].some((zone) => {
      const rect = zone.getBoundingClientRect();
      return rect.top <= 76 && rect.bottom >= 76;
    });
    header?.classList.toggle("on-dark", overDark);
  };
  window.addEventListener("scroll", syncHeaderTone, { passive: true });
  window.addEventListener("resize", syncHeaderTone, { passive: true });
  syncHeaderTone();

  /* Mobile menu -------------------------------------------------------- */
  const closeMenu = () => {
    if (!menuToggle || !mobileNav) return;
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-label", "Open menu");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
    header?.classList.remove("menu-open");
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    if (!menuToggle || !mobileNav) return;
    menuToggle.classList.add("is-open");
    menuToggle.setAttribute("aria-label", "Close menu");
    menuToggle.setAttribute("aria-expanded", "true");
    mobileNav.hidden = false;
    header?.classList.add("menu-open");
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

  /* Scroll reveals ------------------------------------------------------ */
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -7% 0px" }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-in"));
  }

  /* Active navigation state --------------------------------------------- */
  if ("IntersectionObserver" in window && sections.length) {
    const setActive = (name) => {
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.nav === name);
      });
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.dataset.section);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* Footer details -------------------------------------------------------- */
  const year = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = year;
  });

  const localTimeEl = document.querySelector("[data-local-time]");
  if (localTimeEl) {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Toronto",
    });
    const tick = () => {
      localTimeEl.textContent = formatter.format(new Date());
    };
    tick();
    setInterval(tick, 30000);
  }
})();
