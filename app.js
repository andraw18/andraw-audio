const body = document.body;
const loader = document.querySelector('.loader');
const menuButton = document.querySelector('.menu-orb');
const menuPanel = document.querySelector('.menu-panel');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

const main = document.querySelector('main');
['home', 'events', 'tracks', 'videos', 'about', 'photos', 'comic'].forEach((id) => {
  const section = document.getElementById(id);
  if (main && section) main.append(section);
});

const siteHeader = document.querySelector('.site-header');
const heroSection = document.querySelector('.hero');
const headerLinks = [...document.querySelectorAll('.header-nav a[href^="#"]')];
const syncNavigation = () => {
  const marker = window.scrollY + window.innerHeight * .42;
  let currentId = '';
  headerLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section && section.offsetTop <= marker) currentId = section.id;
  });
  headerLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`));
};
const syncScrollTint = () => {
  const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.max(0, Math.min(1, window.scrollY / scrollRange));
  const eased = progress * progress * (3 - 2 * progress);
  const ambientProgress = Math.max(0, Math.min(1, (window.scrollY - window.innerHeight * .25) / (window.innerHeight * .85)));
  const ambientEased = ambientProgress * ambientProgress * (3 - 2 * ambientProgress);
  document.documentElement.style.setProperty('--scroll-tint', String(eased * .92));
  document.documentElement.style.setProperty('--ambient-opacity', String(ambientEased * .9));
};
const syncHeader = () => {
  const threshold = Math.max(120, (heroSection?.offsetHeight || window.innerHeight) - 180);
  siteHeader?.classList.toggle('visible', window.scrollY >= threshold);
};

syncHeader();
syncScrollTint();
syncNavigation();
window.addEventListener('scroll', syncHeader, { passive: true });
window.addEventListener('scroll', syncScrollTint, { passive: true });
window.addEventListener('scroll', syncNavigation, { passive: true });
window.addEventListener('resize', syncHeader, { passive: true });
window.addEventListener('resize', syncScrollTint, { passive: true });
window.addEventListener('resize', syncNavigation, { passive: true });

const hideLoader = () => loader?.classList.add('hidden');
window.addEventListener('load', () => window.setTimeout(hideLoader, 350), { once: true });
window.setTimeout(hideLoader, 1400);

menuButton?.addEventListener('click', () => {
  const isOpen = body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
});

menuPanel?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Открыть меню');
  });
});

const alignHashTarget = () => {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  target?.scrollIntoView({ block: 'start', behavior: 'auto' });
};

window.addEventListener('load', () => {
  window.requestAnimationFrame(() => window.requestAnimationFrame(alignHashTarget));
  window.setTimeout(alignHashTarget, 300);
}, { once: true });
window.addEventListener('pageshow', () => window.setTimeout(alignHashTarget, 0));
window.addEventListener('hashchange', () => window.requestAnimationFrame(alignHashTarget));

const revealItems = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const audio = document.querySelector('#track-audio');
const trackTabs = [...document.querySelectorAll('[data-track-tab]')];
const trackPanels = [...document.querySelectorAll('[data-track-panel]')];
const trackListElement = document.querySelector('.tracklist');
const yandexPopularityOrder = [
  'Om (Handpan Instrumental)',
  'Om Namo Bhagavate (feat. LOVKAYA)',
  'Ecstatic',
  'Manvantara',
  'Cosmic Voyager',
  'East Sun',
  'Шанти (feat. Kate Florion)',
  'Unda Fay',
  'Metamorphose',
  'Moon',
  'Cosmic Voyager (Remix)',
  'Space Voyager',
  'Om Namo Bhagavate (Remix)',
  'Шанти (instrumental)',
  'Limen Time (Instrumental)',
  'Limen',
];

if (trackListElement) {
  const rank = new Map(yandexPopularityOrder.map((title, index) => [title, index]));
  const orderedTracks = [...trackListElement.querySelectorAll('.track')]
    .sort((a, b) => (rank.get(a.dataset.title) ?? 999) - (rank.get(b.dataset.title) ?? 999));

  orderedTracks.forEach((track, index) => {
    track.classList.toggle('track-extra', index >= 5);
    trackListElement.append(track);
  });
}

const tracks = [...document.querySelectorAll('.track')];

trackTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.trackTab;
    trackTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });
    trackPanels.forEach((panel) => {
      panel.hidden = panel.dataset.trackPanel !== target;
    });
  });
});

tracks.forEach((track) => {
  const playButton = track.querySelector('.track-play');
  if (!playButton || playButton.querySelector('.track-eq')) return;
  const glyph = document.createElement('span');
  glyph.className = 'track-glyph';
  glyph.textContent = playButton.textContent.trim() || '▶';
  const equalizer = document.createElement('span');
  equalizer.className = 'track-eq';
  equalizer.setAttribute('aria-hidden', 'true');
  equalizer.innerHTML = '<b></b><b></b><b></b><b></b>';
  playButton.replaceChildren(glyph, equalizer);
});
const player = document.querySelector('.player-stage');
const playerButton = document.querySelector('.player-toggle');
const nowTitle = document.querySelector('[data-now-title]');
const currentTime = document.querySelector('[data-current-time]');
const duration = document.querySelector('[data-duration]');
const progress = document.querySelector('[data-player-progress]');
const progressBar = progress?.querySelector('i');
const playerCover = document.querySelector('[data-player-cover]');
const shamanicAudio = document.querySelector('#shamanic-audio');
const shamanicButton = document.querySelector('.shamanic-play');
const shamanicIcon = shamanicButton?.querySelector('span');
let selectedTrack = null;

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '00:00';
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
};

const updatePlayerState = () => {
  const isPlaying = audio && !audio.paused;
  player?.classList.toggle('playing', Boolean(isPlaying));
  if (playerButton) {
    playerButton.querySelector('span').textContent = isPlaying ? 'Ⅱ' : '▶';
    playerButton.setAttribute('aria-label', isPlaying ? 'Поставить на паузу' : 'Воспроизвести выбранный трек');
  }
  tracks.forEach((track) => {
    const isActive = track === selectedTrack;
    track.classList.toggle('active', isActive);
    track.classList.toggle('playing', isActive && Boolean(isPlaying));
    const glyph = track.querySelector('.track-glyph');
    if (glyph) glyph.textContent = isActive && isPlaying ? 'Ⅱ' : '▶';
  });
};

const playSelectedTrack = async () => {
  if (!audio || !selectedTrack) return;
  shamanicAudio?.pause();
  try {
    await audio.play();
  } catch (error) {
    console.warn('Audio playback is waiting for user interaction.', error);
  }
  updatePlayerState();
};

tracks.forEach((track) => {
  track.addEventListener('click', () => {
    if (!audio) return;
    if (selectedTrack === track) {
      if (audio.paused) playSelectedTrack();
      else audio.pause();
      return;
    }

    tracks.forEach((item) => {
      const bar = item.querySelector('.track-progress i');
      if (bar) bar.style.width = '0%';
    });
    selectedTrack = track;
    audio.src = track.dataset.audio || '';
    if (nowTitle) nowTitle.textContent = track.dataset.title || 'ANDRAW';
    if (playerCover && track.dataset.cover) {
      playerCover.src = track.dataset.cover;
      playerCover.alt = `Обложка ${track.dataset.title || 'ANDRAW'}`;
    }
    if (playerButton) playerButton.disabled = false;
    if (currentTime) currentTime.textContent = '00:00';
    if (duration) duration.textContent = '00:00';
    if (progressBar) progressBar.style.width = '0%';
    playSelectedTrack();
  });
});

playerButton?.addEventListener('click', () => {
  if (!audio || !selectedTrack) return;
  if (audio.paused) playSelectedTrack();
  else audio.pause();
});

audio?.addEventListener('play', updatePlayerState);
audio?.addEventListener('pause', updatePlayerState);
audio?.addEventListener('loadedmetadata', () => {
  if (duration) duration.textContent = formatTime(audio.duration);
});
audio?.addEventListener('durationchange', () => {
  if (duration) duration.textContent = formatTime(audio.duration);
});
audio?.addEventListener('timeupdate', () => {
  const played = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  if (progressBar) progressBar.style.width = `${played}%`;
  const trackBar = selectedTrack?.querySelector('.track-progress i');
  if (trackBar) trackBar.style.width = `${played}%`;
  if (currentTime) currentTime.textContent = formatTime(audio.currentTime);
});
audio?.addEventListener('ended', () => {
  audio.currentTime = 0;
  updatePlayerState();
});

progress?.addEventListener('click', (event) => {
  if (!audio?.duration) return;
  const rect = progress.getBoundingClientRect();
  audio.currentTime = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) * audio.duration;
});

const tracksMore = document.querySelector('[data-tracks-more]');
const tracklist = document.querySelector('.tracklist');
tracksMore?.addEventListener('click', () => {
  const isExpanded = tracksMore.classList.toggle('expanded');
  tracklist?.classList.toggle('expanded', isExpanded);
  document.querySelectorAll('.track-extra').forEach((track) => track.classList.toggle('visible', isExpanded));
  const label = tracksMore.querySelector('span');
  if (label) label.textContent = isExpanded ? 'Скрыть' : 'Показать ещё';
});

const posterTrack = document.querySelector('[data-poster-track]');
const posterSlides = [...document.querySelectorAll('[data-poster-slide]')];
const posterCounter = document.querySelector('[data-poster-current]');
const posterProgress = document.querySelector('[data-poster-progress]');
let posterIndex = 0;

const updatePoster = (index, shouldScroll = true) => {
  if (!posterSlides.length) return;
  posterIndex = Math.max(0, Math.min(posterSlides.length - 1, index));
  posterSlides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === posterIndex));
  posterProgress?.style.setProperty('--poster-progress', String(posterIndex));
  if (posterCounter) posterCounter.textContent = String(posterIndex + 1).padStart(2, '0');
  if (shouldScroll) posterTrack?.scrollTo({ left: posterSlides[posterIndex].offsetLeft, behavior: reducedMotion ? 'auto' : 'smooth' });
};

document.querySelector('[data-poster-prev]')?.addEventListener('click', () => updatePoster(posterIndex - 1));
document.querySelector('[data-poster-next]')?.addEventListener('click', () => updatePoster(posterIndex + 1));
posterSlides.forEach((slide, index) => {
  const hasInteractiveContent = Boolean(slide.querySelector('a, button'));
  if (!hasInteractiveContent) {
    slide.tabIndex = 0;
    slide.setAttribute('role', 'button');
    slide.setAttribute('aria-label', `Открыть афишу ${index + 1}`);
  }
  const activate = () => updatePoster(index === posterIndex ? (posterIndex + 1) % posterSlides.length : index);
  slide.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) return;
    activate();
  });
  slide.addEventListener('keydown', (event) => {
    if (hasInteractiveContent) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    activate();
  });
});

let posterScrollFrame = 0;
posterTrack?.addEventListener('scroll', () => {
  window.cancelAnimationFrame(posterScrollFrame);
  posterScrollFrame = window.requestAnimationFrame(() => {
    const closest = posterSlides.reduce((best, slide, index) => (
      Math.abs(slide.offsetLeft - posterTrack.scrollLeft) < Math.abs(posterSlides[best].offsetLeft - posterTrack.scrollLeft) ? index : best
    ), 0);
    if (closest !== posterIndex) updatePoster(closest, false);
  });
}, { passive: true });

const photoTrack = document.querySelector('[data-photo-track]');
const photoSlides = [...document.querySelectorAll('[data-photo-slide]')];
const photoCounter = document.querySelector('[data-photo-current]');
const photoProgress = document.querySelector('[data-photo-progress]');
let photoIndex = 0;

const updatePhoto = (index, shouldScroll = true) => {
  if (!photoSlides.length) return;
  photoIndex = Math.max(0, Math.min(photoSlides.length - 1, index));
  photoSlides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === photoIndex));
  photoProgress?.style.setProperty('--photo-progress', String(photoIndex));
  if (photoCounter) photoCounter.textContent = String(photoIndex + 1).padStart(2, '0');
  if (shouldScroll) photoTrack?.scrollTo({ left: photoSlides[photoIndex].offsetLeft, behavior: reducedMotion ? 'auto' : 'smooth' });
};

document.querySelector('[data-photo-prev]')?.addEventListener('click', () => updatePhoto(photoIndex - 1));
document.querySelector('[data-photo-next]')?.addEventListener('click', () => updatePhoto(photoIndex + 1));
photoSlides.forEach((slide, index) => {
  slide.tabIndex = 0;
  slide.setAttribute('role', 'button');
  slide.setAttribute('aria-label', `Открыть фотографию ${index + 1}`);
  const activate = () => updatePhoto(index === photoIndex ? (photoIndex + 1) % photoSlides.length : index);
  slide.addEventListener('click', activate);
  slide.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    activate();
  });
});

let photoScrollFrame = 0;
photoTrack?.addEventListener('scroll', () => {
  window.cancelAnimationFrame(photoScrollFrame);
  photoScrollFrame = window.requestAnimationFrame(() => {
    const closest = photoSlides.reduce((best, slide, index) => (
      Math.abs(slide.offsetLeft - photoTrack.scrollLeft) < Math.abs(photoSlides[best].offsetLeft - photoTrack.scrollLeft) ? index : best
    ), 0);
    if (closest !== photoIndex) updatePhoto(closest, false);
  });
}, { passive: true });

const videoTrack = document.querySelector('[data-video-track]');
if (videoTrack) {
  const videoOrder = [12, 11, 3, 10, 17, 9, 13, 14, 15, 16, 8, 4, 7, 6, 5, 2, 1];
  const videoRank = new Map(videoOrder.map((number, index) => [number, index]));
  [...videoTrack.querySelectorAll('[data-video-slide]')]
    .sort((a, b) => {
      const getNumber = (slide) => Number(slide.querySelector('video')?.dataset.src.match(/live-(\d+)/)?.[1] || 0);
      return (videoRank.get(getNumber(a)) ?? 999) - (videoRank.get(getNumber(b)) ?? 999);
    })
    .forEach((slide, index) => {
    slide.classList.toggle('active', index === 0);
    videoTrack.append(slide);
    });
}
const videoSlides = [...document.querySelectorAll('[data-video-slide]')];
const videoCounter = document.querySelector('[data-video-current]');
const videoProgress = document.querySelector('[data-video-progress]');
let videoIndex = 0;

const pauseDirectVideos = (except = null) => {
  videoSlides.forEach((slide) => {
    const video = slide.querySelector('video');
    if (!video || video === except) return;
    video.pause();
    slide.querySelector('.video-media')?.classList.remove('playing');
  });
};

const showVideo = (index, shouldScroll = true) => {
  if (!videoSlides.length) return;
  videoIndex = Math.max(0, Math.min(videoSlides.length - 1, index));
  videoProgress?.style.setProperty('--video-progress', String(videoIndex));
  videoSlides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === videoIndex));
  if (videoCounter) videoCounter.textContent = String(videoIndex + 1).padStart(2, '0');
  pauseDirectVideos();
  if (shouldScroll) videoTrack?.scrollTo({ left: videoSlides[videoIndex].offsetLeft, behavior: reducedMotion ? 'auto' : 'smooth' });
};

const updateShamanicState = () => {
  const isPlaying = Boolean(shamanicAudio && !shamanicAudio.paused);
  shamanicButton?.classList.toggle('playing', isPlaying);
  if (shamanicIcon) shamanicIcon.textContent = isPlaying ? 'Ⅱ' : '▶';
  shamanicButton?.setAttribute('aria-label', isPlaying ? 'Поставить вокальную импровизацию на паузу' : 'Воспроизвести вокальную импровизацию');
};

shamanicButton?.addEventListener('click', async () => {
  if (!shamanicAudio) return;
  if (!shamanicAudio.paused) {
    shamanicAudio.pause();
    return;
  }
  audio?.pause();
  pauseDirectVideos();
  try {
    await shamanicAudio.play();
  } catch (error) {
    console.warn('Shamanic audio playback could not start.', error);
  }
  updateShamanicState();
});
shamanicAudio?.addEventListener('play', updateShamanicState);
shamanicAudio?.addEventListener('pause', updateShamanicState);
shamanicAudio?.addEventListener('ended', updateShamanicState);

document.querySelector('[data-video-prev]')?.addEventListener('click', () => showVideo(videoIndex - 1));
document.querySelector('[data-video-next]')?.addEventListener('click', () => showVideo(videoIndex + 1));

let videoScrollFrame = 0;
videoTrack?.addEventListener('scroll', () => {
  window.cancelAnimationFrame(videoScrollFrame);
  videoScrollFrame = window.requestAnimationFrame(() => {
    const closest = videoSlides.reduce((best, slide, index) => (
      Math.abs(slide.offsetLeft - videoTrack.scrollLeft) < Math.abs(videoSlides[best].offsetLeft - videoTrack.scrollLeft) ? index : best
    ), 0);
    if (closest !== videoIndex) showVideo(closest, false);
  });
}, { passive: true });

videoSlides.forEach((slide) => {
  const button = slide.querySelector('.video-play');
  const video = slide.querySelector('video');
  const media = slide.querySelector('.video-media');
  if (!button || !video || !media) return;

  button.addEventListener('click', async () => {
    if (!video.src) video.src = video.dataset.src || '';
    if (video.paused) {
      pauseDirectVideos(video);
      audio?.pause();
      shamanicAudio?.pause();
      try {
        await video.play();
        media.classList.add('playing');
        video.controls = true;
      } catch (error) {
        console.warn('Video playback could not start.', error);
      }
    } else {
      video.pause();
      media.classList.remove('playing');
    }
  });
  video.addEventListener('pause', () => media.classList.remove('playing'));
  video.addEventListener('play', () => media.classList.add('playing'));
});

const hero = document.querySelector('.hero');
const portraits = document.querySelector('.hero-portraits');
const heroLogo = document.querySelector('.hero-logo');
if (!reducedMotion && hero && portraits && heroLogo) {
  hero.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    portraits.style.transform = `translateX(-50%) translate3d(${x * 7}px, ${y * 4}px, 0)`;
    heroLogo.style.transform = `translateX(-50%) translate3d(${x * -5}px, ${y * -2}px, 0)`;
  });
  hero.addEventListener('pointerleave', () => {
    portraits.style.transform = '';
    heroLogo.style.transform = '';
  });
}

const canvas = document.querySelector('.starfield');
const context = canvas?.getContext('2d');
const ambientLight = document.querySelector('.ambient-light');
let stars = [];
let frame = 0;
const depthPointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
const pointerScreen = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
const ambientPosition = { x: 0, y: 0 };

const resizeStars = () => {
  if (!canvas || !context) return;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * pixelRatio);
  canvas.height = Math.floor(window.innerHeight * pixelRatio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  const starCount = Math.max(88, Math.floor((window.innerWidth * window.innerHeight) / 9000));
  stars = Array.from({ length: starCount }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.25 + 0.2,
    alpha: Math.random() * 0.62 + 0.18,
    speed: Math.random() * 0.006 + 0.002,
    phase: Math.random() * Math.PI * 2,
    depth: Math.random() * 0.78 + 0.22,
  }));
};

const drawStars = () => {
  if (!canvas || !context) return;
  depthPointer.x += (depthPointer.targetX - depthPointer.x) * 0.055;
  depthPointer.y += (depthPointer.targetY - depthPointer.y) * 0.055;
  ambientPosition.x += (depthPointer.targetX * 9 - ambientPosition.x) * .025;
  ambientPosition.y += (depthPointer.targetY * 7 - ambientPosition.y) * .025;
  if (ambientLight) {
    ambientLight.style.transform = `translate3d(${ambientPosition.x}vw, ${ambientPosition.y}vh, 0) rotate(${-3 + depthPointer.x * 2}deg)`;
  }
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  const projectedStars = stars.map((star) => {
    const alpha = reducedMotion ? star.alpha : star.alpha * (0.68 + Math.sin(frame * star.speed + star.phase) * 0.32);
    const driftX = Math.sin(frame * star.speed * .32 + star.phase) * star.depth * 5;
    const driftY = Math.cos(frame * star.speed * .28 + star.phase) * star.depth * 4;
    const x = (star.x + depthPointer.x * star.depth * 92 + driftX + window.innerWidth) % window.innerWidth;
    const y = (star.y + depthPointer.y * star.depth * 62 + driftY + window.scrollY * star.depth * .028 + window.innerHeight) % window.innerHeight;
    return { ...star, x, y, alpha };
  });

  projectedStars.forEach((star, index) => {
    for (let offset = 1; offset <= 3; offset += 1) {
      const other = projectedStars[index + offset];
      if (!other) break;
      const distance = Math.hypot(star.x - other.x, star.y - other.y);
      if (distance > 105) continue;
      const pointerDistance = pointerScreen.active
        ? Math.min(Math.hypot(star.x - pointerScreen.x, star.y - pointerScreen.y), 260)
        : 260;
      const pointerBoost = 1 - pointerDistance / 260;
      context.beginPath();
      context.strokeStyle = `rgba(255,255,255,${.025 + pointerBoost * .085})`;
      context.lineWidth = .45;
      context.moveTo(star.x, star.y);
      context.lineTo(other.x, other.y);
      context.stroke();
    }

    if (index % 7 === 0 && !reducedMotion) {
      context.beginPath();
      context.strokeStyle = `rgba(255,255,255,${Math.max(.025, star.alpha * .11)})`;
      context.lineWidth = .5;
      context.moveTo(star.x, star.y);
      context.lineTo(star.x - depthPointer.x * star.depth * 28, star.y - depthPointer.y * star.depth * 20);
      context.stroke();
    }
    context.beginPath();
    context.fillStyle = `rgba(255,255,255,${Math.max(0.08, star.alpha)})`;
    context.arc(star.x, star.y, star.radius * (.65 + star.depth * .65), 0, Math.PI * 2);
    context.fill();
  });
  frame += 1;
  if (!reducedMotion) window.requestAnimationFrame(drawStars);
};

if (canvas && context) {
  resizeStars();
  drawStars();
  window.addEventListener('resize', resizeStars, { passive: true });
  window.addEventListener('pointermove', (event) => {
    depthPointer.targetX = event.clientX / window.innerWidth - .5;
    depthPointer.targetY = event.clientY / window.innerHeight - .5;
    document.documentElement.style.setProperty('--mask-x', `${depthPointer.targetX * 14}px`);
    document.documentElement.style.setProperty('--mask-y', `${depthPointer.targetY * 10}px`);
    pointerScreen.x = event.clientX;
    pointerScreen.y = event.clientY;
    pointerScreen.active = true;
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => {
    depthPointer.targetX = 0;
    depthPointer.targetY = 0;
    pointerScreen.active = false;
  });
}

updatePlayerState();
const resetCarouselPositions = () => {
  posterTrack?.scrollTo({ left: 0, behavior: 'auto' });
  photoTrack?.scrollTo({ left: 0, behavior: 'auto' });
  videoTrack?.scrollTo({ left: 0, behavior: 'auto' });
  updatePoster(0, false);
  updatePhoto(0, false);
  showVideo(0, false);
};
resetCarouselPositions();
window.addEventListener('load', () => window.requestAnimationFrame(resetCarouselPositions), { once: true });
