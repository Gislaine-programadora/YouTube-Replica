let player;

// Inicializa o player principal
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "500",
    width: "100%",
    videoId: "",
    playerVars: {
      autoplay: 0,
      controls: 1
    },
    events: {
      onReady: () => console.log("Player pronto!")
    }
  });
}

// Busca vídeos no backend (Vercel)
async function searchVideos() {
  const query = document.getElementById("search-input").value;

  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();

  renderVideos(data.items);
}

// Renderiza os resultados
function renderVideos(items) {
  const grid = document.getElementById("videos-grid");
  grid.innerHTML = "";

  items.forEach(video => {
    const videoId = video.id.videoId;
    const snippet = video.snippet;

    const videoItem = document.createElement("div");
    videoItem.className =
      "bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition";

    videoItem.innerHTML = `
      <img src="${snippet.thumbnails.medium.url}" alt="${snippet.title}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="font-semibold text-lg">${snippet.title}</h3>
        <p class="text-sm text-gray-600">${snippet.channelTitle}</p>
      </div>
    `;

    videoItem.addEventListener("click", () => playVideo(videoId, snippet));
    grid.appendChild(videoItem);
  });
}

// Toca o vídeo selecionado
function playVideo(videoId, snippet) {
  player.loadVideoById(videoId, 0, "hd720");
  document.getElementById("video-title").textContent = snippet.title;
  document.getElementById("video-info").textContent = snippet.channelTitle;
}

