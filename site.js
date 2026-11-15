(() => {
  // Mobile menu: opens and closes the nav, and tells screen readers whether it is open
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.textContent = open ? "✕" : "☰";
    };
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Photo carousels: the arrow buttons scroll one photo at a time
  document.querySelectorAll("[data-carousel]").forEach((button) =>
    button.addEventListener("click", () => {
      const track = document.getElementById(button.dataset.carousel);
      const card = track?.querySelector("figure");
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).gap) || 17;
      track.scrollBy({
        left: Number(button.dataset.direction) * (card.getBoundingClientRect().width + gap),
        behavior: "smooth",
      });
    }),
  );

  // Contact form: opens the visitor's email app with the message filled in
  const form = document.getElementById("contact-message");
  if (form)
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const subject = "Fairfield Berries website enquiry";
      const body = [
        "Name: " + data.get("name"),
        "Email: " + data.get("email"),
        "",
        "Message:",
        data.get("message"),
      ].join("\n");
      window.location.href =
        "mailto:fairfieldberries@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    });
})();
