
function addformOpen() {
  const addDataform = document.getElementById("addData");
  addDataform.style.display = "block";
  const overlay = document.getElementById("overlayPopUP");
  overlay.style.display = "block";

}


function addformClose() {
  const addDataformclose = document.getElementById("addData");
  addDataformclose.style.display = "none";
  const overlay = document.getElementById("overlayPopUP");
  overlay.style.display = "none";

}


function editformClose() {
  const editDataform = document.getElementById("editData");
  editDataform.style.display = "none";
  const overlay = document.getElementById("overlayPopUP");
  overlay.style.display = "none";
}


function deleteForm() {
  const delDataform = document.getElementById("delData");
  delDataform.style.display = "block";
  const overlay = document.getElementById("overlayPopUP");
  overlay.style.display = "block";
}


function deleteFormclose() {
  const delDataform = document.getElementById("delData");
  delDataform.style.display = "none";
  const overlay = document.getElementById("overlayPopUP");
  overlay.style.display = "none";
}



fetchData();
let alldata = [];


//!==================================FETCHING DATA=======================================//
function fetchData() {
  fetch("http://localhost:3000/employees")
    .then((fetchData) => {
      return fetchData.json();
    })


    .then((employeeData) => {
      console.log("DATA IS ", employeeData);
      alldata = employeeData.reverse();

      console.log("fetch done", alldata);

      displayData(alldata);
      createBtn();
      

    })
}


function displayData(alldata, start) {



  let tableData = "";

  alldata.map((values) => {
    tableData = tableData + ` <tr>
        <th scope="row" class="table-num">#${start + 1}</th>

        <td><img src="http://localhost:3000/employees/${values.id}/avatar" class="rounded-5 m-2" height="30px"> ${values.salutation}. ${values.firstName} ${values.lastName} </td>
        <td>${values.email} </td>
        <td>${values.phone}</td>
        <td>${values.gender}</td>
        <td>${values.dob}</td>
        <td>${values.country}</td>
        <td>
          <div class="dropdown">
            <a class="btn btn-secondary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-ellipsis"></i>
            </a>

            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="index2.html?id=${values.id}"><span><i class="fa-regular fa-eye "
                      style="color: #b9babb;"></i></span>View Details</a></li>
              <li onclick="editFormOpen('${values.id}')"><a class="dropdown-item" href="#"><span><i class="fa-solid fa-pencil" 
                      style="color: #b9babb;"></i></span>Edit</a></li>
              <li onclick="deleteForm()"><a class="dropdown-item" href="#" onclick="passid('${values.id}')" ><span><i class="fa-solid fa-trash"
                      style="color:  #b9babb;"></i></span>Delete</a></li>
            </ul>
          </div>
        </td>
      </tr>`;
    start++;
  })
  // console.log("data row",tableData);
  document.getElementById("tableBody").innerHTML = tableData;
  console.log("display data successfull");
}



//--------- post data--------- //


function addEmpdata() {
  const salutation = document.getElementById("Salutation").value;
  const firstName = document.getElementById("frst-Name").value;
  const lastName = document.getElementById("last-Name").value;
  const emailAddress = document.getElementById("email-address").value;
  const mobileNumber = document.getElementById("mobile-number").value;
  const dob = document.getElementById("dob").value;
  const qualification = document.getElementById("qualification").value;
  const address = document.getElementById("address").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const pinzip = document.getElementById("pinzip").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  //gender
  const gender = document.querySelector('input[name = "gender"]:checked').value;


  //DOB
  const dateofBirth = document.getElementById("dob").value;
  const [year, month, day] = dob.split("-");
  const newDob = `${day}-${month}-${year}`;


  // creating an object

  var userData = {
    salutation: salutation,
    firstName: firstName,
    lastName: lastName,
    email: emailAddress,
    phone: mobileNumber,
    dob: newDob,
    gender: gender,
    qualifications: qualification,
    address: address,
    city: city,
    state: state,
    pin: pinzip,
    country: country,
    username: username,
    password: password,
  }

  fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),

  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Emp Added succesfully", data);


      userData.id = data.id;
      console.log("new emp", userData);

      // -----------------------------------Img Upload-------------------------------//

      const profileimg = document.getElementById("upload");
      var imgObject = new FormData();
      imgObject.append("avatar", profileimg.files[0]);
      console.log("img added successfully");


      fetch(`http://localhost:3000/employees/${data.id}/avatar`, {
        method: "POST",
        body: imgObject,
      })

      alldata.unshift(userData);
      displayData(alldata);
      createBtn();
    })
    .then(()=> {
    
          Swal.fire({
            icon: "success",
            title: "Employee Added Successfully",
            showConfirmButton: false,
            timer: 1500 
          });
        
    })
}



function avatarPreview() {

  const preview = document.getElementById("imgpreview");
  preview.src = URL.createObjectURL(event.target.files[0]);
  preview.style.height = "150px";

}


const addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", () => {
 const valid = validation();
 console.log(valid);

 if(!valid){
  return;
 }
 else{
    addEmpdata()
  }
  addformClose();
  console.log("EMP ADDED SUCESS");

});

//-----------------  delete data ------------------//

function passid(id) {
  console.log("id passed", id);
  document.getElementById("delBtn").addEventListener("click", () => {
    deleteid(id);
  })
}

function deleteid(id) {
  fetch(`http://localhost:3000/employees/${id}`, {
    method: "DELETE",

  })
    .then((response) => response.json())
    .then((data) => {
      console.log("DELETE COMPLETED");
    })
    .catch((error) => {
      console.log("error in deletion");
    });
    deleteFormclose();

}


// -------------------------------Edit data-----------------------------------//


function editFormOpen(editId) {
  // console.log(editId);
  const editDataform = document.getElementById("editData");
  editDataform.style.display = "block";
  const overlay = document.getElementById("overlayPopUP");
  overlay.style.display = "block";

  fetch(`http://localhost:3000/employees/${editId}`, {
    method: "Get",
    headers: {
      "Content-Type": "application/json,"
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((editdetails) => {

      document.getElementById("editSalutation").value = editdetails.salutation;
      document.getElementById("editFirstName").value = editdetails.firstName;
      document.getElementById("editLastName").value = editdetails.lastName;
      document.getElementById("editEmailaddress").value = editdetails.email;
      document.getElementById("editMobileNumber").value = editdetails.phone;
      document.getElementById("editQualification").value = editdetails.qualifications;
      document.getElementById("editAddress").value = editdetails.address;
      document.getElementById("editCountry").value = editdetails.country;
      document.getElementById("editState").value = editdetails.state;
      document.getElementById("editCity").value = editdetails.city;
      document.getElementById("editPin").value = editdetails.pin;
      document.getElementById("editUsername").value = editdetails.username;
      document.getElementById("editPassword").value = editdetails.password;

      // Dob

      const [day, month, year] = editdetails.dob.split("-");
      const newDob = `${year}-${month}-${day}`;
      document.getElementById("editdob").value = newDob;
      console.log(newDob);

      // Gender

      document.querySelector(`input[name="editgender"][value='${editdetails.gender}']`).checked = true;

    })

  // edit page image preview

  const editpreview = document.getElementById("editPreview");
  editpreview.src = `http://localhost:3000/employees/${editId}/avatar`;
  editpreview.style.height = "150px";



  const savedata = document.getElementById("savedata");
  savedata.addEventListener("click", () => {

    editvalidation();

    const salutation = document.getElementById("editSalutation").value;
    const firstName = document.getElementById("editFirstName").value;
    const lastName = document.getElementById("editLastName").value;
    const emailAddress = document.getElementById("editEmailaddress").value;
    const mobileNumber = document.getElementById("editMobileNumber").value;
    const dob = document.getElementById("editdob").value;
    const qualification = document.getElementById("editQualification").value;
    const address = document.getElementById("editAddress").value;
    const country = document.getElementById("editCountry").value;
    const state = document.getElementById("editState").value;
    const city = document.getElementById("editCity").value;
    const pinzip = document.getElementById("editPin").value;
    const username = document.getElementById("editUsername").value;
    const password = document.getElementById("editPassword").value;

    //gender
    const gender = document.querySelector('input[name = "editgender"]:checked').value;


    //DOB
    const [year, month, day] = dob.split("-");
    const newDob = `${day}-${month}-${year}`;


    // creating an object

    var editedData = {
      salutation: salutation,
      firstName: firstName,
      lastName: lastName,
      email: emailAddress,
      phone: mobileNumber,
      dob: newDob,
      gender: gender,
      qualifications: qualification,
      address: address,
      city: city,
      state: state,
      pin: pinzip,
      country: country,
      username: username,
      password: password,
    }
    console.log("edited data", editedData);


    fetch(`http://localhost:3000/employees/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("edited successfully", data);


        // -----------------------------------Img Upload-------------------------------//

        const profileimg = document.getElementById("editupload");
        var imgObject = new FormData();
        imgObject.append("avatar", profileimg.files[0]);
        console.log("img added successfully");


        fetch(`http://localhost:3000/employees/${editId}/avatar`, {
          method: "POST",
          body: imgObject,
        })
        // .then((response) => {
        //   console.log(response);
        //   if (response.ok) {
        //     Swal.fire({
        //       icon: "success",
        //       title: "EDIT EMPLOYEE SUCCESSFULL",
        //       showConfirmButton: false,
        //       timer: 2000,
        //     });
        //   }

        // })
      })
    editformClose();
  });
}

function editAvatarPreview() {

  const preview = document.getElementById("editPreview");
  preview.src = URL.createObjectURL(event.target.files[0]);
  preview.style.height = "150px";

}

// const savedata = document.getElementById("addbtn");
// addbtn.addEventListener("click", () => {
//   validation(),
//     addEmpdata()
// });

// PAGINATION  //

const numshowbtn = document.getElementById("numshowbtn");
numshowbtn.style.display = "flex";
numshowbtn.style.gap = "2px";

const employeeNumber = document.getElementById("employeeNumber");

function createBtn() {
  const emplist = employeeNumber.value;
  // console.log("emplist",emplist);
  // console.log(typeof(emplist));
  const emplistnum = Number(emplist);
  // console.log(typeof(emplistnum));


  const numofbtn = Math.ceil(alldata.length / emplistnum);
  console.log(numofbtn);

  let btnstore = "";
  for (let i = 0; i < numofbtn; i++) {
    btnstore = btnstore + `<li onclick="showtabledata(${i})" class="page-item"><a class="page-link" href="#">${i + 1}</a></li>`

  }
  numshowbtn.innerHTML = btnstore;

  showtabledata(0);

}

let currentpage;
// console.log(currentpage);

function showtabledata(nextlist) {
  currentpage = nextlist;
  // console.log("akli", currentpage);
  const emplist = employeeNumber.value;
  const emplistnum = Number(emplist);
  const numofbtn = Math.ceil(alldata.length / emplistnum);
  // console.log(numofbtn);

  let numofdata = [];


  let combinestart = nextlist * emplistnum;
  for (let i = combinestart; i < combinestart + emplistnum; i++) {

    // to avoid empty array
    if (alldata[i] == null) {
      break;
    }
    else {
      numofdata.push(alldata[i])
    }


  }

  displayData(numofdata, combinestart);
  highlight(currentpage);

}

function fwdbtn() {

  const emplist = employeeNumber.value;
  const emplistnum = Number(emplist);
  const numofbtn = Math.ceil(alldata.length / emplistnum);

  if (currentpage < numofbtn - 1) {
    currentpage++;
    showtabledata(currentpage);
  }
  else {
    showtabledata(currentpage);
  }

}

function bwdbtn() {
  const emplist = employeeNumber.value;
  const emplistnum = Number(emplist);
  const numofbtn = Math.ceil(alldata.length / emplistnum);
  //   if(((numofbtn-1)- currentpage)>=0){
  //     currentpage--;
  //     showtabledata(currentpage);
  //   }
  //  else{

  //  }
  if (currentpage > 0) {
    currentpage--;
    showtabledata(currentpage)
  }
  // else{
  //   showtabledata(currentpage)
  // }

}

function highlight(currentPage) {

  const navButtons = document.getElementById("numshowbtn");
  let button = navButtons.querySelectorAll("a");
  button.forEach((a) => {
    if (a.textContent == currentPage + 1) {
      a.classList.add("highlightBtn");
    }
    else {
      a.classList.remove("highlightBtn");
    }
  })

}

// Add validation


function validation() {

  let isvalid = true;

  const error = document.getElementsByClassName("error");


  const salutation = document.getElementById("Salutation");
  const firstName = document.getElementById("frst-Name");
  const lastName = document.getElementById("last-Name");
  const emailAddress = document.getElementById("email-address");
  const mobileNumber = document.getElementById("mobile-number");
  const dob = document.getElementById("dob");
  const qualification = document.getElementById("qualification");
  const address = document.getElementById("address");
  const country = document.getElementById("country");
  const state = document.getElementById("state");
  const city = document.getElementById("city");
  const pinzip = document.getElementById("pinzip");
  const male = document.getElementById("exampleRadios1");
  const female = document.getElementById("exampleRadios2")
  const upload = document.getElementById("upload");
  const username = document.getElementById("username");
  const password = document.getElementById("password");


  const input = function (inputdata, num, msg) {
    if (inputdata.value === "") {
      error[num].innerHTML = msg;
       isvalid = false;
    }
    else {
      error[num].innerHTML = "";
    }
  }
  // input(upload, 0, "upload photo");
  input(salutation, 1, "enter Salutation");
  input(firstName, 2, "enter your first name");
  input(lastName, 3, "enter your last name");

  //  input(mobileNumber,4,"enter your mobile number");

  input(username, 6, "enter your username");
  input(password, 7, "enter your password");
  input(dob, 8, "enter your dob");
  input(qualification, 10, "enter your qualification");
  input(address, 11, "enter your address");
  input(country, 12, "enter your country");
  input(state, 13, "enter your state");
  input(city, 14, "enter your city");
  input(pinzip, 15, "enter your pinzip");

  const genderinput = function () {
    if (male.checked === false && female.checked === false) {
      error[9].innerHTML = "select your gender";
      isvalid = false;
    }
    else{
      error[9].innerHTML = "";
    }

  }

  genderinput();

  const mobileinput = function (inputdata, num, msg) {

    let maxnum = inputdata.value.trim();

    if (inputdata.value === "") {

      error[num].innerHTML = msg;
      isvalid = false;
    }

    else if ((maxnum.length) != 10) {
      error[num].innerHTML = "enter valid number";
       isvalid = false;
    }
    else {
      error[num].innerHTML = "";
    }


  }

  mobileinput(mobileNumber, 5, "enter mobile number");

  const disablemsg = function (num) {
    error[num].innerHTML = "";
  }

  const diablegenderinput = function () {
    if (male.checked === true || female.checked === true) {
      error[9].innerHTML = "";
      

    }

  }
  male.addEventListener("input", () => { diablegenderinput() });
  female.addEventListener("input", () => { diablegenderinput() });

  diablegenderinput();

  const emailinput = function (inputdata, num, msg) {
    let emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mailvalid = inputdata.value.trim();
    if (inputdata.value === "") {
      error[num].innerHTML = msg;
      isvalid = false;
    }
    else if (!(mailvalid.match(emailregex))) {
      error[num].innerHTML = "enter a valid email"
      isvalid = false;

    }
    else {
      error[num].innerHTML = "";
    }
  }
  emailinput(emailAddress, 4, "enter your email address");

  upload.addEventListener("input", () => { disablemsg(0) })
  salutation.addEventListener("input", () => { disablemsg(1) });
  firstName.addEventListener("input", () => { disablemsg(2) });
  lastName.addEventListener("input", () => { disablemsg(3) });
  emailAddress.addEventListener("input", () => { disablemsg(4) });
  mobileNumber.addEventListener("input", () => { disablemsg(5) });
  username.addEventListener("input", () => { disablemsg(6) });
  password.addEventListener("input", () => { disablemsg(7) });
  dob.addEventListener("input", () => { disablemsg(8) });
  qualification.addEventListener("input", () => { disablemsg(10) });
  address.addEventListener("input", () => { disablemsg(11) });
  country.addEventListener("input", () => { disablemsg(12) });
  state.addEventListener("input", () => { disablemsg(13) });
  city.addEventListener("input", () => { disablemsg(14) });
  pinzip.addEventListener("input", () => { disablemsg(15) });
  // disablemsg();
 return isvalid;
}

// Search

const searchbar = document.getElementById("searchbar");
const tableBody = document.getElementById("tableBody");

// const firstName = document.getElementById("frst-Name");
// const lastName = document.getElementById("last-Name");
// const emailAddress = document.getElementById("email-address");
// const mobileNumber = document.getElementById("mobile-number");

let searcharray = [];

const search = function () {
  var searchinput = searchbar.value.toUpperCase();
  if (searchinput !== "") {
    searcharray = [];

    for (let i = 0; i < alldata.length; i++) {
      // console.log("akhila",alldata);
      let firstName = alldata[i].firstName.toUpperCase()
      let lastName = alldata[i].lastName.toUpperCase()



      if (firstName.includes(searchinput) || lastName.includes(searchinput)) {
        searcharray.push(alldata[i]);
      }
      else {
        tableBody.innerHTML = "";
      }

    }
    displayData(searcharray, 0)

  }
  else {
    showtabledata(0);
  }
}

// searchbar.addEventListener("keyup",search);

// Edit validation

function editvalidation() {

  const editerror = document.getElementsByClassName("editerror");



  const salutation = document.getElementById("editSalutation");
  const firstName = document.getElementById("editFirstName");
  const lastName = document.getElementById("editLastName");
  const emailAddress = document.getElementById("editEmailaddress");
  const mobileNumber = document.getElementById("editMobileNumber");
  const dob = document.getElementById("editdob");
  const qualification = document.getElementById("editQualification");
  const address = document.getElementById("editAddress");
  const country = document.getElementById("editCountry");
  const state = document.getElementById("editState");
  const city = document.getElementById("editCity");
  const pinzip = document.getElementById("editPin");
  const male = document.getElementById("editgendermale");
  const female = document.getElementById("editgenderfemale");
  const upload = document.getElementById("editupload");
  const username = document.getElementById("editUsername");
  const password = document.getElementById("editPassword");





  const input = function (inputdata, num, msg) {
    if (inputdata.value === "") {
      editerror[num].innerHTML = msg;
    }
    else {
      editerror[num].innerHTML = "";
    }
  }
  // input(upload, 0, "upload photo");
  input(salutation, 1, "enter Salutation");
  input(firstName, 2, "enter your first name");
  input(lastName, 3, "enter your last name");

  //  input(mobileNumber,4,"enter your mobile number");

  input(username, 6, "enter your username");
  input(password, 7, "enter your password");
  input(dob, 8, "enter your dob");
  input(qualification, 10, "enter your qualification");
  input(address, 11, "enter your address");
  input(country, 12, "enter your country");
  input(state, 13, "enter your state");
  input(city, 14, "enter your city");
  input(pinzip, 15, "enter your pinzip");

  const genderinput = function () {
    if (male.checked === false && female.checked === false) {
      editerror[9].innerHTML = "select your gender";

    }

  }

  genderinput();

  const mobileinput = function (inputdata, num, msg) {
    let maxnum = inputdata.value.trim();
    if (inputdata.value === "") {
      editerror[num].innerHTML = msg;
    }
    else if ((maxnum.length)!= 10) {
      editerror[num].innerHTML = "enter valid number";
    }
    else {
      editerror[num].innerHTML = "";
    }


  }

  mobileinput(mobileNumber, 5, "enter mobile number");

  const disablemsg = function (num) {
    editerror[num].innerHTML = "";
  }

  const diablegenderinput = function () {
    if (male.checked === true || female.checked === true) {
      editerror[9].innerHTML = "";

    }

  }
  male.addEventListener("input", () => { diablegenderinput() });
  female.addEventListener("input", () => { diablegenderinput() });

  diablegenderinput();

  const emailinput = function (inputdata, num, msg) {
    let emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let mailvalid = inputdata.value.trim();
    if (inputdata.value === "") {
      editerror[num].innerHTML = msg;
    }
    else if (!(mailvalid.match(emailregex))) {
      editerror[num].innerHTML = "enter a valid email";
    }
    else {
      editerror[num].innerHTML = "";
    }
  }
  emailinput(emailAddress, 4, "enter your email address");

  upload.addEventListener("input", () => { disablemsg(0) })
  salutation.addEventListener("input", () => { disablemsg(1) });
  firstName.addEventListener("input", () => { disablemsg(2) });
  lastName.addEventListener("input", () => { disablemsg(3) });
  emailAddress.addEventListener("input", () => { disablemsg(4) });
  mobileNumber.addEventListener("input", () => { disablemsg(5) });
  username.addEventListener("input", () => { disablemsg(6) });
  password.addEventListener("input", () => { disablemsg(7) });
  dob.addEventListener("input", () => { disablemsg(8) });
  qualification.addEventListener("input", () => { disablemsg(10) });
  address.addEventListener("input", () => { disablemsg(11) });
  country.addEventListener("input", () => { disablemsg(12) });
  state.addEventListener("input", () => { disablemsg(13) });
  city.addEventListener("input", () => { disablemsg(14) });
  pinzip.addEventListener("input", () => { disablemsg(15) });
  // disablemsg();

}




























