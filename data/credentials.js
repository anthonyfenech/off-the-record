// Credentials - Press passes and credentials for welcome screen
// Add your credential images to images/credentials/
// Each entry is just the filename - the path is handled automatically

export const CREDENTIALS = [
    '20260104165941_0004.jpg',
    '20260104170022_0004.jpg',
    '20260104170022_0006.jpg',
    '20260104170022_0008.jpg',
    '20260104170022_0010.jpg',
    '20260104170022_0012.jpg',
    '20260104170059_0002.jpg',
    '20260104170059_0004.jpg',
    '20260104170059_0006.jpg',
    '20260104170059_0008.jpg',
    '20260104170059_0010.jpg',
    '20260104170115_0002.jpg',
    '20260104171607_0002.jpg',
    '20260104171607_0004.jpg',
    '20260104171647_0002.jpg',
    '20260104171647_0004.jpg',
    '20260104171724_0002.jpg',
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
