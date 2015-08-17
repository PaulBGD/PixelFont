I'm currently in the middle of creating my entry for [js13kGames](http://2015.js13kgames.com/). js13kGames is a contest, where the rules are that you create a game using JavaScript and Canvas, while keeping it under 13 kilobytes. This includes all assets as well. While we are supposed to zip our entry, this is a huge limit. For example, here's a comparison between a few popular libraries:

![Size of libraries vs js13kGames](/content/images/blank-2.png)

EaselJS and melonjs are both 2D frameworks for making games in Canvas. They're both far larger than 13KB, and there's no way I can fit them into my game.

I can't use Fonts either, Open Sans Normal when GZipped is 15.2KB! So when I'm working on my game, Gray, I realized I needed a way to add a font that really fits the game. I then decided to make the game's art style Pixel Art (after being inspired by /r/pixelart), and figure out a way to create a lightweight font. That part was pretty easy actually, because I figured out the perfect way to do it immediately.

![A Pixel](/content/images/A-pixel.png)

So the idea was, I create an Object that contains 5 arrays for each letter. One array for each row. The arrays would then contain values of true and false. Where there was a true, I would draw a pixel. Where there was a false, I would skip that spot. The A arrays came out like this:

```javascript
var A = [
    [false, true, false],
    [true, false, true],
    [true, false, true],
    [true, true, true],
    [true, false, true]
];
```

However since I need to minify this as much as possible, I did a few things

- Replaced all of the `true`s with `1`, as `1 == true`
- Completely removed the `false`s, as JavaScript will leave the empty position as `undefined`, and `undefined == false`
- Removed the `false`s that were unused at the end of the array. Later I will just figure out the width of the letter by the largest array.

After doing those, my A looks like this:

```javascript
var A = [
    [, 1],
    [1, , 1],
    [1, , 1],
    [1, 1, 1],
    [1, , 1]
];
```

(Ignoring the fact that I didn't GZip it or minify it, the size in bytes went from 136 to 79!)
I then wrote up the rest of the letters, and it looked a little bit like this:

[~Gist](https://gist.github.com/PaulBGD/4604f6073e223133fc9c)

I didn't do lowercase letters, characters, or numbers besides 0 and 1 (if you want to make these, I'd love to see them!) So after doing the bulk of the work, there's only a few things left I needed to do. The first of these, was getting the letters I needed:

```javascript
var needed = [];
string = string.toUpperCase(); // because I only did uppercase letters
for (var i = 0; i < string.length; i++) {
    var letter = letters[string.charAt(i)];
    if (letter) { // because there's letters I didn't do
        needed.push(letter);
    }
}
```

After that, I just need to draw the needed letters:

```javascript
context.fillStyle = 'black';
var currX = 0;
for (i = 0; i < needed.length; i++) {
    letter = needed[i];
    var currY = 0;
    var addX = 0;
    for (var y = 0; y < letter.length; y++) {
        var row = letter[y];
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
```

And we're done! You can check it out on GitHub, or check out the demo!

[~GitHub](https://github.com/PaulBGD/PixelFont) [~Demo](https://paulbgd.github.io/PixelFont)
