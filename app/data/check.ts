import { entries } from './entries';
entries.forEach(e => {
    for (const [key, value] of Object.entries(e)) {
        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
            console.log(`Found object at entry ${e.slug}, key ${key}`, value);
        }
        if (Array.isArray(value)) {
            value.forEach((v, i) => {
                if (typeof v === 'object') console.log(`Found object in array ${e.slug}.${key}[${i}]`, v);
            });
        }
    }
});
