import * as React from 'React';
import Web3 from 'web3';

import truffleConfig from '../../truffle.js';
import {getExtendedWeb3Provider} from '../utils/Utils.js';

var web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`;
let web3Provided;

/**
* The AppContainer wraps the entire app and supplies web3 as a prop to all of the child components
*/ 
class AppContainer extends React.Component {
    
    constructor(props) {
        super(props);
        if (typeof web3 !== 'undefined') {
            web3Provided = new Web3(web3.currentProvider);
        } else {
            web3Provided = new Web3(new Web3.providers.HttpProvider(web3Location));
        }
    }

    render() {
        const {children} = this.props;

        let content = (
            <div>
                {React.cloneElement(children, { web3: getExtendedWeb3Provider(web3Provided) })}
            </div>
        );

        return (
            <div>
            {content}
            </div>
        );
    }
};

export default AppContainer;