quotes-frontend-react is an application that displays quotes and their authors(optional) and a daily quote.

Features:
-Random daily quote:Get a random quote that changed at the end of the day in the user's timezone.
-Add new quote:Create a new quote by filling the inputs text(mandatory) and author(optional).
-Edit quote:Edit an existing quote by filling the inputs text(mandatory) and author(optional) and click the edit icon of the quote you want to edit.
-Delete  quote:Delete an existing quote by clicking the delete icon of the quote you want to delete.

Files to be noted:
-config.js contains the base url which is used in every http request of the app.
-api.js contains the http requests for a more organized and manageable code.
-DailyQuote implements the dialy quote fetching and displaying.It has 2 constants to check every minute if the day has changed to renew the daily quote.
-Quote manager has 3 handlers to implement the features of adding,editing and deleting.
-App.js uses the DailyQuote and QuoteManager components.


Installation:
1)Clone the repository:  `git clone https://github.com/your-username/quote-application.git`
2)Navigate to the project directory: `cd quote-appliation`
Usage:
1)Run the application: `docker compose up --build`
2)Open your web browser and visit: `http://localhost:3000`

Technologies Used:
React
