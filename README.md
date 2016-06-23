Shaile Open WEB
===============
Web project for administring the 'Shaile Open' IOS / Android App.

Running on NodeJs and Express and FireBase backend.
Using a Docker container.
Frontend using Angular2, Typescript and MaterializeCSS or Material Design Light (MDL).
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

Added typings.index.d.ts to the gulp typescript compile task.

Angular2 5 min quickstart tutorial.

    Improvement: in app.js (express) remove static directory .. and configure systemjs.conf.js 
    to find files in node_modules or copy the needed files to public/dist/libs.

Installed:

    npm install materialize-css --save
  
Switched to MDL because is is more lightweight.

    npm install material-design-lite --save

    npm install firebase --save
    
    npm install angularfire2 -- save
    
Added angularfire typing to typings.json

Added express compression module. 

List process with port 3000 in use: lsof -i tcp:3000

Fixed reloading browsers on change in client code.

Next steps:
    Add MDL icons + roboto fonts in node_modules and gulp.
    Study SystemJS class loader.
    Study, configure and use AngularFire2.
    Study Angular2 Hero Editor Tutorial.
    Connect to FireBase.
    Create login screen.
    Create responsive grid and menu.
    Minify .js and .css and cache hbs files for production release.
