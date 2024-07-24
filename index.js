import githubUrlFromGit from 'github-url-from-git';
import isUrl from 'is-url-superb';

export default function repoUrlFromPackage(packageJson) {
	if (!packageJson.repository) {
		return {warnings: ['No `repository` field found in package.json.']};
	}

	const warnings = [];
	const repoUrl = typeof packageJson.repository === 'string' ? packageJson.repository : packageJson.repository.url;

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
