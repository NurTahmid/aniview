export function getCurrentSeason() {
  var today = new Date();
  var month = today.getMonth();
  var day = today.getDate();

  if (day >= 1 && month >= 2 && month <= 4) {
    return "SPRING";
  } else if (day >= 1 && month >= 5 && month <= 7) {
    return "SUMMER";
  } else if (day >= 1 && month >= 8 && month <= 10) {
    return "FALL";
  } else {
    return "WINTER";
  }
}
