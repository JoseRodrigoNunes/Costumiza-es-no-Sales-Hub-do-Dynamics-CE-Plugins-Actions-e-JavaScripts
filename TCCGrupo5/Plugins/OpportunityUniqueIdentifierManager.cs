using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;

namespace TCCGrupo5.Plugins
{
    public class OpportunityUniqueIdentifierManager : PluginImplement
    {
        public override void ExecutePlugin(IServiceProvider serviceProvider)
        {
            Entity opportunity = (Entity)this.Context.InputParameters["Target"];

            QueryExpression getUniqueIdentifier = new QueryExpression("opportunity");
            getUniqueIdentifier.Criteria.AddCondition("tcc_uniqueidentifier", ConditionOperator.Equal, opportunity["tcc_uniqueidentifier"]);

            EntityCollection retrievedUIs = this.Service.RetrieveMultiple(getUniqueIdentifier);

            if (retrievedUIs.Entities.Count > 0)
            {
                throw new InvalidPluginExecutionException("This unique identifier has already been registered, please enter another one and try again.");
            }
        }
    }
}
