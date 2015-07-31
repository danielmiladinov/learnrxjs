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


// Exercise 11: Use map() and mergeAll() to project and flatten the movieLists into an array of video ids

// Hint: use two nested calls to map() and one call to mergeAll().
function useMapAndMergeAllToFlattenTheMovieListsIntoAnArrayOfIds () {
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
  ];

  return movieLists.map(function (movieList) {
    return movieList.videos.map(function (video) {
      return video.id;
    });
  }).mergeAll();
}

// Wow! Great work. Mastering the combination of map() and mergeAll() is key to effective functional programming. You're
// half way there! Let's try a more complicated example...


// Exercise 12: Retrieve id, title, and a 150x200 box art url for every video

// You've managed to flatten a tree that's two levels deep, let's try for three! Let's say that instead of a single
// boxart url on each video, we had a collection of boxart objects, each with a different size and url. Create a query
// that selects {id, title, boxart} for every video in the movieLists. This time though, the boxart property in the
// result will be the url of the boxart object with dimensions of 150x200px. Let's see if you can solve this problem
// with map(), mergeAll(), and filter().

// There's just more one thing: you can't use indexers. In other words, this is illegal:

// var itemInArray = movieLists[0];

// Furthermore, you're not allowed to use indexers in any of the remaining exercises unless you're implementing one of
// the five functions. There is a very good reason for this restriction, and that reason will eventually be explained.
// For now, you'll simply have to accept it on faith that this restriction serves a purpose. :-)
function retrieveIdTitleAndBoxartForEveryVideo () {
  var movieLists = [
    {
      name: "Instant Queue",
      videos : [
        {
          "id": 70111470,
          "title": "Die Hard",
          "boxarts": [
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 4.0,
          "bookmark": []
        },
        {
          "id": 654356453,
          "title": "Bad Boys",
          "boxarts": [
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 5.0,
          "bookmark": [{ id:432534, time:65876586 }]
        }
      ]
    },
    {
      name: "New Releases",
      videos: [
        {
          "id": 65432445,
          "title": "The Chamber",
          "boxarts": [
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 4.0,
          "bookmark": []
        },
        {
          "id": 675465,
          "title": "Fracture",
          "boxarts": [
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
            { width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 5.0,
          "bookmark": [{ id:432534, time:65876586 }]
        }
      ]
    }
  ];


  // Use one or more map, mergeAll, and filter calls to create an array with the following items
  // [
  //     {"id": 675465,"title": "Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
  //     {"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
  //     {"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" },
  //     {"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
  // ];

  return movieLists.map(function (movieList) {
    return movieList.videos.map(function (video) {
      return video.boxarts.filter(function (boxart) { return boxart.width === 150; })
        .map(function (boxart) {
          return {
            id: video.id,
            title: video.title,
            boxart: boxart.url
          };
        });
    }).mergeAll();
  }).mergeAll();
}

// Fantastic job! Now you've learned to use mergeAll() alongside map() and filter() to queries trees. Notice that map()
// and mergeAll() are very commonly chained together.
// Let's create a small helper function to help us with this common pattern.


// Exercise 13: Implement flatMap()

// Nearly every time we flatten a tree we chain map() and mergeAll(). Sometimes, if we're dealing with a tree several
// levels deep, we'll repeat this combination many times in our code. To save on typing, let's create a flatMap function
// that's just a map operation, followed by a mergeAll.
Array.prototype.flatMap = function (projectionFunctionThatReturnsArray) {
  return this.
    map(function (item) { return projectionFunctionThatReturnsArray(item); }).
    mergeAll();
};

// Now, instead of using map().mergeAll() to flatten a tree, we can just use flatMap helper function.


// Exercise 14: Use flatMap() to retrieve id, title, and 150x200 box art url for every video

// Let's repeat the exercise we just performed. However this time we'll simplify the code by replacing the
// map().mergeAll() calls with flatMap().
function retrieveIdTitleAndBoxartForEveryVideoUsingFlatMap () {
  var movieLists = [
    {
      name: "Instant Queue",
      videos : [
        {
          "id": 70111470,
          "title": "Die Hard",
          "boxarts": [
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 4.0,
          "bookmark": []
        },
        {
          "id": 654356453,
          "title": "Bad Boys",
          "boxarts": [
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 5.0,
          "bookmark": [{ id:432534, time:65876586 }]
        }
      ]
    },
    {
      name: "New Releases",
      videos: [
        {
          "id": 65432445,
          "title": "The Chamber",
          "boxarts": [
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 4.0,
          "bookmark": []
        },
        {
          "id": 675465,
          "title": "Fracture",
          "boxarts": [
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
            { width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 5.0,
          "bookmark": [{ id:432534, time:65876586 }]
        }
      ]
    }
  ];


  // Use one or more flatMap, map, and filter calls to create an array with the following items
  // [
  //     {"id": 675465,"title": "Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
  //     {"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
  //     {"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" },
  //     {"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
  // ];

  return movieLists.flatMap(function (movieList) {
    return movieList.videos.flatMap(function (video) {
      return video.boxarts.filter(function (boxart) { return boxart.width === 150; })
        .map(function (boxart) {
          return {
            id: video.id,
            title: video.title,
            boxart: boxart.url
          }
        });
    });
  });
}

// It's a very common pattern to see several nested flatMap operations, with the last operation being a map. You can
// think of this pattern as the functional version of a nested forEach.

// Reducing Arrays
// ----------------

// Sometimes we need to perform an operation on more than one item in the array at the same time. For example, let's say
// we need to find the largest integer in an array. We can't use a filter() operation, because it only examines one item
// at a time. To find the largest integer we need to the compare items in the array to each other.

// One approach could be to select an item in the array as the assumed largest number (perhaps the first item), and then
// compare that value to every other item in the array. Each time we come across a number that was larger than our
// assumed largest number, we'd replace it with the larger value, and continue the process until the entire array was
// traversed.

// If we replaced the specific size comparison with a closure, we could write a function this handled the array
// traversal process for us. At each step our function would apply the closure to the last value and the current value
// and use the result as the last value the next time. Finally we'd be left with only one value. This process is known
// as reducing because we reduce many values to a single value.


// Exercise 15: Use forEach to find the largest box art

// In this example we use forEach to find the largest box art. Each time we examine a new boxart we update a variable
// with the currently known maximumSize. If the boxart is smaller than the maximum size, we discard it. If it's larger,
// we keep track of it. Finally we're left with a single boxart which must necessarily be the largest.
function reduceWithForEach () {
  var boxarts = [
      { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
      { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
      { width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
      { width: 425, height:150, url:"http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
    ],
    currentSize,
    maxSize = -1,
    largestBoxart;

  boxarts.forEach(function(boxart) {
    currentSize = boxart.width * boxart.height;
    if (currentSize > maxSize) {
      largestBoxart = boxart;
      maxSize = currentSize;
    }
  });

  return largestBoxart;
}

// This process is a reduction because we're using the information we derived from the last computation to calculate the
// current value. However in the example above, we still have to specify the method of traversal. Wouldn't it be nice if
// we could just specify what operation we wanted to perform on the last and current value? Let's create a helper
// function to perform reductions on arrays.


// Exercise 16: Implement reduce()

// Let's add a reduce() function to the Array type. Like map:
// [1,2,3].reduce(function(accumulatedValue, currentValue) { return accumulatedValue + currentValue; }); === [6];
// [1,2,3].reduce(function(accumulatedValue, currentValue) { return accumulatedValue + currentValue; }, 10); === [16];

Array.prototype.reduce = function (combiner, initialValue) {
  var counter,
    accumulatedValue;

  // If the array is empty, do nothing
  if (this.length === 0) {
    return this;
  } else {
    // If the user didn't pass an initial value, use the first item.
    if (arguments.length === 1) {
      counter = 1;
      accumulatedValue = this[0];
    } else if (arguments.length >= 2) {
      counter = 0;
      accumulatedValue = initialValue;
    } else {
      throw "Invalid arguments.";
    }

    // Loop through the array, feeding the current value and the result of
    // the previous computation back into the combiner function until
    // we've exhausted the entire array and are left with only one function.
    while (counter < this.length) {
      accumulatedValue = combiner(accumulatedValue, this[counter]);
      counter++;
    }

    return [accumulatedValue];
  }
};


// Exercise 17: Retrieve the largest rating.

// Let's use our new reduce function to isolate the largest value in an array of ratings.
function findLargestRatingWithReduce () {
  var ratings = [2, 3, 1, 4, 5];

  // You should return an array containing only the largest rating. Remember that reduce always
  // returns an array with one item.
  return ratings.
    reduce(function (acc, item) {
      if (item > acc) {
        return item;
      } else {
        return acc;
      }
    });
}

// Nice work. Now let's try combining reduce() with our other functions to build more complex queries.


// Exercise 18: Retrieve url of the largest boxart

// Let's try combining reduce() with map() to reduce multiple boxart objects to a single value:
// the url of the largest box art.
function reduceBoxartsToOnlyTheUrlOfTheLargestBoxart () {
  var boxarts = [
    { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
    { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
    { width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
    { width: 425, height:150, url:"http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
  ];

  function size (boxart) {
    return boxart.width * boxart.height;
  }

  // You should return an array containing only the largest box art. Remember that reduce always
  // returns an array with one item.
  return boxarts.
    reduce(function (largest, boxart) {
      // Only calculate size once per boxart
      var boxartSize = size(boxart);
      boxart.size = boxartSize;

      if (largest.size > boxartSize) {
        return largest
      } else {
        return boxart;
      }
    }, { width: 0, height: 0, size: 0 })
    .map(function (boxart) {
      return boxart.url
    });
}


// Exercise 19: Reducing with an initial value

// Sometimes when we reduce an array, we want the reduced value to be a different type than the items stored in the
// array. Let's say we have an array of videos and we want to reduce them to a single map where the key is the video id
// and the value is the video's title.
function reduceWithAnInitialValue () {
  var videos = [
    {
      "id": 65432445,
      "title": "The Chamber"
    },
    {
      "id": 675465,
      "title": "Fracture"
    },
    {
      "id": 70111470,
      "title": "Die Hard"
    },
    {
      "id": 654356453,
      "title": "Bad Boys"
    }
  ];

  // Expecting this output...
  // [
  //     {
  //         "65432445": "The Chamber",
  //         "675465": "Fracture",
  //         "70111470": "Die Hard",
  //         "654356453": "Bad Boys"
  //     }
  // ]
  return videos.
    reduce(function(accumulatedMap, video) {

      // Object.create() makes a fast copy of the accumulatedMap by
      // creating a new object and setting the accumulatedMap to be the
      // new object's prototype.
      // Initially the new object is empty and has no members of its own,
      // except a pointer to the object on which it was based. If an
      // attempt to find a member on the new object fails, the new object
      // silently attempts to find the member on its prototype. This
      // process continues recursively, with each object checking its
      // prototype until the member is found or we reach the first object
      // we created.
      // If we set a member value on the new object, it is stored
      // directly on that object, leaving the prototype unchanged.
      // Object.create() is perfect for functional programming because it
      // makes creating a new object with a different member value almost
      // as cheap as changing the member on the original object!

      var copyOfAccumulatedMap = Object.create(accumulatedMap);
      copyOfAccumulatedMap[video.id] = video.title;
      return copyOfAccumulatedMap;
    },
    // Use an empty map as the initial value instead of the first item in
    // the list.
    {});
}

// Nice work. Now let's try combining reduce() with our other functions to build more complex queries.


// Exercise 20: Retrieve the id, title, and smallest box art url for every video.

// This is a variation of the problem we solved earlier, where we retrieved the url of the boxart with a width of 150px.
// This time we'll use reduce() instead of filter() to retrieve the smallest box art in the boxarts array.
function reduceToRetrieveIdTitleAndSmallestBoxartForEveryVideo () {
  var movieLists = [
    {
      name: "New Releases",
      videos: [
        {
          "id": 70111470,
          "title": "Die Hard",
          "boxarts": [
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 4.0,
          "bookmark": []
        },
        {
          "id": 654356453,
          "title": "Bad Boys",
          "boxarts": [
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
            { width: 140, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }

          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 5.0,
          "bookmark": [{ id:432534, time:65876586 }]
        }
      ]
    },
    {
      name: "Thrillers",
      videos: [
        {
          "id": 65432445,
          "title": "The Chamber",
          "boxarts": [
            { width: 130, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 4.0,
          "bookmark": []
        },
        {
          "id": 675465,
          "title": "Fracture",
          "boxarts": [
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
            { width: 120, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
            { width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 5.0,
          "bookmark": [{ id:432534, time:65876586 }]
        }
      ]
    }
  ];


  // Use one or more flatMap, map, and reduce calls to create an array with the following items (order doesn't matter)
  // [
  //     {"id": 675465,"title": "Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
  //     {"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
  //     {"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" },
  //     {"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
  // ];

  function size (boxart) {
    return boxart.width * boxart.height;
  }

  return movieLists.
    flatMap(function(movieList) {
      return movieList.videos.flatMap(function (video) {
        return video.boxarts.reduce(function (smallest, boxart) {
          boxart.size = size(boxart);

          if (boxart.size > smallest.size) {
            return smallest;
          } else {
            return boxart;
          }
        }, { width: Number.MAX_VALUE, height: Number.MAX_VALUE, size: Number.MAX_VALUE })
        .map(function (boxart) {
            return {
              id: video.id,
              title: video.title,
              boxart: boxart.url
            };
        });
      })
    });
}

// Zipping Arrays
// --------------

// Sometimes we need to combine two arrays by progressively taking an item from each and combining the pair. If you
// visualize a zipper, where each side is an array, and each tooth is an item, you'll have a good idea of how the zip
// operation works.


// Exercise 21: Combine videos and bookmarks by index

// Use a for loop to traverse the videos and bookmarks array at the same time. For each video and bookmark pair, create
// a {videoId, bookmarkId} pair and add it to the videoIdAndBookmarkIdPairs array.
function zipArraysWithForLoop () {
  var videos = [
      {
        "id": 70111470,
        "title": "Die Hard",
        "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 4.0,
      },
      {
        "id": 654356453,
        "title": "Bad Boys",
        "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 5.0,
      },
      {
        "id": 65432445,
        "title": "The Chamber",
        "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 4.0,
      },
      {
        "id": 675465,
        "title": "Fracture",
        "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 5.0,
      }
    ],
    bookmarks = [
      {id: 470, time: 23432},
      {id: 453, time: 234324},
      {id: 445, time: 987834}
    ],
    counter,
    videoIdAndBookmarkIdPairs = [];

  for(counter = 0; counter < Math.min(videos.length, bookmarks.length); counter++) {
    // Insert code here to create a {videoId, bookmarkId} pair and add it to the videoIdAndBookmarkIdPairs array.
    videoIdAndBookmarkIdPairs.push({
      videoId: videos[counter].id,
      bookmarkId: bookmarks[counter].id
    });
  }

  return videoIdAndBookmarkIdPairs;
}


// Exercise 22: Implement zip

// Let's add a static zip() function to the Array type. The zip function accepts a combiner function, traverses each
// array at the same time, and calls the combiner function on the current item on the left-hand-side and
// right-hand-side. The zip function requires an item from each array in order to call the combiner function, therefore
// the array returned by zip will only be as large as the smallest input array.
// JSON.stringify(Array.zip([1,2,3],[4,5,6], function(left, right) { return left + right })) === '[5,7,9]'
// accumulatedValue + currentValue; }); === [6];
Array.zip = function(left, right, combinerFunction) {
  var counter,
    results = [];

  for(counter = 0; counter < Math.min(left.length, right.length); counter++) {
    results.push(combinerFunction(left[counter], right[counter]));
  }

  return results;
};


// Exercise 23: Combine videos and bookmarks by index

// Let's repeat exercise 19, but this time let's use your new zip() function. For each video and bookmark pair, create
// a {videoId, bookmarkId} pair.
function zipArraysWithZip () {
  var videos = [
      {
        "id": 70111470,
        "title": "Die Hard",
        "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 4.0,
      },
      {
        "id": 654356453,
        "title": "Bad Boys",
        "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 5.0,
      },
      {
        "id": 65432445,
        "title": "The Chamber",
        "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 4.0,
      },
      {
        "id": 675465,
        "title": "Fracture",
        "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 5.0,
      }
    ],
    bookmarks = [
      {id: 470, time: 23432},
      {id: 453, time: 234324},
      {id: 445, time: 987834}
    ];

  return Array.
    zip(videos, bookmarks, function (video, bookmark) {
      return {
        videoId: video.id,
        bookmarkId: bookmark.id
      };
    });
}


// Exercise 24: Retrieve each video's id, title, middle interesting moment time, and smallest box art url.

// This is a variation of the problem we solved earlier. This time each video has an interesting moments collection,
// each representing a time during which a screenshot is interesting or representative of the title as a whole.
// Notice that both the boxarts and interestingMoments arrays are located at the same depth in the tree. Retrieve the
// time of the middle interesting moment and the smallest box art url simultaneously with zip(). Return an
// {id, title, time, url} object for each video.
function deriveIdTitleMiddleInterestingTimeAndSmallestBoxartUrl () {
  var movieLists = [
    {
      name: "New Releases",
      videos: [
        {
          "id": 70111470,
          "title": "Die Hard",
          "boxarts": [
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 4.0,
          "interestingMoments": [
            { type: "End", time:213432 },
            { type: "Start", time: 64534 },
            { type: "Middle", time: 323133}
          ]
        },
        {
          "id": 654356453,
          "title": "Bad Boys",
          "boxarts": [
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
            { width: 140, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }

          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 5.0,
          "interestingMoments": [
            { type: "End", time:54654754 },
            { type: "Start", time: 43524243 },
            { type: "Middle", time: 6575665}
          ]
        }
      ]
    },
    {
      name: "Instant Queue",
      videos: [
        {
          "id": 65432445,
          "title": "The Chamber",
          "boxarts": [
            { width: 130, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 4.0,
          "interestingMoments": [
            { type: "End", time:132423 },
            { type: "Start", time: 54637425 },
            { type: "Middle", time: 3452343}
          ]
        },
        {
          "id": 675465,
          "title": "Fracture",
          "boxarts": [
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
            { width: 120, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
            { width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
          ],
          "url": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 5.0,
          "interestingMoments": [
            { type: "End", time:45632456 },
            { type: "Start", time: 234534 },
            { type: "Middle", time: 3453434}
          ]
        }
      ]
    }
  ];

  function size (boxart) {
    return boxart.width * boxart.height;
  }

  //------------ COMPLETE THIS EXPRESSION --------------
  return movieLists.
    flatMap(function(movieList) {
      return movieList.videos.flatMap(function (video) {
        return Array.zip(
          video.boxarts.reduce(function (smallest, boxart) {
            boxart.size = size(boxart);

            if (boxart.size > smallest.size) {
              return smallest;
            } else {
              return boxart;
            }
          }, { width: Number.MAX_VALUE, height: Number.MAX_VALUE, size: Number.MAX_VALUE }),
          video.interestingMoments.filter(function (moment) { return moment.type === 'Middle'; }),
          function (boxart, moment) {
            return {
              id: video.id,
              title: video.title,
              time: moment.time,
              url: boxart.url
            };
          }
        );
      })
    });
}

// Powerful Queries

// Now that we've learned the five operators let's flex our muscles and write some powerful queries.


// Exercise 25: Converting from Arrays to Trees

// When information is organized in a tree like a JSON expression, relationships point from parent to child.
// In relational systems like databases, relationships point from children to their parents. Both ways of organizing
// information are equivalent, and depending on the circumstances, we might get data organized in one way or another.
// It may surprise you to learn that you can use the 5 query functions you already know to easily convert between these
// representations. In other words, not only can you query arrays from trees, you can query trees from arrays.

// We have 2 arrays each containing lists, and videos respectively. Each video has a listId field indicating its
// parent list. We want to build an array of list objects, each with a name and a videos array. The videos array will
// contain the video's id and title. In other words we want to build the following structure:

var expectedStructure = [
  {
    "name": "New Releases",
    "videos": [
      {
        "id": 65432445,
        "title": "The Chamber"
      },
      {
        "id": 675465,
        "title": "Fracture"
      }
    ]
  },
  {
    "name": "Thrillers",
    "videos": [
      {
        "id": 70111470,
        "title": "Die Hard"
      },
      {
        "id": 654356453,
        "title": "Bad Boys"
      }
    ]
  }
];

// Note: please make sure when creating objects (both lists and videos) that you add properties in the same order as
// above. This doesn't impact the correctness of your code, but the verifier expects properties to be created
// in this order.
function convertingArraysToTrees () {
  var lists = [
      {
        "id": 5434364,
        "name": "New Releases"
      },
      {
        "id": 65456475,
        name: "Thrillers"
      }
    ],
    videos = [
      {
        "listId": 5434364,
        "id": 65432445,
        "title": "The Chamber"
      },
      {
        "listId": 5434364,
        "id": 675465,
        "title": "Fracture"
      },
      {
        "listId": 65456475,
        "id": 70111470,
        "title": "Die Hard"
      },
      {
        "listId": 65456475,
        "id": 654356453,
        "title": "Bad Boys"
      }
    ];

  return lists.map(function (list) {
    return {
      name: list.name,
      videos: videos.filter(function (v) { return v.listId === list.id })
        .map(function (v) { return { id: v.id, title: v.title }; })
    };
  });
}

// Looks like you figured out that you can use map and filter to join two different arrays by a key.
// Now let's try a more complex example...


// Exercise 26: Converting from Arrays to Deeper Trees

// Let's try creating a deeper tree structure. This time we have 4 seperate arrays each containing lists, videos,
// boxarts, and bookmarks respectively. Each object has a parent id, indicating its parent. We want to build an array of
// list objects, each with a name and a videos array. The videos array will contain the video's id, title, bookmark
// time, and smallest boxart url. In other words we want to build the following structure:

expectedStructure = [
  {
    "name": "New Releases",
    "videos": [
      {
        "id": 65432445,
        "title": "The Chamber",
        "time": 32432,
        "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg"
      },
      {
        "id": 675465,
        "title": "Fracture",
        "time": 3534543,
        "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg"
      }
    ]
  },
  {
    "name": "Thrillers",
    "videos": [
      {
        "id": 70111470,
        "title": "Die Hard",
        "time": 645243,
        "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"
      },
      {
        "id": 654356453,
        "title": "Bad Boys",
        "time": 984934,
        "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg"
      }
    ]
  }
];

// Note: please make sure when creating objects (both lists and videos) that you add properties in the same order
// as above. This doesn't impact the correctness of your code, but the verifier expects properties
// to be created in this order.
function convertArraysToDeeperTrees () {
  var lists = [
      {
        "id": 5434364,
        "name": "New Releases"
      },
      {
        "id": 65456475,
        name: "Thrillers"
      }
    ],
    videos = [
      {
        "listId": 5434364,
        "id": 65432445,
        "title": "The Chamber"
      },
      {
        "listId": 5434364,
        "id": 675465,
        "title": "Fracture"
      },
      {
        "listId": 65456475,
        "id": 70111470,
        "title": "Die Hard"
      },
      {
        "listId": 65456475,
        "id": 654356453,
        "title": "Bad Boys"
      }
    ],
    boxarts = [
      { videoId: 65432445, width: 130, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
      { videoId: 65432445, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" },
      { videoId: 675465, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
      { videoId: 675465, width: 120, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
      { videoId: 675465, width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
      { videoId: 70111470, width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
      { videoId: 70111470, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" },
      { videoId: 654356453, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
      { videoId: 654356453, width: 140, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }
    ],
    bookmarks = [
      { videoId: 65432445, time: 32432 },
      { videoId: 675465, time: 3534543 },
      { videoId: 70111470, time: 645243 },
      { videoId: 654356453, time: 984934 }
    ];

  function size (boxart) {
    return boxart.width * boxart.height;
  }

  function toSmallestBoxart (smallest, boxart) {
    boxart.size = size(boxart);

    if (boxart.size > smallest.size) {
      return smallest;
    } else {
      return boxart;
    }
  }

  var initialLargestBoxart = {
    width: Number.MAX_VALUE,
    height: Number.MAX_VALUE,
    size: Number.MAX_VALUE
  };

  return lists.map(function (list) {
    return {
      name: list.name,
      videos: videos.filter(function (v) { return v.listId === list.id; })
        .flatMap(function (video) {
          var onVideoId = function (o) { return o.videoId === video.id; };
          return Array.zip(
            bookmarks.filter(onVideoId),
            boxarts.filter(onVideoId).reduce(toSmallestBoxart, initialLargestBoxart),
            function (bookmark, boxart) {
              return {
                id: video.id,
                title: video.title,
                time: bookmark.time,
                boxart: boxart.url
              };
            }
          );
        })
    };
  });
}

// Wow! That's a large query, but the code is still small relative to the amount of work it's doing. If we rewrote
// this query with a series of loops our code would be much less self-describing. Loops don't give the reader any
// information about the kind of operation being performed. Every time you see a loop, you need to carefully read
// through the code to find out what's being done. Is it a projection? A filter? A reduction? Why use loops for querying
// data when we've demonstrated that the 5 functions can be used to create virtually any output we want?


// Exercise 28: Stock Ticker

// Let's try an easier question. Let's say we have a collection of all of the prices for NASDAQ stocks over time. Every
// time the price of a stock changes on the NASDAQ ticker an entry is added to this collection. Let's say that ten days
// ago you bought shares in Microsoft, and now you want to print all of the MSFT share prices since then. Filter the
// collection for MSFT trades starting from ten days ago and print each price record (including the time stamp) using
// the print() function. Note: this is not a trick question. It's as easy as it seems.

// The pricesNASDAQ collection looks something like this...
  var pricesNASDAQ = [
  // ... from the NASDAQ's opening day
  {name: "ANGI", price: 31.22, timeStamp: new Date(2011,11,15) },
  {name: "MSFT", price: 32.32, timeStamp: new Date(2011,11,15) },
  {name: "GOOG", price: 150.43, timeStamp: new Date(2011,11,15)},
  {name: "ANGI", price: 28.44, timeStamp: new Date(2011,11,16)},
  {name: "GOOG", price: 199.33, timeStamp: new Date(2011,11,16)},
  // ...and up to the present.
];

function stockTickerNotATrickQuestion (pricesNASDAQ, printRecord) {
  var microsoftPrices,
    now = new Date(),
    tenDaysAgo = new Date( now.getYear(), now.getMonth(), now.getDate() - 10);

  // use filter() to filter the trades for MSFT prices recorded any time after 10 days ago
  microsoftPrices =
    pricesNASDAQ.
      filter(function(priceRecord) { return priceRecord.timeStamp > tenDaysAgo && priceRecord.name === "MSFT"; });

        // Print the trades to the output console
        microsoftPrices.
          forEach(function(priceRecord) {
            printRecord(priceRecord);
          });
}

// Console
// *Console is actively logging MSFT stock changes over time after you click Run*

// Notice that the console is changing over time. Now look at the time stamps on the stock prices. We're displaying
// stock prices sampled after we ran our program! How could our array have contained stock price records
// from the future? Did we accidentally rip a hole in the space-time continuum?

// The solution to the riddle is that pricesNASDAQ is _not_ an array. Unlike an array, which can only store a snapshot
// of stock prices, this new type can react to changes and update over time.

// In the next section I'll reveal the inner workings of this magical type. You'll learn how you can use it model
// everything from mouse events to asynchronous JSON requests. Finally I'll show you how you can query this type using
// the 5 query functions you already know. It's about time we gave this magical type a name...

// Working with Observables
// ------------------------

// Microsoft's open-source Reactive Extensions library introduces a new collection type to Javascript: Observable.
// An Observable is a lot like an Event. Like an Event, an Observable is a sequence of values that a data producer
// pushes to the consumer. However unlike an Event, an Observable can signal to a listener that it has completed,
// and will send no more data.

// Observables can send data to consumers asynchronously. Unlike Array, there's no Javascript literal syntax for
// creating Observable sequences. However we can build a helper method that visually describes the contents of sequences
// as well as the times between each item's arrival. The seq function creates an Observable from an array of items, and
// adds a delay for every empty item encountered. Every ,,, adds up to a second.

// An array of numbers 1,2,3
var numbers123Array =      [1,2,3];

// A sequence that returns 1, and then after 4 seconds returns 2,
// and then after another second returns 3, and then completes.
var numbers123Observable = seq([1,,,,,,,,,,,,2,,,3]);

// Like Arrays, Observables can contain any object - even Arrays.
var observableOfArrays = seq([ [1,2,3],,,,,,[4,5,6],,,,,,,,,,,[1,2] ]);

// Observables are a sequence of values, delivered one after the other. Therefore it's possible that an Observable can
// go on sending data to a listener forever just like a mouse move event. To create a sequence that doesn't complete,
// you can add a trailing ,,, to the end of the items passed to seq().

// The trailing ,,, ensures that the sequence will not complete.
var mouseMovesObservable =
seq([ {x: 23, y: 55},,,,,,,{x: 44, y: 99},,,{x:55,y:99},,,{x: 54, y:543},,, ]);

// No trailing ,,, indicates that sequence will complete.
var numbers123Observable = seq([1,,,2,,,3]);

// Querying Arrays only gives us a snapshot. By contrast, querying Observables allows us to create data sets that react
// and update as the system changes over time. This enables a very powerful type of programming known as
// reactive programming.

// Let's start off by contrasting Observable with Events...


// Exercise 29: Subscribing to an event

// You're probably used to thinking about events as a list of handlers stored in an object. In this example,
// we subscribe to a button click event and then unsubscribe the first time the button is clicked.
function subscribingToAButtonClickEvent (button) {
  // the button click handler
  var handler = function(ev) {
    // Unsubscribe from the button event.
    button.removeEventListener("click", handler);

    alert("Button was clicked. Unsubscribing from event.");
  };

  // add the button click handler
  button.addEventListener("click", handler);
}

// Ask yourself this question: How is subscribing to an event different than traversing an array? Both operations
// involve sending a listener a sequence of items by repeatedly invoking a function. So why can't we traverse Arrays
// and Events the same way?


// Exercise 30: Traversing an Event

// Subscribing to an Event and traversing an Array are fundamentally the same operation. The only difference is that
// Array traversal is synchronous and completes, and Event traversal is asynchronous and never completes. If we convert
// a button click Event to an Observable object, we can use forEach() to traverse the Event.
function traversingAnEvent (button) {
  var buttonClicks = Observable.fromEvent(button, "click");

  // In the case of an Observable, forEach returns a subscription object.
  var subscription =
    buttonClicks.
      forEach(function(priceRecord) {
        alert("Button was clicked. Stopping Traversal.");

        // Stop traversing the button clicks
        subscription.dispose();
      });
}

// Notice that Observable's forEach() function returns a Subscription object. Disposing of a Subscription object
// unsubscribes from the event and prevents memory leaks. Disposing of a subscription is the asynchronous equivalent of
// stopping half-way through a counting for loop.

// Disposing of a Subscription object is basically the same as calling removeEventListener(). On the surface, these two
// approaches to Event handling don't seem to be very different. Under the circumstances, why should we bother
// converting Events to Observables? The reason is that if we convert Events to Observable Objects, we can use powerful
// functions to transform them. In the next exercise we'll learn how we can use one such function to avoid dealing with
// Subscriptions in many cases...


// Exercise 31: Completing Sequences with take()

// Have you ever wished that you could listen for the next occurrence of an event and then immediately unsubscribe?
// For example, developers will often attach an event handler to window.onload, expecting that their event handler will
// only be called once.

window.addEventListener("load", function () {
  /* do some work here, but expect this function will only be called once. */
});

// In instances such as this, it's good practice to unsubscribe from the event after it's fired. Failing to unsubscribe
// is a memory leak. Depending on the circumstances, memory leaks can seriously destabilize your application and can be
// very difficult to track down. Unfortunately unsubscribing from an event after one occurrence can be cumbersome:

var handler = function() {
  // do some work here, then unsubscribe from the event
  window.removeEventListener("load", handler)
};
window.addEventListener("load", handler);

// Wouldn't it be nice if there was an easier way to code this? That's why Observable has a take() function.
// The take() function works like this...

seq([1,,,2,,,3,,,4,,,5,,,6,,,]).take(3) === seq([1,,,2,,,3]);

// An Observable based on an Event will never complete on its own. The take() function creates a new sequence that
// completes after a discrete number of items arrive. This is important, because unlike an Event, when an Observable
// sequence completes it unsubscribes all of its listeners. That means that if we use take() to complete our Event
// sequence, we don't need to unsubscribe!

// Let's repeat the previous exercise, in which we listened for a single button click and then unsubscribed. This time
// let's use the take() function to complete the sequence after the button is clicked.
function unsubscribeViaTake (button) {
  var buttonClicks = Observable.fromEvent(button, "click");

  // Use take() to listen for only one button click
  // and unsubscribe.
  buttonClicks.
    take(1).
    forEach(function(priceRecord) {
      alert("Button was clicked once. Stopping Traversal.");
    });
}
