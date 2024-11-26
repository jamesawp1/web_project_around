export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return (userInfo = {
      nameSelector: this._nameSelector.textContent,
      jobSekector: this._jobSelector.textContent,
    });
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._jobSelector.textContent = data.job;
  }
}
