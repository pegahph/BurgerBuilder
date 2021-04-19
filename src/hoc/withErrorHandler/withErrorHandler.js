import React , {Component} from 'react';
import Modal from '../../Components/UI/Modal/Modal'
import Auxiliary from '../Auxiliary/Auxiliary'

const withErrorHandler = (WrappedComponent , axios) => {
    return class extends Component {
        state = {
            Error: null,
        }

        errorConfirmedHandler = () => {
            this.setState({Error: null})
        }
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({Error: null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res , error => {
                this.setState({Error: error})
            })
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <Auxiliary>
                    <Modal show = {this.state.Error} modalClosed= {this.errorConfirmedHandler}>
                        {this.state.Error ? this.state.Error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxiliary>
            );
        }
        
    }
};

export default withErrorHandler;