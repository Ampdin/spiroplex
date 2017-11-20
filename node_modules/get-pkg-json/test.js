import test from 'tapava';
import getPackageJson from './lib';

test('getPackageJson() from github', function * (t) {
  const packageJson = yield getPackageJson('kesla/node-snappy#v5.0.0');
  t.match(packageJson, {
    name: 'snappy',
    version: '5.0.0'
  });
});

test('getPackageJson() from npm', function * (t) {
  const packageJson = yield getPackageJson('snappy@5.0.0');
  t.match(packageJson, {
    name: 'snappy',
    version: '5.0.0'
  });
});

test('cached() from github', function * (t) {
  const cached = getPackageJson.cached();
  const packageJson = yield cached('kesla/node-snappy#v5.0.0');
  t.match(packageJson, {
    name: 'snappy',
    version: '5.0.0'
  });
});

test('cached() from npm', function * (t) {
  const cached = getPackageJson.cached();
  const packageJson = yield cached('snappy@5.0.0');
  t.match(packageJson, {
    name: 'snappy',
    version: '5.0.0'
  });
});
