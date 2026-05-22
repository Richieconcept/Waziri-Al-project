const loader = document.getElementById("loader");
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const scrollTopButton = document.getElementById("scrollTop");
const currentYear = document.getElementById("currentYear");
const typedText = document.getElementById("typedText");

window.addEventListener("load", () => {
  loader?.classList.add("hide");
});

const updateChrome = () => {
  navbar?.classList.toggle("scrolled", window.scrollY > 28);
  scrollTopButton?.classList.toggle("show", window.scrollY > 520);
};

window.addEventListener("scroll", updateChrome, { passive: true });
updateChrome();

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (typedText) {
  const words = [
    "modern homes",
    "commercial spaces",
    "quality renovations",
    "civil engineering works",
    "architectural designs",
    "projects that last",
  ];
  let wordIndex = 0;
  let letterIndex = 0;
  let deleting = false;

  const typeNext = () => {
    const current = words[wordIndex];
    typedText.textContent = current.slice(0, letterIndex);

    if (!deleting && letterIndex < current.length) {
      letterIndex += 1;
      window.setTimeout(typeNext, 68);
      return;
    }

    if (!deleting && letterIndex === current.length) {
      deleting = true;
      window.setTimeout(typeNext, 1400);
      return;
    }

    if (deleting && letterIndex > 0) {
      letterIndex -= 1;
      window.setTimeout(typeNext, 34);
      return;
    }

    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    window.setTimeout(typeNext, 250);
  };

  typeNext();
}

hamburger?.addEventListener("click", () => {
  navLinks?.classList.toggle("open");
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => navLinks?.classList.remove("open"));
});

scrollTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const counters = document.querySelectorAll(".counter");
let countersStarted = false;

const animateCounters = () => {
  if (countersStarted) return;
  countersStarted = true;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    const start = performance.now();
    const duration = 1300;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      counter.textContent = Math.floor(progress * target).toString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        counter.textContent = target.toString();
      }
    };

    requestAnimationFrame(tick);
  });
};

if (counters.length && "IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        animateCounters();
        counterObserver.disconnect();
      }
    },
    { threshold: 0.4 }
  );

  counterObserver.observe(counters[0]);
} else {
  animateCounters();
}

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.style.display = show ? "" : "none";
    });
  });
});

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  formSuccess?.classList.add("show");
  contactForm.reset();

  window.setTimeout(() => {
    formSuccess?.classList.remove("show");
  }, 4500);
});
