using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Tooling.Connector;

namespace TCCGrupo5.Connections
{
    class ConnectionFactory
    {
        public static IOrganizationService GetService()
        {
            string connectionString =
                            "AuthType=OAuth;" +
                            "Username=Dynamics2@Ambiente02.onmicrosoft.com;" +
                            "Password=fDBfN$74U138;" +
                            "Url=https://org1980a385.crm2.dynamics.com/;" +
                            "AppId=dadb3a1a-a322-4381-a929-fc01072770a5;" +
                            "RedirectUri=app://58145B91-0C36-4500-8554-080854F2AC97;";

            CrmServiceClient crmServiceClient = new CrmServiceClient(connectionString);

            return crmServiceClient.OrganizationWebProxyClient;
        }
    }
}
