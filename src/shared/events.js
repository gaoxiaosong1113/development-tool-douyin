// 由`ipc-main`发出 使用HTML5降级通知
export const EVENT_APP_NOTIFY_MAIN = 'app.notify.main'

// 由`ipc-renderer`发出 显示通知
export const EVENT_APP_NOTIFY_RENDERER = 'app.notify.renderer'

// 由`ipc-renderer`发出 隐藏剪贴板窗口
export const EVENT_APP_HIDE_WINDOW_CLIPBOARD = 'app.hide.window.clipboard'

// 由`ipc-renderer`发出 隐藏设置窗口
export const EVENT_APP_HIDE_WINDOW_SETTING = 'app.hide.window.setting'

// 由`ipc-main`发出 打开并跳转到指定的页面
export const EVENT_APP_SHOW_PAGE = 'app.show.page'

// 由`ipc-renderer`发出 用于获取系统初始化数据
export const EVENT_APP_WEB_INIT = 'app.init.web'

// 由`ipc-main`发出 同步`rx`数据
export const EVENT_RX_SYNC_MAIN = 'rx.sync.main'

// 由`ipc-renderer`发出 同步`rx`数据
export const EVENT_RX_SYNC_RENDERER = 'rx.sync.renderer'

// 由`ipc-main`发出 `main`进程报错
export const EVENT_APP_ERROR_MAIN = 'app.error.main'

// 由`ipc-main`发出 切换menu显示
export const EVENT_APP_TOGGLE_MENU = 'app.toggle.menu'

// 由`ipc-renderer`发出 自动粘贴
export const EVENT_APP_CLIPBOARD_PASTE = 'app.clipboard.paste'

// 由`ipc-main`发出 修改快捷键绑定
export const EVENT_APP_CHANGE_BIND = 'app.change.bind'

// 由`ipc-main`发出 打开配置文件
export const EVENT_APP_OPEN_WINDOW_SETTING = 'app.open.window.setting'

// 由`ipc-main`发出 打开日志文件
export const EVENT_APP_OPEN_LOG = 'app.open.log'

// 由`ipc-main`发出 打开置
export const EVENT_APP_OPEN_CONFIG = 'app.open.config'

// 由`ipc-renderer`发出 获取剪贴板数据
export const EVENT_APP_CLIPBOARD_DATA_LIST = 'app.clipboard.data.list'

// 由`ipc-renderer`发出 清除剪贴板数据
export const EVENT_APP_CLIPBOARD_DATA_CLEAR = 'app.clipboard.data.clear'

// 由`ipc-renderer`发出 删除一条剪贴板数据
export const EVENT_APP_CLIPBOARD_DATA_REMOVE = 'app.clipboard.data.remove'

// 由`ipc-renderer`发出 修改名称
export const EVENT_APP_CLIPBOARD_DATA_RENAME = 'app.clipboard.data.rename'

// 由`ipc-renderer`发出 修改内容
export const EVENT_APP_CLIPBOARD_DATA_EDIT = 'app.clipboard.data.edit'

// 由`ipc-renderer`发出 获取icon数据
export const EVENT_APP_CLIPBOARD_ICON_LIST = 'app.clipboard.icon.list'

// 由`ipc-renderer`发出 调整剪贴板存储历史
export const EVENT_APP_CHECK_HISTORY_CAPACITY = 'app.check.history.capacity'

// 由`ipc-renderer`发出 获取收藏栏数据
export const EVENT_APP_FAVORITE_DATA_LIST = 'app.favorite.data.list'

// 由`ipc-renderer`发出 增加一个收藏栏
export const EVENT_APP_FAVORITE_DATA_ADD = 'app.favorite.data.add'

// 由`ipc-renderer`发出 收藏到收藏栏
export const EVENT_APP_FAVORITE_DATA_MOVE = 'app.favorite.data.move'

// 由`ipc-renderer`发出 修改收藏栏
export const EVENT_APP_FAVORITE_DATA_UPDATE = 'app.favorite.data.update'

// 由`ipc-renderer`发出 删除收藏栏
export const EVENT_APP_FAVORITE_DATA_REMOVE = 'app.favorite.data.remove'

// 由`ipc-renderer`发出 收藏栏排序
export const EVENT_APP_FAVORITE_DATA_SORT = 'app.favorite.data.sort'

// web
export const EVENT_APP_CONFIG = 'app.config'
// web
export const EVENT_APP_CONFIG_SAVE = 'app.config.save'

export const EVENT_APP_CONFIG_COOKIE = 'app.config.cookie'

// web 发出分享链接请求列表
export const EVENT_WEB_USER = 'web.user'
export const EVENT_WEB_USER_INFO = 'web.user.info'

// web 发出搜索指定关键词
export const EVENT_WEB_SEARCH = 'web.search'

// web 发出下载指定视频
export const EVENT_WEB_DOWNLOAD = 'web.download'
export const EVENT_WEB_DOWNLOAD_ALL = 'web.download.all'
