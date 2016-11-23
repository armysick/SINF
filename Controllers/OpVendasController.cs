using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FirstREST.Lib_Primavera.Model;

namespace FirstREST.Controllers
{
    public class OpVendasController : ApiController
    {
        //
        // GET: /OpVendas/1

        public IEnumerable<Lib_Primavera.Model.OpVenda> Get(string id)
        {
                return Lib_Primavera.PriIntegration.ListaOpVendasByVendedor(id);
        }

        
    }
}
