if (typeof (TCC) == "undefined") { TCC = {} }
if (typeof (TCC.Contact) == "undefined") { TCC.Contact = {} }

TCC.Contact = {
    CepOnChange: function(executionContext){
        var formContext = executionContext.getFormContext();
        var cep = formContext.getAttribute("address1_postalcode").getValue();

        if(cep != null){
            var execute_new_PreecherEnderecoCompletoComCep_Request = {
                CEP: cep,
            
                getMetadata: function () {
                    return {
                        boundParameter: null,
                        parameterTypes: {
                            CEP: { typeName: "Edm.String", structuralProperty: 1 }
                        },
                        operationType: 0, operationName: "new_PreecherEnderecoCompletoComCep"
                    };
                }
            };

            Xrm.WebApi.online.execute(execute_new_PreecherEnderecoCompletoComCep_Request).then(
                function success(response) {
                    if (response.ok) { return response.json(); }
                }
            ).then(function (responseBody) {
                var result = responseBody;
                var sucesso = result["Sucesso"]; 
                var logradouro = result["Logradouro"]; 
                var complemento = result["Complemento"]; 
                var bairro = result["Bairro"]; 
                var localidade = result["Localidade"]; 
                var uf = result["UF"]; 
                var codigoibge = result["CodigoIBGE"]; 
                var ddd = result["DDD"]; 
                TCC.Contact.FillOutForm(formContext, logradouro, complemento, bairro, localidade, uf, codigoibge, ddd) 
            }).catch(function (error) {
                TCC.Contact.DynamicsAlert("Enter a valid CEP in this field and try again.","Invalid CEP!");
            });
        }else{
            TCC.Contact.DynamicsAlert("Please enter a CEP in this field.", "Blank CEP!")
        }

    },
    CPFOnChange: function(executionContext){
        var formContext = executionContext.getFormContext();
        var cpf = formContext.getAttribute("tcc_cpf").getValue();

        if(cpf != null){
            if(TCC.Contact.ValidateCPF(cpf)){
                var cpfFormatado = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
                formContext.getAttribute("tcc_cpf").setValue(cpfFormatado);
            }else{
                TCC.Contact.DynamicsAlert("Enter a valid CPF in this field and try again.","Invalid CPF!")    
                formContext.getAttribute("tcc_cpf").setValue("");
            }
        }else{
            TCC.Contact.DynamicsAlert("Please enter a CPF in this field.","Blank CPF!")
        }
    },
    ValidateCPF: function(cpf){
        cpf = cpf.replace(/[^\d]+/g,'');	
	    if(cpf == '') return false;	
	    // Elimina CPFs invalidos conhecidos	
	    if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
    	// Valida 1o digito	
        add = 0;	
        for (i=0; i < 9; i ++)		
            add += parseInt(cpf.charAt(i)) * (10 - i);	
            rev = 11 - (add % 11);	
            if (rev == 10 || rev == 11)		
                rev = 0;	
            if (rev != parseInt(cpf.charAt(9)))		
                return false;		
        // Valida 2o digito	
        add = 0;	
        for (i = 0; i < 10; i ++)		
            add += parseInt(cpf.charAt(i)) * (11 - i);	
        rev = 11 - (add % 11);	
        if (rev == 10 || rev == 11)	
            rev = 0;	
        if (rev != parseInt(cpf.charAt(10)))
            return false;		
        return true;   
    },
    FillOutForm: function(formContext, logradouro, complemento, bairro, localidade, uf, codigoibge, ddd){
        formContext.getAttribute("address1_line1").setValue(logradouro);
        formContext.getAttribute("address1_line2").setValue(complemento);
        formContext.getAttribute("address1_line3").setValue(bairro);
        formContext.getAttribute("address1_city").setValue(localidade);
        formContext.getAttribute("address1_country").setValue(uf);
        formContext.getAttribute("tcc_codigoibge").setValue(codigoibge);
        formContext.getAttribute("tcc_ddd").setValue(ddd);
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