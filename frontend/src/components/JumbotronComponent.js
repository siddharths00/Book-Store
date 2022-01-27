import React, { Component } from 'react';

import axios from 'axios'

class Jumbotron extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: true
        }
    }

    logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    toggleNavbar = () => {
        let tog = !this.state.toggle;
        this.setState({
            toggle: tog
        })
    }

    render() {
        return (
            <div >
                <div class="container-fluid bg-light text-dark" id="aboutus">
                    <div class="container bg-light p-5">
                        <h5 class="display-4 fw-bold">About Us</h5>
                        <h3><p>Dear readers,</p></h3>

                        <p>
                            We offer huge collection of books in diverse category of Fiction, Non-fiction,
                            Biographies, History, Religions, Self -Help, Children. We also sell in vast collection
                            of Investments and Management, Computers, Engineering, Medical, College and School text
                            references books proposed by different institutes as syllabus across the country.
                            Besides to this, we also offer a large collection of E-Books at very fair pricing.
                        </p>
                    </div>
                </div>

            </div>
        );
    }
}

export default Jumbotron;


