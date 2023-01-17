import os from 'os'
export const platform = os.platform()
export const isWin = platform === 'win32'
export const isMac = platform === 'darwin'
export const isLinux = platform === 'linux'
export const isProd = process.env.NODE_ENV !== 'development'
export const osInfo = [platform, os.arch(), os.release()].join(' ')
