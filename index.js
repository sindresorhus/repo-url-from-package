import githubUrlFromGit from 'github-url-from-git';
import isUrl from 'is-url-superb';

// Look for GitHub shorthand inputs such as "user/repo#branch".
const githubShorthandRegex = /^(\w(?:-?\w){0,38}\/[\w.-]{1,100})(#\S*)?$/;

export default function repoUrlFromPackage(packageJson) {
	if (!packageJson.repository) {
		return {warnings: ['No `repository` field found in package.json.']};
	}

	const warnings = [];
	let repoUrl = typeof packageJson.repository === 'string' ? packageJson.repository : packageJson.repository.url;

	if (repoUrl.startsWith('github:')) {
		repoUrl = repoUrl.slice(7);
	}

	const match = repoUrl.match(githubShorthandRegex);
	if (match) {
		repoUrl = match[2] ? `https://github.com/${match[1]}/tree/${match[2].slice(1)}` : `https://github.com/${match[1]}`;
	}

	let url = githubUrlFromGit(repoUrl);

	if (!url) {
		url = repoUrl;

		if (isUrl(url) && /^https?:\/\//.test(url)) {
			warnings.push(`The \`repository\` field in package.json should point to a Git repo and not a website. Please open an issue or pull request on \`${packageJson.name}\`.`);
		} else {
			warnings.push(`The \`repository\` field in package.json is invalid. Please open an issue or pull request on \`${packageJson.name}\`.`);
			return {warnings};
		}
	}

	return {url, warnings};
}
