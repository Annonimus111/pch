import emailjs from 'https://cdn.skypack.dev/@emailjs/browser';
// import emailjs from 'https://cdn.emailjs.com/dist/email.min.mjs';

window.addEventListener('DOMContentLoaded', () => {
    const welcomeText = document.getElementById('h1');
    const mailLink = document.querySelector('.mail-link');
    const images = document.querySelectorAll('.image-section img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    const totalImages = images.length;

    // Add the "scale-in" effect to welcome text and mail link
    welcomeText.classList.add('scale-in');
    mailLink.classList.add('scale-in');

    // Clone the first and last images for smooth looping
    const firstImage = images[0].cloneNode(true);
    const lastImage = images[totalImages - 1].cloneNode(true);
    const imageSection = document.querySelector('.image-section');
    
    // Append the cloned images to the section
    imageSection.appendChild(firstImage);  // Append the first image at the end
    imageSection.insertBefore(lastImage, imageSection.firstChild);  // Insert the last image at the beginning

    // Update the carousel by translating images
    function updateCarousel() {
        const newTransform = `translateX(-${(currentIndex + 1) * 100}%)`;  // Add +1 for the cloned images
        imageSection.style.transform = newTransform;
    }

    // Handle the previous button click
    prevBtn.addEventListener('click', () => {
        if (currentIndex === 0) {
            currentIndex = totalImages - 1;
            setTimeout(() => {
                imageSection.style.transition = 'none';  // Disable transition for smooth jump
                updateCarousel();
            }, 100);
        } else {
            currentIndex--;
            updateCarousel();
        }
    });

    // Handle the next button click
    nextBtn.addEventListener('click', () => {
        if (currentIndex === totalImages) {
            currentIndex = 0;
            setTimeout(() => {
                imageSection.style.transition = 'none';  // Disable transition for smooth jump
                updateCarousel();
            }, 100);
        } else {
            currentIndex++;
            updateCarousel();
        }
    });

    // Optional: Autoplay functionality (change every 3 seconds)
    setInterval(() => {
        if (currentIndex === totalImages) {
            currentIndex = 0;
            setTimeout(() => {
                imageSection.style.transition = 'none';  // Disable transition for smooth jump
                updateCarousel();
            }, 100);
        } else {
            currentIndex++;
            updateCarousel();
        }
    }, 3000); // 3 seconds for autoplay
});


// EmailJs
window.addEventListener("DOMContentLoaded", () => {
  emailjs.init("xt0V1rd2v62rjxDUd"); // Replace with your public key

  const form = document.getElementById("claimForm");
  const statusMsg = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      statusMsg.textContent = "Submitting...";
      statusMsg.className = "";

      emailjs
        .sendForm("service_9ocjrv5", "template_7g98cmy", form)
        .then(() => {
          statusMsg.textContent = "Form submitted successfully!";
          statusMsg.className = "success";
          form.reset();

          setTimeout(() => {
            statusMsg.textContent = ""; // Clear the message after 3 seconds
            statusMsg.classList.remove("success");
            }, 3000);
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          statusMsg.textContent = "There was an error submitting the form.";
          statusMsg.className = "error";
        });
    });
  }
});
