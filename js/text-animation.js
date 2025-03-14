function handleLettersAnimation(element, animationClass) {
  var text = $(element).text();
  var words = text.split(" ").filter(Boolean);
  var animationDelay = 0.15;

  var wordSpans = words.map(function (word) {
    var letters = word.split("");
    var letterSpans = letters.map(function (letter) {
      animationDelay += 0.05;
      return `<span class="${animationClass}" style="animation-delay: ${animationDelay}s">${letter}</span>`;
    });

    return "<span class='text-word'>" + letterSpans.join("") + "</span>";
  });

  $(element).html(wordSpans.join(" "));
}

function divideByWords(element, animationClass) {
  var text = $(element).text();
  var words = text.split(" ").filter(Boolean);
  var animationDelay = 0.5;

  var wordSpans = words.map(function (word) {
    animationDelay += 0.05;
    return `<span class="${animationClass}" style="animation-delay: ${animationDelay}s">${word}</span>`;
  });

  $(element).html(wordSpans.join(" "));
}

handleLettersAnimation(".text-split", "text-rotation");

$(".list-title").map(function (index, title) {
  handleLettersAnimation(title, "text-y-translate");
});

$(".customisation-box > *").map(function (index, box) {
  divideByWords(box, "word-y-translate");
});