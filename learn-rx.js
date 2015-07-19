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

