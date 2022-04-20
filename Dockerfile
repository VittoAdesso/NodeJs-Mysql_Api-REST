# want to create from node
FROM node:16.13.0
# i want copy all files of my project  
# i said: copy all files (ALL), and save into a new folder -- origin --> destiny 
COPY apiSwimCompetitions /apiSwim
# get into the project or route
RUN cd /apiSwim
# when you are in, you are going to executed (DOCKER)=== npm install for all dependencies 
RUN npm install
# also install mysql
RUN npm install --save mysql
# CMD commaand or Script, to run into the container - is the script to run start the app  
CMD npm start
