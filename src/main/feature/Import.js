import chalk from 'chalk'
import * as puppeteer from 'puppeteer'

import jsonFile from 'jsonFile'
import * as utils from '../utils/utils'
import * as ipc from '../ipc/ipc'
import * as path from '../config/path'
import * as appData from '../config/data'

// 主入口
const init = async configData => {
  appData.save(configData)
}

module.exports = init
