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
    public class DistritosController : ApiController
    {
        //
        // GET: /OpVendas/1
        /// <summary>
        /// Returns Distrito's description (name) from ID.
        /// </summary>
        /// <param name="id">Distrito ID</param>
        /// <returns>Distrito Model [Containing only Descricao]</returns>
        public Distrito Get(string id)
        {
            return Lib_Primavera.PriIntegration.GetDescricaoDistrito(id);
        }


    }
}