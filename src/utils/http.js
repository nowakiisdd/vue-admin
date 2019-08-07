import axios from 'axios'

const http = ({
    url,
    params,
    data,
    method
}) => {
    return new Promise(( resolve,reject ) => {
        axios({
            url,
            params,
            data,
            method
        }).then( res => resolve( res ))
          .catch( error => console.log( error ))
    })
}

export default http