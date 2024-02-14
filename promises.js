// Promises
function basicAsyncOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("Operation Completed Successfully");
      } else {
        reject("Operation failed");
      }
    }, 100);
  });
}

// Usage
// basicAsyncOperation()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

//   Chaining Promises
function stepOne() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step One Completed");
      resolve("Step One Result");
    }, 1000);
  });
}

function stepTwo(previousResult) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Step Two Completed");
      resolve(`${previousResult}, Step Two Result`);
    }, 1000);
  });
}

function stepThree(previousResult) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Step Three Completed");
      resolve(`${previousResult}, Step Three Result`);
    }, 1000);
  });
}

stepOne()
  .then((res) => {
    console.log(res);
    return stepTwo(res);
  })
  .then((res) => {
    console.log(res);
    return stepThree(res);
  })
  .then((finished) => {
    console.log("Finished steps:", finished);
  })
  .catch((error) => {
    console.error(error);
  });

// stepOne()
//   .then((result) => stepTwo(result))
//   .then((finalResult) => {
//     console.log("Final Result:", finalResult);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// Using Promise.all
function fetchDataFromAPI1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isResolved = true;
      if (isResolved) {
        resolve("Data from API 1");
      } else {
        reject("Couldn't fetch data from API 1");
      }
    }, 1000);
  });
}
function fetchDataFromAPI2() {
  return new Promise((resolve, reject) => {
    const isResolved = false;

    setTimeout(() => {
      if (isResolved) {
        resolve("Data from API 2");
      } else {
        reject("Couldn't fetch data from API 2");
      }
    }, 1500);
  });
}

// Rejected: API 2 doesn't return and is rejected, therefore AP1 won't get resolved

// Promise.all([fetchDataFromAPI1(), fetchDataFromAPI2()])
//   .then((results) => {
//     console.log("Combined Results:", results);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

Promise.all([fetchDataFromAPI1(), fetchDataFromAPI2()])
  .then((res) => {
    console.log("Response:", res);
  })
  .catch((error) => {
    console.error(error);
  });

//   Fetching Data from API
function fetchDataFromAPI(apiEndpoint) {
  return fetch(apiEndpoint).then((response) => {
    if (!response.ok) {
      throw new Error("HTTP error! Status:" + response.status);
    }
    return response.json();
  });
}

const apiEndpoint = "https://reqres.in/api/users";

fetchDataFromAPI(apiEndpoint)
  .then((data) => console.log(data))
  .catch((error) => {
    console.error(error);
  });

//   Using Asyn Await to fetch data

async function fetchDataUsingAsyncAwait(apiEndpoint) {
  try {
    const data = await fetchDataFromAPI(apiEndpoint);
    console.log("Data from API:", data);
  } catch (error) {
    console.error(error);
  }
}

fetchDataUsingAsyncAwait(apiEndpoint);
