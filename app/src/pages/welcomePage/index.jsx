import React, {useState} from 'react';
import './wellcomeScreen.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import illustrationImage from '../../assets/img/illustration.png';
import logoImage from '../../assets/img/LogoVotaai.svg';
import CustomButton from "../../components/customButton";
import PersonIcon from '@mui/icons-material/Person';
import RegistrationModal from "../../components/RegistrationModal";
import LoginModal from '../../components/loginScreen';
import InfoCard from "../../components/infoCard";
import voteIcon from "../../assets/img/voteIcon.png";
import grafIcon from "../../assets/img/grafIcon.png";
import confirmIcon from "../../assets/img/confirm.png";
import Footer from "../../components/footer";
import PollCarrousel from "../../components/carousel";
import Carousel from '../../components/carousel';

export default function WelcomePage() {

    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);

    return (
        <div>
            <section id="start">
                <Row className="pt-4 pe-4" style={{height: "45px"}}>
                    <div className="d-flex justify-content-end gap-2">
                        <CustomButton text="Fazer Login" bgcolor="#e9e3fa" text_color="#04345c" font_family="Roboto"
                                      icon_component={<PersonIcon/>}
                                      callback={() => {
                                          setOpenLoginModal(true)
                                      }}
                        />
                        <CustomButton text="Cadastrar-se" bgcolor="#04345c" text_color="#e9e3fa" font_family="Roboto"
                                      icon_component={<PersonIcon/>}
                                      callback={() => {
                                          setOpenRegisterModal(true)
                                      }}
                        />
                    </div>
                </Row>
                <Row style={{height: "745px"}}>
                    <Col>
                        <div className="d-flex flex-column align-items-start h-100 justify-content-center"
                             style={{paddingLeft: "5rem"}}>
                            <img src={logoImage} alt="Logo" className="logo-img"/>
                            <h1 className="d-block">
                                Construindo confiança, voto a voto: Sua escolha segura e auditável em votações online.
                            </h1>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <img src={illustrationImage} className="illustration-img" alt="Ilustração"/>
                        </div>
                    </Col>
                </Row>
            </section>
            <section id="our-services">
                <Row style={{height: "90px"}}>
                    <h1 className="title-text-green pt-5 mb-0">Nossos serviços</h1>
                </Row>
                <Row style={{height: "700px"}} className="d-flex justify-content-center">
                    <Col className="d-flex justify-content-center align-items-center">
                        <InfoCard
                            title="Elaboração"
                            description="Crie, gerencie, compartilhe enquetes com quem quiser, de forma online, segura e confiável"
                            icon={voteIcon}
                        />
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                        <InfoCard
                            title="Auditoria"
                            description="Utilizando o poderoso método de criptografia por hash MD5, todas nossas enquetes são auditáveis"
                            icon={confirmIcon}
                        />
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                        <InfoCard
                            title="Participação"
                            description="Participe de enquetes publicas do seu interesse, ou de uma votação a qual você foi convocado"
                            icon={grafIcon}
                        />
                    </Col>
                </Row>
            </section>
            <section id="popular-polls">
                <Row style={{height: "90px"}}>
                    <h1 className="title-text-white pt-5 mb-0">Enquetes públicas populares</h1>
                </Row>
                <Row style={{height: "700px"}}>
                    <Carousel current_filter={["TODOS", "all", "#000000"]} />
                </Row>
            </section>
            <Footer />
            <RegistrationModal open={openRegisterModal} handleClose={() => {
                setOpenRegisterModal(false)
            }}/>
            <LoginModal open={openLoginModal} handleClose={() => {
                setOpenLoginModal(false)
            }}/>
        </div>
    )
}