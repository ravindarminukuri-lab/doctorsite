/* ==========================================================================
   Dr. Shashank Agrawal — Urology & Uro-Oncology (Sindhu Hospitals) — main.js
   ========================================================================== */
(function ($) {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  $(function () {

    /* ---------------------------------------------------------------------
       Sticky header: transparent over hero, solid on scroll
    --------------------------------------------------------------------- */
    var $header = $(".site-header");
    var hasTransparentHero = $header.data("transparent") === true || $header.data("transparent") === "true";

    function updateHeaderState() {
      if ($(window).scrollTop() > 40) {
        $header.addClass("is-scrolled");
      } else if (!hasTransparentHero) {
        $header.addClass("is-scrolled");
      } else {
        $header.removeClass("is-scrolled");
      }
    }
    updateHeaderState();
    $(window).on("scroll", updateHeaderState);

    /* ---------------------------------------------------------------------
       Mobile hamburger: animate icon, mark header solid while menu is open
    --------------------------------------------------------------------- */
    var $toggler = $(".navbar-toggler");
    var $navCollapse = $("#mainNavCollapse");
    $navCollapse.on("show.bs.collapse", function () {
      $toggler.addClass("open");
      $header.addClass("menu-open");
    });
    $navCollapse.on("hidden.bs.collapse", function () {
      $toggler.removeClass("open");
      $header.removeClass("menu-open");
    });

    // Close the mobile menu after clicking a plain nav link or a submenu item
    $navCollapse.find("a.nav-link:not(.dropdown-toggle), a.dropdown-item").on("click", function () {
      if ($navCollapse.hasClass("show")) {
        bootstrap.Collapse.getOrCreateInstance($navCollapse[0]).hide();
      }
    });

    /* ---------------------------------------------------------------------
       Treatments dropdown: native Bootstrap dropdown handles click/keyboard
       on all screen sizes (see data-bs-toggle="dropdown" in the markup).
       On desktop we additionally open/close it on hover, using Bootstrap's
       own Dropdown API so its internal state (aria-expanded, positioning)
       stays correct instead of fighting the click handler.
    --------------------------------------------------------------------- */
    $(".nav-item.dropdown").each(function () {
      var $item = $(this);
      var toggleEl = $item.find('[data-bs-toggle="dropdown"]')[0];
      if (!toggleEl) return;
      var dropdown = bootstrap.Dropdown.getOrCreateInstance(toggleEl);
      var closeTimer = null;

      $item.on("mouseenter", function () {
        if (!window.matchMedia("(min-width: 992px)").matches) return;
        clearTimeout(closeTimer);
        dropdown.show();
      });
      $item.on("mouseleave", function () {
        if (!window.matchMedia("(min-width: 992px)").matches) return;
        closeTimer = setTimeout(function () { dropdown.hide(); }, 150);
      });
    });

    /* ---------------------------------------------------------------------
       Active link highlighting based on current page / section
    --------------------------------------------------------------------- */
    var currentPath = window.location.pathname.split("/").pop() || "index.html";
    $(".main-nav .nav-link").each(function () {
      var href = ($(this).attr("href") || "").split("/").pop();
      if (href === currentPath) {
        $(this).addClass("active");
      }
    });

    /* ---------------------------------------------------------------------
       Scroll reveal via IntersectionObserver
    --------------------------------------------------------------------- */
    var revealEls = document.querySelectorAll("[data-reveal]");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var delay = entry.target.getAttribute("data-reveal-delay");
            if (delay) { entry.target.style.transitionDelay = delay + "ms"; }
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }

    /* ---------------------------------------------------------------------
       Animated stat counters
    --------------------------------------------------------------------- */
    function animateCounter($el) {
      var target = parseFloat($el.data("count"));
      var suffix = $el.data("suffix") || "";
      var isDecimal = target % 1 !== 0;
      var duration = 1600;
      var startTime = null;

      function step(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = eased * target;
        $el.text((isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          $el.text((isDecimal ? target.toFixed(1) : target) + suffix);
        }
      }
      window.requestAnimationFrame(step);
    }

    var counterEls = document.querySelectorAll("[data-count]");
    if (counterEls.length) {
      if (reduceMotion || !("IntersectionObserver" in window)) {
        counterEls.forEach(function (el) {
          var $el = $(el);
          $el.text($el.data("count") + ($el.data("suffix") || ""));
        });
      } else {
        var counterIO = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter($(entry.target));
              counterIO.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
        counterEls.forEach(function (el) { counterIO.observe(el); });
      }
    }

    /* ---------------------------------------------------------------------
       Patient journey connecting line fill
    --------------------------------------------------------------------- */
    var $journey = $(".journey-wrap");
    if ($journey.length) {
      var journeyDone = false;
      var journeyIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !journeyDone) {
            journeyDone = true;
            $journey.find(".journey-line .fill").css("width", "100%");
            $journey.find(".journey-step").each(function (i) {
              var $step = $(this);
              setTimeout(function () { $step.addClass("is-active"); }, i * 220);
            });
          }
        });
      }, { threshold: 0.4 });
      journeyIO.observe($journey[0]);
    }

    /* ---------------------------------------------------------------------
       Back to top button
    --------------------------------------------------------------------- */
    var $backToTop = $(".back-to-top");
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 500) {
        $backToTop.addClass("is-visible");
      } else {
        $backToTop.removeClass("is-visible");
      }
    });
    $backToTop.on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, reduceMotion ? 0 : 500);
    });

    /* ---------------------------------------------------------------------
       Bootstrap form validation for the appointment form
    --------------------------------------------------------------------- */
    var forms = document.querySelectorAll(".needs-validation");
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (!form.checkValidity()) {
          form.classList.add("was-validated");
          var firstInvalid = form.querySelector(":invalid");
          if (firstInvalid) { firstInvalid.focus(); }
          return;
        }
        form.classList.add("was-validated");
        var $success = $(form).siblings(".form-success-msg");
        if (!$success.length) {
          $success = $('<div class="form-success-msg alert alert-success mt-3" role="status"></div>')
            .text("Thank you. Your appointment request has been received — our team will call you shortly to confirm.");
          $(form).after($success);
        }
        $success.show();
        form.reset();
        form.classList.remove("was-validated");
        window.setTimeout(function () { $success.fadeOut(400); }, 6000);
      }, false);
    });

    /* ---------------------------------------------------------------------
       Set current year in footer
    --------------------------------------------------------------------- */
    $(".current-year").text(new Date().getFullYear());

    /* ---------------------------------------------------------------------
       Smooth-scroll for in-page anchor links (e.g. Home page dropdown/CTAs)
    --------------------------------------------------------------------- */
    $('a[href*="#"]').each(function () {
      var href = $(this).attr("href");
      if (!href || href === "#" || href.indexOf("#") === -1) return;
      var hashIndex = href.indexOf("#");
      var path = href.substring(0, hashIndex);
      var hash = href.substring(hashIndex);
      var samePage = path === "" || path === window.location.pathname.split("/").pop();
      if (samePage && $(hash).length) {
        $(this).on("click", function (e) {
          e.preventDefault();
          var target = $(hash);
          $("html, body").animate(
            { scrollTop: target.offset().top - 90 },
            reduceMotion ? 0 : 600
          );
        });
      }
    });

  });
})(jQuery);
