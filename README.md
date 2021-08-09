https://www.udemy.com/course/the-complete-javascript-course/#JavaScript_Asynnchronouswith this training, I learned about the order of the loading of the functions. Because of it, asynnchronous would be a great method.

#Promises and the Fetch API:

now what exactly is a promise and what can we do with it?
So the formal definition of a promise is that it's an object that is used basically as a placeholder for the future result of an asynchronous operation.
And if that sounds weird to you, we can also say that a promise is like a container for an asynchronously delivered value,  promise is a container for a future value. There are two different types of settled promises that's fulfilled promises and rejected promises.So a fulfilled promise is a promise that has successfully resulted in a value just as we expect it.a rejected promise means that there has been an error during the asynchronous task.a promise is only settled once, the state will remain unchanged forever.So we consume a promise, But sometimes we also need to build a promise and to not just consume it.

the promise will then be settled and either in a fulfilled or in a rejected state, but for now let's assume success. So assume that the promise will be fulfilled and that we have a value available to work with. And so to handle this fulfilled state, we can use the then(we need to pass the callback function here that we want to execute as soon as the promise is actually fulfilled) method that is available on all promises. The callback function of then method will accually receive one argument, once it's called by JavaScript and that argument value is the resulting value of the fulfilled promise.
For get info from respose we need JASON method. Jason is a method that is available on all responses of the fetch function. the problem here is this Jason function itself, is actually also an asynchronous function. That means it also return a new promise. So we need to return this promise( response.json()) and we have to call another then method with a callback function after it.
So it's very easy to understand that this fetches something and then we get a response which will be transformed to json. And then we take that data and render the country to the DOM.


