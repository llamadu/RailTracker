  var keyArray = [];

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCi0ja_Wf5DEXU0bk4VxXXMMVg2mtf2YnY",
    authDomain: "railtracker-83a4f.firebaseapp.com",
    databaseURL: "https://railtracker-83a4f.firebaseio.com",
    projectId: "railtracker-83a4f",
    storageBucket: "",
    messagingSenderId: "950961234419",
    appId: "1:950961234419:web:c2f82c833621960c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  function timeDisplay() {
      var timeNow = moment().format("HH:mm:ss");
      $(".timeNow").text(timeNow)
  };

  setInterval(timeDisplay, 1000);

  // add train button
  $("#submit").on("click", function(event) {
      event.preventDefault();

      // get user input
      var name = $("#name").val().trim();
      var destination = $("#destination").val().trim();
      var firstTime = $("#firstTime").val().trim();
      var frequency = $("#frequency").val().trim();

      // hold train data
      var newTrain = {
          name: name,
          destination: destination,
          firstTime: firstTime,
          frequency: frequency
      };

      database.ref().push(newTrain);

      // Logs everything to console
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.firstTime);
      console.log(newTrain.frequency);

      // Clears all of the text-boxes
      $("#name").val("");
      $("#destination").val("");
      $("#firstTime").val("");
      $("#frequency").val("");
  });

  // Firebase event for adding train to database and a row  when a user adds train
  database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

      // Store everything into a variable.
      var name = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var firstTime = childSnapshot.val().firstTime;
      var frequency = childSnapshot.val().frequency;


      // Tidy the firstTime
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


      // make new row
      var newRow = $(`<tr>`).append(
          $("<td>").text(name),
          $("<td>").text(destination),
          $("<td>").text(frequency),
          $("<td>").text(nextTrainConverted),
          $("<td>").text(tMinutesTillTrain),
          $("<td>").append(button)
      );

      // Append the new row 
      $("#trainTable > tbody").append(newRow);

      //removing  rows
      $(document.body).on("click", ".buttons", function() {
          var trainRemove = $(this).attr("remove");
          database.ref().child(trainRemove).remove();
          //reload the page with  updated data
          location.reload();
      });





<<<<<<< HEAD
  });
=======
  });
>>>>>>> ad9bedff0f1dc158cf8f701ddb7ced70d83db85c
