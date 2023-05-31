import {  Outlet } from 'react-router-dom';

const SignIn = () => {
    return (
        <>
        <div className="col-md-12">
            <div className="card card-container">
                <Outlet/>
            </div>
        </div>
        </>
    );
}

export default SignIn;