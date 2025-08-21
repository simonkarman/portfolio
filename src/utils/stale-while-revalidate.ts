import { File } from '@/utils/file-system/file';

/**
 * CacheConfiguration defines the configuration for the cache.
 */
export type CacheConfiguration = {
  /**
   * file is the wrapper around a file and its system operations.
   *
   * Example: new LocalFile('.cache/projects.json') or new S3File('my-bucket', 'projects.json')
   */
  file: File,

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
  const file = config.file;

  // Return a function that will be called to get the cached data
  return (async (): Promise<T> => {
    // Check if cache file exists
    const cacheExists = await file.exists();

    // Start background refresh regardless of cache status
    if (cacheExists) {
      // Check file age
      const fileAgeMs = await file.ageMs();
      const isStale = fileAgeMs > config.staleTimeMs;

      // Only refresh in background if file is stale
      if (isStale && !isRefreshing) {
        isRefreshing = true;

        // Run in background without awaiting
        Promise.resolve().then(async () => {
          try {
            console.info('Refreshing stale cache:', file.explain());
            const freshData = await expensiveMethod();
            await file.write(JSON.stringify(freshData, null, 2));
          } catch (error) {
            console.error(`Cache refresh failure for ${file.explain()}:`, error);
          } finally {
            isRefreshing = false;
          }
        });
      }

      // Return cached data immediately
      const cachedContent = await file.read();
      return JSON.parse(cachedContent);
    }

    // No cache exists, fetch and wait for fresh data
    const result = await expensiveMethod();
    await file.write(JSON.stringify(result, null, 2));
    return result;
  });
};
