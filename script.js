"use strict";

const GREETINGS = [
  "Hai",
  "Halo",
  "Welkam",
  "Sip 👍",
  "♡ Gracie",
  "Konnichiwa",
  "Yossha ikuzo",
  "Nyari apa bang?",
  "Cek link di bawah",
  "Lumuri dengan tepung",
];

function setupLinkAnimations() {
  document.querySelectorAll(".links, .socials").forEach((list) => {
    Array.from(list.children).forEach((item, index) => {
      item.style.setProperty("--i", index);
    });
  });
}

function setupBackgroundParallax() {
  const background = document.querySelector(".background-loves");
  if (!background) return;

  const motion = window.matchMedia(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  );
  let frame = null;
  let x = 0;
  let y = 0;

  function reset() {
    cancelAnimationFrame(frame);
    frame = null;
    background.style.removeProperty("--parallax-x");
    background.style.removeProperty("--parallax-y");
  }

  document.addEventListener("pointermove", (event) => {
    if (!motion.matches || event.pointerType !== "mouse") return;

    x = (event.clientX / window.innerWidth - 0.5) * 72;
    y = (event.clientY / window.innerHeight - 0.5) * 54;
    if (frame !== null) return;

    frame = requestAnimationFrame(() => {
      background.style.setProperty("--parallax-x", `${x}px`);
      background.style.setProperty("--parallax-y", `${y}px`);
      frame = null;
    });
  });

  document.documentElement.addEventListener("pointerleave", reset);
  window.addEventListener("blur", reset);
  motion.addEventListener("change", reset);
}

function setupAvatarBubble() {
  const avatar = document.getElementById("avatar");
  const bubble = document.querySelector(".bubble");
  if (!avatar || !bubble) return;

  let last = -1;
  avatar.addEventListener("mouseenter", () => {
    if (!GREETINGS.length) return;
    let i;
    do {
      i = Math.floor(Math.random() * GREETINGS.length);
    } while (GREETINGS.length > 1 && i === last);
    last = i;
    bubble.textContent = GREETINGS[i];
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupLinkAnimations();
  setupBackgroundParallax();
  setupAvatarBubble();
});
