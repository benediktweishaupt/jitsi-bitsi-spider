// get childs of div
var articleAmount = Math.floor($(".categories").children().length / 5);
console.log(articleAmount);

// finds filled containers to copy stuff from
function findFullArray(copy) {
  randomParentClass = copy + ' section:nth-child('+Math.ceil(Math.random()*articleAmount)+')';
  if ($(randomParentClass).children().length == 0) {
    findFullArray(copy);
  }
}

function addScrollClasses(i, paste) {
  switch(i)
  {
  case 0:
    $( paste + " article:last-child").addClass("before")
    break
  case 1:
    $( paste + " article:last-child").addClass("active")
    break
  case 2:
    $( paste + " article:last-child").addClass("after")
    break
  default:
  }
}
// pastes all difs in article tags
function copyPasteDiv(copy, paste) {
  if (articleAmount < 3) { console.log("not enough elements");}
  for(var i = 0; i < articleAmount; i++) {
    $(paste).append("<article></article>");
    addScrollClasses(i, paste);
    for (var j = 0; j < 5; j++) {
      findFullArray(copy);
      var randomChild = Math.ceil(Math.random()*$(randomParentClass).children().length);
        // How to save HTML inluding Element
        $(randomParentClass + ' .latestblock:nth-child('+randomChild+')').appendTo(paste + " article:last-child");
    };
  };
};


// get childs of div
var b = 0;




// // Random Area
function randomFromTo(from, to){
  return Math.floor(Math.random() * (to - from + 1) + from);
}
// // Random Position and Scaling
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


// Main Box in focus on scroll
function addClassOnScroll(tag, classAdded, delta) {
  if( delta > 0 ){
      $('.'+classAdded).removeClass(classAdded).prev(tag).addClass(classAdded);
      // re starts at the bottom if top of DOM tree is reached
      if (!$( tag ).hasClass( classAdded )){
        $( tag ).last().addClass( classAdded );
      }
  }
  else if( delta < 0 ){
    $('.'+classAdded).removeClass(classAdded).next(tag).addClass(classAdded);
      // re starts at the top if bottom of DOM tree is reached
    if (!$( tag ).hasClass( classAdded )){
      $( tag ).first().addClass( classAdded );
    }
  }
  b++
  console.log(b)
}


$(document).ready(function() {
  $(window).mousewheel(_.debounce(function(e, delta){
    addClassOnScroll('article', 'before', delta);
    addClassOnScroll('article', 'active', delta);
    addClassOnScroll('article', 'after', delta);
    }, 30)
  );
  // First in which div are the elements stored, second where are they pasted
  copyPasteDiv("#contentBox", "#wrapper");
  // position Boxes
  $('#wrapper .latestblock').each(function() {
        moveRandom($(this), "#wrapper");
  });


  setInterval(function() {
    $('#wrapper .latestblock').each(function() {
          moveRandom($(this), "#wrapper");
    });

  }, 10000);
  setInterval(function() {
    $(".mail" ).toggleClass( "inverted");
  }, 3000);
  setInterval(function() {
    $(".phone").toggleClass( "inverted");
  }, 2000);

});
