import { CacheHandler } from "@neshca/cache-handler";

const cacheStore = new Map();

const handler = {
  // @ts-ignore
  async get(key) {
    return cacheStore.get(key) || null;
  },
  // @ts-ignore
  async set(key, value) {
    cacheStore.set(key, value);
  },
  // @ts-ignore
  async revalidateTag(tag) {
    // @ts-ignore
    for (const [key, data] of cacheStore.entries()) {
      if (data?.tags?.includes(tag)) {
        cacheStore.delete(key);
      }
    }
  },
};

// @ts-ignore
export default new CacheHandler(handler);
