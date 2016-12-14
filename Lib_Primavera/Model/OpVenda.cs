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

       public short BarraPercentual   // % de Completo o ciclo de venda (dependente do estado em que se encontra)
        {
            get;
            set;
        }

       public string Descricao
       {
           get;
           set;
       }

       public string Moeda
       {
           get;
           set;
       }
       public string CicloVenda
       {
           get;
           set;
       }
       public string TipoEntidade
       {
           get;
           set;
       }

       public DateTime DataCriacao
       {
           get;
           set;
       }
       public DateTime DataExpiracao
       {
           get;
           set;
       }

       public string Oportunidade
       {
           get;
           set;
       }

       public string Distrito
       {
           get;
           set;
       }
       public string Resumo
       {
           get;
           set;
       }

    }
}