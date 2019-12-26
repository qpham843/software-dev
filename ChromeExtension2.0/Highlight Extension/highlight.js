var highlights = ['so shockingly high',
 'The findings were specific to emergency room doctors and Medicare recipients',
 'The patients who saw the heavy opioid prescribers were three times more likely to receive a prescription for opioids compared with the patients who saw the more judicious opioid prescribers at the same hospital',
 'split the group into patients who happened to be assigned to doctors who prescribed a lot of opioids, and patients who met doctors who didn’t',
 'common',
 'the patients who, by chance, saw a doctor who more frequently prescribed the drugs were 30 percent more likely to become long-term users of painkillers. So the higher the chances of getting opioids at a single doctor visit, the higher the risk of becoming a regular user. These patients also had higher rates of opioid-related health complications like falls, fractures, constipation, and overdoses',
 'the patients who, by chance, saw a doctor who more frequently prescribed the drugs were 30 percent more likely to become long-term users of painkillers. So the higher the chances of getting opioids at a single doctor visit, the higher the risk of becoming a regular user. These patients also had higher rates of opioid-related health complications like falls, fractures, constipation, and overdoses',
 "So the researchers can't say how the trend they found might be different for younger patients or those who see non-ER doctors",
 'huge amount',
 'I know how dangerous these medicines can be',
 'getting hooked',
 'getting hooked',
 'more judicious',
 'The patients who saw the heavy opioid prescribers were three times more likely to receive a prescription for opioids compared with the patients who saw the more judicious opioid prescribers at the same hospital'];

// highlight("uwu");

function highlight(text) {
  var inputText = document.getElementById("content");
  if (inputText != null) {
    var innerHTML = inputText.innerHTML;
    var innerHTML = document.body.innerHTML;
    var index = innerHTML.indexOf(text);
    var color = "#ff0000";
    if (index >= 0) {
     innerHTML = innerHTML.substring(0,index) + "<span style='color: " + color + ";'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
     inputText.innerHTML = innerHTML;
    }
  }
}

for(int i = 0, i < length(highlights), i++) {
  highlight(highlights[i]);
}
