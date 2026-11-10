import { Octokit } from '@octokit/rest';

/** Commits pushed in the last 7 days across the 10 most recently updated repositories. */
export const getWeeklyCommits = async (): Promise<number> => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
    // Octokit logs every failed request; empty repositories (409) are expected and handled below.
    log: { debug: () => {}, info: () => {}, warn: console.warn, error: () => {} }
  });

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  try {
    const { data: repos } = await octokit.repos.listForAuthenticatedUser({ sort: 'updated', per_page: 10 });

    const counts = await Promise.all(
      repos.map(async (repo) => {
        try {
          const { data: commits } = await octokit.repos.listCommits({
            owner: repo.owner.login,
            repo: repo.name,
            since: oneWeekAgo.toISOString(),
            per_page: 100
          });

          return commits.length;
        } catch (error: any) {
          // 409: the repository is empty.
          if (409 !== error.status) {
            console.log(`getWeeklyCommits() repository ${repo.name} error: ${error.message}`);
          }

          return 0;
        }
      })
    );

    return counts.reduce((total, count) => total + count, 0);
  } catch (error: any) {
    console.error(`getWeeklyCommits() error: ${error.message}`);

    return 0;
  }
};
