// Mentions Gallery - Tweet screenshot infinite scroll gallery
// Extracted from the-mentions.html

const BATCH_SIZE = 20;
const SCROLL_BATCH = 10;
let allImages = [];
let loadedCount = 0;
let isLoading = false;

// Load manifest
async function init() {
    try {
        const response = await fetch('./assets/mentions/manifest.json');
        const manifest = await response.json();
        allImages = manifest.images;
        updateCounter();
        loadMore(BATCH_SIZE);
        setupScrollListener();
    } catch (error) {
        document.getElementById('loading').textContent = 'Error loading images';
        console.error('Failed to load manifest:', error);
    }
}

// Load more images
function loadMore(count) {
    if (isLoading || loadedCount >= allImages.length) return;
    isLoading = true;

    const feed = document.getElementById('feed');
    const end = Math.min(loadedCount + count, allImages.length);

    for (let i = loadedCount; i < end; i++) {
        const img = allImages[i];
        const card = document.createElement('div');
        card.className = 'tweet-card';
        card.innerHTML = `<img src="./assets/mentions/${img.filename}" alt="Tweet screenshot" loading="lazy">`;
        card.addEventListener('click', () => openModal(`./assets/mentions/${img.filename}`));
        feed.appendChild(card);
    }

    loadedCount = end;
    isLoading = false;
    updateCounter();

    // Check if we've loaded everything
    if (loadedCount >= allImages.length) {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('end-message').classList.remove('hidden');
    }
}

// Update counter
function updateCounter() {
    const counter = document.getElementById('counter');
    counter.textContent = `${loadedCount} of ${allImages.length}`;
}

// Infinite scroll
function setupScrollListener() {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && loadedCount < allImages.length) {
            loadMore(SCROLL_BATCH);
        }
    }, { rootMargin: '200px' });

    observer.observe(document.getElementById('loading'));
}

// Modal
function openModal(src) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    modalImg.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('modal').addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Start
init();
