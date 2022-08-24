using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Workflow;
using System.Activities;

namespace TCCGrupo5.Actions
{
    public abstract class ActionImplement : CodeActivity
    {
        public IWorkflowContext WorkflowContext;
        public IOrganizationServiceFactory ServiceFactory;
        public IOrganizationService Service;

        protected override void Execute(CodeActivityContext context)
        {
            WorkflowContext = context.GetExtension<IWorkflowContext>();
            ServiceFactory = context.GetExtension<IOrganizationServiceFactory>();
            Service = ServiceFactory.CreateOrganizationService(WorkflowContext.UserId);

            ExecuteAction(context);
        }

        public abstract void ExecuteAction(CodeActivityContext context);
    }
}
