fetch("https://jsonplaceholder.typicode.com/todos/")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data.slice(0, 10));
  })
  .catch((error) => {
    console.error(error);
  });

//   Fetch with GET Parameters

const userId = 1;
fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

//   Post Request with JSON Data

const postData = {
  title: "foo",
  body: "bar",
  userId: 1,
};

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(postData),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

//   Fetch With Error Handling and Status Check
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((error) => {
    console.error(`Error: ${error}`);
  });

//   Fetch with Headers and Authorization
// const apiKey = "c7d22b3670943c853d36935033bd0a82";
// fetch(
//   `https://api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=1&appid=${apiKey}

// `,
//   {
//     headers: {
//       Authorization: `Bearer ${apiKey}`,
//     },
//   }
// )
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error("Error:", error));

const resultContainer = document.querySelector(".result-container");

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((posts) => {
    posts.slice(0, 1).forEach((post) => {
      const postElement = document.createElement("div");
      postElement.innerHTML = `<h2>${post.title}</h2>
            <p>${post.body}</p>`;
      resultContainer.appendChild(postElement);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const postData2 = {
  title: "food",
  body: "bar",
  userId: 2,
};

//   Add Post to the api
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify(postData2),
})
  .then((res) => res.json())
  .then((post) => {
    const postElement = document.createElement("div");
    postElement.innerHTML = `<h1>${post.title}</h1> 
        <p>${post.body}</p>`;
    resultContainer.appendChild(postElement);
  });

// Fetch With Async/Await
async function fetchData(apiUrl) {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data.slice(0, 10));
  } catch (error) {
    console.error(error);
  }
}

fetchData("https://jsonplaceholder.typicode.com/posts");

// Get longitude and latitude of user
const apiKey = "c7d22b3670943c853d36935033bd0a82";

async function getApproximateLocationName(apiEndpoint) {
  const response = await fetch(apiEndpoint);
  if (!response.ok) {
    throw new Error("HTTP Error:", response.status);
  }
  const data = await response.json();
  // Extract data needed
  const { coord, clouds, main: temperatureInfo } = data;
  const { temp, feels_like, pressure, humidity } = temperatureInfo;
  const temperatureData = document.createElement("div");
  temperatureData.innerHTML = `
    Temperature: 
  `;
  console.log(data);
}

async function reverseGeolocation(longitude, latitude) {
  const reverseGeolocationApiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`;
  const response = await fetch(reverseGeolocationApiUrl);
  if (!response.ok) {
    throw new Error("HTTP Error:", response.status);
  }
  const data = await response.json();
  const [{ name, state }] = data;
  const locationData = document.createElement("div");
  locationData.innerHTML = `
  <h1>${name}</h1>
  <h3>${state}</h3>
  `;

  resultContainer.appendChild(locationData);
  console.log(state);
}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude);
      const locationApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}appid=${apiKey}`;
      getApproximateLocationName(locationApiUrl);
      reverseGeolocation(longitude, latitude);
    },
    (error) => {
      console.error(error);
    },
    {
      enableHighAccuracy: true,
    }
  );
}
