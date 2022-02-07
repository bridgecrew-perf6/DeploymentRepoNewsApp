import axios from 'axios';

const Request = (type : any, url : string, params :any, history : any, success?: any, failed?: any, authorization_recall:boolean = true) => {
    // let token = auth.getToken();
    // if (token && authorization_recall) {
    //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    // }
    if(!authorization_recall){
        axios.defaults.headers.common['Authorization'] = 'No Auth';
    }

    const success_validation = (type : any, res:any, success_callback:any) => {
        console.log(`%c${type} Success Response :` ,"color: green" ,res)

        let response = {
            type,
            statusCode: res.status || null,
            response: res.data || null,
            error_dev:  null,
            error_app:  null,

        }
        if (success_callback) {
            success_callback(response);
        } 
        return response;
    }

    const failed_validation = (type:any, res:any, failed_callback:any, current_fx:any, authorization_recall:boolean) => {
        console.log(`${type} Failed Response`,"color : red",res);
        console.log(`${type} Failed Response data`, res.response);
        console.log('authorization_recall:', authorization_recall)

        if (res.response && res.response.data) {
            if (res.response.status === 401 && authorization_recall) {
                // AuthErrorValidation(current_fx)
            } else {
                console.log('outside blah', authorization_recall)
            }
        }else if(res?.message){
            console.log("Error message",res?.message)
        }
         else  {
            if (history) {
                // auth.logout(() => history.push('/login'));
            }
            console.log('Something went Wrong');
        }


        let statusCode = null;
        let error_dev_data = null;
        let error_app_data = null;
        console.log("errror data=========>",res)
        
        if (res.data) {
            statusCode = res.data.status
            error_dev_data = res.response.data.dev_data
            error_app_data = res.response.data.app_data
        }

        let response = {
            type,
            statusCode: statusCode,
            response:  res.response ? res.response.data : {},
            error_dev: error_dev_data,
            error_app: error_app_data
        }
        if (failed_callback) {
            failed_callback(response);
        }
        return response;
    }






    switch (type) {
        case 'get':
            return axios.get<ResponseType>(url)
                .then(response => {

                    return success_validation(type, response, success)
                })
                .catch(error => {
                    console.log(`%c Error == ${error}`, "color: red")
                    const currentFxRecall = () => {
                        Request(type, url, params, history, success, failed, authorization_recall)
                    }
                    return failed_validation(type, error, failed, currentFxRecall, authorization_recall)
                })


        case 'post':
            return axios.post<ResponseType >(url, params, { headers: { "Content-Type": "application/json" } })
                .then(response => {
                    return success_validation(type, response, success)
                })
                .catch(error => {
                    console.log(`%c Error ==  ${error}`, "color: red")

                    
                    const currentFxRecall = () => {
                        Request(type, url, params, history, success, failed, authorization_recall)
                    }
                    return failed_validation(type, error, failed, currentFxRecall, authorization_recall)
                })


        case 'put':
            return axios.put<ResponseType>(url, params)
                .then(response => {
                    return success_validation(type, response, success)
                })
                .catch(error => {
                    console.log(`%c Error ==  ${error}`, "color: red")

                    const currentFxRecall = () => {
                        Request(type, url, params, history, success, failed, authorization_recall)
                    }
                    return failed_validation(type, error, failed, currentFxRecall, authorization_recall)
                })


        case 'delete':
            return axios.delete(url)
                .then(response => {
                    return success_validation(type, response, success)
                })
                .catch(error => {
                    console.log(`%c Error ==  ${error}`, "color: red")

                    const currentFxRecall = () => {
                        Request(type, url, params, history, success, failed, authorization_recall)
                    }
                    return failed_validation(type, error, failed, currentFxRecall, authorization_recall)
                })


        default:
            break;
    }

}

export default Request;

