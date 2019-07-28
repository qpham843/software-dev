This is the README file for the naive version of the Query Mini-Extension.

This describes the function of each line of code in the mini-extension. Each line in the description corresponds with a line of code in the respective file.
The only files that are actually necessary to the functioning of the Mini-Extension are the following:

manifest.json: This is the foundational structure of the Chrome Extension.
	This is the second version of the manifest.json file.
	This is name of this extension.
	This is the description of the extension. 
	This is the version of the extension.

	This extension requires access to the "tabs" permission, which retrieves the tabs you have open.

	This extension can be used on most pages, so we use "browser_action" instead of "page_action", which is reserved for more limited extensions (can only use on a few pages).
	This "browser_action" is linked to the popup defined by popup.html.

popup.html: This is the code governing the appearance of the popup that appears in when you click the Query Extension's icon in the top right hand corner of your browser.
	Start of the HTML code.
	Start Body of the HTML.
	This button checks if the current URL is in the database.
	This is where the result of the above check is written.
	This is the script that runs the relevant code.
	End Body of the HTML.
	End HTML Code.

popup.js: This is the code that handles all the work done, namely the process of capturing the current page's URL, retrieving the articles CSV from the Public Editor server, checking if that CSV contains the current URL, and returning whether or not it does.
	The comments are in the Javascript code.
	

