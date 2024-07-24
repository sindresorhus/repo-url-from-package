import {expectError, expectType} from 'tsd';
import repoUrlFromPackage, {type PackageJson} from './index.js';

declare const packageJson: PackageJson;

expectType<string>(packageJson.name);
expectType<string | {url: string} | undefined>(packageJson.repository);

const {url, warnings} = repoUrlFromPackage(packageJson);

expectType<string | undefined>(url);
expectType<string[]>(warnings);

repoUrlFromPackage({
	name: 'my-package',
	repository: 'https://github.com/user/repo.git',
});

repoUrlFromPackage({
	name: 'my-package',
	repository: {
		url: 'https://github.com/user/repo.git',
	},
});

repoUrlFromPackage({
	name: 'my-package',
	repository: {
		url: 'https://example.com',
	},
});

repoUrlFromPackage({
	name: 'my-package',
	repository: {
		url: 'invalid-url',
	},
});

repoUrlFromPackage({
	name: 'my-package',
});

expectError(repoUrlFromPackage({}));
