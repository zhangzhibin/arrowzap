#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""根据源 PNG 与 AppIcon.appiconset/Contents.json 生成各尺寸图标（去 alpha，满足 App Store 1024 要求）。"""
import json
import os
import sys


def main():
    try:
        from PIL import Image
    except ImportError:
        print("请先安装 Pillow: pip3 install pillow", file=sys.stderr)
        sys.exit(2)

    if len(sys.argv) != 3:
        print("用法: generate_ios_appicons.py <源图.png> <AppIcon.appiconset 目录>", file=sys.stderr)
        sys.exit(1)

    src_path = sys.argv[1]
    appicon_dir = sys.argv[2]
    contents_path = os.path.join(appicon_dir, "Contents.json")

    if not os.path.isfile(src_path):
        print("源图不存在: " + src_path, file=sys.stderr)
        sys.exit(1)
    if not os.path.isfile(contents_path):
        print("缺少 Contents.json: " + contents_path, file=sys.stderr)
        sys.exit(1)

    with open(contents_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    img = Image.open(src_path).convert("RGBA")
    os.makedirs(appicon_dir, exist_ok=True)

    for item in data.get("images", []):
        filename = item.get("filename")
        if not filename:
            continue
        size = float(item["size"].split("x")[0])
        scale = int(item["scale"].replace("x", ""))
        px = int(round(size * scale))
        resized = img.resize((px, px), Image.LANCZOS)
        bg = Image.new("RGB", (px, px), (255, 255, 255))
        bg.paste(resized, mask=resized.split()[3])
        out = os.path.join(appicon_dir, filename)
        bg.save(out, format="PNG", optimize=True)

    print("已生成图标到: " + appicon_dir)


if __name__ == "__main__":
    main()
