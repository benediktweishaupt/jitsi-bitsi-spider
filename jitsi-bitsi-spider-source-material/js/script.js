// GENERAL ARRAYS
// const borders = ['dotted','dashed','solid','double','groove','ridge','inset','outset']
// const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857", 'red', 'yellow'];
// const aragFONT = ['Archivo Black', 'Bangers', 'Bungee Inline', 'Ceviche One', 'Cinzel Decorative', 'Faster One', 'Fontdiner Swanky', 'Hanalei', 'Knewave', 'Kumar One Outline', 'Monoton', 'MuseoModerno', 'Notable', 'Piedra', 'Shrikhand', 'Spartan', 'UnifrakturMaguntia']

// const aragWriteFont = ['Allura', 'Arapey', 'Charm', 'Cormorant', 'DM Sans', 'Italianno', 'La Belle Aurore', 'Lato', 'Old Standard TT', 'Parisienne', 'Poppins']



// ARRAYS FOR LUKAS
// const fewColors = ['black', 'white']

// Arrays for Stefanie wunderlich
// const fewColors = ['red', 'blue', 'green', 'black', 'white']


// CHANCE FOR LUKAS
// Generate a svg randomly
// chance.mixin({
//     svg: function(options){
//         options = options || {};
//         options.size = options.max_size || 30;
//         if (typeof options.lines === 'undefined') options.lines = 20;
//         if (typeof options.circles === 'undefined') options.circles = 10;
//         if (typeof options.triangles === 'undefined') options.triangles = 10;
//         if (typeof options.opacity === 'undefined') options.opacity = 0.3;
//         options.background = options.background || chance.color({grayscale: true});
//
//         // Create a coordinate within an area bigger than the svg
//         function point(min, max){
//             return chance.integer({ min: min || -50, max: max || 150 });
//         }
//
//         // Generate the actual svg
//         // Docs: developer.mozilla.org/en-US/docs/Web/SVG/Element/line
//         // viewBox use: stackoverflow.com/q/17498855
//         var svg = '<svg version="1.1" viewBox="0 0 100 100"';
//         svg += 'xmlns="http://www.w3.org/2000/svg"';
//         svg += 'style="background-color:' + options.background + '">';
//         for (var i = 0; i < options.lines; i++) {
//             svg += '<line stroke="' + chance.color() + '" ';
//             svg += 'stroke-width="' + point(1, 5) + '" ';
//             svg += 'opacity="' + options.opacity + '" ';
//             svg += 'x1="' + point() + '" y1="' + point() + '" ';
//             svg += 'x2="' + point() + '" y2="' + point() + '" />';
//         }
//         for (var i = 0; i < options.circles; i++) {
//             svg += '<circle cx="' + point() + '" ';
//             svg += 'cy="' + point() + '" ';
//             svg += 'r="' + point(1, options.max_size / 2) + '" ';
//             svg += 'opacity="' + options.opacity + '" ';
//             svg += 'fill="' + chance.color() + '"/>';
//         }
//         for (var i = 0; i < options.triangles; i++) {
//             var s = size = options.max_size;
//             svg += '<polygon fill="' + chance.color({grayscale: true}) + '" points="';
//             svg += (x = point()) + ',' + (y = point()) + ' ';
//             svg += (x + point(-s, s)) + ',' + (y + point(-s, s)) + ' ';
//             svg += (x + point(-s, s)) + ',' + (y + point(-s, s));
//             svg += '" opacity="' + options.opacity + '" ';
//             svg += 'fill="' + chance.color() + '"/>';
//         }
//         return svg + '</svg>';
//     }
// });





  // Call Lukas

  // var letterCount = 0;
  //
  // $(".letter").css({
  //   opacity: 0
  // });
  //
  //
  // setInterval( function() {
  //   if (letterCount < 7) {
  //     letterCount ++;
  //   }
  //   else {
  //     letterCount = 0;
  //   }
  //   var letterID = '#letter-0' + letterCount;
  //
  //   changeFontColorCss(letterID, chance.color());
  //   changeFontSize(letterID, 10, 40)
  //   x = getRandomInt(60, (window.innerWidth - 60));
  //   y = getRandomInt(60, (window.innerHeight - 60));
  //   $(letterID).css({
  //     left: x,
  //     top: y,
  //     opacity: 1
  //   });
  //
  // }, 1361);
  //
  // setInterval( function () {
  //   document.querySelector('.background').innerHTML = chance.svg({
  //       lines: 0,
  //       triangles:0,
  //       circles: 40,
  //       max_size: 30,
  //       opacity: 0.5
  //   });
  // }, 3470)

  // setInterval( function() {
  //   changeFlex('.singleLetter', 200);
  //   changeFlex('.letterRow', 100);
  //   changeFontSize('.singleLetter', 10, 100);
  //   changeBorderRadius('.singleLetter', borderRadius);
  // }, 1000);

// });
