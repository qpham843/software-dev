var articles = []

function readVisData() {
    $.get("visData.json").done(function(data) {
        for (var i = 0; i < Object.keys(data).length; i++) {
            var article = data[i];
            var articleEntry = new Article(article["Title"], article["Author"], article["Date"], article["ID"], article["Article Link"], article["Visualization Link"], article["Plain Text"], article["Highlight Data"]);
            articleEntry.getCredibilityScore();
            articleEntry.getPreviewText();
            articles.push(articleEntry);
        }
    });
}

class Article {
    constructor(title, author, date, ID, articleLink, visLink, plainText, highlightData) {
        this.title = title;
        this.author = author;
        this.date = date;
        this.id = ID;
        this.articleLink = articleLink;
        this.plainText = plainText;
        this.visLink = visLink;
        this.highlightData = highlightData;
        this.credibilityScore = 100;
        this.previewText = "";
    }

    getCredibilityScore() {
        var article = this;
        $.get("https://cors-anywhere.herokuapp.com/" + article.highlightData).done(function(data) {
            data = csvJSON(data);
            for (var i = 0; i < Object.keys(data).length - 1; i++) {
                var highlightEntry = data[i];
                article.credibilityScore += highlightEntry["Points"];
           }
        });
    }

    getPreviewText() {
        var article = this;
        $.get("https://cors-anywhere.herokuapp.com/" + article.plainText).done(function(data) {
            article.previewText = data.toString().substring(0, 200);
        });
    }
}

function generateList() {
    // Collect values from the HTML

    //Sort by... Most Recent, Alphabetical, Credibility Score (High to Low & Low to High)
    /*

    var sortOptions = document.getElementById("sortByList");
    var sortBy = sortOptions.options[sortOptions.selectedIndex].name;
    var sortedArticles = sortArticles(articles, sortBy);
    //Filter by tags (Needs additional information)

    //Only show the top X results
    var showLimit = Math.max(sortedArticles.length, document.getElementById("showLimit").value);
    sortedArticles = sortedArticles.slice(0, showLimit);
    document.getElementById("articleList").innerHTML = "";

    */
    console.log(articles);
    var sortedArticles = articles;
    for (var i = 0; i < sortedArticles.length; i++) {
        generateEntry(sortedArticles[i]);
    }
}

function generateEntry(entry) {
    var articleEntry = "<div class='row'>" +
                            "<div class='col-2 date'>" + entry.date + "</div>" +
                            "<div class='col-6'>" +
                                "<h3>" + entry.title + "</h3>" +
                                "<p class='articleText'>" + entry.previewText + "</p>" +
                                "<p class='author'>" + entry.author + "</p>" +
                            "</div>" +
                            //"<img class='col-4 sunburst' src='https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'></img>" +
                            "<div class='cred-score-container col-4'>" +
                                "<div class='sunburst'>" +
                                    "<svg id='sunburst" + entry.id + "' viewBox='0 0 200 200'  preserveAspectRatio='xMidYMid meet'></svg>" +
                                "</div>" +
                            "</div>" +
                       "</div>" +
                       "<hr>";
    runVisualization(entry.id);
    document.getElementById("articleList").innerHTML += articleEntry;
}

function csvJSON(csv){
    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
    for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  //return result; //JavaScript object
  return result
}