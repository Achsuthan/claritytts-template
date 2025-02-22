import React from 'react';


import Header from '../Components/Common/Header';
import Footer from '../Components/Common/Footer';

const AuthLayout = (props) => {
    return (
        <div>
            <Header />
            <main role="main" className="container">
                {props.children}
            </main>
            <Footer />
        </div>
    );
};

export default AuthLayout;