#!/usr/bin/env bash
# 将 native-overrides/ios 中的配置写回 Cocos 构建生成的 iOS 工程（避免被构建覆盖后丢失）
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OVR="${ROOT}/native-overrides/ios"
IOS="${ROOT}/build/jsb-default/frameworks/runtime-src/proj.ios_mac/ios"
PBX="${ROOT}/build/jsb-default/frameworks/runtime-src/proj.ios_mac/ArrowZap.xcodeproj/project.pbxproj"
PLIST="${IOS}/Info.plist"
APPICON_DST="${IOS}/Images.xcassets/AppIcon.appiconset"
APPICON_SRC_JSON="${OVR}/AppIcon.appiconset/Contents.json"

if [[ ! -d "${IOS}" ]]; then
  echo "错误: 未找到 iOS 工程目录，请先在 Cocos Creator 构建 iOS 生成 build/jsb-default。"
  exit 1
fi

if [[ ! -f "${PBX}" ]]; then
  echo "错误: 未找到 project.pbxproj。"
  exit 1
fi

if [[ -f "${OVR}/version.env" ]]; then
  # shellcheck disable=SC1090
  set -a
  source "${OVR}/version.env"
  set +a
  if [[ -n "${MARKETING_VERSION:-}" ]]; then
    /usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${MARKETING_VERSION}" "${PLIST}"
    sed -i '' "s/MARKETING_VERSION = [^;]*/MARKETING_VERSION = ${MARKETING_VERSION}/g" "${PBX}"
    echo "已设置 MARKETING_VERSION / CFBundleShortVersionString = ${MARKETING_VERSION}"
  fi
  if [[ -n "${CURRENT_PROJECT_VERSION:-}" ]]; then
    /usr/libexec/PlistBuddy -c "Set :CFBundleVersion ${CURRENT_PROJECT_VERSION}" "${PLIST}"
    sed -i '' "s/CURRENT_PROJECT_VERSION = [^;]*/CURRENT_PROJECT_VERSION = ${CURRENT_PROJECT_VERSION}/g" "${PBX}"
    echo "已设置 CURRENT_PROJECT_VERSION / CFBundleVersion = ${CURRENT_PROJECT_VERSION}"
  fi
else
  echo "提示: 未找到 native-overrides/ios/version.env，跳过版本写入。"
fi

if [[ -f "${OVR}/bundle-id.txt" ]]; then
  BID="$(tr -d '[:space:]' < "${OVR}/bundle-id.txt")"
  if [[ -n "${BID}" ]]; then
    /usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier ${BID}" "${PLIST}"
    echo "已设置 CFBundleIdentifier = ${BID}"
  fi
fi

ICON_SRC=""
if [[ -f "${OVR}/icon.png" ]]; then
  ICON_SRC="${OVR}/icon.png"
elif [[ -f "${ROOT}/icon.png" ]]; then
  ICON_SRC="${ROOT}/icon.png"
fi

if [[ -f "${APPICON_SRC_JSON}" && -n "${ICON_SRC}" ]]; then
  mkdir -p "${APPICON_DST}"
  cp "${APPICON_SRC_JSON}" "${APPICON_DST}/Contents.json"
  if python3 "${ROOT}/tools/generate_ios_appicons.py" "${ICON_SRC}" "${APPICON_DST}"; then
    echo "已根据源图生成 AppIcon: ${ICON_SRC}"
  fi
elif [[ -f "${APPICON_SRC_JSON}" ]]; then
  echo "提示: 未找到 icon.png（可在 native-overrides/ios/ 或项目根放置），跳过图标生成。"
fi

echo "同步完成。"
