/**
 * Created by Henry Huang on 10/29/17.
 */
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import gh from 'ghreleases';
import moment from 'moment';

const token = process.env.GITHUB_TOKEN;
const branch = process.env.TRAVIS_BRANCH || 'dev';
const user = process.env.USER || 'henryhuang';
const org = process.env.ORG || 'teambebop6';
const repo = process.env.REPO || 'largier-react';
const distName = process.env.DIST_NAME || 'dist.zip';

const auth = {
  token,
  user,
};

export default () => {
  console.log('creating release...');

  if (!token) {
    throw Error('GIT_HUB_TOKEN environment variable have not defined!');
  }

  const timeTag = moment().format('YYYYMMDDHHmmss');
  const tagName = `${branch}-build-${timeTag}`;
  const data = {
    tag_name: tagName,
    name: `Build at ${timeTag}`,
    body: 'Automatically release from travis.',
  };

  gh.create(auth, org, repo, data, (err) => {
    if (err) {
      throw new Error(err.message);
    }

    console.log('release created!');
    console.log('asset uploading...');
    const ref = `tags/${tagName}`;
    const files = [
      distName,
    ];

    gh.uploadAssets(auth, org, repo, ref, files, () => {
      if (err) {
        throw new Error(err.message);
      }
      console.log('asset uploaded!');
    });
  });
};
