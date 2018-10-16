# food
Grocery store shopping list web app

## Clone the repo
git clone https://github.com/braddillon/food.git

## Symbolic Link docker-compose.yml
Pick whichever docker-compose file you want to use (dev vs production,  ignore multi).  
Symbolic link it to docker-compose.yml so you don't have to keep specifying the file name on every docker-compose call.  
ln -s docker-compose.dev.yml docker-compose.yml  

## Environment Variables
Copy exampleFood.env to food.env  
Edit food.env with your environment variables.  

Ignore exampleLetsEncrypt.env unless you are using the docker-compose.multi.yml  

## Probe the db
This ensures the db is setup and ready before django tries to migrate
docker-compose run --rm probe

## Pull up rest of docker file
docker-compose up

## Load initial mock data
cp mockData.sql ./db/  
docker exec -it food_db_dev /bin/bash  
psql -U username -d dbname < /var/lib/postgresql/data/mockData.sql  

## Other notes
In the dev environment:
  You can find the react frontend on localhost:3000.  
  The django backend on localhost:80  
  localhost:80/api  
  localhost:80/admin   

  All files should hotreload as you edit the source files in frontend/backend directories