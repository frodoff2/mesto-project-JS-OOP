
export default class UserInfo {
  constructor( { profileName, profileJob }) {
    this._profileName = profileName;
    this._profileJob = profileJob;
  }
  
  getUserInfo() {
  return { name: this._profileName.textContent,
          link: this._profileJob.textContent }
}
  setUserInfo(data) { 
    this._profileName.textContent = data.name;   
    this._profileJob.textContent = data.link;  
  }

}