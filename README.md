
# RndxFAVE Project

E-commerce web application made with React and Laravel.

## Installation

> Important : When installing the backend and frontend, create seperate terminal instances

#1.  Clone this github repository
```
git init
git pull https://github.com/Specticall/FAVExRnD
```

#2. Setup Laravel Backend 
> (Make sure XAMPP is running the Apache & MySQL servers)
```
cd backend
composer i
php artisan key:generate
php artisan migrate
php artisan storage:link
php artisan serve
```

#3. Setup React Vite Frontend
```
cd frontend
npm i
npm run dev
```

## Usage Notes

* The first registered user is assigned as admin

## License

Developed by ©Kelompok5
