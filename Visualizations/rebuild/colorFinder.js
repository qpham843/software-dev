function colorFinder(jsonLine) {
  //The children node colors are based on the colors of their parents.
  if (jsonLine["Credibility Indicator Category"] === "Reasoning") {
    return d3.rgb(240, 178, 122);
  } else if (jsonLine["Credibility Indicator Category"] === "Evidence") {
    return d3.rgb(108, 213, 143);
  } else if (jsonLine["Credibility Indicator Category"] === "Probability") {
      return d3.rgb(176,208,251);
  } else if (jsonLine["Credibility Indicator Category"] == "Language") {
      return d3.rgb(79, 112, 173);
  } else {
      return d3.rgb(255, 180, 0);
  }
}
