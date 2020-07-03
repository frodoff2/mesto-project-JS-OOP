
export default class UserInfo {
  constructor( { profileName, profileJob }) {
    this._profileName = profileName;
    this._profileJob = profileJob;
  }
  

  userinterface() {

  }

  getUserInfo() {
  return { name: this._profileName.textContent,
           about: this._profileJob.textContent }
}
  setUserInfo(data) { 
    this._profileName.textContent = data.name;   
    this._profileJob.textContent = data.about;  
  }

}