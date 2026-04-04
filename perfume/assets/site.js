const body = document.body;
const rootPath = body.dataset.rootPath || "./";
const currentPage = body.dataset.page || "home";

const navItems = [
  { id: "home", label: "Home", href: `${rootPath}` },
  { id: "collections", label: "Collections", href: `${rootPath}collections/` },
  { id: "notes", label: "Fragrance Notes", href: `${rootPath}notes/` },
  { id: "order", label: "How to Order", href: `${rootPath}order/` },
  { id: "atelier", label: "Atelier", href: `${rootPath}atelier/` },
  { id: "faq", label: "FAQ", href: `${rootPath}faq/` },
];

function renderNavLinks() {
  return navItems
    .map((item) => {
      const activeClass = item.id === currentPage ? " nav-link--active" : "";
      return `<a class="nav-link${activeClass}" href="${item.href}">${item.label}</a>`;
    })
    .join("");
}

function injectShell() {
  const headerSlot = document.querySelector("[data-site-header]");
  const footerSlot = document.querySelector("[data-site-footer]");

  if (headerSlot) {
    headerSlot.innerHTML = `
      <header class="page-header">
        <div class="page-header__bar">
          <a class="brand-lockup" href="${rootPath}">
            <span class="brand-lockup__mark">OB</span>
            <span class="brand-lockup__copy">
              <span class="brand-lockup__title">OBSIDIAN</span>
              <span class="brand-lockup__subtitle">The fragrance curator</span>
            </span>
          </a>
          <div class="nav-frame">
            <nav class="nav-links" aria-label="Primary navigation">
              ${renderNavLinks()}
            </nav>
            <a class="button button--secondary" href="mailto:orders@obsidiancurator.com?subject=Order%20Request">Order now</a>
            <button class="menu-button" type="button" aria-expanded="false" aria-controls="mobile-navigation" data-menu-toggle>
              <span class="menu-button__bars" aria-hidden="true"></span>
              <span class="visually-hidden">Toggle navigation</span>
            </button>
          </div>
        </div>
        <nav class="mobile-panel" id="mobile-navigation" aria-label="Mobile navigation" data-mobile-panel>
          ${renderNavLinks()}
          <a class="button button--primary" href="mailto:orders@obsidiancurator.com?subject=Order%20Request">Order now</a>
        </nav>
      </header>
    `;
  }

  if (footerSlot) {
    footerSlot.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer__inner">
          <div>
            <a class="footer-brand" href="${rootPath}">
              <span class="footer-brand__mark">OB</span>
              <span>
                <strong>OBSIDIAN</strong>
                <span class="footer-note">A dark fragrance house built around power, restraint, and long-lasting presence.</span>
              </span>
            </a>
          </div>
          <div class="footer-links">
            <strong>Navigate</strong>
            ${navItems.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
          </div>
          <div class="footer-links">
            <strong>Contact</strong>
            <a href="mailto:hello@obsidiancurator.com">hello@obsidiancurator.com</a>
            <a href="mailto:orders@obsidiancurator.com">orders@obsidiancurator.com</a>
            <a href="mailto:press@obsidiancurator.com">press@obsidiancurator.com</a>
          </div>
        </div>
        <p class="footer-meta">Copyright <span data-current-year></span> OBSIDIAN. Demo fragrance preview crafted for a polished multi-page presentation.</p>
      </footer>
    `;
  }
}

function setupHeader() {
  const header = document.querySelector(".page-header");
  const toggle = document.querySelector("[data-menu-toggle]");
  const panel = document.querySelector("[data-mobile-panel]");

  if (!header) {
    return;
  }

  const updateHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  if (!toggle || !panel) {
    return;
  }

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    panel.classList.remove("is-open");
    body.classList.remove("menu-open");
  };

  const openMenu = () => {
    toggle.setAttribute("aria-expanded", "true");
    panel.classList.add("is-open");
    body.classList.add("menu-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  });

  panel.querySelectorAll("a").forEach((link) => {
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
  const revealItems = [...document.querySelectorAll("[data-reveal]")];
  if (revealItems.length === 0) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
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
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupCatalogFilter() {
  const root = document.querySelector("[data-product-catalog]");
  if (!root) {
    return;
  }

  const search = root.querySelector("[data-product-search]");
  const buttons = [...root.querySelectorAll("[data-filter]")];
  const cards = [...root.querySelectorAll("[data-product-card]")];
  const results = root.querySelector("[data-results]");
  const emptyState = root.querySelector("[data-empty-state]");

  let activeFilter = "all";

  const apply = () => {
    const query = (search?.value || "").trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const searchText = (card.dataset.search || "").toLowerCase();
      const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);
      const matchesQuery = query === "" || searchText.includes(query);
      const visible = matchesFilter && matchesQuery;

      card.hidden = !visible;
      if (visible) {
        visibleCount += 1;
      }
    });

    if (results) {
      results.textContent = `${visibleCount} ${visibleCount === 1 ? "collection" : "collections"} available`;
    }

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";
      buttons.forEach((item) => item.classList.toggle("is-active", item === button));
      apply();
    });
  });

  if (search) {
    search.addEventListener("input", apply);
  }

  apply();
}

function setupFaqFilter() {
  const root = document.querySelector("[data-faq-root]");
  if (!root) {
    return;
  }

  const buttons = [...root.querySelectorAll("[data-faq-filter]")];
  const items = [...root.querySelectorAll("[data-faq-item]")];
  const emptyState = root.querySelector("[data-faq-empty]");

  let activeFilter = "all";

  const apply = () => {
    let visibleCount = 0;

    items.forEach((item) => {
      const category = item.dataset.category || "";
      const visible = activeFilter === "all" || category === activeFilter;
      item.hidden = !visible;
      if (visible) {
        visibleCount += 1;
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.faqFilter || "all";
      buttons.forEach((item) => item.classList.toggle("is-active", item === button));
      apply();
    });
  });

  apply();
}

function setYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(year);
  });
}

injectShell();
setupHeader();
setupReveal();
setupCatalogFilter();
setupFaqFilter();
setYear();
