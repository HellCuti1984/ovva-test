# ovva-test
Тестовое задание Ovva 

## Технологии

**Client:** React, Redux Toolkit, TypeScript, RTKQuery 

**Server:** Laravel, I5-Swagger


## Установка и запуск Front

Установка и запуск приложения

```bash
  cd front
  npm i
  npm run start
```
## Установка и запуск Backend

Установка и запуск приложения

```bash
  cd backend
  composer i
  
  //Swagger
  php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"
  php artisan l5-swagger:generate
  
  php artisan serve
```
    
