import getPackageJsonFromRegsitry from 'get-package-json-from-registry';
import getPackageJsonFromGithub from 'get-package-json-from-github';
import npa from 'npm-package-arg';

module.exports = arg => {
  const parsed = npa(arg);
  return parsed.hosted
    ? getPackageJsonFromGithub(arg)
    : getPackageJsonFromRegsitry(arg);
};

module.exports.cached = () => {
  const cachedGithub = getPackageJsonFromGithub.cached();
  const cachedRegistry = getPackageJsonFromRegsitry.cached();

  return arg => {
    const parsed = npa(arg);
    return parsed.hosted
      ? cachedGithub(arg)
      : cachedRegistry(arg);
  };
};
