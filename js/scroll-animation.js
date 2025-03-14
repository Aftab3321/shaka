gsap.registerPlugin(ScrollTrigger);

function initScrollAnimation() {
  const isMobileResolution = window.innerWidth < 1024;

  let currentScrollPage = 0;

  let sectionTl = gsap.timeline({});

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  if (!isMobileResolution) {
    let navItems = gsap.utils.toArray(".index-box");
    let panels = gsap.utils.toArray(".block-wrapper"),
      observer = ScrollTrigger.normalizeScroll(true),
      scrollTween;

    let isActive = false;

    // on touch devices, ignore touchstart events if there's an in-progress tween so that touch-scrolling doesn't interrupt and make it wonky
    document.addEventListener(
      "touchstart",
      (e) => {
        if (scrollTween) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      },
      { capture: true, passive: false }
    );

    function goToSection(i, duration = 1.1) {
      sectionTl.resume();
      sectionTl.to(window, {
        scrollTo: { y: i * innerHeight },
        onStart: () => {
          $(".index-box").removeClass("double");
          $(`.index-box.box-${i - 1}`).addClass("double");
          currentScrollPage = i;
          isActive = true;
          observer.disable(); // for touch devices, as soon as we start forcing scroll it should stop any current touch-scrolling, so we just disable() and enable() the normalizeScroll observer
          observer.enable();
        },
        duration,
        onComplete: () => (isActive = false),
      });
    }

    function onToggle(self) {
      if (self.isActive) {
        let i = panels.indexOf(self.trigger);
        if (!isActive && i !== -1) {
          goToSection(i);
        }
      }
    }

    function setCardYPositionClass() {
      $(".svg-animation").toggleClass("positioned");
    }

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top bottom",
        onToggle: onToggle,
      });
    });

    navItems.forEach((nav, i) => {
      nav.addEventListener("click", () => {
        const duration = Math.abs(currentScrollPage - (i + 1)) * 0.7;
        goToSection(i + 1, duration);
      });
    });

    // navigation animation
    ScrollTrigger.create({
      trigger: ".animation-wrapper",
      endTrigger: ".block-wrapper:last-of-type",
      start: "top top",
      end: "top top",
      pin: ".block-nav",
    });

    gsap.fromTo(
      ".block-nav",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: ".block-wrapper:nth-of-type(1)",
          start: "bottom 20%",
          scrub: true,
        },
      }
    );

    // card animation
    ScrollTrigger.create({
      trigger: ".animation-wrapper",
      start: "top top",
      end: "bottom bottom",
      pin: ".card-container",
    });

    ScrollTrigger.create({
      trigger: ".animation-wrapper",
      start: `top top=+${window.innerHeight / 2}`,
      onToggle: () => setCardYPositionClass(),
    });
  }

  /* Block 2 */
  let customBox = gsap.utils.toArray(".customisation-box");
  customBox.forEach((box, i) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: box,
        start: "top bottom",
        toggleActions: "play pause resume reset",
      },
    });
    tl.from(box, { opacity: 0, scale: 0.7 }, i * 0.3)
      .to(box, { opacity: 1, scale: 1.05, duration: 0.7 })
      .to(box, { opacity: 1, scale: 1, duration: 0.2 });
  });

  const customBoxText = gsap.utils.toArray(".customisation-box > *");
  customBoxText.forEach((box, i) => {
    gsap.timeline({
      scrollTrigger: {
        trigger: box,
        start: "top bottom",
        end: "+=199%",
        toggleActions: "play none none reset",
        toggleClass: "active",
      },
    });
  });

  const customInput = ".customise-network input";
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: customInput,
      start: "top bottom",
      toggleActions: "play none none reset",
    },
  });
  tl.from(customInput, { opacity: 0, scale: 0.7 }).to(customInput, {
    opacity: 1,
    scale: 1,
    duration: 0.7,
  });

  let customDescriptionLines = gsap.utils.toArray(
    ".customisation-description-line"
  );
  customDescriptionLines.forEach((box, i) => {
    const isEven = i % 2 === 0;
    const finalOpacity = isEven ? 0.5 : 1;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: box,
        start: "top bottom",
        toggleActions: "play none none reset",
      },
    });
    tl.from(box, { opacity: 0, x: 100 }, (i + 1) * 0.3)
      .to(box, { opacity: finalOpacity, x: 100, duration: 0.7 }, "-=0.3")
      .to(box, { opacity: finalOpacity, x: 0, duration: 0.2 });
  });

  /* End Block 2 */

  /* Block 3 */

  const revenueImg = ".revenue-img-1";
  const revenueImgtl = gsap.timeline({
    scrollTrigger: {
      trigger: revenueImg,
      start: "top-=50px bottom",
      toggleActions: "play none none reset",
    },
  });
  revenueImgtl.from(revenueImg, { scale: 0.8, y: 50 }).to(revenueImg, {
    scale: 1,
    y: 0,
    duration: 0.4,
  });

  const revenueImg2 = ".revenue-img-2";
  const revenueImgtl2 = gsap.timeline({
    scrollTrigger: {
      trigger: revenueImg,
      start: "top bottom",
      toggleActions: "play pause resume reset",
    },
  });
  revenueImgtl2
    .from(revenueImg2, { scale: 0.4, duration: 0.4 }, 0.25)
    .to(revenueImg2, {
      scale: 1,
      duration: 0.7,
    });

  const revenueText = ".maximise-revenue-text";
  const revenueTextTl = gsap.timeline({
    scrollTrigger: {
      trigger: revenueImg,
      start: "top bottom",
      toggleActions: "play none none reset",
    },
  });
  revenueTextTl
    .from(revenueText, { opacity: 0, y: 50 })
    .to(revenueText, { opacity: 0.5, duration: 0.4 })
    .to(revenueText, { y: 0, duration: 0.6 }, "-=0.2");

  /* End Block 2 */

  /* Block 3 */

  const offerPlanImg1 = ".offer-plans-img-1";
  const offerPlanImg2 = ".offer-plans-img-2";
  const offerPlanImg3 = ".offer-plans-img-3";
  const offerPlansProps = {
    scrollTrigger: {
      trigger: ".offer-container",
      start: "top bottom",
      toggleActions: "play pause resume reset",
    },
  };

  const offerPlanImg1Tl = gsap.timeline(offerPlansProps);
  offerPlanImg1Tl
    .from(offerPlanImg1, { rotate: -45, scale: 0.8, y: 250, opacity: 0 }, 0.5)
    .to(offerPlanImg1, {
      rotate: 0,
      scale: 1,
      y: 0,
      opacity: 1,
      duration: 0.8,
    });

  const offerPlanImg3Tl = gsap.timeline(offerPlansProps);
  offerPlanImg3Tl
    .from(offerPlanImg3, { rotate: -180, opacity: 0 }, 1)
    .to(offerPlanImg3, { duration: 0.8, opacity: 1 })
    .to(offerPlanImg3, { rotate: -0, duration: 1.2 }, "-=0.5");

  const offerPlanImg2Tl = gsap.timeline(offerPlansProps);

  offerPlanImg2Tl
    .from(offerPlanImg2, { scale: 0.5, opacity: 0 }, 1.5)
    .to(offerPlanImg2, { y: 0, opacity: 1, duration: 0.3 })
    .to(offerPlanImg2, { scale: 1, duration: 0.6 }, "-=0.3");

  /* Block 4 */
  const networkImg = ".network-data-img";
  const networkText = ".network-text span";
  const networkImgTl = gsap.timeline({
    scrollTrigger: {
      trigger: networkImg,
      start: "top bottom",
      toggleActions: "play none none reset",
    },
  });

  const networkImgTl2 = gsap.timeline({
    scrollTrigger: {
      trigger: networkImg,
      start: "top bottom",
      toggleActions: "play none none reset",
    },
  });

  networkImgTl
    .from(networkImg, { opacity: 0, scale: 0.7, y: 20 })
    .to(
      networkImg,
      {
        opacity: 1,
        scale: 1,
        duration: 1,
      },
      1
    )
    .to(networkImg, { y: 0, duration: 0.5 });

  networkImgTl2
    .from(networkText, { opacity: 0, y: 100, ease: "none" }, 0.5)
    .to(networkText, { opacity: 1, y: 0, duration: 1.2 });

  /* End Block 4 */

  /* Block 5 */
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function updateGrowthMetrics() {
    const duration = 2;

    const getValues = (start, end, length, isFixed) => {
      const values = [];
      for (let i = 0; i < length; i++) {
        const value = (Math.random() * (end - start) + start).toFixed(
          isFixed ? 2 : 0
        );
        values.push(value);
      }
      values.sort((a, b) => Number(a) - Number(b));

      return values;
    };

    const counters = document.querySelectorAll(".animated-text");
    const valuesLengths = [20, 7, 10];

    counters.forEach((counter, index) => {
      let count = 0;
      const values = getValues(
        parseFloat(counter.getAttribute("data-number-start")),
        parseFloat(counter.getAttribute("data-number-end")),
        valuesLengths[index],
        index === 1
      );

      const updateCounter = () => {
        if (count < values.length) {
          counter.innerHTML = numberWithCommas(values[count]);
          setTimeout(updateCounter, (duration / valuesLengths[index]) * 1000);
        } else {
          const number = parseFloat(counter.getAttribute("data-number-end"));
          const formattedNumber = numberWithCommas(
            number.toFixed(index === 1 ? 2 : 0)
          );
          counter.innerHTML = formattedNumber;
        }
        count++;
      };

      updateCounter();
    });
  }

  ScrollTrigger.create({
    trigger: ".revenue-growth",
    start: "top+=50% bottom",
    onToggle: updateGrowthMetrics,
    toggleClass: "active",
  });

  /* End Block 5 */

  /* Engage block */
  const engageBox = gsap.utils.toArray(".engage-box");

  engageBox.forEach((box) => {
    ScrollTrigger.create({
      trigger: box,
      start: "top+=50% bottom",
      endTrigger: "footer",
      toggleClass: "active",
    });
  });

  /* End Engage block */

  /* Network block */
  let networkBox = gsap.utils.toArray(".network-img");
  networkBox.forEach((box, i) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".network-slide",
        start: "top bottom",
        end: "bottom",
        toggleActions: "play none none reset",
      },
    });
    tl.from(box, { opacity: 0, scale: 0.7, x: 250 }, i * 0.3)
      .to(box, { scale: 1.01, duration: 0.45 })
      .to(box, { opacity: 1, scale: 1, x: 0, duration: 0.3 });
  });

  /* End Network block */

  /* Logo box */
  const logoBoxContainer = gsap.utils.toArray(".logo-box-container");

  ScrollTrigger.create({
    trigger: logoBoxContainer,
    start: "top+=10% bottom",
    toggleClass: "active",
  });
}

initScrollAnimation();
