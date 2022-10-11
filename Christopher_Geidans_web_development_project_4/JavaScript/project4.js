/*
 * JQUERY QUESTIONS
 * 1. I think that JQuery code is slightly harder to read than the pure JavaScript code because the syntax is slightly more complicated.
 *    For example compare this line to get a button to call a function from the project 3 version of my code: 
 *    theNextButton.onclick = function() { nextButtonFunction(); }
 *    with the code that does the same thing using JQuery:
 *    $("#nextButton").click(function(){nextButtonFunction();});
 *    The JavaScript version is,to me, easier to read because it involves less  consecutive use of paretnhesis, curly braces, and semicolons.
 * 
 * 2. Yes, the JQuery program is shorter than the pure JavaScript program, The JavaScript version consisted of 188 lines while the JQuery version consisted of 139 lines of code
 *    (excluding answering these questions). The main reason for this (aside from a major refactoring of my setMainImage() function)
 *    Is that JQuery allows me to directly access HTML elements and edit multiple attributes at once as opposed to having to edit them one at a time with JavaScript.
 * 
 * 3. I would say that my answers to the previous questions are typical for comparisons of JQuery versus JavaScript in general because Jquery was designed to take some of
 *    the redundancy and tedium out of pure JavaScript by allowing things like editing multiple attributes of an HTML element with one line as opposed to many, therefore it was
 *    almost designed to make code shorter. However doing this takes some additional syntax thus naturally making JQuery slightly harder to read or learn.
 */
// Constructor for image objects.
function Image() {
    this.url = "";
    this.altText = "";
    this.description = "";
    this.setUrl = function (link) {
        this.url = link;
    }
    this.getUrl = function () {
        return this.url;
    }
    this.setAltText = function (text) {
        this.altText = text;
    }
    this.getAltText = function () {
        return this.altText;
    }
    this.setDescription = function (desc) {
        this.description = desc;
    }
    this.getDescription = function () {
        return this.description;
    }
}
// Array to hold all image objects.
const images = [];

// Declare an index for the image array.
let slideIndex = 0;

// Setting all image objects.
var dog1 = new Image();
dog1.setUrl("images/dog1.jpg");
dog1.setAltText("A photo of a jolly corgi dog standing on a set of railroad tracks.");
dog1.setDescription("a photo of a jolly corgi dog standing on a set of railroad tracks.");

var dog2 = new Image();
dog2.setUrl("images/dog2.jpg");
dog2.setAltText("A photo of a dog herding a group of sheep at sunrise.");
dog2.setDescription("a photo of a dog herding a group of sheep at sunrise.");

var frog1 = new Image();
frog1.setUrl("images/frog1.jpg");
frog1.setAltText("A photo of a frog looking out from under some lilly pads.");
frog1.setDescription("a photo of a frog looking out from under some lilly pads.");

var frog2 = new Image();
frog2.setUrl("images/frog2.jpg");
frog2.setAltText("A photo of a tree frog perched on a branch.");
frog2.setDescription("a photo of a tree frog perched on a branch.");

var cat1 = new Image();
cat1.setUrl("images/cat1.jpg");
cat1.setAltText("A photo of a black cat curled on a sofa.");
cat1.setDescription("a photo of a black cat curled up on a sofa.");

var cat2 = new Image();
cat2.setUrl("images/cat2.jpg");
cat2.setAltText("A photo of a white cat lying down in a dark room.");
cat2.setDescription("a photo of a white cat lying down in a dark room.");

var bat1 = new Image();
bat1.setUrl("images/bat1.jpg");
bat1.setAltText("A photo of a tiny bat hanging from a branch.");
bat1.setDescription("a photo of a tiny bat hanging from a branch.");

var bat2 = new Image();
bat2.setUrl("images/bat2.jpg");
bat2.setAltText("A photo of a bat hanging upside down in the sun.");
bat2.setDescription("a photo of a bat hanging upside down in the sun.");

// Adding all the image objects into the "images" array.
images.push(dog1);
images.push(dog2);
images.push(frog1);
images.push(frog2);
images.push(cat1);
images.push(cat2);
images.push(bat1);
images.push(bat2);

//Prevent JQuery methods from running until page has loaded.
$(document).ready(function(){

    // Functions for the "Next" and "Random" buttons as well as one to generate a random number.
    function nextButtonFunction() {
        var index = slideIndex;
        if (index == 7) {
            $("#slideShowImage").attr({"src": images[0].url, "alt": images[0].altText});
            $("#slideImageCaption").text("Here is"+images[0].description);
            return slideIndex = 0;
        } else {
            $("#slideShowImage").attr({"src": images[index + 1].url, "alt": images[index + 1].altText});
            $("#slideImageCaption").text("Here is "+images[index + 1].description);
            return slideIndex++;
        }
    }

    function getRndIndex(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomButtonFunction() {
        var randomIndex = getRndIndex(0, 7);
        $("#slideShowImage").attr({"src": images[randomIndex].url, "alt": images[randomIndex].altText});
        $("#slideImageCaption").text("Here is"+images[randomIndex].description);
        return slideIndex = randomIndex;
    }

    // Function to set the main image and caption depending on the hour of the day.
    function setMainImage(now) {
        var currentHour = now.getHours();
        var currentTime = now.toLocaleTimeString();
        var currentDate = now.toLocaleDateString();
        var index = Math.floor(currentHour/3);
        $("#mainImage").attr({"src": images[index].url, "alt": images[index].altText});
        $("#mainCaptionSpace").text("This image depicts "+images[index].description);
        $("#mainTimeSpace").text("The current time and date is: " + currentTime + " on " + currentDate);
    }

    function timeUpdate(newTime) {
        var updateTime = newTime.toLocaleTimeString();
        var updateDate = newTime.toLocaleDateString();
        $("#mainTimeSpace").text("The current time and date is: " + updateTime + " on " + updateDate);
    }

    // Set buttons to their matching functions.
    $("#nextButton").click(function(){nextButtonFunction();});

    $("#randomButton").click(function(){randomButtonFunction();});

    setInterval(function () {
        const updateDate = new Date();
        timeUpdate(updateDate);
    }, 60 * 1000);

    // Set the inital imaage, caption, and date when the page loads.
    const d = new Date();
    window.onload(setMainImage(d));
});