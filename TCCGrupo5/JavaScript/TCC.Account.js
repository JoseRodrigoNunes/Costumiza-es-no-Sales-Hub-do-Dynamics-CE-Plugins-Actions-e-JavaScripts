if (typeof (TCC) == "undefined") { TCC = {} }
if (typeof (TCC.Account) == "undefined") { TCC.Account = {} }

TCC.Account = {
    NameOnChange: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var nome = formContext.getAttribute("name").getValue();

        if (nome != null) {
            var nomeFormatado = TCC.Account.FormatName(nome)
            formContext.getAttribute("name").setValue(nomeFormatado)
        } else {
            TCC.Account.DynamicsAlert("Please enter a Name in this field.", "Blank Account Name!")
        }
    },
    FormatName: function (nome) {
        nome = nome.toLowerCase()
        var arrayNome = nome.split(" ")

        for (var i = 0; i < arrayNome.length; i++) {
            arrayNome[i] = arrayNome[i][0].toUpperCase() + arrayNome[i].substring(1)
        }
        var ArraynomeFormatado = arrayNome.join(" ")
        return ArraynomeFormatado
    },

    CNPJOnChange: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var cnpj = formContext.getAttribute("tcc_cnpj").getValue();
        if(cnpj != null){
            if(TCC.Account.ValidadeCNPJ(cnpj)){
                var cnpjFormatado = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
                formContext.getAttribute("tcc_cnpj").setValue(cnpjFormatado);
            }
            else{
                TCC.Account.DynamicsAlert("Enter a valid CNPJ in this field and try again.","Invalid CNPJ!");
                formContext.getAttribute("tcc_cnpj").setValue("");
            }
        }else{
            TCC.Account.DynamicsAlert("Please enter a CNPJ in this field.", "Blank CNPJ!")
        }
    },
    ValidadeCNPJ: function(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    },
    DynamicsAlert: function (alertText, alertTitle) {
        var alertStrings = {
            confirmButtonLabel: "OK",
            text: alertText,
            title: alertTitle
        };

        var alertOptions = {
            heigth: 120,
            width: 200
        };

        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
    }
}