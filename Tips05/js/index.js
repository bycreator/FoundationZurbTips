$(document).foundation();
var countOpen = 0, countOpened = 0;

function updateCountOpen() {
  countOpen++;
  $('#countOpen').text(countOpen)
}
function updateCountOpened() {
  countOpened++;
  $('#countOpened').text(countOpened)
}


$('#myModal').on('open.fndtn.reveal', function(){
	updateCountOpen();
});
$('#myModal').on('opened.fndtn.reveal', function(){
	updateCountOpened();
});

/*$('#myModal').on('open', function(){
	updateCountOpen();
});
$('#myModal').on('opened', function(){
	updateCountOpened();
});*/

$('#myModal').on('closed.fndtn.reveal', function(){
  countOpen = 0;
  countOpened = 0;
});