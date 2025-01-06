export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      nameTitle: this._nameSelector.textContent,
      jobTitle: this._jobSelector.textContent,
    };
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._jobSelector.textContent = data.about;
  }

  setUserInfoWithAvatar(data) {
    this._nameSelector.textContent = data.name;
    this._jobSelector.textContent = data.about;
    this._avatarSelector.src = data.avatar;
  }
}
