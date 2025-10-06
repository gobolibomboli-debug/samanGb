import type { SavedAppState } from '../types';

// FIX: Removed the outdated local interface and now import/re-export the single source of truth from `types.ts`.
export type { SavedAppState };

const STORAGE_KEY = 'mythosPersonaState';

export const saveState = (state: SavedAppState): boolean => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
    return true;
  } catch (error) {
    console.error("Could not save state to localStorage", error);
    return false;
  }
};

export const loadState = (): SavedAppState | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not load state from localStorage", error);
    return undefined;
  }
};

export const hasSavedState = (): boolean => {
    try {
        return localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
        return false;
    }
}

export const clearState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Could not clear state from localStorage", error);
  }
};
