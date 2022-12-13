import axios from 'axios'
import swal from 'sweetalert'

export const startUserRegister = (data, redirect) => {
    axios.post('http://localhost:3030/api/user/register', data)
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty('error')){
                swal({title:"Already Registered", icon:'error'})
            } else {
                swal({title:'Successfully Registered', icon:'success', buttons: 'Done'})
                redirect()
            }
            
        })
        .catch((err) => {
            swal(err.message)
        })

}

export const startUserLogin = (data, redirect) => {
    axios.post('http://localhost:3030/api/user/login', data)
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty('notice')){
                swal({title:"invalid email or password", icon:'error'})
            } else if(result.hasOwnProperty('error')){
                swal({title:"Error", icon:'error'})
            } else {
                swal({
                    title: "You are successfully logged in",
                    icon: "success",
                    buttons: 'Done'
                  })
                  localStorage.setItem('token', result.token)
                  redirect()
            }
        })
        .catch((err) => {
            swal(err.message)
        })

}

export const startGetUser = () => {
    return(dispatch) => {
        axios.get('http://localhost:3030/api/user/account', {
            headers: {
                'authorization' : localStorage.getItem('token')
            }
        })
        .then((response) => {
            const result = response.data
            dispatch(setProfile(result))
        })
        .catch((err) => {
            swal(err.message)
        })
    }
}

export const setProfile = (data) => {
    return {
        type : "SET_PROFILE",
        payload : data
    }
}

export const startUpdateProfile = (data, toggle) => {
    console.log(data)
    return(dispatch) => {
        axios.put('http://localhost:3030/api/user/update', data, {
            headers: {
                'authorization' : localStorage.getItem('token')
            }
        })
        .then((response) => {
            const result = response.data
            dispatch(setProfilePic(result))
            toggle()
        })
        .catch((err) => {
            swal(err.message)
        })
    }
}

export const setProfilePic = (data) => {
    return {
        type :  'PROFILE_IMAGE',
        payload : data
    }
}