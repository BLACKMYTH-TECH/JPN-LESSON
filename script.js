const videos = document.querySelectorAll("video");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      const wrapper = video.parentElement;
      const controls = wrapper.querySelector(".controls");
      const playBtn = controls.querySelector(".play-btn");
      const muteBtn = controls.querySelector(".mute-btn");

      if (entry.isIntersecting) {
        video.muted = false;
        video.play().catch(() => {});
        playBtn.textContent = "⏸";
        muteBtn.textContent = video.muted ? "🔇" : "🔊";
      } else {
        video.pause();
      }

      playBtn.onclick = () => {
        if (video.paused) {
          video.play();
          playBtn.textContent = "⏸";
        } else {
          video.pause();
          playBtn.textContent = "▶️";
        }
      };

      muteBtn.onclick = () => {
        video.muted = !video.muted;
        muteBtn.textContent = video.muted ? "🔇" : "🔊";
      };
    });
  },
  {
    threshold: 0.6,
  }
);

videos.forEach((video) => {
  video.muted = false;
  observer.observe(video);
});
