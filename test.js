import test from 'ava';
import repoUrlFromPackage from './index.js';

test('should return repo URL from repository field', t => {
	const packageJson = {
		name: 'my-package',
		repository: 'https://github.com/user/repo.git',
	};

	const result = repoUrlFromPackage(packageJson);
	t.is(result.url, 'https://github.com/user/repo');
	t.deepEqual(result.warnings, []);
});

test('should return repo URL from repository field #2', t => {
	const packageJson = {
		name: 'my-package',
		repository: {
			url: 'https://github.com/user/repo.git',
		},
	};

	const result = repoUrlFromPackage(packageJson);
	t.is(result.url, 'https://github.com/user/repo');
	t.deepEqual(result.warnings, []);
});

test('should return warning if repository field is a website', t => {
	const packageJson = {
		name: 'my-package',
		repository: {
			url: 'https://example.com',
		},
	};

	const result = repoUrlFromPackage(packageJson);
	t.is(result.url, 'https://example.com');
	t.deepEqual(result.warnings, [
		'The `repository` field in package.json should point to a Git repo and not a website. Please open an issue or pull request on `my-package`.',
	]);
});

test('should use homepage field if repository field is invalid', t => {
	const packageJson = {
		name: 'my-package',
		repository: {
			url: 'invalid-url',
		},
		homepage: 'https://example.com',
	};

	const result = repoUrlFromPackage(packageJson);
	t.is(result.url, 'https://example.com');
	t.deepEqual(result.warnings, [
		'The `repository` field in package.json is invalid. Please open an issue or pull request on `my-package`. Using the `homepage` field instead.',
	]);
});

test('should return warning if both repository and homepage fields are missing', t => {
	const packageJson = {
		name: 'my-package',
	};

	const result = repoUrlFromPackage(packageJson);
	t.is(result.url, undefined);
	t.deepEqual(result.warnings, [
		'No `homepage` field found in package.json.',
	]);
});
