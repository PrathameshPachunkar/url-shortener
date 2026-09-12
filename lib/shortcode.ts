import { customAlphabet } from 'nanoid';

// Restrict to letters + digits only — no symbols that could look odd in a URL.
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

// 7 characters ≈ 3.5 trillion possible codes — plenty of headroom before collisions matter.
export const generateShortCode = customAlphabet(alphabet, 7);