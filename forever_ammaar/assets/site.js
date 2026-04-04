const body = document.body;
const rootPath = body.dataset.rootPath || "./";
const currentPage = body.dataset.page || "home";

const navigation = [
  { id: "home", label: "Home", href: `${rootPath}` },
  { id: "collections", label: "Collections", href: `${rootPath}collections/` },
  { id: "products", label: "Products", href: `${rootPath}products/` },
  { id: "story", label: "Our Story", href: `${rootPath}story/` },
  { id: "corporate", label: "Corporate", href: `${rootPath}corporate/` },
  { id: "faq", label: "FAQ", href: `${rootPath}faq/` },
];

function renderLinks() {
  return navigation
    .map((link) => {
      const activeClass = link.id === currentPage ? " nav-link--active" : "";
      return `<a class="nav-link${activeClass}" href="${link.href}">${link.label}</a>`;
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
            <img class="brand-lockup__mark" src="${rootPath}logo.jpg" alt="Forever Ammaar logo" width="72" height="72" />
            <span class="brand-lockup__copy">
              <span class="brand-lockup__title">Forever Ammaar</span>
              <span class="brand-lockup__subtitle">Curating with purpose</span>
            </span>
          </a>
          <div class="nav-frame">
            <nav class="nav-links" aria-label="Primary navigation">
              ${renderLinks()}
            </nav>
            <a class="button button--secondary" href="mailto:hello@foreverammaar.com?subject=Gift%20Consultation">Gift consultation</a>
            <button class="menu-button" type="button" aria-expanded="false" aria-controls="mobile-navigation" data-menu-toggle>
              <span class="menu-button__bars" aria-hidden="true"></span>
              <span class="visually-hidden">Toggle navigation</span>
            </button>
          </div>
        </div>
        <nav class="mobile-panel" id="mobile-navigation" aria-label="Mobile navigation" data-mobile-panel>
          ${renderLinks()}
          <a class="button button--primary" href="mailto:hello@foreverammaar.com?subject=Gift%20Consultation">Start a gift consultation</a>
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
              <img src="${rootPath}logo.jpg" alt="Forever Ammaar logo" width="84" height="84" />
              <span>
                <strong>Forever Ammaar</strong>
                <span class="footer-note">Luxury gifting with emotional warmth, elegant curation, and a measurable social impact story.</span>
              </span>
            </a>
          </div>
          <div class="footer-links">
            <strong>Navigate</strong>
            ${navigation.map((link) => `<a href="${link.href}">${link.label}</a>`).join("")}
          </div>
          <div class="footer-links">
            <strong>Contact</strong>
            <a href="mailto:hello@foreverammaar.com">hello@foreverammaar.com</a>
            <a href="mailto:corporate@foreverammaar.com">corporate@foreverammaar.com</a>
            <a href="tel:+212600000000">+212 600 000 000</a>
          </div>
        </div>
        <p class="footer-meta">Copyright <span data-current-year></span> Forever Ammaar. Demo preview crafted for polished multi-page presentation.</p>
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

  const handleScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

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
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    if (expanded) {
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
    if (window.innerWidth > 880) {
      closeMenu();
    }
  });
}

function setupReveal() {
  const items = [...document.querySelectorAll("[data-reveal]")];
  if (items.length === 0) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
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

  items.forEach((item) => observer.observe(item));
}

function setupProductFilter() {
  const catalog = document.querySelector("[data-product-catalog]");
  if (!catalog) {
    return;
  }

  const search = catalog.querySelector("[data-product-search]");
  const buttons = [...catalog.querySelectorAll("[data-filter]")];
  const cards = [...catalog.querySelectorAll("[data-product-card]")];
  const results = catalog.querySelector("[data-results]");
  const emptyState = catalog.querySelector("[data-empty-state]");

  let activeFilter = "all";

  const apply = () => {
    const query = (search?.value || "").trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const searchText = (card.dataset.search || "").toLowerCase();
      const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);
      const matchesQuery = query === "" || searchText.includes(query);
      const show = matchesFilter && matchesQuery;
      card.hidden = !show;
      if (show) {
        visible += 1;
      }
    });

    if (results) {
      results.textContent = `${visible} ${visible === 1 ? "box" : "boxes"} available`;
    }

    if (emptyState) {
      emptyState.hidden = visible > 0;
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
    let visible = 0;
    items.forEach((item) => {
      const category = item.dataset.category || "";
      const show = activeFilter === "all" || category === activeFilter;
      item.hidden = !show;
      if (show) {
        visible += 1;
      }
    });

    if (emptyState) {
      emptyState.hidden = visible > 0;
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
setupProductFilter();
setupFaqFilter();
setYear();
