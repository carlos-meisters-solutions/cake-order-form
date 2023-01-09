$(function () {
    bindForm();
});

function bindForm() {
    let form = $("#cakeForm");
    validateForm(form);
}

function submitFormToApi(form) {
    let formUrl = $(form).attr("action");
    let data = $(form).serializeArray();

    let json = convertArrayToJSON(data);

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

function convertArrayToJSON(array) {
    let object = {};

    for (const index in array) {
        if (Object.hasOwnProperty.call(array, index)) {
            const inputForm = array[index];
            object[inputForm.name] = inputForm.value;
        }
    }
    return JSON.stringify(object);
}

function validateForm(form) {
    let properties = getFormValidationProperties();

    $(form).validate({
        rules: properties.rules,
        messages: properties.messages,
        submitHandler: function (form) {
            submitFormToApi(form);
        },
        invalidHandler: function () {
            showFailWhaleMessage();
        }
    });
}

function showFailWhaleMessage() {
    Swal.fire({
        icon: "error",
        text: "Fail whale..."
    });
}

function getFormValidationProperties() {
    return {
        rules: {
            firstname: {
                required: true
            },
            lastname: {
                required: true
            },
            phone: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
        },
        messages: {
            firstname: "Insira seu primeiro nome",
            lastname: "Insira seu sobrenome",
            phone: "Insira seu telefone",
            email: {
                required: "Insira seu email",
                email: "Formato de e-mail inválido",
            }
        }
    }
}