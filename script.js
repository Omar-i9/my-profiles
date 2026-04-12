document.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("toast");

  const musicFab = document.getElementById("musicFab");
  const musicSheet = document.getElementById("musicSheet");
  const overlay = document.getElementById("overlay");
  const closeMusicBtn = document.getElementById("closeMusicBtn");

  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("playBtn");
  const playIcon = document.getElementById("playIcon");
  const progressBar = document.getElementById("progressBar");
  const seekBar = document.getElementById("seekBar");
  const seekWrap = document.getElementById("seekWrap");
  const seekTooltip = document.getElementById("seekTooltip");
  const currentTimeEl = document.getElementById("currentTime");
  const totalTimeEl = document.getElementById("totalTime");

  const volumeBar = document.getElementById("volumeBar");
  const volumeIcon = document.getElementById("volumeIcon");
  const volumeIconBtn = document.getElementById("volumeIconBtn");
  const volumeValue = document.getElementById("volumeValue");

  const songTitle = document.getElementById("songTitle");
  const songArtist = document.getElementById("songArtist");
  const musicCover = document.getElementById("musicCover");

  const prevSongBtn = document.getElementById("prevSongBtn");
  const nextSongBtn = document.getElementById("nextSongBtn");

  const playlistEl = document.getElementById("playlist");
  const playlistCount = document.getElementById("playlistCount");
  const audioState = document.getElementById("audioState");

  const copyButtons = document.querySelectorAll("[data-copy]");

  const ayahFloat = document.getElementById("ayahFloat");
  const ayahNum = document.getElementById("ayahNum");
  const ayahText = document.getElementById("ayahText");
  const ayahRef = document.getElementById("ayahRef");
  const ayahNote = document.getElementById("ayahNote");
  const ayahDetail = document.getElementById("ayahDetail");

  const songs = [
    { base: "wildflower", title: "wildflower", coverExt: "png" },
    { base: "arctic-505", title: "Arctic Monkeys 505" },
    { base: "athr-dhelak", title: "Mohamed Alflahi – Athr Dhelak" },
    { base: "babydoll", title: "Dominic Fike - Babydoll" },
    { base: "death-bed", title: "Powfu - death bed (coffee for your head)" },
    { base: "hotel-uglyy", title: "Hotel Ugly - Shut Up My Moms Calling" },
    { base: "manu-chao", title: "Manu Chao - Me Gustas Tu" },
    { base: "no-one-noticed", title: "The Marías - No One Noticed - Minimal Sounds" },
    { base: "tv-girl", title: "TV Girl - Cigarettes out the Window" },
    { base: "درب المهالك", title: "درب المهالك" },
    { base: "كلاش - نصيحة مشفق", title: "كلاش - نصيحة مشفق" }
  ].map((song, index) => ({
    ...song,
    index,
    src: `./audio/${encodeURIComponent(song.base)}.mp3`,
    cover: `./images/${encodeURIComponent(song.base)}.${song.coverExt || "jpg"}`,
    fileLabel: `${song.base}.mp3`
  }));

  const ayahs = [
    {
      num: 1,
      text: "﴿لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ﴾",
      ref: "[الزمر: 53]",
      note: "عن عدم اليأس.",
      detail: "هذه الآية تفتح باب الرجاء مهما كان الذنب أو الثقل أو الضعف. معناها أن رحمة الله أوسع من الحالة التي يمر بها الإنسان، وأن الانكسار ليس نهاية الطريق."
    },
    {
      num: 2,
      text: "﴿قُلْ إِن كُنتُمْ تُحِبُّونَ اللَّهَ فَاتَّبِعُونِي يُحْبِبْكُمُ اللَّهُ﴾",
      ref: "[آل عمران: 31]",
      note: "المحبة لها أثر وسلوك.",
      detail: "المعنى هنا أن الحب الصادق لا يبقى مجرد كلام، بل يظهر في الاتباع والعمل. الآية تربط بين الشعور الداخلي والسلوك الظاهر، وتبين أن المحبة الحقيقية لها علامة واضحة."
    },
    {
      num: 3,
      text: "﴿إِنَّمَا أَشْكُو بَثِّي وَحُزْنِي إِلَى اللَّهِ﴾",
      ref: "[يوسف: 86]",
      note: "للشكوى الصامتة.",
      detail: "هذه من أقرب الآيات لمن يحمل همًا داخليًا لا يشرحه للناس. فيها صدق وهدوء، وتصور أن القلب حين يضيق يجد مخرجًا في البوح إلى الله وحده."
    },
    {
      num: 4,
      text: "﴿وَهُوَ الَّذِي يَقْبَلُ التَّوْبَةَ عَنْ عِبَادِهِ﴾",
      ref: "[الشورى: 25]",
      note: "الأمل بعد الخطأ.",
      detail: "الآية تؤكد أن الرجوع ليس خسارة، بل بداية. الباب مفتوح، والرحمة سابقة، والإنسان لا يُغلق عليه الماضي إذا صدق في الرجوع."
    },
    {
      num: 5,
      text: "﴿وَيَعْلَمُ مَا فِي الصُّدُورِ﴾",
      ref: "[آل عمران: 119]",
      note: "ما في القلب معلوم.",
      detail: "هذا المعنى يخفف ثقل الكتمان؛ لأن ما لا يُقال لا يضيع، وما في الصدر معلوم عند الله قبل أن يُنطق به."
    },
    {
      num: 6,
      text: "﴿يَعْلَمُ خَائِنَةَ الْأَعْيُنِ وَمَا تُخْفِي الصُّدُورُ﴾",
      ref: "[غافر: 19]",
      note: "حتى الخاطر الصغير.",
      detail: "الآية دقيقة جدًا في تصوير علم الله. حتى النظرة العابرة، وحتى ما يُخفى في الداخل، ليس خارجًا عن العلم والإحاطة."
    },
    {
      num: 7,
      text: "﴿وَابْيَضَّتْ عَيْنَاهُ مِنَ الْحُزْنِ﴾",
      ref: "[يوسف: 84]",
      note: "شوق وافتقاد.",
      detail: "فيها وصف مؤلم لكن عميق للحزن الطويل. ليست مجرد دمعة عابرة، بل صورة لوجع ممتد يترك أثره في الجسد والروح."
    },
    {
      num: 8,
      text: "﴿إِنِّي لَأَجِدُ رِيحَ يُوسُفَ﴾",
      ref: "[يوسف: 94]",
      note: "إحساس قريب من الحنين.",
      detail: "الآية تلمّح إلى شوقٍ شديد يسبق الرؤية. كأن القلب يلتقط الأثر قبل العين، وهذا من أجمل صور الحنين في القرآن."
    },
    {
      num: 9,
      text: "﴿وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ﴾",
      ref: "[ق: 16]",
      note: "قرب وأمان.",
      detail: "المعنى هنا عظيم: القرب الإلهي ليس معنويًا فقط، بل إحاطة وعلم ورحمة، وهذا يبعث الطمأنينة في أضعف اللحظات."
    },
    {
      num: 10,
      text: "﴿إِنَّ رَبِّي قَرِيبٌ مُّجِيبٌ﴾",
      ref: "[هود: 61]",
      note: "قرب يطمئن.",
      detail: "هذه الجملة القصيرة تحمل معنى واسعًا جدًا: لا بعد مع الدعاء، ولا ضياع مع النداء، ولا خيبة مع صدق الطلب."
    },
    {
      num: 11,
      text: "﴿رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي﴾",
      ref: "[القصص: 16]",
      note: "ندم وتوبة.",
      detail: "فيها اعتراف صادق، ومن الاعتراف يبدأ التطهر. الآية قصيرة لكن فيها معنى التواضع والرجوع الكامل."
    },
    {
      num: 12,
      text: "﴿ثُمَّ تَابَ عَلَيْهِمْ لِيَتُوبُوا﴾",
      ref: "[التوبة: 118]",
      note: "التوفيق قبل القرار.",
      detail: "من أعمق المعاني: أن التوبة نفسها توفيق من الله. أي أن الرجوع ليس مجرد قوة شخصية، بل رحمة وإعانة قبل كل شيء."
    },
    {
      num: 13,
      text: "﴿سَيَجْعَلُ لَهُمُ الرَّحْمَٰنُ وُدًّا﴾",
      ref: "[مريم: 96]",
      note: "مودة من الله.",
      detail: "المعنى أن المحبة قد تُوضع في القلوب بلا سبب ظاهر، وأن القبول الحقيقي من الله، لا من المظاهر."
    },
    {
      num: 14,
      text: "﴿وَأَلْقَيْتُ عَلَيْكَ مَحَبَّةً مِّنِّي﴾",
      ref: "[طه: 39]",
      note: "حب يزرعه الله.",
      detail: "هذه الآية لطيفة جدًا في معناها؛ لأن المحبة هنا ليست مكتسبة بالظاهر، بل موهوبة ومُلقاة من عند الله."
    },
    {
      num: 15,
      text: "﴿فَصَبْرٌ جَمِيلٌ﴾",
      ref: "[يوسف: 18]",
      note: "صبر هادئ.",
      detail: "الصبر الجميل هو الصبر الذي لا ينهار صاحبه فيه ولا يجزع، بل يحتمل الألم دون شكوى للناس."
    },
    {
      num: 16,
      text: "﴿وَلَا تَهِنُوا وَلَا تَحْزَنُوا﴾",
      ref: "[آل عمران: 139]",
      note: "رفع للهمّة.",
      detail: "هذه الآية تأتي كرفع مباشر للروح، وتمنح القلب دفعة من الثبات بعد الضعف."
    }
  ];

  let currentSongIndex = 0;
  let isSeeking = false;
  let hideTooltipTimer = null;
  let toastTimer = null;

  let ayahDelay = 7000;
  let ayahTimer = null;
  let ayahExpanded = false;
  let ayahOrder = [];
  let ayahCursor = 0;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1400);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("تم النسخ");
    } catch {
      const temp = document.createElement("textarea");
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      temp.remove();
      showToast("تم النسخ");
    }
  }

  function openMusic() {
    musicSheet.classList.add("open");
    overlay.classList.add("open");
  }

  function closeMusic() {
    musicSheet.classList.remove("open");
    overlay.classList.remove("open");
  }

  function setPlayIcon(isPlaying) {
    playIcon.className = `fa-solid ${isPlaying ? "fa-pause" : "fa-play"}`;
  }

  function updatePulse(isPlaying) {
    musicFab.style.animation = isPlaying ? "pulse 1s infinite" : "none";
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function updateVolumeTheme(value) {
    const pct = Math.max(0, Math.min(100, value));
    const hue = Math.round((pct / 100) * 140);
    const color = `hsl(${hue} 92% 56%)`;
    document.documentElement.style.setProperty("--volume-color", color);
    volumeBar.style.background = `linear-gradient(90deg, ${color} 0%, ${color} ${pct}%, rgba(255,255,255,.08) ${pct}%, rgba(255,255,255,.08) 100%)`;
    volumeValue.textContent = `${pct}%`;

    if (pct === 0) {
      volumeIcon.className = "fa-solid fa-volume-xmark";
    } else if (pct < 35) {
      volumeIcon.className = "fa-solid fa-volume-low";
    } else {
      volumeIcon.className = "fa-solid fa-volume-high";
    }
  }

  function updateProgress() {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${pct}%`;
    if (!isSeeking) seekBar.value = pct;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    totalTimeEl.textContent = formatTime(audio.duration);
  }

  function updateSeekTooltipFromValue(value) {
    if (!audio.duration) return;
    const ratio = Math.max(0, Math.min(100, Number(value))) / 100;
    const time = ratio * audio.duration;
    seekTooltip.textContent = formatTime(time);

    const rect = seekWrap.getBoundingClientRect();
    const x = rect.width * ratio;
    seekTooltip.style.left = `${x}px`;
  }

  function showSeekTooltip() {
    seekTooltip.classList.add("show");
    clearTimeout(hideTooltipTimer);
  }

  function hideSeekTooltipSoon() {
    clearTimeout(hideTooltipTimer);
    hideTooltipTimer = setTimeout(() => {
      if (!isSeeking) seekTooltip.classList.remove("show");
    }, 220);
  }

  function setActiveTrack() {
    document.querySelectorAll(".track").forEach((track, i) => {
      track.classList.toggle("active", i === currentSongIndex);
    });
  }

  function loadSong(index, autoplay = false) {
    if (!songs.length) return;
    currentSongIndex = (index + songs.length) % songs.length;
    const song = songs[currentSongIndex];

    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.fileLabel;
    musicCover.src = song.cover;
    audio.load();

    setActiveTrack();
    audioState.textContent = `جاري تحميل: ${song.title}`;

    if (autoplay) {
      audio.play().catch(() => {
        showToast("المتصفح منع التشغيل التلقائي");
      });
    }
  }

  function playSong(index) {
    loadSong(index, true);
  }

  function nextSong() {
    loadSong(currentSongIndex + 1, true);
  }

  function prevSong() {
    loadSong(currentSongIndex - 1, true);
  }

  function togglePlay() {
    if (audio.paused) {
      audio.play().catch(() => showToast("المتصفح منع التشغيل"));
    } else {
      audio.pause();
    }
  }

  function buildPlaylist() {
    playlistCount.textContent = `${songs.length} أغنية`;

    playlistEl.innerHTML = songs.map((song, index) => `
      <div class="track${index === currentSongIndex ? " active" : ""}" data-index="${index}" tabindex="0" role="button" aria-label="تشغيل ${song.title}">
        <img class="track-cover" src="${song.cover}" alt="غلاف ${song.title}">
        <div class="track-meta">
          <strong>${song.title}</strong>
          <span>${song.fileLabel}</span>
        </div>
        <i class="fa-solid fa-play"></i>
      </div>
    `).join("");

    playlistEl.querySelectorAll(".track").forEach(track => {
      const index = Number(track.dataset.index);

      track.addEventListener("click", () => playSong(index));
      track.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          playSong(index);
        }
      });
    });
  }

  function renderAyahFromOrder(orderIndex) {
    const ayah = ayahs[ayahOrder[orderIndex]];
    if (!ayah || !ayahFloat) return;

    ayahFloat.classList.add("swap");
    setTimeout(() => {
      ayahNum.textContent = String(ayah.num);
      ayahText.textContent = ayah.text;
      ayahRef.textContent = ayah.ref;
      ayahNote.textContent = ayah.note;
      ayahDetail.textContent = ayah.detail;
      ayahFloat.classList.remove("swap");
    }, 160);
  }

  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function startNewAyahCycle() {
    ayahOrder = shuffleArray([...Array(ayahs.length).keys()]);
    ayahCursor = 0;
    renderAyahFromOrder(ayahCursor);
  }

  function restartRotation() {
    clearInterval(ayahTimer);
    ayahTimer = setInterval(() => {
      ayahCursor += 1;
      if (ayahCursor >= ayahOrder.length) {
        startNewAyahCycle();
        return;
      }
      renderAyahFromOrder(ayahCursor);
    }, ayahDelay);
  }

  function setAyahExpanded(nextState) {
    ayahExpanded = nextState;
    ayahFloat.classList.toggle("expanded", ayahExpanded);
    ayahDelay = ayahExpanded ? 13000 : 7000;
    restartRotation();
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function moveAyahTo(x, y) {
    const rect = ayahFloat.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width - 8;
    const maxY = window.innerHeight - rect.height - 8;

    ayahFloat.style.left = `${clamp(x, 8, maxX)}px`;
    ayahFloat.style.top = `${clamp(y, 8, maxY)}px`;
  }

  if (ayahFloat && ayahNum && ayahText && ayahRef && ayahNote && ayahDetail) {
    let dragState = {
      active: false,
      started: false,
      offsetX: 0,
      offsetY: 0,
      startX: 0,
      startY: 0
    };

    ayahFloat.addEventListener("pointerdown", (e) => {
      ayahFloat.setPointerCapture(e.pointerId);
      const rect = ayahFloat.getBoundingClientRect();

      dragState.active = true;
      dragState.started = false;
      dragState.offsetX = e.clientX - rect.left;
      dragState.offsetY = e.clientY - rect.top;
      dragState.startX = e.clientX;
      dragState.startY = e.clientY;
    });

    ayahFloat.addEventListener("pointermove", (e) => {
      if (!dragState.active) return;

      const dx = Math.abs(e.clientX - dragState.startX);
      const dy = Math.abs(e.clientY - dragState.startY);

      if (dx > 5 || dy > 5) {
        dragState.started = true;
        setAyahExpanded(false);
        moveAyahTo(e.clientX - dragState.offsetX, e.clientY - dragState.offsetY);
      }
    });

    ayahFloat.addEventListener("pointerup", () => {
      if (dragState.active && !dragState.started) {
        setAyahExpanded(!ayahExpanded);
      }
      dragState.active = false;
      dragState.started = false;
    });

    ayahFloat.addEventListener("pointercancel", () => {
      dragState.active = false;
      dragState.started = false;
    });

    startNewAyahCycle();
    restartRotation();
  }

  audio.volume = Number(volumeBar.value) / 100;
  updateVolumeTheme(Number(volumeBar.value));
  buildPlaylist();
  loadSong(0, false);
  setPlayIcon(false);
  updatePulse(false);
  totalTimeEl.textContent = "0:00";
  currentTimeEl.textContent = "0:00";

  musicFab.addEventListener("click", openMusic);
  closeMusicBtn.addEventListener("click", closeMusic);
  overlay.addEventListener("click", closeMusic);
  playBtn.addEventListener("click", togglePlay);
  prevSongBtn.addEventListener("click", prevSong);
  nextSongBtn.addEventListener("click", nextSong);

  volumeBar.addEventListener("input", () => {
    const value = Number(volumeBar.value);
    audio.volume = value / 100;
    updateVolumeTheme(value);
  });

  volumeIconBtn.addEventListener("click", () => {
    if (audio.volume > 0) {
      audio.dataset.lastVolume = String(Math.round(audio.volume * 100));
      audio.volume = 0;
      volumeBar.value = 0;
      updateVolumeTheme(0);
    } else {
      const restore = Number(audio.dataset.lastVolume || 80);
      audio.volume = restore / 100;
      volumeBar.value = restore;
      updateVolumeTheme(restore);
    }
  });

  audio.addEventListener("play", () => {
    setPlayIcon(true);
    updatePulse(true);
    audioState.textContent = `يشتغل الآن: ${songs[currentSongIndex].title}`;
  });

  audio.addEventListener("pause", () => {
    setPlayIcon(false);
    updatePulse(false);
    audioState.textContent = `متوقف: ${songs[currentSongIndex].title}`;
  });

  audio.addEventListener("ended", () => {
    nextSong();
  });

  audio.addEventListener("timeupdate", () => {
    if (!isSeeking) updateProgress();
  });

  audio.addEventListener("loadedmetadata", () => {
    totalTimeEl.textContent = formatTime(audio.duration);
    currentTimeEl.textContent = formatTime(audio.currentTime);
    updateProgress();
    audioState.textContent = `جاهزة: ${songs[currentSongIndex].title}`;
  });

  seekBar.addEventListener("pointerdown", () => {
    isSeeking = true;
    showSeekTooltip();
  });

  seekBar.addEventListener("pointerup", () => {
    isSeeking = false;
    hideSeekTooltipSoon();
  });

  seekBar.addEventListener("pointercancel", () => {
    isSeeking = false;
    hideSeekTooltipSoon();
  });

  seekBar.addEventListener("input", () => {
    if (!audio.duration) return;
    const value = Number(seekBar.value);
    const time = (value / 100) * audio.duration;
    audio.currentTime = time;
    progressBar.style.width = `${value}%`;
    currentTimeEl.textContent = formatTime(time);
    updateSeekTooltipFromValue(value);
    showSeekTooltip();
  });

  seekBar.addEventListener("mousemove", (e) => {
    if (!audio.duration) return;
    const rect = seekBar.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    updateSeekTooltipFromValue(pct);
    showSeekTooltip();
  });

  seekBar.addEventListener("touchstart", () => {
    if (!audio.duration) return;
    showSeekTooltip();
  }, { passive: true });

  seekBar.addEventListener("touchmove", () => {
    if (!audio.duration) return;
    showSeekTooltip();
  }, { passive: true });

  seekBar.addEventListener("mouseleave", hideSeekTooltipSoon);
  seekBar.addEventListener("touchend", hideSeekTooltipSoon);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMusic();
    if (e.key === "ArrowRight") prevSong();
    if (e.key === "ArrowLeft") nextSong();
    if (e.key === " " && document.activeElement !== seekBar) {
      e.preventDefault();
      togglePlay();
    }
  });

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => copyText(btn.dataset.copy));
  });

  seekWrap.addEventListener("mousemove", (e) => {
    if (!audio.duration) return;
    const rect = seekWrap.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    updateSeekTooltipFromValue(pct);
  });

  seekWrap.addEventListener("touchstart", () => {
    if (!audio.duration) return;
    showSeekTooltip();
  }, { passive: true });

  seekWrap.addEventListener("touchend", hideSeekTooltipSoon);

  buildPlaylist();
});
