var colors = ["#1B1B1B", "#1B1B1B", "#FF9662", "#8E90D0", "#A9CBEB", "#F0A0A7"];
var ellipseColors = [
  "#393939",
  "#393939",
  "#EBB093",
  "#A9ABE1",
  "#BDDAF5",
  "#FBC0C5",
];

var simStrokeColors = [
  "#0000004d",
  "#0000004d",
  "#B7521F",
  "#6061B5",
  "#578ABB",
  "#BF747A",
];

var isMobile = window.innerWidth < 1024;
var xPositions = [0, 20, -20, 20, -20, 20];

var debounce_timer;

var GLOBAL_TRANSITION = 0;
var GLOBAL_PAGE_INDEX = 0;
var scrollDirection = "FORWARD";
var isScrolling = false;
var slidePosition = "outside";

function setCardYPositionClass() {
  $(".svg-animation").toggleClass("positioned");
}

var setCardState = () => {
  var element = document.getElementById("card_animated-2-u-card-block");

  var currentPage = GLOBAL_PAGE_INDEX;
  var nextPage = currentPage + 1;

  // Prevent of rotating after last point
  if (currentPage > 4) {
    return;
  }

  // change on page half
  var colorPercent = Math.floor(0.5 + Number(GLOBAL_TRANSITION) + currentPage);

  if (colorPercent <= 1) {
    $("#card_animated-2-s-path2").css("fill-opacity", "0.2");
    $("#card_animated-2-s-tspan5, #card_animated-2-u-5g").removeClass(
      "secondary"
    );

    // Sim colors
    $("#card_animated-2-s-path10").css("opacity", 0.2);
    $(`#card_animated-2-s-path8, 
    #card_animated-2-s-path7, 
    #card_animated-2-s-path11,
    #card_animated-2-s-path12,
    #card_animated-2-s-path13,
    #card_animated-2-s-path14,
    #card_animated-2-s-path15,
    #card_animated-2-s-path16,
    #card_animated-2-s-path17,
    #card_animated-2-s-path18,
    #card_animated-2-s-path19,
    #card_animated-2-s-line1
    `).css({
      stroke: "black",
      "stroke-opacity": 1,
    });
    $("#card_animated-2-s-rect1").css({
      fill: "#232323",
      opacity: 1,
      stroke: "black",
      "stroke-opacity": 1,
    });
  } else {
    $("#card_animated-2-s-tspan5, #card_animated-2-u-5g").addClass("secondary");
    $("#card_animated-2-s-path2").css("fill-opacity", "0.03");
    $("#card_animated-2-s-path10").css("opacity", 1);
    $(`#card_animated-2-s-path8, 
    #card_animated-2-s-path7`).css({
      stroke: simStrokeColors[colorPercent % colors.length],
      "stroke-opacity": 0.3,
    });

    $(`#card_animated-2-s-path11,
    #card_animated-2-s-path12,
    #card_animated-2-s-path13,
    #card_animated-2-s-path14,
    #card_animated-2-s-path15,
    #card_animated-2-s-path16,
    #card_animated-2-s-path17,
    #card_animated-2-s-path18,
    #card_animated-2-s-path19,
    #card_animated-2-s-line1
    `).css({
      stroke: simStrokeColors[colorPercent % colors.length],
      "stroke-opacity": 1,
    });

    $("#card_animated-2-s-rect1").css({
      fill: "black",
      opacity: 0.07,
      stroke: simStrokeColors[colorPercent % colors.length],
      "stroke-opacity": 0.3,
    });
  }

  $("#card_animated-2-s-path1").css(
    "fill",
    colors[colorPercent % colors.length]
  );

  $(`
  #card_animated-2-u-copy-of-elipse-2,
  #card_animated-2-u-copy-of-elipse-1,
  #card_animated-2-u-elips-hover-1,
  #card_animated-2-u-elips-hover-2`).css(
    "stroke",
    ellipseColors[colorPercent % ellipseColors.length]
  );

  /* X position */
  var translateXDiffInPercent = xPositions[nextPage] - xPositions[currentPage];
  var translateX =
    translateXDiffInPercent * GLOBAL_TRANSITION + xPositions[currentPage];

  $(".svg-animation").css("transform", `translateX(${translateX}%`);
  $(".svg-animation").css("webkitTransform", `translateX(${translateX}vw`);

  /* Rotation */
  var rotation = GLOBAL_TRANSITION * 180;
  if (rotation > 90) {
    rotation = 180 - rotation;
  }

  element.style.transformOrigin = "center";
  element.style.transform = `translate(-358.586px, -450px) rotate3d(-0.2,2,0,${rotation}deg)`;
  element.style.webkitTransform = `translate(-358.586px, -450px) rotate3d(-0.2,2,0,${rotation}deg)`;
};

function defineCardContainer() {
  $(".card-container").height(
    $(".animation-wrapper").height() - window.innerHeight * 0.05
  );
}

$(window).on("resize", function () {
  if (isMobile) {
    return;
  }

  defineCardContainer();
  setCardState();
});

$(document).ready(function () {
  var svgFile = "../img/chart.svg";
  var patternsDiv = document.querySelector("div.revenue-growth");

  var xhr = new XMLHttpRequest();
  xhr.open("GET", svgFile, false);
  xhr.overrideMimeType("image/svg+xml");
  xhr.onload = function (e) {
    patternsDiv.appendChild(xhr.responseXML.documentElement);
  };
  xhr.send("");

  if (isMobile) {
    return;
  }

  // Load main svg card
  var svgFile = "../img/card_animated_main.svg";
  var patternsDiv = document.querySelector(".svg-animation");

  var xhr = new XMLHttpRequest();
  xhr.open("GET", svgFile, false);
  xhr.overrideMimeType("image/svg+xml");
  xhr.onload = function (e) {
    patternsDiv.appendChild(xhr.responseXML.documentElement);
  };
  xhr.send("");

  var svgFile = "../img/card_patterns.svg";
  var patternsDiv = document.querySelector("div.patterns");

  var xhr = new XMLHttpRequest();
  xhr.open("GET", svgFile, false);
  xhr.overrideMimeType("image/svg+xml");
  xhr.onload = function (e) {
    patternsDiv.appendChild(xhr.responseXML.documentElement);
  };
  xhr.send("");

  // Add on hover tilt
  $(".svg-animation svg").tilt({
    maxTilt: 5,
  });

  defineCardContainer();

  const sections = document.querySelectorAll(".block-wrapper");

  // Add animation triggers
  sections.forEach((section, index) => {
    if (index < sections.length) {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          GLOBAL_TRANSITION = self.progress.toFixed(3);
          GLOBAL_PAGE_INDEX = index;
          setCardState();
        },
        scrub: true,
      });
    }
  });

  setCardState();
});

$(window).on("load", function () {
  // service blocks size

  if (!isMobile) {
    var serviceEnd = $("#service-type-end-to-end");
    var serviceAPI = $("#service-type-api");

    var serviceAPIWidth = serviceAPI.width();
    var serviceEndHeight = serviceEnd.height();
    serviceEnd.height(serviceEndHeight);
    serviceAPI.height(serviceEndHeight);
    $(".passive-only").width(serviceAPIWidth - 2 * 24);
  }
});
