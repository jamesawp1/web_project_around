class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return (userInfo = {
      nameSelector: this._nameSelector,
      jobSekector: this._jobSelector,
    });
  }
}
