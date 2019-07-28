//This contains the code for the temp list.
d3.csv("data.csv", function(error, data) {
    if (error) {throw error;}
    console.log(data)
    listmaker(data);
})

function listmaker(data) {
    var save = document.getElementById('bucket').innerHTML;
    for (i = 0; i < data.length; i += 1) {
        var entry = data[i]; //"<iframe src=" + entry.Link + "></iframe>"
        save += "<div class='entrydiv'>" + "<iframe src=" + 'http://www.dailyworldfacts.com/wp-content/uploads/2011/06/facts-about-cat-fallen-cat.jpg' + "></iframe>" +
        "<font size='5'> Title: " + entry.Title + "</font><br>" +
        entry.Publisher + " : " + entry['Date Published'] + "<br>" +
        "Author:  " + entry.Author + "</div>";
    }
    document.getElementById('bucket').innerHTML = save;
}