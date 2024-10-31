import React, {useState, useEffect} from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import './Cadastro.css'
import { useLocation, Navigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Alterar = () => {

    const {projeto} = useLocation().state;
    const [dados, setDados] = useState({})
    const [clicou, setClicou] = useState(false)
    const [navegar, setNavegar] = useState(false)

    useEffect(()=>{
        if(clicou){
            setNavegar(true)
        }
        
        return () =>{
            setNavegar(false)
            setClicou(false)
        }
    }, [clicou])

    function enviarDados(){
        axios.put('http://localhost:8080/projeto', 
            dados
        ).then(response => console.log(response))
        .then(dados => {
            alert('Dados alterados com sucesso');
            
        })
        .catch(error => console.log(error))
    }
    
    useEffect(()=>{
        if (clicou) {
            enviarDados()
            setNavegar(true)
        } 
        else {
            console.log('app no ar')
        }
       return (()=>{
            setClicou(false);
            setNavegar(false);
        })
    }, [clicou])
    
    return (
    <div>
        <h1>Alterar Produto</h1>
        <Formik
            initialValues={{
                id: projeto.id,
                nome_projeto: projeto.nome,
                integrantes: projeto.integrantes,
                proposta: projeto.proposta
            }}
            onSubmit={(values, actions) => {

                if(values.nome.length > 0){
                        setTimeout(() => {
                        setDados({
                            id: values.id,
                            nome_projeto: values.nome_projeto,
                            integrantes: values.integrantes,
                            proposta: values.proposta                         
                            
                        })
                        setClicou(true)
                    }, 1000);
                } else {
                    alert('Favor preencher informações!')
                }
                
            }}
        >
            {props => (
                <form onSubmit={props.handleSubmit}>
                    <div>
                        <input
                            type="number"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={projeto.id}
                            placeholder='0'
                            name="id"
                            disabled
                        />
                        {props.errors.id && <div id="feedback">{props.errors.id}</div>}
                    </div>

                    <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.nome_projeto}
                            placeholder="Nome do projeto"
                            name="nome_projeto"
                        />
                        {props.errors.nome && <div id="feedback">{props.errors.nome}</div>}
                    </div>

                    <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.descricao}
                            name="proposta"
                            placeholder="Proposta"
                        />
                        {props.errors.descricao && <div id="feedback">{props.errors.descricao}</div>}
                    </div>
                    

                    
                    {(navegar) ? <Navigate 
                        to="/listagem" 
                        replace={true}
                    /> : <></>}

                    <Button 
                        variant="primary"
                        type="submit">ALTERAR</Button>
                </form>
            )}
        </Formik>
    </div>
    );
}

export default Alterar