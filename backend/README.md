# FCProperty Backend Service

## Run backend
- docker compose up --build



## Initial Database data (once backend and db services are running)
- docker exec -it <backend-container-name> python3.10 app/seed.py. For example:
```
docker exec -it fcproperty-backend python app/seed.py
```
