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
        /// <summary>
        /// Get a Vendedor's list of Oportunidades de Venda
        /// </summary>
        /// <param name="id">Vendedor_ID</param>
        /// <returns>IEnumerable [List] with all OpVenda associated with the Vendedor</returns>

        public IEnumerable<Lib_Primavera.Model.OpVenda> Get(string id)
        {
                return Lib_Primavera.PriIntegration.ListaOpVendasByVendedor(id);
        }

        
    }
}
