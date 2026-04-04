const body = document.body;
const rootPath = body.dataset.rootPath || "./";
const currentPage = body.dataset.page || "home";

const navigationLinks = [
  { id: "home", label: "Home", href: `${rootPath}` },
  { id: "collections", label: "Collections", href: `${rootPath}collections/` },
  { id: "products", label: "Products", href: `${rootPath}products/` },
  { id: "maison", label: "Maison", href: `${rootPath}maison/` },
  { id: "concierge", label: "Concierge", href: `${rootPath}concierge/` },
  { id: "faq", label: "FAQ", href: `${rootPath}faq/` },
];

function renderNavLinks() {
  return navigationLinks
    .map((link) => {
      const activeClass = link.id === currentPage ? " nav-link--active" : "";
      return `<a class="nav-link${activeClass}" href="${link.href}">${link.label}</a>`;
    })
    .join("");
}

function injectSharedShell() {
  const headerTarget = document.querySelector("[data-site-header]");
  const footerTarget = document.querySelector("[data-site-footer]");

  if (headerTarget) {
    headerTarget.innerHTML = `
      <header class="site-header">
        <div class="site-header__bar">
          <a class="brand" href="${rootPath}">
            <img class="brand__mark" src="${rootPath}logo.jpg" alt="Asanora Jewels logo" width="72" height="72" />
            <span class="brand__copy">
              <span class="brand__name">Asanora Jewels</span>
              <span class="brand__tag">Jewels as unique as you</span>
            </span>
          </a>
          <div class="site-nav">
            <nav class="site-nav__links" aria-label="Primary navigation">
              ${renderNavLinks()}
            </nav>
            <a class="button button--secondary" href="${rootPath}concierge/">Private concierge</a>
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-navigation" data-menu-toggle>
              <span class="menu-toggle__bar" aria-hidden="true"></span>
              <span class="visually-hidden">Toggle navigation</span>
            </button>
          </div>
        </div>
        <nav class="site-nav__panel" id="mobile-navigation" aria-label="Mobile navigation" data-nav-panel>
          ${renderNavLinks()}
          <a class="button button--primary" href="${rootPath}concierge/">Book a private consultation</a>
        </nav>
      </header>
    `;
  }

  if (footerTarget) {
    footerTarget.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer__inner">
          <div>
            <a class="footer-brand" href="${rootPath}">
              <img src="${rootPath}logo.jpg" alt="Asanora Jewels logo" width="84" height="84" />
              <span>
                <strong>Asanora Jewels</strong>
                <span class="footer-note">Polished gold statements, warm gifting rituals, and private guidance for every occasion.</span>
              </span>
            </a>
          </div>
          <div class="footer-links">
            <strong>Explore</strong>
            ${navigationLinks
              .map((link) => `<a href="${link.href}">${link.label}</a>`)
              .join("")}
          </div>
          <div class="footer-links">
            <strong>Concierge</strong>
            <a href="mailto:concierge@asanorajewels.com">concierge@asanorajewels.com</a>
            <a href="tel:+212600000000">+212 600 000 000</a>
            <a href="${rootPath}concierge/">Private styling appointments</a>
          </div>
        </div>
        <p class="site-footer__meta">Copyright <span data-current-year></span> Asanora Jewels. Crafted for premium preview presentation.</p>
      </footer>
    `;
  }
}

function setupHeader() {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navPanel = document.querySelector("[data-nav-panel]");

  if (!header) {
    return;
  }

  const updateHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  if (!menuToggle || !navPanel) {
    return;
  }

  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navPanel.classList.remove("is-open");
    body.classList.remove("menu-open");
  };

  const openMenu = () => {
    menuToggle.setAttribute("aria-expanded", "true");
    navPanel.classList.add("is-open");
    body.classList.add("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  });

  navPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMenu();
    }
  });
}

function setupReveal() {
  const revealElements = [...document.querySelectorAll("[data-reveal]")];
  if (revealElements.length === 0) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -6% 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function setupProductFilters() {
  const catalogRoot = document.querySelector("[data-product-catalog]");
  if (!catalogRoot) {
    return;
  }

  const searchInput = catalogRoot.querySelector("[data-product-search]");
  const filterButtons = [...catalogRoot.querySelectorAll("[data-filter]")];
  const productCards = [...catalogRoot.querySelectorAll("[data-product-card]")];
  const resultsCount = catalogRoot.querySelector("[data-results-count]");
  const emptyState = catalogRoot.querySelector("[data-empty-state]");

  let activeFilter = "all";

  const applyFilters = () => {
    const query = (searchInput?.value || "").trim().toLowerCase();
    let visibleCount = 0;

    productCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const searchText = (card.dataset.search || "").toLowerCase();
      const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);
      const matchesQuery = query === "" || searchText.includes(query);
      const shouldShow = matchesFilter && matchesQuery;

      card.hidden = !shouldShow;
      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (resultsCount) {
      resultsCount.textContent = `${visibleCount} ${visibleCount === 1 ? "piece" : "pieces"} available`;
    }

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";
      filterButtons.forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  applyFilters();
}

function setupFaqFilters() {
  const faqRoot = document.querySelector("[data-faq-root]");
  if (!faqRoot) {
    return;
  }

  const filterButtons = [...faqRoot.querySelectorAll("[data-faq-filter]")];
  const faqItems = [...faqRoot.querySelectorAll("[data-faq-item]")];
  const emptyState = faqRoot.querySelector("[data-faq-empty]");

  let activeFilter = "all";

  const applyFilters = () => {
    let visibleCount = 0;

    faqItems.forEach((item) => {
      const category = item.dataset.category || "";
      const shouldShow = activeFilter === "all" || category === activeFilter;
      item.hidden = !shouldShow;
      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.faqFilter || "all";
      filterButtons.forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });
      applyFilters();
    });
  });

  applyFilters();
}

function setCurrentYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(year);
  });
}

injectSharedShell();
setupHeader();
setupReveal();
setupProductFilters();
setupFaqFilters();
setCurrentYear();
