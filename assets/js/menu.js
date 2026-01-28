(() => {
  // ----------------------------
  //  EDIT THESE IN ONE PLACE
  // ----------------------------

  const MENU = [
    { label: "Homepage", href: "/index.html" },
    { label: "Now", href: "/pages/now.html" },
    { label: "Blog", href: "/pages/blog.html" },
    { label: "Film Reviews", href: "/pages/film-reviews.html" },
    { label: "Reels", href: "/pages/reels.html" },
    {
      label: "Punchback Productions",
      opener: true,
      children: [
        { label: "Confessions of a Corporate Clown", href: "/pages/confessions-of-a-corporate-clown.html" },
        { label: "Patty Cake", href: "/pages/patty-cake.html" },
        { label: "Van Damme Motors", href: "/pages/van-damme-motors.html" },
        { label: "Course of Nature", href: "/pages/course-of-nature.html" },
      ],
    },
  ];

  const CONTACT = {
    title: "Get in touch",
    blurb: "Drop me a line or reach out to my agent.",
    items: [
      { iconClass: "icon solid fa-envelope", html: `<a href="mailto:info@ericregimbald.com">info@ericregimbald.com</a>` },
      { iconClass: "icon solid fa-address-card", html: `Acting - <a href="mailto:jayson@thecharacters.com">jayson@thecharacters.com</a>` },
      { iconClass: "icon solid fa-address-card", html: `Voice - <a href="mailto:voauditions@thecharacters.com">voauditions@thecharacters.com</a>` },
    ],
  };

  const FOOTER = {
    copyrightName: "Punchback Productions",
    designHref: "https://html5up.net",
    buildHref: "https://gvnmdrs.ca/",
    buildLabel: "GM",
  };

  // ----------------------------
  //  HELPERS
  // ----------------------------

  function normalizePath(p) {
    if (!p) return "/";
    if (p === "/") return "/index.html";
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  }

  function isActive(href) {
    const current = normalizePath(window.location.pathname);
    const target = normalizePath(href);
    return current === target;
  }

  function buildMenuHTML(items) {
    return items
      .map((item) => {
        if (item.children?.length) {
          const childHtml = item.children
            .map((c) => {
              const active = isActive(c.href) ? ' class="active"' : "";
              return `<li><a${active} href="${c.href}">${c.label}</a></li>`;
            })
            .join("");

          return `
            <li>
              <span class="${item.opener ? "opener" : ""}">${item.label}</span>
              <ul>
                ${childHtml}
              </ul>
            </li>
          `;
        }

        const active = isActive(item.href) ? ' class="active"' : "";
        return `<li><a${active} href="${item.href}">${item.label}</a></li>`;
      })
      .join("");
  }

  function buildBottomHTML() {
    const contactItems = CONTACT.items
      .map((i) => `<li class="${i.iconClass}">${i.html}</li>`)
      .join("");

    const contactSection = `
      <section>
        <header class="major">
          <h2>${CONTACT.title}</h2>
        </header>
        <p>${CONTACT.blurb}</p>
        <ul class="contact">
          ${contactItems}
        </ul>
      </section>
    `;

    const footer = `
      <footer id="footer">
        <p class="copyright">
          &copy; ${FOOTER.copyrightName}. All rights reserved.
          Design: <a href="${FOOTER.designHref}">HTML5 UP</a>.
          Build: <a href="${FOOTER.buildHref}">${FOOTER.buildLabel}</a>
        </p>
      </footer>
    `;

    return contactSection + footer;
  }

  // ----------------------------
  //  INIT
  // ----------------------------

  function initMenu() {
    const menuNav = document.getElementById("menu");
    if (!menuNav) return;

    const ul = menuNav.querySelector("ul");
    if (!ul) return;

    ul.innerHTML = buildMenuHTML(MENU);
  }

  function initBottom() {
    // Preferred: dedicated mount point
    const mount = document.getElementById("sidebar-bottom");
    if (mount) {
      mount.innerHTML = buildBottomHTML();
      return;
    }

    // Fallback: replace the first sidebar <section> after #menu, and footer
    // (This is a bit template-dependent; the mount point is cleaner.)
    const sidebarInner = document.querySelector("#sidebar .inner");
    const menuNav = document.getElementById("menu");
    if (!sidebarInner || !menuNav) return;

    const existingFooter = sidebarInner.querySelector("footer#footer");
    if (existingFooter) existingFooter.remove();

    // find the next <section> after #menu in the sidebar, replace it
    const sections = Array.from(sidebarInner.querySelectorAll("section"));
    const menuIndex = sections.findIndex((s) => s.querySelector("#menu") || s.id === "menu");
    // Usually #menu isn't a section, so we just pick the first section with contact ul
    const contactSection = sidebarInner.querySelector("ul.contact")?.closest("section");
    if (contactSection) contactSection.outerHTML = buildBottomHTML();
  }

  // IMPORTANT: run immediately so HTML5UP main.js can bind opener behavior
  initMenu();
  initBottom();
})();
