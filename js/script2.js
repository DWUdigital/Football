const header = document.querySelector("header");
      const hamburgerBtn = document.querySelector("#hamburger-btn");
      const closeMenuBtn = document.querySelector("#close-menu-btn");

      // Toggle mobile menu on hamburger button click
      hamburgerBtn.addEventListener("click", () => header.classList.toggle("show-mobile-menu"));

      // Close mobile menu on close button click
      closeMenuBtn.addEventListener("click", () => hamburgerBtn.click());
      // listing vars here so they're in the global scope
var cards, nCards, cover, openContent, openContentText, pageIsOpen = false,
    openContentImage, closeContent, windowWidth, windowHeight, currentCard;
    function filterCountries() {
        var input, filter, select, option, i;
        input = document.getElementById("countrySearch");
        filter = input.value.toUpperCase();
        select = document.getElementById("country");
        option = select.getElementsByTagName("option");
        for (i = 0; i < option.length; i++) {
            txtValue = option[i].textContent || option[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                option[i].style.display = "";
            } else {
                option[i].style.display = "none";
            }
        }
    }
    
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    // Function to handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        // Perform your email sending logic here

        // Redirect the user to mail.html after the email has been sent
        window.location.href = "mail.html";
    };

    // Add event listener for form submission
    form.addEventListener("submit", handleFormSubmit);
});

