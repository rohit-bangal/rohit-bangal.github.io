var modalBtns = [...document.querySelectorAll(".button1")];
modalBtns.forEach(function(btn){
  btn.onclick = function() {
    var modal = btn.getAttribute('data-modal');
    document.getElementById(modal).style.display = "block";
//	var video = $("#vid_mah").attr("src");
//	video = video.add("&autoplay=1");
//    $("#vid_mah").attr("src",video);
  }
});

var closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function(btn){
  btn.onclick = function() {
    var modal = btn.closest('.modal');
    modal.style.display = "none";
  }
});

window.onclick = function(event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
	var video;
	if(event.target.id === "modal_quadru") {
		video = $("#vid_quad").attr("src");
//	video = video.replace("&autoplay=1", "");
	$("#vid_quad").attr("src","");
	$("#vid_quad").attr("src",video);
//	$('#vid_mah').get(0).stopVideo();
	} 
	else {
		video = $("#vid_mah").attr("src");
//	video = video.replace("&autoplay=1", "");
	$("#vid_mah").attr("src","");
	$("#vid_mah").attr("src",video);
//	$('#vid_mah').get(0).stopVideo();
	}
	
  }
}

