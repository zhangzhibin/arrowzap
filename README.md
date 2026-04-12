# ArrowZap

基于 **Cocos Creator 2.4.15** 的箭头解谜类小游戏工程。

## 环境

- [Cocos Creator 2.4.15](https://www.cocos.com/)（与 `project.json` 一致）
- 构建 **iOS** 时需安装 **Xcode**，并满足 Creator 官方对 macOS / Python 等环境的要求

## 快速开始

1. 使用 **Cocos Creator 2.4.15** 打开本目录。
2. 在编辑器中运行预览，或通过 **项目 → 构建发布** 构建目标平台（如 iOS、Web）。

## iOS 版本号 / 图标 / Bundle ID

Cocos 重新构建会覆盖 `build/jsb-default` 下部分原生文件。团队约定在 **`native-overrides/ios`** 维护长期配置，构建后执行同步脚本：

```bash
./tools/sync-ios-overrides.sh
```

**详细说明：** [docs/iOS原生配置.md](docs/iOS原生配置.md)

## 仓库说明

| 路径 | 说明 |
|------|------|
| `assets/` | 游戏资源与脚本 |
| `settings/` | 编辑器与构建相关配置 |
| `native-overrides/ios/` | iOS 壳层覆盖配置（版本、Bundle ID、图标槽位等） |
| `tools/` | 辅助脚本（如 iOS 配置同步） |
| `build/` | 构建输出（部分子目录被 `.gitignore` 忽略，见仓库内 `.gitignore`） |

## 许可

若未单独提供许可证文件，以项目所有者约定为准。
