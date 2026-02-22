/* ------------------ COUNTDOWN ------------------ */
const birthday = new Date("2026-02-22T00:00:00");
const countdownEl = document.getElementById("countdown");

function updateCountdown() {
    const now = new Date();
    const diff = birthday - now;

    if (diff <= 0) {
        countdownEl.textContent = "🎉 Today is Ankita’s Birthday! 🎉";
        triggerConfetti();
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    countdownEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

/* ------------------ MUSIC BUTTON ------------------ */
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

musicBtn.onclick = () => {
    if (music.paused) {
        music.play();
        musicBtn.innerHTML = "Pause Music ⏸️";
    } else {
        music.pause();
        musicBtn.innerHTML = "Play Music 🎶";
    }
};

/* ------------------ SECRET BOX FLIP ------------------ */
document.getElementById("secretBox").onclick = () => {
    document.getElementById("secretBox").classList.toggle("flipped");
};

/* ------------------ SCROLL REVEAL ------------------ */
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
    });
});
document.querySelectorAll(".fade-section, .point").forEach(el => observer.observe(el));

/* ------------------ FINAL REVEAL ------------------ */
window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + window.innerHeight;
    const triggerPoint = document.body.offsetHeight - 200;

    if (scrollPos >= triggerPoint) {
        document.getElementById("finalReveal").classList.add("active");
    }
});

/* ------------------ CONFETTI ------------------ */
function triggerConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const confetti = [];
    for (let i = 0; i < 150; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 6 + 4,
            dx: Math.random() - 0.5,
            dy: Math.random() + 1,
            color: `hsl(${Math.random() * 360},100%,70%)`
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(c => {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
            ctx.fillStyle = c.color;
            ctx.fill();

            c.x += c.dx;
            c.y += c.dy;

            if (c.y > canvas.height) c.y = -10;
        });
        requestAnimationFrame(draw);
    }
    draw();
}

/* ------------------ FIREFLIES ------------------ */
const fireflyContainer = document.getElementById("fireflyContainer");
for (let i = 0; i < 25; i++) {
    const f = document.createElement("div");
    f.className = "firefly";
    f.style.top = Math.random() * innerHeight + "px";
    f.style.left = Math.random() * innerWidth + "px";
    fireflyContainer.appendChild(f);
}

/* ------------------ FIREWORKS (canvas) ------------------ */
const fwCanvas = document.getElementById("fireworksCanvas");
const fwCtx = fwCanvas.getContext("2d");

fwCanvas.width = innerWidth;
fwCanvas.height = innerHeight;

function fireworks() {
    for (let i = 0; i < 3; i++) {
        const x = Math.random() * fwCanvas.width;
        const y = Math.random() * fwCanvas.height;

        for (let j = 0; j < 25; j++) {
            const angle = Math.random() * 2 * Math.PI;
            const speed = Math.random() * 3;

            let px = x, py = y;

            function animate() {
                fwCtx.fillStyle = `hsla(${Math.random() * 360},100%,60%,0.8)`;
                fwCtx.beginPath();
                fwCtx.arc(px, py, 3, 0, Math.PI * 2);
                fwCtx.fill();

                px += Math.cos(angle) * speed;
                py += Math.sin(angle) * speed;

                if (speed > 0.1) {
                    speed *= 0.96;
                    requestAnimationFrame(animate);
                }
            }
            animate();
        }
    }
}

setInterval(() => {
    fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
    fireworks();
}, 1200);

/* ------------------ CONSTELLATION ------------------ */
const constCanvas = document.getElementById("constellation");
const ctxC = constCanvas.getContext("2d");

constCanvas.width = innerWidth;
constCanvas.height = innerHeight;

const stars = [];

for (let i = 0; i < 70; i++) {
    stars.push({
        x: Math.random() * constCanvas.width,
        y: Math.random() * constCanvas.height,
        r: Math.random() * 2 + 1
    });
}

function drawConstellation() {
    ctxC.clearRect(0, 0, constCanvas.width, constCanvas.height);

    stars.forEach(s => {
        ctxC.beginPath();
        ctxC.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctxC.fillStyle = "white";
        ctxC.fill();
    });

    requestAnimationFrame(drawConstellation);
}
drawConstellation();
