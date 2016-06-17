Shaile Open WEB
===============
Web project for administring the 'Shaile Open' IOS / Android App.

Running on NodeJs and Express and FireBase backend.
Using a Docker container.
Frontend using Angular2, Typescript and MaterializeCSS or Angular2 Material Design Light (MDL).
Build with Gulp.

Step 1
======
Create and clone github repo.

To create a docker image with nodejs follow: http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html

Install express generator:

    sudo npm install express-generator -g

Run express generator:

    express --ejs --hbs --hogan --css sass
    
    npm install
    
    DEBUG=myapp:* npm start
    
    install nodemon
    install express-handlebars
    
Start the server with nodemon:

    nodemon --watch ./server

Start the server with gulp and nodemon:

    gulp server
    
Install Typings:

    npm install typings --global


    
