/*
 *
 */

module.exports = function() {

    var firebase = require("../../node_modules/firebase/firebase-node");

    // Initialize the app with a service account, granting admin privileges.
    // As an admin, the app has access to read and write all data, regardless of Security Rules.
    firebase.initializeApp({
        databaseURL: "https://toernooi.firebaseio.com",
        serviceAccount: require("./serviceAccountCredentials.json")
    });

    var db = firebase.database();
    
    /* Check if username/password exists, if true return username and role. */
    this.login = function(username, password) {
        
      var users = db.ref("users");
      users.once("value", function(snapshot) {
          // TODO: check the username and password.  
          console.log(snapshot.val());
      });

      return {
          'username': 'kuijpersr',
          'role': 'administrator'
      }
    }

};