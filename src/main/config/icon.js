import { join } from 'path'
import { nativeImage } from 'electron'
import { isMac } from './env'
import { staticPath } from './path'

function getImage(name, template = true, highlight = false) {
  return nativeImage.createFromPath(join(staticPath, `${name}.png`))
}

export let notificationIcon
export let appTrayIcon
export let appIcon

export function init() {
  notificationIcon = getImage('icon', false, false)
  appTrayIcon = getImage('icon', false)
  appIcon = join(__dirname, join(staticPath, `icon.png`))
}
