// ========================================
// CONFIG
// ========================================

const CORRECT_PIN = "2508";


// ========================================
// PASSWORD
// ========================================

function checkPassword() {

    const passwordInput =
        document.getElementById("passwordInput");

    const password =
        passwordInput.value.trim();

    if (password === CORRECT_PIN) {

        document.getElementById("passwordScreen")
            .style.opacity = "0";

        setTimeout(() => {

            document.getElementById("passwordScreen")
                .style.display = "none";

            document.getElementById("websiteContent")
                .style.display = "block";

            document.body.classList.add("unlocked");

            createHearts();

        }, 800);

    } else {

        passwordInput.classList.add("shake");

        setTimeout(() => {
            passwordInput.classList.remove("shake");
        }, 500);

        alert("Wrong password, sayang 🤍");

        passwordInput.value = "";
        passwordInput.focus();
    }
}


// ========================================
// ENTER KEY FOR PASSWORD
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const passwordInput =
        document.getElementById("passwordInput");

    if (passwordInput) {

        passwordInput.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {
                checkPassword();
            }

        });

    }

});


// ========================================
// OPEN GIFT
// ========================================

function openGift() {

    const music =
        document.getElementById("music");

    // Play music
    if (music) {

        music.volume = 0.45;

        music.play().catch(() => {
            console.log("Music waiting for user interaction.");
        });

    }

    // Scroll to first message
    const giftSection =
        document.getElementById("giftSection");

    if (giftSection) {

        giftSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

    // Create extra hearts
    createHeartBurst();
}


// ========================================
// FLOATING HEARTS
// ========================================

function createHeart() {

    const heartsContainer =
        document.getElementById("hearts");

    if (!heartsContainer) return;

    const heart =
        document.createElement("div");

    const heartSymbols = [
        "♡",
        "♥",
        "🤍",
        "🖤"
    ];

    heart.innerHTML =
        heartSymbols[
            Math.floor(
                Math.random() * heartSymbols.length
            )
        ];

    heart.className = "floating-heart";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        Math.random() * 14 + 12 + "px";

    heart.style.animationDuration =
        Math.random() * 5 + 6 + "s";

    heart.style.opacity =
        Math.random() * 0.5 + 0.3;

    heartsContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 12000);

}


// Create hearts continuously
setInterval(createHeart, 700);


// ========================================
// HEART BURST
// ========================================

function createHeartBurst() {

    const heartsContainer =
        document.getElementById("hearts");

    if (!heartsContainer) return;

    for (let i = 0; i < 15; i++) {

        setTimeout(() => {

            const heart =
                document.createElement("div");

            heart.innerHTML = "♡";

            heart.className =
                "heart-burst";

            heart.style.left =
                45 + Math.random() * 10 + "vw";

            heart.style.top =
                45 + Math.random() * 10 + "vh";

            heart.style.setProperty(
                "--x",
                (Math.random() * 300 - 150) + "px"
            );

            heart.style.setProperty(
                "--y",
                (Math.random() * -300 - 50) + "px"
            );

            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 2000);

        }, i * 80);

    }

}


// ========================================
// DYNAMIC ANIMATIONS
// ========================================

const animationStyle =
document.createElement("style");

animationStyle.innerHTML = `

/* FLOATING HEART */

.floating-heart {

    position: fixed;

    top: -40px;

    color: rgba(255,255,255,.7);

    pointer-events: none;

    z-index: 5;

    animation:
        heartFall linear forwards;

    text-shadow:
        0 0 10px rgba(255,255,255,.25);

}

@keyframes heartFall {

    0% {

        transform:
            translateY(0)
            rotate(0deg);

        opacity: 0;

    }

    10% {

        opacity: 1;

    }

    50% {

        transform:
            translateY(50vh)
            rotate(180deg);

    }

    100% {

        transform:
            translateY(115vh)
            rotate(360deg);

        opacity: 0;

    }

}


/* HEART BURST */

.heart-burst {

    position: fixed;

    color: white;

    font-size: 22px;

    pointer-events: none;

    z-index: 9999;

    animation:
        burst 1.8s ease-out forwards;

}

@keyframes burst {

    0% {

        transform:
            translate(0,0)
            scale(.5);

        opacity: 1;

    }

    100% {

        transform:
            translate(var(--x),var(--y))
            scale(1.5);

        opacity: 0;

    }

}


/* FADE IN */

.fade-in {

    opacity: 0;

    transform:
        translateY(35px);

    transition:
        opacity 1s ease,
        transform 1s ease;

}

.fade-in.show {

    opacity: 1;

    transform:
        translateY(0);

}


/* PASSWORD SHAKE */

.shake {

    animation:
        shake .45s ease;

}

@keyframes shake {

    0%,100% {
        transform: translateX(0);
    }

    20% {
        transform: translateX(-8px);
    }

    40% {
        transform: translateX(8px);
    }

    60% {
        transform: translateX(-6px);
    }

    80% {
        transform: translateX(6px);
    }

}


/* PASSWORD FADE */

#passwordScreen {

    transition:
        opacity .8s ease;

}


/* UNLOCKED BODY */

body.unlocked {

    overflow-x: hidden;

}

`;

document.head.appendChild(animationStyle);


// ========================================
// SCROLL REVEAL
// ========================================

const observer =
new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target
                    .classList
                    .add("show");

            }

        });

    },

    {
        threshold: 0.12
    }

);


// ========================================
// ELEMENTS TO ANIMATE
// ========================================

document.querySelectorAll(
    ".section, " +
    ".glass-card, " +
    ".reason-card, " +
    ".wish, " +
    ".quote-section, " +
    ".final-section, " +
    ".ending"
).forEach(element => {

    element.classList.add("fade-in");

    observer.observe(element);

});


// ========================================
// REASON CARD HOVER
// ========================================

document.querySelectorAll(
    ".reason-card"
).forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.style.transform =
                "translateY(-8px)";

        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


// ========================================
// WISH HOVER
// ========================================

document.querySelectorAll(
    ".wish"
).forEach(wish => {

    wish.addEventListener(
        "mouseenter",
        () => {

            wish.style.transform =
                "translateX(8px)";

        }
    );

    wish.addEventListener(
        "mouseleave",
        () => {

            wish.style.transform = "";

        }
    );

});


// ========================================
// HERO PARALLAX
// ========================================

window.addEventListener(
    "scroll",
    () => {

        const hero =
            document.querySelector(".hero");

        if (!hero) return;

        const scroll =
            window.pageYOffset;

        if (scroll < window.innerHeight) {

            hero.style.transform =
                `translateY(${scroll * 0.08}px)`;

            hero.style.opacity =
                Math.max(
                    0.4,
                    1 - scroll / 700
                );

        }

    }
);


// ========================================
// ROMANTIC QUOTES
// ========================================

const quotes = [

    "Twenty-one looks beautiful on you. 🖤",

    "I'm so lucky I get to love you.",

    "You will always have my heart. ♡",

    "Another year of you to celebrate.",

    "I hope this year is kind to you.",

    "You deserve every beautiful thing.",

    "My favorite person, today and always.",

    "Happy birthday to the person I love. 🖤"

];


const quoteElement =
document.createElement("div");

quoteElement.className =
"floating-quote";

quoteElement.innerText =
quotes[0];

document.body.appendChild(
    quoteElement
);


let currentQuote = 0;


setInterval(() => {

    currentQuote++;

    if (currentQuote >= quotes.length) {
        currentQuote = 0;
    }

    quoteElement.style.opacity = "0";

    setTimeout(() => {

        quoteElement.innerText =
            quotes[currentQuote];

        quoteElement.style.opacity =
            "1";

    }, 500);

}, 5000);


// ========================================
// QUOTE STYLE
// ========================================

const quoteStyle =
document.createElement("style");

quoteStyle.innerHTML = `

.floating-quote {

    position: fixed;

    bottom: 22px;

    left: 50%;

    transform:
        translateX(-50%);

    max-width:
        calc(100% - 40px);

    padding:
        10px 20px;

    border:
        1px solid
        rgba(255,255,255,.12);

    border-radius:
        50px;

    background:
        rgba(15,15,15,.72);

    backdrop-filter:
        blur(14px);

    -webkit-backdrop-filter:
        blur(14px);

    color:
        rgba(255,255,255,.85);

    font-family:
        "Poppins",
        sans-serif;

    font-size:
        12px;

    font-weight:
        300;

    letter-spacing:
        .3px;

    text-align:
        center;

    white-space:
        nowrap;

    z-index:
        999;

    opacity:
        1;

    transition:
        opacity .5s ease,
        transform .5s ease;

    box-shadow:
        0 5px 30px
        rgba(0,0,0,.35);

}

@media(max-width:500px){

    .floating-quote {

        font-size:
            10px;

        padding:
            9px 15px;

    }

}

`;

document.head.appendChild(
    quoteStyle
);


// ========================================
// MUSIC CONTROL
// ========================================

const music =
document.getElementById("music");

if (music) {

    music.volume = 0.45;

}


// ========================================
// PREVENT ACCIDENTAL PAGE JUMP
// ========================================

window.addEventListener(
    "beforeunload",
    () => {

        window.scrollTo(0, 0);

    }
);
