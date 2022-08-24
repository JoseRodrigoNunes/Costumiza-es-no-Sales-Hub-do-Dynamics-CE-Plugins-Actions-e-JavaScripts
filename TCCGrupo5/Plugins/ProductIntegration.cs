using Microsoft.Xrm.Sdk;
using System;
using TCCGrupo5.Connections;

namespace TCCGrupo5.Plugins
{
    public class ProductIntegration : PluginImplement
    {
        public override void ExecutePlugin(IServiceProvider serviceProvider)
        {
            Entity product = (Entity)this.Context.InputParameters["Target"];

            IOrganizationService dynamics2Service = ConnectionFactory.GetService();

            ProductService productService = new ProductService(dynamics2Service);

            string nome = (string)product["name"];
            string productNumber = (string)product["productnumber"];
            Guid defaultuomid = productService.GetGuid("uomschedule", "tcc_iddoambiente1", ((EntityReference)product["defaultuomscheduleid"]).Id.ToString(), new string[] { "uomscheduleid" });
            Guid defaultuomscheduleid = productService.GetGuid("uom", "tcc_iddoambiente1", ((EntityReference)product["defaultuomid"]).Id.ToString(), new string[] { "uomid" });
            int quantitydecimal = (int)product["quantitydecimal"];
            DateTime validfromdate = (DateTime)product["validfromdate"];
            DateTime validtodate = (DateTime)product["validtodate"];
            string description= (string)product["description"];

            productService.CreateProduct(nome, productNumber, defaultuomid, defaultuomscheduleid, quantitydecimal, validfromdate, validtodate, description);
            
        }
    }
}
