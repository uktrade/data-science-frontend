jest.mock('winston', () => {
  return {
    createLogger: jest.fn(() => () => {}),
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
    require('../../../../app/lib/logger')
    expect(winston.createLogger).toHaveBeenCalled()
    expect(winston.createLogger.mock.calls[0][0].level).toEqual('debug')
  })

  it('Should set colorize to false in production', () => {
    process.env.NODE_ENV = 'production'
    require('../../../../app/lib/logger')

    expect(winston.transports.Console).toHaveBeenCalledWith({ colorize: false })
  })

  it('Should set colorize to true in development', () => {
    process.env.NODE_ENV = 'development'
    require('../../../../app/lib/logger')

    expect(winston.transports.Console).toHaveBeenCalledWith({ colorize: true })
  })

  it('Should set colorize to true when the NODE_ENV is not set', () => {
    process.env.NODE_ENV = ''
    require('../../../../app/lib/logger')

    expect(winston.transports.Console).toHaveBeenCalledWith({ colorize: true })
  })
})
