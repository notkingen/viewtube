// ===== SUPABASE CONFIG =====
const SUPABASE_URL = 'https://cxdidalmjkkdhajjcxwe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZGlkYWxtamtrZGhhampjeHdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwODAxMzUsImV4cCI6MjA5MTY1NjEzNX0.G78N7gYOZFhamfWYZYhuiF9_CY8cv3iqKT7f2u45E50';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== CONSTANTS =====
const COLORS = ['#FF2D2D','#FF6B35','#3D9970','#0074D9','#7FDBFF','#B10DC9','#FF69B4','#2ECC40','#FF851B','#e67e22'];
const DEMO_VIDEOS = [
  { id:'demo-1', title:'Building a Full-Stack App with React & Node.js', profiles:{username:'DevMaster Pro'}, view_count:1200000, like_count:48000, created_at:'2024-03-01', duration:'42:18', category:'tech', description:'Learn how to build a complete full-stack app from scratch.', thumbnail_url:'https://picsum.photos/seed/tech1/640/360', video_url:'' },
  { id:'demo-2', title:'I Played Every Final Fantasy Game in Order', profiles:{username:'GameArchive'}, view_count:4700000, like_count:127000, created_at:'2024-02-10', duration:'1:24:55', category:'gaming', description:'6 months, every mainline FF game. Here are my thoughts.', thumbnail_url:'https://picsum.photos/seed/game2/640/360', video_url:'' },
  { id:'demo-3', title:'Why This Jazz Chord Progression Changes Everything', profiles:{username:'Music Theory Lab'}, view_count:892000, like_count:31000, created_at:'2024-03-08', duration:'18:42', category:'music', description:'Deep dive into the ii-V-I jazz progression.', thumbnail_url:'https://picsum.photos/seed/music3/640/360', video_url:'' },
  { id:'demo-4', title:'The Real Story Behind AI and the Future of Work', profiles:{username:'TechReport Daily'}, view_count:2800000, like_count:62000, created_at:'2024-03-05', duration:'31:15', category:'news', description:'We cut through the hype to look at what AI really means for workers.', thumbnail_url:'https://picsum.photos/seed/news5/640/360', video_url:'' },
  { id:'demo-5', title:'How Black Holes Actually Work (Visualized)', profiles:{username:'Cosmos Explained'}, view_count:12000000, like_count:340000, created_at:'2023-11-20', duration:'24:50', category:'education', description:'Cutting-edge visualizations of black hole physics.', thumbnail_url:'https://picsum.photos/seed/space7/640/360', video_url:'' },
  { id:'demo-6', title:'Japan on $50/Day: The Complete Budget Guide', profiles:{username:'WanderBudget'}, view_count:780000, like_count:28000, created_at:'2024-03-07', duration:'35:22', category:'travel', description:'3 weeks in Japan on a strict budget — here\'s how.', thumbnail_url:'https://picsum.photos/seed/japan8/640/360', video_url:'' },
];

// ===== STATE =====
let currentUser = null;
let currentProfile = null;
let currentVideo = null;
let currentFilter = 'all';
let allVideos = [];
let uploadedVideoUrl = null;
let uploadedThumbUrl = null;
let videoFile = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  setupUI();
  const { data: { session } } = await supabase.auth.getSession();
  if (session) await handleSession(session);
  supabase.auth.onAuthStateChange(async (_e, session) => {
    if (session) await handleSession(session);
    else handleSignOut();
  });
  await loadVideos();
});

async function handleSession(session) {
  currentUser = session.user;
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', currentUser.id).single();
  currentProfile = profile;
  updateAuthUI(true);
}

function handleSignOut() {
  currentUser = null;
  currentProfile = null;
  updateAuthUI(false);
}

// ===== AUTH UI =====
function updateAuthUI(loggedIn) {
  document.getElementById('authBtns').classList.toggle('hidden', loggedIn);
  document.getElementById('userMenu').classList.toggle('hidden', !loggedIn);
  document.getElementById('uploadHeaderBtn').classList.toggle('hidden', !loggedIn);
  document.querySelectorAll('.nav-auth').forEach(el => el.classList.toggle('hidden', !loggedIn));

  if (loggedIn && currentProfile) {
    const initials = (currentProfile.username || 'U').slice(0, 2).toUpperCase();
    document.getElementById('headerAvatar').textContent = initials;
    document.getElementById('dropdownAvatar').textContent = initials;
    document.getElementById('dropdownName').textContent = currentProfile.username;
    document.getElementById('dropdownEmail').textContent = currentUser.email;
    document.getElementById('commentAvatar').textContent = initials;
    document.getElementById('loginToComment').classList.add('hidden');
    document.getElementById('commentInput').classList.remove('hidden');
  } else {
    document.getElementById('commentInput').classList.add('hidden');
    document.getElementById('loginToComment').classList.remove('hidden');
  }
}

// ===== LOAD VIDEOS =====
async function loadVideos() {
  showSkeletons();
  const { data, error } = await supabase
    .from('videos')
    .select('*, profiles(username)')
    .order('created_at', { ascending: false });

  allVideos = [...(data || []), ...DEMO_VIDEOS];
  filterAndRender();
}

function filterAndRender() {
  let list = currentFilter === 'all' ? allVideos : allVideos.filter(v => v.category === currentFilter);
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  if (q) list = list.filter(v => v.title.toLowerCase().includes(q) || (v.profiles?.username||'').toLowerCase().includes(q));
  renderVideos(list);
}

// ===== RENDER VIDEOS =====
function showSkeletons() {
  document.getElementById('videoGrid').innerHTML = document.getElementById('loadingGrid')?.outerHTML || '';
}

function renderVideos(videos) {
  const grid = document.getElementById('videoGrid');
  grid.innerHTML = '';

  if (!videos.length) {
    grid.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><h3>No videos found</h3><p>Try a different search or category</p></div>`;
    return;
  }

  videos.forEach((v, i) => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.style.cssText = `opacity:0;animation:fadeInUp 0.3s ease forwards ${i*40}ms`;
    card.innerHTML = buildCard(v);
    card.addEventListener('click', () => openVideoModal(v));
    grid.appendChild(card);
  });
}

function buildCard(v) {
  const name = v.profiles?.username || 'Unknown';
  const color = COLORS[(name.charCodeAt(0) || 0) % COLORS.length];
  const initials = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  const thumb = v.thumbnail_url || `https://picsum.photos/seed/${v.id}/640/360`;
  const views = formatCount(v.view_count);
  const date = formatDate(v.created_at);
  return `
    <div class="thumbnail-wrapper">
      <img class="thumbnail-img" src="${thumb}" alt="${esc(v.title)}" loading="lazy"/>
      <span class="duration-badge">${v.duration || '0:00'}</span>
      <div class="hover-preview"><div class="play-btn-overlay"><svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg></div></div>
    </div>
    <div class="card-info">
      <div class="channel-avatar" style="background:${color}">${initials}</div>
      <div class="card-text">
        <div class="card-title">${esc(v.title)}</div>
        <div class="card-channel">${esc(name)}</div>
        <div class="card-meta">${views} views · ${date}</div>
      </div>
    </div>`;
}

// ===== VIDEO MODAL =====
async function openVideoModal(v) {
  currentVideo = v;
  const name = v.profiles?.username || 'Unknown';
  const color = COLORS[(name.charCodeAt(0)||0) % COLORS.length];
  const initials = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();

  document.getElementById('modalTitle').textContent = v.title;
  document.getElementById('modalChannel').textContent = name;
  document.getElementById('modalViews').textContent = formatCount(v.view_count) + ' views';
  document.getElementById('modalDate').textContent = formatDate(v.created_at);
  document.getElementById('likeCount').textContent = formatCount(v.like_count);
  document.getElementById('modalDesc').textContent = v.description || '';
  document.getElementById('modalChannelAvatar').textContent = initials;
  document.getElementById('modalChannelAvatar').style.background = color;

  // Video player
  const vid = document.getElementById('videoEl');
  if (v.video_url) {
    vid.src = v.video_url;
    vid.style.display = 'block';
  } else {
    vid.src = '';
    vid.style.display = 'none';
  }

  // Like state
  if (currentUser && !v.id.startsWith('demo-')) {
    const { data } = await supabase.from('likes').select('id').eq('video_id', v.id).eq('user_id', currentUser.id).maybeSingle();
    document.getElementById('likeBtn').classList.toggle('liked', !!data);
  }

  // Comments
  await loadComments(v);

  // Increment view count (real videos only)
  if (!v.id.startsWith('demo-')) {
    supabase.rpc('increment_view_count', { video_id: v.id });
  }

  // Comment input state
  const inputRow = document.getElementById('commentInput');
  const loginMsg = document.getElementById('loginToComment');
  if (currentUser) { inputRow.classList.remove('hidden'); loginMsg.classList.add('hidden'); }
  else { inputRow.classList.add('hidden'); loginMsg.classList.remove('hidden'); }

  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

async function loadComments(v) {
  const list = document.getElementById('commentsList');
  list.innerHTML = '<p style="color:var(--text3);font-size:13px">Loading comments…</p>';

  if (v.id.startsWith('demo-')) {
    list.innerHTML = '<p style="color:var(--text3);font-size:13px">Be the first to comment on this video!</p>';
    document.getElementById('commentCount').textContent = '';
    return;
  }

  const { data } = await supabase
    .from('comments')
    .select('*, profiles(username)')
    .eq('video_id', v.id)
    .order('created_at', { ascending: false });

  document.getElementById('commentCount').textContent = data?.length || 0;
  if (!data?.length) {
    list.innerHTML = '<p style="color:var(--text3);font-size:13px">No comments yet. Be the first!</p>';
    return;
  }

  list.innerHTML = data.map(c => {
    const uname = c.profiles?.username || 'User';
    const color = COLORS[(uname.charCodeAt(0)||0) % COLORS.length];
    const initials = uname.slice(0,2).toUpperCase();
    return `<div class="comment">
      <div class="avatar small" style="background:${color}">${initials}</div>
      <div class="comment-body">
        <div class="comment-author">${esc(uname)} <span>${formatDate(c.created_at)}</span></div>
        <div class="comment-text">${esc(c.content)}</div>
        <div class="comment-actions"><button class="comment-action">👍</button><button class="comment-action">Reply</button></div>
      </div>
    </div>`;
  }).join('');
}

function closeVideoModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.getElementById('videoEl').pause();
  document.getElementById('videoEl').src = '';
  document.body.style.overflow = '';
}

// ===== LIKE =====
async function toggleLike() {
  if (!currentUser) { openAuthModal('login'); return; }
  if (!currentVideo || currentVideo.id.startsWith('demo-')) return;
  const btn = document.getElementById('likeBtn');
  const liked = btn.classList.contains('liked');
  if (liked) {
    await supabase.from('likes').delete().eq('video_id', currentVideo.id).eq('user_id', currentUser.id);
    currentVideo.like_count = Math.max(0, (currentVideo.like_count||0) - 1);
  } else {
    await supabase.from('likes').insert({ video_id: currentVideo.id, user_id: currentUser.id });
    currentVideo.like_count = (currentVideo.like_count||0) + 1;
  }
  btn.classList.toggle('liked');
  document.getElementById('likeCount').textContent = formatCount(currentVideo.like_count);
}

// ===== COMMENT =====
async function postComment() {
  if (!currentUser) return;
  const input = document.getElementById('commentInput');
  const text = input.value.trim();
  if (!text || !currentVideo || currentVideo.id.startsWith('demo-')) return;
  const { error } = await supabase.from('comments').insert({ video_id: currentVideo.id, user_id: currentUser.id, content: text });
  if (!error) { input.value = ''; document.getElementById('commentSubmit').classList.add('hidden'); await loadComments(currentVideo); }
}

// ===== AUTH MODAL =====
function openAuthModal(tab = 'login') {
  switchAuthTab(tab);
  document.getElementById('authOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeAuthModal() {
  document.getElementById('authOverlay').classList.remove('active');
  document.body.style.overflow = '';
}
function switchAuthTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('tabLogin').classList.toggle('active', isLogin);
  document.getElementById('tabSignup').classList.toggle('active', !isLogin);
  document.getElementById('loginForm').classList.toggle('hidden', !isLogin);
  document.getElementById('signupForm').classList.toggle('hidden', isLogin);
}

async function doLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('loginSubmit');
  const errEl = document.getElementById('loginError');
  errEl.classList.add('hidden');
  btn.disabled = true; btn.textContent = 'Logging in…';
  const { error } = await supabase.auth.signInWithPassword({
    email: document.getElementById('loginEmail').value,
    password: document.getElementById('loginPassword').value
  });
  btn.disabled = false; btn.textContent = 'Log in';
  if (error) { errEl.textContent = error.message; errEl.classList.remove('hidden'); return; }
  closeAuthModal();
}

async function doSignup(e) {
  e.preventDefault();
  const btn = document.getElementById('signupSubmit');
  const errEl = document.getElementById('signupError');
  const sucEl = document.getElementById('signupSuccess');
  errEl.classList.add('hidden'); sucEl.classList.add('hidden');
  btn.disabled = true; btn.textContent = 'Creating account…';
  const { error } = await supabase.auth.signUp({
    email: document.getElementById('signupEmail').value,
    password: document.getElementById('signupPassword').value,
    options: { data: { username: document.getElementById('signupUsername').value } }
  });
  btn.disabled = false; btn.textContent = 'Create account';
  if (error) { errEl.textContent = error.message; errEl.classList.remove('hidden'); return; }
  sucEl.textContent = '✓ Account created! Check your email to confirm, then log in.';
  sucEl.classList.remove('hidden');
}

// ===== UPLOAD MODAL =====
function openUploadModal() {
  if (!currentUser) { openAuthModal('login'); return; }
  resetUpload();
  document.getElementById('uploadOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeUploadModal() {
  document.getElementById('uploadOverlay').classList.remove('active');
  document.body.style.overflow = '';
}
function resetUpload() {
  videoFile = null; uploadedVideoUrl = null; uploadedThumbUrl = null;
  document.getElementById('uploadStep1').classList.remove('hidden');
  document.getElementById('uploadStep2').classList.add('hidden');
  document.getElementById('uploadStep3').classList.add('hidden');
  document.getElementById('uploadProgressWrap').classList.add('hidden');
  document.getElementById('dropZone').classList.remove('hidden');
  document.getElementById('progressFillUpload').style.width = '0%';
  document.getElementById('videoTitle').value = '';
  document.getElementById('videoDesc').value = '';
  document.getElementById('uploadError').classList.add('hidden');
  document.getElementById('thumbPreview').innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><p>Upload thumbnail</p>';
}

async function handleVideoFile(file) {
  if (!file) return;
  videoFile = file;
  const maxSize = 500 * 1024 * 1024;
  if (file.size > maxSize) { alert('File too large. Max 500MB.'); return; }

  const wrap = document.getElementById('uploadProgressWrap');
  document.getElementById('dropZone').classList.add('hidden');
  wrap.classList.remove('hidden');
  document.getElementById('upFileName').textContent = file.name;
  document.getElementById('upFileSize').textContent = formatFileSize(file.size);

  // Upload to Supabase Storage
  const path = `${currentUser.id}/${Date.now()}_${file.name}`;
  const bar = document.getElementById('progressFillUpload');
  const label = document.getElementById('progressLabel');

  // Simulate progress while uploading
  let fakeP = 0;
  const fakeInterval = setInterval(() => {
    fakeP = Math.min(fakeP + Math.random() * 8, 85);
    bar.style.width = fakeP + '%';
    label.textContent = `Uploading… ${Math.round(fakeP)}%`;
  }, 200);

  const { data, error } = await supabase.storage.from('videos').upload(path, file, { cacheControl: '3600', upsert: false });
  clearInterval(fakeInterval);

  if (error) { alert('Upload failed: ' + error.message); resetUpload(); return; }

  bar.style.width = '100%'; label.textContent = 'Upload complete!';
  const { data: urlData } = supabase.storage.from('videos').getPublicUrl(path);
  uploadedVideoUrl = urlData.publicUrl;

  // Get video duration
  const dur = await getVideoDuration(file);

  setTimeout(() => {
    document.getElementById('uploadStep1').classList.add('hidden');
    document.getElementById('uploadStep2').classList.remove('hidden');
    // Pre-fill title from filename
    const titleInput = document.getElementById('videoTitle');
    if (!titleInput.value) titleInput.value = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
    document.getElementById('titleCount').textContent = `${titleInput.value.length} / 100`;
    // Store duration globally
    window._videoDuration = dur;
  }, 600);
}

function getVideoDuration(file) {
  return new Promise(resolve => {
    const url = URL.createObjectURL(file);
    const v = document.createElement('video');
    v.preload = 'metadata';
    v.onloadedmetadata = () => { URL.revokeObjectURL(url); resolve(formatDuration(v.duration)); };
    v.onerror = () => resolve('0:00');
    v.src = url;
  });
}

async function handleThumbnailFile(file) {
  if (!file) return;
  const path = `${currentUser.id}/${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage.from('thumbnails').upload(path, file, { cacheControl: '3600', upsert: false });
  if (error) { console.error(error); return; }
  const { data: urlData } = supabase.storage.from('thumbnails').getPublicUrl(path);
  uploadedThumbUrl = urlData.publicUrl;
  // Preview
  const img = document.createElement('img');
  img.src = uploadedThumbUrl;
  document.getElementById('thumbPreview').innerHTML = '';
  document.getElementById('thumbPreview').appendChild(img);
}

async function publishVideo() {
  const title = document.getElementById('videoTitle').value.trim();
  const errEl = document.getElementById('uploadError');
  errEl.classList.add('hidden');
  if (!title) { errEl.textContent = 'Please add a title.'; errEl.classList.remove('hidden'); return; }
  if (!uploadedVideoUrl) { errEl.textContent = 'Video upload missing.'; errEl.classList.remove('hidden'); return; }

  const btn = document.getElementById('publishBtn');
  document.getElementById('publishBtnText').textContent = 'Publishing…';
  document.getElementById('publishSpinner').classList.remove('hidden');
  btn.disabled = true;

  const { error } = await supabase.from('videos').insert({
    user_id: currentUser.id,
    title,
    description: document.getElementById('videoDesc').value.trim(),
    category: document.getElementById('videoCategory').value,
    video_url: uploadedVideoUrl,
    thumbnail_url: uploadedThumbUrl || null,
    duration: window._videoDuration || '0:00',
    view_count: 0,
    like_count: 0
  });

  btn.disabled = false;
  document.getElementById('publishBtnText').textContent = 'Publish Video';
  document.getElementById('publishSpinner').classList.add('hidden');

  if (error) { errEl.textContent = 'Failed to publish: ' + error.message; errEl.classList.remove('hidden'); return; }

  document.getElementById('uploadStep2').classList.add('hidden');
  document.getElementById('uploadStep3').classList.remove('hidden');
  await loadVideos(); // Refresh grid
}

// ===== SETUP UI =====
function setupUI() {
  // Header
  document.getElementById('menuBtn').addEventListener('click', () => {
    const s = document.getElementById('sidebar');
    if (window.innerWidth <= 900) s.classList.toggle('mobile-open');
    else s.classList.toggle('collapsed');
  });
  document.getElementById('loginBtn').addEventListener('click', () => openAuthModal('login'));
  document.getElementById('signupBtn').addEventListener('click', () => openAuthModal('signup'));
  document.getElementById('uploadHeaderBtn').addEventListener('click', openUploadModal);

  // User dropdown
  document.getElementById('headerAvatar').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('userDropdown').classList.toggle('hidden');
  });
  document.addEventListener('click', () => document.getElementById('userDropdown').classList.add('hidden'));
  document.getElementById('signOutBtn').addEventListener('click', async () => {
    await supabase.auth.signOut();
    document.getElementById('userDropdown').classList.add('hidden');
  });
  document.getElementById('myVideosBtn').addEventListener('click', () => {
    document.getElementById('userDropdown').classList.add('hidden');
    showMyVideos();
  });
  document.getElementById('myVideosSideBtn')?.addEventListener('click', (e) => { e.preventDefault(); showMyVideos(); });

  // Auth modal
  document.getElementById('authClose').addEventListener('click', closeAuthModal);
  document.getElementById('authOverlay').addEventListener('click', e => { if (e.target === document.getElementById('authOverlay')) closeAuthModal(); });
  document.getElementById('tabLogin').addEventListener('click', () => switchAuthTab('login'));
  document.getElementById('tabSignup').addEventListener('click', () => switchAuthTab('signup'));
  document.getElementById('loginForm').addEventListener('submit', doLogin);
  document.getElementById('signupForm').addEventListener('submit', doSignup);
  document.getElementById('commentLoginLink').addEventListener('click', e => { e.preventDefault(); closeVideoModal(); openAuthModal('login'); });

  // Upload modal
  document.getElementById('uploadClose').addEventListener('click', closeUploadModal);
  document.getElementById('uploadOverlay').addEventListener('click', e => { if (e.target === document.getElementById('uploadOverlay')) closeUploadModal(); });
  document.getElementById('uploadBack').addEventListener('click', () => {
    document.getElementById('uploadStep2').classList.add('hidden');
    document.getElementById('uploadStep1').classList.remove('hidden');
    document.getElementById('uploadProgressWrap').classList.remove('hidden');
    document.getElementById('dropZone').classList.add('hidden');
  });
  document.getElementById('publishBtn').addEventListener('click', publishVideo);
  document.getElementById('uploadDone').addEventListener('click', () => { closeUploadModal(); showMyVideos(); });

  // File inputs
  document.getElementById('videoFileInput').addEventListener('change', e => handleVideoFile(e.target.files[0]));
  document.getElementById('thumbInput').addEventListener('change', e => handleThumbnailFile(e.target.files[0]));

  // Drag & drop
  const dz = document.getElementById('dropZone');
  dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('drag-over'); });
  dz.addEventListener('dragleave', () => dz.classList.remove('drag-over'));
  dz.addEventListener('drop', e => { e.preventDefault(); dz.classList.remove('drag-over'); handleVideoFile(e.dataTransfer.files[0]); });

  // Char counts
  document.getElementById('videoTitle').addEventListener('input', function() {
    document.getElementById('titleCount').textContent = `${this.value.length} / 100`;
  });
  document.getElementById('videoDesc').addEventListener('input', function() {
    document.getElementById('descCount').textContent = `${this.value.length} / 500`;
  });

  // Video modal
  document.getElementById('modalClose').addEventListener('click', closeVideoModal);
  document.getElementById('modalOverlay').addEventListener('click', e => { if (e.target === document.getElementById('modalOverlay')) closeVideoModal(); });
  document.getElementById('likeBtn').addEventListener('click', toggleLike);
  document.getElementById('shareBtn').addEventListener('click', () => { navigator.clipboard?.writeText(window.location.href); alert('Link copied!'); });

  // Comments
  const ci = document.getElementById('commentInput');
  const cs = document.getElementById('commentSubmit');
  ci.addEventListener('input', () => cs.classList.toggle('hidden', !ci.value.trim()));
  cs.addEventListener('click', postComment);
  ci.addEventListener('keydown', e => { if (e.key === 'Enter') postComment(); });

  // Search
  document.getElementById('searchBtn').addEventListener('click', filterAndRender);
  document.getElementById('searchInput').addEventListener('keydown', e => { if (e.key === 'Enter') filterAndRender(); });
  document.getElementById('searchInput').addEventListener('input', function() { if (!this.value) filterAndRender(); });

  // Chips
  document.querySelectorAll('.chip').forEach(c => {
    c.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
      c.classList.add('active');
      currentFilter = c.dataset.cat;
      filterAndRender();
    });
  });

  // Sidebar nav
  document.querySelectorAll('.nav-item[data-filter]').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      const f = item.dataset.filter;
      const chip = document.querySelector(`.chip[data-cat="${f}"]`) || document.querySelector('.chip[data-cat="all"]');
      document.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
      chip?.classList.add('active');
      currentFilter = f === 'trending' ? 'all' : f;
      filterAndRender();
    });
  });

  // Keyboard
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeVideoModal(); closeAuthModal(); closeUploadModal(); } });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) document.getElementById('sidebar').classList.remove('mobile-open');
  });
}

function showMyVideos() {
  if (!currentUser) return;
  currentFilter = 'all';
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  document.querySelector('.chip[data-cat="all"]')?.classList.add('active');
  const mine = allVideos.filter(v => v.user_id === currentUser.id);
  renderVideos(mine.length ? mine : [{
    id: 'no-videos',
    title: 'No videos yet',
    _empty: true
  }]);
  if (!mine.length) {
    document.getElementById('videoGrid').innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></svg>
        <h3>No videos yet</h3>
        <p>Upload your first video to get started</p>
        <button class="btn-primary" onclick="openUploadModal()">Upload video</button>
      </div>`;
  }
}

// ===== HELPERS =====
function formatCount(n) {
  if (!n) return '0';
  if (n >= 1000000) return (n/1000000).toFixed(1).replace('.0','') + 'M';
  if (n >= 1000) return (n/1000).toFixed(1).replace('.0','') + 'K';
  return n.toString();
}
function formatDate(str) {
  if (!str) return '';
  const d = new Date(str), now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff/60) + ' min ago';
  if (diff < 86400) return Math.floor(diff/3600) + ' hours ago';
  if (diff < 2592000) return Math.floor(diff/86400) + ' days ago';
  if (diff < 31536000) return Math.floor(diff/2592000) + ' months ago';
  return Math.floor(diff/31536000) + ' years ago';
}
function formatDuration(secs) {
  if (!secs || isNaN(secs)) return '0:00';
  const h = Math.floor(secs/3600), m = Math.floor((secs%3600)/60), s = Math.floor(secs%60);
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}
function pad(n) { return String(n).padStart(2,'0'); }
function formatFileSize(b) {
  if (b >= 1073741824) return (b/1073741824).toFixed(1) + ' GB';
  if (b >= 1048576) return (b/1048576).toFixed(1) + ' MB';
  return (b/1024).toFixed(0) + ' KB';
}
function esc(s) {
  if (!s) return '';
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
