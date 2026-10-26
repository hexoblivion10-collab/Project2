# My Expense Tracker

## Description
My Expense Tracker is a simple web app that helps me track my daily income and expenses. I can add what I spend and what I earn, see my balance, and keep all my transactions saved in the browser.

I built this for my Final Independent Project.

## Features
- Add income and expense transactions
- Enter description and amount for each transaction
- Choose category: Food, Transport, Rent, Other
- Automatically saves date for each transaction
- Shows total balance, total income, and total expense
- Delete any transaction
- Filter transactions by month
- View spending breakdown by category
- Data stays saved even after closing the browser

## Pages
1. **index.html** - Dashboard where I add new transactions and see balance
2. **history.html** - Shows all transactions with month filter
3. **report.html** - Shows total income, total expense and spending by category

## Technologies Used
- HTML
- CSS
- JavaScript
- localStorage for data saving

## How to Run the Project
1. Download or clone the project
2. Open `index.html` in your browser
3. Or use VS Code Live Server (Port 5500)
4. Start adding your income and expenses

## How It Works
- When I submit the form, JavaScript gets the data using FormData
- The data is saved as an object with id, description, amount, type, category and date
- All transactions are saved in localStorage
- The renderList function creates list items using createElement and shows them on the page
- Delete button removes a transaction by its id and updates localStorage

## File Structure


## Known Issues
- I cannot edit a transaction yet, I can only delete and add again
- If I clear browser data, all transactions will be lost
- No option to filter by year, only by month
- Category report is in text, not a chart

## Future Improvements
- Add edit feature
- Add charts for spending
- Add search for transactions
- Add export to file

## Author
Created by Brown for my final project - October 2026