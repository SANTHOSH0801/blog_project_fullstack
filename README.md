📝 Blog Website Project
This is a Full Stack Blog Website built using React.js for the frontend and Django (Django REST Framework) for the backend. It allows users to register, log in, write blog posts, and explore blogs created by others. The platform also supports CRUD operations for blog management and user-specific views.

DEPLOYED LINK: https://blogproject-git-main-santhoshs-projects-e9e8991d.vercel.app
OUTPUT VIDEO LINK: https://www.loom.com/share/47ef6342651e43ffae2f330c4a4956f0?sid=620e56df-1a93-4181-a15b-63fa3ea26e2c

🚀 Features
✅ Frontend (React.js)
Modern responsive UI with React

Blog listing, creation, update, and deletion

User registration and login using form validation

Dynamic routing using React Router

State management using Context API

API integration using Axios

✅ Backend (Django + Django REST Framework)
User authentication and registration (custom or DRF auth)

Secure APIs using Token-based or Session authentication

Blog models and serializers

CRUD operations for blogs (Create, Read, Update, Delete)

User-based blog filtering


🔧 Tech Stack
Layer	Technology
Frontend	React.js, Axios, Tailwind CSS (or CSS Modules)
Backend	Django, Django REST Framework
Database	SQLite (default) / PostgreSQL (optional)
Deployment	Vercel (Frontend) & Render/Heroku (Backend)


🧑‍💻 How to Run the Project

Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
Backend
bash
Copy
Edit

cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

🔐 Authentication Flow
New users can register through the frontend form
Login credentials are verified via Django backend
Authenticated users can create and manage their own blogs
Unauthorized users are redirected

📦 API Endpoints (Sample)
Method	Endpoint	Description
GET	/api/blogs/	Get all blogs
POST	/api/blogs/create/	Create a new blog
PUT	/api/blogs/{id}/edit/	Edit a blog
DELETE	/api/blogs/{id}/delete/	Delete a blog
POST	/api/register/	Register user
POST	/api/login/	Login user

🌐 Deployment
Frontend: Deployed on Vercel
Backend: Deployed on Render / Heroku

✨ Future Enhancements
Blog categories and tags
Comments and likes system
Profile page for authors
JWT-based authentication
Search and filter functionality
