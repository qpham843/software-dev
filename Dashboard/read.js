var titles = [];
var authors = [];
var publishers = [];
var links = [];

d3.csv("data.csv", function(d) {
  return {
    title : d.Title,
    author : d.Author,
    publisher : d.Publisher,
    link : d.Link
  };
}, function(data) {
  for (var i = 0; i < Object.keys(data).length - 1; i ++) {
        // console.log(data[i]);
        titles.push(data[i].title);
        authors.push(data[i].author);
        publishers.push(data[i].publisher);
        links.push(data[i].link);
    }
    console.log(titles);
    console.log(authors);
    console.log(publishers);

for (var i = 0; i < Object.keys(data).length - 1; i ++) {
    var titleLine = "<div class = 'articleTitle'> " + titles[i] + " </div>"
    var authorLine = "<div class = 'companyDate'> " + authors[i] + " </div>"
    var publisherLine = "<div class = 'author'> " + publishers[i] + " </div>"
    var icon = "<img src='icon.png' style='float:left; margin-left: 6px; margin-top: 6px; width:70px; height:70px;' >"
    var link = "<a href='" + links[i] +"'>";


	document.getElementById("artlist").innerHTML =  document.getElementById("artlist").innerHTML + link + icon + titleLine + authorLine + publisherLine + "<br></a>"
	console.log(document.getElementById("artlist").innerHTML);
}
});