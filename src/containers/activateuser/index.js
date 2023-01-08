import Header from "../../components/header";
import axios from 'axios';
import { useState, useEffect, useContext } from "react";

import { useNavigate, useParams, withRouter, useSearchParams } from 'react-router-dom';
import './index.scss'
import AppContext from "../../context/AppContext";
import { clearStorage } from "../../utils/sessionStorage";

const ActivateUserPage = (props) => {
    // let { id } = useParams();
    // const [test] = useSearchParams();
    // const id = params['id'];
    // const [searchParams, setSearchParams] = useSearchParams();
    // // console.log("params", props.searchParams, test);
    const [activatedMessage, setActivatedMessage] = useState('');
    const params = useParams();
    const uid = params.uid;
    
    
    const navigate = useNavigate();
    const activateUser = () => {
        axios({
                method: "post",
                url: global.config.ROOTURL.prod + "/auth/verify/",
                data: {
                  "_id": uid,
                }
            })
            .then((response) => setActivatedMessage(response.data.message))
            .then((response) => {
                const timer = setTimeout(() => {
                    clearStorage()
                    navigate('/login');
                }, 3000);
                return () => clearTimeout(timer);  
            })
            .catch((error) => {
                if (error?.response?.status == 401) { 
                    clearStorage()
                    navigate('/login'); }
            });
    }
    useEffect(() => {
      activateUser();
    }, [])

    const appContext = useContext(AppContext);
    const { setShowAdd, setOnlyLogo, setShowFooter } = appContext
  
    useEffect(() => {
      setShowAdd(false)
      setOnlyLogo(true)
      setShowFooter(false)
    }, [])

    return <div className="page profile">
        <main className="profile-main">
            <div className="activation-text">
                {activatedMessage}
            </div>
        </main>
    </div>
}

export default ActivateUserPage;