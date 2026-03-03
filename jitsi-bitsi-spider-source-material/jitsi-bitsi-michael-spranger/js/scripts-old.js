// Copy and paste of divs in visible area
function copyPasteDiv(copy, paste) {
  // remove all previous children
  $(paste).children().remove();
    //define Random number for placed objects 
    var xTcount = Math.ceil(Math.random()*3)+2;
  //select Random Children
  for(var i = 0; i < xTcount; i++) {
    var randomChild = Math.ceil(Math.random()*$(copy).children().length);
    var content = $(copy).find('div:nth-child('+randomChild+')').clone();
    $(paste).append(content);
  };
};
// Random Area
function randomFromTo(from, to){
  return Math.floor(Math.random() * (to - from + 1) + from);
}
// Random Position and Scaling
function moveRandom(obj, Box) {
        /* get container position and size
    * -- access method : cPos.top and cPos.left */
  var cPos = $(Box).offset();
  var cHeight = $(Box).height();
  var cWidth = $(Box).width();

  // get box padding (assume all padding have same value)
  var pad = parseInt($(Box).css('padding-top').replace('px', ''));

  // defining box size
  var bHeight = ((Math.random()*(cHeight/5)) + (cHeight/10)).toFixed();
  var bWidth = bHeight*1.6;

  // set maximum position
  maxY = cPos.top + cHeight - bHeight - pad;
  maxX = cPos.left + cWidth - bWidth - pad;

  // set minimum position
  minY = cPos.top + pad;
  minX = cPos.left + pad;

  // set new position           
  newY = randomFromTo(minY, maxY);
  newX = randomFromTo(minX, maxX);

  obj.css({
    top: newY+"px",
    left: newX+"px",
    width: bWidth+"px",
    height: bHeight+"px"
  }, function() {
    moveRandom(obj);
  });
}

$(document).ready(function() {
  $(window).mousewheel( function(e, delta){
      if( delta > 0 ){
        //First in which div are the elements stored, second where are they pasted
        copyPasteDiv("#content", "#newBox");
        $('.latestblock').each(function() {
              moveRandom($(this), "#newBox");
        });
      }§
  });


  $( "#newBox" ).mousemove(function( event ) {
      var hCoord = event.pageY - ($("#newBox").height() / 2); 
      var wCoord = event.pageX - ($("#newBox").width() / 2); 
    $('.latestblock').each(function() {
      var pos = $(this).position();
      var rand = Math.floor($(this).width()/5);
      $(this).css({
        'marginTop':((hCoord/rand)) + "px",
        'marginLeft':((wCoord/rand)) + "px"
      });
    });
  });
});