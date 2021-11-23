import React from 'react';

import Navigation from './Navigation';

const Layout = ({children}) => {
    return(
        <>
        <header>
            <Navigation />
        </header>
        <section className="section">
            <div className="container">
                {children}
            </div>
        </section>
        </>
    )
}
export default Layout;