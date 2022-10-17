import appConfig from 'configs/app/config';
import _compose from 'lodash/fp/compose';
import _mapValues from 'lodash/mapValues';

import type { NetworkExplorer } from 'types/networks';

// for easy .env update
// const NETWORK_EXPLORERS = JSON.stringify([
//   {
//     title: 'Anyblock',
//     baseUrl: 'https://explorer.anyblock.tools',
//     paths: {
//       tx: '/ethereum/poa/core/tx',
//     },
//   },
// ]).replaceAll('"', '\'');

function parseNetworkExplorers() {
  try {
    return JSON.parse(appConfig.network.explorers || '[]');
  } catch (error) {
    return [];
  }
}

const stripTrailingSlash = (str: string) => str.at(-1) === '/' ? str.slice(0, -1) : str;
const addLeadingSlash = (str: string) => str.at(0) === '/' ? str : '/' + str;

const networkExplorers: Array<NetworkExplorer> = (() => {
  const explorers: Array<NetworkExplorer> = parseNetworkExplorers();
  return explorers.map((explorer) => ({
    ...explorer,
    baseUrl: stripTrailingSlash(explorer.baseUrl),
    paths: _mapValues(explorer.paths, _compose(stripTrailingSlash, addLeadingSlash)),
  }));
})();

export default networkExplorers;
