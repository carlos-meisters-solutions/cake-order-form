$(function () {
    bindForm();
});

function bindForm() {
    let form = $("#cakeForm");
    let submitButton = form.find("button[type=submit]");

    $(submitButton).on("click", function (event) {
        event.preventDefault();
        submitFormToApi(form);
    });
}

function submitFormToApi(form) {
    let formUrl = form.attr("action");
    let data = form.serializeArray();

    let json = JSON.stringify(convertArray(data));

    $.ajax({
        type: "POST",
        url: formUrl,
        contentType: "application/json",
        data: json,
        success: function (response) {
            if (response !== undefined) {
                Swal.fire("Pedido enviado com sucesso");
            } else {
                showFailWhaleMessage();
            }
        },
        error: function (error) {
            console.log(error.responseText);
            showFailWhaleMessage();
        }
    });

}

function convertArray(array) {
    let object = {};

    for (const index in array) {
        if (Object.hasOwnProperty.call(array, index)) {
            const inputForm = array[index];
            object[inputForm.name] = inputForm.value;
        }
    }
    return object;
}

function showFailWhaleMessage() {
    Swal.fire({
        icon: "error",
        text: "Fail whale..."
    });
}