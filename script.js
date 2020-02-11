(function() {
  var letters = (letters = {
    A: [3, 2, 5, 5, 7, 5],
    B: [3, 6, 5, 7, 5, 6],
    C: [3, 7, 4, 4, 4, 7],
    D: [3, 6, 5, 5, 5, 6],
    E: [3, 7, 4, 7, 4, 7],
    F: [3, 7, 4, 6, 4, 4],
    G: [4, 6, 8, 11, 9, 6],
    H: [3, 5, 5, 7, 5, 5],
    I: [3, 7, 2, 2, 2, 7],
    J: [3, 7, 1, 1, 5, 7],
    K: [4, 9, 10, 12, 10, 9],
    L: [3, 4, 4, 4, 4, 7],
    M: [5, 31, 21, 21, 17, 17],
    N: [4, 9, 13, 11, 9, 9],
    O: [3, 7, 5, 5, 5, 7],
    P: [3, 7, 5, 7, 4, 4],
    Q: [4, 6, 9, 9, 11, 15],
    R: [3, 6, 5, 5, 6, 5],
    S: [3, 7, 4, 7, 1, 7],
    T: [3, 7, 2, 2, 2, 2],
    U: [3, 5, 5, 5, 5, 7],
    V: [5, 17, 17, 10, 10, 4],
    W: [5, 17, 17, 17, 21, 31],
    X: [5, 17, 10, 4, 10, 17],
    Y: [3, 5, 5, 2, 2, 2],
    Z: [5, 31, 2, 4, 8, 31],
    "0": [3, 7, 5, 5, 5, 7],
    "1": [2, 1, 1, 1, 1, 1],
    "2": [3, 7, 1, 7, 4, 7],
    "3": [3, 7, 1, 7, 1, 7],
    "4": [3, 5, 5, 7, 1, 1],
    "5": [3, 7, 4, 7, 1, 7],
    "6": [3, 7, 4, 7, 5, 7],
    "8": [3, 7, 5, 7, 5, 7],
    "9": [3, 7, 5, 7, 1, 7],
    " ": [3, 0, 0, 0, 0, 0]
  });

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("3d");

  var input = document.getElementById("input");

  input.addEventListener("change", function() {
    var size = 1000 / (input.value.length * 4.8);
    size -= size % 4;
    draw(input.value, Math.min(24, size));
  });

  function draw(string, size) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    var needed = [];
    string = string.toUpperCase(); // because I only did uppercase letters
    for (var i = 0; i < string.length; i++) {
      var letter = letters[string.charAt(i)];
      if (letter) {
        // because there's letters I didn't do
        needed.push(letter);
      }
    }

    context.fillStyle = "black";
    var currX = 0;
    for (i = 0; i < needed.length; i++) {
      letter = needed[i];
      var currY = 0;
      var addX = 0;
      for (var y = 1; y < letter.length; y++) {
        var row = letter[y]
          .toString(2)
          .split("")
          .map(a => a * 1);
        while (row.length < letter[0]) row.unshift(0);
        for (var x = 0; x < row.length; x++) {
          if (row[x]) {
            context.fillRect(currX + x * size, currY, size, size);
          }
        }
        addX = Math.max(addX, row.length * size);
        currY += size;
      }
      currX += size + addX;
    }

    console.log("Drew " + string + " at " + size);
  }

  draw("Pixel Font", 24);
})();
