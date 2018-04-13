import { EventEmitter } from 'events'
import { createReadStream, statSync } from 'fs'
import { createInterface } from 'readline'
import { dirname } from 'path'
import { watch } from 'chokidar'

export default class Tail extends EventEmitter {
  constructor (filename) {
    super()
    this.filename = filename
    this.watcher = null
    this.position = 0
    this.watch()
  }

  watch () {
    if (this.watcher) return

    const stats = this._getStats()
    if (stats) this.position = stats.size

    this.watcher = watch(dirname(this.filename), {
      ignoreInitial: true,
      alwaysStat: true,
      awaitWriteFinish: {
        stabilityThreshold: 200,
        pollInterval: 50,
      },
    }).on('add', (basename, stats) => {
      if (basename === this.filename) this._handleCreateFile(stats)
    }).on('change', (basename, stats) => {
      if (basename === this.filename) this._handleChangeFile(stats)
    }).on('unlink', basename => {
      if (basename === this.filename) this._handleRemoveFile()
    })
  }

  unwatch () {
    if (!this.watcher) return
    this.watcher.close()
    this.watcher = null
  }

  _getStats () {
    try {
      return statSync(this.filename)
    } catch (e) {
      return false
    }
  }

  _handleCreateFile (stats) {
    this.position = 0
    this._handleChangeFile(stats)
  }

  _handleChangeFile (stats) {
    if (stats.size < this.position) this.position = 0

    if (!stats.size) return

    createInterface({
      input: createReadStream(this.filename, {
        start: this.position,
        end: stats.size - 1,
        encoding: 'utf-8',
      })
    }).on('line', line => {
      this.emit('line', line)
    })

    this.position = stats.size
  }

  _handleRemoveFile () {
    this.position = 0
  }
}
