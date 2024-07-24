import githubUrlFromGit from 'github-url-from-git';
import isUrl from 'is-url-superb';

export default function repoUrlFromPackage(packageJson) {
	const warnings = [];
	const repoUrl = typeof packageJson.repository === 'string' ? packageJson.repository : packageJson.repository?.url;

	if (!repoUrl) {
		if (!packageJson.homepage) {
			warnings.push('No `repository` or `homepage` field found in package.json.');
			return {warnings};
		}

		return {
			url: packageJson.homepage,
			warnings,
		};
	}

	let url = githubUrlFromGit(repoUrl);

	if (!url) {
		url = repoUrl;

		if (isUrl(url) && /^https?:\/\//.test(url)) {
			warnings.push(`The \`repository\` field in package.json should point to a Git repo and not a website. Please open an issue or pull request on \`${packageJson.name}\`.`);
		} else {
			warnings.push(`The \`repository\` field in package.json is invalid. Please open an issue or pull request on \`${packageJson.name}\`. Using the \`homepage\` field instead.`);
			if (!packageJson.homepage) {
				warnings.push('No `homepage` field found in package.json.');
				return {warnings};
			}

			url = packageJson.homepage;
		}
	}

	return {url, warnings};
}
