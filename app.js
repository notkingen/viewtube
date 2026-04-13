// ===== DATA =====
const AVATAR_COLORS = [
  '#FF2D2D','#FF6B35','#F7C59F','#3D9970','#0074D9',
  '#7FDBFF','#B10DC9','#FF69B4','#2ECC40','#FF851B'
];

const VIDEOS = [
  {
    id: 1, cat: 'tech',
    title: 'Building a Full-Stack App with React & Node.js in 2024',
    channel: 'DevMaster Pro', verified: true, subs: '2.4M subscribers',
    views: '1.2M views', date: '2 weeks ago', duration: '42:18',
    likes: '48K', watched: 65,
    thumb: 'https://picsum.photos/seed/tech1/640/360',
    desc: 'In this comprehensive tutorial, we build a complete full-stack application from scratch using React 18, Node.js, Express, and PostgreSQL. We cover authentication, REST APIs, state management, and deployment to production.\n\n📌 Timestamps:\n0:00 - Introduction\n5:30 - Project Setup\n12:00 - Backend with Express\n24:00 - React Frontend\n36:00 - Deployment',
    comments: [
      { user: 'CodeWizard99', time: '1 day ago', text: 'This tutorial is exactly what I needed! Finally understand how JWT auth works.', likes: 342 },
      { user: 'TechLearner', time: '3 days ago', text: 'The deployment section was super helpful. Been struggling with that for weeks!', likes: 189 }
    ]
  },
  {
    id: 2, cat: 'gaming',
    title: 'I Played Every Final Fantasy Game in Order and Here\'s What Happened',
    channel: 'GameArchive', verified: true, subs: '890K subscribers',
    views: '4.7M views', date: '1 month ago', duration: '1:24:55',
    likes: '127K', watched: 0,
    thumb: 'https://picsum.photos/seed/game2/640/360',
    desc: 'I spent 6 months playing every mainline Final Fantasy game in release order. From the original NES classic to the latest entries — here are my thoughts, rankings, and the story of how this franchise shaped gaming history.',
    comments: [
      { user: 'RPGFanatic', time: '2 weeks ago', text: 'FFVI will always be peak for me. The story is just unmatched.', likes: 891 },
      { user: 'CloudStrife7', time: '3 weeks ago', text: 'Can\'t believe you gave FFXIII that high of a rating lol but great video overall!', likes: 234 }
    ]
  },
  {
    id: 3, cat: 'music',
    title: 'Why This Jazz Chord Progression Changes Everything',
    channel: 'Music Theory Lab', verified: false, subs: '430K subscribers',
    views: '892K views', date: '5 days ago', duration: '18:42',
    likes: '31K', watched: 30,
    thumb: 'https://picsum.photos/seed/music3/640/360',
    desc: 'We\'re diving deep into the ii-V-I progression and why it\'s the backbone of jazz harmony. I\'ll show you how to voice it beautifully on piano, how to improvise over it, and how to use it in your own compositions.',
    comments: [
      { user: 'JazzPianist88', time: '4 days ago', text: 'The explanation of voice leading here is the clearest I\'ve ever heard. Subscribed!', likes: 445 }
    ]
  },
  {
    id: 4, cat: 'cooking',
    title: 'Gordon Ramsay\'s Secret Pasta Technique (Recreated at Home)',
    channel: 'Kitchen Chronicles', verified: false, subs: '1.1M subscribers',
    views: '3.2M views', date: '3 weeks ago', duration: '22:07',
    likes: '95K', watched: 0,
    thumb: 'https://picsum.photos/seed/cook4/640/360',
    desc: 'I spent two weeks perfecting the pasta technique used in professional kitchens. The secret is all in the emulsification of pasta water and butter. Watch as I break down the science and show you how to get silky smooth sauce every time.',
    comments: [
      { user: 'HomeChef', time: '1 week ago', text: 'Made this last night and my family thought I ordered from a restaurant. Life changing recipe!', likes: 2341 }
    ]
  },
  {
    id: 5, cat: 'news',
    title: 'The Real Story Behind AI and the Future of Work',
    channel: 'TechReport Daily', verified: true, subs: '5.6M subscribers',
    views: '2.8M views', date: '1 week ago', duration: '31:15',
    likes: '62K', watched: 80,
    thumb: 'https://picsum.photos/seed/news5/640/360',
    desc: 'We explore the latest developments in AI and what they actually mean for workers, businesses, and society. We cut through the hype and fear to look at the data: which jobs are changing, which are growing, and how people are adapting.',
    comments: [
      { user: 'FutureWatcher', time: '5 days ago', text: 'Most balanced take on this topic I\'ve seen. Great journalism.', likes: 678 }
    ]
  },
  {
    id: 6, cat: 'gaming',
    title: 'Ranking Every Soulslike Game from Worst to Best',
    channel: 'SoulsCritic', verified: false, subs: '670K subscribers',
    views: '1.9M views', date: '2 months ago', duration: '58:33',
    likes: '74K', watched: 0,
    thumb: 'https://picsum.photos/seed/soul6/640/360',
    desc: 'After hundreds of hours across the genre, I\'m ranking every major Soulslike game. From Demon\'s Souls to Lies of P — which ones are worth your time and which ones miss the mark?',
    comments: []
  },
  {
    id: 7, cat: 'education',
    title: 'How Black Holes Actually Work (Visualized)',
    channel: 'Cosmos Explained', verified: true, subs: '8.2M subscribers',
    views: '12M views', date: '4 months ago', duration: '24:50',
    likes: '340K', watched: 45,
    thumb: 'https://picsum.photos/seed/space7/640/360',
    desc: 'Using cutting-edge visualizations, we explore the interior structure of black holes, what happens at the event horizon, and the mind-bending physics of spacetime near a singularity. Featuring insights from leading astrophysicists.',
    comments: [
      { user: 'PhysicsNerd', time: '2 months ago', text: 'The visualization of time dilation near the event horizon was stunning. Best explainer on YouTube.', likes: 4892 },
      { user: 'CuriousMind42', time: '3 months ago', text: 'Watched this three times and keep learning something new each time!', likes: 1234 }
    ]
  },
  {
    id: 8, cat: 'travel',
    title: 'Japan on $50/Day: The Complete Budget Guide',
    channel: 'WanderBudget', verified: false, subs: '340K subscribers',
    views: '780K views', date: '6 days ago', duration: '35:22',
    likes: '28K', watched: 0,
    thumb: 'https://picsum.photos/seed/japan8/640/360',
    desc: 'Japan doesn\'t have to be expensive! I spent 3 weeks traveling across Japan on a strict $50/day budget. From Tokyo to Osaka to Kyoto — here\'s exactly how I did it, including the best budget accommodations, food, and transport hacks.',
    comments: [
      { user: 'BudgetTraveler', time: '4 days ago', text: 'Booked my tickets after watching this. The 7-day JR pass tip alone saved me $200!', likes: 567 }
    ]
  },
  {
    id: 9, cat: 'tech',
    title: 'I Built an AI That Plays Chess Better Than Most Humans',
    channel: 'AlgoLab', verified: true, subs: '920K subscribers',
    views: '2.1M views', date: '3 weeks ago', duration: '47:09',
    likes: '89K', watched: 0,
    thumb: 'https://picsum.photos/seed/chess9/640/360',
    desc: 'Starting from scratch, I built a chess AI using minimax, alpha-beta pruning, and eventually added a neural network evaluation function. In this video I document the entire process — from 1200 ELO to beating 2000+ rated players.',
    comments: [
      { user: 'ChessEngine', time: '2 weeks ago', text: 'The alpha-beta pruning explanation was crystal clear. Finally clicked for me after years.', likes: 1123 }
    ]
  },
  {
    id: 10, cat: 'comedy',
    title: 'Pretending to Know About Wine at a Fancy Restaurant',
    channel: 'PrankPal', verified: false, subs: '2.1M subscribers',
    views: '6.4M views', date: '5 days ago', duration: '14:22',
    likes: '210K', watched: 0,
    thumb: 'https://picsum.photos/seed/comedy10/640/360',
    desc: 'I spent one week watching every wine video on YouTube and then went to a Michelin-star restaurant pretending to be a sommelier. What happened next was... unexpected.',
    comments: [
      { user: 'WineFakeIt', time: '3 days ago', text: 'The part where you described the wine as "tasting like ambition" had me in tears 😂', likes: 8923 },
      { user: 'LaughFactory', time: '4 days ago', text: 'Best video of the year no contest', likes: 3412 }
    ]
  },
  {
    id: 11, cat: 'sports',
    title: 'How LeBron James Stays Elite at 39 Years Old',
    channel: 'SportScience Pro', verified: true, subs: '3.4M subscribers',
    views: '5.1M views', date: '2 weeks ago', duration: '19:47',
    likes: '143K', watched: 0,
    thumb: 'https://picsum.photos/seed/bball11/640/360',
    desc: 'We analyze the science behind LeBron\'s longevity — his diet, sleep habits, recovery protocols, and training regimens. We also talk to sports medicine experts about what makes his body different from the average athlete.',
    comments: [
      { user: 'HoopHead', time: '10 days ago', text: 'The sleep science section was wild. $1.5M a year on recovery is insane.', likes: 2341 }
    ]
  },
  {
    id: 12, cat: 'music',
    title: 'Recreating the Sound of Daft Punk in a Home Studio',
    channel: 'BeatFactory', verified: false, subs: '560K subscribers',
    views: '1.1M views', date: '1 month ago', duration: '28:14',
    likes: '52K', watched: 0,
    thumb: 'https://picsum.photos/seed/daft12/640/360',
    desc: 'I reverse-engineered the iconic Daft Punk production style using only plugins and a home studio setup. From the sidechained compression to the vocoder effects — here\'s how to get that French house sound on a budget.',
    comments: []
  }
];

// ===== STATE =====
let currentFilter = 'all';
let currentVideo = null;
let sidebarCollapsed = false;
let isPlaying = false;
let progressInterval = null;
let progressVal = 0;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderVideos(VIDEOS);
  setupEventListeners();
});

// ===== RENDER VIDEOS =====
function renderVideos(videos) {
  const grid = document.getElementById('videoGrid');
  grid.innerHTML = '';

  if (videos.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <h3>No videos found</h3>
        <p>Try a different search or category</p>
      </div>`;
    return;
  }

  videos.forEach((v, i) => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.style.animationDelay = `${i * 40}ms`;
    card.style.opacity = '0';
    card.style.animation = `fadeInUp 0.35s ease forwards ${i * 40}ms`;
    card.innerHTML = buildCard(v);
    card.addEventListener('click', () => openModal(v));
    grid.appendChild(card);
  });

  // Inject animation
  if (!document.getElementById('fadeAnim')) {
    const style = document.createElement('style');
    style.id = 'fadeAnim';
    style.textContent = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }`;
    document.head.appendChild(style);
  }
}

function buildCard(v) {
  const color = AVATAR_COLORS[v.id % AVATAR_COLORS.length];
  const initials = v.channel.split(' ').map(w => w[0]).join('').slice(0, 2);
  const watchedBar = v.watched ? `<div class="watched-bar" style="width:${v.watched}%"></div>` : '';
  return `
    <div class="thumbnail-wrapper">
      <img class="thumbnail-img" src="${v.thumb}" alt="${v.title}" loading="lazy"/>
      <span class="duration-badge">${v.duration}</span>
      ${watchedBar}
      <div class="hover-preview">
        <div class="play-btn-overlay">
          <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
        </div>
      </div>
    </div>
    <div class="card-info">
      <div class="channel-avatar" style="background:${color}">${initials}</div>
      <div class="card-text">
        <div class="card-title">${v.title}</div>
        <div class="card-channel">
          ${v.channel}
          ${v.verified ? '<span class="verified-badge">✓</span>' : ''}
        </div>
        <div class="card-meta">${v.views} · ${v.date}</div>
      </div>
    </div>`;
}

// ===== MODAL =====
function openModal(v) {
  currentVideo = v;
  const overlay = document.getElementById('modalOverlay');
  const color = AVATAR_COLORS[v.id % AVATAR_COLORS.length];
  const initials = v.channel.split(' ').map(w => w[0]).join('').slice(0, 2);

  document.getElementById('modalTitle').textContent = v.title;
  document.getElementById('modalChannel').textContent = v.channel;
  document.getElementById('modalSubs').textContent = v.subs;
  document.getElementById('modalViews').textContent = v.views;
  document.getElementById('modalDate').textContent = v.date;
  document.getElementById('likeCount').textContent = v.likes;
  document.getElementById('modalDesc').textContent = v.desc;
  document.getElementById('commentCount').textContent = v.comments.length;
  document.getElementById('modalChannelAvatar').textContent = initials;
  document.getElementById('modalChannelAvatar').style.background = color;

  // Thumbnail in player
  document.querySelector('.player-placeholder').style.backgroundImage = `url(${v.thumb})`;
  document.querySelector('.player-placeholder').style.backgroundSize = 'cover';
  document.querySelector('.player-placeholder').style.backgroundPosition = 'center';

  renderComments(v.comments);
  resetPlayer();

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  overlay.scrollTop = 0;
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
  clearInterval(progressInterval);
  isPlaying = false;
}

function resetPlayer() {
  clearInterval(progressInterval);
  isPlaying = false;
  progressVal = 0;
  document.getElementById('progressFill').style.width = '0%';
  document.getElementById('playPauseBtn').textContent = '▶';
}

function renderComments(comments) {
  const list = document.getElementById('commentsList');
  list.innerHTML = comments.map(c => `
    <div class="comment">
      <div class="avatar small" style="background:${AVATAR_COLORS[c.user.length % AVATAR_COLORS.length]}">
        ${c.user.slice(0, 2).toUpperCase()}
      </div>
      <div class="comment-body">
        <div class="comment-author">${c.user} <span>${c.time}</span></div>
        <div class="comment-text">${c.text}</div>
        <div class="comment-actions">
          <button class="comment-action">👍 ${c.likes}</button>
          <button class="comment-action">👎</button>
          <button class="comment-action">Reply</button>
        </div>
      </div>
    </div>`).join('');
}

// ===== PLAYER =====
function togglePlay() {
  const btn = document.getElementById('playPauseBtn');
  if (isPlaying) {
    clearInterval(progressInterval);
    btn.textContent = '▶';
    isPlaying = false;
  } else {
    btn.textContent = '⏸';
    isPlaying = true;
    progressInterval = setInterval(() => {
      progressVal = Math.min(progressVal + 0.15, 100);
      document.getElementById('progressFill').style.width = progressVal + '%';
      if (progressVal >= 100) {
        clearInterval(progressInterval);
        btn.textContent = '▶';
        isPlaying = false;
      }
    }, 200);
  }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Sidebar toggle
  document.getElementById('menuBtn').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth <= 900) {
      sidebar.classList.toggle('mobile-open');
    } else {
      sidebar.classList.toggle('collapsed');
      sidebarCollapsed = !sidebarCollapsed;
    }
  });

  // Chips
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.dataset.cat;
      filterVideos();
    });
  });

  // Nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      const f = item.dataset.filter;
      if (f === 'all' || f === 'subscriptions' || f === 'trending' || f === 'library' || f === 'history') {
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        document.querySelector('.chip[data-cat="all"]').classList.add('active');
        filterVideos('all');
      } else {
        const chip = document.querySelector(`.chip[data-cat="${f}"]`);
        if (chip) {
          document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          filterVideos(f);
        }
      }
    });
  });

  // Search
  const searchInput = document.getElementById('searchInput');
  document.getElementById('searchBtn').addEventListener('click', doSearch);
  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
  searchInput.addEventListener('input', () => {
    if (!searchInput.value.trim()) {
      filterVideos(currentFilter);
    }
  });

  // Modal close
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  // Play button
  document.getElementById('playPauseBtn').addEventListener('click', togglePlay);
  document.querySelector('.play-icon-big').addEventListener('click', togglePlay);

  // Progress bar click
  document.querySelector('.progress-bar').addEventListener('click', e => {
    const rect = e.currentTarget.getBoundingClientRect();
    progressVal = ((e.clientX - rect.left) / rect.width) * 100;
    document.getElementById('progressFill').style.width = progressVal + '%';
  });

  // Like button
  document.getElementById('likeBtn').addEventListener('click', function() {
    this.classList.toggle('liked');
  });

  // Comment input
  const commentInput = document.getElementById('commentInput');
  const commentSubmit = document.getElementById('commentSubmit');
  commentInput.addEventListener('input', () => {
    commentSubmit.classList.toggle('visible', commentInput.value.trim().length > 0);
  });
  commentSubmit.addEventListener('click', () => {
    const text = commentInput.value.trim();
    if (!text || !currentVideo) return;
    const newComment = { user: 'You', time: 'Just now', text, likes: 0 };
    currentVideo.comments.unshift(newComment);
    renderComments(currentVideo.comments);
    document.getElementById('commentCount').textContent = currentVideo.comments.length;
    commentInput.value = '';
    commentSubmit.classList.remove('visible');
    document.querySelector('.comments-section').scrollIntoView({ behavior: 'smooth' });
  });

  // Fullscreen button (mock)
  document.getElementById('fullscreenBtn').addEventListener('click', () => {
    const player = document.getElementById('videoPlayer');
    if (player.requestFullscreen) player.requestFullscreen();
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    if (e.key === ' ' && document.getElementById('modalOverlay').classList.contains('active')) {
      e.preventDefault();
      togglePlay();
    }
  });

  // Resize
  window.addEventListener('resize', () => {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 900) {
      sidebar.classList.remove('mobile-open');
    }
  });
}

function filterVideos(override) {
  const cat = override !== undefined ? override : currentFilter;
  currentFilter = cat;
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  let filtered = cat === 'all' ? VIDEOS : VIDEOS.filter(v => v.cat === cat);
  if (query) {
    filtered = filtered.filter(v =>
      v.title.toLowerCase().includes(query) ||
      v.channel.toLowerCase().includes(query)
    );
  }
  renderVideos(filtered);
}

function doSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  if (!query) { filterVideos(); return; }
  const filtered = VIDEOS.filter(v =>
    v.title.toLowerCase().includes(query) ||
    v.channel.toLowerCase().includes(query) ||
    v.cat.toLowerCase().includes(query)
  );
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  renderVideos(filtered);
}
