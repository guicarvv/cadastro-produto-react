import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import logo from "../assets/react.svg";
import { useLocation, Navigate } from "react-router-dom";

const DetalheProduto = () => {
    const { projeto } = useLocation().state;
    const [clicou, setClicou] = useState(false);
    const [navegar, setNavegar] = useState(false);

    useEffect(() => {
        if (clicou) {
            setNavegar(true);
        }

        return () => {
            setNavegar(false);
            setClicou(false);
        };
    }, [clicou]);

    return (
        <>
            <Card>
                <Card.Img variant="top" src={logo} />
                <Card.Body>
                    <Card.Title>
                        {projeto.id} - {projeto.nome_projeto}
                    </Card.Title>
                    <Card.Text>{projeto.integrantes}</Card.Text>
                    <Card.Text>{projeto.proposta}</Card.Text>

                    {navegar ? (
                        <Navigate to="/alterar" replace={false} state={{ projeto: projeto }} />
                    ) : null}

                    <Button onClick={() => setClicou(true)}>ALTERAR</Button>
                </Card.Body>
            </Card>
        </>
    );
};

export default DetalheProduto;
