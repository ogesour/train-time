
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDb7KwW-gWDILRF4vnuRajN_-4G8ut2Jp0",
    authDomain: "train-schedule-77c2d.firebaseapp.com",
    databaseURL: "https://train-schedule-77c2d.firebaseio.com",
    projectId: "train-schedule-77c2d",
    storageBucket: "train-schedule-77c2d.appspot.com",
    messagingSenderId: "719923809516"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submitbtn").on('click', function(e){
      e.preventDefault();
      var name = $('#trainName').val().trim();
      var dest = $('#destination').val().trim();
      var first = $('#firstTrain').val().trim();
      var freq = $('#frequency').val().trim();

      var newTrain = {
          name: name,
          destination: dest,
          firstTrain: first,
          frequency: freq,
      }

      database.ref().push(newTrain)

      $('#trainName').val("");
      $('#destination').val("");
      $('#firstTrain').val("");
      $('#frequency').val("");

  });