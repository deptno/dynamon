import * as database from 'dynamodb-localhost'
import * as getPort from 'detect-port'
import * as mkdirp from 'mkdirp'
import * as path from 'path'
import {promisify} from 'util'

const mkdir = promisify(mkdirp)

const installed = new Promise(resolve => database.install(resolve))
const dirConfig = path.resolve(process.env.HOME, '.config', 'aws')

export async function builtInDb(dir = dirConfig) {
  return customDb(await getPort(8000))
}

export async function customDb(port: number, dir = dirConfig): Promise<DbControl> {
  await installed
  const result = await mkdir(dir)
  console.log('mkdir ', result)

  database.start({
    port,
    cors                   : '*',
    dbPath                 : dir,
    sharedDb               : true,
    delayTransientStatuses : true,
    optimizeDbBeforeStartup: true,
  })

  return {
    stop: database.stop.bind(null, port),
    restart: database.restart,
    port
  }
}

export interface DbControl {
  readonly port: number
  stop(): void
  restart(): void
}
