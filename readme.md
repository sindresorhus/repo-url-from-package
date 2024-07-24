# repo-url-from-package

> Extracts the repo URL from a package.json object

## Install

```sh
npm install repo-url-from-package
```

## Usage

```js
import repoUrlFromPackage from 'repo-url-from-package';
import packageJson from './package.json' with {type: 'json'};

const {url} = repoUrlFromPackage(packageJson);

console.log(url);
//=> 'https://github.com/sindresorhus/repo-url-from-package'
```

## API

### repoUrlFromPackage(packageJson)

Returns an object with the possible parsed `url` and an array of any `warnings`.

#### packageJson

Type: `object`

A `package.json` object.
