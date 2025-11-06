//CONTACTO
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Evita recargar la página
      const formData = new FormData(form);

      // Enviar el formulario a Formspree
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        alert("¡Mensaje enviado correctamente!");
        form.reset(); // 💥 Limpia todos los campos del formulario
      } else {
        alert("Ocurrió un error al enviar el mensaje. Intentá nuevamente.");
      }
    });
  });