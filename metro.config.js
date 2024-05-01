import {getDefaultConfig} from 'expo/metro-config';

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('db');

export default defaultConfig;
