// 查找最近的推文容器
function findTweetContainer(element) {
  let current = element;
  
  while (current && current !== document.body) {
    if (current.tagName === 'ARTICLE') {
      return current;
    }
    current = current.parentElement;
  }
  
  return null;
}

// 从推文容器中提取用户名
function extractUsername(tweetContainer) {
  if (!tweetContainer) return null;
  
  const userLinks = tweetContainer.querySelectorAll('a[href*="/"]:not([href*="/status/"])');
  
  for (const link of userLinks) {
    const href = link.getAttribute('href');
    if (href && href.startsWith('/') && !href.includes('/status/') && !href.includes('/photo/')) {
      const match = href.match(/^\/([^\/]+)$/);
      if (match && match[1] !== 'home' && match[1] !== 'explore' && match[1] !== 'notifications') {
        return match[1];
      }
    }
  }
  
  return null;
}

// 查找推文中的"更多"按钮
function findMoreButton(tweetContainer) {
  const buttons = tweetContainer.querySelectorAll('button');
  
  for (const btn of buttons) {
    // 检查aria-label
    const ariaLabel = btn.getAttribute('aria-label');
    if (ariaLabel) {
      const lowerLabel = ariaLabel.toLowerCase();
      if (lowerLabel.includes('more') || lowerLabel.includes('更多')) {
        return btn;
      }
    }
    
    // 检查是否有菜单弹出属性
    if (btn.getAttribute('aria-haspopup') === 'menu') {
      // 确保按钮在这个推文容器内
      if (btn.closest('article') === tweetContainer) {
        return btn;
      }
    }
  }
  
  return null;
}

// 等待元素出现（改进版）
function waitForElement(checkFunction, timeout = 3000, interval = 100) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const check = () => {
      const element = checkFunction();
      if (element) {
        resolve(element);
        return;
      }
      
      if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout'));
        return;
      }
      
      setTimeout(check, interval);
    };
    
    check();
  });
}

// 查找屏蔽菜单项
function findBlockMenuItem() {
  const menuItems = document.querySelectorAll('[role="menuitem"]');
  
  for (const item of menuItems) {
    const text = item.textContent.toLowerCase();
    // 查找包含"屏蔽"或"block"关键字的菜单项
    if (text.includes('block') || text.includes('屏蔽')) {
      // 排除"取消屏蔽"/"unblock"
      if (!text.includes('unblock') && !text.includes('取消屏蔽')) {
        return item;
      }
    }
  }
  
  return null;
}

// 查找确认对话框中的屏蔽按钮
function findConfirmButton() {
  // 首先尝试通过data-testid查找
  let button = document.querySelector('[data-testid="confirmationSheetConfirm"]');
  if (button) return button;
  
  // 查找对话框
  const dialogs = document.querySelectorAll('[role="dialog"]');
  
  for (const dialog of dialogs) {
    const buttons = dialog.querySelectorAll('button');
    
    for (const btn of buttons) {
      const text = btn.textContent.toLowerCase();
      const span = btn.querySelector('span');
      const spanText = span ? span.textContent.toLowerCase() : '';
      
      // 查找包含"屏蔽"或"block"的按钮
      if ((text.includes('block') || text.includes('屏蔽')) && 
          !text.includes('unblock') && !text.includes('取消')) {
        return btn;
      }
      
      if ((spanText.includes('block') || spanText.includes('屏蔽')) && 
          !spanText.includes('unblock') && !spanText.includes('取消')) {
        return btn;
      }
    }
  }
  
  return null;
}

// 模拟点击屏蔽按钮
async function simulateBlock(username, tweetContainer) {
  try {
    console.log(`开始屏蔽 @${username}`);
    
    // 步骤1: 找到并点击"更多"按钮
    const moreButton = findMoreButton(tweetContainer);
    if (!moreButton) {
      console.log('找不到更多按钮');
      throw new Error('找不到更多按钮');
    }
    
    console.log('点击更多按钮...');
    moreButton.click();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 步骤2: 等待菜单出现并查找"屏蔽"选项
    console.log('等待屏蔽菜单项...');
    const blockOption = await waitForElement(findBlockMenuItem, 3000, 100);
    
    if (!blockOption) {
      console.log('找不到屏蔽选项');
      document.body.click(); // 关闭菜单
      throw new Error('找不到屏蔽选项');
    }
    
    console.log('点击屏蔽选项...');
    blockOption.click();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 步骤3: 等待确认对话框并点击确认按钮
    console.log('等待确认按钮...');
    const confirmButton = await waitForElement(findConfirmButton, 3000, 100);
    
    if (!confirmButton) {
      console.log('找不到确认按钮');
      throw new Error('找不到确认按钮');
    }
    
    console.log('点击确认按钮...');
    confirmButton.click();
    
    // 等待操作完成
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('屏蔽成功！');
    return true;
    
  } catch (error) {
    console.error('屏蔽失败:', error);
    
    // 尝试关闭可能打开的菜单或对话框
    try {
      // 按ESC键关闭
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27 }));
      // 或者点击背景
      const backdrop = document.querySelector('[data-testid="mask"]');
      if (backdrop) backdrop.click();
    } catch (e) {
      // 忽略关闭错误
    }
    
    return false;
  }
}

// 显示通知
function showNotification(message, isSuccess = true) {
  // 移除旧通知
  const oldNotification = document.querySelector('.quick-block-notification');
  if (oldNotification) {
    oldNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = 'quick-block-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${isSuccess ? '#1d9bf0' : '#ff6b6b'};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// 点击事件处理
let isProcessing = false;

document.addEventListener('click', async (e) => {
  // 检查是否按住Ctrl键
  if (!e.ctrlKey && !e.metaKey) return;
  
  // 防止重复处理
  if (isProcessing) return;
  
  // 阻止默认行为
  e.preventDefault();
  e.stopPropagation();
  
  // 查找推文容器
  const tweetContainer = findTweetContainer(e.target);
  if (!tweetContainer) return;
  
  // 提取用户名
  const username = extractUsername(tweetContainer);
  if (!username) {
    showNotification('无法识别用户名', false);
    return;
  }
  
  isProcessing = true;
  
  // 显示处理中提示
  showNotification(`正在屏蔽 @${username}...`);
  
  // 执行模拟屏蔽操作
  const success = await simulateBlock(username, tweetContainer);
  
  if (success) {
    setTimeout(() => {
      showNotification(`✓ 已屏蔽 @${username}`);
    }, 500);
  } else {
    setTimeout(() => {
      showNotification(`✗ 屏蔽失败，请手动操作`, false);
    }, 500);
  }
  
  isProcessing = false;
  
}, true);

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

console.log('X Quick Block 已加载');