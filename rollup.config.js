import devConfig from './rollup/rollup.dev';
import defaultConfig from './rollup/rollup.prod';

export default commandLineArgs => {
  if (commandLineArgs.configDev === true) {
    return devConfig;
  }
  return defaultConfig;
}