// // Synchronous Function
// function add(a, b) {
//   return a + b;
// }

// // Async function with callback
// function fetchData(url, callback) {
//   setTimeout(() => {
//     const data = "Some fetched data";
//     callback(data);
//   }, 1000);
// }

// // Using Callback

// fetchData("https://reqres.in/api/users", (result) => {
//   console.log("Fetched Data:", result);
// });

// console.log("This will run before the fetched data is available");

// function fetchDataWithError(url, callback) {
//   setTimeout(() => {
//     const err = null;
//     const data = "Some fetched data";
//     callback(err, data);
//   }, 1000);
// }

// fetchDataWithError("https://reqres.in/api/users", function (error, result) {
//   if (error) {
//     console.error("Error:", error);
//   } else {
//     console.log("Fetched Data:", result);
//   }
// });

function a(callback) {
  setTimeout(() => {
    console.log("Step One Completed");
    callback();
  }, 1000);
}

function b(callback) {
  setTimeout(() => {
    console.log("Step Two Completed");
    callback();
  }, 1000);
}

function finalStep() {
  console.log("All steps completed");
}

// Basic nested callbacks
a(() => {
  b(() => {
    finalStep();
  });
});

function fetchData(callback) {
  setTimeout(() => {
    const data = { message: "Fetched data successfully" };
    const error = null;
    callback(error, data);
  }, 2000);
}

function letsGo(app, app1) {
  console.log(app, app1);
}

letsGo("App1", "App2");
function processData(error, data, callback) {
  setTimeout(() => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Processing Data:", data.message);
      callback();
    }
  }, 3000);
}

// Execute Steps

fetchData((error, data) => {
  processData(error, data, () => {
    console.log("Data Processing Complete");
  });
});

fetchData(function (err, data) {
  processData(err, data, function () {
    console.log("Data Processing Complete");
  });
});

// Refactoring with Named function

function fetchData(callback) {
  setTimeout(() => {
    const data = { message: "Data Fetched Successfully" };
    const err = null;
    callback(err, data);
  }, 1000);
}

function processData(err, data, callback) {
  setTimeout(() => {
    if (err) {
      console.error("Error:", err);
    } else {
      console.log("Processing Data:", data.message);
      callback();
    }
  }, 2000);
}

function finalStep() {
  console.log("All Steps Completed");
}

fetchData((err, data) => {
  processData(err, data, finalStep);
});

// Handling multpile async operations

function fetchUserData(userId, callback) {
  setTimeout(() => {
    const userData = { id: userId, name: "John Doe" };
    const error = null;
    callback(error, userData);
  }, 1000);
}

function fetchUserPosts(userId, callback) {
  setTimeout(() => {
    const posts = ["Post 1", "Post 2", "Post 3"];
    const error = null;

    callback(error, posts);
  }, 1000);
}

function displayUserProfile(error, userData, callback) {
  setTimeout(() => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("User Profile:", userData);
      callback();
    }
  }, 1000);
}

function displayUserPosts(error, posts, callback) {
  setTimeout(() => {
    if (error) {
      console.error("Error", error);
    } else {
      console.log("User Posts:", posts);
      callback();
    }
  }, 1000);
}
const userId = 1;
fetchUserData(userId, (error, userData) => {
  displayUserProfile(error, userData, () => {
    fetchUserPosts(userId, (error, posts) => {
      displayUserPosts(error, posts, () => {
        console.log("Finished SuccessFully");
      });
    });
  });
});
