export type PackageJson = {
	name: string;
	homepage?: string;
	repository?:
	| string
	| {
		type: string;
		url: string;
		directory?: string;
	};
};

/**
Extracts the repo URL from a package.json object.

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
