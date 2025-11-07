document.addEventListener("DOMContentLoaded", () => {
  // --- SCROLL SUAVE CORREGIDO ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        const navbarHeight = document.getElementById("navbar").offsetHeight;
        const offsetTop = target.offsetTop - navbarHeight + 10;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    });
  });

  // --- FORMULARIO ---
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      msg.textContent = "";
      msg.classList.add("hidden");

      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { "Accept": "application/json" },
      });

      if (response.ok) {
        form.reset();
        msg.textContent = "¡Mensaje enviado correctamente!";
        msg.className = "text-fuchsia-400 animate-pulse mt-3";
      } else {
        msg.textContent = "Ocurrió un error al enviar el mensaje. Intentá nuevamente.";
        msg.className = "text-red-400 mt-3";
      }

      setTimeout(() => msg.classList.add("hidden"), 4000);
    });
  }

  // --- AOS ---
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }
});

//ANIMACION SCROLL SUAVE PERSONALIZADO
function smoothScrollTo(targetY, duration = 600) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    window.scrollTo(0, startY + distance * ease);
    if (elapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const navbarHeight = document.getElementById("navbar").offsetHeight;
      const offsetTop = target.offsetTop - navbarHeight + 10;
      smoothScrollTo(offsetTop);
    }
  });
});