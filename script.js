// ================================
// Loader
// ================================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    loader.style.transition = "0.7s";

    setTimeout(() => {

        loader.style.display = "none";

    }, 700);

});


// ================================
// Mobile Menu
// ================================

const menuBtn = document.querySelector(".menu-btn");

const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("show");

});


// ================================
// Sticky Navbar
// ================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

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

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

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

        const height = window.innerHeight;

        if (top < height - 100) {

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

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") == "#" + current) {

            link.classList.add("active");

        }

    });

});


// ================================
// Back To Top Button
// ================================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.right = "20px";
topBtn.style.bottom = "90px";
topBtn.style.width = "50px";
topBtn.style.height = "50px";
topBtn.style.borderRadius = "50%";
topBtn.style.border = "none";
topBtn.style.background = "#FFD700";
topBtn.style.color = "#111";
topBtn.style.fontSize = "22px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.zIndex = "999";

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

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

const image = document.querySelector(".image-box");

let scale = 1;

setInterval(() => {

    scale = scale === 1 ? 1.03 : 1;

    image.style.transform = `scale(${scale})`;

    image.style.transition = "2s";

}, 2000);


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