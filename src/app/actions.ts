

"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getBooks, type Book } from "@/lib/data";
import fs from 'fs/promises';
import path from 'path';
import type { UserProfile } from "@/lib/users";


// --- FILE-BASED USER MANAGEMENT (SERVER-SIDE) ---

const usersFilePath = path.join(process.cwd(), 'src', 'lib', 'users.json');

// Helper function to get all users from JSON file
const getAllUsers = async (): Promise<UserProfile[]> => {
    try {
        const usersJson = await fs.readFile(usersFilePath, 'utf-8');
        return JSON.parse(usersJson);
    } catch (error) {
        // If the file doesn't exist or is empty, return an empty array.
        return [];
    }
};

// Helper function to save all users to JSON file
const saveAllUsers = async (users: UserProfile[]): Promise<void> => {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
};

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const users = await getAllUsers();
    const user = users.find(u => u.uid === uid);
    return user || null;
}

export async function updateUserProfileAction(uid: string, data: Partial<UserProfile>): Promise<void> {
    let users = await getAllUsers();
    const userIndex = users.findIndex(u => u.uid === uid);

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...data };
        await saveAllUsers(users);
    }
}

export async function getUsers(): Promise<UserProfile[]> {
    return getAllUsers();
}

export async function createUser(data: Omit<UserProfile, 'uid' | 'createdAt'>): Promise<UserProfile> {
    let users = await getAllUsers();
    if (users.some(u => u.email === data.email)) {
        throw new Error('An account with this email already exists.');
    }
    const newUser: UserProfile = {
        ...data,
        uid: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        createdAt: new Date().toISOString(),
        favorites: [],
        borrowed: [],
        borrowingHistory: [],
    };
    users.push(newUser);
    await saveAllUsers(users);
    return newUser;
}

export async function findUserByEmail(email: string): Promise<UserProfile | null> {
    const users = await getAllUsers();
    const user = users.find(u => u.email === email);
    return user || null;
}

// --- END FILE-BASED USER MANAGEMENT ---


const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

interface AuthFormState {
    error?: string;
    success?: boolean;
    user?: any;
}


// Helper function for role verification using Local Storage data
async function verifyUserRole(user: { uid: string } | null, requiredRoles: ('admin' | 'librarian' | 'student')[]) {
    if (!user) {
        throw new Error("Authentication required.");
    }
    const userProfile = await getUserProfile(user.uid);

    if (!userProfile || !userProfile.role || !requiredRoles.includes(userProfile.role)) {
        throw new Error("Unauthorized access.");
    }
    return userProfile;
}

// MOCK current user - in a real app this would come from a session
// For server actions, we have no access to local storage. This is a big limitation.
// We'll pass the userId from the client for actions that need it.
// This is NOT secure and only for demonstration purposes.
async function getActionUser(userId: string) {
    if (!userId) return null;
    return await getUserProfile(userId);
}


export async function loginAction(prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
    const validatedFields = LoginSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return { error: "Invalid email or password." };
    }
    
    const { email, password } = validatedFields.data;

    try {
        const user = await findUserByEmail(email);
        if (!user || user.password !== password) {
            return { error: "Invalid credentials. Please try again." };
        }
        return { success: true, user: user };
    } catch (error: any) {
        return { error: error.message || "An unexpected error occurred." };
    }
}

export async function registerAction(prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
    const validatedFields = RegisterSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        const errorMessages = Object.values(validatedFields.error.flatten().fieldErrors).flat().join(' ');
        return { error: errorMessages || "Invalid input." };
    }
    
    const { name, email, password } = validatedFields.data;

    try {
        const newUser = await createUser({
            name: name,
            email: email,
            password: password, // In a real app, hash this password
            role: 'student', // Default role
        });
        return { success: true, user: newUser };
    } catch (error: any) {
        return { error: error.message || "Failed to register." };
    }
}


interface RequestBookState {
    error?: string;
    success?: boolean;
}

export async function requestBookAction(prevState: RequestBookState, formData: FormData): Promise<RequestBookState> {
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const reason = formData.get("reason") as string;
    const userId = formData.get("userId") as string;

    if (!title || !author) {
        return { error: "Title and Author are required." };
    }

    try {
        const user = await getActionUser(userId);
        await verifyUserRole(user, ['student', 'librarian', 'admin']);

        // This part needs to be adapted for local storage or a mock database
        console.log("Book Requested:", { title, author, reason, userId });
        revalidatePath("/librarian/requests");

        return { success: true };
    } catch (error: any) {
        console.error("Error requesting book:", error);
        return { error: error.message || "There was an error submitting your request. Please try again." };
    }
}


interface FavoriteActionState {
  error?: string;
  isFavorite?: boolean;
}

export async function toggleFavoriteAction(userId: string, bookId: string): Promise<FavoriteActionState> {
  if (!userId) {
    return { error: "You must be logged in to favorite a book." };
  }

  try {
    const user = await getUserProfile(userId);
    if (!user) throw new Error("User not found");

    const favorites = user.favorites || [];
    const isCurrentlyFavorite = favorites.includes(bookId);

    const newFavorites = isCurrentlyFavorite
      ? favorites.filter(id => id !== bookId)
      : [...favorites, bookId];
      
    await updateUserProfileAction(userId, { favorites: newFavorites });
    revalidatePath("/dashboard");
    return { isFavorite: !isCurrentlyFavorite };
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return { error: "There was an error updating your favorites." };
  }
}

export async function getFavoriteBooks(userId: string) {
  if (!userId) return [];
  
  const user = await getUserProfile(userId);

  if (user && user.favorites) {
    const favoriteIds: string[] = user.favorites;
    if (favoriteIds.length === 0) return [];
    
    const allBooks = await getBooks();
    return allBooks.filter(book => favoriteIds.includes(book.id));
  }
  return [];
}

interface BorrowActionState {
  error?: string;
  isBorrowed?: boolean;
}

export async function toggleBorrowAction(userId: string, bookId: string): Promise<BorrowActionState> {
  if (!userId) {
    return { error: "You must be logged in to borrow a book." };
  }
  
  try {
    const user = await getUserProfile(userId);
    if (!user) throw new Error("User not found");

    const borrowed = user.borrowed || [];
    const history = user.borrowingHistory || [];
    const isCurrentlyBorrowed = borrowed.includes(bookId);

    if (isCurrentlyBorrowed) {
      // Return the book
      const newBorrowed = borrowed.filter(id => id !== bookId);
      const newHistory = history.map(item => 
        item.bookId === bookId && item.returnedAt === null
          ? { ...item, returnedAt: new Date().toISOString() }
          : item
      );
      await updateUserProfileAction(userId, { borrowed: newBorrowed, borrowingHistory: newHistory });
      revalidatePath("/dashboard");
      return { isBorrowed: false };
    } else {
      // Borrow the book
      const newBorrowed = [...borrowed, bookId];
      const newHistory = [...history, { bookId, borrowedAt: new Date().toISOString(), returnedAt: null }];
      await updateUserProfileAction(userId, { borrowed: newBorrowed, borrowingHistory: newHistory });
      revalidatePath("/dashboard");
      return { isBorrowed: true };
    }
  } catch (error) {
    console.error("Error toggling borrow state:", error);
    return { error: "There was an error processing your request." };
  }
}

export async function getBorrowedBooks(userId: string) {
  if (!userId) return [];
  const user = await getUserProfile(userId);

  if (user && user.borrowed) {
    const borrowedIds: string[] = user.borrowed;
    if (borrowedIds.length === 0) return [];
    
    const allBooks = await getBooks();
    return allBooks.filter(book => borrowedIds.includes(book.id));
  }

  return [];
}


export async function getBorrowingHistory(userId: string) {
    if (!userId) return [];

    try {
        const user = await getUserProfile(userId);
        if (!user || !user.borrowingHistory) return [];

        const allBooks = await getBooks();
        const bookMap = new Map(allBooks.map(book => [book.id, book]));

        const historyList = user.borrowingHistory.map((item, index) => {
            const book = bookMap.get(item.bookId);
            return {
                id: `${item.bookId}-${index}`,
                book: book || null,
                borrowedAt: item.borrowedAt,
                returnedAt: item.returnedAt,
            };
        }).filter(item => item.book).reverse(); // show most recent first

        return historyList;
    } catch (error) {
        console.error("Error fetching borrowing history:", error);
        return [];
    }
}


// Admin Actions
interface RoleAuthFormState {
  error?: string | null;
  success?: boolean;
  user?: any;
}

export async function adminLoginAction(prevState: RoleAuthFormState, formData: FormData): Promise<RoleAuthFormState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const user = await findUserByEmail(email);
        if (user && user.password === password && user.role === 'admin') {
            return { success: true, user };
        }
        return { error: "Invalid admin credentials." };
    } catch (error: any) {
        return { error: error.message || "Failed to login." };
    }
}

export async function librarianLoginAction(prevState: RoleAuthFormState, formData: FormData): Promise<RoleAuthFormState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const user = await findUserByEmail(email);
        if (user && user.password === password && (user.role === 'librarian' || user.role === 'admin')) {
             return { success: true, user };
        }
        return { error: "Invalid librarian credentials." };
    } catch (error: any) {
        return { error: error.message || "Failed to login." };
    }
}

interface BookActionState {
    error?: string;
    success?: boolean;
}

// NOTE: These admin actions for books would need to be rewritten to not use Firestore.
// For now, they will fail since db is not defined.
// This is a significant change to make the whole app work without a backend DB.

export async function addBookAction(prevState: BookActionState, formData: FormData): Promise<BookActionState> {
    // This needs a local storage implementation
    return { error: "Book management is not implemented for local storage." };
}

export async function updateBookAction(bookId: string, formData: FormData): Promise<BookActionState> {
     // This needs a local storage implementation
    return { error: "Book management is not implemented for local storage." };
}

export async function deleteBookAction(bookId: string): Promise<BookActionState> {
     // This needs a local storage implementation
    return { error: "Book management is not implemented for local storage." };
}

export async function getBookRequests() {
    // This needs a local storage implementation
    return [];
}


// Librarian Actions
interface BookRequestActionState {
    error?: string;
    success?: boolean;
}

export async function approveBookRequestAction(request: {id: string, title: string, author: string}): Promise<BookRequestActionState> {
    // This needs a local storage implementation
    return { error: "Request management is not implemented for local storage." };
}


export async function rejectBookRequestAction(requestId: string): Promise<BookRequestActionState> {
    // This needs a local storage implementation
    return { error: "Request management is not implemented for local storage." };
}
