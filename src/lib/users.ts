

export interface UserProfile {
    uid: string;
    name?: string;
    email?: string;
    role?: 'admin' | 'librarian' | 'student';
    avatarUrl?: string;
    username?: string;
    bio?: string;
    createdAt?: string; // ISO string
    favorites?: string[];
    borrowed?: string[];
    password?: string; // In a real app, this should be a hash.
    borrowingHistory?: {
        bookId: string;
        borrowedAt: string;
        returnedAt: string | null;
    }[];
}

/**
 * Gets the current authenticated user from Local Storage.
 * This function runs only on the client-side.
 * @returns The current user profile or null.
 */
export function getCurrentUser(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const userJson = localStorage.getItem("currentUser");
  return userJson ? JSON.parse(userJson) : null;
}

/**
 * Sets the current authenticated user in Local Storage.
 * This function runs only on the client-side.
 * @param user The user profile to set as current.
 */
export function setCurrentUser(user: UserProfile | null): void {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("currentUser");
  }
}
