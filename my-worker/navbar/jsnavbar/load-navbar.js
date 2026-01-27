// ==================================
//   load-navbar.js
//   - Dynamically loads navbar.html
//   - Then loads navbar.js (behavior)
// ================================== 

document.addEventListener("DOMContentLoaded", async () => {
  const placeholder = document.getElementById("navbar-placeholder");
  if (!placeholder) return;

  try {
    // Fetch navbar HTML
    const response = await fetch("/navbar/navbar.html");
    if (!response.ok) {
      throw new Error("Navbar HTML not found");
    }

    const navbarHTML = await response.text();
    placeholder.innerHTML = navbarHTML;

    // Load navbar behavior script
    const script = document.createElement("script");
    script.src = "/navbar/jsnavbar/navbar.js";
    script.defer = true;

    document.body.appendChild(script);

  } catch (err) {
    console.error("❌ Failed to load navbar:", err);
  }
});
