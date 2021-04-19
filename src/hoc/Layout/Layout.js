import React , {Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Classes from './Layout.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

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
                <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
                <SideDrawer closed={this.SideDrawerClosedHandler} open={this.state.showSideDrawer}/>
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
 
}

export default Layout;