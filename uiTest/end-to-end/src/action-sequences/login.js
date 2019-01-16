import userActions from '../action/user-actions'
import selectors from '../../../selectors'

const user = process.env.TEST_USER
const password = process.env.TEST_PASSWORD
const loginUrl = process.env.LOGIN_URL

const login = () => {
  browser.url(loginUrl)
  userActions.enterText(selectors.login.user, user)
  userActions.enterText(selectors.login.password, password)
  userActions.clickOn(selectors.login.signin)
  browser.url('')
}

export default login