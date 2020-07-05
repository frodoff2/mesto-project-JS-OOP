
export class Api {
  constructor({ baseUrl, headers }) {
  this.baseUrl = baseUrl;
  this.headers = headers;
  }

  getInfo() {
    return fetch( this.baseUrl, {  
        method: 'GET', 
        headers: this.headers 
      })
      .then(res => {
        if (res.ok) {
        return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(err)
      })
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-12/cards', { 
      method: 'GET',
      headers: this.headers   
    })
    .then(res => {
      if (res.ok) {
          return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Карточки не загружены: ${res.status}`);
      })
      .catch(err => {
       console.log(err)
      })
  }

  editProfile(name, about) {
    return fetch(this.baseUrl, {
      method: 'PATCH', 
      headers: this.headers,
      body: JSON.stringify({
          name: name,
          about: about
        })
    })
    .then(res => {
      if (res.ok) {
      return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  addNewCard(title, url) {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-12/cards', {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: title,
          link: url
        }) 
      })
      .then(res => {
          if (res.ok) {
          return res.json();
          }
          // если ошибка, отклоняем промис
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch(err => {
          console.log(err)
        })
  }
  
  removeCard(id){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-12/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    }) 
    .then(res => {
     if (res.ok) {
     return res.json();
     }
     // если ошибка, отклоняем промис
     return Promise.reject(`Ошибка: ${res.status}`);
   })
   .catch(err => {
     console.log(err)
   })
  } 
  

  addLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-12/cards/likes/${id}`, {
    method: 'PUT',
    headers: this.headers,
    }) 
    .then(res => {
     if (res.ok) {
     return res.json();
     }
     // если ошибка, отклоняем промис
     return Promise.reject(`Ошибка: ${res.status}`);
   })
   .catch(err => {
     console.log(err)
   })
 } 

deleteLike(id) {
  return fetch(`https://mesto.nomoreparties.co/v1/cohort-12/cards/likes/${id}`, {
    method: 'DELETE',
    headers: this.headers,
    }) 
    .then(res => {
     if (res.ok) {
     return res.json();
     }
     // если ошибка, отклоняем промис
     return Promise.reject(`Ошибка: ${res.status}`);
   })
   .catch(err => {
     console.log(err)
   })
 } 

deleteCard(id) {
 return fetch(`https://mesto.nomoreparties.co/v1/cohort-12/cards/${id}`, {
  method: 'DELETE',
  headers: this.headers
  }) 
  .then(res => {
   if (res.ok) {
   return res.json();
   }
   // если ошибка, отклоняем промис
   return Promise.reject(`Ошибка: ${res.status}`);
 })
 .catch(err => {
   console.log(err)
 })
} 

changeAvatar(userAvatar) {
 return fetch('https://mesto.nomoreparties.co/v1/cohort-12/users/me/avatar' , {
  method: 'PATCH',
  headers: this.headers,
  body: JSON.stringify({
    avatar: userAvatar.avatar
  })
  })
  .then(res => {
   if (res.ok) {
   return res.json();
   }
   // если ошибка, отклоняем промис
   return Promise.reject(`Ошибка: ${res.status}`);
 })
 .catch(err => {
   console.log(err)
 })
 
}
}


