export default class UserInfo {
  constructor({ nameSelector, jobSelector, pictureSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
    this._pictureSelector = document.querySelector(pictureSelector);
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
    this._pictureSelector.src = data.avatar;
  }
}
