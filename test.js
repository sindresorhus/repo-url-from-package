import test from 'ava';
import repoUrlFromPackage from './index.js';

const verifyResult = test.macro(async (t, {packageJson, expectations}) => {
	const result = repoUrlFromPackage(packageJson);

	const assertions = await t.try(tt => {
		tt.log('expectations:', expectations);
		tt.like(result, expectations);
	});

	assertions.commit({retainLogs: !assertions.passed});
});

test('should return repo URL from repository field', verifyResult, {
	packageJson: {
		name: 'my-package',
		repository: 'https://github.com/user/repo.git',
	},
	expectations: {
		url: 'https://github.com/user/repo',
		warnings: [],
	},
});

test('should return repo URL from repository.url field', verifyResult, {
	packageJson: {
		name: 'my-package',
		repository: {
			url: 'https://github.com/user/repo.git',
		},
	},
	expectations: {
		url: 'https://github.com/user/repo',
		warnings: [],
	},
});

test('should return warning if repository field is a website', verifyResult, {
	packageJson: {
		name: 'my-package',
		repository: {
			url: 'https://example.com',
		},
	},
	expectations: {
		url: 'https://example.com',
		warnings: [
			'The `repository` field in package.json should point to a Git repo and not a website. Please open an issue or pull request on `my-package`.',
		],
	},
});

test('should return warning if repository field is invalid', verifyResult, {
	packageJson: {
		name: 'my-package',
		repository: {
			url: 'invalid-url',
		},
		homepage: 'https://example.com',
	},
	expectations: {
		url: undefined,
		warnings: [
			'The `repository` field in package.json is invalid. Please open an issue or pull request on `my-package`.',
		],
	},
});

test('should return warning if repository field is missing', verifyResult, {
	packageJson: {
		name: 'my-package',
	},
	expectations: {
		url: undefined,
		warnings: [
			'No `repository` field found in package.json.',
		],
	},
});
