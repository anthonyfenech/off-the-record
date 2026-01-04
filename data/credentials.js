// Credentials - Press passes and credentials for welcome screen
// Add your credential images to images/credentials/
// Each entry is just the filename - the path is handled automatically

export const CREDENTIALS = [
    // Add credentials here as you scan them, e.g.:
    // 'tigers-2015-spring.jpg',
    // 'world-series-2012.jpg',
    // 'all-star-game-2014.jpg',
];

// Get a random credential
export function getRandomCredential() {
    if (CREDENTIALS.length === 0) return null;
    const index = Math.floor(Math.random() * CREDENTIALS.length);
    return CREDENTIALS[index];
}

// Get the full path for a credential
export function getCredentialPath(filename) {
    return `./images/credentials/${filename}`;
}
