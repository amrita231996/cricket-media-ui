import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/footer/Footer';
import Header from '../../components/header'
import AppContext from '../../context/AppContext';

const AuthContainer = () => {
    const [searchText, setSearchText] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const [onlyLogo, setOnlyLogo] = useState(false);
    const [title, setTitle] = useState('');
    const [sections, setSections] = useState([]);
    const [showFooter, setShowFooter] = useState(false);
    const render = () => (
        <>
            <AppContext.Provider value={{
                searchText, setSearchText,
                showAdd, setShowAdd,
                onlyLogo, setOnlyLogo,
                title, setTitle,
                sections, setSections,
                showFooter, setShowFooter,
            }}>
                <Header
                    showAdd={showAdd}
                    onlyLogo={onlyLogo}
                    onSearchTextChange={(v) => { setSearchText(v) }}
                    sections={sections}
                    title={title}
                />
                <Outlet searchText={searchText} />
                {showFooter ? <Footer /> : null}
            </AppContext.Provider>
        </>
    )

    return render()
}

export default AuthContainer
