import { promises as fs } from "fs";
import path from "path";

export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

export type UserData = {
  notes: Note[];
  tasks: Task[];
};

type StoreShape = Record<string, UserData>;

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "store.json");

const emptyUserData = (): UserData => ({
  notes: [],
  tasks: [],
});

async function ensureStore(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, JSON.stringify({}, null, 2), "utf8");
  }
}

async function readStore(): Promise<StoreShape> {
  await ensureStore();
  const raw = await fs.readFile(STORE_PATH, "utf8");
  return JSON.parse(raw) as StoreShape;
}

async function writeStore(store: StoreShape): Promise<void> {
  await ensureStore();
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

export async function getUserData(userId: string): Promise<UserData> {
  const store = await readStore();
  return store[userId] ?? emptyUserData();
}

export async function updateUserData(
  userId: string,
  updater: (current: UserData) => UserData,
): Promise<UserData> {
  const store = await readStore();
  const current = store[userId] ?? emptyUserData();
  const next = updater(current);
  store[userId] = next;
  await writeStore(store);
  return next;
}

export function createId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
