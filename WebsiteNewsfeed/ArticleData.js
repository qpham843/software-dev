class ArticleData {
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
        $.get("/Articles/" + this.id + "/VisualizationData_" + this.id + ".csv").done(function(data) {
            data = csvJSON(data);
            for (var i = 0; i < Object.keys(data).length - 1; i++) {
                var highlightEntry = data[i];
                article.credibilityScore += highlightEntry["Points"];
            }
        });
    }

    getPreviewText() {
        var article = this;
        $.get("/Articles/" + this.id + "/" + this.id + "Article.txt").done(function(data) {
            var dataString = data.toString();
            var first200 = dataString.substring(0, 200);
            var index = 200;
            while (dataString[index] != " " && dataString[index] != "." && dataString[index] != "," && index < 250) {
                first200 += dataString[index];
                index += 1;
            }
            article.previewText = first200 + "...";
            console.log("Preview Text is: " + article.previewText);
        });
    }
}