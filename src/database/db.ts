import Dexie, { type EntityTable } from 'dexie';

interface ImageItem {
  id: number;
  imageData: Blob; // stored by not indexed!
  imageHash: Uint8Array; // MD5 digest
  tags: string[]; // From image AI analysis, "cat", "water", etc.
}

interface Player {
  id?: number;
  name: string;
  slogan?: string;
  pic?: ImageItem;
  avatar?: ImageItem;
}

const db = new Dexie('MathManDB') as Dexie & {
  images: EntityTable<ImageItem, 'id'>;
  players: EntityTable<Player, 'id'>;
};

// Schema declaration:
db.version(1).stores({
  images: '++id, *tags, imageHash',
  players: '++id, name, slogan, pic, avatar', // primary key "id" (for the runtime!)
});

export type { Player };
export { db };
