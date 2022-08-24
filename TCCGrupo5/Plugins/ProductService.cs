using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;

namespace TCCGrupo5.Plugins
{
    public class ProductService
    {
        IOrganizationService Service { get; set; }

        public ProductService(IOrganizationService service)
        {
            this.Service = service;
        }

        public void CreateProduct(string name, string productNumber, Guid uomSchedule, Guid uom, int quantityDecimal, DateTime validfromdate, DateTime validtodate, string description)
        {
            Entity product = new Entity("product");

            product["name"] = name;
            product["productnumber"] = productNumber;
            product["defaultuomscheduleid"] = new EntityReference("uomschedule", uomSchedule);
            product["defaultuomid"] = new EntityReference("uom", uom);
            product["quantitydecimal"] = quantityDecimal;
            product["validfromdate"] = validfromdate;
            product["validtodate"] = validtodate;
            product["description"] = description;
            product["tcc_isintegrated"] = true;

            this.Service.Create(product);
        }

        public Guid GetGuid(string tableName, string fieldName, string fieldValue, string[] colunms)
        {
            QueryExpression getData = new QueryExpression(tableName);
            getData.Criteria.AddCondition(fieldName, ConditionOperator.Equal, fieldValue);
            getData.ColumnSet.AddColumns(colunms);
            EntityCollection registers = this.Service.RetrieveMultiple(getData);
            Guid registerId = (Guid)registers[0].Attributes[colunms[0]];

            return registerId;
        }
    }
}
