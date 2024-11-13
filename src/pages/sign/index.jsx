import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";

import { Container, Title, Column, TitleSign, SubtitleSign, TextIcone, TextDescritivo, Row, Wrapper } from './styles';

const Sign = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.senha}&nome=${formData.nome}`);
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            }

            alert('Usuário ou senha inválido')
        }catch(e){
            //TODO: HOUVE UM ERRO
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleSign>Comece agora Grátis</TitleSign>
                <SubtitleSign>Crie sua conta e make the change._</SubtitleSign>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Input placeholder="Nome Completo" leftIcon={<MdPerson />} name="nome"  control={control} />
                    {errors.email && <span>Nome é obrigatório</span>}

                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}

                    <Input type="password" placeholder="Password" leftIcon={<MdLock />}  name="password" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}

                    <Button title="Criar minha conta" variant="secondary" type="submit"/>

                </form>

                <Row>
               </Row>
                <TextDescritivo>Ao clicar em "criar minha conta grátis, declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO."</TextDescritivo>
 
                <Row>
                    <TextDescritivo>Já tenho conta.</TextDescritivo><TextIcone>Fazer Login</TextIcone>
                </Row>

                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Sign }