docker pull mongo

docker run -it -v mongodata:/Users/keithfranklin/Documents/Exploring_Programming/budgetium-core/data/db \
-p 27017:27017 --name mongodb -d mongo