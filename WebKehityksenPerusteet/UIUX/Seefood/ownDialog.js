document.addEventListener("DOMContentLoaded", function() {
  function setupDialog(btnId, dialogId, closeId) {
    const dialog = document.getElementById(dialogId);
    const openBtn = document.getElementById(btnId);
    const closeBtn = document.getElementById(closeId);

    if (!dialog || !openBtn || !closeBtn) return;

    const elements = dialog.querySelectorAll(
      "a, button, input, textarea, select, details, [tabindex]:not([tabindex='-1'])"
    );
    const firstElement = elements[0];
    const lastElement = elements[elements.length - 1];

    const trapFocus = (e) => {
      if (e.key === "Tab") {
        if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        } else if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      }
    };

    openBtn.addEventListener("click", () => {
      dialog.showModal();
      dialog.addEventListener("keydown", trapFocus);
    });

    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dialog.close();
      dialog.removeEventListener("keydown", trapFocus);
    });
  }

  setupDialog("crab", "dialog_crab", "close_crab");
  setupDialog("clam", "dialog_clam", "close_clam");
  setupDialog("hummus", "dialog_hummus", "close_hummus");
  setupDialog("cod", "dialog_cod", "close_cod");
});
