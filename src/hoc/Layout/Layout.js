import React , {Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Classes from './Layout.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux'

class Layout extends Component{
    state = {
        showSideDrawer: false
    };
    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }
    SideDrawerToggleHandler = () => {
        this.setState((prevState) =>{return {showSideDrawer: !prevState.showSideDrawer}})
    }
    render() {
        return(
            <Auxiliary>
                <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.SideDrawerToggleHandler}/>
                <SideDrawer isAuth={this.props.isAuthenticated} closed={this.SideDrawerClosedHandler} open={this.state.showSideDrawer}/>
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
 
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);