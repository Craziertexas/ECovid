import React from 'react';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import sessionCheck from '../../utils/SessionCheck';
import TopButtons from '../../Components/TopButtons';
import crypter from '../../utils/encryption';
import BarStyles from '../../Styles/BarStyles';

import Select from 'react-select'
import TextField from '@material-ui/core/TextField';
import {LoadScript,StandaloneSearchBox} from "@react-google-maps/api";
import { Button } from '@material-ui/core';

function RegisterAdd() {

  let history = useHistory();

  const selectSexOptions = [
    { value: 'MALE', label: 'Male'},
    { value: 'FEMALE', label: 'Female'},
  ];

  const selectExamOptions = [
    { value: 'POSITIVE', label: 'Positive'},
    { value: 'NEGATIVE', label: 'Negative'},
  ];

  var [patient, setPatient] = useState({
    name:"",
    lastname:"",
    id:"",
    sex: "",
    birthday: "",
    homeloc: "",
    workloc: "",
    exam: "",
    examdate: "",
    patientid: "",
  });

  var [HomeLocSearch, SetHomeLocSearch] = useState();
  var [WorkLocSearch, SetWorkLocSearch] = useState();

  useEffect(onStart,[]);

  function onStart() {
    sessionCheck.SessionCheck('assistantUser','/Register',history.push);
  }

  async function onSubmit() {
    const patients = await updatePatients();
    if (!checkDuplicate(patients) && !checkEmpty()) {
      var params = JSON.parse(localStorage.getItem('assistantUser'));
      params = {
        "user": params.user,
        "password": params.password,
        "NAME": patient.name,
        "LASTNAME": patient.lastname,
        "ID": await crypter.encrypt(patient.id),
        "SEX": patient.sex.value,
        "BIRTHDAY": Date.parse(patient.birthday),
        "HOMELOCLAT": patient.homeloc.lat,
        "HOMELOCLONG": patient.homeloc.lng,
        "WORKLOCLAT": patient.workloc.lat,
        "WORKLOCLONG": patient.workloc.lng,
        "EXAM": patient.exam.value,
        "EXAMDATE": Date.parse(patient.examdate),
        "PATIENTID": await crypter.encrypt(patient.patientid.toString())
      }
      console.log(JSON.stringify(params));
      sessionCheck.SessionCheck('assistantUser','/Register',history.push);
      await axios.post('http://localhost:4000/Register/addPatient',JSON.stringify(params),
      {
        "headers":{"content-type":"application/json"}
      })
      .then((res) => {
        if (res.data) {
          alert('user add: success');
        } else {
          alert('user add: failed');
        }
      })
      .catch((error) => {
        alert(error);
      });
    }
  }

  async function updatePatients() {

    var results = [];

    sessionCheck.SessionCheck('assistantUser','/Register',history.push);
    await axios.post('http://localhost:4000/Register/getPatients',localStorage.getItem('assistantUser'),
    {
      "headers":{"content-type":"application/json"},
    })
    .then((res) => {
      results = res.data;
    })
    .catch((error) => {
      alert(error);
    }); 

    return results;

  }

  function checkDuplicate(patients) {
    
    for (var i=0;i<patients.length;i++) {

      if ( patients[i].ID === parseInt(patient.id) ) {
        alert('Duplicate ID');
        return true;
      }  

      if ( patients[i].PATIENTID === parseInt(patient.patientid) ) {
        alert('Duplicate Patient ID');
        return true;
      }

      return false;
    }
  }

  function checkEmpty() {

    if (patient.birthday === "") {
      alert('Empty Birthday');
      return true;
    }
    if (patient.exam === "") {
      alert('Empty covid exam');
      return true;
    }
    if (patient.examdate === "") {
      alert('Empty date exam');
      return true;
    }
    if (patient.homeloc === "") {
      alert('Empty home location');
      return true;
    }
    if (patient.workloc === "") {
      alert('Empty work location');
      return true;
    }
    if (patient.id === "") {
      alert('Empty id');
      return true;
    }
    if (patient.lastname === "") {
      alert('Empty lastname');
      return true;
    }
    if (patient.name === "") {
      alert('Empty name');
      return true;
    }
    if (patient.patientid === "") {
      alert('Empty ID');
      return true;
    } 
    if (patient.sex === "") {
      alert('Empty sex');
      return true;
    }

  }

  return (
    <div style={{left:'0%',top:'0%',height:'100%', width:'100%',position:'absolute'}}>
      <TopButtons.RegisterTopButtons/>
      <div style={{height:'85%', width:'100%', top:'15%',left:'0%', position:"absolute"}}>
        <TextField
            style={{left: '10%', top: '8%', position:"absolute"}}
            value={patient.name}
            onChange={(value) => {setPatient({...patient, name: value.target.value})}}
            label = "Name"
            placeholder = "ex: David"
            helperText = "max 100 characters"
        />
        <TextField
            style={{left: '35%', top: '8%', position:"absolute"}}
            value={patient.lastname}
            onChange={(value) => {setPatient({...patient, lastname: value.target.value})}}
            label = "Lastname"
            placeholder = "ex: Ruiz"
            helperText = "max 100 characters"
        />
        <TextField
            style={{left: '60%', top: '8%', position:"absolute"}}
            value={patient.id}
            onChange={(value) => {setPatient({...patient, id: value.target.value})}}
            label = "ID"
            placeholder = "ex: 1234567890"
            helperText = "max 10 characters"
        />
        <div style={{width:'150px',left: '85%', top: '10%', position:"absolute"}}>
          <Select
            options={selectSexOptions}
            value={patient.sex}
            onChange={(value) => {setPatient({...patient, sex: value})}}
          />
        </div>
        <TextField
            style={{left: '10%', top: '28%', position:"absolute"}}
            value={patient.birthday}
            onChange={(value) => {console.log(value); setPatient({...patient, birthday: value.target.value})}}
            label = "Birthday"
            helperText = "Enter the patient birthday"
            type = "date"
        />
        <LoadScript
          googleMapsApiKey={"AIzaSyBGg3KAOqcgiElodEnHO54O08aXeOtUPNY"}
          libraries={["places"]}
        >
          <StandaloneSearchBox
            onLoad = {(ref) => {SetHomeLocSearch(ref)}}
            onPlacesChanged = {() => {
              setPatient({...patient, homeloc: {
                lat: HomeLocSearch.getPlaces()[0].geometry.location.lat(),
                lng: HomeLocSearch.getPlaces()[0].geometry.location.lng()
              }})
            }}
          >
            <input
              type={"text"}
              placeholder="Input Home location"
              style = {{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `220px`,
                height: '6%',
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                position: "absolute",
                left: '35%',
                top: 'calc(28% + 15px)',
                zIndex: '99999',
              }}
            />
          </StandaloneSearchBox>

          <StandaloneSearchBox
            onLoad = {(ref) => {SetWorkLocSearch(ref)}}
            onPlacesChanged = {() => {
              setPatient({...patient, workloc: {
                lat: WorkLocSearch.getPlaces()[0].geometry.location.lat(),
                lng: WorkLocSearch.getPlaces()[0].geometry.location.lng()
              }})
            }}
          >
            <input
              type={"text"}
              placeholder="Input Work location"
              style = {{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `220px`,
                height: `6%`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                position: "absolute",
                left: '60%',
                top: 'calc(28% + 15px)',
              }}
            />
          </StandaloneSearchBox>
        </LoadScript>
        <div style={{width:'150px',left: '85%', top: '28%', position:"absolute"}}>
          <Select
            options={selectExamOptions}
            value={patient.exam}
            onChange={(value) => {setPatient({...patient, exam: value})}}
          />
        </div>
        <TextField
            style={{left: '10%', top: '48%', position:"absolute"}}
            value={patient.examdate}
            onChange={(value) => {setPatient({...patient, examdate: value.target.value})}}
            label = "Exam date"
            helperText = "Enter the exam date"
            type = "date"
        />
        <TextField
            style={{left: '35%', top: '48%', position:"absolute"}}
            value={patient.patientid}
            onChange={(value) => {setPatient({...patient, patientid: value.target.value})}}
            label = "Patient ID"
            placeholder = ""
            helperText = "Press the button to generate"
        />
        <Button style={{left: '60%', top: '48%', position:"absolute"}} 
                onClick={() => {setPatient({...patient, patientid: Math.floor(Math.random()*999999999)})}}
        > Generate ID </Button>
        <Button style={{left: '50%', top: '78%', position:"absolute"}} onClick={onSubmit}> Submit </Button>
      </div>
    </div>


  );
}


export default RegisterAdd;