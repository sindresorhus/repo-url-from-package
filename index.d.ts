/**
A subset of fields from a `package.json` object needed to extract a repo URL.

For a more fully-featured type, see [`type-fest`](https://github.com/sindresorhus/type-fest/blob/main/source/package-json.d.ts).
*/
export type PackageJson = {
	/**
	The name of the package.
	*/
	name: string;

	/**
	The location of the source code repository.
	*/
	repository?: string | {
		url: string;
	};
};

/**
Extracts the repo URL from a `package.json` object.

@example
```
import repoUrlFromPackage from 'repo-url-from-package';
import packageJson from './package.json' with {type: 'json'};

const {url} = repoUrlFromPackage(packageJson);

console.log(url);
//=> 'https://github.com/sindresorhus/repo-url-from-package'
```
*/
export default function repoUrlFromPackage(packageJson: PackageJson): {
	url?: string;
	warnings: string[];
};
