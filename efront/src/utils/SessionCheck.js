import axios from 'axios';

function SessionCheck(userType, homeRoute, historyProp) {

    try {
      
      const userParams = JSON.parse(localStorage.getItem(userType));
      
      if (Date.now() - userParams.timestamp < 1.08e+7) {
        axios.post("http://localhost:4000/Login/checkUser",userParams,{
          "headers":{"content-type":"application/json"},
        })
        .then((res) => {
          if(!res.data) {
            alert('Forbidden access! You are been redirected');
            historyProp(homeRoute);
          }
        })
        .catch((error) => {
          alert(error);
        })
      } else {
        alert('session expired!');
        historyProp(homeRoute);
      }
    } catch(error) {
      alert(error);
      historyProp(homeRoute);
    }

}

export default {SessionCheck}