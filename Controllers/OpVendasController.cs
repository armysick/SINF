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





        /// <summary>
        /// Adds new sales opportunity to database
        /// </summary>
        /// <param name="opvenda">OpVenda to be added [Entidade, Vendedor, BarraPercentual, Descricao, Moeda, CicloVenda, DataCri, DataExp, Oportunidade {OPV00X} ]</param>
        /// <returns>HttpResponseMessage with success/failure status + erro.Descricao</returns>
        public HttpResponseMessage Post(Lib_Primavera.Model.OpVenda opvenda)
        {
            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();
            erro = Lib_Primavera.PriIntegration.InsereOpVenda(opvenda);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(
                   HttpStatusCode.Created, opvenda);
                string uri = Url.Link("DefaultApi", new { IdOpVenda = opvenda.ID });
                response.Headers.Location = new Uri(uri);
                return response;
            }

            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, erro.Descricao);
            }

        }


        /// <summary>
        /// Fully updates an existing sales opportunity
        /// </summary>
        /// <param name="id">OpVenda id [Oportunidade string "OPV00X"]</param>
        /// <param name="opvenda">Updated OpVenda to replace the old one  [Entidade, Vendedor, BarraPercentual]</param>
        /// <returns>HttpResponseMessage with success/failure status</returns>
        public HttpResponseMessage Put(string id, Lib_Primavera.Model.OpVenda opvenda)
        {

            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();

            try
            {
                erro = Lib_Primavera.PriIntegration.UpdOpVenda(opvenda);
                if (erro.Erro == 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, erro.Descricao);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, erro.Descricao);
                }
            }

            catch (Exception exc)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, erro.Descricao);
            }
        }
    }
}
