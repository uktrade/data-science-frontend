jest.mock('winston', () => {
  return {
    Logger: jest.fn(() => () => {}),
    transports: {
      Console: jest.fn(() => () => {}),
    },
  }
})

describe('logger', () => {
  const OLD_ENV = process.env
  let winston

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
    delete process.env.NODE_ENV
    winston = require('winston')
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  it('Creates a logger with the correct log level', () => {
    process.env.NODE_ENV = 'development'
    const createLogger = require('../../../../app/lib/logger')
    createLogger()

    expect(winston.Logger).toHaveBeenCalled()
    expect(winston.Logger.mock.calls[0][0].level).toEqual('debug')
  })

  it('Should set colorize to false in production', () => {
    process.env.NODE_ENV = 'production'
    const createLogger = require('../../../../app/lib/logger')
    createLogger()

    expect(winston.transports.Console).toHaveBeenCalledWith({ colorize: false })
  })

  it('Should set colorize to true in development', () => {
    process.env.NODE_ENV = 'development'
    const createLogger = require('../../../../app/lib/logger')
    createLogger()

    expect(winston.transports.Console).toHaveBeenCalledWith({ colorize: true })
  })

  it('Should set colorize to true when the NODE_ENV is not set', () => {
    process.env.NODE_ENV = ''
    const createLogger = require('../../../../app/lib/logger')
    createLogger()

    expect(winston.transports.Console).toHaveBeenCalledWith({ colorize: true })
  })
})
