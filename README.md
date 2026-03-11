# X Quick Block Chrome Extension

[Jump to English Version](#english-version)

一个简单高效的Chrome浏览器扩展，让你在X/Twitter上快速屏蔽用户。

## 功能特性

- **一键屏蔽**：按住 `Ctrl` 键（Mac用户按 `Command`）点击任意推文，即可屏蔽该用户
- **真实屏蔽**：模拟手动操作，将用户添加到X官方屏蔽列表中，所有设备同步生效
- **智能识别**：自动识别用户名，避免误操作
- **操作反馈**：实时显示操作状态和结果
- **官方列表**：使用X/Twitter官方的屏蔽功能，安全可靠

## 安装方法

### 从源码安装（开发模式）

1. 克隆或下载本仓库代码
2. 打开Chrome浏览器，进入扩展管理页面：`chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择本项目的根目录
6. 扩展安装完成

### [从Chrome Web Store安装]

[点击这里从Chrome Web Store安装](https://chromewebstore.google.com/detail/x-quick-block/dmedoamlpkodpdakpbemohffdoopejdd?authuser=0&hl=en)

## 使用方法

1. 访问 [X/Twitter](https://x.com) 或 [Twitter](https://twitter.com)
2. 浏览推文时间线
3. 按住 `Ctrl` 键（Mac用户按 `Command` 键）
4. 点击你想要屏蔽的用户发布的任意推文
5. 弹出确认通知，等待操作完成
6. 用户已被添加到官方屏蔽列表

## 文件结构

```
x-quick-blocker/
├── manifest.json      # 扩展配置文件
├── content.js         # 主功能脚本
├── popup.html         # 扩展弹窗页面
├── icon.png           # 扩展图标
└── README.md          # 项目说明文档
```

## 技术实现

- **manifest.json**: Chrome扩展V3版本配置，声明权限和脚本
- **content.js**: 核心逻辑，包括：
  - 推文容器识别
  - 用户名提取
  - 模拟点击操作
  - 通知显示
- **popup.html**: 扩展图标弹窗，显示使用说明
- **icon.png**: 扩展图标文件，支持多种尺寸显示

### 屏蔽流程

1. 用户按住Ctrl点击推文
2. 插件识别推文容器和用户名
3. 模拟点击推文的"更多"按钮
4. 从菜单中选择"屏蔽"选项
5. 在确认对话框中点击确认
6. 显示操作结果通知

## 权限说明

| 权限 | 用途 |
|------|------|
| `https://twitter.com/*` | 在Twitter网站运行 |
| `https://x.com/*` | 在X网站运行 |

## 注意事项

⚠️ **重要提示**

1. **屏蔽操作不可批量撤销**：每个屏蔽操作都需要单独取消
2. **操作频率限制**：X/Twitter可能有操作频率限制，请勿过快连续使用
3. **失败处理**：如果屏蔽失败，请尝试手动操作
4. **浏览器兼容**：目前仅支持Chrome及基于Chromium的浏览器

## 管理已屏蔽用户

如需管理已屏蔽的用户列表，请访问：
- [X屏蔽管理页面](https://x.com/settings/blocked/all)
- [Twitter屏蔽管理页面](https://twitter.com/settings/blocked)

## 常见问题

**Q: 屏蔽后如何取消屏蔽？**
A: 需要访问屏蔽管理页面手动取消。

**Q: 扩展支持其他浏览器吗？**
A: 目前仅支持Chrome及Chromium内核浏览器（Edge、Brave等）。

**Q: 插件是否安全？**
A: 插件仅模拟用户手动操作，不收集任何用户数据，所有屏蔽操作都通过X/Twitter官方接口完成。

## 开发指南

### 本地测试

1. 克隆项目到本地
2. 在Chrome中加载扩展（开发者模式）
3. 访问X/Twitter网站测试功能

### 修改配置

- 修改版本号：编辑 `manifest.json` 中的 `version` 字段
- 扩展名称/描述：修改 `manifest.json` 中的 `name` 和 `description` 字段
- 功能逻辑：修改 `content.js` 文件

### 打包发布

```bash
# 将项目文件压缩为ZIP
# 上传到Chrome开发者控制台
```

## 版本历史

### v1.1 (2026-03-07)
- 优化代码

### v1.0 (2026-03-01)
- 初始版本发布
- 支持X/Twitter网站快速屏蔽功能
- 提供弹窗使用说明
- 实时操作反馈通知

## 许可证

MIT License

## 作者

Jimi-from-mars

## 免责声明

本扩展仅为方便用户操作而设计，不保证在所有情况下都能正常工作。使用本扩展产生的任何后果由用户自行承担。请遵守X/Twitter的使用条款和社区准则。

# English Version

# X Quick Block Chrome Extension

A simple and efficient Chrome browser extension that lets you quickly block users on X/Twitter.

## Features

- **One-click blocking**: Hold the `Ctrl` key (or `Command` on Mac) and click any tweet to block its author
- **Real blocking**: Simulates manual operation, adding users to X's official block list, synced across all devices
- **Smart recognition**: Automatically identifies usernames to avoid mistakes
- **Operation feedback**: Shows real-time operation status and results
- **Official list**: Uses X/Twitter's official blocking functionality, safe and reliable

## Installation

### From source code (Developer mode)

1. Clone or download this repository
2. Open Chrome browser and go to extensions page: `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked extension"
5. Select the root directory of this project
6. Extension installation complete

### From Chrome Web Store

> Note: This extension is not yet published to Chrome Web Store, currently only supports developer mode installation

## Usage

1. Visit [X/Twitter](https://x.com) or [Twitter](https://twitter.com)
2. Browse the tweet timeline
3. Hold the `Ctrl` key (`Command` on Mac)
4. Click any tweet from the user you want to block
5. A confirmation notification pops up, wait for the operation to complete
6. User has been added to the official block list

## File Structure

```
x-quick-blocker/
├── manifest.json      # Extension configuration file
├── content.js         # Main functionality script
├── popup.html         # Extension popup page
├── icon.png           # Extension icon
└── README.md          # Project documentation
```

## Technical Implementation

- **manifest.json**: Chrome extension V3 configuration, declares permissions and scripts
- **content.js**: Core logic, including:
  - Tweet container recognition
  - Username extraction
  - Click simulation
  - Notification display
- **popup.html**: Extension icon popup, shows usage instructions
- **icon.png**: Extension icon file, supports multiple display sizes

### Blocking Process

1. User holds Ctrl and clicks a tweet
2. Plugin identifies tweet container and username
3. Simulates clicking the tweet's "More" button
4. Selects "Block" option from the menu
5. Confirms in the dialog box
6. Shows operation result notification

## Permission Information

| Permission | Purpose |
|------------|---------|
| `https://twitter.com/*` | Runs on Twitter website |
| `https://x.com/*` | Runs on X website |

## Important Notes

⚠️ **Important Warnings**

1. **Blocking operations cannot be batch undone**: Each block must be individually removed
2. **Operation rate limits**: X/Twitter may have operation rate limits, avoid using too frequently
3. **Failure handling**: If blocking fails, try manual operation
4. **Browser compatibility**: Currently only supports Chrome and Chromium-based browsers

## Managing Blocked Users

To manage your blocked user list, visit:
- [X block management page](https://x.com/settings/blocked/all)
- [Twitter block management page](https://twitter.com/settings/blocked)

## Frequently Asked Questions

**Q: How to unblock after blocking?**
A: Need to visit the block management page to manually unblock.

**Q: Does the extension support other browsers?**
A: Currently only supports Chrome and Chromium-based browsers (Edge, Brave, etc.).

**Q: Is the extension safe?**
A: The extension only simulates manual user operations, does not collect any user data, all blocking operations are completed through X/Twitter's official interface.

## Development Guide

### Local Testing

1. Clone the project locally
2. Load the extension in Chrome (developer mode)
3. Visit X/Twitter website to test functionality

### Modifying Configuration

- Change version: Edit the `version` field in `manifest.json`
- Extension name/description: Modify the `name` and `description` fields in `manifest.json`
- Function logic: Modify the `content.js` file

### Packaging for Release

```bash
# Compress project files to ZIP
# Upload to Chrome Developer Console
```

## Version History

### v1.1 (2026-03-07)
- optimize the codes

### v1.0 (2026-03-01)
- Initial version release
- Supports quick blocking on X/Twitter websites
- Provides popup usage instructions
- Real-time operation feedback notifications

## License

MIT License

## Author

Jimi-from-mars

## Disclaimer

This extension is designed only for user convenience and does not guarantee functionality in all circumstances. Users bear full responsibility for any consequences arising from the use of this extension. Please comply with X/Twitter's terms of service and community guidelines.
