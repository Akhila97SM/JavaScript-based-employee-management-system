// Receive ID from Another Page

// Get the search parameters from the URL
const searchParams = new URLSearchParams(window.location.search);

// Get the value of the 'id' parameter
const id = searchParams.get('id');

// Store the ID in a variable
const storedId = id;

// Display the stored ID (for demonstration purposes)
console.log('Stored ID:', storedId);
fetchData();

async function fetchData() {
    await fetch(`http://localhost:3000/employees/${storedId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json,"
        },
    })
        .then((data) => {
            return data.json();
        })
        .then((employeObject) => {

          const avatar = document.getElementById("viewDetailsAvatar");
          avatar.src = `http://localhost:3000/employees/${storedId}/avatar`;
          avatar.style.width = "120px";

            document.getElementById("fullname").innerHTML = `${employeObject.salutation}.${employeObject.firstName} ${employeObject.lastName}  `;
            document.getElementById("email").innerHTML = `${employeObject.email}`
            document.getElementById("gender").innerHTML = `${employeObject.gender}`
            document.getElementById("dob").innerHTML = ` ${employeObject.dob}`
            document.getElementById("mobilenum").innerHTML = ` ${employeObject.phone}`
            document.getElementById("qualification").innerHTML = `${employeObject.qualifications}`
            document.getElementById("address").innerHTML = ` ${employeObject.address}`
            document.getElementById("username").innerHTML = `${employeObject.username}`

            const birthdate = ` ${employeObject.dob}`
            console.log(birthdate);
            const [day, month, year] = birthdate.split("-");
            const newDob = `${year}-${month}-${day}`;
            console.log(newDob);

            const AGE = calculateAge(newDob);

            document.getElementById("age").innerHTML = `${AGE}`


        })
}

function calculateAge(dob) {
    const dobDate = new Date(dob);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - dobDate.getFullYear();
    const monthDiff = currentDate.getMonth() - dobDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())) {
        age--;
    }

    console.log(age);
    return age;
}


//  Edit view detail 

function viewEditformOpen() {
    const editDataform = document.getElementById("viewEditData");
    editDataform.style.display = "block";
    const overlay = document.getElementById("overlayPopUP");
    overlay.style.display = "block"; 


   
  
    fetch(`http://localhost:3000/employees/${storedId}`, {
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
      editpreview.src = `http://localhost:3000/employees/${storedId}/avatar`;
      editpreview.style.height = "150px";
  
  
  
    const savedata = document.getElementById("savedata");
    savedata.addEventListener("click", () => {
  
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
      const username = String(firstName) + String(lastName);
      const password = String(firstName) + String(dob);
  
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
  
  
      fetch(`http://localhost:3000/employees/${storedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("edited successdully", data);

          
      // -----------------------------------Img Upload-------------------------------//

      const profileimg = document.getElementById("editupload");
      var imgObject = new FormData();
     imgObject.append("avatar", profileimg.files[0]);
      console.log("img added successfully");


      fetch(`http://localhost:3000/employees/${storedId}/avatar`, {
        method: "POST",
        body: imgObject,
      })
        })
      editformClose();
    });


  }

  function editAvatarPreview() {

    const preview = document.getElementById("editPreview");
    preview.src = URL.createObjectURL(event.target.files[0]);
    preview.style.height = "150px";
  
  }

  function viewEditformClose() {
    const editDataform = document.getElementById("viewEditData");
    editDataform.style.display = "none";
    const overlay = document.getElementById("overlayPopUP");
    overlay.style.display = "none";
  }

//  Delete view detail 

function viewDeleteFormopen(){
    const deleteForm = document.getElementById("viewDelData");
    deleteForm.style.display = "block";
    const overlay = document.getElementById("overlayPopUP");
    overlay.style.display = "block";
}

function viewDeleteFormclose(){
    const deleteForm = document.getElementById("viewDelData");
    deleteForm.style.display = "none";
    const overlay = document.getElementById("overlayPopUP")
    overlay.style.display = "none";
}


function editFormOpen(storedId) {
    // console.log(editId);
    const editDataform = document.getElementById("editData");
    editDataform.style.display = "block";
    const overlay = document.getElementById("overlayPopUP");
    overlay.style.display = "block";
  
    fetch(`http://localhost:3000/employees/${storedId}`, {
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
      editpreview.src = `http://localhost:3000/employees/${storedId}/avatar`;
      editpreview.style.height = "150px";
  
  
  
    const savedata = document.getElementById("savedata");
    savedata.addEventListener("click", () => {
  
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
      const username = String(firstName) + String(lastName);
      const password = String(firstName) + String(dob);
  
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
  
  
      fetch(`http://localhost:3000/employees/${storedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("edited successdully", data);
        })
      editformClose();
    });
  }


  //-----------------  delete data ------------------//

function passid(id) {
    console.log("id passed", id);
    document.getElementById("delBtn").addEventListener("click", () => {
      deleteid(id);
    })
  }
  
  function deleteid() {
    fetch(`http://localhost:3000/employees/${storedId}`, {
      method: "DELETE",
  
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DELETE COMPLETED");
      })
      .catch((error) => {
        console.log("error in deletion");
      });
  
      viewDeleteFormclose();
      window.location.href = "index.html";
  }
  


  




  


