var firstname_state = false;
var lastname_state = false;
var email_state = false;
var phone_state = false;
var id_state = false;
var id_focus = 0;
var editData = {
  id: null,
  firstname: null,
  lastname: null,
  phone: null,
  email: null,
  insert_time: null,
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function confirmDelete(id) {
  globalThis.id_focus = id;
  $("#modalDelete").modal();
  $("div.modal-header").css("background-color", "#EB0000");
  const deleteData = document.getElementsByClassName("modal-body");
  $("div.modal-header").html(
    `<h5 class=' text-center modal-title'>Delete Data Row At ${id} </h5><button class="close" data-dismiss="modal">
    <span aria-hidden="true">&times;</span></button>`
  );
  deleteData[1].innerHTML = `<h5>Do you want to delete data in any row ${id} ?</h5>`;
}

function confirmEdit(id) {
  setModalEdit(id);
  setCorrectState();
  // console.log(id);
  editData["id"] = id;
  const trChildren = document.getElementById(id).children;
  const clone = [];
  for (var i = 0; i < trChildren.length; i++) {
    clone[i] = trChildren[i].innerText;
  }
  let j = 0;
  for (const [key, value] of Object.entries(editData)) {
    editData[key] = clone[j++];
  }
  document.getElementById("firstname").value = editData["firstname"];
  document.getElementById("lastname").value = editData["lastname"];
  document.getElementById("phone").value = editData["phone"];
  document.getElementById("email").value = editData["email"];
  setFormSuccessEdit(
    document.getElementById("firstname"),
    "Firstname is available"
  );
  setFormSuccessEdit(
    document.getElementById("lastname"),
    "Lastname is available"
  );
  setFormSuccessEdit(document.getElementById("phone"), "Phone is available");
  setFormSuccessEdit(document.getElementById("email"), "Email is available");
}

function setCorrectState() {
  firstname_state = true;
  lastname_state = true;
  email_state = true;
  phone_state = true;
  id_state = true;
}

function setModalEdit(id) {
  setReset();
  try {
    document.getElementById("modalEdit").id;
  } catch (err) {
    document.getElementById("modalAdd").id = "modalEdit";
  }
  $("div.modal-header").css("background-color", "#289AFF");
  $("div.modal-header").html(
    `<h5 class=' text-center modal-title'>Edit Data Row At ${id} </h5><button class="close" data-dismiss="modal">
    <span aria-hidden="true">&times;</span></button>`
  );
  $("#submit")
    .children("i")
    .addClass("far fa-user-cog ")
    .removeClass("fas fa-save ");
  $("#submit").addClass("btn btn-primary").removeClass("btn btn-success");
  $("#modalEdit").modal();
}

function setReset() {
  setState();
  $(":input").not(":first").val("");
  $(":input").removeClass("is-valid");
  $(":input").removeClass("is-invalid");
  $("span.text").text("");
}

function setState() {
  firstname_state = false;
  lastname_state = false;
  email_state = false;
  phone_state = false;
  id_state = false;
}

function setFormSuccessEdit(input, message) {
  const span = input.parentElement.querySelector("span");
  input.className = "form-control is-valid";
  span.style.color = "green";
  span.innerText = message;
}

$(document).ready(function () {
  window.person = loadCountPerson();
  loadData();

  $("#add").click(function () {
    setModalAdd();
  });

  $("#firstname").change(function () {
    const firstname = this.value.trim();
    if (isFirstname(firstname)) {
      firstname_state = true;
      setSuccess(this, "Firstname is available");
    } else {
      firstname_state = false;
      setError(this, "Firstname is not available");
    }
  });

  $("#lastname").change(function () {
    const lastname = this.value.trim();
    if (isLastname(lastname)) {
      lastname_state = true;
      setSuccess(this, "Lastname is available");
    } else {
      lastname_state = false;
      setError(this, "Lastname is not available");
    }
  });

  $("#email").change(function () {
    const email = this.value.trim();
    if (isEmail(email)) {
      const data = JSON.stringify({ email: email });
      $.ajax({
        url: "http://localhost/CRUD/checkcrud.php",
        contentType: "application/json",
        type: "post",
        data: data,
        success: (response) => {
          if (response == "no_have") {
            email_state = true;
            setSuccess(this, "Email is available");
          } else {
            email_state = false;
            setError(this, "Email is not available");
          }
        },
      });
    } else {
      email_state = false;
      setError(this, "Email is not available");
    }
  });

  $("#phone").change(function () {
    const phone = this.value.trim();
    if (isPhone(phone)) {
      const data = JSON.stringify({ phone: phone });
      $.ajax({
        url: "http://localhost/CRUD/checkcrud.php",
        contentType: "application/json",
        type: "post",
        data: data,
        success: (response) => {
          if (response == "no_have") {
            phone_state = true;
            setSuccess(this, "Phone is available");
          } else {
            phone_state = false;
            setError(this, "Phone is not available");
          }
        },
      });
    } else {
      phone_state = false;
      setError(this, "Phone is not available");
    }
  });

  $("#search").on("keyup", function () {
    var searchText = $(this).val().trim();
    if (searchText.length > 0) {
      $.ajax({
        url: "http://localhost/CRUD/fetch.php",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({ search: searchText }),
        success: (response) => {
          $("#loaddata").html(response);
        },
      });
    } else {
      loadData();
    }
  });

  $("#submit").click(function (e) {
    e.preventDefault();
    if (!isSubmit()) return;
    if (id_state == true) {
      var text = "Update";
      editData["firstname"] = $("#firstname").val();
      editData["lastname"] = $("#lastname").val();
      editData["email"] = $("#email").val();
      editData["phone"] = $("#phone").val();
      editData["insert_time"] = moment(new Date()).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      var data = JSON.stringify(editData);
    } else {
      var text = "Add";
      var data = JSON.stringify({
        firstname: $("#firstname").val(),
        lastname: $("#lastname").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
      });
    }
    $.ajax({
      url: "http://localhost/CRUD/checkcrud.php",
      contentType: "application/json",
      async: false,
      type: "post",
      data: data,
      success: (response) => {
        if (response == "save") {
          if (id_state == true) {
            setEditUpdate();
          } else setUpdate();
          setReset();
          swal({
            title: "Success!",
            text: `You have successfully ${text} information!`,
            icon: "success",
            button: "Okay",
          });
        }
      },
    });
  });

  $("#delete").click(function () {
    const data = { id: globalThis.id_focus };
    $.ajax({
      url: "http://localhost/CRUD/modify_data.php",
      type: "post",
      data: data,
      async: false,
      data: JSON.stringify(data),
      success: (response) => {
        $(`#${globalThis.id_focus}`).remove();
        $("#modalDelete").modal("hide");
      },
    });
  });

  $("#canceldelete").click(function () {
    $("#modalDelete").modal("hide");
  });

  function loadData() {
    $.ajax({
      url: "http://localhost/CRUD/fetch.php",
      method: "POST",
      success: function (response) {
        $("#loaddata").html(response);
      },
    });
  }

  function loadCountPerson() {
    $.ajax({
      url: "http://localhost/CRUD/modify_data.php",
      async: false,
      method: "GET",
      success: function (response) {
        if (response > 0) {
          window.person = response;
          // console.log(window.person);
          // console.log(response);
        } else {
          // window.person = response;
          // console.log(response);
        }
      },
      error: function (xhr, textStatus) {
        alert(textStatus);
      },
    });
    return window.person;
  }

  function setModalAdd() {
    setReset();
    try {
      document.getElementById("modalAdd").id;
    } catch (err) {
      document.getElementById("modalEdit").id = "modalAdd";
    }
    $("div.modal-header").css("background-color", "#00BC42");
    $("div.modal-header").html(
      `<h5 class=' text-center modal-title'>Add Into Database</h5><button class="close" data-dismiss="modal">
      <span aria-hidden="true">&times;</span></button>`
    );
    $("#submit")
      .children("i")
      .addClass("fas fa-save")
      .removeClass("far fa-user-cog");
    $("#submit").addClass("btn btn-success").removeClass("btn btn-primary");
    $("#modalAdd").modal();
  }

  function setError(input, message) {
    const span = input.parentElement.querySelector("span");
    input.className = "form-control is-invalid";
    span.style.color = "red";
    span.innerText = message;
  }

  function setUpdate() {
    window.person = loadCountPerson();
    // console.log(window.person);

    const keys = [0, 1, 2, 3, 4, 5];
    const values = [
      window.person,
      capitalizeFirstLetter(document.getElementById("firstname").value),
      capitalizeFirstLetter(document.getElementById("lastname").value),
      document.getElementById("phone").value,
      document.getElementById("email").value,
      moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    const td = [],
      tdValue = [];
    const map = new Map();
    for (var i = 0; i < keys.length; i++) {
      map.set(keys[i], values[i]);
    }

    const tr = document.createElement("TR");
    tr.setAttribute("id", window.person);
    document.getElementById("datatable").appendChild(tr);

    for (let key of map.keys()) {
      td[key] = document.createElement("TD");
      tdValue[key] = document.createTextNode(map.get(key));
      td[key].appendChild(tdValue[key]);
      document.getElementById(window.person).appendChild(td[key]);
    }

    tdManage = document.createElement("TD");

    var id = window.person;

    buttonEdit = document.createElement("button");
    buttonEdit.className = "btn btn-primary fas fa-edit mx-2";
    buttonEdit.addEventListener("click", function () {
      confirmEdit(id);
    });

    buttonDelete = document.createElement("button");
    buttonDelete.className = "btn btn-danger fas fa-trash-alt mx-2";
    buttonDelete.addEventListener("click", function () {
      confirmDelete(id);
    });

    tdManage.appendChild(buttonEdit);
    tdManage.appendChild(buttonDelete);
    document.getElementById(window.person).appendChild(tdManage);

    if (document.getElementById("notdata")) {
      $("#notdata").remove();
    }
    $("#modalAdd").modal("hide");
  }

  function setEditUpdate() {
    const trChildren = document.getElementById(editData["id"]).children;
    let i = 0;
    for (const [key, value] of Object.entries(editData)) {
      trChildren[i++].innerText = value;
    }
    $("#modalEdit").modal("hide");
  }

  function setSuccess(input, message) {
    const span = input.parentElement.querySelector("span");
    input.className = "form-control is-valid";
    span.style.color = "green";
    span.innerText = message;
  }

  const isFirstname = (firstname) => /^[a-zA-Z]{1,30}$/.test(firstname);
  const isLastname = (lastname) => /^[a-zA-Z]{1,30}$/.test(lastname);

  const isEmail = (email) =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  const isPhone = (phone) =>
    /^(([0-9]{3}))+-([0-9]{3})+-([0-9]{4})$/.test(phone);

  const isSubmit = () => {
    if (
      checkStateFirstname() &&
      checkStateLastname() &&
      checkStatePhone() &&
      checkStateEmail()
    )
      return true;
    return false;
  };

  const checkStateFirstname = () => {
    if (firstname_state == false) {
      $("#firstname").val("");
      $("#firstname").focus();
      return false;
    }
    return true;
  };

  const checkStateLastname = () => {
    if (lastname_state == false) {
      $("#lastname").val("");
      $("#lastname").focus();
      return false;
    }
    return true;
  };

  const checkStateEmail = () => {
    if (email_state == false) {
      $("#email").val("");
      $("#email").focus();
      return false;
    }
    return true;
  };

  const checkStatePhone = () => {
    if (phone_state == false) {
      $("#phone").val("");
      $("#phone").focus();
      return false;
    }
    return true;
  };
});
