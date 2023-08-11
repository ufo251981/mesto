export default class UserInfo {
  constructor(configUserInfo) {
    this._profileName = document.querySelector(configUserInfo.profileNameSelector);
    this._profileJob = document.querySelector(configUserInfo.profileJobSelector);
  }

  getUserInfo() {
    const userData = {
      username: this._profileName.textContent, 
      text: this._profileJob.textContent};
    return userData
  }

  setUserInfo(userData) {
    this._profileName.textContent = userData.username;
    this._profileJob.textContent = userData.text;
  }
}