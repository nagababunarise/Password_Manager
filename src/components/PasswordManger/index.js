import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const colorHexCodes = ['#0b69ff', '#94a3b8', '#b6c3ca']

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    isChecked: false,
    yourPasswordList: [],
  }

  deletePassword = id => {
    const {yourPasswordList} = this.state
    const filteredPasswordList = yourPasswordList.filter(each => each.id !== id)
    this.setState({
      yourPasswordList: filteredPasswordList,
    })
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChecked = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  addNewPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPasswordDetails = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }
    this.setState(prevState => ({
      yourPasswordList: [...prevState.yourPasswordList, newPasswordDetails],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onSearchPassword = event => {
    const searchValue = event.target.value
    const {yourPasswordList} = this.state
    const filteredPassword = yourPasswordList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchValue.toLowerCase()),
    )
    this.setState({
      yourPasswordList: filteredPassword,
    })
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      yourPasswordList,
      isChecked,
    } = this.state
    const passwordListLength = yourPasswordList.length !== 0

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="logo"
          className="logo-image"
        />
        <div className="password-manager-card">
          <div className="password-card">
            <div>
              <form onSubmit={this.addNewPassword}>
                <h1 className="heading">Add New Password</h1>
                <div className="input-card">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="logo"
                  />
                  <input
                    type="text"
                    placeholder="Enter Website"
                    className="website-name"
                    value={websiteInput}
                    onChange={this.onChangeWebsite}
                  />
                </div>
                <div className="input-card">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="logo"
                  />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="website-name"
                    value={usernameInput}
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="input-card">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="username"
                    className="logo"
                  />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="website-name"
                    value={passwordInput}
                    onChange={this.onChangePassword}
                  />
                </div>
                <div className="button-card">
                  <button type="submit" className="button">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-image"
          />
        </div>

        <div className="password-save-card">
          <div className="password-items-card">
            <h1 className="heading">
              Your Passwords <span>{yourPasswordList.length}</span>
            </h1>
            <div className="search-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                alt="search"
                className="search-logo"
              />
              <input
                type="search"
                placeholder="Search"
                className="input-search"
                onChange={this.onSearchPassword}
              />
            </div>
          </div>
          <hr />
          <div className="check-box-card">
            <input
              type="checkbox"
              id="check"
              className="check-box"
              checked={isChecked}
              onChange={this.onChecked}
            />
            <label htmlFor="check" className="label-name">
              Show Password
            </label>
          </div>
          {!passwordListLength && (
            <div className="no-password-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="noPassword"
                className="no-password-image"
              />
              <h1 className="heading">No Passwords</h1>
            </div>
          )}
          {passwordListLength && (
            <ul>
              {yourPasswordList.map(eachItem => (
                <PasswordItem
                  key={eachItem.id}
                  passwordItemDetails={eachItem}
                  colorHexCodes={colorHexCodes}
                  isChecked={isChecked}
                  deletePassword={this.deletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
