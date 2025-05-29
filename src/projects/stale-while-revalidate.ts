import { existsSync } from 'node:fs';
import fs from 'fs/promises';

/**
 * CacheConfiguration defines the configuration for the cache.
 */
type CacheConfiguration = {
  /**
   * fileName is the name of the cache file.
   *
   * Example: '.cache/projects.json'
   */
  fileName: string,

  /**
   * staleTime is the time in milliseconds after which the cache is considered stale.
   *
   * Example: 60 * 1000 (1 minute)
   */
  staleTimeMs: number,
};

/**
 * Wraps an expensive method call with a stale-while-revalidate cache.
 *
 * @param config - The cache configuration object containing the file name and stale time.
 * @param expensiveMethod - The expensive method to call if the cache is stale or does not exist.
 *
 * @returns A function that returns a promise resolving to the cached or fresh data.
 */
export const staleWhileRevalidate = <T>(
  config: CacheConfiguration,
  expensiveMethod: () => Promise<T>,
) => {
  let isRefreshing = false;

  // Return a function that will be called to get the cached data
  return (async (): Promise<T> => {
    // Check if cache file exists
    const cacheExists = existsSync(config.fileName);

    // Start background refresh regardless of cache status
    if (cacheExists) {
      // Check file age
      const stats = await fs.stat(config.fileName);
      const fileAgeMs = Date.now() - stats.mtimeMs;
      const isStale = fileAgeMs > config.staleTimeMs;

      // Only refresh in background if file is stale
      if (isStale && !isRefreshing) {
        isRefreshing = true;

        // Run in background without awaiting
        Promise.resolve().then(async () => {
          try {
            console.info('Refreshing stale cache:', config.fileName);
            const freshData = await expensiveMethod();
            await fs.writeFile(config.fileName, JSON.stringify(freshData, null, 2));
          } catch (error) {
            console.error(`Cache refresh failure for ${config.fileName}:`, error);
          } finally {
            isRefreshing = false;
          }
        });
      }

      // Return cached data immediately
      const cachedContent = await fs.readFile(config.fileName, 'utf-8');
      return JSON.parse(cachedContent);
    }

    // No cache exists, fetch and wait for fresh data
    const result = await expensiveMethod();
    await fs.writeFile(config.fileName, JSON.stringify(result, null, 2));
    return result;
  });
};
