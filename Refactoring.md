# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
I decided to restructure the code in a way that clearly separates the 3 possible scenarios applied for different types of the argument (empty event, event with no partition key, event with partition key). For that, I used early returns which also allowed me to avoid nested conditions and redundant checks (e.g. checking if candidate exists when this is also determined by whether or not the event is falsy or checking if the candidate length doesn't exceed the specified max length when it's already a hash - the hash is guaranteed to be 128 chars and even if it could exceed this length due to a change in max length constant or the hashing method, then hashing it again wouldn't solve this problem).

I think it's usually good to enclose any repeated code in a reusable function and I applied this principle to the hash calculation which is done in two places. I also believe that reassigning variables should usually be avoided when it's trivial to do so, therefore I removed the reassignments of the `candidate` variable, in favor of a ternary assignment and another early return. Finally, as in the finished code the `candidate` variable can only hold the partition key provided in the event (either raw or stringified), I renamed the variable to reflect that.