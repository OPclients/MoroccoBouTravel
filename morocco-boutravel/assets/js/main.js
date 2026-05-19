document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initTourFilters();
  initTourModal();
  initContactForm();
  initSmoothScroll();
});

function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initTourFilters() {
  const filters = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".tour-card[data-category]");
  if (!filters.length || !cards.length) return;

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const value = filter.dataset.filter;
      filters.forEach((item) => item.classList.remove("is-active"));
      filter.classList.add("is-active");

      cards.forEach((card) => {
        const categories = card.dataset.category.split(" ");
        const visible = value === "all" || categories.includes(value);
        card.hidden = !visible;
      });
    });
  });
}

function initTourModal() {
  const modal = document.querySelector(".modal");
  const modalBody = document.querySelector(".modal-body");
  const closeButtons = document.querySelectorAll(".modal-close");
  if (!modal || !modalBody) return;

  document.querySelectorAll(".explore-tour").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".tour-card");
      if (!card) return;

      const title = card.dataset.title;
      const location = card.dataset.location;
      const duration = card.dataset.duration;
      const price = card.dataset.price;
      const description = card.dataset.description;
      const whatsappText = encodeURIComponent(`Hello Morocco BouTravel, I would like to know more about ${title}.`);

      modalBody.innerHTML = `
        <p class="section-label">Tour details</p>
        <h2>${title}</h2>
        <div class="modal-meta">
          <span>${location}</span>
          <span>${duration}</span>
          <span>From ${price}</span>
        </div>
        <p>${description}</p>
        <h3>Short itinerary</h3>
        <p>This private Morocco itinerary is customized around your pace, travel dates, accommodation style, and interests. Morocco BouTravel will confirm the day-by-day route after your inquiry.</p>
        <div class="modal-lists">
          <div>
            <h3>Included</h3>
            <ul>
              <li>Private comfortable transport</li>
              <li>Local driver or guide support</li>
              <li>Pickup from your accommodation where applicable</li>
              <li>Planning assistance before the trip</li>
            </ul>
          </div>
          <div>
            <h3>Not included</h3>
            <ul>
              <li>Flights and travel insurance</li>
              <li>Personal expenses</li>
              <li>Lunches, drinks, and tips</li>
              <li>Entrance fees unless confirmed</li>
            </ul>
          </div>
        </div>
        <div class="modal-actions">
          <a class="btn btn-primary" href="contact.html">Book This Tour</a>
          <a class="btn btn-outline" href="https://wa.me/212663400243?text=${whatsappText}" target="_blank" rel="noopener">WhatsApp Us</a>
        </div>
      `;

      modal.classList.add("is-open");
      document.body.classList.add("modal-open");
      modal.querySelector(".modal-close").focus();
    });
  });

  closeButtons.forEach((button) => button.addEventListener("click", closeModal));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  }
}

function initContactForm() {
  const form = document.querySelector(".contact-form");
  const message = document.querySelector(".form-message");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const request = [
      "Hello Morocco BouTravel, I would like to send a travel request.",
      "",
      `Full Name: ${formData.get("name") || "-"}`,
      `Email: ${formData.get("email") || "-"}`,
      `Phone / WhatsApp: ${formData.get("phone") || "-"}`,
      `Travel Date: ${formData.get("date") || "-"}`,
      `Number of Travelers: ${formData.get("travelers") || "-"}`,
      `Preferred Tour: ${formData.get("tour") || "-"}`,
      `Message: ${formData.get("message") || "-"}`
    ].join("\n");

    const whatsappUrl = `https://wa.me/212663400243?text=${encodeURIComponent(request)}`;

    if (message) {
      message.textContent = "Opening WhatsApp with your travel request...";
      message.hidden = false;
    }

    window.open(whatsappUrl, "_blank", "noopener");
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}
