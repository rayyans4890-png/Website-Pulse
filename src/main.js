const API_KEY = import.meta.env.VITE_NASA_API_KEY;

// Live digital clock function
function startClock() {
  const clockEl = document.querySelector("#clock");
  if (!clockEl) return;

  setInterval(() => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    const dateStr = now.toLocaleDateString(undefined, { 
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' 
    });
    clockEl.innerHTML = `<span>${timeStr}</span> | <span>${dateStr}</span>`;
  }, 1000);
}

// 1. Initial loading state with clock
document.querySelector("#app").innerHTML = `
  <div id="clock">LOADING TIME...</div>
  <p>FETCHING SPACE DATA...</p>
`;
startClock();

// 2. Fetch NASA APOD data
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    let media;

    if (data.media_type === "image") {
      media = `<img src="${data.url}" alt="${data.title}" />`;
    } else if (data.url.includes("youtube")) {
      media = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
    } else {
      media = `<video src="${data.url}" controls></video>`;
    }

    // Optional HD button if NASA provides hdurl
    const hdButton = data.hdurl 
      ? `<a href="${data.hdurl}" target="_blank" class="hd-btn">🚀 VIEW FULL HD IMAGE</a>` 
      : '';

    document.querySelector("#app").innerHTML = `
      <div id="clock"></div>
      <h1>${data.title}</h1>
      ${media}
      ${hdButton}
      <p>${data.explanation}</p>
    `;

    startClock();
  })
  .catch(err => {
    document.querySelector("#app").innerHTML = `
      <div id="clock"></div>
      <p>Error: ${err.message}</p>
    `;
    startClock();
  });