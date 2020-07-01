export type Milliseconds = number;

export function getNow(): Milliseconds {
    return (new Date()).valueOf();
}

export const HOUR_MS = 60 * 60 * 1000;
export const MINUTE_MS = 60 * 1000;
export const SECOND_MS = 1000;

export function addLeadingZeroIfNeeded(time: number): string {
    return `${time < 10 ? `0${time}`: time}`
}

export function humanizeTime(ms: Milliseconds): string {
    let msLeft = ms;
    const hours = Math.floor(msLeft / HOUR_MS);
    msLeft -= hours * HOUR_MS;
    const minutes = Math.floor(msLeft / MINUTE_MS);
    msLeft -= minutes * MINUTE_MS;
    const seconds = Math.floor(msLeft / SECOND_MS);
    return `${addLeadingZeroIfNeeded(hours)}:${addLeadingZeroIfNeeded(minutes)}:${addLeadingZeroIfNeeded(seconds)}`;
}

export function isBrowser () {
    return typeof window !== "undefined"
}

export function serializeMap<K, V>(map: Map<K, V>) {
    return JSON.stringify(Array.from(map.entries()));
}

export function deserializeMap<K, V>(entriesString: string): Map<K, V> {
    return new Map(JSON.parse(entriesString));
}

export function saveState<K, V>(state: Map<K, V>) {
    if (isBrowser()) {
        window.localStorage.setItem('state', serializeMap(state));
    }
}

export function loadState<K, V>(): Map<K, V> {

    const state: string | null | false = isBrowser() && window.localStorage.getItem('state');
    if (state === null || state === false) {
        return new Map();
    };
    return deserializeMap<K, V>(state);
}
