  var keyArray = [];
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD1LEAjtHAcUDsZE7pIjCy7rESBCPxtwI8",
    authDomain: "test-2b9ea.firebaseapp.com",
    databaseURL: "https://test-2b9ea.firebaseio.com",
    projectId: "test-2b9ea",
    storageBucket: "test-2b9ea.appspot.com",
    messagingSenderId: "412208756659",
    appId: "1:412208756659:web:713378738d600fe0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  function timeDisplay() {
      var timeNow = moment().format("HH:mm:ss");
      $(".timeNow").text(timeNow)
  };

  setInterval(timeDisplay, 1000);

  // submit button
  $("#submit").on("click", function(event) {
      event.preventDefault();

      // capture input
      var name = $("#name").val().trim();
      var destination = $("#destination").val().trim();
      var firstTime = $("#firstTime").val().trim();
      var frequency = $("#frequency").val().trim();

      // holding place for train info
      var newTrain = {
          name: name,
          destination: destination,
          firstTime: firstTime,
          frequency: frequency
      };

      database.ref().push(newTrain);

      // is it working? console.log it!
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.firstTime);
      console.log(newTrain.frequency);

      // clear 
      $("#name").val("");
      $("#destination").val("");
      $("#firstTime").val("");
      $("#frequency").val("");
  });

  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

      // Store train info into var
      var name = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var firstTime = childSnapshot.val().firstTime;
      var frequency = childSnapshot.val().frequency;


      // tidy up the firstTime by subtracting 1 year
      var firstTimeTidy = moment(firstTime, "HH:mm").subtract(1, "years");


      currentTime = moment().format("HH:mm");
      console.log("currentTime " + currentTime);
      var diffTime = moment().diff(moment(firstTimeTidy), "minutes");
      var tRemainder = diffTime % frequency;
      var tMinutesTillTrain = frequency - tRemainder;
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      var nextTrainConverted = moment(nextTrain).format("HH:mm");


      // remove trains
      var trainKeys = childSnapshot.key;
      console.log(trainKeys);
      keyArray.push(trainKeys);
      var button = $("<button>");
      button.attr("remove", trainKeys);
      button.addClass("buttons btn btn-dark btn-sm glyphicon glyphicon-trash");
      //   button.append("Trash");

      // make new row for trains
      var newRow = $(`<tr>`).append(
          $("<td>").text(name),
          $("<td>").text(destination),
          $("<td>").text(frequency),
          $("<td>").text(nextTrainConverted),
          $("<td>").text(tMinutesTillTrain),
          $("<td>").append(button)
      );

      // Append row to the table
      $("#trainTable > tbody").append(newRow);

      //removing row
      $(document.body).on("click", ".buttons", function() {
          var trainRemove = $(this).attr("remove");
          database.ref().child(trainRemove).remove();
          //remove opject and update
          location.reload();
      });


  });
