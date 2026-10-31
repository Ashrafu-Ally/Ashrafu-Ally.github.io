// Ashrafu Ally — portfolio interactions.
// Everything here is an enhancement: the site still works with JavaScript off.

document.documentElement.classList.add("js");

// ---------- Footer year ----------
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// ---------- Mobile menu ----------
const nav = document.querySelector(".site-nav");
const toggle = document.querySelector(".nav-toggle");

if (nav && toggle) {
  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  };

  toggle.addEventListener("click", () => {
    setOpen(!nav.classList.contains("is-open"));
  });

  // Close after choosing a link, or on Escape.
  nav.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
}

// ---------- Click-to-enlarge photos ----------
const photos = document.querySelectorAll("main figure img");

if (photos.length && typeof HTMLDialogElement === "function") {
  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Enlarged photo");
  dialog.innerHTML =
    '<button class="lightbox-close" type="button">Close</button>' +
    '<img alt=""><p></p>';
  document.body.appendChild(dialog);

  const bigImg = dialog.querySelector("img");
  const caption = dialog.querySelector("p");

  dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
  // Clicking the dark backdrop closes it too.
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    bigImg.removeAttribute("src");
  });

  photos.forEach((img) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "zoom";
    button.setAttribute("aria-label", `Enlarge photo: ${img.alt}`);
    img.replaceWith(button);
    button.appendChild(img);

    button.addEventListener("click", () => {
      const figcaption = img.closest("figure")?.querySelector("figcaption");
      bigImg.src = img.currentSrc || img.src;
      bigImg.alt = img.alt;
      caption.textContent = figcaption ? figcaption.textContent.trim() : "";
      caption.hidden = !figcaption;
      dialog.showModal();
    });
  });
}

// ---------- Gentle reveal on scroll ----------
const revealTargets = document.querySelectorAll(
  ".timeline-item, .card, .quote-card, .honors-list li, .project"
);

if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -40px 0px" }
  );
  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}
