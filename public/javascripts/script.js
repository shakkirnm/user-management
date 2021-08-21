function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInp");
    filter = input.value.toUpperCase();
    table = document.getElementById("userTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

  function adminEmailCheck(){
    var email = document.getElementById("adminEmailText").value
    const letters = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    if(email == ""){
      document.getElementById("adminEmailSpan").innerHTML="Field is required"
      return false
    }else if(email.match(letters)){
      document.getElementById("adminEmailSpan").innerHTML=""
      return true
    }else{
      document.getElementById("adminEmailSpan").innerHTML="Enter valid email"
      return false
    }

  }
  function adminPassCheck(){
    var pass =document.getElementById("adminPassText").value
    var len = pass.length
    if(pass ==""){
      document.getElementById('adminPassSpan').innerHTML="Field is required"
      return false
    }else if(len<=3){
      document.getElementById('adminPassSpan').innerHTML="Password is Too short"
      return false
    }else{
      document.getElementById("adminPassSpan").innerHTML=""
      return true
    }
  }

  function adminLoginAllCheck(){
    if(adminPassCheck() && adminEmailCheck()){
      return true
    }else{
      adminPassCheck() 
      adminEmailCheck()
      

      event.preventDefault()
      return false

    }

  }



function addNameCheck(){
  var name = document.getElementById('addNameInput').value
  var letters = /^[a-zA-Z\s]*$/;
  if(name ==""){
    document.getElementById("addNameSpan").innerHTML="Field is required"
    return false
  }else if(name.match(letters)){
    document.getElementById("addNameSpan").innerHTML=""
    return true
  }else{
    document.getElementById("addNameSpan").innerHTML="Enter valid name"
    return false
  }
}

function addEmailCheck(){
  var email = document.getElementById("addEmailText").value
  const letters = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
  if(email == ""){
    document.getElementById("addEmailSpan").innerHTML="Field is required"
    return false
  }else if(email.match(letters)){
    document.getElementById("addEmailSpan").innerHTML=""
    return true
  }else{
    document.getElementById("addEmailSpan").innerHTML="Enter valid email"
    return false
  }

}
function addPassCheck(){
  var pass =document.getElementById("addPassText").value
  var len = pass.length
  if(pass ==""){
    document.getElementById('addPassSpan').innerHTML="Field is required"
    return false
  }else if(len<=3){
    document.getElementById('addPassSpan').innerHTML="Password is Too short"
    return false
  }else{
    document.getElementById("addPassSpan").innerHTML=""
    return true
  }
}

function addUserAllCheck(){
  if(addNameCheck() && addEmailCheck() && addPassCheck()){
    return true
  }else{
    addNameCheck() 
    addEmailCheck()
    addPassCheck()
    console.log("hlooooooo");

    event.preventDefault()
    return false

  }

}
