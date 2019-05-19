class Logger {
  constructor(level = 'debug') {
    this.level = level;
  }

}

Logger.prototype.info = () => {
};
Logger.prototype.debug = () => {
};
Logger.prototype.error = () => {
};

Logger.prototype.info = (message) => {
  if (this.level === 'debug' || this.level === 'info') {
    if (window.console) {
      console.info(message);
    }
  }
};

Logger.prototype.debug = (message) => {
  if (this.level === 'debug') {
    if (window.console) {
      console.log(message);
    }
  }
};

Logger.prototype.network = (message) => {
  if (this.level === 'debug' || this.level === 'info') {
    if (window.console) {
      console.log(message);
    }
  }
};

Logger.prototype.error = (message, stacktrace) => {
  if (window.console) {
    console.error(message);
  }
};
let log = new Logger('debug');
export default log;