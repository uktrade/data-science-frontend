import userActions from '../action/user-actions'
import selectors from '../../../selectors'

const user = process.env.TEST_USER
const password = process.env.TEST_PASSWORD
const loginUrl = process.env.LOGIN_URL

const login = () => {
  browser.url(loginUrl)
  if (browser.capabilities.browserName === 'internet explorer') {
    // IEDriver has a bug that is has shift pressed
    // when attempting to type string too fast
    // this can be deleted once new IEDriver is released
    browser.pause(2000)
    userActions.clickOn(selectors.login.user)
    browser.keys(user)
    userActions.clickOn(selectors.login.password)
    browser.keys(password)
  } else {
    userActions.enterText(selectors.login.user, user)
    userActions.enterText(selectors.login.password, password)
  }
  userActions.clickOn(selectors.login.signin)
  browser.url('')
}

export default login
