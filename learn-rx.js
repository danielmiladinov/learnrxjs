// Functional Programming in Javascript
// ====================================

// Functional programming provides developers with the tools to abstract common collection operations into reusable,
// composable building blocks. You'll be surprised to learn that most of the operations you perform on collections can
// be accomplished with five simple functions:

// - map
// - filter
// - mergeAll
// - reduce
// - zip

// Here's my promise to you: if you learn these 5 functions your code will become shorter, more self-descriptive, and
// more durable. Also, for reasons that might not be obvious right now, you'll learn that these five functions hold the
// key to simplifying asynchronous programming. Once you've finished this tutorial you'll also have all the tools you
// need to easily avoid race conditions, propagate and handle asynchronous errors, and sequence events and AJAX
// requests. In short, these 5 functions will probably be the most powerful,
// flexible, and useful functions you'll ever learn.

// Working with Arrays

// The Array is Javascript's only collection type. Arrays are everywhere. We're going to add the five functions to the
// Array type, and in the process make it much more powerful and useful. As a matter of fact, Array already has the map,
// filter, and reduce functions! However we're going to to reimplement these functions as a learning exercise.

// This section will follow a pattern. First we'll solve problems the way you probably learned in school, or on your own
// by reading other peoples code. In other words, we'll transform collections into new collections using loops and
// statements. Then we'll implement one of the five functions, and then use it to solve the same problem again without
// the loop. Once we've learned the five functions, you'll learn how to combine them to solve complex problems with very
// little code.


// Traversing an Array
// -------------------

// Exercise 1: Print all the names in an array
function printAllNamesInAnArray (console) {
  var names = ["Ben", "Jafar", "Matt", "Priya", "Brian"],
    counter;

  for (counter = 0; counter < names.length; counter++) {
    console.log(names[counter]);
  }
}

// Ask yourself this question: did we need to specify the order in which the names were printed? If not, why do it?


// Exercise 2: Use forEach to print all the names in an array
// Let's repeat the previous exercise using the forEach function.

function printAllNamesInArrayUsingForEach (console) {
  var names = ["Ben", "Jafar", "Matt", "Priya", "Brian"];

  names.forEach(function(name) {
    console.log(name);
  });
}

// Notice that forEach let's us specify what we want to happen to each item in the array,
// but hides how the array is traversed.

// Projecting Arrays
// -----------------

// Applying a function to a value and creating a new value is called a projection. To project one array into another,
// we apply a projection function to each item in the array and collect the results in a new array.


// Exercise 3: Project an array of videos into an array of {id,title} pairs using forEach()
// For each video, add a projected {id, title} pair to the videoAndTitlePairs array.
function projectIdAndTitlePairs () {
  var newReleases = [
      {
        "id": 70111470,
        "title": "Die Hard",
        "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": [4.0],
        "bookmark": []
      },
      {
        "id": 654356453,
        "title": "Bad Boys",
        "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": [5.0],
        "bookmark": [{id: 432534, time: 65876586}]
      },
      {
        "id": 65432445,
        "title": "The Chamber",
        "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": [4.0],
        "bookmark": []
      },
      {
        "id": 675465,
        "title": "Fracture",
        "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": [5.0],
        "bookmark": [{id: 432534, time: 65876586}]
      }
    ],
    idAndTitlePairs = [];

  newReleases.forEach(function (newRelease) {
    idAndTitlePairs.push({id: newRelease.id, title: newRelease.title});
  });

  return idAndTitlePairs;
}

// All array projections share two operations in common:
// 1. Traverse the source array
// 2. Add each item's projected value to a new array

// Why not abstract away how these operations are carried out?


// Exercise 4: Implement map()

// To make projections easier, let's add a map() function to the Array type. Map accepts the projection function to be
// applied to each item in the source array, and returns the projected array.
Array.prototype.map = function (projectionFunction) {
  var results = [];
  this.forEach(function (itemInArray) {
    results.push(projectionFunction(itemInArray));
  });

  return results;
};


// Exercise 5: Use map() to project an array of videos into an array of {id,title} pairs

// Let's repeat the exercise of collecting {id, title} pairs for each video in the newReleases array, but this time
// we'll use our map function.
function useMapToProjectIdAndTitlePairs () {
  var newReleases = [
    {
      "id": 70111470,
      "title": "Die Hard",
      "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
      "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
      "rating": [4.0],
      "bookmark": []
    },
    {
      "id": 654356453,
      "title": "Bad Boys",
      "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
      "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
      "rating": [5.0],
      "bookmark": [{ id:432534, time:65876586 }]
    },
    {
      "id": 65432445,
      "title": "The Chamber",
      "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
      "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
      "rating": [4.0],
      "bookmark": []
    },
    {
      "id": 675465,
      "title": "Fracture",
      "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
      "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
      "rating": [5.0],
      "bookmark": [{ id:432534, time:65876586 }]
    }
  ];

  return newReleases.map(function (newRelase) {
    return { id: newRelase.id, title: newRelase.title };
  });
}

// Notice that map allows us to specify what projection we want to apply to an array,
// but hides how the operation is carried out.

// Filtering Arrays
// ----------------

// Like projection, filtering an array is also a very common operation. To filter an array we apply a test to each
// item in the array and collect the items that pass into a new array.


// Exercise 6: Use forEach() to collect only those videos with a rating of 5.0

// Use forEach() to loop through the videos in the newReleases array and, if a video has a rating of 5.0,
// add it to the videos array.
function filterUsingForEach () {
  var newReleases = [
      {
        "id": 70111470,
        "title": "Die Hard",
        "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 4.0,
        "bookmark": []
      },
      {
        "id": 654356453,
        "title": "Bad Boys",
        "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 5.0,
        "bookmark": [{ id:432534, time:65876586 }]
      },
      {
        "id": 65432445,
        "title": "The Chamber",
        "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 4.0,
        "bookmark": []
      },
      {
        "id": 675465,
        "title": "Fracture",
        "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 5.0,
        "bookmark": [{ id:432534, time:65876586 }]
      }
    ],
    videos = [];

  newReleases.forEach(function (newRelease) {
    if (newRelease.rating === 5.0) {
      videos.push(newRelease);
    }
  });

  return videos;
}

// Notice that, like map(), every filter() operation shares some operations in common:

// 1. Traverse the array
// 2. Add objects that pass the test to a new array

// Why not abstract away how these operations are carried out?


// Exercise 7: Implement filter()

// To make filtering easier, let's add a filter() function to the Array type. The filter() function accepts a
// predicate. A predicate is a function that accepts an item in the array, and returns a boolean indicating whether
// the item should be retained in the new array.
Array.prototype.filter = function(predicateFunction) {
  var results = [];
  this.forEach(function(itemInArray) {
    if (predicateFunction(itemInArray)) results.push(itemInArray);
  });

  return results;
};

// Like map(), filter() let's us express what data we want without
// requiring us to specify how we want to collect the data.

// Query Data by Chaining Method Calls
// -----------------------------------


// Exercise 8: Chain filter and map to collect the ids of videos that have a rating of 5.0
function idsOfHighlyRatedVideos () {
  var newReleases = [
    {
      "id": 70111470,
      "title": "Die Hard",
      "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
      "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
      "rating": 4.0,
      "bookmark": []
    },
    {
      "id": 654356453,
      "title": "Bad Boys",
      "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
      "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
      "rating": 5.0,
      "bookmark": [{ id:432534, time:65876586 }]
    },
    {
      "id": 65432445,
      "title": "The Chamber",
      "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
      "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
      "rating": 4.0,
      "bookmark": []
    },
    {
      "id": 675465,
      "title": "Fracture",
      "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
      "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
      "rating": 5.0,
      "bookmark": [{ id:432534, time:65876586 }]
    }
  ];

  return newReleases.filter(function (newRelease) {
    return newRelease.rating === 5.0;
  }).map(function (newRelease) {
    return newRelease.id;
  });
}

// Chaining together map() and filter() gives us a lot of expressive power. These high level functions let us express
// what data we want, but leave the underlying libraries a great deal of flexibility
// in terms of how our queries are executed.

// Querying Trees
// --------------

// Sometimes, in addition to flat arrays, we need to query trees. Trees pose a challenge because we need to flatten them
// into arrays in order to apply filter() and map() operations on them. In this section we'll define a mergeAll()
// function that we can combine with map() and filter() to query trees.


// Exercise 9: Flatten the movieLists array into an array of video ids

// Let's start by using two nested forEach loops collect the id of every video in the two-dimensional movieLists array.
function flattenMovieListsWithNestedForEachLoops () {
  var movieLists = [
      {
        name: "New Releases",
        videos: [
          {
            "id": 70111470,
            "title": "Die Hard",
            "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 4.0,
            "bookmark": []
          },
          {
            "id": 654356453,
            "title": "Bad Boys",
            "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 5.0,
            "bookmark": [{ id:432534, time:65876586 }]
          }
        ]
      },
      {
        name: "Dramas",
        videos: [
          {
            "id": 65432445,
            "title": "The Chamber",
            "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 4.0,
            "bookmark": []
          },
          {
            "id": 675465,
            "title": "Fracture",
            "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 5.0,
            "bookmark": [{ id:432534, time:65876586 }]
          }
        ]
      }
    ],
    allVideoIdsInMovieLists = [];

  movieLists.forEach(function (movieList) {
    movieList.videos.forEach(function (video) {
      allVideoIdsInMovieLists.push(video.id);
    });
  });

  return allVideoIdsInMovieLists;
}

// Flattening trees with nested forEach expressions is easy because we can explicitly add items to the array.
// Unfortunately it's exactly this type of low-level operation that we've been trying to abstract away with functions
// like map() and filter(). Can we define a function that's abstract enough to express our intent to flatten a tree,
// without specifying too much information about how to carry out the operation?


// Exercise 10: Implement mergeAll()

// Let's add a mergeAll() function to the Array type. The mergeAll() function iterates over each sub-array in the array
// and collects the results in a new, flat array. Note: the mergeAll() function expects that each item in the array will
// be another array.
Array.prototype.mergeAll = function() {
  var results = [];
  this.forEach(function (subArray) {
    subArray.forEach(function (subItem) { results.push(subItem); });
  });

  return results;
};

// Merge is a very simple function, so much so that it may not be obvious yet how it can be combined with map()
// to query a tree. Let's try an example...
