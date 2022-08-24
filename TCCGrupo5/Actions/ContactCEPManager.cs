using Microsoft.Xrm.Sdk.Workflow;
using Newtonsoft.Json;
using RestSharp;
using System.Activities;

namespace TCCGrupo5.Actions
{
    public class ContactCEPManager : ActionImplement
    {
        [Input("CEP")]
        public InArgument<string> CEP { get; set; }
        [Output("Sucesso")]
        public OutArgument<bool> Sucesso { get; set; }
        [Output("Logradouro")]
        public OutArgument<string> Logradouro { get; set; }
        [Output("Complemento")]
        public OutArgument<string> Complemento { get; set; }
        [Output("Bairro")]
        public OutArgument<string> Bairro { get; set; }
        [Output("Localidade")]
        public OutArgument<string> Localidade { get; set; }
        [Output("UF")]
        public OutArgument<string> UF { get; set; }
        [Output("CodigoIBGE")]
        public OutArgument<string> CodigoIBGE { get; set; }
        [Output("DDD")]
        public OutArgument<string> DDD { get; set; }

        public override void ExecuteAction(CodeActivityContext context)
        {
            string cep = CEP.Get(context);

            CEP Cep = GetCEP(cep);

            string logradouro = Cep.Logradouro;
            Logradouro.Set(context, logradouro);

            string complemento = Cep.Complemento;
            Complemento.Set(context, complemento);

            string bairro = Cep.Bairro;
            Bairro.Set(context, bairro);

            string localidade = Cep.Localidade;
            Localidade.Set(context, localidade);

            string uf = Cep.UF;
            UF.Set(context, uf);

            string codigoIBGE = Cep.IBGE;
            CodigoIBGE.Set(context, codigoIBGE);

            string ddd = Cep.DDD;
            DDD.Set(context, ddd);

            Sucesso.Set(context, true);
        }

        private static CEP GetCEP(string cep)
        {
            RestClient client = new RestClient("https://viacep.com.br/ws/" + cep + "/json/");
            RestRequest request = new RestRequest("", Method.Get);
            RestResponse response = client.Execute(request);

            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                CEP Cep = JsonConvert.DeserializeObject<CEP>(response.Content);
                return Cep;
            }
            else
            {
                return null;
            }
        }
    }
}
