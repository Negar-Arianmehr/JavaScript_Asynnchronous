https://www.udemy.com/course/the-complete-javascript-course/#JavaScript_Asynnchronouswith this training, I learned about the order of the loading of the functions. Because of it, asynnchronous would be a great method.

#Promises and the Fetch API:

now what exactly is a promise and what can we do with it?
So the formal definition of a promise is that it's an object that is used basically as a placeholder for the future result of an asynchronous operation.
And if that sounds weird to you, we can also say that a promise is like a container for an asynchronously delivered value,  promise is a container for a future value. There are two different types of settled promises that's fulfilled promises and rejected promises.So a fulfilled promise is a promise that has successfully resulted in a value just as we expect it.a rejected promise means that there has been an error during the asynchronous task.a promise is only settled once, the state will remain unchanged forever.So we consume a promise, But sometimes we also need to build a promise and to not just consume it.

the promise will then be settled and either in a fulfilled or in a rejected state, but for now let's assume success. So assume that the promise will be fulfilled and that we have a value available to work with. And so to handle this fulfilled state, we can use the then(we need to pass the callback function here that we want to execute as soon as the promise is actually fulfilled) method that is available on all promises. The callback function of then method will accually receive one argument, once it's called by JavaScript and that argument value is the resulting value of the fulfilled promise.
For get info from respose we need JASON method. Jason is a method that is available on all responses of the fetch function. the problem here is this Jason function itself, is actually also an asynchronous function. That means it also return a new promise. So we need to return this promise( response.json()) and we have to call another then method with a callback function after it. 
So it's very easy to understand that this fetches something and then we get a response which will be transformed to json. And then we take that data and render the country to the DOM.
Promises do not get rid of callbacks, but they do in fact get rid of callback hell.
Sometimes for show some info, they need to be done in sequence.

The then method always returns a promise, no matter if we actually return anything or not. BUt if we do return a value, then that value will become the fulfillment value of the return promise. So whereever we return a promise, and so we can handle it using the then method(We can do anything with this return promise). So the fufill value or the success value basically of the promise will be the values that we return from this then method...in the next then method data is from previous then method or return.

We can make a long chain with promise without callback function hell. So instead of callback hell(when you have a callback function into the another one) we have what we call a flat chain of promises.
Promises are an incredibly powerful and elegant solution to handle asynchronous code.

Handle errors(Catching to error) in promises:
In this position, The promise that returned from the fetch function was actually rejected. 
There are some ways to handeling rejections.
1. To pass a second callback function into the then method. First callback function is always gonna be called for the fulfilled promise, for a successsful one. But we can also pass in a second callback function which will be called when the promise was rejected.
2. For this we can have a callback function for error after JSON, but we can also use the catch() method at the end of the chain will basically catch any errors that occur in any place in this whole promise chain and no matter where that is.
3. We can use throw new Error keyword that make a error and the catch() method handle it.
Finally() method:
Then method is called when the promise is fulfilled while catch() method is only called when the promise is rejected, and the finally() method is used for sometimes that always needs to happen no matter the result of the promise.

#Asynchronous behind the scence:
A JS runtime is basically a container. The heart of every JS runtime is the engine. JS has only one thread of execution and so it can only do one thing at a time. There is absolutely no multitasking happening in JS itself. Other launguge can do that but not JS. We have **call stack** and **heap**. Next we have the web APIs environment. These are some APIs provided to the engine but which are actually not part of the JS language itself. Next up, there is the **callback queue** and this is a data structure thar holds all the ready to be executed callback function that are attached to some event that has occurred. 
Event loop is pice that makes asynchronous behavior possible in JS. It is the resean why we can have non blocking concurrency model in JS. A concurrency model is simply how a language handles multiple things happening at the same time. Each time the **event loop** takes a callback from the callback queue, we say that there was an event loop tick. The event loop is who decides exactlly when each callback is executed. We can also say that the event loop does the orchestration of this entire JavaScript runtime.
Callback queue for promises have the special callback queue for themselves, which is the so called **microtasks queue** that it basically has priority over the callback queue. The event loop gives microtasks priority over regular callbacks.
**Which codes will be executed sooner?**
At first, Code outside of any callback, will run first and They are synchronous. It doesnt matter where they are. Ater that the macrotask queue is executed and last one will be a callback queue. If doesnt matter that you have setTimeOut even in 0, if it is callback queue, it will be happened after micro-task queue.
**new Promise(function(resolve, reject) ...)** is essentially just a special kind of object in JS. Now the promise constructor takes exactly one argument and that is the so-called **executor function**. Like the fetch fuction it also makes a new promise.
Calling the resolve function will Mark this promise as a fulfilled promise, and reject function is the error.
**Promisifying** means to convert callback based asynchronous behavior to promise based. So creating a function and then from there returning a promise, it is that we want to do. It will encapsulate the asynchronous operation even further. So essentially that's also what the fetch function does.
Promise. resolve() and promise,reject() are for happening immediately.
This is how we can built our own promisesand how we promisify a very simple callback based asynchronous behavior function such as set timeout.



