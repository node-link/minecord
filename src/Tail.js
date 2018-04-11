import { EventEmitter } from 'events'
import fs from 'fs'
import path from 'path'
import chokidar from 'chokidar'

const separator = /[\r]{0,1}\n/

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

    this.watcher = chokidar
      .watch(path.dirname(this.filename), {
        ignoreInitial: true,
        alwaysStat: true,
        awaitWriteFinish: {
          stabilityThreshold: 200,
          pollInterval: 50,
        },
      })
      .on('add', (basename, stats) => {
        if (basename === this.filename) this._handleCreateFile(stats)
      })
      .on('change', (basename, stats) => {
        if (basename === this.filename) this._handleChangeFile(stats)
      })
      .on('unlink', basename => {
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
      return fs.statSync(this.filename)
    } catch (e) {
      return false
    }
  }

  _handleCreateFile (stats) {
    this.position = 0
    this._handleChangeFile(stats)
  }

  _handleChangeFile (stats) {
    if (stats.size > this.position) {
      const stream = fs.createReadStream(this.filename, {
        start: this.position,
        end: stats.size - 1,
        encoding: 'utf-8',
      })

      stream.on('data', data => {
        data.split(separator).forEach(line => {
          this.emit('line', line)
        })
      })
    }

    this.position = stats.size
  }

  _handleRemoveFile () {
    this.position = 0
  }
}
