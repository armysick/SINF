using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    public class OpVenda
    {
        /*public string Entidade;

         Exemplo para POST e GET com valores específicos
         public string Morada
        {
            get
            {
                return "MORADA: " + _morada;
            }
            set
            {
                _morada = value;
            }
        }
    
*/

        public String ID
        {
            get;
            set;
        }

        public string Entidade   //  Id Cliente
        {
            get;
            set;
        }

        public string Vendedor  //  Id Vendedor 
        {
            get;
            set;
        }

       public int BarraPercentual   // % de Completo o ciclo de venda (dependente do estado em que se encontra)
        {
            get;
            set;
        }

        

    }
}