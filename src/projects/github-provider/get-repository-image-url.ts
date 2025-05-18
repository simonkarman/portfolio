import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';

/**
 * Gets the URL of the first image file (alphabetically) in the root directory of a repository.
 *
 * @param {Object} client - The Octokit client
 * @param {Object} repo - The repository object
 *
 * @returns {Promise<string|undefined>} URL of the first image or undefined if none exists
 */
export async function getRepositoryImageUrl(
  client: Octokit,
  repo: RestEndpointMethodTypes['repos']['listForAuthenticatedUser']['response']['data'][number],
): Promise<string | undefined> {
  try {
    // Get contents of the root directory
    const response = await client.rest.repos.getContent({
      owner: repo.owner.login,
      repo: repo.name,
      path: '',
      ref: repo.default_branch,
    });

    const contents = Array.isArray(response.data) ? response.data : [];

    // Filter for .png and .jpg files in the root
    const imageFiles = contents.filter(item =>
      item.type === 'file' &&
      (item.name.endsWith('.png') || item.name.endsWith('.jpg')),
    );

    // Sort alphabetically
    imageFiles.sort((a, b) => a.name.localeCompare(b.name));

    // Return undefined if no images found
    if (imageFiles.length === 0) {
      return undefined;
    }

    // Return URL of the first image
    return imageFiles[0].download_url ?? undefined; // TODO: Check if this is the correct URL format
    // return `https://raw.githubusercontent.com/simonkarman/${repo.name}/refs/heads/${repo.default_branch}/${imageFiles[0].name}`; //
    // console.info('Download URL', imageFiles[0].download_url);
    // return imageFiles[0].download_url || imageFiles[0].url;
    // Note: URL format is owner/repo/branch/filename (without refs/heads/)
    // return `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/refs/heads/${repo.default_branch}/${firstImage.name}`;
  } catch (error) {
    console.error(`GitProvider: Error getting image for repository ${repo.name}:`, error);
    return undefined;
  }
}
