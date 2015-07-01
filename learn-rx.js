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

