import React from "react";
import 'mdbreact/dist/css/mdb.css'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { SocialIcon } from 'react-social-icons';

const FooterPage = () => {
    return (
        <MDBFooter id="footer" className="font-small pt-4 mt-4 bg-dark">
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="4">
                        <h5 className="title">Contact Us</h5>
                        <p>
                            If you have any queries, please feel free to ask :)
                        </p>
                    </MDBCol>
                    <MDBCol md="4">
                        <h5 className="title">Contact Details</h5>
                        <p>
                            Street:  117, Vm Ghanekar Road, Opp Level Crossing, Vile Parle (east)
                        </p>
                        <p>
                            City:   Mumbai
                            </p>
                            <p>
                            State/province/area:    Maharashtra
                            </p>
                            <p>
                            Phone number  02226119753
                            </p>
                            <p>
                            Zip code  400057
                        </p>
                    </MDBCol>

                    <MDBCol md="4">
                        <h5 className="title">Links</h5>
                        <ul>
                            <li className="list-unstyled">
                                <a href="#!"><SocialIcon url="https://twitter.com/jaketrent" /></a>
                            </li>
                            <li className="list-unstyled">
                                <a href="#!"><SocialIcon url="https://youtube.com" /></a>
                            </li>
                            <li className="list-unstyled">
                                <a href="#!"><SocialIcon url="https://linkedin.com" /></a>
                            </li>
                            <li className="list-unstyled">
                                <a href="#!"><SocialIcon url="https://stackoverflow.com" /></a>
                            </li>
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="https://www.google.co.in/">Some Organisation </a>
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default FooterPage;