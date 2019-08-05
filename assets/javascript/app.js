
// 1. Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
     // example database info below
     apiKey: "AIzaSyDCK0cWc73hn_BvbsHFRjqB4J5Y5eqOkn4",
     authDomain: "timesheet-ae58a.firebaseapp.com",
     databaseURL: "https://timesheet-ae58a.firebaseio.com",
     projectId: "timesheet-ae58a",
     storageBucket: "timesheet-ae58a.appspot.com",
     messagingSenderId: "895542699406",
     appId: "1:895542699406:web:8b2140ef268b17af"
   };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   
   var database = firebase.database();

   
   var name ='';
   var destination = '';
   var firstTrainTime = '';
   var frequency = '';
   var nextTrain = '';
   var nextTrainFormatted = '';
   var minutesAway = '';
   var firstTimeConverted = '';
   var currentTime = '';
   var diffTime = '';
   var tRemainder = '';
   var minutesTillTrain = '';
   var keyHolder = '';
   var getKey = '';
   
   
   $(document).ready(function() {
   
        $("#add-train").on("click", function() {
   
             name = $('#name-input').val().trim();
             destination = $('#destination-input').val().trim();
             firstTrainTime = $('#first-train-time-input').val().trim();
             frequency = $('#frequency-input').val().trim();
             firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
             currentTime = moment();
             diffTime = moment().diff(moment(firstTimeConverted), "minutes");
             tRemainder = diffTime % frequency;
             minutesTillTrain = frequency - tRemainder;
             nextTrain = moment().add(minutesTillTrain, "minutes");
             nextTrainFormatted = moment(nextTrain).format("hh:mm");
   
             // Code for the push
             keyHolder = dataRef.push({
                  name: name,
                  destination: destination,
                  firstTrainTime: firstTrainTime,  // ex: 2:22
                  frequency: frequency,
                  nextTrainFormatted: nextTrainFormatted,
                  minutesTillTrain: minutesTillTrain
             });
   
             $('#name-input').val('');
             $('#destination-input').val('');
             $('#first-train-time-input').val('');
             $('#frequency-input').val('');
   
             return false;
        });
        dataRef.on("child_added", function(childSnapshot) {
   
             $('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
                  "<td class='col-xs-3'>" + childSnapshot.val().name +
                  "</td>" +
                  "<td class='col-xs-2'>" + childSnapshot.val().destination +
                  "</td>" +
                  "<td class='col-xs-2'>" + childSnapshot.val().frequency +
                  "</td>" +
                  "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + // Next Arrival
                  "</td>" +
                  "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + // Minutes Away
                  "</td>" +
                  "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
             "</tr>");
   
   // Errors
   }, function(errorObject){
   
   });
   
   $("body").on("click", ".remove-train", function(){
        $(this).closest ('tr').remove();
        getKey = $(this).parent().parent().attr('id');
        dataRef.child(getKey).remove();
   });
   
   });