export default class UserInfo {
  constructor(configUserInfo, ) {
    this._profileName = document.querySelector(configUserInfo.profileNameSelector);
    this._profileJob = document.querySelector(configUserInfo.profileJobSelector);
    this._profileAvatar = document.querySelector(configUserInfo.profileAvatarSelector);
  }

  getUserInfo() {
    const userData = {
      username: this._profileName.textContent,
      text: this._profileJob.textContent,
      avatar: this._profileAvatar.src,
    };
    return userData
  }

  setUserInfo({avatar, username, text, id}) {
    this._profileAvatar.src = avatar;
    this._profileName.textContent = username;
    this._profileJob.textContent = text;
  }
}