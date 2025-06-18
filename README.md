
# ⌚ **WatchEcom Full-Stack Project – Easy Setup Guide**

Welcome! This is a **full-stack e-commerce website for smart watches**, built using:

- 🌐 **Angular** for the frontend (user interface)
- 🔧 **ASP.NET Core Web API** for the backend
- 🗄️ **MySQL** for the database

This guide will help you run both parts of the project on your computer — step by step.

---

## 🧠 **What Does This Project Do?**

It allows users to:

- 🔍 **View a list of watches**
- ➕ **Add/Delete watches** (admin only)
- 🛒 **Place orders**
- ❤️ **Manage a wishlist**
- 🔐 **Log in/register** using JWT-based authentication

---

## 🧰 **Tools & Software You Need**

Install these before starting:

- ✅ [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) (for backend)
- ✅ [Node.js](https://nodejs.org/) & [Angular CLI](https://angular.io/cli) (for frontend)
- ✅ [MySQL Server](https://dev.mysql.com/downloads/mysql/) (for database)
- ✅ [Visual Studio Code](https://code.visualstudio.com/) or your favorite editor
- ✅ [Postman](https://www.postman.com/) (optional, for testing APIs)

---

## ⚙️ **Backend Setup (ASP.NET Core)**

### 📁 1. Clone the Backend Repo
```bash
git clone <your-backend-repo-url>
cd WatchEcom.Api
```

### 🛠️ 2. Update Database Connection
Open `appsettings.json` and edit the connection string:
```json
"ConnectionStrings": {
  "DefaultConnection": "server=localhost;port=3306;database=watchecom;user=YOUR_USER;password=YOUR_PASSWORD"
}
```

### 📦 3. Install Backend Dependencies
```bash
dotnet restore
```

### 🧱 4. Apply Migrations and Seed Data
```bash
dotnet tool install --global dotnet-ef  # (if not already installed)
dotnet ef database update
```

### ▶️ 5. Run the Backend Server
```bash
dotnet run
```

You’ll see the API running at:
```
https://localhost:5001
```

---

## 🌐 **Frontend Setup (Angular)**

### 📁 1. Clone the Frontend Repo
```bash
git clone <your-frontend-repo-url>
cd watch-ecom-frontend
```

### 📦 2. Install Frontend Dependencies
```bash
npm install
```

### ⚙️ 3. Update API URL
In your Angular project, find the file that stores the API URL (like `environment.ts`):
```ts
export const environment = {
  apiUrl: 'https://localhost:5001/api'
};
```
> Make sure the URL matches your backend running port.

### ▶️ 4. Run the Angular App
```bash
ng serve
```
The frontend will run at:
```
http://localhost:4200
```

Now you can open your browser and test the full website! 🎉

---

## 🧪 **How to Test APIs**

Use **Postman** or Angular frontend to test these endpoints:

- `GET /api/Watch` → Get all watches  
- `POST /api/Order` → Place an order  
- `GET /api/Wishlist` → Get user's wishlist  
- `POST /api/Auth/login` → Login to get JWT

> Some endpoints need a **JWT token**. Use `Authorization: Bearer <token>` in the header.

---

## ❓ **Troubleshooting**

| Problem                        | Solution                                                                 |
|-------------------------------|--------------------------------------------------------------------------|
| MySQL connection fails        | Check if MySQL is running & credentials are correct in `appsettings.json` |
| API not working               | Make sure `.NET 8` is installed, run `dotnet run` again                   |
| Angular can't fetch data      | Check if API URL is correct in `environment.ts`                           |
| Getting 401/403 errors        | Login first and use a valid JWT token                                     |

---

## ✨ **Project By**

**M. Siva Sai Teja**  
📧 teja41622@gmail.com  
🌐 [GitHub](https://github.com/TEJA-MAKIREDDY) | [LinkedIn](https://www.linkedin.com/in/m-siva-sai-teja-32b160250/)
