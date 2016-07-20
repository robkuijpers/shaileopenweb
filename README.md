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

    - Improvement: in app.js (express) remove static directory .. and configure systemjs.conf.js to find files in node_modules or copy the needed files to public/dist/libs.

Installed:

    npm install materialize-css --save
  
Switched to MDL because it is more lightweight.

    npm install material-design-lite --save

    npm install firebase --save
    
    npm install angularfire2 -- save
    
Added angularfire typing to typings.json

Added express compression module. 

Tip: List process with port 3000 in use: 

    lsof -i tcp:3000

Fixed reloading browsers on change in client code.

AngularFire2 and Firebase

    npm install angularfire2
    npm install firebase
    typings install dt~firebase --global
    
Removed angularfire2 and firebase from frontend. Create API and use them in nodejs.
Use JWT for the API.

Added angular routing. 

Used relative paths in components and compile sass to separate css modules.

Next steps:

    - Add MDL for Angular2.
    - Use MDL icons + Roboto fonts from dist.
    - Create login screen.
    - Write Unit tests.
    - Connect to FireBase.
    - Study SystemJS class loader.
    - Study, configure and use FireBase or AngularFire2.

Step 2
======
    
Switched to Angular2 material design.
Updated system.config.js
Updated grunt.js
Added @angular/forms because material design input depends on it.

Added unit tests following angular2 testing guide (installed live-server). 
One terminal window run: 'npm run test', other window 'gulp test'

Downgraded @angular/form from 0.2.0 to 0.1.0 to support angular material apha-6

Study new @angular http module https://angular.io/docs/ts/latest/tutorial/toh-pt6.html

Study new @angular forms module https://angular.io/docs/ts/latest/cookbook/dynamic-form.html

Angular2 material samples: https://github.com/justindujardin

Progressive webapps: https://github.com/angular/mobile-toolkit


