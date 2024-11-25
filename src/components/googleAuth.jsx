import React from 'react' 
import googleIcon from '../assets/google-icon.svg';

function googleAuth() {
    return (
        <div>
            <div className="border-l-stone-900 rounded-full flex h-15 justify-center pt-1">
                <img src={googleIcon} alt="signup with google" className="w-10 mb-8 p-2 pt-5" />
                <p className="text-center flex pt-5">Signup with Google</p>

            </div>
        </div>
    );
}

export default googleAuth