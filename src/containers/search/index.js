import SearchComponent from "../../components/search/Search";
import { useContext, useEffect } from "react";

import './index.scss';
import AppContext from "../../context/AppContext";
import { Helmet } from "react-helmet";

const SearchPage = () => {
    const appContext = useContext(AppContext);
    const { setShowFooter } = appContext

    useEffect(() => {
        setShowFooter(true)
    }, []);

    return (
        <div>
            <Helmet>
                <title>Cricket Media | Search</title>
            </Helmet>
       

        <div className="page">
            <main className="search-main">
                <SearchComponent />
            </main>
        </div>
        </div>
        )

}

export default SearchPage;