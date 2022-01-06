/* toolbar */

const toolbar = document.querySelector(".toolbar");
const toolbarItems = document.querySelectorAll(".toolbar__item");
works = document.querySelectorAll(".work");
toolbar.addEventListener("click", function (e) {
  // filter
  if (!e.target.classList.contains("toolbar__item")) return;
  // remove active from all
  toolbarItems.forEach((t) => t.classList.remove("toolbar__item--active"));
  // add active to selected
  e.target.classList.add("toolbar__item--active");
  const kind = e.target.dataset.kind;
  if (kind === "all") {
    works.forEach(function (work) {
      work.classList.remove("hidden");
    });
  } else {
    works.forEach(function (work) {
      if (work.dataset.category === e.target.dataset.kind) {
        work.classList.remove("hidden");
      } else {
        work.classList.add("hidden");
      }
    });
  }
});

/* form email */
const emailInp = document.querySelector('input[type="email"]');
// get default placeholder
const emailInpPlaceholder = emailInp.getAttribute("placeholder");
emailInp.addEventListener("focus", function (e) {
  this.setAttribute("placeholder", "email ...");
});

emailInp.addEventListener("blur", function (e) {
  this.setAttribute("placeholder", emailInpPlaceholder);
});

const activeNav = function (clicked, scroll) {
  const allNavLinks = document.querySelectorAll(".nav__item");
  allNavLinks.forEach(function (link) {
    //console.log("25");
    link.classList.remove("active");
  });
  clicked.classList.add("active");
  // smooth scroll
  //console.log(clicked);
  if (scroll) {
    const target = document.querySelector(clicked.querySelector(".nav__link").getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  }

  //console.log(clicked, target);
};

// scrollIntoView

document.querySelector(".nav__nav").addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".nav__item");
  if (!clicked) return;

  activeNav(clicked, true);
});

const allSections = document.querySelectorAll(".section");

const obsCallback = function (entries, obs) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      //console.log(entry.target.id);
      const id = entry.target.id;
      if (!id || id === "posts") return;
      // console.log("id ", id);
      const target = document.querySelector(`.nav__link[href='#${id}']`).closest(".nav__item");
      activeNav(target, false);
    }
  });
};
const options = {
  root: null,
  threshold: 0.2,
  // threshold: 0,
  rootMargin: "0px 0px 0px 0px",
};
const observer = new IntersectionObserver(obsCallback, options);

allSections.forEach(function (sec) {
  observer.observe(sec);
});
