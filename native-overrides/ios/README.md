# iOS 配置覆盖层（与 Cocos 构建产物解耦）

Cocos Creator 每次 **构建 iOS** 可能会覆盖 `build/jsb-default/.../proj.ios_mac/ios/` 下的部分文件。  
把 **希望长期固定的 iOS 配置** 放在本目录，构建完成后执行同步脚本写回工程即可。

## 使用步骤

1. 在 Creator 中完成 **构建 iOS**（生成 `build/jsb-default`）。
2. 在项目根目录执行：

```bash
./tools/sync-ios-overrides.sh
```

3. 再用 Xcode 打开工程、Archive / 上传。

## 可维护文件

| 文件 | 作用 |
|------|------|
| `version.env` | `MARKETING_VERSION`（对外版本）、`CURRENT_PROJECT_VERSION`（Build 号） |
| `bundle-id.txt` | 一行 Bundle ID，会写入 `Info.plist` 的 `CFBundleIdentifier` |
| `AppIcon.appiconset/Contents.json` | 图标槽位定义（一般不用改） |
| `icon.png`（可选） | 若存在则作为 App 图标源图；否则使用仓库根目录的 `icon.png` |

图标会生成到 Xcode 工程内的 `Images.xcassets/AppIcon.appiconset`，**1024 营销图会去掉透明通道**（白底），以满足 App Store 校验。

## 依赖

- macOS 自带 `PlistBuddy`
- Python3 + Pillow：`pip3 install pillow`（仅生成图标时需要）

## 说明

- **不要**在 `build/jsb-default` 里手改版本/图标作为唯一真相；以本目录为准，改完跑脚本。
- 若 Xcode 里还改了 `project.pbxproj` 里与版本相关的其它项，可在脚本中扩展（或提需求统一进覆盖层）。
