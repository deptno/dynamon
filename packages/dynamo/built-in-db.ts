import * as database from 'dynamodb-localhost'
import * as getPort from 'detect-port'
import * as mkdirp from 'mkdirp'
import * as path from 'path'
import * as os from 'os'
import {promisify} from 'util'

const mkdir = promisify(mkdirp)
const installed = new Promise(resolve => database.install(resolve))
const dirConfig = path.resolve(os.homedir(), '.config', 'aws')

export async function builtInDb() {
  return customDb(await getPort(8000))
}

export async function customDb(port: number, dir = dirConfig): Promise<DbControl> {
  try {
    await Promise.race([installed, new Promise(resolve => setTimeout(resolve, 5000))])
    await mkdir(dir)

    database.start({
      port,
      cors                   : '*',
      dbPath                 : dir,
      sharedDb               : true,
      delayTransientStatuses : true,
      optimizeDbBeforeStartup: true,
    })

    return {
      stop   : database.stop.bind(null, port),
      restart: database.restart,
      port,
    }
  } catch (ex) {
    function noop() {}
    return {
      stop   : noop,
      restart: noop,
      port: 0,
    }
  }
}

export interface DbControl {
  readonly port: number
  stop(): void
  restart(): void
}
