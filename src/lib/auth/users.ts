export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

/**
 * Demo users for local JWT auth.
 * Replace with a real database in production.
 */
export const DEMO_USERS: User[] = [
  {
    id: "1",
    name: "Alex Morgan",
    email: "demo@vault.app",
    password: "password123",
  },
  {
    id: "2",
    name: "Sam Rivera",
    email: "admin@vault.app",
    password: "admin123",
  },
];

export function findUserByEmail(email: string): User | undefined {
  return DEMO_USERS.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
}

export function toPublicUser(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
