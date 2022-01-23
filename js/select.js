const inputs = document.querySelectorAll(".input");

inputs.forEach((input) =>
  input.addEventListener("focus", () => {
    const box = input.nextElementSibling;
    if (input.focus) {
      box.innerHTML = `<i class="fas fa-chevron-down"></i>`;
    } else {
      box.innerHTML = `<i class="fas fa-chevron-up"></i>`;
    }
  })
);
