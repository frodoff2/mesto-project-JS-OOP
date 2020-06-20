import { userName, userInfo } from '../utills/constants.js';

export default class UserInfo {
  constructor({ profileName, profileJob }) {
    this._profileName = profileName;
    this._profileJob = profileJob;
    this._userName = userName;
    this._userInfo = userInfo;
  }
  
  getUserInfo() {
    this._userName.value = this._profileName.textContent;   
    this._userInfo.value = this._profileJob.textContent;  
  } 

  setUserInfo() { 
    this._profileName.textContent = this._userName.value;  
    this._profileJob.textContent = this._userInfo.value; 
  }

}