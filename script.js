const planButtons = document.querySelectorAll("[data-plan]");
const selectedPlanInput = document.querySelector("#selectedPlan");
const paymentPlan = document.querySelector("#paymentPlan");
const paymentAmount = document.querySelector("#paymentAmount");

const schoolNameInput = document.querySelector("#customSchoolName");
const logoInput = document.querySelector("#customLogo");
const messageInput = document.querySelector("#customMessage");
const previewLogo = document.querySelector("#previewLogo");
const previewName = document.querySelector("#previewName");
const previewTitle = document.querySelector("#previewTitle");
const previewMessage = document.querySelector("#previewMessage");
const schoolForm = document.querySelector("#schoolForm");
const roleButtons = document.querySelectorAll("[data-role]");
const activeRoleLabel = document.querySelector("#activeRoleLabel");
const loginPreviewBtn = document.querySelector("#loginPreviewBtn");

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan;
    const price = button.dataset.price;

    selectedPlanInput.value = `${plan} - ${price}`;
    paymentPlan.textContent = `${plan} Plan`;
    paymentAmount.textContent = price;

    document.querySelector("#registration").scrollIntoView({ behavior: "smooth" });
  });
});

function syncPreview() {
  const schoolName = schoolNameInput.value.trim() || "Your School";
  const logoText = logoInput.value.trim() || "YS";
  const message = messageInput.value.trim() || "Create a modern public website for your school.";

  previewLogo.textContent = logoText.toUpperCase();
  previewName.textContent = schoolName;
  previewTitle.textContent = schoolName;
  previewMessage.textContent = message;
}

[schoolNameInput, logoInput, messageInput].forEach((field) => {
  field.addEventListener("input", syncPreview);
});

schoolForm.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#customize").scrollIntoView({ behavior: "smooth" });
});


roleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    roleButtons.forEach((item) => item.closest("article").classList.remove("is-active"));
    button.closest("article").classList.add("is-active");
    activeRoleLabel.textContent = button.dataset.role;
  });
});

loginPreviewBtn.addEventListener("click", () => {
  document.querySelector("#portals").scrollIntoView({ behavior: "smooth" });
  roleButtons[0].click();
});
roleButtons[0].click();

syncPreview();

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mainNav = document.querySelector(".main-nav");
const headerAction = document.querySelector(".header-action");

mobileMenuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("is-open");
  headerAction.classList.toggle("is-open");
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll(".main-nav a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    headerAction.classList.remove("is-open");
  });
});
