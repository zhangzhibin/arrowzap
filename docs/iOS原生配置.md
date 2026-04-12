# iOS 原生工程配置说明（与 Cocos 构建解耦）

Cocos Creator 每次 **构建 iOS** 时，会重新生成或覆盖 `build/jsb-default/frameworks/runtime-src/proj.ios_mac/` 下的部分内容。若有人只改 Creator 工程或重新构建，**版本号、Bundle ID、App 图标** 等容易被冲掉。

本仓库用 **`native-overrides/ios` 覆盖层 + 同步脚本** 把「应长期固定的 iOS 配置」放在 **构建目录外**，构建完成后一键写回 Xcode 工程。

---

## 一、日常流程（推荐）

1. 在 **Cocos Creator** 中完成 **构建 iOS**（生成/更新 `build/jsb-default`）。
2. 在 **项目根目录** 执行：

   ```bash
   ./tools/sync-ios-overrides.sh
   ```

3. 用 **Xcode** 打开 `build/jsb-default/frameworks/runtime-src/proj.ios_mac/ArrowZap.xcodeproj`，再 Archive / 上传 TestFlight。

> **约定**：需要改版本、图标、Bundle ID 时，**优先改 `native-overrides/ios` 里的文件**，不要只在 `build/...` 里手改；改完务必执行上述脚本。

---

## 二、覆盖层目录说明（`native-overrides/ios/`）

| 文件或目录 | 作用 |
|------------|------|
| `version.env` | `MARKETING_VERSION`（对外版本号）、`CURRENT_PROJECT_VERSION`（Build 号）。会写入 `Info.plist` 与 `project.pbxproj`。 |
| `bundle-id.txt` | 一行文本：Bundle ID。会写入 `Info.plist` 的 `CFBundleIdentifier`。 |
| `AppIcon.appiconset/Contents.json` | App Icon 各尺寸槽位定义（与 Xcode Asset Catalog 一致），一般无需修改。 |
| `icon.png`（可选） | 若存在，作为生成图标的**源图**；若不存在，则使用**项目根目录**的 `icon.png`。 |
| `README.md` | 本目录的简要说明（与本文档互补）。 |

图标会写入：

`build/jsb-default/frameworks/runtime-src/proj.ios_mac/ios/Images.xcassets/AppIcon.appiconset/`

其中 **1024 营销图会去掉透明通道**（白底合成），以满足 App Store 对大图标的校验。

---

## 三、脚本说明（`tools/`）

| 脚本 | 作用 |
|------|------|
| `sync-ios-overrides.sh` | 读取 `native-overrides/ios` 中的配置，更新 `Info.plist`、`project.pbxproj`，并调用 Python 生成 App Icon。 |
| `generate_ios_appicons.py` | 根据源 PNG 与 `Contents.json` 生成各尺寸 PNG（RGB、无 alpha）。 |

---

## 四、环境依赖

- **macOS**（使用系统自带的 `/usr/libexec/PlistBuddy`）。
- **Python 3** + **Pillow**（仅生成图标时需要）：

  ```bash
  pip3 install pillow
  ```

---

## 五、常见问题

### 1. 执行脚本提示找不到 iOS 工程目录

请先在本机用 Creator **成功构建一次 iOS**，确保存在：

`build/jsb-default/frameworks/runtime-src/proj.ios_mac/ios/`

### 2. 图标未更新

确认存在可用的源图：`native-overrides/ios/icon.png` 或项目根目录 `icon.png`。

### 3. Git 里不提交的内容（勿与「覆盖层」混淆）

以下目录/文件由 `.gitignore` 排除，**不属于**本流程的「配置真相来源」：

- `library/`、`temp/`、`local/`：编辑器与缓存。
- `build/jsb-default/publish/`：打好的 `.app` 等。
- `build/jsb-default/**/build/`、`cocos2d-x/build/`：Xcode / 引擎编译中间产物。
- `**/xcuserdata/`：本机 Xcode 用户数据。

**版本与图标的真相来源**应为：`native-overrides/ios/` + 根目录 `icon.png`（若未单独放覆盖层图标）。

---

## 六、与历史问题的关系

- 若团队有人 **只改 `assets` 或重新构建** 导致 iOS 行为异常，请先 **重新构建 iOS**，再执行 **`./tools/sync-ios-overrides.sh`**，最后 Xcode 打包验证。
- **LYSDK / 原生逻辑** 等与 iOS 壳层无关的改动，仍以 `assets/_script` 等源码为准；本文档仅约束 **原生壳层配置** 的维护方式。

---

## 七、变更记录

- 引入 `native-overrides/ios` 与 `tools/sync-ios-overrides.sh`、`tools/generate_ios_appicons.py`（见 Git 提交说明 `chore(ios): 增加 native-overrides 与同步脚本`）。
