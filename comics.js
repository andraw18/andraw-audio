const chapters = [
  {
    series: 'Cosmic Voyager',
    title: 'Глава 1',
    note: 'Начало путешествия',
    release: 'https://band.link/cosmicvoyager',
    audio: 'https://raw.githubusercontent.com/andraw18/andraw-audio/main/remix.mp3',
    pages: [
      'https://static.tildacdn.com/tild3230-3930-4430-b463-323365656338/ChatGPT_Image_23__20.jpg',
      'https://static.tildacdn.com/tild6435-3536-4361-a365-333263323031/ChatGPT_Image_23__20.png',
      'https://static.tildacdn.com/tild6462-3634-4566-b361-656566373961/photo.png',
      'https://static.tildacdn.com/tild6137-3264-4162-a238-353265616163/ChatGPT_Image_23__20.png',
      'https://static.tildacdn.com/tild3861-6430-4566-b835-353265363832/photo.jpg',
      'https://static.tildacdn.com/tild6234-3939-4464-a332-363664643530/ChatGPT_Image_23__20.png',
      'https://static.tildacdn.com/tild3062-6330-4434-a438-336531656362/Group_60.jpg',
      'https://static.tildacdn.com/tild3936-3933-4566-a561-613935326538/photo.jpg',
      'https://static.tildacdn.com/tild6261-3366-4130-b066-396163636537/_23__2025__05_50_13_.jpg',
      'https://static.tildacdn.com/tild3639-6233-4535-a564-616137666663/photo.jpg',
    ],
  },
  {
    series: 'Cosmic Voyager',
    title: 'Глава 2',
    note: 'Продолжение',
    release: 'https://band.link/cosmicvoyager',
    audio: 'https://raw.githubusercontent.com/andraw18/andraw-audio/main/remix.mp3',
    pages: [
      'https://static.tildacdn.com/tild3063-3536-4533-a135-626437616435/ChatGPT_Image_8__202.png',
      'https://static.tildacdn.com/tild3732-3634-4631-b434-316531653632/ChatGPT_Image_8__202.png',
      'https://static.tildacdn.com/tild6338-3263-4864-b031-623033356263/Group_2131328716.jpg',
      'https://static.tildacdn.com/tild6562-6330-4438-b361-373833353431/Group_2131328717.jpg',
      'https://static.tildacdn.com/tild3363-3362-4263-a161-376364363133/Group_213132871x8.jpg',
      'https://static.tildacdn.com/tild6336-3333-4139-a538-373632316163/ChatGPT_Image_8__202.png',
      'https://static.tildacdn.com/tild3837-6132-4362-b865-636339393363/Group_21c31328720.jpg',
      'https://static.tildacdn.com/tild6430-3063-4164-b134-626232303735/Keep_the_entire_uplo.jpg',
      'https://static.tildacdn.com/tild3063-3861-4366-b538-656233646466/Replace_only_the_mas.jpg',
      'https://static.tildacdn.com/tild6166-6436-4461-b063-396139356630/Group_2131328715.jpg',
      'https://static.tildacdn.com/tild6634-6332-4563-b439-666162393939/Group_2131328722.jpg',
      'https://static.tildacdn.com/tild3635-3435-4730-a663-656430623362/Group_2131d328725.jpg',
    ],
  },
  {
    series: 'Shanti',
    title: 'Пререлиз',
    note: 'Глава 3',
    release: 'https://band.link/bTvEs',
    audio: 'https://raw.githubusercontent.com/andraw18/andraw-audio/main/ANDRAWSHANT.mp3',
    pages: [
      'https://static.tildacdn.com/tild3037-3139-4337-b562-363138663961/ChatGPT_Imwd23__2025.jpg',
      'https://static.tildacdn.com/tild3134-3438-4733-b136-393032323537/ChatGPT_Image_23__20.png',
      'https://static.tildacdn.com/tild6430-6333-4436-b439-666637326436/Cha5__21_11_20_1_1.jpg',
      'https://static.tildacdn.com/tild3733-6663-4662-b434-663536373632/2.jpg',
      'https://static.tildacdn.com/tild6265-6662-4764-b162-383261633664/Goup_64.jpg',
      'https://static.tildacdn.com/tild3735-3161-4934-b135-626462633838/5.jpg',
      'https://static.tildacdn.com/tild6133-3063-4137-b731-366435633133/r43.jpg',
    ],
  },
  {
    series: 'Shanti',
    title: 'Продолжение',
    note: 'Глава 4',
    release: 'https://band.link/bTvEs',
    audio: 'https://raw.githubusercontent.com/andraw18/andraw-audio/main/ANDRAWSHANT.mp3',
    pages: [
      'https://static.tildacdn.com/tild3065-6361-4632-b962-623338313062/adf.jpg',
      'https://static.tildacdn.com/tild3366-6464-4466-b932-386433343734/ChatGPT_Image_24__20.png',
      'https://static.tildacdn.com/tild3965-3339-4034-b538-356264333033/ChatGPT_Image_24__20.png',
      'https://static.tildacdn.com/tild6361-3963-4631-a238-623663363137/Hamara_soitto_tahtit.png',
      'https://static.tildacdn.com/tild3065-6464-4734-a437-653536336531/ChatGPT_Image_24__20.png',
      'https://static.tildacdn.com/tild6433-3066-4630-a434-353732636439/Grd24p_70.jpg',
      'https://static.tildacdn.com/tild3730-6431-4866-b462-653762323366/Vesitanssin_alla_kir.png',
      'https://static.tildacdn.com/tild3266-6436-4930-b564-343338653564/Group_1470.jpg',
      'https://static.tildacdn.com/tild6135-3839-4233-b264-623234343730/Group_1474.jpg',
    ],
  },
];

const tabs = document.querySelector('[data-chapter-tabs]');
const stream = document.querySelector('[data-page-stream]');
const audio = document.querySelector('[data-comic-audio]');
const soundButton = document.querySelector('[data-sound-button]');
const lightbox = document.querySelector('[data-lightbox]');
const lightboxImage = document.querySelector('[data-lightbox-image]');
let currentChapter = 0;
let currentPage = 0;

chapters.forEach((chapter, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'chapter-tab';
  button.innerHTML = `<small>${String(index + 1).padStart(2, '0')}</small><strong>${chapter.series}<br>${chapter.title}</strong><span>${chapter.pages.length} страниц →</span>`;
  button.addEventListener('click', () => selectChapter(index, true));
  tabs.append(button);
});

const updateAudioButton = () => {
  const playing = !audio.paused;
  soundButton.classList.toggle('playing', playing);
  soundButton.querySelector('span').textContent = playing ? 'пауза' : 'саундтрек';
  soundButton.setAttribute('aria-label', playing ? 'Поставить саундтрек на паузу' : 'Включить саундтрек');
};

const selectChapter = (index, shouldScroll = false) => {
  currentChapter = (index + chapters.length) % chapters.length;
  const chapter = chapters[currentChapter];
  audio.pause();
  audio.src = chapter.audio;
  updateAudioButton();

  document.querySelector('[data-reader-number]').textContent = `${String(currentChapter + 1).padStart(2, '0')} / ${String(chapters.length).padStart(2, '0')}`;
  document.querySelector('[data-reader-series]').textContent = chapter.series;
  document.querySelector('[data-reader-title]').textContent = chapter.title;
  document.querySelector('[data-pagination-title]').textContent = `${chapter.series} · ${chapter.title}`;
  document.querySelector('[data-release-link]').href = chapter.release;
  [...tabs.children].forEach((tab, tabIndex) => tab.classList.toggle('active', tabIndex === currentChapter));

  stream.replaceChildren();
  chapter.pages.forEach((source, pageIndex) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'comic-page';
    button.innerHTML = `<img src="${source}" alt="${chapter.series}, ${chapter.title}, страница ${pageIndex + 1}" loading="lazy" decoding="async"><span>page ${String(pageIndex + 1).padStart(2, '0')}</span>`;
    button.addEventListener('click', () => openLightbox(pageIndex));
    stream.append(button);
  });

  if (shouldScroll) document.querySelector('#reader').scrollIntoView({ behavior: 'smooth', block: 'start' });
};

soundButton.addEventListener('click', async () => {
  if (audio.paused) {
    try { await audio.play(); } catch (error) { console.warn('Soundtrack playback could not start.', error); }
  } else {
    audio.pause();
  }
  updateAudioButton();
});
audio.addEventListener('play', updateAudioButton);
audio.addEventListener('pause', updateAudioButton);

document.querySelector('[data-previous-chapter]').addEventListener('click', () => selectChapter(currentChapter - 1, true));
document.querySelector('[data-next-chapter]').addEventListener('click', () => selectChapter(currentChapter + 1, true));

const updateLightbox = () => {
  const chapter = chapters[currentChapter];
  lightboxImage.src = chapter.pages[currentPage];
  document.querySelector('[data-lightbox-count]').textContent = `${String(currentPage + 1).padStart(2, '0')} / ${String(chapter.pages.length).padStart(2, '0')}`;
};

const openLightbox = (pageIndex) => {
  currentPage = pageIndex;
  updateLightbox();
  lightbox.showModal();
  document.body.classList.add('lightbox-open');
};

const closeLightbox = () => {
  lightbox.close();
  document.body.classList.remove('lightbox-open');
};

document.querySelector('[data-lightbox-close]').addEventListener('click', closeLightbox);
document.querySelector('[data-lightbox-previous]').addEventListener('click', () => {
  currentPage = (currentPage - 1 + chapters[currentChapter].pages.length) % chapters[currentChapter].pages.length;
  updateLightbox();
});
document.querySelector('[data-lightbox-next]').addEventListener('click', () => {
  currentPage = (currentPage + 1) % chapters[currentChapter].pages.length;
  updateLightbox();
});
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
lightbox.addEventListener('close', () => document.body.classList.remove('lightbox-open'));

document.addEventListener('keydown', (event) => {
  if (!lightbox.open) return;
  if (event.key === 'ArrowLeft') document.querySelector('[data-lightbox-previous]').click();
  if (event.key === 'ArrowRight') document.querySelector('[data-lightbox-next]').click();
});

const progressBar = document.querySelector('.reading-progress i');
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });

const canvas = document.querySelector('.starfield');
const context = canvas.getContext('2d');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let stars = [];
let frame = 0;

const resizeStars = () => {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  stars = Array.from({ length: Math.max(35, Math.floor(innerWidth * innerHeight / 18000)) }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    r: Math.random() * .9 + .15, a: Math.random() * .38 + .08, p: Math.random() * Math.PI * 2,
  }));
};

const drawStars = () => {
  context.clearRect(0, 0, innerWidth, innerHeight);
  stars.forEach((star) => {
    context.beginPath();
    context.fillStyle = `rgba(255,255,255,${star.a * (.72 + Math.sin(frame * .006 + star.p) * .28)})`;
    context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    context.fill();
  });
  frame += 1;
  if (!reducedMotion) requestAnimationFrame(drawStars);
};

resizeStars();
drawStars();
window.addEventListener('resize', resizeStars, { passive: true });
selectChapter(0);
