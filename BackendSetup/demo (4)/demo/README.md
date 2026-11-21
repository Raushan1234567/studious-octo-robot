# DevOps Task Manager – Backend

## Project Description
A Spring Boot REST API for managing tasks. The application uses MySQL to store task information permanently.

## Technologies
- Java 17
- Spring Boot
- Spring Data JPA
- MySQL
- Maven

## Database Configuration
- Database: `devops_db`
- Port: `3306`

Configure your database credentials in `src/main/resources/application.properties`.

## Run Locally

1. Make sure MySQL Server is running.
2. Create the database `devops_db`.
3. Open a terminal in the backend project directory.
4. Run:

```bash
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend starts at `http://localhost:8080`.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/{id}` | Update a task |
| DELETE | `/api/tasks/{id}` | Delete a task |

## Verification
Open `http://localhost:8080/api/tasks` to retrieve all saved tasks.