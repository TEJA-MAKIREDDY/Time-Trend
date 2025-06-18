⌚ WatchEcom API – Easy Setup Guide
Welcome! This is a full-stack e-commerce website for smart watches, developed using Angular (frontend) and ASP.NET Core with MySQL (backend). This guide will help you run it on your computer easily.

🧠 What is This?
It’s like the brain of an online store for watches. It lets you:

See a list of watches

Add or delete a watch (admin)

Place orders

Add watches to your wishlist

🧰 What You Need Before Starting
Make sure these are installed on your PC:

✅ .NET 8 SDK

✅ MySQL Server

✅ A code editor like Visual Studio Code

🛠️ How to Run This Project Step-by-Step
📁 1. Download the Project
Open Command Prompt or Terminal and type:
```
git clone <your-repo-url>
cd WatchEcom.Api
```
If you don't have Git, you can just download the ZIP file from GitHub and extract it.

⚙️ 2. Set Your Database Info
Inside the project, open appsettings.json file.

Find this part:
```
"ConnectionStrings": {
  "DefaultConnection": "server=localhost;port=3306;database=watchecom;user=YOUR_USER;password=YOUR_PASSWORD"
}
```
👉 Change YOUR_USER and YOUR_PASSWORD to match your MySQL account.

📦 3. Install Stuff the Project Needs
Run this:
```
dotnet restore
```
This command makes sure all packages are ready.

🧱 4. Create Database Tables Automatically
Now we’ll create all the tables (like "Watches", "Orders", etc.) in the MySQL database:

```
dotnet tool install --global dotnet-ef    # Only if not installed before
dotnet ef database update
```
▶️ 5. Start the API
Start the backend by running:
```
dotnet run
```
If everything works, your app will be running at:
```
https://localhost:5001
```
🧪 How to Test It
You can use Postman or any tool to call these API links:

GET /api/Watch → See all watches

GET /api/Watch/{id} → See 1 watch

POST /api/Order → Place an order

GET /api/Wishlist → See your wishlist (needs login)

Some of them need a login (using a JWT token).


❓ What If Something Breaks?
Database error? → Check if MySQL is running and your username/password is correct.

App not starting? → Make sure you installed .NET 8 correctly.

JWT errors? → You must log in first and add the token in the Authorization header.

