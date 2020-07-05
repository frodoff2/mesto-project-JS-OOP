
export default class UserInfo {
  constructor( { profileName, profileJob, profileAvatar }) {
    this._profileName = profileName;
    this._profileJob = profileJob;
    this._profileAvatar = profileAvatar;
  }
  
  getUserInfo() {
  return { name: this._profileName.textContent,
           about: this._profileJob.textContent }
}
  setUserInfo(data) { 
    this._profileName.textContent = data.name;   
    this._profileJob.textContent = data.about;  
  }

  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
   }
}