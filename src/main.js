const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const app = document.querySelector("#app");

function startClock() {
  const clockEl = document.querySelector("#clock");
  if (!clockEl) return;

  setInterval(() => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    clockEl.innerHTML = `<span>${time}</span> | <span>${date}</span>`;
  }, 1000);
}

function buildMedia(data) {
  if (data.media_type === "image") {
    return `<img src="${data.url}" alt="${data.title}" />`;
  }
  if (data.url.includes("youtube")) {
    return `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
  }
  return `<video src="${data.url}" controls></video>`;
}

async function loadAPOD() {
  app.innerHTML = `
    <div id="clock">LOADING TIME...</div>
    <p>FETCHING SPACE DATA...</p>
  `;
  startClock();

  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
    const data = await res.json();

    const media = buildMedia(data);
    const hdButton = data.hdurl
      ? `<a href="${data.hdurl}" target="_blank" class="hd-btn">🚀 VIEW FULL HD IMAGE</a>`
      : "";

    app.innerHTML = `
      <div id="clock"></div>
      <h1>${data.title}</h1>
      ${media}
      ${hdButton}
      <p>${data.explanation}</p>
    `;
  } catch (err) {
    app.innerHTML = `
      <div id="clock"></div>
      <p>Error: ${err.message}</p>
    `;
  }

  startClock();
}

loadAPOD();