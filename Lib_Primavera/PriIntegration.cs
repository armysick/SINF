using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Interop.ErpBS900;
using Interop.StdPlatBS900;
using Interop.StdBE900;
using Interop.GcpBE900;
using ADODB;
using Interop.CrmBE900;

namespace FirstREST.Lib_Primavera
{
    public class PriIntegration
    {
        

        # region Cliente

        public static List<Model.Cliente> ListaClientes()
        {
            
            
            StdBELista objList;

            List<Model.Cliente> listClientes = new List<Model.Cliente>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                //objList = PriEngine.Engine.Comercial.Clientes.LstClientes();

                
                objList = PriEngine.Engine.Consulta("SELECT Cliente, Nome, Moeda, Distrito, NumContrib as NumContribuinte, Fac_Mor AS campo_exemplo FROM  CLIENTES");

                
                while (!objList.NoFim())
                {
                    listClientes.Add(new Model.Cliente
                    {
                        CodCliente = objList.Valor("Cliente"),
                        NomeCliente = objList.Valor("Nome"),
                        Moeda = objList.Valor("Moeda"),
                        NumContribuinte = objList.Valor("NumContribuinte"),
                        Morada = objList.Valor("campo_exemplo"),
                        Distrito = objList.Valor("Distrito")
                        //Lead = objList.Valor("CDU_CampoVar1"),  //Lead boolean 1=true;
                        //Prospect = objList.Valor("CDU_CampoVar2") // Prospect boolean 1=true;
                    });
                    objList.Seguinte();

                }

                return listClientes.OrderBy(x => x.CodCliente).ToList();
            }
            else
                return null;
        }

        public static Lib_Primavera.Model.Cliente GetCliente(string codCliente)
        {
            
            
            GcpBECliente objCli = new GcpBECliente();


            Model.Cliente myCli = new Model.Cliente();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                if (PriEngine.Engine.Comercial.Clientes.Existe(codCliente) == true)
                {
                    objCli = PriEngine.Engine.Comercial.Clientes.Edita(codCliente);
                    myCli.CodCliente = objCli.get_Cliente();
                    myCli.NomeCliente = objCli.get_Nome();
                    myCli.Moeda = objCli.get_Moeda();
                    myCli.NumContribuinte = objCli.get_NumContribuinte();
                    myCli.Morada = objCli.get_Morada();
                    myCli.Distrito = objCli.get_Distrito();
                    double totsdebs = objCli.get_DebitoContaCorrente() + objCli.get_DebitoEncomendasPendentes();
                    myCli.TotDeb = totsdebs.ToString("F2");
                    
                    return myCli;
                }
                else
                {
                    return null;
                }
            }
            else
                return null;
        }

        public static Lib_Primavera.Model.RespostaErro UpdCliente(Lib_Primavera.Model.Cliente cliente)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
           

            GcpBECliente objCli = new GcpBECliente();

            try
            {

                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {

                    if (PriEngine.Engine.Comercial.Clientes.Existe(cliente.CodCliente) == false)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "O cliente não existe";
                        return erro;
                    }
                    else
                    {

                        objCli = PriEngine.Engine.Comercial.Clientes.Edita(cliente.CodCliente);
                        objCli.set_EmModoEdicao(true);

                        objCli.set_Nome(cliente.NomeCliente);
                        objCli.set_NumContribuinte(cliente.NumContribuinte);
                        objCli.set_Moeda(cliente.Moeda);
                        objCli.set_Morada(cliente.Morada);

                        PriEngine.Engine.Comercial.Clientes.Actualiza(objCli);

                        erro.Erro = 0;
                        erro.Descricao = "Sucesso";
                        return erro;
                    }
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir a empresa";
                    return erro;

                }

            }

            catch (Exception ex)
            {
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }

        }


        public static Lib_Primavera.Model.RespostaErro DelCliente(string codCliente)
        {

            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            GcpBECliente objCli = new GcpBECliente();


            try
            {

                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    if (PriEngine.Engine.Comercial.Clientes.Existe(codCliente) == false)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "O cliente não existe";
                        return erro;
                    }
                    else
                    {

                        PriEngine.Engine.Comercial.Clientes.Remove(codCliente);
                        erro.Erro = 0;
                        erro.Descricao = "Sucesso";
                        return erro;
                    }
                }

                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir a empresa";
                    return erro;
                }
            }

            catch (Exception ex)
            {
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }

        }



        public static Lib_Primavera.Model.RespostaErro InsereClienteObj(Model.Cliente cli)
        {

            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            

            GcpBECliente myCli = new GcpBECliente();            
            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {

                     if (PriEngine.Engine.Comercial.Clientes.Existe(cli.CodCliente) == true)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "O cliente já existe";
                        return erro;
                    }
                    else
                    {

                    myCli.set_Cliente(cli.CodCliente);
                    myCli.set_Nome(cli.NomeCliente);
                    myCli.set_NumContribuinte(cli.NumContribuinte);
                    myCli.set_Moeda(cli.Moeda);
                    myCli.set_Morada(cli.Morada);
                    myCli.set_Distrito(cli.Distrito);
                    myCli.set_Pais("PT");

                    PriEngine.Engine.Comercial.Clientes.Actualiza(myCli);

                    erro.Erro = 0;
                    erro.Descricao = "Sucesso";
                    return erro;
                    }
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir empresa";
                    return erro;
                }
            }

            catch (Exception ex)
            {
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }


        }

       

        #endregion Cliente;   // -----------------------------  END   CLIENTE    -----------------------


        #region OpVenda;

        public static List<Model.OpVenda> ListaOpVendasByVendedor(string vendedor_id)
        {


            StdBELista objList;

            List<Model.OpVenda> listOpVendas = new List<Model.OpVenda>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                //objList = PriEngine.Engine.Comercial.Clientes.LstClientes();

                objList = PriEngine.Engine.Consulta("SELECT ID, Descricao, Entidade, Vendedor, BarraPercentual FROM CABECOPORTUNIDADESVENDA WHERE Vendedor = '"+vendedor_id + "'");


                while (!objList.NoFim())
                {
                    listOpVendas.Add(new Model.OpVenda
                    {
                        ID = objList.Valor("ID"),
                        Entidade = objList.Valor("Entidade"),
                        Vendedor = objList.Valor("Vendedor"),
                        BarraPercentual = objList.Valor("BarraPercentual"),
                        Descricao = objList.Valor("Descricao")
                    });
                    objList.Seguinte();

                }

                return listOpVendas;
            }
            else
                return null;
        }

        public static List<Model.OpVenda> ListaOpVendasByVendedorWithResumo(string vendedor_id)
        {


            StdBELista objList;

            List<Model.OpVenda> listOpVendas = new List<Model.OpVenda>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                //objList = PriEngine.Engine.Comercial.Clientes.LstClientes();

                objList = PriEngine.Engine.Consulta("SELECT Resumo, Distritos.Descricao As DisDescri, Entidade, CabecOportunidadesVenda.Descricao FROM Distritos JOIN Clientes on Distritos.Distrito = Clientes.Distrito JOIN CabecOportunidadesVenda ON Clientes.Cliente = CabecOportunidadesVenda.Entidade WHERE NOT(CabecOportunidadesVenda.Resumo LIKE 'nulo') AND CabecOportunidadesVenda.Vendedor = "+vendedor_id+"");


                while (!objList.NoFim())
                {
                    listOpVendas.Add(new Model.OpVenda
                    {
                        Entidade = objList.Valor("Entidade"),
                        Distrito = objList.Valor("DisDescri"),
                        Descricao = objList.Valor("Descricao"),
                        Resumo = objList.Valor("Resumo")
                    });
                    objList.Seguinte();

                }

                return listOpVendas;
            }
            else
                return null;
        }

        public static List<Model.OpVenda> ListaOpVendasByVendedorAndDistrito(string vendedor_id, string distrito_id)
        {


            StdBELista objList;

            List<Model.OpVenda> listOpVendas = new List<Model.OpVenda>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                //objList = PriEngine.Engine.Comercial.Clientes.LstClientes();

                objList = PriEngine.Engine.Consulta("SELECT ID, CabecOportunidadesVenda.Resumo As CP, Entidade, Oportunidade, CabecOportunidadesVenda.Descricao, CabecOportunidadesVenda.Vendedor, BarraPercentual FROM CabecOportunidadesVenda JOIN Clientes ON Clientes.Cliente = CabecOportunidadesVenda.Entidade WHERE CabecOportunidadesVenda.Vendedor = "+vendedor_id+" AND Clientes.Distrito = "+distrito_id+"; ");


                while (!objList.NoFim())
                {
                    
                    
                        listOpVendas.Add(new Model.OpVenda
                        {
                            ID = objList.Valor("ID"),
                            Entidade = objList.Valor("Entidade"),
                            Vendedor = objList.Valor("Vendedor"),
                            BarraPercentual = objList.Valor("BarraPercentual"),
                            Descricao = objList.Valor("Descricao"),
                            Oportunidade = objList.Valor("Oportunidade"),
                            Resumo = objList.Valor("CP")
                        });
                    
                    
                    objList.Seguinte();

                }

                return listOpVendas;
            }
            else
                return null;
        }

        
        public static Lib_Primavera.Model.RespostaErro UpdOpVenda(Lib_Primavera.Model.OpVenda opvenda)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();



            CrmBEOportunidadeVenda objOpVenda = new CrmBEOportunidadeVenda();

            try
            {

                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {

                    if (PriEngine.Engine.CRM.OportunidadesVenda.Existe(opvenda.Oportunidade) == false)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "A oportunidade de venda não existe";
                        return erro;
                    }
                    else
                    {

                        objOpVenda = PriEngine.Engine.CRM.OportunidadesVenda.Edita(opvenda.Oportunidade);
                        objOpVenda.set_EmModoEdicao(true);

                        objOpVenda.set_Descricao(opvenda.Descricao);
                        objOpVenda.set_Entidade(opvenda.Entidade);
                        objOpVenda.set_Vendedor(opvenda.Vendedor);
                        objOpVenda.set_BarraPercentual(opvenda.BarraPercentual);
                        string teste = opvenda.Resumo;
                        objOpVenda.set_Resumo(teste);

                        PriEngine.Engine.CRM.OportunidadesVenda.Actualiza(objOpVenda);

                        erro.Erro = 0;
                        erro.Descricao = "Sucesso";
                        return erro;
                    }
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir a empresa";
                    return erro;

                }

            }

            catch (Exception ex)
            {
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }

        }


        public static Lib_Primavera.Model.RespostaErro InsereOpVenda(Model.OpVenda opvenda)
        {

            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            CrmBEOportunidadeVenda myOpVenda = new CrmBEOportunidadeVenda();
            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {

                    // TESTE
                    StdBELista objList;
                    List<Model.OpVenda> listOpVendas = new List<Model.OpVenda>();

                    objList = PriEngine.Engine.Consulta("SELECT Oportunidade FROM CabecOportunidadesVenda");
                    String strop = "OPV000";
                    while (!objList.NoFim())
                    {

                        erro.Erro = 1;
                        strop = objList.Valor("Oportunidade");

                        objList.Seguinte();
                    }

                    strop = strop.Substring(3);  // get XXX from [OPV]XXX
                    int intop = Int32.Parse(strop);
                    intop++;
                    strop = Convert.ToString(intop);
                    if (intop.ToString().Length == 1)
                        strop = "OPV00" + strop;
                    else if (intop.ToString().Length == 2)
                        strop = "OPV0" + strop;
                    else
                        strop = "OPV" + strop;
                    // END TESTES

                    
                    myOpVenda.set_ID("");
                    myOpVenda.set_Oportunidade(strop);
                    myOpVenda.set_Entidade(opvenda.Entidade);
                    myOpVenda.set_Vendedor(opvenda.Vendedor);
                    //short bpvalue = 5;
                    myOpVenda.set_BarraPercentual(25);
                    myOpVenda.set_Descricao(opvenda.Descricao);
                    myOpVenda.set_Moeda(opvenda.Moeda);
                    myOpVenda.set_CicloVenda(opvenda.CicloVenda);
                    myOpVenda.set_TipoEntidade(opvenda.TipoEntidade);
                    myOpVenda.set_DataCriacao(opvenda.DataCriacao);
                    myOpVenda.set_DataExpiracao(opvenda.DataExpiracao);
                    myOpVenda.set_EncomendaEfectuada(false);
                    myOpVenda.set_TipoMargemPerc(false);
                    myOpVenda.set_Resumo("nulo");



                    PriEngine.Engine.CRM.OportunidadesVenda.Actualiza(myOpVenda);
                    //PriEngine.Engine.CRM.OportunidadesVenda.ValidaActualizacao(myOpVenda, "");

                    erro.Erro = 0;
                    erro.Descricao = "Sucesso";
                    return erro;
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir empresa";
                    return erro;
                }
            }

            catch (Exception ex)
            {
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }


        }

        public static Lib_Primavera.Model.RespostaErro lastOpVenda()
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            StdBELista objList;
            List<Model.OpVenda> listOpVendas = new List<Model.OpVenda>();

            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    objList = PriEngine.Engine.Consulta("SELECT Oportunidade FROM CabecOportunidadesVenda");

                    while (!objList.NoFim())
                    {

                        erro.Erro = 1;
                        erro.Descricao = objList.Valor("Oportunidade");

                        objList.Seguinte();
                    }
                    return erro;
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir empresa";
                    return erro;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        #endregion OpVenda  //----------------- END OPVenda --------------- //




        #region Artigo

        public static Lib_Primavera.Model.Artigo GetArtigo(string codArtigo)
        {
            
            GcpBEArtigo objArtigo = new GcpBEArtigo();
            Model.Artigo myArt = new Model.Artigo();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                if (PriEngine.Engine.Comercial.Artigos.Existe(codArtigo) == false)
                {
                    return null;
                }
                else
                {
                    objArtigo = PriEngine.Engine.Comercial.Artigos.Edita(codArtigo);
                    myArt.CodArtigo = objArtigo.get_Artigo();
                    myArt.DescArtigo = objArtigo.get_Descricao();

                    return myArt;
                }
                
            }
            else
            {
                return null;
            }

        }

        public static List<Model.Artigo> ListaArtigos()
        {
                        
            StdBELista objList;
            StdBELista objList2;

            Model.Artigo art = new Model.Artigo();
            List<Model.Artigo> listArts = new List<Model.Artigo>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Comercial.Artigos.LstArtigos();
                
                while (!objList.NoFim())
                {
                    art = new Model.Artigo();
                    art.CodArtigo = objList.Valor("artigo");
                    art.DescArtigo = objList.Valor("descricao");
                    objList2 = PriEngine.Engine.Consulta("SELECT PVP1 from ArtigoMoeda WHERE Artigo = '" + art.CodArtigo + "'");
                    while (!objList2.NoFim())
                    {
                        art.Price = objList2.Valor("PVP1");
                        objList2.Seguinte();
                    }
                    listArts.Add(art);
                    objList.Seguinte();
                }
                

                return listArts;

            }
            else
            {
                return null;

            }

        }

        #endregion Artigo


        #region Distrito
        public static List<Model.Distrito> GetDescricaoDistrito(string code)
        {
            StdBELista objList;
            List<Model.Distrito> myDistrito = new List<Model.Distrito>();

            try
            {

                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    objList = PriEngine.Engine.Consulta("SELECT Descricao from Distritos WHERE Distrito = '" + code + "'");
                    myDistrito.Add(new Model.Distrito
                    {
                        Descricao = objList.Valor("Descricao")
                    });
                    return myDistrito;
                }
                else
                {

                    return null;
                }
            }
            catch (Exception exc)
            {
                return null;
            }
          



        }

        public static List<Model.Distrito> GetSuggestedDistricts(string vid)
        {
            StdBELista objList;
            List<Model.Distrito> myDistrito = new List<Model.Distrito>();

            try
            {

                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    int code = 1;
                    double valor1 = -1;
                    double valor2 = -1;
                    int did1 = -1;
                    int did2 = -1;
                    String descri1 = null;
                    String descri2 = null;
                    double totaldeb = 0;
                    double LP = 0;
                    double size = 0;
                    double rating = 0;
                    String descri;

                    while (code <= 18)
                    {
                        objList = PriEngine.Engine.Consulta("SELECT Distritos.Distrito, Distritos.Descricao,  CabecOportunidadesVenda.BarraPercentual, Clientes.TotalDeb FROM Distritos JOIN Clientes on Distritos.Distrito = Clientes.Distrito JOIN CabecOportunidadesVenda ON Clientes.Cliente = CabecOportunidadesVenda.Entidade WHERE Distritos.Distrito = " + code + " AND (SELECT COUNT(Distritos.Distrito) FROM Distritos JOIN Clientes on Distritos.Distrito = Clientes.Distrito JOIN CabecOportunidadesVenda ON Clientes.Cliente = CabecOportunidadesVenda.Entidade WHERE Distritos.Distrito = " + code + ") > 2 AND CabecOportunidadesVenda.BarraPercentual != 100 AND CabecOportunidadesVenda.BarraPercentual != 0 AND CabecOportunidadesVenda.Vendedor = "+vid);
                        // Get OPVs from each district
                        int l = objList.NumLinhas();
                        if (l > 0)
                        {
                            descri = objList.Valor("Descricao");
                            rating = 0;
                            LP = 0;
                            totaldeb = 0;
                            size = objList.NumLinhas();
                            while (!objList.NoFim())
                            {
                                totaldeb += objList.Valor("TotalDeb");
                                LP += objList.Valor("BarraPercentual");
                                objList.Seguinte();
                            }
                            totaldeb = totaldeb / size;

                            if (totaldeb < 1000)
                                totaldeb = totaldeb / 1000;
                            else if (totaldeb >= 1000)
                                totaldeb = 1;

                            LP = LP / size;


                            LP = LP / 100;

                            if (5 > size)
                                size = 0;
                            else if (10 > size)
                                size = 0.5;
                            else if (size >= 10)
                                size = 1;

                            rating = (0.2 * totaldeb) + (0.5 * LP) + (0.3 * size);

                            if (rating > valor1)
                            {
                                valor2 = valor1;
                                did2 = did1;
                                descri2 = descri1;
                                valor1 = rating;
                                did1 = code;
                                descri1 = descri;
                            }
                            else if (rating > valor2)
                            {
                                valor2 = rating;
                                did2 = code;
                                descri2 = descri;
                            }

                        }
                        code++;

                    }
                    if(did1!=-1){
                        myDistrito.Add(new Model.Distrito
                        {
                            ID = did1,
                            Rating = valor1,
                            Descricao = descri1
                        });
                        if(did2!=-1){
                            myDistrito.Add(new Model.Distrito
                            {
                                ID = did2,
                                Rating = valor2,
                                Descricao = descri2
                            });
                        }
                    }
                    return myDistrito;
                }
                else
                {

                    return null;
                }
            }
            catch (Exception exc)
            {
                return null;
            }
        }
        #endregion Distrito   // End Distrito  //

        
        #region DocsVenda

        public static Model.RespostaErro Encomendas_New(Model.DocVenda dv)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            GcpBEDocumentoVenda myEnc = new GcpBEDocumentoVenda();
             
            GcpBELinhaDocumentoVenda myLin = new GcpBELinhaDocumentoVenda();

            GcpBELinhasDocumentoVenda myLinhas = new GcpBELinhasDocumentoVenda();
             
            Interop.GcpBE900.PreencheRelacaoVendas rl = new Interop.GcpBE900.PreencheRelacaoVendas();
            List<Model.LinhaDocVenda> lstlindv = new List<Model.LinhaDocVenda>();
            
            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    // Atribui valores ao cabecalho do doc
                    //myEnc.set_DataDoc(dv.Data);
                    myEnc.set_Entidade(dv.Entidade);
                    myEnc.set_Serie(dv.Serie);
                    myEnc.set_Tipodoc("FA");
                    myEnc.set_TipoEntidade("C");
                    myEnc.set_PaisFac("PT");
                    myEnc.set_Pais("PT");
                    myEnc.set_CondPag("2");
                    
                    // Linhas do documento para a lista de linhas
                    lstlindv = dv.LinhasDoc;
                    PriEngine.Engine.Comercial.Vendas.PreencheDadosRelacionados(myEnc);//PreencheDadosRelacionados(myEnc, rl); rl?
                    foreach (Model.LinhaDocVenda lin in lstlindv)
                    {
                        PriEngine.Engine.Comercial.Vendas.AdicionaLinha(myEnc, lin.CodArtigo, lin.Quantidade, "", "", lin.PrecoUnitario, lin.Desconto);
                    }


                   // PriEngine.Engine.Comercial.Compras.TransformaDocumento(

                    PriEngine.Engine.IniciaTransaccao();
                    PriEngine.Engine.Comercial.Vendas.Actualiza(myEnc, "Teste");
                    PriEngine.Engine.TerminaTransaccao();
                    erro.Erro = 0;
                    erro.Descricao = "Sucesso";
                    return erro;
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir empresa";
                    return erro;

                }

            }
            catch (Exception ex)
            {
                PriEngine.Engine.DesfazTransaccao();
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }
        }

     

        public static List<Model.DocVenda> Encomendas_List()
        {
            
            StdBELista objListCab;
            StdBELista objListLin;
            Model.DocVenda dv = new Model.DocVenda();
            List<Model.DocVenda> listdv = new List<Model.DocVenda>();
            Model.LinhaDocVenda lindv = new Model.LinhaDocVenda();
            List<Model.LinhaDocVenda> listlindv = new
            List<Model.LinhaDocVenda>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objListCab = PriEngine.Engine.Consulta("SELECT id, Entidade, Data, NumDoc, TotalMerc, Serie From CabecDoc where TipoDoc='ECL'");
                while (!objListCab.NoFim())
                {
                    dv = new Model.DocVenda();
                    dv.id = objListCab.Valor("id");
                    dv.Entidade = objListCab.Valor("Entidade");
                    dv.NumDoc = objListCab.Valor("NumDoc");
                    dv.Data = objListCab.Valor("Data");
                    dv.TotalMerc = objListCab.Valor("TotalMerc");
                    dv.Serie = objListCab.Valor("Serie");
                    objListLin = PriEngine.Engine.Consulta("SELECT idCabecDoc, Artigo, Descricao, Quantidade, Unidade, PrecUnit, Desconto1, TotalILiquido, PrecoLiquido from LinhasDoc where IdCabecDoc='" + dv.id + "' order By NumLinha");
                    listlindv = new List<Model.LinhaDocVenda>();

                    while (!objListLin.NoFim())
                    {
                        lindv = new Model.LinhaDocVenda();
                        lindv.IdCabecDoc = objListLin.Valor("idCabecDoc");
                        lindv.CodArtigo = objListLin.Valor("Artigo");
                        lindv.DescArtigo = objListLin.Valor("Descricao");
                        lindv.Quantidade = objListLin.Valor("Quantidade");
                        lindv.Unidade = objListLin.Valor("Unidade");
                        lindv.Desconto = objListLin.Valor("Desconto1");
                        lindv.PrecoUnitario = objListLin.Valor("PrecUnit");
                        lindv.TotalILiquido = objListLin.Valor("TotalILiquido");
                        lindv.TotalLiquido = objListLin.Valor("PrecoLiquido");

                        listlindv.Add(lindv);
                        objListLin.Seguinte();
                    }

                    dv.LinhasDoc = listlindv;
                    listdv.Add(dv);
                    objListCab.Seguinte();
                }
            }
            return listdv;
        }

    
       

        public static Model.DocVenda Encomenda_Get(string numdoc)
        {
            
            
            StdBELista objListCab;
            StdBELista objListLin;
            Model.DocVenda dv = new Model.DocVenda();
            Model.LinhaDocVenda lindv = new Model.LinhaDocVenda();
            List<Model.LinhaDocVenda> listlindv = new List<Model.LinhaDocVenda>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                

                string st = "SELECT id, Entidade, Data, NumDoc, TotalMerc, Serie From CabecDoc where TipoDoc='ECL' and NumDoc='" + numdoc + "'";
                objListCab = PriEngine.Engine.Consulta(st);
                dv = new Model.DocVenda();
                dv.id = objListCab.Valor("id");
                dv.Entidade = objListCab.Valor("Entidade");
                dv.NumDoc = objListCab.Valor("NumDoc");
                dv.Data = objListCab.Valor("Data");
                dv.TotalMerc = objListCab.Valor("TotalMerc");
                dv.Serie = objListCab.Valor("Serie");
                objListLin = PriEngine.Engine.Consulta("SELECT idCabecDoc, Artigo, Descricao, Quantidade, Unidade, PrecUnit, Desconto1, TotalILiquido, PrecoLiquido from LinhasDoc where IdCabecDoc='" + dv.id + "' order By NumLinha");
                listlindv = new List<Model.LinhaDocVenda>();

                while (!objListLin.NoFim())
                {
                    lindv = new Model.LinhaDocVenda();
                    lindv.IdCabecDoc = objListLin.Valor("idCabecDoc");
                    lindv.CodArtigo = objListLin.Valor("Artigo");
                    lindv.DescArtigo = objListLin.Valor("Descricao");
                    lindv.Quantidade = objListLin.Valor("Quantidade");
                    lindv.Unidade = objListLin.Valor("Unidade");
                    lindv.Desconto = objListLin.Valor("Desconto1");
                    lindv.PrecoUnitario = objListLin.Valor("PrecUnit");
                    lindv.TotalILiquido = objListLin.Valor("TotalILiquido");
                    lindv.TotalLiquido = objListLin.Valor("PrecoLiquido");
                    listlindv.Add(lindv);
                    objListLin.Seguinte();
                }

                dv.LinhasDoc = listlindv;
                return dv;
            }
            return null;
        }




        #endregion DocsVenda*/

        #region Vendedores
        public static Lib_Primavera.Model.RespostaErro vendedorExiste(string id)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    if (PriEngine.Engine.Comercial.Vendedores.Existe(id))
                    {
                        erro.Erro = 0;
                        erro.Descricao = "Sucesso";
                        return erro;
                    }
                    else
                    {
                        erro.Erro = 1;
                        erro.Descricao = "O vendedor não existe";
                        return erro;

                    }
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir empresa";
                    return erro;
                }
            }
            catch (Exception ex)
            {
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }
        }
        #endregion Vendedores
    }
}