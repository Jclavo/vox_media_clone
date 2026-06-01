const audio = document.getElementById("podcast-audio");
const lyricsList = document.getElementById("lyrics-list");
let lyricsData = [];

document.body.style.overflow = 'hidden';

async function loadLyricsData(filePath) {
  const response = await fetch(filePath);
  const raw = await response.text();

  return raw
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {
      const [type, time, text, position] = line.split("|");
      const entry = { type, time: Number(time), text };
      if (position) entry.position = position;
      return entry;
    });
}

function renderLyrics() {

  let itemDiv = null;
  let itemParagraph = null;
  let actualLineType = null;
  let previousLineType = null;
  let indexSection = 0;

  for (let index = 0; index < lyricsData.length; index++) {
    const line = lyricsData[index];
    actualLineType = line.type;

    if (actualLineType == "section") {
      itemDiv = renderDiv(indexSection, line.time);
      lyricsList.appendChild(itemDiv);
      previousLineType = actualLineType;
      indexSection++
      continue;
    }

    if (actualLineType == "line") {
      itemParagraph = renderParragraph(line);
    }

    previousLineType = actualLineType;

    if (itemDiv == null || itemParagraph == null) {
      continue;
    }

    itemDiv.appendChild(itemParagraph);
  }
}

function renderDiv(index, time) {
  const itemDiv = document.createElement("div");
  itemDiv.className = "lyrics-section";
  itemDiv.id = "lyrics-section-" + index;
  itemDiv.tabIndex = index;
  itemDiv.dataset.index = String(index);
  itemDiv.style.backgroundColor = getRandomColor();
  itemDiv.setAttribute("data-sal", "fade");
  itemDiv.style.transitionDuration = "1s";

  return itemDiv;
}

function renderParragraph(line) {
  const itemParagraph = document.createElement("p");
  // Safely handle the case where 'position' may not be present
  itemParagraph.style.textAlign = line.position || "left";
  itemParagraph.setAttribute("data-sal", "fade");
  itemParagraph.style.transitionDuration = "2s";

  // Use 'start' for the display delay, fallback to 0
  itemParagraph.style.transitionDelay = (line.time || 0) * 1000 + "ms";
  itemParagraph.innerHTML = line.text;
  itemParagraph.className = "lyrics-line";
  return itemParagraph;
}

function highlightCurrentLyric() {

  if (!audio) {
    return;
  }

  const currentTime = audio.currentTime;
  let activeIndex = -1;

  const lyricsDataSections = lyricsData.filter(section => section.type === "section");

  for (let i = 0; i < lyricsDataSections.length; i += 1) {
    const currentSection = lyricsDataSections[i];
    const nextSection = lyricsDataSections[i + 1];
    const isInRange = currentTime >= currentSection.time && (!nextSection || currentTime < nextSection.time);
    const currentElement = document.getElementById("lyrics-section-" + i);

    if (isInRange) {
      currentElement.focus();
      // currentElement.style.borderStyle = 'double';
      continue;
    }
    // currentElement.style.borderStyle = 'none';
  }
}

function getRandomColor() {
  let r, g, b;
  do {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
  } while ((r * 0.299 + g * 0.587 + b * 0.114) < 128);

  return `rgb(${r}, ${g}, ${b})`;
}

// Usage
(async () => {
  lyricsData = await loadLyricsData("transcripts/episode_1.csv");
  renderLyrics();

  if (typeof sal === "function") {
    sal({
      once: false
    });
  }
})();


if (audio) {
  audio.addEventListener("timeupdate", highlightCurrentLyric);
  audio.addEventListener("seeked", highlightCurrentLyric);
  audio.addEventListener("play", highlightCurrentLyric);
}

// Listen to the wheel event across the entire document
document.addEventListener('wheel', (event) => {

  let scrollNextStepValue = null;

  if (event.deltaY > 0) {
    // scroll down
    scrollNextStepValue = 1
  } else if (event.deltaY < 0) {
    // scroll up
    scrollNextStepValue = -1
  }

  this.handleMouseScroll(scrollNextStepValue)
});

/**
 * Logic to update the slide according to Mouse Scroll direction
 */
function handleMouseScroll(scrollNextStepValue) {

  // if (!this.isAudioPlaying()) {
  //   return;
  // }

  audio.pause()

  const currentActiveElementIndex = document.activeElement.tabIndex
  let nextActiveElementIndex = currentActiveElementIndex + scrollNextStepValue

  const lyricsDataSections = lyricsData.filter(section => section.type === "section")

  if (nextActiveElementIndex < 0 || nextActiveElementIndex >= lyricsDataSections.length) {
    // console.log('no more slides to move')
    nextActiveElementIndex = currentActiveElementIndex
  }

  const focusedElementTime = lyricsDataSections[nextActiveElementIndex].time ?? 0
  document.getElementById("lyrics-section-" + nextActiveElementIndex).focus()

  audio.currentTime = focusedElementTime
  audio.play()

  // console.log('Moving to Slide #' + nextActiveElementIndex)
}

function isAudioPlaying() {
  return !audio.paused && !audio.ended && audio.currentTime > 0;
}