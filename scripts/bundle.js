// 支持 npm run bundle.js --type=base|page --paltform=ios|android|harmony --entry-file='' --minify=true|false --bundle-output='' --config=''
// 如果是 harmony 则使用，shell 执行 react-native bundle-harmony 命令
// 如果是 ios|android 则使用，shell 执行 react-native bundle 命令

// bundle 拆包方案：
// Todo：第一版实现 base 包 + buz-page 包
// 第二版实现 base 包 + common 包 + buz-page 包 
// 名词解释：
//  base 包： 基础包，包含基础固定版本的库。内置到 app。react-native@0.72.5 react@18.2.0
//  common 包：buz-common 业务公共包， 包含基础组件，需要支持热更新版本。比如 js-rn-components 公共基础组件，基础库
//  buz-page 包：buz-page 业务页面代码包，包含业务组件，需要支持热更新版本。 
//  <---->
// 定义业务包名名称（非base 包） 命名规则: 
// 业务包名命名规则： ${业务线}_${项目sic集群名称}_${页面名称默认为 page}.${platform}.bundle
// registerComponent appName 命名规则： ${业务线}_${项目sic集群名称}_${页面名称默认为 page}
// TODO: 业务包 与 统跳地址的映射  与 webview-url 的映射  metadata.json 

const buzLine = ''; // 业务线
const sicName = ''; // 项目sic集群名称
const pageName = 'page'; // 页面名称
const buzBundleName = `${buzLine}_${sicName}_${pageName}`; // 业务包名

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 解析命令行参数
function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.substring(2).split('=');
      args[key] = value || true;
    }
  });
  return args;
}

// 主函数
function bundle() {
  const args = parseArgs();
  let type = args.type || 'page'; // 默认类型为 page 即非基础 base 包
  let platform = args.platform || 'android'; // 默认平台为android
  let entryFile = args['entry-file']; // 入口文件
  let minify = args.minify === 'true' ? true : false; // 默认不压缩
  let bundleOutput = args['bundle-output']; // 输出路径
  let configFile = args.config; // 配置文件路径
  let dev = args.dev === 'true' ? true : false; // 默认非开发模式
  
  // 项目根目录
  const rootDir = path.join(__dirname, '..');
  // scripts目录
  const scriptsDir = __dirname;
  
  // 根据类型设置默认配置
  if (type === 'base') {
    // 如果未指定入口文件，使用默认的base入口
    if (!entryFile) {
      entryFile = path.join(rootDir, 'scripts/base.js');
    }
    // 如果未指定输出路径，使用默认的base输出路径
    if (!bundleOutput) {
      bundleOutput = path.join(rootDir, `dist/bundle/${platform}/base.${platform}.bundle`);
    }
  } else if (type === 'page') {
    // 如果未指定入口文件，使用默认的page入口
    if (!entryFile) {
      entryFile = path.join(rootDir, 'scripts/page.js');
    }
    // 如果未指定输出路径，使用默认的page输出路径
    if (!bundleOutput) {
      bundleOutput = path.join(rootDir, `dist/bundle/${platform}/${buzBundleName}.${platform}.bundle`);
    }
  } else if (type === 'all') {
    // 该包用来测试用
    // 如果未指定入口文件，使用默认的page入口
    if (!entryFile) {
      entryFile = path.join(rootDir, 'scripts/page.js');
    }
    // 如果未指定输出路径，使用默认的page输出路径
    if (!bundleOutput) {
      bundleOutput = path.join(rootDir, `dist/bundle/${platform}/all_${platform}.bundle`);
    }
  }

  // 确保输出目录存在
  const outputDir = path.dirname(bundleOutput);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 构建命令
  let command = '';
  
  if (platform === 'harmony') {
    command = `react-native bundle-harmony`;
    
    // 检查并确保harmony多包所需的map目录存在
    const harmonyMapDir = path.join(scriptsDir, 'harmony/multibundle/map');
    if (!fs.existsSync(harmonyMapDir)) {
      fs.mkdirSync(harmonyMapDir, { recursive: true });
    }
    
    // 确保基础JSON文件存在
    const baseMapFile = path.join(harmonyMapDir, 'baseNameMap.json');
    if (!fs.existsSync(baseMapFile)) {
      fs.writeFileSync(baseMapFile, '[]');
    }
    
    const pageMapFile = path.join(harmonyMapDir, 'pageNameMap.json');
    if (!fs.existsSync(pageMapFile)) {
      fs.writeFileSync(pageMapFile, '[]');
    }
  } else if (platform === 'ios' || platform === 'android') {
    command = `react-native bundle`;
  } else {
    console.error(`不支持的平台类型: ${platform}`);
    process.exit(1);
  }
  
  // 添加通用参数
  if (platform !== 'harmony') {
    command += ` --platform=${platform}`;
  }
  command += ` --entry-file=${entryFile}`;
  command += ` --bundle-output=${bundleOutput}`;
  command += ` --minify=${minify}`;
  command += ` --dev=${dev}`;
  
  // 如果提供了配置文件
  if (configFile) {
    command += ` --config=${configFile}`;
  }
  
  // 添加资源输出目录
  const assetsDir = path.join(path.dirname(bundleOutput), 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  command += ` --assets-dest=${assetsDir}`;
  
  // 执行命令
  console.log(`执行命令: ${command}`);
  try {
    execSync(command, { stdio: 'inherit', cwd: rootDir });
    console.log(`${platform} 平台 ${type} 类型打包完成！`);
    console.log(`输出路径: ${bundleOutput}`);
  } catch (error) {
    console.error(`打包失败: ${error.message}`);
    process.exit(1);
  }
}

// 执行打包
bundle();


