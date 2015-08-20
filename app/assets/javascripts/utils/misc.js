App.FunnyPhrases = function () {

  var s1 = ["CAT GOT YOUR TONGUE?",
  "CLEAN THE BATHTUB",
  "OPPOSITES ATTRACT",
  "CURE YOUR CHRONIC-OBSTRUCTIVE-BOREDOM-DISEASE",
  "LIFE DIDN'T WORK OUT",
  "IF MAYANS COULD PREDICT THE FUTURE",
  'LESSEN GUILT OF YOUR "SICK" DAYOFF']

  var s2 = ["speak none and come to",
  "or if you dont like that, better to",
  "and everyone is an opposite of you at",
  "by coming to",
  "because you didn't come to",
  "they knew you would come to",
  "by coming to"]


  var n = Math.floor((Math.random()*(s1.length)))

  if (s1.length === s2.length) {
    return [s1[n], s2[n]];
  } else {
    return undefined;
  }
}
