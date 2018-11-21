
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

      $('#trainName').val('');
      $('#destination').val('');
      $('#firstTrain').val('');
      $('#frequency').val('');
    console.log(database);
  });

  database.ref().on('child_added', function(childSnapshot){
      var tname = childSnapshot.val().name;
      var tdestination = childSnapshot.val().destination;
      var tfirstTrain = childSnapshot.val().firstTrain;
      var tfrequency = childSnapshot.val().frequency;


      const firstTimeConvert = moment(tfirstTrain, "HH:mm").subtract(1, "years");
      const currentTime = moment();
      var diffTime = moment().diff(moment(firstTimeConvert), "minutes");
      var tRemainder = diffTime % tfrequency;
      var tMinutesTillTrain = tfrequency - tRemainder;
      var nextTrain = moment().add(tMinutesTillTrain, "minutes")

      const newRow = $("<tr>").append(
        $('<td>').text(tname.toUpperCase()),
        $('<td>').text(tdestination.toUpperCase()),
        $('<td>').text(tfirstTrain),
        $('<td>').text(tfrequency + 'min'),
        $('<td>').text(tMinutesTillTrain)
      );
      $('#tableBody').append(newRow);
  });