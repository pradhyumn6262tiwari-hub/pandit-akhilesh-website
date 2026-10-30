
// ================================
// Loader
// ================================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (!loader) return;

    loader.style.transition = "opacity 0.7s";
    loader.style.opacity = "0";

    setTimeout(() => {
        loader.style.display = "none";
    }, 700);
});


// ================================
// Mobile Menu
// ================================
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("show");
    });
}


// ================================
// Sticky Navbar
// ================================
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (!header) return;

    if (window.scrollY > 60) {
        header.style.background = "#111";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.4)";
    } else {
        header.style.background = "rgba(0,0,0,.45)";
        header.style.boxShadow = "none";
    }
});


// ================================
// Smooth Scroll
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (event) {
        const href = this.getAttribute("href");

        if (!href || href === "#") return;

        const target = document.querySelector(href);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

            // Mobile menu close
            if (nav) {
                nav.classList.remove("show");
            }
        }
    });
});


// ================================
// Scroll Animation
// ================================
const cards = document.querySelectorAll(".card");

function revealCards() {
    cards.forEach(card => {
        const top = card.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
}

cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(60px)";
    card.style.transition = ".7s";
});

window.addEventListener("scroll", revealCards);
revealCards();


// ================================
// Active Menu
// ================================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

function updateActiveMenu() {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id") || "";
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (current && link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveMenu);


// ================================
// Back To Top Button
// ================================
const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";
topBtn.id = "topBtn";
topBtn.type = "button";

Object.assign(topBtn.style, {
    position: "fixed",
    right: "20px",
    bottom: "90px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    background: "#FFD700",
    color: "#111",
    fontSize: "22px",
    cursor: "pointer",
    display: "none",
    zIndex: "999"
});

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 500 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// ================================
// Hero Image Animation
// ================================
const heroImage = document.querySelector(".image-box");

if (heroImage) {
    let scale = 1;

    setInterval(() => {
        scale = scale === 1 ? 1.03 : 1;
        heroImage.style.transform = `scale(${scale})`;
        heroImage.style.transition = "transform 2s";
    }, 2000);
}


// ================================
// Greeting
// ================================
const hour = new Date().getHours();

if (hour < 12) {
    console.log("Good Morning");
} else if (hour < 18) {
    console.log("Good Afternoon");
} else {
    console.log("Good Evening");
}


// ================================
// Booking Form + ASP.NET Core API
// ================================
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = document.getElementById("bookingSubmit");
        const responseMessage = document.getElementById("bookingResponse");

        // Required HTML elements check
        if (!submitButton || !responseMessage) {
            console.error(
                "HTML mein bookingSubmit ya bookingResponse ID nahi mili."
            );

            alert(
                "Booking form mein technical issue hai. Please website administrator se contact karein."
            );

            return;
        }

        const bookingData = {
            customerName: document.getElementById("customerName")?.value.trim() || "",
            phone: document.getElementById("phone")?.value.trim() || "",
            bookingDate: document.getElementById("bookingDate")?.value || "",
            pujaName: document.getElementById("pujaName")?.value || "",
            location: document.getElementById("location")?.value.trim() || "",
            message: document.getElementById("message")?.value.trim() || "",
            status: "Pending"
        };

        // Local backend API
        const apiUrl = "https://panditji-api.runasp.net/api/Bookings";

        submitButton.disabled = true;
        submitButton.textContent = "Booking...";
        responseMessage.textContent = "";
        responseMessage.style.color = "";

        // Hide previous confirmation
        const successBox = document.getElementById("bookingSuccess");

        if (successBox) {
            successBox.hidden = true;
        }

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookingData)
            });

            // Read API response only once
            const responseText = await response.text();

            let result = {};

            if (responseText) {
                try {
                    result = JSON.parse(responseText);
                } catch {
                    result = {};
                }
            }

            console.log("Booking API response:", response.status, result);

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    result.title ||
                    `Booking failed. HTTP ${response.status}`
                );
            }

            // API must return the newly created booking ID.
            const bookingId =
                result.bookingId ??
                result.id ??
                result.Id;

            if (!bookingId) {
                responseMessage.style.color = "#ffcc00";
                responseMessage.textContent =
                    "Server ne booking save ki ho sakti hai, lekin Booking ID nahi mili. Admin se verify karein.";

                console.error(
                    "API response mein booking ID nahi mili:",
                    result
                );

                return;
            }

            // Show confirmation
            responseMessage.style.color = "#16804a";
            responseMessage.textContent =
                "Booking successfully submit ho gayi! Booking ID: " +
                bookingId;

            const successBookingId =
                document.getElementById("successBookingId");

            const viewDetailsButton =
                document.getElementById("viewBookingDetails");

            if (successBox && successBookingId && viewDetailsButton) {
                successBookingId.textContent = bookingId;
                successBox.hidden = false;

                viewDetailsButton.onclick = () => {
                    window.location.href =
                        "booking-details.html?bookingId=" +
                        encodeURIComponent(bookingId);
                };

                successBox.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

            bookingForm.reset();

        } catch (error) {
            console.error("Booking error:", error);

            responseMessage.style.color = "#ff6b6b";

            if (error instanceof TypeError) {
                responseMessage.textContent =
                    "Backend se connection nahi ho raha. Check karein ki .NET API chal rahi hai.";
            } else {
                responseMessage.textContent =
                    error.message ||
                    "Booking submit nahi hui. Please dobara try karein.";
            }

        } finally {
            // Always restore button, even if API fails
            submitButton.disabled = false;
            submitButton.textContent = "Book Now";
        }
    });
}