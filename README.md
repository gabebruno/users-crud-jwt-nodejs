## Users CRUD in NodeJS

This API is just a proof of knowledgemnt.

## Technology

Here are the technologies used in this project.

* NPM for dependencies (Included in docker-compose)
* NodeJS
* Express Framework (Routes and Validator to)
* Sequelize ORM
* Migrations and Seeders (Sequelize-cli)
* Authentication with Json Web Token
* Database MySQL
* Docker

## Getting started
The recomended way is with Docker, because it's incredible, marvelous, awesome... ok, fine, i cheered up! 

* <strong>First you need clone this repository! (Don't change folder's name)</strong>

* Go to application's folder
```sh
cd path/to/application/users-crud-jwt-nodejs
```

* .Env configuration:
In your file explorer you can copy and rename .env.example to .env, or following this commands:
```sh
cp .env.example .env
```
<sup>Yep, i commited all my super secret passwords and configurations in .env.example, enjoy it!</sup>


* Now, run Docker: (If you use -d paramater, docker run in second plan, but you don't see possible errors)
    * <p><i>Docker will run all necessary commands to up application, with database tables and seeders created.</i></p>

```sh
docker-compose up
```
<sup>This will take a while, go get some coffee!</sup>

#### <i>This following steps are not necessary to do manually, but informative, in case of errors on docker execution...</i>
* Access container and install dependencies:
```sh
docker exec -it crud-api sh
```
```sh
npm install
```

* After installation is done, run the following commands to run migrations and seeders
```sh
npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all
```

#### And for the last... open your Postman, Insomnia, VS Code, whatever and try the endpoints, begining with register route.

** **


## How to use

**The routes defined are:**

    [POST]: /api/users/register  - Receive JSON body to register new user by yourself - Without authentication:

    Body:
      {
        "name":             Required    |   String
        "phone":            Required    |   String    | Format: (00) 00000-0000
        "email":            Required    |   String    | Format: email@corp.com
        "password":         Required    |   String    | Required Uppercase, Lowercase, Number and + 8 digits.
        "birthday":         Required    |   String    | Format: YYYY-MM-DD
      }
**  **

    [POST]: /api/login        - Receive JSON body to login with email and paswword - Without authentication:

    Body:
      {
        "email":            Required    |   String
        "password":         Required    |   String
      }

    Return:
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
    }

**  **

    - Authenticated route - Bearer Token
    [POST]: /api/users/       - Authenticated route - Receive JSON body to create user:

    Body:
      {
        "name":             Required    |   String
        "phone":            Required    |   String    | Format: (00) 00000-0000
        "email":            Required    |   String    | Format: email@corp.com
        "password":         Required    |   String    | Required Uppercase, Lowercase, Number and + 8 digits.
        "birthday":         Required    |   String    | Format: YYYY-MM-DD
      }

**  **

    - Authenticated route - Bearer Token
    [PUT]: /api/users/        - Authenticated route - Receive JSON body to update user:

    Body:
      {
        "name":             Optional    |   String
        "phone":            Optional    |   String    | Format: (00) 00000-0000
        "email":            Optional    |   String    | Format: email@corp.com
        "password":         Optional    |   String    | Required Uppercase, Lowercase, Number and + 8 digits.
        "birthday":         Optional    |   String    | Format: YYYY-MM-DD
      }

**  **

    - Authenticated route - Bearer Token
    [POST]: /api/users/restore/{id}    - Use to restore deleted user:
    (Don't need body)

    Return:
      User successfully restored!

**  **

    - Authenticated route - Bearer Token
    [GET]: /api/users               - Deliver two possible JSON responses, according query parameters.
    Query parameter:                - inactive=true (default false).

    Return:
    [
      {
        "id": 1,
        "name": "First User Seeded",
        "phone": "(11)99111-9000",
        "email": "firstuser@gmail.com.br",
        "birthday": "1980-09-15T00:00:00.000Z",
        "createdAt": "2021-11-27T03:26:08.000Z",
        "updatedAt": "2021-11-27T03:26:08.000Z"
      }
    ]

**  **

    - Authenticated route - Bearer Token
    [GET]: /api/users/{id}          - Deliver a JSON response with user data:

    Return:
    [
      {
        "id": 1,
        "name": "First User Seeded",
        "phone": "(11)99111-9000",
        "email": "firstuser@gmail.com.br",
        "birthday": "1980-09-15T00:00:00.000Z",
        "createdAt": "2021-11-27T03:26:08.000Z",
        "updatedAt": "2021-11-27T03:26:08.000Z"
      }
    ]

**  **

    - Authenticated route - Bearer Token
    [DELETE]: /api/users/{id}       - Delete an user by id:

    Return:
          User successfully deleted!


## Versioning

1.0.0.0


## Author

* **Gabriel Bruno Almeida**:

    * [GitHub](https://github.com/gabebruno)

    * [LinkedIn](https://www.linkedin.com/in/dev-gabriel-bruno/)
