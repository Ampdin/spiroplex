import getPackageJson from 'get-package-json';

// can be a git url
getPackageJson('git+https://github.com/kesla/get-package-json.git')
  .then(packageJson => {
    console.log('packageJson', packageJson);
  });

// can be a npm arg
getPackageJson('get-package-json@latest')
  .then(packageJson => {
    console.log('packageJson', packageJson);
  });

// can also load a cached version
const cached = getPackageJson.cached();
cached('git+https://github.com/kesla/get-package-json.git')
  .then(packageJson => {
    console.log('packageJson', packageJson);
    cached('git+https://github.com/kesla/get-package-json.git')
      .then(packageJson => {
        console.log('cached package.json', packageJson);
      });
  });
