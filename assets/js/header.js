(() => {
  // ----------------------------
  //  EDIT HEADER CONTENT HERE
  // ----------------------------

  const HEADER = {
    logo: {
      href: "/index.html",
      name: "Eric Regimbald",
      tagline: "Actor-Producer-Writer",
    },

    socials: [
      {
        label: "Facebook",
        href: "https://www.facebook.com/eric.regimbald.7",
        iconClass: "icon brands fa-facebook-f",
      },
      {
        label: "YouTube",
        href: "http://www.youtube.com/@Punchbackproductions",
        iconClass: "icon brands fa-youtube",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/reggieredford",
        iconClass: "icon brands fa-instagram",
      },
      {
        label: "IMDb",
        href: "https://www.imdb.com/name/nm3951622/",
        iconClass: "icon brands fa-imdb",
      },
      {
        label: "Vimeo",
        href: "https://vimeo.com/ericregimbald",
        iconClass: "icon brands fa-vimeo",
      },
    ],
  };

  // ----------------------------
  //  BUILD HTML
  // ----------------------------

  function buildHeaderHTML() {
    const socialHtml = HEADER.socials
      .map(
        (s) => `
          <li>
            <a href="${s.href}" class="${s.iconClass}" target="_blank" rel="noopener">
              <span class="label">${s.label}</span>
            </a>
          </li>
        `
      )
      .join("");

    return `
      <a href="${HEADER.logo.href}" class="logo">
        <strong>${HEADER.logo.name}</strong> ${HEADER.logo.tagline}
      </a>
      <ul class="icons">
        ${socialHtml}
      </ul>
    `;
  }

  // ----------------------------
  //  INIT
  // ----------------------------

  function initHeader() {
    const header = document.getElementById("header");
    if (!header) return;
    header.innerHTML = buildHeaderHTML();
  }

  // Safe to run immediately or on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeader);
  } else {
    initHeader();
  }
})();
