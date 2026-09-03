(() => {
  const header = document.querySelector("[data-header]");
  const progressBar = document.querySelector("[data-progress]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const navLinks = document.querySelectorAll("[data-nav]");
  const sections = document.querySelectorAll("[data-section]");
  const revealItems = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* Header state and reading progress --------------------------------- */
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

      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Header tone: light text while over the dark closing section -------- */
  const darkZones = document.querySelectorAll(".contact");
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
    revealItems.forEach((item) => {
      // The hero composes the opening frame; reveal it on load rather than
      // waiting for the observer, whose bottom margin can miss the hero foot.
      if (item.closest(".hero")) item.classList.add("is-in");
      else revealObserver.observe(item);
    });
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

  /* Theme switching ------------------------------------------------------- */
  const themeSelect = document.querySelector("[data-theme-select]");
  const THEME_KEY = "portfolio-theme";
  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) {
      /* storage unavailable (private mode); theme still applies */
    }
    if (themeSelect) themeSelect.value = theme;
  };
  themeSelect?.addEventListener("change", (event) => {
    applyTheme(event.target.value);
  });
  applyTheme(document.documentElement.dataset.theme || "glass");

  /* Fitness card: original file, fetched once, then played from memory -- */
  const liftCard = document.querySelector("[data-lift-video]");
  const liftVideo = liftCard?.querySelector("video");
  if (liftCard && liftVideo) {
    const LIFT_DRIVE =
      "https://drive.usercontent.google.com/download?id=1zp6EJFPidBydo1Z2n-1pQsbhDZz-1pgO&export=download";
    const LIFT_LOCAL = "assets/lifting.mp4";

    const fetchVideoBlob = async (url) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("fetch");
      const type = res.headers.get("content-type") || "";
      if (type.includes("text/html")) throw new Error("html");
      const blob = await res.blob();
      if (blob.size < 1_000_000) throw new Error("tiny");
      return blob;
    };

    const attachBlob = (blob) => {
      liftVideo.querySelectorAll("source").forEach((node) => node.remove());
      liftVideo.src = URL.createObjectURL(blob);
      liftVideo.preload = "auto";
      liftVideo.load();
    };

    liftCard.classList.add("is-loading");
    const liftReady = fetchVideoBlob(LIFT_DRIVE)
      .catch(() => fetchVideoBlob(LIFT_LOCAL))
      .then((blob) => {
        attachBlob(blob);
        liftCard.classList.remove("is-loading");
        liftCard.classList.add("is-ready");
      })
      .catch(() => {
        liftCard.classList.remove("is-loading");
        liftVideo.preload = "auto";
      });

    const startLift = () => {
      liftVideo.controls = true;
      liftCard.classList.add("is-playing");
      liftReady.then(() => {
        const play = liftVideo.play();
        if (play && typeof play.catch === "function") play.catch(() => {});
      });
    };

    liftCard.addEventListener("click", (event) => {
      if (liftVideo.controls && event.target === liftVideo) return;
      if (liftVideo.paused) startLift();
    });

    liftCard.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (liftVideo.paused) startLift();
        else liftVideo.pause();
      }
    });

    liftVideo.addEventListener("ended", () => {
      liftVideo.controls = false;
      liftVideo.currentTime = 0;
      liftCard.classList.remove("is-playing");
    });

    liftCard.setAttribute("tabindex", "0");
    liftCard.setAttribute("role", "button");
    liftCard.setAttribute("aria-label", "Play lifting video");
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
