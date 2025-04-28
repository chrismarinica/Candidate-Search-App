const searchGithub = async () => {
  try {
    console.log('Token:', import.meta.env.VITE_GITHUB_TOKEN);

    // Instead of random fake users, fetch real users from a known GitHub organization
    const response = await fetch(
      `https://api.github.com/orgs/github/members`, // ← get real members of 'github' organization
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    console.error('An error occurred while fetching GitHub users:', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    console.error('An error occurred while fetching GitHub user profile:', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };